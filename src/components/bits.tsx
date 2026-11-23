import { useEffect, useRef, type ComponentProps, type ComponentType, type CSSProperties } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { Award as AwardIcon } from 'lucide-react'
import type { Award, Text } from '../data/types'
import { useLang } from '../lib/i18n'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/** Non-breaking hyphens inside words, so "rule-based" never splits across two lines. */
export const nb = (s: string) => s.replace(/(\w)-(\w)/g, '$1‑$2')

/** Inline style for the CSS fade-in, delayed by `step` × 60 ms. */
export const fade = (step: number): CSSProperties => ({ ['--d' as string]: `${step * 60}ms` })

/** Card with a light that follows the cursor. Accepts motion props (layout, whileHover, …). */
export function Card({ className = '', children, ...rest }: ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      onPointerMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      className={`card ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Counts up from 0 once scrolled into view (numbers below 100 are shown as they are). */
export function CountUp({ to, prefix = '', suffix = '', className = '' }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const fmt = (v: number) => `${prefix}${Math.round(v).toLocaleString('en-US')}${suffix}`
  const animated = to >= 100 && !reduce
  useEffect(() => {
    const el = ref.current
    if (!el || !inView || !animated) return
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = fmt(v)) })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, animated, to])
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt(animated ? 0 : to)}
    </span>
  )
}

/** Section heading with a small tinted icon tile. */
export function SectionTitle({ icon: Icon, title }: { icon: ComponentType<{ className?: string }>; title: Text }) {
  const { t } = useLang()
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent ring-1 ring-accent/15">
        <Icon className="size-[18px]" />
      </span>
      <h2 className="text-xl font-bold tracking-tight">{t(title)}</h2>
    </div>
  )
}

/** Small gold award tag with a light sweep. */
export function AwardTag({ award, className = '' }: { award: Award; className?: string }) {
  const { t } = useLang()
  return (
    <span
      className={`award-tag inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-amber-400/40 bg-gold-bg px-2.5 py-1 text-xs font-semibold leading-none text-gold ${className}`}
    >
      <AwardIcon className="size-3.5 shrink-0" aria-hidden />
      {t(award.short)}
    </span>
  )
}

export function AwardRing() {
  return <span aria-hidden className="award-ring" />
}

/** Round profile photo inside a slowly turning gradient ring. */
export function Avatar({ src, className = 'size-[88px]' }: { src: string; className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <span
        aria-hidden
        className="absolute -inset-[3px] animate-spin-slow rounded-full bg-[conic-gradient(var(--accent),var(--accent-2),#f59e0b,var(--accent))] opacity-90"
      />
      <span className="absolute inset-0 rounded-full bg-bg" />
      <img src={asset(src)} alt="" className="absolute inset-[3px] size-[calc(100%-6px)] rounded-full object-cover" />
    </span>
  )
}

/** Very faint light that follows the cursor on devices with a mouse. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
      el.style.opacity = '1'
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return <div ref={ref} aria-hidden className="spotlight pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-700" />
}

export function GithubIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

