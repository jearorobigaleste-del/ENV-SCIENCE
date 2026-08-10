'use client'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Reveal, SectionShell, FactRow } from './Sections'

const BLENDED = 'mix-blend-screen opacity-90'

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="relative overflow-hidden border-t border-white/[0.05] bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.025),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-36">{children}</div>
    </section>
  )
}

function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">
        {index} / {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-bold leading-[1.04] tracking-display text-gradient sm:text-5xl md:text-6xl text-balance">
        {title}
      </h2>
      {lede ? <p className="mt-6 text-sm leading-relaxed text-white/55 md:text-base">{lede}</p> : null}
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, ReactNode> = {
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </>
  ),
  camera: (
    <>
      <path d="M23 7l-6 4 6 4V7Z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </>
  ),
  zap: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 5V6l-5 5H4a1 1 0 0 0-1 1Z" />
      <path d="M14 8a4 4 0 0 1 0 8" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 4-14 15-15 0 11-6 15-14 15H5Z" />
      <path d="M5 19c3-5 7-9 12-12" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
      <path d="M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v6M15 3v6" />
      <path d="M6 9h12v2a6 6 0 0 1-6 6 6 6 0 0 1-6-6V9Z" />
      <path d="M12 17v4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 8.5a14 14 0 0 1 20 0" />
      <path d="M5 12a10 10 0 0 1 14 0" />
      <path d="M8.5 15.5a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  chip: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 10.7 15.4 6.6" />
      <path d="M8.6 13.3l6.8 4.1" />
    </>
  ),
  city: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9h8v12" />
      <path d="M13 21V5h6v16" />
      <path d="M7 12h2M7 16h2M15 9h2M15 13h2M15 17h2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
}

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? 'h-6 w-6'}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

