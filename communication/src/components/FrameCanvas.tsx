'use client'
import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import { FrameSequence, lerp, type LayerSample } from '@/lib/frames'

type Timeline = (p: number) => LayerSample

type Props = {
  progress: MotionValue<number>
  seq: FrameSequence
  timeline: Timeline
  label?: string
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const iw = img.naturalWidth || 1280
  const ih = img.naturalHeight || 720
  const scale = Math.max(w / iw, h / ih)
  const dw = iw * scale
  const dh = ih * scale
  ctx.globalAlpha = 1
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
}

export default function FrameCanvas({ progress, seq, timeline, label = 'Scroll-driven animation' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const scheduleRef = useRef<(() => void) | null>(null)

  useMotionValueEvent(progress, 'change', (v) => {
    progressRef.current = v
    if (scheduleRef.current) scheduleRef.current()
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let curFrame = 1
    let lastDrawn = -1
    let lastImg: HTMLImageElement | null = null
    let raf = 0
    let timeout = 0
    let scheduled = false
    let visible = false

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      lastDrawn = -1
      schedule()
    }

    const ensureNearby = (s: FrameSequence, idx: number, radius: number) => {
      for (let i = Math.max(1, idx - radius); i <= Math.min(s.count, idx + radius); i++) {
        s.ensure(i)
      }
    }

    const schedule = () => {
      if (scheduled || !visible) return
      scheduled = true
      raf = requestAnimationFrame(step)
    }

    const step = () => {
      scheduled = false
      const inst = timeline(progressRef.current)
      curFrame = lerp(curFrame, inst.frame, 0.2)
      const frame = Math.round(curFrame)

      if (Math.abs(curFrame - inst.frame) > 0.25) {
        schedule()
      } else if (!seq.get(frame)) {
        timeout = window.setTimeout(schedule, 48)
      }

      if (frame !== lastDrawn) {
        ensureNearby(seq, frame, 6)
        const img = seq.get(frame)
        if (img) lastImg = img
        if (lastImg) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          drawCover(ctx, lastImg, w, h)
          if (img) lastDrawn = frame
        }
      }
    }
    scheduleRef.current = schedule

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          schedule()
        } else if (raf) {
          cancelAnimationFrame(raf)
          scheduled = false
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(wrap)

    return () => {
      scheduleRef.current = null
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      ro.disconnect()
      io.disconnect()
    }
  }, [seq, timeline])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="block h-full w-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
