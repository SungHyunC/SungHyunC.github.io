import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import type { Text } from '../data/types'
import { useLang } from '../lib/i18n'

/** Glass card with a spotlight that follows the cursor. */
export function Card({ className = '', children, ...rest }: ComponentProps<typeof motion.div>) {
  // no internal ref: AnimatePresence (popLayout) passes its own ref through `rest`
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

/** Fade-and-rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 24,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({
  id,
  title,
  sub,
  children,
}: {
  id: string
  title: Text
  sub: Text
  children: ReactNode
}) {
  const { t } = useLang()
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <Reveal className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-2" />
          <span className="label">{id}</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t(title)}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{t(sub)}</p>
      </Reveal>
      {children}
    </section>
  )
}

/** Counts up from `from` to `to` once it scrolls into view. */
export function CountUp({
  to,
  from = 0,
  decimals = 0,
  duration = 1.8,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number
  from?: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const fmt = (v: number) =>
    prefix +
    v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = fmt(to)
      return
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = fmt(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt(reduce ? to : from)}
    </span>
  )
}

/** Types and erases the phrases one by one. Give it a `key` per language to restart. */
export function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const word = words[i % words.length]
    let delay = deleting ? 35 : 70
    if (!deleting && n === word.length) delay = 1600
    if (deleting && n === 0) delay = 300
    const id = setTimeout(() => {
      if (!deleting && n === word.length) setDeleting(true)
      else if (deleting && n === 0) {
        setDeleting(false)
        setI((x) => x + 1)
      } else setN((x) => x + (deleting ? -1 : 1))
    }, delay)
    return () => clearTimeout(id)
  }, [n, deleting, i, words, reduce])

  const text = reduce ? words.join(' · ') : words[i % words.length].slice(0, n)
  return (
    <span>
      <span className="text-gradient font-semibold">{text}</span>
      {!reduce && <span className="ml-0.5 inline-block w-[2px] animate-blink bg-accent align-[-2px]">&nbsp;</span>}
    </span>
  )
}

export function TechChip({ name }: { name: string }) {
  return <span className="chip">{name}</span>
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
