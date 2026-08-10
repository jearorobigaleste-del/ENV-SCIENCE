'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RelationSystem, type Discipline } from './RelationSystem'

const EXAMPLE: Record<Discipline, { title: string; body: string; accent: string }> = {
  environment: {
    title: 'Environmental Science',
    accent: '#4CAF8B',
    body: 'Understands what air-quality measurements mean — AQI levels, particulate matter, health thresholds, and the environmental context behind the numbers.',
  },
  it: {
    title: 'Information Technology',
    accent: '#38B6C0',
    body: 'Collects, processes, stores, and visualizes the data — raw sensor readings flow into systems that clean, analyze, structure, and present them.',
  },
  communication: {
    title: 'Communication',
    accent: '#5B86FF',
    body: 'Transmits the information to people, researchers, organizations, and communities — through alerts, dashboards, and shared reports.',
  },
}

const CHAIN = [
  'Environmental sensors',
  'Data collection',
  'Information technology',
  'Communication networks',
  'Mobile device',
  'People & communities',
  'Decisions & action',
  'More environmental data',
]

export default function ConnectionSection() {
  const [active, setActive] = useState<Discipline | 'none'>('communication')

  return (
    <section id="connection" className="relative overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(56,182,192,0.06),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="eyebrow">04 / The Connection</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.04] tracking-display text-gradient sm:text-5xl md:text-6xl text-balance">
            Three fields. One system.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Hover each discipline to see how it connects to the others — then trace one real example end to end:
            air-quality monitoring.
          </p>
        </motion.div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* interactive diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[560px]"
          >
            <RelationSystem active={active} onHover={setActive} />
          </motion.div>

          {/* example panel */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">
              Air Quality Monitoring — end to end
            </p>
            <div className="space-y-3">
              {(Object.keys(EXAMPLE) as Discipline[]).map((key, i) => {
                const ex = EXAMPLE[key]
                const isActive = active === key
                return (
                  <button
                    key={key}
                    onMouseEnter={() => setActive(key)}
                    onClick={() => setActive(key)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-white/15 bg-white/[0.05]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full transition-transform duration-300 ${isActive ? 'scale-125' : ''}`}
                          style={{ background: ex.accent }}
                        />
                        <h3 className="text-sm font-semibold text-white/85">{ex.title}</h3>
                      </div>
                      <span className="font-mono text-[10px] text-white/30">0{i + 1}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key={key}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <span className="block pt-3 text-sm leading-relaxed text-white/55">{ex.body}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                )
              })}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/35">
              One sensor produces a measurement. Systems process it. Networks move it. A person reads it and
              decides. That decision changes the environment — and the loop starts again.
            </p>
          </motion.div>
        </div>

        {/* IoT chain */}
        <div className="mt-24">
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/35">
            The IoT Environmental Monitoring Network
          </p>
          <div className="flex flex-wrap items-center justify-center gap-y-4">
            {CHAIN.map((step, i) => (
              <div key={step} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[11px] font-medium tracking-wide text-white/65 md:text-xs"
                >
                  <span className="mr-2 font-mono text-white/30">0{i + 1}</span>
                  {step}
                </motion.div>
                {i < CHAIN.length - 1 && (
                  <svg width="26" height="12" viewBox="0 0 26 12" className="mx-1 shrink-0 opacity-40 md:mx-2">
                    <path
                      d="M0 6 H20 M16 2 L22 6 L16 10"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
