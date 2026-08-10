'use client'
import { motion } from 'framer-motion'
import { scrollToId, scrollTop } from '@/lib/scrollToId'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05] bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38B6C0]/40 to-transparent" />
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow"
        >
          The final message
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-[1.12] tracking-display text-gradient sm:text-4xl md:text-5xl text-balance"
        >
          Communication connects us.
          <br />
          Information Technology connects systems.
          <br />
          Environmental Science connects technology to the world we live in.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <button onClick={() => scrollToId('connection')} className="btn-primary w-full sm:w-auto">
            Explore the Connection
          </button>
          <button onClick={scrollTop} className="btn-ghost w-full sm:w-auto">
            Start Again
          </button>
        </motion.div>

        <p className="mt-16 text-[11px] uppercase tracking-[0.28em] text-white/25">
          Communication × Information Technology × Environmental Science
        </p>
      </div>
    </footer>
  )
}
