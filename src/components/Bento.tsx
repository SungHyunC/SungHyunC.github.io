import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowDown, ArrowUpRight, BadgeCheck, Briefcase, Calendar, FileText, FlaskConical, GraduationCap, Lock, Mail, MapPin, Sparkles as SparkIcon } from 'lucide-react'
import { profile } from '../data/profile'
import { capstoneAward, metaAward, projectById, projects } from '../data/projects'
import type { Project } from '../data/types'
import { ui, useLang } from '../lib/i18n'
import { AwardBadge, AwardRing, Medal, Sparkles } from './award'
import { asset, ProjectThumb, useOpenProject } from './Projects'
import { Card, CountUp, GithubIcon, LinkedinIcon, Typewriter } from './ui'

const tile: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function Bento() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
      <motion.div
        className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-4"
        initial={reduce ? false : 'hidden'}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
      >
        <ProfileTile />
        <MetaAwardTile />
        <EducationTile />
        <StatusTile />
        <FeaturedTile p={projectById('video2urdf')} />
        <F16Tile p={projectById('f16')} />
        <ExcellenceTile />
        <ResearchTile />
        <WideTile p={projectById('ma-bems')} />
        <NumbersTile />
        <SeeAllTile />
      </motion.div>
    </section>
  )
}

function Avatar() {
  const reduce = useReducedMotion()
  return (
    <div className="relative size-16 shrink-0">
      <div className="absolute -inset-2 rounded-full border border-dashed border-accent/40" />
      <motion.div
        className="absolute -inset-2"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
      </motion.div>
      <div className="absolute inset-0 grid place-items-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-accent-2 text-xl font-black text-white shadow-lg">
        {profile.photo ? <img src={asset(profile.photo)} alt="" className="h-full w-full object-cover" /> : profile.initials}
      </div>
    </div>
  )
}

function ProfileTile() {
  const { t, lang } = useLang()
  const btn =
    'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-accent'
  return (
    <Card variants={tile} className="flex flex-col justify-between gap-6 p-6 sm:col-span-2 sm:p-8 lg:row-span-2">
      <div className="flex items-start justify-between gap-4">
        <Avatar />
        <span className="chip !py-1 !text-emerald-700 dark:!text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
            <span className="relative size-2 rounded-full bg-emerald-400" />
          </span>
          {t(profile.available)}
        </span>
      </div>

      <div>
        <p className="label mb-2">{t(profile.role)}</p>
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">{t(profile.name)}</h1>
        <p className="mt-1.5 text-ink-faint">{t(profile.altName)}</p>
        <p className="mt-5 font-mono text-sm">
          <span className="text-ink-faint">{t(ui.focus)} ▸ </span>
          <Typewriter key={lang} words={profile.focus[lang]} />
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{t(profile.bio)}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-accent/40"
        >
          <GithubIcon /> GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className={btn}>
          <LinkedinIcon /> LinkedIn
        </a>
        <a href={`mailto:${profile.email}`} className={btn}>
          <Mail className="size-4" /> {t(ui.email)}
        </a>
        {profile.resume && (
          <a href={asset(profile.resume)} target="_blank" rel="noreferrer" className={btn}>
            <FileText className="size-4" /> {t(ui.resume)}
          </a>
        )}
        <span className="ml-auto inline-flex items-center gap-1.5 text-sm text-ink-faint">
          <MapPin className="size-4" /> {t(profile.location)}
        </span>
      </div>
    </Card>
  )
}

function MetaAwardTile() {
  const { t } = useLang()
  return (
    <Card variants={tile} className="award-glow relative flex flex-col overflow-hidden p-6 lg:row-span-2">
      <AwardRing />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-300/25 via-amber-200/5 to-transparent dark:from-amber-400/15" />
      <Sparkles points={[[10, 10, 11], [84, 8, 15], [90, 36, 9], [6, 40, 9], [74, 52, 7], [20, 60, 6]]} />
      <div className="flex justify-center">
        <Medal award={metaAward} className="h-36 w-auto drop-shadow-[0_14px_22px_rgba(217,119,6,0.35)]" />
      </div>
      <div className="mt-3 text-center">
        <div className="text-4xl font-black tracking-tight gold-text">{t({ en: '5th Place', ko: '5위 입상' })}</div>
        <div className="mt-1 font-semibold leading-snug">{t(metaAward.event)}</div>
        <div className="text-xs text-ink-soft">
          {t({ en: 'Indie Developer Track', ko: '인디 개발자 트랙' })} · {t(metaAward.date)}
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2 pt-5 text-center">
        <div className="rounded-xl border border-amber-400/25 bg-amber-300/10 p-2">
          <CountUp to={25000} prefix="$" className="text-lg font-extrabold gold-text" />
          <div className="text-[11px] text-ink-faint">{t(ui.prize)}</div>
        </div>
        <div className="rounded-xl border border-amber-400/25 bg-amber-300/10 p-2">
          <CountUp to={5367} className="text-lg font-extrabold" />
          <div className="text-[11px] text-ink-faint">{t({ en: 'projects submitted', ko: '전체 출품작' })}</div>
        </div>
      </div>
      <a
        href={metaAward.href}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-medium text-ink-soft transition hover:text-accent"
      >
        Video2URDF · {t(ui.builtSolo)} <ArrowUpRight className="size-3.5" />
      </a>
    </Card>
  )
}

