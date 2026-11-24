import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CirclePlay, GitMerge, Globe, Lock, Medal, Trophy, X } from 'lucide-react'
import { categories, projectById, projects } from '../data/projects'
import type { Category, LinkKind, Project } from '../data/types'
import { ui, useLang } from '../lib/i18n'
import { TechChip } from '../lib/techIcons'
import { asset, AwardRing, AwardTag, Card, fade, GithubIcon, nb } from '../components/bits'
import { ProjectArt } from '../components/ProjectArt'

function Thumb({ p }: { p: Project }) {
  const zoom = 'h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]'
  if (p.image)
    return (
      <img
        src={asset(p.image)}
        alt=""
        loading="lazy"
        className={`${zoom} object-cover ${p.pixelated ? '[image-rendering:pixelated]' : ''}`}
      />
    )
  return <div className={zoom}>{p.art && <ProjectArt art={p.art} animate />}</div>
}

function LinkIcon({ kind }: { kind: LinkKind }) {
  if (kind === 'repo') return <GithubIcon className="size-3.5" />
  if (kind === 'video') return <CirclePlay className="size-3.5" />
  if (kind === 'pr') return <GitMerge className="size-3.5" />
  if (kind === 'demo') return <Globe className="size-3.5" />
  return <ArrowUpRight className="size-3.5" />
}

function Links({ p, size = 'sm' }: { p: Project; size?: 'sm' | 'md' }) {
  const { t } = useLang()
  const pad = size === 'md' ? 'px-3.5 py-2 text-sm' : 'px-3 py-1.5 text-xs'
  return (
    <div className="flex flex-wrap gap-2">
      {p.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface font-semibold text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent ${pad}`}
        >
          <LinkIcon kind={l.kind} />
          {t(l.label)}
        </a>
      ))}
      {p.privateNote && (
        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-dashed border-line text-faint ${pad}`}>
          <Lock className="size-3.5" />
          {t(ui.privateCode)}
        </span>
      )}
    </div>
  )
}

/* ---------------- card ---------------- */

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (id: string) => void }) {
  const { t } = useLang()
  // Award projects with a photo get the wide card. Drawn art is composed for 16:10 and would be
  // cropped in the wide card's tall thumbnail, so those keep the normal card (with the gold ring).
  const wide = !!p.award && !p.art
  return (
    <Card
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`card-hover group flex flex-col overflow-hidden ${p.award ? 'award-glow' : ''} ${wide ? 'lg:col-span-2' : ''}`}
    >
      {p.award && <AwardRing />}
      <button
        onClick={() => onOpen(p.id)}
        className={`flex flex-1 flex-col text-left ${wide ? 'lg:flex-row' : ''}`}
        aria-label={`${p.title} · ${t(ui.details)}`}
      >
        <div className={`relative aspect-[16/10] overflow-hidden bg-slate-900 ${wide ? 'lg:aspect-auto lg:w-[54%] lg:shrink-0' : ''}`}>
          <Thumb p={p} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
          <span className="absolute left-3 top-3 whitespace-nowrap rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {t(p.period)}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          {p.award && <AwardTag award={p.award} className="self-start" />}
          <div>
            <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
            <p className="text-sm text-faint">{t(p.role)}</p>
          </div>
          <p className="text-[14.5px] leading-relaxed text-muted text-balance">{nb(t(p.summary))}</p>
          <div className="flex items-baseline gap-2">
            <span className="shrink-0 whitespace-nowrap text-xl font-extrabold text-gradient">{t(p.metric.value)}</span>
            <span className="text-xs leading-snug text-faint text-balance">{t(p.metric.label)}</span>
          </div>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {p.tech.slice(0, 4).map((n) => (
              <TechChip key={n} name={n} />
            ))}
          </div>
        </div>
      </button>
      <div className="border-t border-line px-5 py-3">
        <Links p={p} />
      </div>
    </Card>
  )
}

