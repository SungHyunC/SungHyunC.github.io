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
  nav: {
    projects: { en: 'Projects', ko: '프로젝트' },
    research: { en: 'Research', ko: '연구' },
    timeline: { en: 'Timeline', ko: '타임라인' },
    team: { en: 'Team', ko: '팀 기여' },
    skills: { en: 'Skills', ko: '기술' },
    contact: { en: 'Contact', ko: '연락처' },
  },
  themeToLight: { en: 'Switch to light mode', ko: '라이트 모드로 전환' },
  themeToDark: { en: 'Switch to dark mode', ko: '다크 모드로 전환' },
  langSwitch: { en: 'Switch language', ko: '언어 전환' },
  menu: { en: 'Menu', ko: '메뉴' },
  focus: { en: 'Focused on', ko: '관심 분야' },
  resume: { en: 'Resume', ko: '이력서' },
  email: { en: 'Email', ko: '이메일' },
  education: { en: 'Education', ko: '학력' },
  lookingFor: { en: 'Looking for', ko: '희망 직무' },
  workAuth: { en: 'Work authorization', ko: '취업 자격' },
  award: { en: 'Award', ko: '수상' },
  awardRibbon: { en: 'AWARD', ko: '수상작' },
  featured: { en: 'Featured', ko: '대표 프로젝트' },
  research: { en: 'Research', ko: '연구' },
  researchStat: { en: 'CPU h → GPU h per policy', ko: '정책당 학습 CPU시간 → GPU시간' },
  researchStatNote: { en: 'JSBSim air combat, ported to JAX', ko: 'JSBSim 공중전 환경 JAX 포팅' },
  atAGlance: { en: 'At a glance', ko: '한눈에 보기' },
  statProjects: { en: 'projects', ko: '프로젝트' },
  statAwards: { en: 'awards', ko: '수상' },
  statDemos: { en: 'live demos', ko: '라이브 데모' },
  seeAll: { en: 'See all projects', ko: '전체 프로젝트 보기' },
  seeAllNote: { en: 'Filter by RL, agents, ML or apps', ko: '강화학습·에이전트·ML·앱별로 보기' },
  details: { en: 'Details', ko: '자세히' },
  close: { en: 'Close', ko: '닫기' },
  outOf: { en: 'out of', ko: '출품작' },
  projectsSubmitted: { en: 'projects submitted', ko: '개 중' },
  builtSolo: { en: 'built solo', ko: '1인 개발' },
  prize: { en: 'prize', ko: '상금' },
  privateCode: { en: 'Private code', ko: '비공개 코드' },
  sections: {
    projects: {
      title: { en: 'Projects', ko: '프로젝트' },
      sub: {
        en: 'Ten projects across reinforcement learning, simulation, AI agents and apps. Click a card for the details.',
        ko: '강화학습, 시뮬레이션, AI 에이전트, 앱에 걸친 프로젝트 10개입니다. 카드를 누르면 자세한 내용이 열립니다.',
      },
    },
    research: {
      title: { en: 'Research', ko: '연구 경력' },
      sub: { en: 'Making multi-agent RL for air combat fast enough to iterate on.', ko: '공중전 멀티 에이전트 강화학습을 빠르게 반복할 수 있게 만드는 연구입니다.' },
    },
    timeline: {
      title: { en: 'Timeline', ko: '타임라인' },
      sub: { en: 'Research, competitions, capstones and awards, newest first.', ko: '연구, 대회, 캡스톤, 수상 이력을 최신순으로 정리했습니다.' },
    },
    team: {
      title: { en: 'Team contributions', ko: '팀 기여' },
      sub: { en: 'Work merged into team repositories through reviewed pull requests.', ko: '리뷰를 거쳐 팀 저장소에 머지된 작업입니다.' },
    },
    skills: {
      title: { en: 'Tech stack', ko: '기술 스택' },
      sub: { en: 'Tools used in the projects above.', ko: '위 프로젝트에서 실제로 사용한 도구입니다.' },
    },
    contact: {
      title: { en: 'Let’s build something.', ko: '함께 만들어요.' },
      sub: {
        en: 'I’m looking for new-grad software engineering and applied AI roles in the U.S., starting February 2027.',
        ko: '2027년 2월부터 미국에서 신입 소프트웨어 엔지니어·응용 AI 직무를 찾고 있습니다.',
      },
    },
  },
  cpuVsGpu: { en: 'Training time per policy', ko: '정책 하나의 학습 시간' },
  cpu: { en: 'JSBSim on CPU (estimated)', ko: 'JSBSim · CPU (추정)' },
  gpu: { en: 'JAX port on GPU', ko: 'JAX 포팅 · GPU' },
  hours: { en: 'h', ko: '시간' },
  faster: { en: 'faster', ko: '빨라짐' },
  merged: { en: 'Merged', ko: '머지됨' },
  viewRepo: { en: 'Repository', ko: '저장소' },
  copy: { en: 'Copy email', ko: '이메일 복사' },
  copied: { en: 'Copied!', ko: '복사했어요!' },
  builtWith: { en: 'Built with React, Vite, Tailwind CSS and Motion.', ko: 'React, Vite, Tailwind CSS, Motion으로 만들었습니다.' },
  backToTop: { en: 'Back to top', ko: '맨 위로' },
  kinds: {
    award: { en: 'Award', ko: '수상' },
    research: { en: 'Research', ko: '연구' },
    project: { en: 'Project', ko: '프로젝트' },
    education: { en: 'Education', ko: '학력' },
    team: { en: 'Team', ko: '팀' },
    program: { en: 'Program', ko: '프로그램' },
  },
} satisfies Record<string, unknown>
