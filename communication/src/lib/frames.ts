export const IPHONE_FRAMES = 180
export const ENVI_FRAMES = 180
export const IPHONE_BASE = '/frames/iphone'
export const ENVI_BASE = '/frames/envi'

export function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

export function isSlowConnection() {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) return false
  const c = (navigator as { connection?: { effectiveType?: string } }).connection
  return c?.effectiveType === 'slow-2g' || c?.effectiveType === '2g'
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function frameUrl(base: string, index: number) {
  const i = clamp(Math.round(index), 1, 180)
  return `${base}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
}

/**
 * A lazy, windowed frame loader for a single image sequence.
 * Loads a window of frames around the current index and keeps a bounded LRU cache.
 */
export class FrameSequence {
  private cache = new Map<number, HTMLImageElement>()
  private pending = new Map<number, Promise<HTMLImageElement>>()
  private lru: number[] = []

  constructor(
    public base: string,
    public count: number,
  ) {}

  get(index: number): HTMLImageElement | undefined {
    const i = clamp(Math.round(index), 1, this.count)
    return this.cache.get(i)
  }

  ensure(index: number): Promise<HTMLImageElement> {
    const i = clamp(Math.round(index), 1, this.count)
    const hit = this.cache.get(i)
    if (hit) return Promise.resolve(hit)
    const inflight = this.pending.get(i)
    if (inflight) return inflight

    const p = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = frameUrl(this.base, i)
      img.onload = () => {
        this.cache.set(i, img)
        this.lru.push(i)
        if (this.lru.length > 96) {
          const evict = this.lru.shift()
          if (evict !== undefined) this.cache.delete(evict)
        }
        resolve(img)
      }
      img.onerror = reject
    })
    this.pending.set(i, p)
    p.finally(() => this.pending.delete(i))
    return p
  }

  /** Eagerly load every frame, spread across idle time. */
  preloadAll(batch = 6) {
    if (isSlowConnection()) {
      for (let i = 1; i <= Math.min(16, this.count); i++) this.ensure(i)
      return
    }
    let cursor = 1
    const step = () => {
      const end = Math.min(cursor + batch, this.count + 1)
      for (let i = cursor; i < end; i++) this.ensure(i)
      cursor = end
      if (cursor <= this.count) {
        if (typeof requestIdleCallback === 'function') {
          requestIdleCallback(step)
        } else {
          setTimeout(step, 120)
        }
      }
    }
    step()
  }
}

export type LayerSample = { seq: 'iphone' | 'envi'; frame: number }

/**
 * Maps scroll progress (0..1) onto the iphone frame sequence — the main hero
 * animation (Communication → Information Technology).
 *
 *  0.00 – 0.35  iphone 1 → 180    (Communication — the phone comes apart)
 *  0.35 – 0.55  iphone 180, hold  (Information Technology — the parts)
 *  0.55 – 0.72  iphone 180 → 1    (Environment — it comes back together)
 *  0.72 – 1.00  iphone assembled  (Connection + Final — always visible)
 */
export function sampleTimeline(p: number): LayerSample {
  const cp = clamp(p, 0, 1)

  const iphoneT =
    cp < 0.35
      ? cp / 0.35
      : cp < 0.55
        ? 1
        : cp < 0.72
          ? 1 - (cp - 0.55) / 0.17
          : 0

  return {
    seq: 'iphone',
    frame: Math.round(1 + clamp(iphoneT, 0, 1) * (IPHONE_FRAMES - 1)),
  }
}

/**
 * Maps scroll progress (0..1) onto the environmental frame sequence — used by
 * the scroll-driven animation in the Environment section.
 */
export function sampleEnvisciTimeline(p: number): LayerSample {
  const cp = clamp(p, 0, 1)
  return {
    seq: 'envi',
    frame: Math.round(1 + cp * (ENVI_FRAMES - 1)),
  }
}
