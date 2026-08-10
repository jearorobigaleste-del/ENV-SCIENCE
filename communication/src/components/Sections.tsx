'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionShell({
  id,
  index,
  eyebrow,
  title,
  lede,
  visual,
  children,
}: {
  id: string
  index: string
  eyebrow: string
  title: string
  lede: string
  visual: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="relative overflow-hidden border-t border-white/[0.05] bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.025),transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-8 md:py-36 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">{index} / {eyebrow}</p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.04] tracking-display text-gradient sm:text-5xl md:text-6xl">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 md:text-base">{lede}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 hidden lg:block">
            {visual}
          </Reveal>
        </div>
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:block lg:space-y-3">{children}</div>
      </div>
    </section>
  )
}

export function FactRow({
  term,
  body,
  accent,
}: {
  term: string
  body: string
  accent?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent ?? '#38B6C0' }} />
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">{term}</h3>
      </div>
      <p className="text-sm leading-relaxed text-white/50">{body}</p>
    </motion.div>
  )
}

const BLENDED = 'mix-blend-screen opacity-90'

export function CommunicationSection() {
  return (
    <SectionShell
      id="communication"
      index="01"
      eyebrow="Communication"
      title="What is Communication?"
      lede="Communication is the flow of information — the exchange of messages, ideas, and data between people, devices, organizations, and communities."
      visual={
        <div className="relative flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/frames/iphone/ezgif-frame-001.png"
            alt=""
            className={`h-[420px] w-full object-contain ${BLENDED}`}
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
        </div>
      }
    >
      <FactRow term="Definition" accent="#5B86FF" body="Communication is the process of sharing meaning through the exchange of signals — spoken words, written text, gestures, images, or digital bits." />
      <FactRow term="Purpose" accent="#5B86FF" body="It lets people coordinate, learn, warn, persuade, and build relationships. Without communication, no idea, instruction, or warning can travel beyond its source." />
      <FactRow term="Forms of communication" accent="#5B86FF" body="One-to-one, one-to-many, and many-to-many. From a conversation between two people to a broadcast reaching millions, communication scales in every direction." />
      <FactRow term="Digital communication" accent="#5B86FF" body="When signals become binary data, communication becomes software — messages, calls, video, and posts can be encoded, compressed, and transmitted at the speed of light." />
      <FactRow term="Communication networks" accent="#5B86FF" body="Devices exchange information through networks of towers, satellites, cables, and switches — infrastructure that turns a single message into a global signal." />
      <FactRow term="Why it matters" accent="#5B86FF" body="Communication is the bridge between a piece of information and a person who can act on it. It is the first step in every chain of understanding." />
    </SectionShell>
  )
}

export function ItSection() {
  return (
    <SectionShell
      id="it"
      index="02"
      eyebrow="Information Technology"
      title="What is Information Technology?"
      lede="Information Technology is the system that enables and processes information — the hardware, software, networks, and data infrastructure behind modern communication."
      visual={
        <div className="relative flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/frames/iphone/ezgif-frame-120.png"
            alt=""
            className={`h-[420px] w-full object-contain ${BLENDED}`}
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
        </div>
      }
    >
      <FactRow term="Hardware" accent="#38B6C0" body="The physical machinery: processors, memory, storage, screens, antennas, and circuit boards that physically compute and communicate." />
      <FactRow term="Software" accent="#38B6C0" body="The instructions that make hardware useful — operating systems, applications, and protocols that tell information where to go and what to do." />
      <FactRow term="Networks" accent="#38B6C0" body="The connecting fabric: wireless radio, cellular, fiber, and the internet, moving packets between devices across the planet." />
      <FactRow term="Data" accent="#38B6C0" body="The raw material of the digital world. IT collects, stores, structures, and protects data so it can become meaningful information." />
      <FactRow term="Computing" accent="#38B6C0" body="Processing power that transforms raw data into insight — from a phone's chip to a data center running millions of operations per second." />
      <FactRow term="Sensors" accent="#38B6C0" body="Devices that observe the physical world and convert it into digital signals: cameras, accelerometers, microphones, and environmental probes." />
      <FactRow term="Information systems" accent="#38B6C0" body="Organized combinations of hardware, software, people, and processes that turn data into decisions for organizations and communities." />
      <FactRow term="Digital infrastructure" accent="#38B6C0" body="The invisible backbone — data centers, undersea cables, satellites, and cellular grids — that keeps communication running at scale." />
    </SectionShell>
  )
}

const ENV_FACTS: { term: string; accent: string; body: string }[] = [
  { term: 'Environment', accent: '#4CAF8B', body: 'The physical systems that surround life — atmosphere, hydrosphere, lithosphere, and biosphere — all connected in delicate balance.' },
  { term: 'Ecosystems', accent: '#4CAF8B', body: 'Communities of living organisms interacting with their environment. Understanding ecosystems means understanding the web of relationships that sustains life.' },
  { term: 'Natural resources', accent: '#4CAF8B', body: 'Water, air, soil, forests, minerals, and energy. Managing them sustainably requires accurate, current information about their state and use.' },
  { term: 'Environmental monitoring', accent: '#4CAF8B', body: 'Observing conditions over time — air quality, water level, temperature, and biodiversity — to detect change before it becomes a crisis.' },
  { term: 'Pollution', accent: '#4CAF8B', body: 'The introduction of harmful substances into the environment. Detecting and reducing it depends on sensing, measurement, and shared data.' },
  { term: 'Climate & weather', accent: '#4CAF8B', body: 'Global atmospheric systems shaped by energy, oceans, and human activity. Predicting them requires immense data collection and computation.' },
  { term: 'Human impact', accent: '#4CAF8B', body: 'Cities, industry, and agriculture reshape the planet. Environmental science measures both the impact and the opportunities to reverse it.' },
  { term: 'Sustainability', accent: '#4CAF8B', body: "Meeting today's needs without compromising the future. Sustainability is an information problem as much as an action problem." },
]

export function EnvironmentSection() {
  return (
    <SectionShell
      id="environment"
      index="03"
      eyebrow="Environmental Science"
      title="What is Environmental Science?"
      lede="Environmental Science studies the physical systems that surround life — atmosphere, water, land, and living things — and how human activity shapes them. It provides the real-world problems that Information Technology and Communication help us understand and solve."
      visual={
        <div className="relative flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/frames/envi/ezgif-frame-001.png"
            alt=""
            className={`h-[420px] w-full object-contain ${BLENDED}`}
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
        </div>
      }
    >
      {ENV_FACTS.map((f) => (
        <FactRow key={f.term} term={f.term} accent={f.accent} body={f.body} />
      ))}
    </SectionShell>
  )
}