function IconCard({
  icon,
  title,
  body,
  tone = '#38B6C0',
}: {
  icon: string
  title: string
  body: string
  tone?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
    >
      <span
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]"
        style={{ color: tone }}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* 05 — How IT + Communication Help the Environment                    */
/* ------------------------------------------------------------------ */

const IMPACT_FACTS: { term: string; body: string }[] = [
  { term: 'Paperless communication', body: 'Emails, digital documents, and e-bills replace printed paper — cutting the trees, water, and energy that paper production and shipping would consume.' },
  { term: 'Less travel through video conferencing', body: 'Video calls and remote work reduce commuting and business travel, lowering fuel use and the emissions of moving people around the planet.' },
  { term: 'Faster environmental information sharing', body: 'Reports, alerts, and datasets travel in seconds, so researchers and officials learn about a change in the environment almost as soon as it happens.' },
  { term: 'Environmental awareness campaigns', body: 'Social media and online campaigns carry environmental messages to millions of people, shaping habits and building public support for change.' },
  { term: 'Digital environmental education', body: 'Online lessons, virtual field trips, and e-learning tools bring environmental science to classrooms and homes wherever there is a connection.' },
  { term: 'Disaster and emergency communication', body: 'When storms, floods, or fires strike, networks deliver warnings and updates that give communities time to prepare and respond.' },
  { term: 'Environmental monitoring', body: 'Sensor networks and remote systems watch air, water, and wildlife around the clock, sending a continuous stream of data to the people who analyze it.' },
  { term: 'Sharing climate and environmental data', body: 'Open data from satellites and research stations is shared worldwide, so every country can study and respond to climate change.' },
  { term: 'Smart technologies for resource management', body: 'Smart grids, water meters, and building systems use data to use electricity and water only when and where they are needed.' },
]

export function HelpEnvironmentSection() {
  return (
    <SectionShell
      id="impact"
      index="05"
      eyebrow="How IT & Communication Help the Environment"
      title="Together, they lighten our footprint."
      lede="How does Information Technology + Communication help or affect the environment? Combined, they replace physical activity with digital equivalents, spread environmental knowledge to everyone, and power the monitoring systems that protect natural systems."
      visual={
        <div className="relative flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/frames/envi/ezgif-frame-180.png"
            alt=""
            className={`h-[420px] w-full object-contain ${BLENDED}`}
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
        </div>
      }
    >
      {IMPACT_FACTS.map((f) => (
        <FactRow key={f.term} term={f.term} accent="#38B6C0" body={f.body} />
      ))}
    </SectionShell>
  )
}

/* ------------------------------------------------------------------ */
/* 06 — Real-World Applications                                        */
/* ------------------------------------------------------------------ */

const APPLICATIONS: { tech: string; comm: string; benefit: string }[] = [
  { tech: 'Environmental monitoring systems', comm: 'Networks stream live readings to analysts and dashboards.', benefit: 'Pollution and habitat changes are caught early, before they grow into crises.' },
  { tech: 'Disaster warning and alert systems', comm: 'Alerts broadcast to phones, radios, and sirens.', benefit: 'Communities evacuate or prepare in time, saving lives and property.' },
  { tech: 'Satellite communication', comm: 'Earth-observation satellites relay imagery and signals worldwide.', benefit: 'Weather, fires, and land change are tracked even in the most remote regions.' },
  { tech: 'Smart city systems', comm: 'City sensors talk to a central grid that controls lights, water, and traffic.', benefit: 'Less energy and water wasted — cleaner, safer, more efficient urban life.' },
  { tech: 'IoT environmental sensors', comm: 'Thousands of small devices report temperature, humidity, and air quality wirelessly.', benefit: 'A detailed picture of local conditions at very low cost.' },
  { tech: 'Online environmental campaigns', comm: 'Campaigns spread through social media and websites.', benefit: 'Millions are informed and motivated to act more sustainably.' },
  { tech: 'Digital environmental education', comm: 'Lessons and virtual tours stream to any connected classroom.', benefit: 'Environmental knowledge reaches students wherever they are.' },
  { tech: 'Remote communication during disasters', comm: 'Portable networks and satellite phones keep teams connected.', benefit: 'Rescue and aid reach affected areas even when roads and power fail.' },
]

function Step({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">{label}</p>
      <p className="mt-0.5 text-sm leading-relaxed text-white/70">{text}</p>
    </div>
  )
}

function AppCard({ index, tech, comm, benefit }: { index: number; tech: string; comm: string; benefit: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/30">0{index}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
          IT × Communication
        </span>
      </div>
      <div className="mt-4 space-y-3 border-l border-white/10 pl-4">
        <Step label="Technology" text={tech} />
        <Step label="Communication" text={comm} />
      </div>
      <div className="mt-4 rounded-xl border border-[#4CAF8B]/20 bg-[#4CAF8B]/[0.06] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7AD6AE]">Environmental benefit</p>
        <p className="mt-1 text-sm leading-relaxed text-white/65">{benefit}</p>
      </div>
    </motion.div>
  )
}

export function ApplicationsSection() {
  return (
    <Section id="applications">
      <SectionHeader
        index="06"
        eyebrow="Real-World Applications"
        title="Working examples, end to end."
        lede="Every application follows the same chain: TECHNOLOGY → COMMUNICATION → ENVIRONMENTAL BENEFIT."
      />
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {APPLICATIONS.map((a, i) => (
          <AppCard key={a.tech} index={i + 1} {...a} />
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 07 — Positive Impacts                                               */
/* ------------------------------------------------------------------ */

const POSITIVE_IMPACTS: { icon: string; title: string; body: string }[] = [
  { icon: 'file', title: 'Less paper consumption', body: 'Fewer printed pages mean fewer trees harvested and less energy and water spent making and moving paper.' },
  { icon: 'camera', title: 'Less unnecessary travel', body: 'Digital meetings and remote work shrink commuting, cutting fuel use and the emissions that travel would create.' },
  { icon: 'zap', title: 'Faster environmental response', body: 'Information moves instantly, so warnings and fixes reach people before environmental damage grows.' },
  { icon: 'megaphone', title: 'Greater public awareness', body: 'Environmental news and campaigns spread quickly to large audiences, turning knowledge into everyday habits.' },
  { icon: 'globe', title: 'Better access to environmental information', body: 'Open datasets let citizens, students, and officials check air and water quality anywhere, anytime.' },
  { icon: 'leaf', title: 'More efficient resource management', body: 'Smart systems match energy and water use to real demand, wasting less and saving money.' },
  { icon: 'users', title: 'Easier collaboration between organizations', body: 'Researchers and agencies in different countries share data and coordinate action in real time.' },
]

export function PositiveImpactsSection() {
  return (
    <Section id="impacts">
      <SectionHeader
        index="07"
        eyebrow="Positive Impacts"
        title="What the environment gains."
        lede="The combined effects of Information Technology and Communication add up to a smaller footprint and a better-informed public."
      />
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {POSITIVE_IMPACTS.map((p) => (
          <IconCard key={p.title} icon={p.icon} title={p.title} body={p.body} />
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 08 — Challenges / Negative Environmental Effects                    */
/* ------------------------------------------------------------------ */

const CHALLENGES: { icon: string; title: string; body: string }[] = [
  { icon: 'trash', title: 'Electronic waste', body: 'Discarded phones, batteries, and devices create toxic waste. Much e-waste is not recycled, leaking heavy metals and chemicals into soil and water.' },
  { icon: 'plug', title: 'Energy consumption', body: 'Devices, data centers, and networks run around the clock and use significant electricity — much of it still generated from fossil fuels.' },
  { icon: 'layers', title: 'Resources used in manufacturing', body: 'Making a single device requires rare metals, minerals, and water, extracted through mining that disturbs landscapes and habitats.' },
  { icon: 'refresh', title: 'Frequent device replacement', body: 'Short upgrade cycles push millions of still-working devices into landfills every year, multiplying waste and emissions.' },
  { icon: 'wifi', title: "Digital infrastructure's footprint", body: 'Cables, towers, and server farms need land, cooling water, and energy to build and operate, adding to the footprint of the digital world.' },
]

export function ChallengesSection() {
  return (
    <Section id="challenges">
      <SectionHeader
        index="08"
        eyebrow="Challenges & Costs"
        title="Technology also has a footprint."
        lede="A balanced picture matters. The same systems that protect the environment also consume energy, minerals, and materials — and the way we design and discard them decides how much it costs the planet."
      />
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CHALLENGES.map((c) => (
          <IconCard key={c.title} icon={c.icon} title={c.title} body={c.body} tone="#E08A3C" />
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 09 — The Future                                                     */
/* ------------------------------------------------------------------ */

const FUTURE: { icon: string; title: string; body: string }[] = [
  { icon: 'eye', title: 'Smarter environmental monitoring', body: 'Denser, cheaper sensors will track forests, oceans, and air in near-real time, catching problems the moment they begin.' },
  { icon: 'chip', title: 'AI-assisted environmental analysis', body: 'Artificial intelligence will find patterns in climate data and suggest early interventions before damage spreads.' },
  { icon: 'share', title: 'More efficient communication systems', body: 'Faster, lower-energy networks will carry more information with less electricity per byte.' },
  { icon: 'city', title: 'Smart cities', body: 'Connected cities will tune energy, water, and transport to live demand, cutting waste and emissions across entire urban areas.' },
  { icon: 'sun', title: 'Renewable-energy technologies', body: 'IT will help integrate solar and wind power by predicting supply and balancing demand on the grid.' },
  { icon: 'bell', title: 'Better disaster communication', body: 'Early-warning systems will reach more people, in more languages, with more lead time before disasters strike.' },
  { icon: 'globe', title: 'More accessible environmental information', body: 'Open, translated data will let everyone understand their local environment and act on it.' },
]

export function FutureSection() {
  return (
    <Section id="future">
      <SectionHeader
        index="09"
        eyebrow="The Future"
        title="What's Next?"
        lede="Future Information Technology and Communication could go further — turning connection into a tool for sustainability at global scale."
      />
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FUTURE.map((f) => (
          <IconCard key={f.title} icon={f.icon} title={f.title} body={f.body} tone="#5B86FF" />
        ))}
      </div>
      <Reveal className="mx-auto mt-14 max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center">
        <p className="text-sm leading-relaxed text-white/70 md:text-base">
          <span className="font-semibold text-white">A responsible choice.</span> Technology is not the whole answer —
          but designed, used, and recycled responsibly, it is one of the strongest tools we have to understand the
          environment and act before it is too late.
        </p>
      </Reveal>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 10 — Key Takeaway                                                   */
/* ------------------------------------------------------------------ */

const TAKEAWAY_CHAIN = [
  { label: 'Information Technology', note: 'collects, processes, and stores data' },
  { label: 'Communication', note: 'moves that information to people' },
  { label: 'Information Sharing', note: 'knowledge reaches communities worldwide' },
  { label: 'Environmental Action', note: 'awareness becomes decisions and change' },
  { label: 'A More Sustainable Future', note: 'a smaller footprint, better protected' },
]

export function TakeawaySection() {
  return (
    <Section id="takeaway">
      <SectionHeader
        index="10"
        eyebrow="Key Takeaway"
        title="The whole story, in one chain."
      />
      <div className="mx-auto mt-14 max-w-xl">
        {TAKEAWAY_CHAIN.map((s, i) => (
          <div key={s.label}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-5 text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/90">{s.label}</p>
              <p className="mt-1 text-xs text-white/45">{s.note}</p>
            </motion.div>
            {i < TAKEAWAY_CHAIN.length - 1 && (
              <div className="flex justify-center py-1">
                <svg width="18" height="26" viewBox="0 0 18 26" fill="none" aria-hidden="true">
                  <path d="M9 0v18" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  <path d="M5 14l4 5 4-5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <Reveal className="mx-auto mt-14 max-w-3xl text-center">
        <p className="text-base leading-relaxed text-white/65 md:text-lg">
          Information Technology makes communication faster and more accessible. Communication carries environmental
          information, warnings, knowledge, and solutions to people and communities. And when that knowledge reaches
          people, it becomes environmental action — the path toward a more sustainable future.
        </p>
      </Reveal>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 11 — References                                                     */
/* ------------------------------------------------------------------ */

const REFERENCES: { author: string; year: string; title: string; retrieved: string }[] = [
  { author: 'Intergovernmental Panel on Climate Change', year: '2021', title: 'Climate change 2021: The physical science basis. Summary for policymakers', retrieved: 'Retrieved from https://www.ipcc.ch/report/ar6/wg1/' },
  { author: 'International Energy Agency', year: '2024', title: 'Energy and AI', retrieved: 'Retrieved from https://www.iea.org/reports/energy-and-ai' },
  { author: 'International Telecommunication Union', year: '2023', title: 'Measuring digital development: Facts and figures 2023', retrieved: 'Retrieved from https://www.itu.int/itu-d/reports/statistics/facts-figures-2023/' },
  { author: 'NASA', year: 'n.d.', title: 'Global climate change: Vital signs of the planet', retrieved: 'Retrieved from https://climate.nasa.gov/' },
  { author: 'United Nations Environment Programme', year: '2024', title: 'Global e-waste monitor 2024', retrieved: 'Retrieved from https://ewastemonitor.info/' },
  { author: 'U.S. Environmental Protection Agency', year: '2024', title: 'Sustainable management of electronics', retrieved: 'Retrieved from https://www.epa.gov/recycle/sustainable-management-electronics' },
  { author: 'World Meteorological Organization', year: '2023', title: 'Early Warnings for All: Executive action plan 2023–2027', retrieved: 'Retrieved from https://earlywarningsforall.org/' },
  { author: 'United Nations Human Settlements Programme', year: '2022', title: 'World cities report 2022: Envisaging the future of cities', retrieved: 'Retrieved from https://unhabitat.org/wcr/' },
]

export function ReferencesSection() {
  return (
    <Section id="references">
      <SectionHeader
        index="11"
        eyebrow="References"
        title="Sources"
        lede="The sources referenced throughout this project, formatted in APA style."
      />
      <div className="mx-auto mt-14 max-w-3xl space-y-4">
        {REFERENCES.map((r, i) => (
          <Reveal key={`${r.author}-${i}`} delay={i * 0.03}>
            <p className="pl-6 text-sm leading-relaxed text-white/55" style={{ textIndent: '-1.5rem' }}>
              <span className="font-semibold text-white/75">{r.author}.</span> ({r.year}). <em>{r.title}</em>.{' '}
              {r.retrieved}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
