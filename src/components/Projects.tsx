import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CirclePlay, GitMerge, Globe, Lock, X } from 'lucide-react'
import { categories, projectById, projects } from '../data/projects'
import type { Category, LinkKind, Project } from '../data/types'
import { ui, useLang } from '../lib/i18n'
import { AwardBadge, AwardRing, Medal } from './award'
import { ProjectArt } from './ProjectArt'
import { Card, GithubIcon, Section, TechChip } from './ui'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function ProjectThumb({ p }: { p: Project }) {
  const cls = 'h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]'
  if (p.image) return <img src={asset(p.image)} alt="" loading="lazy" className={`${cls} object-cover`} />
  return <div className={cls}>{p.art && <ProjectArt art={p.art} />}</div>
}

function LinkIcon({ kind }: { kind: LinkKind }) {
  if (kind === 'repo') return <GithubIcon className="size-3.5" />
  if (kind === 'video') return <CirclePlay className="size-3.5" />
  if (kind === 'pr') return <GitMerge className="size-3.5" />
  if (kind === 'demo') return <Globe className="size-3.5" />
  return <ArrowUpRight className="size-3.5" />
}

export function ProjectLinks({ p, size = 'sm' }: { p: Project; size?: 'sm' | 'md' }) {
  const { t } = useLang()
  const pad = size === 'md' ? 'px-3.5 py-2 text-sm' : 'px-2.5 py-1 text-xs'
  return (
    <div className="flex flex-wrap gap-2">
      {p.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 rounded-full border border-line font-medium text-ink-soft transition hover:-translate-y-0.5 hover:border-accent hover:text-accent ${pad}`}
        >
          <LinkIcon kind={l.kind} />
          {t(l.label)}
        </a>
      ))}
      {p.privateNote && (
        <span className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-line text-ink-faint ${pad}`}>
          <Lock className="size-3.5" />
          {t(ui.privateCode)}
        </span>
      )}
    </div>
  )
}

/* ---------- modal (shared by the bento tiles and the project grid) ---------- */

const ModalCtx = createContext<(id: string) => void>(() => {})
export const useOpenProject = () => useContext(ModalCtx)

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const open = useCallback((id: string) => {
    lastFocus.current = document.activeElement as HTMLElement
    setOpenId(id)
  }, [])
  const close = useCallback(() => {
    setOpenId(null)
    lastFocus.current?.focus()
  }, [])
  return (
    <ModalCtx.Provider value={open}>
      {children}
      <AnimatePresence>{openId && <ProjectModal key={openId} p={projectById(openId)} onClose={close} />}</AnimatePresence>
    </ModalCtx.Provider>
  )
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const { t } = useLang()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${p.id}-title`}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface-strong shadow-2xl sm:rounded-3xl"
        initial={{ y: 48, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 32, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        {p.award && <AwardRing />}
        <div className="relative aspect-[16/8] overflow-hidden bg-slate-900">
          <ProjectThumb p={p} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={t(ui.close)}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:rotate-90 hover:bg-black/70"
          >
            <X className="size-4" />
          </button>
          <div className="absolute bottom-4 left-5 flex flex-wrap gap-2">
            <span className="chip !border-white/20 !bg-black/50 !text-white">{t(p.period)}</span>
            <span className="chip !border-white/20 !bg-black/50 !text-white">{t(p.role)}</span>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {p.award && (
            <a
              href={p.award.href}
              target="_blank"
              rel="noreferrer"
              className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-300/15 via-amber-200/10 to-transparent p-4"
            >
              <Medal award={p.award} className="h-20 w-auto shrink-0" />
              <div>
                <AwardBadge award={p.award} />
                <p className="mt-2 font-bold">{t(p.award.title)}</p>
                <p className="text-sm text-ink-soft">
                  {t(p.award.event)} · {t(p.award.date)}
                </p>
              </div>
            </a>
          )}

          <div>
            <h3 id={`${p.id}-title`} className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {p.title}
            </h3>
            <p className="mt-1 text-ink-soft">{t(p.subtitle)}</p>
          </div>

          <p className="leading-relaxed">{t(p.summary)}</p>

          <div className="rounded-2xl border border-line bg-gradient-to-r from-accent/10 to-accent-2/10 p-4">
            <div className="text-2xl font-extrabold text-gradient">{t(p.metric.value)}</div>
            <div className="text-sm text-ink-soft">{t(p.metric.label)}</div>
          </div>

          <ul className="space-y-3">
            {p.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                <span>{t(b)}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((x) => (
              <TechChip key={x} name={x} />
            ))}
          </div>

          {p.privateNote && <p className="text-sm text-ink-faint">{t(p.privateNote)}</p>}
          <ProjectLinks p={p} size="md" />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- grid ---------- */

function ProjectCard({ p }: { p: Project }) {
  const { t } = useLang()
  const open = useOpenProject()
  return (
    <Card
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`group flex flex-col overflow-hidden ${p.award ? 'award-glow lg:col-span-2' : ''}`}
    >
      {p.award && <AwardRing />}
      <button
        onClick={() => open(p.id)}
        className={`flex flex-1 flex-col text-left ${p.award ? 'lg:flex-row' : ''}`}
        aria-label={`${p.title} · ${t(ui.details)}`}
      >
        <div className={`relative aspect-[16/10] overflow-hidden bg-slate-900 ${p.award ? 'lg:aspect-auto lg:w-[54%] lg:shrink-0' : ''}`}>
          <ProjectThumb p={p} />
          {p.award && <div className="award-ribbon">{t(ui.awardRibbon)}</div>}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent" />
          <span className="chip absolute left-3 top-3 !border-white/20 !bg-black/50 !text-white backdrop-blur">{t(p.period)}</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          {p.award && <AwardBadge award={p.award} className="self-start" />}
          <div>
            <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
            <p className="text-sm text-ink-faint">{t(p.role)}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{t(p.summary)}</p>
          <div className="flex items-baseline gap-2">
            <span className="shrink-0 whitespace-nowrap text-lg font-extrabold text-gradient">{t(p.metric.value)}</span>
            <span className="text-xs leading-snug text-ink-faint">{t(p.metric.label)}</span>
          </div>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {p.tech.slice(0, 4).map((x) => (
              <TechChip key={x} name={x} />
            ))}
          </div>
        </div>
      </button>
      <div className="border-t border-line px-5 py-3">
        <ProjectLinks p={p} />
      </div>
    </Card>
  )
}

export function Projects() {
  const { t } = useLang()
  const [filter, setFilter] = useState<'all' | Category>('all')
  const list = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <Section id="projects" title={ui.sections.projects.title} sub={ui.sections.projects.sub}>
      <div role="tablist" aria-label={t(ui.sections.projects.title)} className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = filter === c.id
          const count = c.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(c.id as Category)).length
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c.id)}
              className={`relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active ? 'border-transparent text-white' : 'border-line text-ink-soft hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {t(c.label)} <span className={active ? 'opacity-80' : 'text-ink-faint'}>{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-5 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
