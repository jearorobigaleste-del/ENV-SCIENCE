'use client'
import { useId } from 'react'
import { motion } from 'framer-motion'

export type Discipline = 'communication' | 'it' | 'environment'

const NODES: {
  id: Discipline
  x: number
  y: number
  label: string
  accent: string
}[] = [
  { id: 'communication', x: 300, y: 96, label: 'COMMUNICATION', accent: '#5B86FF' },
  { id: 'it', x: 132, y: 478, label: 'INFORMATION TECHNOLOGY', accent: '#38B6C0' },
  { id: 'environment', x: 468, y: 478, label: 'ENVIRONMENTAL SCIENCE', accent: '#4CAF8B' },
]

const DIRECTIONAL_LABELS: Record<Discipline, string> = {
  communication: 'moves information',
  it: 'processes & stores',
  environment: 'senses the world',
}

// directional cycle: communication → it → environment → communication
const LINKS: { from: Discipline; to: Discipline; d: string }[] = [
  { from: 'communication', to: 'it', d: 'M 236 150 C 150 200, 130 330, 160 424' },
  { from: 'it', to: 'environment', d: 'M 224 490 C 300 530, 420 530, 468 484' },
  { from: 'environment', to: 'communication', d: 'M 420 160 C 470 230, 420 320, 364 398' },
]

export function RelationSystem({
  active,
  compact = false,
  onHover,
}: {
  active: Discipline | 'none'
  compact?: boolean
  onHover?: (d: Discipline | 'none') => void
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const arrowDimId = `${uid}-arrow-dim`
  const arrowLitId = `${uid}-arrow-lit`
  const glowId = `${uid}-phone-glow`
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      className="h-auto w-full select-none"
      onMouseLeave={onHover ? () => onHover('none') : undefined}
    >
      <defs>
        <marker
          id={arrowDimId}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.22)" />
        </marker>
        <marker
          id={arrowLitId}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#9AD8FF" />
        </marker>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,182,192,0.22)" />
          <stop offset="100%" stopColor="rgba(56,182,192,0)" />
        </radialGradient>
      </defs>

      {/* ambient system loops */}
      <circle cx="300" cy="300" r="205" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="300" cy="300" r="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="1 6" strokeLinecap="round" />

      {/* links */}
      {LINKS.map((link) => {
        const fromNode = NODES.find((n) => n.id === link.from)!
        const toNode = NODES.find((n) => n.id === link.to)!
        const touched = active === 'none' || active === link.from || active === link.to
        const accent =
          active !== 'none' && active === link.from
            ? fromNode.accent
            : active !== 'none' && active === link.to
              ? toNode.accent
              : undefined
        return (
          <motion.path
            key={link.from + link.to}
            d={link.d}
            fill="none"
            stroke={accent ?? (active === 'none' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.09)')}
            strokeWidth={touched ? 1.4 : 0.9}
            markerEnd={active !== 'none' && touched ? `url(#${arrowLitId})` : `url(#${arrowDimId})`}
            animate={active === 'none' ? { opacity: [0.5, 1, 0.5] } : { opacity: touched ? 1 : 0.4 }}
            transition={active === 'none' ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
          />
        )
      })}

      {/* center iPhone */}
      <circle cx="300" cy="300" r="58" fill={`url(#${glowId})`} />
      <motion.g
        animate={active === 'none' ? { y: [0, -4, 0] } : { y: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="282" y="250" width="36" height="100" rx="9" fill="#1B1B1F" stroke="rgba(255,255,255,0.14)" />
        <rect x="286" y="258" width="28" height="84" rx="5" fill="#0D0D10" />
        <rect x="296" y="262" width="8" height="3" rx="1.5" fill="rgba(255,255,255,0.35)" />
        <line x1="300" y1="292" x2="300" y2="296" stroke="#38B6C0" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="297" y1="302" x2="303" y2="302" stroke="#38B6C0" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="297" y1="306" x2="303" y2="306" stroke="#38B6C0" strokeWidth="1.4" strokeLinecap="round" />
      </motion.g>
      <text x="300" y="338" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7.5" letterSpacing="1.5">
        DEVICE
      </text>

      {/* nodes */}
      {NODES.map((node) => {
        const isActive = active === node.id
        const isLit = active === 'none' || isActive
        return (
          <motion.g
            key={node.id}
            animate={{ opacity: isLit ? 1 : 0.38 }}
            transition={{ duration: 0.4 }}
            className={compact ? '' : 'cursor-pointer'}
            style={{ pointerEvents: compact ? 'none' : 'auto' }}
            onMouseEnter={
              onHover && !compact
                ? () => {
                    onHover(node.id)
                  }
                : undefined
            }
            onClick={
              onHover && !compact
                ? () => {
                    onHover(node.id)
                  }
                : undefined
            }
          >
            <circle cx={node.x} cy={node.y} r="26" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="26"
              fill="none"
              stroke={node.accent}
              strokeWidth="1"
              animate={{
                opacity: isActive ? [0.5, 1, 0.5] : 0.55,
                scale: isActive ? [1, 1.06, 1] : 1,
              }}
              transition={{ duration: 2.2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
            />
            <circle cx={node.x} cy={node.y} r="3.2" fill={isActive ? node.accent : 'rgba(255,255,255,0.5)'} />
            <text
              x={node.x}
              y={node.y + (node.y > 300 ? -42 : 48)}
              textAnchor="middle"
              fill={isActive ? '#fff' : 'rgba(255,255,255,0.55)'}
              fontSize={compact ? 8 : 9}
              fontWeight="600"
              letterSpacing="1.4"
              className="relation-label"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + (node.y > 300 ? -32 : 62)}
              textAnchor="middle"
              fill={isActive ? node.accent : 'rgba(255,255,255,0.28)'}
              fontSize="7"
              letterSpacing="1.2"
              className="relation-sub"
            >
              {DIRECTIONAL_LABELS[node.id]}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}
