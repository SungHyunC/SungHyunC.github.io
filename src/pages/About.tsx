import { useState, type ComponentType } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Boxes,
  BrainCircuit,
  Briefcase,
  Check,
  Code,
  Copy,
  FileText,
  GraduationCap,
  Layers,
  LayoutGrid,
  Mail,
  MapPin,
  Medal,
  Trophy,
  Wrench,
} from 'lucide-react'
import { awards, education, experience, metaHighlight, profile, skills, type SkillGroup } from '../data/profile'
import { ui, useLang } from '../lib/i18n'
import { TechChip } from '../lib/techIcons'
import { asset, AwardRing, Avatar, Card, CountUp, fade, GithubIcon, LinkedinIcon, nb, SectionTitle } from '../components/bits'

const pill =
  'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink'

function Hero() {
  const { t, lang } = useLang()
  const [before, focus, after] = profile.lead[lang]
  return (
    <section className="pt-12 sm:pt-16">
      <div style={fade(0)} className="fade-in flex items-center gap-4 sm:gap-5">
        {profile.photo && <Avatar src={profile.photo} className="size-[68px] sm:size-[88px]" />}
        <div className="min-w-0">
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight sm:text-[40px]">{t(profile.name)}</h1>
          <p className="mt-0.5 text-[15px] text-faint">{t(profile.altName)}</p>
        </div>
      </div>

      <p style={fade(1)} className="fade-in mt-7 text-lg leading-relaxed text-balance sm:text-xl">
        {before}
        <span className="text-gradient font-semibold sm:whitespace-nowrap">{nb(focus)}</span>
        {after}
      </p>

      <ul style={fade(2)} className="fade-in mt-5 flex flex-wrap gap-2 text-sm">
        <li>
          <a
            href={metaHighlight.href}
            target="_blank"
            rel="noreferrer"
            className="award-tag inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-amber-400/40 bg-gold-bg px-3 py-1 font-semibold text-gold transition duration-200 hover:-translate-y-0.5"
          >
            <Trophy className="size-4" aria-hidden />
            {t(metaHighlight.chip)}
          </a>
        </li>
        <li className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {t(profile.available)}
        </li>
        <li className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 text-muted">
          <BadgeCheck className="size-4 text-accent" aria-hidden />
          {t(profile.citizenship)}
        </li>
        <li className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 text-muted">
          <MapPin className="size-4 text-accent" aria-hidden />
          {t(profile.location)}
        </li>
      </ul>

      <p style={fade(3)} className="fade-in mt-6 leading-[1.8] text-muted text-balance">
        {nb(t(profile.bio))}
      </p>

      <div style={fade(4)} className="fade-in mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-accent/40"
        >
          {t(ui.viewProjects)}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className={pill}>
            <GithubIcon /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={pill}>
            <LinkedinIcon className="size-4 text-[#0A66C2] dark:text-[#4a9be8]" /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className={pill}>
            <Mail className="size-4" /> {t(ui.email)}
          </a>
          {profile.resume && (
            <a href={asset(profile.resume)} target="_blank" rel="noreferrer" className={pill}>
              <FileText className="size-4" /> {t(ui.resume)}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

function Awards() {
  const { t } = useLang()
  const [meta, capstone] = awards
  return (
    <section style={fade(5)} className="fade-in mt-16">
      <SectionTitle icon={Trophy} title={ui.awards} />
      <div className="grid gap-4">
        {/* the Meta hackathon result, featured with its verified numbers */}
        <Card
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="award-glow overflow-hidden p-5 sm:p-6"
        >
          <AwardRing />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-200/45 via-amber-100/10 to-transparent dark:from-amber-400/12 dark:via-transparent" />
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 text-amber-950 shadow-lg shadow-amber-500/30 sm:size-14">
              <Trophy className="size-6 sm:size-7" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gold">{t(meta.date)}</p>
              <h3 className="mt-0.5 text-2xl font-black leading-tight tracking-tight sm:text-[28px]">
                <span className="text-gold-gradient">{t(metaHighlight.place)}</span>
                <span className="sr-only"> · {t(meta.title)}</span>
              </h3>
              <p className="text-sm font-semibold">{t(metaHighlight.track)}</p>
              <p className="mt-1 text-sm text-muted text-balance">{t(meta.org)}</p>
              {meta.detail && <p className="mt-0.5 text-xs text-faint">{t(meta.detail)}</p>}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {metaHighlight.stats.map((s) => (
              <div key={s.label.en} className="rounded-xl border border-amber-400/25 bg-amber-300/10 px-2 py-2.5 text-center">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} className="text-lg font-extrabold text-gold sm:text-xl" />
                <div className="mt-0.5 text-[11px] leading-tight text-faint">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="award-glow overflow-hidden p-5"
        >
          <AwardRing />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-200/30 via-transparent to-transparent dark:from-amber-400/8" />
          <div className="flex items-start gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 text-amber-950 shadow-md shadow-amber-500/30">
              <Medal className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gold">{t(capstone.date)}</p>
              <h3 className="mt-0.5 font-bold leading-snug">{t(capstone.title)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted text-balance">{nb(t(capstone.org))}</p>
              {capstone.detail && <p className="mt-0.5 text-xs text-faint">{t(capstone.detail)}</p>}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

function Experience() {
  const { t } = useLang()
  return (
    <section className="mt-16">
      <SectionTitle icon={Briefcase} title={ui.experience} />
      <ol className="relative ml-1.5 space-y-9 border-l border-line pl-7">
        {experience.map((e) => (
          <li key={e.title.en} className="relative">
            <span
              aria-hidden
              className="absolute -left-[38px] top-0.5 grid size-[18px] place-items-center rounded-full border border-line bg-surface"
            >
              <span className="size-2 rounded-full bg-gradient-to-br from-accent to-accent-2" />
            </span>
            <p className="text-xs font-semibold text-accent">{t(e.date)}</p>
            <h3 className="mt-1 font-bold leading-snug">{t(e.title)}</h3>
            <p className="text-sm text-faint text-balance">{t(e.org)}</p>
            {e.detail && (
              <p
                className={`mt-2 text-[15px] leading-relaxed text-muted ${
                  t(e.detail).length > 120 ? 'text-pretty' : 'text-balance'
                }`}
              >
                {nb(t(e.detail))}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

function Education() {
  const { t } = useLang()
  return (
    <section className="mt-16">
      <SectionTitle icon={GraduationCap} title={ui.education} />
      {education.map((e) => (
        <Card key={e.title.en} className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-bold">{t(e.title)}</h3>
            <span className="whitespace-nowrap rounded-full bg-soft px-2.5 py-0.5 text-xs font-medium text-muted">{t(e.date)}</span>
          </div>
          <p className="mt-1 text-[15px] text-muted">{t(e.org)}</p>
        </Card>
      ))}
    </section>
  )
}

const groupIcon: Record<SkillGroup['id'], ComponentType<{ className?: string }>> = {
  lang: Code,
  ml: BrainCircuit,
  sim: Boxes,
  ai: Bot,
  web: LayoutGrid,
  tools: Wrench,
}

function Skills() {
  const { t } = useLang()
  return (
    <section className="mt-16">
      <SectionTitle icon={Layers} title={ui.skills} />
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g) => {
          const Icon = groupIcon[g.id]
          return (
            <Card key={g.id} className="p-5">
              <div className="mb-3.5 flex items-center gap-2 text-sm font-semibold">
                <Icon className="size-4 text-accent" />
                {t(g.group)}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((n) => (
                  <TechChip key={n} name={n} size="md" />
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section className="mt-16">
      <SectionTitle icon={Mail} title={ui.contact} />
      <Card className="overflow-hidden p-6 sm:p-7">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10" />
        <p className="leading-relaxed text-muted text-balance">{nb(t(ui.contactText))}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition hover:-translate-y-0.5 hover:opacity-90"
          >
            <Mail className="size-4" /> {profile.email}
          </a>
          <button onClick={copy} aria-live="polite" className={pill}>
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            {copied ? t(ui.copied) : t(ui.copy)}
          </button>
        </div>
      </Card>
    </section>
  )
}

export function About() {
  return (
    <>
      <Hero />
      <Awards />
      <Experience />
      <Education />
      <Skills />
      <Contact />
    </>
  )
}