function EducationTile() {
  const { t } = useLang()
  return (
    <Card variants={tile} className="flex flex-col p-5">
      <div className="label flex items-center gap-2">
        <GraduationCap className="size-4 text-accent" />
        {t(ui.education)}
      </div>
      <div className="mt-3 font-bold leading-snug">{t(profile.education.school)}</div>
      <div className="text-sm text-ink-soft">{t(profile.education.degree)}</div>
      <div className="mt-auto pt-3">
        <span className="chip">
          <Calendar className="size-3" /> {t(profile.education.grad)}
        </span>
      </div>
    </Card>
  )
}

function StatusTile() {
  const { t } = useLang()
  return (
    <Card variants={tile} className="flex flex-col p-5">
      <div className="label flex items-center gap-2">
        <Briefcase className="size-4 text-accent" />
        {t(ui.lookingFor)}
      </div>
      <div className="mt-3 font-bold leading-snug">{t(profile.lookingFor.roles)}</div>
      <div className="text-sm text-ink-soft">{t(profile.lookingFor.where)}</div>
      <div className="mt-auto pt-3">
        <span className="chip !border-emerald-500/30 !text-emerald-700 dark:!text-emerald-300" title={t(ui.workAuth)}>
          <BadgeCheck className="size-3.5" /> {t(profile.lookingFor.auth)}
        </span>
      </div>
    </Card>
  )
}

function OverlayLinks({ p }: { p: Project }) {
  const { t } = useLang()
  return (
    <div className="flex flex-wrap gap-2">
      {p.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
        >
          {t(l.label)} <ArrowUpRight className="size-3.5" />
        </a>
      ))}
    </div>
  )
}

function FeaturedTile({ p }: { p: Project }) {
  const { t } = useLang()
  const open = useOpenProject()
  return (
    <Card
      variants={tile}
      className={`group relative min-h-[340px] overflow-hidden sm:col-span-2 lg:row-span-2 ${p.award ? 'award-glow' : ''}`}
    >
      {p.award && <AwardRing />}
      <div className="absolute inset-0 bg-slate-900">
        <ProjectThumb p={p} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
      {p.award && <div className="award-ribbon">{t(ui.awardRibbon)}</div>}
      <button onClick={() => open(p.id)} className="absolute inset-0 z-[1]" aria-label={`${p.title} · ${t(ui.details)}`} />
      <div className="pointer-events-none relative z-[2] flex h-full flex-col justify-end gap-2 p-6 text-white sm:p-7">
        <span className="label !text-white/70">{t(ui.featured)}</span>
        {p.award && <AwardBadge award={p.award} className="self-start" />}
        <h3 className="text-3xl font-extrabold tracking-tight">{p.title}</h3>
        <p className="max-w-lg text-sm leading-relaxed text-white/85">{t(p.summary)}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.slice(0, 4).map((x) => (
            <span key={x} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
              {x}
            </span>
          ))}
        </div>
        <div className="pointer-events-auto mt-2">
          <OverlayLinks p={p} />
        </div>
      </div>
    </Card>
  )
}

function F16Tile({ p }: { p: Project }) {
  const { t } = useLang()
  const open = useOpenProject()
  return (
    <Card variants={tile} className="group flex flex-col overflow-hidden lg:row-span-2">
      <button onClick={() => open(p.id)} className="flex flex-1 flex-col text-left" aria-label={`${p.title} · ${t(ui.details)}`}>
        <div className="relative h-40 overflow-hidden bg-slate-900 lg:h-44">
          <ProjectThumb p={p} />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <span className="label">{t(p.subtitle)}</span>
          <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
          <p className="line-clamp-3 text-sm text-ink-soft">{t(p.summary)}</p>
          <div className="mt-auto rounded-xl border border-line bg-gradient-to-r from-accent/10 to-accent-2/10 p-3">
            <div className="text-xl font-extrabold text-gradient">{t(p.metric.value)}</div>
            <div className="text-xs text-ink-faint">{t(p.metric.label)}</div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-faint">
            <Lock className="size-3" /> {t(ui.privateCode)} · {t(p.period)}
          </div>
        </div>
      </button>
    </Card>
  )
}

