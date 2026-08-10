'use client'
import type { ReactNode } from 'react'
import type { MotionValue } from 'framer-motion'
import { motion, useTransform } from 'framer-motion'
import { RelationSystem } from './RelationSystem'
import { scrollToId, scrollTop } from '@/lib/scrollToId'

function usePhase(progress: MotionValue<number>, range: [number, number]) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.035, range[1] - 0.035, range[1]], [0, 1, 1, 0])
  const y = useTransform(progress, [range[0], range[0] + 0.04], [28, 0])
  return { opacity, y }
}

function FadeBlock({
  progress,
  range,
  className,
  static: isStatic = false,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  className?: string
  static?: boolean
  children: ReactNode
}) {
  const { opacity, y } = usePhase(progress, range)
  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none ${isStatic ? '' : 'absolute'} ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-wide text-white/65">
      {children}
    </span>
  )
}

function SensorRow({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-white/[0.06] py-2.5">
      <span className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</span>
      <span className="font-mono text-sm text-white/85">
        {value}
        <span className="ml-1 text-[10px] text-white/35">{unit}</span>
      </span>
    </div>
  )
}

const ITEM_LIST = [
  'Processor',
  'Memory',
  'Sensors',
  'Camera systems',
  'Antennas',
  'Wireless radio',
  'Battery',
  'Circuit boards',
]

const FLOW = [
  { label: 'Environmental sensors collect data', range: [0.6, 0.72] as [number, number] },
  { label: 'IT systems process and store it', range: [0.645, 0.765] as [number, number] },
  { label: 'Communication networks transmit it', range: [0.69, 0.81] as [number, number] },
  { label: 'People decide and act', range: [0.735, 0.855] as [number, number] },
]

