import { useState } from 'react'
import { ArrowRight, BadgeCheck, Check, Copy, FileText, Mail, MapPin } from 'lucide-react'
import { awards, education, experience, profile, skills } from '../data/profile'
import { ui, useLang } from '../lib/i18n'
import { asset, EntryRow, fade, GithubIcon, LinkedinIcon, nb, Section } from '../components/bits'

function Hero() {
  const { t } = useLang()
  const link = 'link inline-flex items-center gap-1.5 text-sm font-medium'
  return (
    <section className="pt-14 sm:pt-20">
      <h1 style={fade(0)} className="fade-in text-[32px] font-bold leading-tight tracking-tight sm:text-[40px]">
        {t(profile.name)}
      </h1>
      <p style={fade(1)} className="fade-in mt-1 text-[15px] text-faint">
        {t(profile.altName)}
      </p>

      <p style={fade(2)} className="fade-in mt-6 text-lg leading-relaxed text-balance sm:text-xl">
        {nb(t(profile.lead))}
      </p>

      <ul style={fade(3)} className="fade-in mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        <li className="inline-flex items-center gap-2 whitespace-nowrap font-medium text-ink">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          {t(profile.available)}
        </li>
        <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <BadgeCheck className="size-4 text-faint" aria-hidden />
          {t(profile.citizenship)}
        </li>
        <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <MapPin className="size-4 text-faint" aria-hidden />
          {t(profile.location)}
        </li>
      </ul>

      <p style={fade(4)} className="fade-in mt-6 leading-[1.8] text-muted text-pretty">
        {nb(t(profile.bio))}
      </p>

      <div style={fade(5)} className="fade-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a
          href="#projects"
          className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          {t(ui.viewProjects)}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className={link}>
            <GithubIcon /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}>
            <LinkedinIcon /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className={link}>
            <Mail className="size-4" /> {t(ui.email)}
          </a>
          {profile.resume && (
            <a href={asset(profile.resume)} target="_blank" rel="noreferrer" className={link}>
              <FileText className="size-4" /> {t(ui.resume)}
            </a>
          )}
        </div>
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
    <Section title={ui.contact}>
      <p className="leading-relaxed text-muted text-balance">{nb(t(ui.contactText))}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="font-medium underline decoration-line decoration-1 underline-offset-[5px] transition-colors hover:decoration-ink"
        >
          {profile.email}
        </a>
        <button
          onClick={copy}
          aria-live="polite"
          className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-ink"
        >
          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          {copied ? t(ui.copied) : t(ui.copy)}
        </button>
      </div>
    </Section>
  )
}

export function About() {
  const { t } = useLang()
  return (
    <>
      <Hero />

      <Section title={ui.awards}>
        <div className="space-y-6">
          {awards.map((a) => (
            <EntryRow key={a.title.en} entry={a} award />
          ))}
        </div>
      </Section>

      <Section title={ui.experience}>
        <div className="space-y-8">
          {experience.map((e) => (
            <EntryRow key={e.title.en} entry={e} />
          ))}
        </div>
      </Section>

      <Section title={ui.education}>
        {education.map((e) => (
          <EntryRow key={e.title.en} entry={e} />
        ))}
      </Section>

      <Section title={ui.skills}>
        <dl className="space-y-3">
          {skills.map((s) => (
            <div key={s.group.en} className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[120px_1fr]">
              <dt className="font-medium">{t(s.group)}</dt>
              <dd className="text-muted text-balance">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Contact />
    </>
  )
}
