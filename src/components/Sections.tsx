import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowUp, Check, Copy, FlaskConical, GitMerge, Globe, GraduationCap, Lock, Mail, Rocket, Trophy, Users } from 'lucide-react'
import { profile, research, skills, teamWork, timeline } from '../data/profile'
import type { TimelineKind } from '../data/types'
import { ui, useLang } from '../lib/i18n'
import { AwardRing } from './award'
import { Card, CountUp, GithubIcon, LinkedinIcon, Reveal, Section, TechChip } from './ui'

/* ---------------- Research ---------------- */

function SpeedBars() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const bar = (w: string, delay: number) => ({
    initial: reduce ? false : { width: 0 },
    whileInView: { width: w },
    viewport: { once: true },
    transition: { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] as const },
  })
  return (
    <div className="rounded-2xl border border-line p-5">
      <div className="label mb-4">{t(ui.cpuVsGpu)}</div>
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-ink-soft">
            <span>{t(ui.cpu)}</span>
            <span className="font-mono">~190{t(ui.hours)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-line">
            <motion.div className="h-full rounded-full bg-ink-faint/60" {...bar('100%', 0)} />
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-ink-soft">
            <span>{t(ui.gpu)}</span>
            <span className="font-mono">~20{t(ui.hours)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-line">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" {...bar('10.5%', 0.5)} />
          </div>
        </div>
      </div>
      <div className="mt-4 text-right text-sm font-bold">
        <span className="text-gradient">
          ≈<CountUp to={9.5} decimals={1} suffix="×" />
        </span>{' '}
        <span className="font-medium text-ink-faint">{t(ui.faster)}</span>
      </div>
    </div>
  )
}

export function Research() {
  const { t } = useLang()
  return (
    <Section id="research" title={ui.sections.research.title} sub={ui.sections.research.sub}>
      <Reveal>
        <Card className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="label">
                {t(research.org)} · {t(research.period)}
              </div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{t(research.title)}</h3>
              <p className="mt-1 text-ink-soft">{t(research.topic)}</p>
            </div>
            <span className="chip">
              <Lock className="size-3" /> {t(research.note)}
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
            <ol className="space-y-5">
              {research.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-ink-soft">{t(b)}</p>
                </motion.li>
              ))}
            </ol>
            <div className="space-y-4">
              <SpeedBars />
              <div className="grid grid-cols-2 gap-3">
                {research.stats.map((s) => (
                  <div key={s.label.en} className="rounded-2xl border border-line p-4">
                    <CountUp to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} className="text-2xl font-black" />
                    <div className="mt-0.5 text-xs leading-snug text-ink-faint">{t(s.label)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {research.tech.map((x) => (
              <TechChip key={x} name={x} />
            ))}
          </div>
        </Card>
      </Reveal>
    </Section>
  )
}

/* ---------------- Timeline ---------------- */

const kindIcon: Record<TimelineKind, typeof Trophy> = {
  award: Trophy,
  research: FlaskConical,
  project: Rocket,
  education: GraduationCap,
  team: Users,
  program: Globe,
}

export function Timeline() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="timeline" title={ui.sections.timeline.title} sub={ui.sections.timeline.sub}>
      <div ref={ref} className="relative">
        <div className="absolute left-[15px] top-0 h-full w-px bg-line sm:left-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-[14px] top-0 h-full w-[3px] origin-top rounded-full bg-gradient-to-b from-accent to-accent-2 sm:left-[calc(50%-1px)]"
        />
        <ol className="space-y-6 sm:space-y-2">
          {timeline.map((item, i) => {
            const Icon = kindIcon[item.kind]
            const award = item.kind === 'award'
            const right = i % 2 === 1
            return (
              <li key={i} className={`relative grid pl-12 sm:grid-cols-2 sm:gap-14 sm:pl-0 ${i > 0 ? 'sm:-mt-10' : ''}`}>
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className={`absolute left-0 top-4 z-10 grid size-8 place-items-center rounded-full sm:left-[calc(50%-16px)] ${
                    award
                      ? 'award-badge text-[#4a2c00]'
                      : 'border border-line bg-surface-strong text-accent shadow-sm'
                  }`}
                >
                  <Icon className="relative z-[2] size-4" />
                </motion.span>
                <Reveal className={right ? 'sm:col-start-2' : 'sm:col-start-1 sm:text-right'} y={16}>
                  <Card className={`relative overflow-hidden p-4 sm:p-5 ${award ? 'award-glow' : ''}`}>
                    {award && <AwardRing />}
                    <div className={`label flex items-center gap-2 ${right ? '' : 'sm:justify-end'}`}>
                      <span className={award ? 'font-bold text-gold' : 'text-accent'}>{t(item.date)}</span>
                      <span>·</span>
                      <span>{t(ui.kinds[item.kind])}</span>
                    </div>
                    <h3 className={`mt-1.5 font-bold leading-snug ${award ? 'gold-text text-lg' : ''}`}>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="hover:underline">
                          {t(item.title)}
                        </a>
                      ) : (
                        t(item.title)
                      )}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t(item.detail)}</p>
                  </Card>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}

/* ---------------- Team contributions ---------------- */

export function Team() {
  const { t } = useLang()
  return (
    <Section id="team" title={ui.sections.team.title} sub={ui.sections.team.sub}>
      <div className="grid gap-5 md:grid-cols-2">
        {teamWork.map((w, i) => (
          <Reveal key={w.name} delay={i * 0.1}>
            <Card className="flex h-full flex-col p-6">
              <div className="label">{t(w.context)}</div>
              <h3 className="mt-2 text-xl font-extrabold">{w.name}</h3>
              <p className="text-sm text-ink-faint">{t(w.subtitle)}</p>
              <p className="mt-3 leading-relaxed text-ink-soft">{t(w.summary)}</p>
              <ul className="mt-5 space-y-2">
                {w.prs.map((pr) => (
                  <li key={pr.num}>
                    <a
                      href={pr.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 transition hover:border-violet-400/60 hover:bg-violet-500/5"
                    >
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-violet-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                        <GitMerge className="size-3" /> {t(ui.merged)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm">
                        <span className="font-mono text-ink-faint">#{pr.num}</span> {t(pr.title)}
                      </span>
                      <span className="hidden font-mono text-[11px] text-ink-faint sm:inline">{pr.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
                {w.tech.map((x) => (
                  <TechChip key={x} name={x} />
                ))}
                <a
                  href={w.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-accent"
                >
                  <GithubIcon className="size-3.5" /> {t(ui.viewRepo)}
                </a>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Skills ---------------- */

export function Skills() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const all = skills.flatMap((g) => g.items)
  return (
    <Section id="skills" title={ui.sections.skills.title} sub={ui.sections.skills.sub}>
      {!reduce && (
        <div className="marquee-mask group mb-8 overflow-hidden py-1" aria-hidden>
          <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
            {[...all, ...all].map((s, i) => (
              <span key={i} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-soft">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group.en} delay={i * 0.06}>
            <Card className="h-full p-5">
              <h3 className="label mb-3 !text-accent">{t(g.group)}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <motion.span
                    key={s}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="chip cursor-default !px-3 !py-1 !text-[13px] hover:!border-accent hover:!text-ink"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Contact & footer ---------------- */

export function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      location.href = `mailto:${profile.email}`
    }
  }
  const btn =
    'inline-flex items-center gap-2 rounded-full border border-line bg-surface-strong/60 px-5 py-2.5 font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-accent'
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-10 pt-20 sm:px-6">
      <Reveal>
        <Card className="overflow-hidden p-8 text-center sm:p-14">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/15 via-transparent to-accent-2/15" />
          <div className="label mb-4">contact</div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="text-gradient">{t(ui.sections.contact.title)}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">{t(ui.sections.contact.sub)}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 font-semibold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5"
            >
              <Mail className="size-4" /> {profile.email}
            </a>
            <button onClick={copy} className={btn} aria-live="polite">
              {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              {copied ? t(ui.copied) : t(ui.copy)}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={btn}>
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={btn}>
              <GithubIcon /> GitHub
            </a>
          </div>
        </Card>
      </Reveal>
      <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row">
        <span>
          © 2026 {t(profile.name)} · {t(ui.builtWith)}
        </span>
        <a href="#top" className="inline-flex items-center gap-1 hover:text-accent">
          <ArrowUp className="size-4" /> {t(ui.backToTop)}
        </a>
      </footer>
    </section>
  )
}