/* ---------------- details panel ---------------- */

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
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${p.id}-title`}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface shadow-2xl sm:rounded-3xl"
        initial={{ y: 48, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 32, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        <div className="group relative aspect-[16/8] overflow-hidden bg-slate-900">
          <Thumb p={p} />
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
            {[p.period, p.role].map((x) => (
              <span key={x.en} className="whitespace-nowrap rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {t(x)}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {p.award && (
            <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-300/20 via-amber-200/10 to-transparent p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 text-amber-950 shadow-md shadow-amber-500/30">
                {p.award.medal === 'place' ? <Trophy className="size-6" /> : <Medal className="size-6" />}
              </span>
              <div className="min-w-0">
                <p className="font-bold leading-snug">{t(p.award.title)}</p>
                <p className="text-sm text-muted">
                  {t(p.award.event)} · {t(p.award.date)}
                </p>
                {p.award.note && <p className="mt-0.5 text-xs font-medium text-gold">{t(p.award.note)}</p>}
              </div>
            </div>
          )}

          <div>
            <h3 id={`${p.id}-title`} className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {p.title}
            </h3>
            <p className="mt-1 text-muted">{t(p.subtitle)}</p>
          </div>

          <p className="leading-relaxed text-pretty">{nb(t(p.description))}</p>

          <div className="rounded-2xl border border-line bg-gradient-to-r from-accent/10 to-accent-2/10 p-4">
            <div className="text-2xl font-extrabold text-gradient">{t(p.metric.value)}</div>
            <div className="text-sm text-muted">{t(p.metric.label)}</div>
          </div>

          <ul className="space-y-3">
            {p.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.07 }}
                className="flex gap-3 text-[15px] leading-relaxed text-muted"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                <span className="text-pretty">{nb(t(b))}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {p.tech.map((n) => (
              <TechChip key={n} name={n} size="md" />
            ))}
          </div>

          {p.privateNote && <p className="text-sm text-faint">{t(p.privateNote)}</p>}
          <Links p={p} size="md" />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- page ---------------- */

export function ProjectsPage() {
  const { t } = useLang()
  const [filter, setFilter] = useState<'all' | Category>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const list = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))
  const stats = [
    { n: projects.length, label: ui.statProjects },
    { n: projects.filter((p) => p.award).length, label: ui.statAwards },
    { n: projects.filter((p) => p.links.some((l) => l.kind === 'demo')).length, label: ui.statDemos },
  ]

  const open = useCallback((id: string) => {
    lastFocus.current = document.activeElement as HTMLElement
    setOpenId(id)
  }, [])
  const close = useCallback(() => {
    setOpenId(null)
    lastFocus.current?.focus()
  }, [])

  return (
    <section className="pt-12 sm:pt-16">
      <div style={fade(0)} className="fade-in flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <h1 className="text-[32px] font-extrabold leading-tight tracking-tight sm:text-[40px]">{t(ui.projectsTitle)}</h1>
          <p className="mt-2 text-muted text-balance">{t(ui.projectsSub)}</p>
        </div>
        <div className="flex gap-2">
          {stats.map((s) => (
            <div key={s.label.en} className="rounded-2xl border border-line bg-surface px-4 py-2 text-center">
              <div className="text-xl font-extrabold text-gradient">{s.n}</div>
              <div className="whitespace-nowrap text-[11px] font-medium text-faint">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={fade(1)} role="tablist" aria-label={t(ui.projectsTitle)} className="fade-in mt-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = filter === c.id
          const count = c.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(c.id as Category)).length
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c.id)}
              className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active ? 'border-transparent text-white' : 'border-line bg-surface text-muted hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {t(c.label)} <span className={active ? 'opacity-80' : 'text-faint'}>{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <motion.div layout style={fade(2)} className="fade-in mt-8 grid gap-5 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={open} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{openId && <ProjectModal key={openId} p={projectById(openId)} onClose={close} />}</AnimatePresence>
    </section>
  )
}
