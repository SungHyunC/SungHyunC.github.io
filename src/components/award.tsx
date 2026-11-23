import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Award } from '../data/types'
import { useLang } from '../lib/i18n'

const rad = (d: number) => (d * Math.PI) / 180

/** Small laurel wreath drawn from leaves placed along two arcs. */
export function Laurel({ className = 'size-4' }: { className?: string }) {
  const leaves: { x: number; y: number; r: number }[] = []
  for (const deg of [118, 146, 174, 202, 230]) {
    const x = 12 + 8.2 * Math.cos(rad(deg))
    const y = 12 + 8.2 * Math.sin(rad(deg))
    leaves.push({ x, y, r: deg + 18 }, { x: 24 - x, y, r: -(deg + 18) })
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d={`M${12 + 8.2 * Math.cos(rad(105))} ${12 + 8.2 * Math.sin(rad(105))} A8.2 8.2 0 0 1 ${12 + 8.2 * Math.cos(rad(245))} ${12 + 8.2 * Math.sin(rad(245))}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.8"
      />
      <path
        d={`M${24 - (12 + 8.2 * Math.cos(rad(105)))} ${12 + 8.2 * Math.sin(rad(105))} A8.2 8.2 0 0 0 ${24 - (12 + 8.2 * Math.cos(rad(245)))} ${12 + 8.2 * Math.sin(rad(245))}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.8"
      />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          rx="1.25"
          ry="2.7"
          fill="currentColor"
          transform={`translate(${l.x.toFixed(2)} ${l.y.toFixed(2)}) rotate(${l.r})`}
        />
      ))}
      <path d="M12 6.2 13 8.3 15.3 8.6 13.6 10.1 14.1 12.4 12 11.2 9.9 12.4 10.4 10.1 8.7 8.6 11 8.3Z" fill="currentColor" />
    </svg>
  )
}

/** Gold pill with a laurel and a light sweep. */
export function AwardBadge({ award, className = '' }: { award: Award; className?: string }) {
  const { t } = useLang()
  return (
    <span
      className={`award-badge inline-flex items-center gap-1.5 rounded-full py-1 pl-1.5 pr-2.5 text-[11px] font-bold tracking-tight ${className}`}
    >
      <Laurel className="size-4 shrink-0" />
      <span>{t(award.short)}</span>
    </span>
  )
}

/** Rotating gold border; place inside a positioned, rounded parent. */
export function AwardRing() {
  return <span aria-hidden className="award-ring" />
}

const STAR = 'M12 0 14.6 9.4 24 12 14.6 14.6 12 24 9.4 14.6 0 12 9.4 9.4Z'

/** Twinkling four-point stars scattered around an award. */
export function Sparkles({ points }: { points: [number, number, number][] }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {points.map(([left, top, size], i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute animate-twinkle text-gold"
          style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${(i * 0.37) % 2.4}s` }}
        >
          <path d={STAR} fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

/** A hanging medal that sways gently, with a shine that sweeps across. */
export function Medal({ award, className = '' }: { award: Award; className?: string }) {
  const id = useId().replace(/:/g, '')
  const reduce = useReducedMotion()
  const place = award.medal === 'place' ? award.place : undefined
  const suffix = place === 1 ? 'ST' : place === 2 ? 'ND' : place === 3 ? 'RD' : 'TH'

  return (
    <motion.svg
      viewBox="0 0 120 160"
      className={className}
      aria-hidden
      style={{ transformOrigin: '60px 0px' }}
      animate={reduce ? undefined : { rotate: [-4, 4] }}
      transition={{ duration: 2.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id={`${id}l`} x1="0" x2="1">
          <stop offset="0" stopColor="#0e7490" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
        <radialGradient id={`${id}g`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff7d1" />
          <stop offset="0.35" stopColor="#fcd34d" />
          <stop offset="0.75" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </radialGradient>
        <linearGradient id={`${id}i`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <circle cx="60" cy="108" r="42" />
        </clipPath>
      </defs>
      <path d="M28 0h24l20 74H48Z" fill={`url(#${id}l)`} />
      <path d="M92 0H68L48 74h24Z" fill={`url(#${id}r)`} />
      <path d="M48 74h24l-2 6H50Z" fill="#92400e" opacity="0.5" />
      <circle cx="60" cy="108" r="44" fill="#92400e" opacity="0.35" />
      <circle cx="60" cy="108" r="42" fill={`url(#${id}g)`} />
      <circle cx="60" cy="108" r="33" fill={`url(#${id}i)`} stroke="#fff3c4" strokeOpacity="0.7" strokeWidth="1.5" />
      <circle cx="60" cy="108" r="37.5" fill="none" stroke="#7c4a03" strokeOpacity="0.35" strokeDasharray="1.5 3" />
      {place !== undefined ? (
        <>
          <text x="56" y="121" textAnchor="middle" fontSize="36" fontWeight="800" fill="#7c4a03" fontFamily="inherit">
            {place}
          </text>
          <text x="75" y="101" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7c4a03" fontFamily="inherit">
            {suffix}
          </text>
        </>
      ) : (
        <path
          d="M60 86l6.5 13.2 14.5 2.1-10.5 10.2 2.5 14.5L60 119.2l-13 6.8 2.5-14.5L39 101.3l14.5-2.1Z"
          fill="#7c4a03"
          opacity="0.9"
        />
      )}
      <g clipPath={`url(#${id}c)`}>
        <motion.rect
          y="50"
          width="22"
          height="120"
          fill="white"
          opacity="0.45"
          transform="rotate(25 60 108)"
          initial={{ x: -60 }}
          animate={reduce ? undefined : { x: [-60, 170] }}
          transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 2.6, ease: 'easeInOut' }}
        />
      </g>
    </motion.svg>
  )
}
