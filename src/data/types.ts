/** Every piece of visible text exists in English and Korean. */
export type Text = { en: string; ko: string }

export type LinkKind = 'demo' | 'video' | 'code'

export type ProjectLink = { kind: LinkKind; href: string }

/** Drawn thumbnails for projects without a public screenshot. */
export type Art = 'orbit' | 'fly' | 'traffic' | 'ev' | 'moa'

export type Project = {
  id: string
  title: string
  /** e.g. "Oct – Nov 2026" */
  period: Text
  /** e.g. "Solo · Hackathon" */
  context: Text
  /** One or two sentences. */
  summary: Text
  tech: string[]
  image?: string
  art?: Art
  links: ProjectLink[]
  /** Short award line, shown as a small tag. */
  award?: Text
  privateCode?: boolean
}

/** A row in Awards / Experience / Education. */
export type Entry = {
  title: Text
  org: Text
  date: Text
  detail?: Text
}
