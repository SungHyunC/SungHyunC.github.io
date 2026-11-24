/** Every piece of visible text exists in English and Korean. */
export type Text = { en: string; ko: string }

export type Category = 'rl' | 'agents' | 'ml' | 'apps'

export type LinkKind = 'repo' | 'demo' | 'video' | 'pr' | 'page'

export type ProjectLink = { kind: LinkKind; label: Text; href: string }

export type Award = {
  /** Short form used on tags, e.g. "5th Place · Meta AI Hackathon". */
  short: Text
  title: Text
  event: Text
  date: Text
  href?: string
  /** Extra line in the details panel, e.g. prize and field size. */
  note?: Text
  /** 'place' shows a numbered medal, 'star' a star medal. */
  medal: 'place' | 'star'
  place?: number
}

/** Drawn, animated thumbnails for projects without a public screenshot. */
export type Art = 'orbit' | 'fly' | 'traffic' | 'ev' | 'moa'

export type Project = {
  id: string
  title: string
  subtitle: Text
  period: Text
  /** Short context shown under the title, e.g. "Capstone". */
  role: Text
  /** One or two sentences for the card. */
  summary: Text
  /** Longer description for the details panel. */
  description: Text
  bullets: Text[]
  metric: { value: Text; label: Text }
  tech: string[]
  categories: Category[]
  image?: string
  art?: Art
  links: ProjectLink[]
  award?: Award
  /** Shown instead of a repository link when the code is private. */
  privateNote?: Text
}

/** A row in Awards / Experience / Education. */
export type Entry = {
  title: Text
  org: Text
  date: Text
  detail?: Text
  /** Extra points listed under the detail. */
  bullets?: Text[]
  /** Opens the organization's site in a new tab. */
  href?: string
}
