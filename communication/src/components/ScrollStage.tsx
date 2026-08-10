'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { FrameSequence, IPHONE_BASE, IPHONE_FRAMES, sampleTimeline } from '@/lib/frames'
import FrameCanvas from './FrameCanvas'
import StoryOverlays from './StoryOverlays'
import { scrollToProgress } from '@/lib/scrollToId'

const CHAPTERS = [
  { label: 'Overview', start: 0 },
  { label: 'Communication', start: 0.15 },
  { label: 'Information Tech', start: 0.35 },
  { label: 'Environment', start: 0.55 },
  { label: 'Connection', start: 0.75 },
  { label: 'Final', start: 0.9 },
]

function activeChapter(p: number) {
  let idx = 0
  CHAPTERS.forEach((c, i) => {
    if (p >= c.start) idx = i
  })
  return idx
}

export default function ScrollStage() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [chapter, setChapter] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setChapter(activeChapter(v))
    iphone.warm(sampleTimeline(v).frame)
  })

  const iphone = useMemo(() => new FrameSequence(IPHONE_BASE, IPHONE_FRAMES), [])

  useEffect(() => {
    iphone.warm(1, 40)
  }, [iphone])

  return (
    <section id="stage" ref={ref} className="relative" style={{ height: '760vh' }}>
      <div className="sticky top-0 stage-screen w-full overflow-hidden bg-bg">
        <FrameCanvas
          progress={scrollYProgress}
          seq={iphone}
          timeline={sampleTimeline}
          label="A phone disassembles and reassembles as you scroll through Communication, Information Technology, and Environmental Science"
        />
        <StoryOverlays progress={scrollYProgress} />

        {/* atmosphere — blend canvas into the page */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(0,0,0,0.5)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 bg-gradient-to-b from-bg to-transparent" />

        {/* chapter rail */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-6 md:flex">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.label}
              onClick={() => scrollToProgress(c.start + 0.005)}
              aria-label={c.label}
              className="pointer-events-auto group flex items-center gap-3"
            >
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.22em] transition-all duration-300 ${
                  chapter === i ? 'text-white/75 opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-60'
                }`}
              >
                {c.label}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  chapter === i ? 'scale-125 bg-[#38B6C0]' : 'bg-white/15'
                }`}
              />
            </button>
          ))}
        </div>

        {/* progress hairline */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-px w-full bg-white/[0.04]">
          <motion.div className="h-full origin-left bg-white/25" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  )
}
