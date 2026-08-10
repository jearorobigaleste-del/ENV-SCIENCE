'use client'
import { useState } from 'react'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import { scrollToProgress, scrollToId, scrollTop } from '@/lib/scrollToId'

const CENTER_LINKS = [
  { label: 'Overview', action: () => scrollTop() },
  { label: 'Communication', action: () => scrollToProgress(0.15) },
  { label: 'IT', action: () => scrollToProgress(0.35) },
  { label: 'Environment', action: () => scrollToProgress(0.55) },
  { label: 'Connection', action: () => scrollToId('connection') },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 32))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/[0.06]' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-8">
        <button
          onClick={scrollTop}
          className="flex items-baseline gap-2 text-[13px] font-semibold tracking-[0.14em] text-white"
        >
          <span className="hidden min-[360px]:inline">COMMUNICATION</span>
          <span className="text-white/40">×</span>
          <span className="hidden lg:inline">IT</span>
          <span className="text-white/40">×</span>
          <span className="text-white/60">ENVIRONMENT</span>
        </button>

        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {CENTER_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={l.action}
              className="relative text-[13px] text-white/55 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-[#3D6DF2] after:to-[#38B6C0] after:transition-all after:duration-300 hover:text-white hover:after:w-full"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollToId('communication')}
          className="hidden rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/85 transition-all hover:border-white/30 hover:bg-white/[0.08] lg:block"
        >
          Explore
        </button>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex flex-col items-end justify-center gap-[5px] p-2 md:hidden"
        >
          <span className={`h-px w-5 bg-white/70 transition-all ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`h-px bg-white/70 transition-all ${open ? 'w-5 -translate-y-[6px] -rotate-45' : 'w-3.5'}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0A0A0C]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {CENTER_LINKS.map((l) => (
                <button
                  key={l.label}
                  onClick={() => {
                    setOpen(false)
                    l.action()
                  }}
                  className="py-3 text-left text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false)
                  scrollToId('communication')
                }}
                className="py-3 text-left text-sm font-medium text-[#38B6C0]"
              >
                Explore
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
