import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Text } from '../data/types'

export type Lang = 'en' | 'ko'

type LangCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  /** Pick the current language from a bilingual value. */
  t: (x: Text) => string
}

const Ctx = createContext<LangCtx | null>(null)

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(location.search).get('lang')
  if (fromUrl === 'ko' || fromUrl === 'en') return fromUrl
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'ko' || saved === 'en') return saved
  } catch {
    /* storage may be blocked */
  }
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<LangCtx>(() => ({ lang, setLang, t: (x) => x[lang] }), [lang, setLang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}

/** Interface strings that are not part of the content data. */
export const ui = {
  tabs: {
    about: { en: 'About', ko: '소개' },
    projects: { en: 'Projects', ko: '프로젝트' },
  },
  themeToLight: { en: 'Switch to light mode', ko: '라이트 모드로 전환' },
  themeToDark: { en: 'Switch to dark mode', ko: '다크 모드로 전환' },
  langSwitch: { en: 'Language', ko: '언어' },
  viewProjects: { en: 'View projects', ko: '프로젝트 보기' },
  email: { en: 'Email', ko: '이메일' },
  resume: { en: 'Resume', ko: '이력서' },
  awards: { en: 'Awards', ko: '수상' },
  experience: { en: 'Experience', ko: '경력' },
  education: { en: 'Education', ko: '학력' },
  skills: { en: 'Skills', ko: '기술' },
  contact: { en: 'Contact', ko: '연락처' },
  contactText: {
    en: 'I’m looking for new-grad software engineering and applied AI roles in the U.S. and can start in January 2027.',
    ko: '미국에서 신입 소프트웨어 엔지니어·응용 AI 직무를 찾고 있으며, 2027년 1월부터 근무할 수 있습니다.',
  },
  copy: { en: 'Copy', ko: '복사' },
  copied: { en: 'Copied', ko: '복사됨' },
  projectsTitle: { en: 'Projects', ko: '프로젝트' },
  projectsSub: {
    en: 'Research, AI agents, apps and games I have built, from reinforcement learning to Unreal Engine.',
    ko: '강화학습 연구부터 AI 에이전트, 앱, Unreal Engine 게임까지 직접 만든 것들입니다.',
  },
  links: {
    demo: { en: 'Live demo', ko: '라이브 데모' },
    video: { en: 'Video', ko: '영상' },
    code: { en: 'Code', ko: '코드' },
  },
  privateCode: { en: 'Private code', ko: '비공개 코드' },
  details: { en: 'Details', ko: '자세히' },
  close: { en: 'Close', ko: '닫기' },
  statProjects: { en: 'projects', ko: '프로젝트' },
  statAwards: { en: 'awards', ko: '수상' },
  statDemos: { en: 'live demos', ko: '라이브 데모' },
  awardLabel: { en: 'Award', ko: '수상' },
  backToTop: { en: 'Back to top', ko: '맨 위로' },
}