export default function StoryOverlays({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-10">
      {/* HERO — 0.00 – 0.15 */}
      <FadeBlock
        progress={progress}
        range={[0.0, 0.14]}
        className="inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-[max(5rem,env(safe-area-inset-bottom))] text-center md:pb-24"
      >
        <p className="eyebrow">Communication × Information Technology × Environment</p>
        <h1 className="text-4xl font-bold leading-[1.02] tracking-display text-gradient sm:text-5xl md:text-7xl text-balance">
          Everything starts
          <br />
          with a connection.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
          Communication allows people, devices, and communities to exchange information.
        </p>
      </FadeBlock>

      {/* COMMUNICATION — 0.15 – 0.35 */}
      <FadeBlock
        progress={progress}
        range={[0.15, 0.35]}
        className="inset-x-0 bottom-0 flex flex-col justify-end px-6 pb-[max(6rem,env(safe-area-inset-bottom))] md:pb-[max(7rem,env(safe-area-inset-bottom))] md:pl-[8vw]"
      >
        <div className="max-w-xl">
          <p className="eyebrow mb-3">01 / Communication</p>
          <h2 className="text-3xl font-bold tracking-display text-white sm:text-4xl md:text-5xl text-balance">
            Information moves through connection.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            From a simple message to a global network, communication lets information move between people and
            systems — instantly, at scale.
          </p>
          <div className="mt-6 flex max-w-md flex-wrap gap-2">
            <Chip>Mobile</Chip>
            <Chip>Messaging</Chip>
            <Chip>Voice</Chip>
            <Chip>Video</Chip>
            <Chip>Internet</Chip>
            <Chip>Social</Chip>
          </div>
        </div>
      </FadeBlock>

      {/* INFORMATION TECHNOLOGY — 0.35 – 0.55 */}
      <FadeBlock
        progress={progress}
        range={[0.35, 0.55]}
        className="inset-x-0 bottom-0 flex flex-col justify-end px-6 pb-[max(6rem,env(safe-area-inset-bottom))] md:pb-[max(7rem,env(safe-area-inset-bottom))] md:pl-[8vw]"
      >
        <div className="max-w-xl">
          <p className="eyebrow mb-3">02 / Information Technology</p>
          <h2 className="text-3xl font-bold tracking-display text-white sm:text-4xl md:text-5xl text-balance">
            Technology turns communication into capability.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            Information Technology provides the hardware, software, networks, and systems that collect, process,
            store, and transmit information.
          </p>
          <div className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-2">
            {ITEM_LIST.map((item) => (
              <span key={item} className="flex items-center gap-2.5 text-[13px] text-white/55">
                <span className="h-1 w-1 rounded-full bg-white/25" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </FadeBlock>

      {/* ENVIRONMENT — 0.55 – 0.75 */}
      <FadeBlock
        progress={progress}
        range={[0.55, 0.75]}
        className="inset-x-0 bottom-0 flex flex-col justify-end px-6 pb-[max(6rem,env(safe-area-inset-bottom))] md:pb-[max(7rem,env(safe-area-inset-bottom))] md:pl-[8vw]"
      >
        <div className="max-w-xl">
          <p className="eyebrow mb-3" style={{ color: 'rgba(122, 214, 174, 0.55)' }}>
            03 / Environmental Science
          </p>
          <h2 className="text-3xl font-bold tracking-display text-white sm:text-4xl md:text-5xl text-balance">
            Technology can help us understand our environment.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            Environmental Science gives us the knowledge and data needed to understand the world around us — and
            technology delivers it to us.
          </p>
          <div className="mt-6 space-y-0 border-l border-white/10 pl-5">
            {FLOW.map((f) => (
              <FadeBlock key={f.label} progress={progress} range={f.range} static className="relative py-2">
                <div className="relative text-[13px] text-white/70 md:text-sm">
                  <span className="absolute -left-[1.55rem] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#38B6C0]/70" />
                  {f.label}
                </div>
              </FadeBlock>
            ))}
          </div>
        </div>
      </FadeBlock>

      {/* CONNECTION — 0.75 – 0.90 */}
      <FadeBlock
        progress={progress}
        range={[0.75, 0.9]}
        className="inset-0 flex h-full flex-col items-center justify-center px-6"
      >
        <div className="relative flex w-full max-w-4xl items-center justify-center">
          <div className="w-full max-w-[min(88vw,540px)] opacity-90">
            <RelationSystem active="none" compact />
          </div>
          <div className="absolute bottom-0 left-0 w-full max-w-md px-2 pb-3 text-center md:left-auto md:right-0 md:max-w-sm md:pb-5 md:text-left">
            <p className="eyebrow mb-2">The Connection</p>
            <h3 className="text-2xl font-bold tracking-display text-white md:text-4xl">One continuous system.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Communication moves information. Information Technology structures it. Environmental Science gives
              it purpose. The relationship never ends — it loops.
            </p>
          </div>
        </div>
      </FadeBlock>

      {/* FINAL — 0.90 – 1.00 */}
      <FadeBlock
        progress={progress}
        range={[0.9, 1.0]}
        className="inset-x-0 bottom-0 flex flex-col items-center gap-5 px-6 pb-[max(5rem,env(safe-area-inset-bottom))] text-center md:pb-[max(7rem,env(safe-area-inset-bottom))]"
      >
        <p className="eyebrow">Communication × IT × Environment</p>
        <h2 className="text-3xl font-bold leading-[1.05] tracking-display text-gradient sm:text-5xl md:text-6xl text-balance">
          Three disciplines.
          <br />
          One connected world.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
          Communication moves information. Information Technology gives it structure and reach. Environmental
          Science gives that information purpose.
        </p>
        <div className="flex w-full max-w-sm flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <button onClick={() => scrollToId('connection')} className="btn-primary w-full sm:w-auto">
            Explore the Connection
          </button>
          <button onClick={scrollTop} className="btn-ghost w-full sm:w-auto">
            Start Again
          </button>
        </div>
      </FadeBlock>

      {/* Ambient sensor readout — only during environment phase */}
      <FadeBlock progress={progress} range={[0.56, 0.88]} className="left-6 top-24 hidden w-52 md:block">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0A0A0C]/70 p-5 backdrop-blur-md">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">Live environment</p>
          <SensorRow label="Air quality" value="42" unit="AQI" />
          <SensorRow label="Temperature" value="27.4" unit="°C" />
          <SensorRow label="Humidity" value="58" unit="%" />
          <SensorRow label="CO₂" value="418" unit="ppm" />
        </div>
      </FadeBlock>
    </div>
  )
}
