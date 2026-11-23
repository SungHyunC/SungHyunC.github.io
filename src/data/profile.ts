import type { Entry, Text } from './types'

export const profile = {
  name: { en: 'Joshua Kim', ko: '김성현' } as Text,
  altName: { en: 'Sung Hyun Kim · 김성현', ko: 'Joshua (Sung Hyun) Kim' } as Text,
  lead: {
    en: 'Software engineer working on reinforcement learning, simulation and applied AI.',
    ko: '강화학습, 시뮬레이션, 응용 AI를 다루는 소프트웨어 엔지니어입니다.',
  } as Text,
  available: { en: 'Available from January 2027', ko: '2027년 1월부터 근무 가능' } as Text,
  citizenship: { en: 'U.S. citizen', ko: '미국 시민권자' } as Text,
  location: { en: 'Sejong, South Korea', ko: '대한민국 세종' } as Text,
  bio: {
    en: 'My projects span machine learning pipelines, AI agent workflows and practical web applications. I enjoy turning a problem into a working tool, then making its behavior and limitations easy to understand.',
    ko: '머신러닝 파이프라인, AI 에이전트 워크플로, 실용적인 웹 애플리케이션을 만듭니다. 문제를 실제로 동작하는 도구로 바꾸고, 그 동작과 한계를 이해하기 쉽게 보여 주는 일을 좋아합니다.',
  } as Text,
  email: 'honeybeelawn@gmail.com',
  github: 'https://github.com/SungHyunC',
  linkedin: 'https://www.linkedin.com/in/joshua-austin-kim',
  /** Optional: put resume.pdf in /public and write 'resume.pdf' here. Empty = hidden. */
  resume: '',
}

export const awards: Entry[] = [
  {
    title: { en: '5th Place, Indie Developer Track ($25,000)', ko: '인디 개발자 트랙 5위 (상금 $25,000)' },
    org: { en: 'Meta Global AI Developer Hackathon', ko: 'Meta 글로벌 AI 개발자 해커톤' },
    date: { en: 'Nov 2026', ko: '2026년 11월' },
    detail: { en: 'Video2URDF (solo) · 5,367 entries', ko: 'Video2URDF 1인 개발 · 출품작 5,367개' },
  },
  {
    title: { en: 'Excellence Award', ko: '우수상' },
    org: {
      en: 'Industry-Linked Capstone Design Competition, Korea University Sejong',
      ko: '고려대학교 세종캠퍼스 산학연계 캡스톤디자인 경진대회',
    },
    date: { en: 'Spring 2026', ko: '2026년 봄' },
    detail: { en: 'Multi-Agent BEMS', ko: 'Multi-Agent BEMS' },
  },
]

export const experience: Entry[] = [
  {
    title: { en: 'Undergraduate Research Assistant', ko: '학부연구생' },
    org: { en: 'Korea University', ko: '고려대학교' },
    date: { en: 'Sep 2025 – Present', ko: '2025년 9월 – 현재' },
    detail: {
      en: 'Multi-agent reinforcement learning for air combat. Ported JSBSim flight dynamics to JAX, cutting per-policy training from about 190 CPU hours to about 20 GPU hours, and reproduced an IEEE ICA 2025 MARL paper over 10 seeds.',
      ko: '공중전 멀티 에이전트 강화학습을 연구합니다. JSBSim 비행 역학을 JAX로 옮겨 정책당 학습을 약 190 CPU시간에서 약 20 GPU시간으로 줄였고, IEEE ICA 2025 MARL 논문을 시드 10개로 재현했습니다.',
    },
  },
  {
    title: { en: 'Crimson Silicon Valley SW·AI Leaders Program', ko: '크림슨 실리콘밸리 SW·AI 리더스 프로그램' },
    org: { en: 'Korea University Sejong × CSU East Bay', ko: '고려대학교 세종캠퍼스 × CSU East Bay' },
    date: { en: 'Oct – Nov 2026', ko: '2026년 10–11월' },
    detail: {
      en: 'Team B: built a traffic-signal digital twin with mobility data and AI.',
      ko: 'Team B: 모빌리티 데이터와 AI로 교통신호 디지털 트윈을 만들었습니다.',
    },
  },
]

export const education: Entry[] = [
  {
    title: { en: 'Korea University, Sejong Campus', ko: '고려대학교 세종캠퍼스' },
    org: { en: 'B.S. Computer Convergence Software', ko: '컴퓨터융합소프트웨어학과 학사' },
    date: { en: 'Graduating Feb 2027', ko: '2027년 2월 졸업 예정' },
  },
]

export const skills: { group: Text; items: string }[] = [
  { group: { en: 'Languages', ko: '언어' }, items: 'Python, JavaScript, Kotlin, Swift, SQL' },
  { group: { en: 'ML & RL', ko: 'ML · 강화학습' }, items: 'PyTorch, JAX, Ray RLlib, scikit-learn, QLoRA' },
  { group: { en: 'Simulation', ko: '시뮬레이션' }, items: 'JSBSim, MuJoCo, SUMO, Blender, Unreal Engine 5' },
  { group: { en: 'AI & Web', ko: 'AI · 웹' }, items: 'LangGraph, Ollama, React, Next.js, Three.js, FastAPI' },
]
