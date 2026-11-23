import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { Award } from 'lucide-react'
import type { Entry, Text } from '../data/types'
import { useLang } from '../lib/i18n'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/** Non-breaking hyphens inside words, so "rule-based" never splits across two lines. */
export const nb = (s: string) => s.replace(/(\w)-(\w)/g, '$1‑$2')

/** Inline style for the CSS fade-in, delayed by `step` × 60 ms. */
export const fade = (step: number): CSSProperties => ({ ['--d' as string]: `${step * 60}ms` })

export function Section({ title, children }: { title: Text; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-sm font-semibold text-faint">{t(title)}</h2>
      {children}
    </section>
  )
}

/** One row of Awards / Experience / Education. The date moves to the right on wider screens. */
export function EntryRow({ entry, award = false }: { entry: Entry; award?: boolean }) {
  const { t } = useLang()
  const indent = award ? 'pl-6' : ''
  const detail = entry.detail ? t(entry.detail) : ''
  return (
    <div className="grid gap-x-6 gap-y-1 sm:grid-cols-[1fr_auto]">
      <h3 className="flex items-start gap-2 font-semibold leading-snug">
        {award && <Award className="mt-[3px] size-4 shrink-0 text-gold" aria-hidden />}
        <span className="text-balance">{t(entry.title)}</span>
      </h3>
      <p className={`text-[15px] leading-relaxed text-muted text-balance sm:col-span-2 sm:row-start-2 ${indent}`}>
        {nb(t(entry.org))}
      </p>
      <p className={`text-sm text-faint sm:col-start-2 sm:row-start-1 sm:pl-0 sm:pt-0.5 sm:text-right ${indent}`}>
        {t(entry.date)}
      </p>
      {detail && (
        <p
          className={`leading-relaxed sm:col-span-2 sm:row-start-3 ${
            award
              ? 'pl-6 text-sm text-faint text-balance'
              : // balance short paragraphs; long ones use 'pretty' so no single word is left alone
                `mt-1 text-[15px] text-muted ${detail.length > 120 ? 'text-pretty' : 'text-balance'}`
          }`}
        >
          {nb(detail)}
        </p>
      )}
    </div>
  )
}

/** Small gold award tag. */
export function AwardTag({ text }: { text: Text }) {
  const { t } = useLang()
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-bg px-2.5 py-1 text-xs font-medium leading-none text-gold">
      <Award className="size-3.5 shrink-0" aria-hidden />
      {t(text)}
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
