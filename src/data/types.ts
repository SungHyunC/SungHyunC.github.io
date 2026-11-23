/** Every piece of visible text exists in English and Korean. */
export type Text = { en: string; ko: string }

export type Category = 'rl' | 'agents' | 'ml' | 'apps'

export type LinkKind = 'repo' | 'demo' | 'video' | 'pr' | 'page'

export type ProjectLink = { kind: LinkKind; label: Text; href: string }

export type Award = {
  /** Short form used on badges, e.g. "5th Place · Meta AI Hackathon". */
  short: Text
  title: Text
  event: Text
  date: Text
  href?: string
  /** 'place' shows a numbered medal, 'star' a star medal. */
  medal: 'place' | 'star'
  place?: number
}

/** Hand-drawn animated thumbnails for projects without a screenshot. */
export type Art = 'orbit' | 'fly' | 'traffic' | 'ev' | 'moa'

export type Project = {
  id: string
  title: string
  subtitle: Text
  period: Text
  role: Text
  summary: Text
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
  featured?: boolean
}

export type TimelineKind = 'award' | 'research' | 'project' | 'education' | 'team' | 'program'

export type TimelineItem = {
  date: Text
  kind: TimelineKind
  title: Text
  detail: Text
  href?: string
}