function ExcellenceTile() {
  const { t } = useLang()
  const open = useOpenProject()
  return (
    <Card variants={tile} className="award-glow relative flex items-center gap-3 overflow-hidden p-5">
      <AwardRing />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-300/20 via-transparent to-transparent dark:from-amber-400/12" />
      <Sparkles points={[[88, 10, 9], [6, 78, 7], [62, 82, 6]]} />
      <Medal award={capstoneAward} className="h-24 w-auto shrink-0 drop-shadow-[0_10px_16px_rgba(217,119,6,0.3)]" />
      <div className="min-w-0">
        <div className="label">
          {t(ui.award)} · {t(capstoneAward.date)}
        </div>
        <div className="mt-1 text-xl font-black gold-text">{t(capstoneAward.title)}</div>
        <div className="text-xs leading-snug text-ink-soft">{t(capstoneAward.event)}</div>
        <button onClick={() => open('multi-agent-bems')} className="mt-1.5 text-xs font-semibold text-accent hover:underline">
          Multi-Agent BEMS →
        </button>
      </div>
    </Card>
  )
}

function ResearchTile() {
  const { t } = useLang()
  return (
    <Card variants={tile} className="flex flex-col p-5">
      <div className="label flex items-center gap-2">
        <FlaskConical className="size-4 text-accent" />
        {t(ui.research)}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-lg font-bold text-ink-faint line-through decoration-accent/60">190h</span>
        <span className="text-ink-faint">→</span>
        <CountUp from={190} to={20} prefix="~" suffix="h" duration={2.2} className="text-3xl font-black text-gradient" />
      </div>
      <div className="text-xs text-ink-soft">{t(ui.researchStat)}</div>
      <a href="#research" className="mt-auto pt-2 text-xs font-medium text-ink-faint transition hover:text-accent">
        {t(ui.researchStatNote)} →
      </a>
    </Card>
  )
}

function WideTile({ p }: { p: Project }) {
  const { t } = useLang()
  const open = useOpenProject()
  return (
    <Card variants={tile} className="group overflow-hidden sm:col-span-2">
      <button onClick={() => open(p.id)} className="grid h-full w-full text-left sm:grid-cols-[1.15fr_1fr]" aria-label={`${p.title} · ${t(ui.details)}`}>
        <div className="relative min-h-44 overflow-hidden bg-slate-900">
          <ProjectThumb p={p} />
        </div>
        <div className="flex flex-col gap-1.5 p-5">
          <span className="label">
            {t(p.role)} · {t(p.period)}
          </span>
          <h3 className="text-lg font-bold">{p.title}</h3>
          <p className="text-xs text-ink-soft">{t(p.subtitle)}</p>
          <div className="mt-auto pt-2 text-3xl font-black text-gradient">
            −<CountUp to={16.7} decimals={1} suffix="%" />
          </div>
          <div className="text-xs text-ink-faint">{t(p.metric.label)}</div>
        </div>
      </button>
    </Card>
  )
}

function NumbersTile() {
  const { t } = useLang()
  const stats = [
    { n: projects.length, label: ui.statProjects },
    { n: projects.filter((p) => p.award).length, label: ui.statAwards },
    { n: projects.filter((p) => p.links.some((l) => l.kind === 'demo')).length, label: ui.statDemos },
  ]
  return (
    <Card variants={tile} className="flex flex-col justify-between p-5">
      <div className="label flex items-center gap-2">
        <SparkIcon className="size-4 text-accent" />
        {t(ui.atAGlance)}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {stats.map((s) => (
          <div key={s.label.en}>
            <CountUp to={s.n} className="text-3xl font-black" />
            <div className="text-[11px] leading-tight text-ink-faint">{t(s.label)}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function SeeAllTile() {
  const { t } = useLang()
  return (
    <motion.a
      variants={tile}
      href="#projects"
      className="card group flex flex-col justify-between bg-gradient-to-br from-accent/15 to-accent-2/20 p-5"
    >
      <div className="label">{t(ui.seeAllNote)}</div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-lg font-bold leading-snug">{t(ui.seeAll)}</span>
        <ArrowDown className="size-6 shrink-0 text-accent transition-transform group-hover:translate-y-1" />
      </div>
    </motion.a>
  )
}
