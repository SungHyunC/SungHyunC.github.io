import { ArrowUpRight, Lock } from 'lucide-react'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import { ui, useLang } from '../lib/i18n'
import { asset, AwardTag, fade, nb } from '../components/bits'
import { ProjectArt } from '../components/ProjectArt'

function Thumb({ p }: { p: Project }) {
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-lg border border-line bg-soft">
      {p.image ? (
        <img
          src={asset(p.image)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {p.art && <ProjectArt art={p.art} />}
        </div>
      )}
    </div>
  )
}

function ProjectRow({ p }: { p: Project }) {
  const { t } = useLang()
  const primary = p.links.find((l) => l.kind === 'demo') ?? p.links.find((l) => l.kind === 'code')

  return (
    <article className="group grid gap-4 min-[480px]:grid-cols-[132px_1fr] min-[480px]:gap-5 sm:grid-cols-[200px_1fr] sm:gap-7">
      {primary ? (
        <a href={primary.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="block self-start">
          <Thumb p={p} />
        </a>
      ) : (
        <div className="self-start">
          <Thumb p={p} />
        </div>
      )}

      <div className="min-w-0">
        {p.award && (
          <div className="mb-2">
            <AwardTag text={p.award} />
          </div>
        )}
        <h2 className="text-lg font-semibold leading-snug">
          {primary ? (
            <a href={primary.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h2>
        <p className="mt-0.5 text-sm text-faint">
          <span className="whitespace-nowrap">{t(p.period)}</span> · <span className="whitespace-nowrap">{t(p.context)}</span>
        </p>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted text-pretty">{nb(t(p.summary))}</p>
        <p className="mt-2.5 text-[13px] text-faint">{p.tech.join(' · ')}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-0.5 font-medium">
              {t(ui.links[l.kind])}
              <ArrowUpRight className="size-3.5" />
            </a>
          ))}
          {p.privateCode && (
            <span className="inline-flex items-center gap-1 text-faint">
              <Lock className="size-3.5" />
              {t(ui.privateCode)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsPage() {
  const { t } = useLang()
  return (
    <section className="pt-14 sm:pt-20">
      <h1 style={fade(0)} className="fade-in text-[32px] font-bold leading-tight tracking-tight sm:text-[40px]">
        {t(ui.projectsTitle)}
      </h1>
      <p style={fade(1)} className="fade-in mt-3 text-muted text-balance">
        {t(ui.projectsSub)}
      </p>

      <div className="mt-12 space-y-12 sm:space-y-14">
        {projects.map((p, i) => (
          <div key={p.id} style={fade(2 + Math.min(i, 4))} className="fade-in">
            <ProjectRow p={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
