import type { Text, TimelineItem } from './types'

export const profile = {
  name: { en: 'Joshua (Sung Hyun) Kim', ko: '김성현' } as Text,
  altName: { en: '김성현', ko: 'Joshua (Sung Hyun) Kim' } as Text,
  initials: 'JK',
  role: { en: 'Software Engineer · New Grad', ko: '소프트웨어 엔지니어 · 신입' } as Text,
  focus: {
    en: ['reinforcement learning', 'simulation', 'multi-agent systems', 'applied AI'],
    ko: ['강화학습', '시뮬레이션', '멀티 에이전트 시스템', '응용 AI'],
  },
  bio: {
    en: 'My projects span machine learning pipelines, AI agent workflows and practical web applications. I enjoy turning a problem into a working tool, then making its behavior and limitations easy to understand.',
    ko: '머신러닝 파이프라인, AI 에이전트 워크플로, 실용적인 웹 애플리케이션을 만듭니다. 문제를 실제로 동작하는 도구로 바꾸고, 그 동작과 한계를 이해하기 쉽게 보여 주는 일을 좋아합니다.',
  } as Text,
  location: { en: 'Sejong, South Korea', ko: '대한민국 세종' } as Text,
  available: { en: 'Available from Feb 2027', ko: '2027년 2월부터 근무 가능' } as Text,
  email: 'honeybeelawn@gmail.com',
  github: 'https://github.com/SungHyunC',
  linkedin: 'https://www.linkedin.com/in/joshua-austin-kim',
  /**
   * Optional files. Put them in /public and write the file name here,
   * e.g. photo: 'profile.jpg', resume: 'resume.pdf'. Empty = hidden.
   */
  photo: '',
  resume: '',
  education: {
    school: { en: 'Korea University, Sejong', ko: '고려대학교 세종캠퍼스' } as Text,
    degree: { en: 'B.S. Computer Convergence Software', ko: '컴퓨터융합소프트웨어학과 학사' } as Text,
    grad: { en: 'Graduating Feb 2027', ko: '2027년 2월 졸업 예정' } as Text,
  },
  lookingFor: {
    roles: { en: 'Software engineering & applied AI roles', ko: '소프트웨어 엔지니어링 · 응용 AI 직무' } as Text,
    where: { en: 'New grad · United States', ko: '신입 · 미국' } as Text,
    auth: { en: 'U.S. citizen', ko: '미국 시민권자' } as Text,
  },
}

export const research = {
  title: { en: 'Undergraduate Research Assistant', ko: '학부연구생' } as Text,
  org: { en: 'Korea University', ko: '고려대학교' } as Text,
  period: { en: 'Sep 2025 – Present', ko: '2025년 9월 – 현재' } as Text,
  topic: { en: 'Multi-agent reinforcement learning for air combat', ko: '공중전을 위한 멀티 에이전트 강화학습' } as Text,
  bullets: [
    {
      en: 'Reimplemented JSBSim F-16/A-4 flight dynamics and an air combat environment in JAX, cutting per-policy training from an estimated 190 CPU hours to ~20 GPU hours; verified statistical equivalence to JSBSim in 5 stages.',
      ko: 'JSBSim F-16/A-4 비행 역학과 공중전 환경을 JAX로 다시 구현해 정책 하나의 학습을 약 190 CPU시간(추정)에서 약 20 GPU시간으로 줄였고, JSBSim과의 통계적 동등성을 5단계로 검증했습니다.',
    },
    {
      en: 'Reproduced the main results of an IEEE ICA 2025 hierarchical MARL paper over 10 seeds (62 policies, 1.1M evaluation engagements), tracing remaining gaps to seed variance and undocumented ammo and altitude rules.',
      ko: 'IEEE ICA 2025 계층형 MARL 논문의 주요 결과를 시드 10개(정책 62개, 평가 교전 110만 회)로 재현하고, 남은 차이를 시드 분산과 문서화되지 않은 탄약·고도 규칙으로 규명했습니다.',
    },
    {
      en: 'Extended an F-16 simulator to 2v2 combat with 7 RL setups, 131 automated tests and Unreal Engine 5 rendering.',
      ko: 'F-16 시뮬레이터를 2v2 교전으로 확장하고 RL 설정 7가지, 자동화 테스트 131개, Unreal Engine 5 렌더링을 붙였습니다.',
    },
  ] as Text[],
  stats: [
    { to: 62, suffix: '', label: { en: 'policies trained over 10 seeds', ko: '시드 10개로 학습한 정책' } as Text },
    { to: 1.1, suffix: 'M', decimals: 1, label: { en: 'evaluation engagements', ko: '평가 교전 (회)' } as Text },
    { to: 131, suffix: '', label: { en: 'automated tests for 2v2 combat', ko: '2v2 교전 자동화 테스트' } as Text },
    { to: 5, suffix: '', label: { en: 'stages of equivalence checks', ko: 'JSBSim 동등성 검증 단계' } as Text },
  ],
  tech: ['Python', 'JAX', 'JSBSim', 'Unreal Engine 5'],
  note: { en: 'The code is private (lab research).', ko: '연구실 연구라 코드는 비공개입니다.' } as Text,
}

export const timeline: TimelineItem[] = [
  {
    date: { en: 'Feb 2027', ko: '2027년 2월' },
    kind: 'education',
    title: { en: 'Graduating · B.S. Computer Convergence Software', ko: '졸업 예정 · 컴퓨터융합소프트웨어학과 학사' },
    detail: { en: 'Korea University, Sejong Campus.', ko: '고려대학교 세종캠퍼스.' },
  },
  {
    date: { en: 'Nov 2026', ko: '2026년 11월' },
    kind: 'award',
    title: { en: '5th Place · Meta Global AI Developer Hackathon', ko: 'Meta 글로벌 AI 개발자 해커톤 5위' },
    detail: {
      en: 'Indie Developer Track ($25,000) with Video2URDF, built solo; 5,367 projects were submitted.',
      ko: '인디 개발자 트랙(상금 $25,000), Video2URDF 1인 개발. 출품작 5,367개.',
    },
    href: 'https://cerebralvalley.ai/e/meta-ai-developer-hackathon/hackathon/gallery/2050',
  },
  {
    date: { en: 'Nov 2026', ko: '2026년 11월' },
    kind: 'project',
    title: { en: 'ifEV · Hyundai Motor Group in-car app contest', ko: '이프EV · 현대자동차그룹 차량용 앱 공모전' },
    detail: {
      en: 'A Pleos Connect app that diagnoses an EV switch from your own driving.',
      ko: '내 주행 기록으로 전기차 전환을 진단하는 Pleos Connect 앱.',
    },
  },
  {
    date: { en: 'Nov 2026', ko: '2026년 11월' },
    kind: 'project',
    title: { en: 'OrbitLight', ko: 'OrbitLight' },
    detail: {
      en: 'A failure map of spacecraft pose estimation under orbital sunlight.',
      ko: '궤도 태양광 조건별 우주선 자세 추정 실패 지도.',
    },
  },
  {
    date: { en: 'Fall 2026', ko: '2026년 가을' },
    kind: 'project',
    title: { en: 'MA-BEMS capstone', ko: 'MA-BEMS 캡스톤' },
    detail: {
      en: 'Six agents vs. a rule-based BMS: 16.7% lower energy cost in simulation.',
      ko: '에이전트 6개 vs 규칙 기반 BMS: 시뮬레이션에서 에너지 비용 16.7% 절감.',
    },
  },
  {
    date: { en: 'Oct – Nov 2026', ko: '2026년 10–11월' },
    kind: 'program',
    title: { en: 'Crimson Silicon Valley SW·AI Leaders Program', ko: '크림슨 실리콘밸리 SW·AI 리더스 프로그램' },
    detail: {
      en: 'Team B, Korea University Sejong × CSU East Bay: a traffic-signal digital twin.',
      ko: 'Team B, 고려대 세종 × CSU East Bay: 교통신호 디지털 트윈.',
    },
  },
  {
    date: { en: 'Oct 2026', ko: '2026년 10월' },
    kind: 'project',
    title: { en: 'FlyGuard', ko: 'FlyGuard' },
    detail: {
      en: 'A fruit-fly connectome circuit for prompt-injection detection (team).',
      ko: '초파리 커넥톰 회로로 프롬프트 인젝션 탐지 (팀).',
    },
  },
  {
    date: { en: 'Summer 2026', ko: '2026년 여름' },
    kind: 'project',
    title: { en: 'AI Pilot Top Gun Challenge', ko: 'AI 파일럿 탑건 챌린지' },
    detail: {
      en: 'An F-16 PPO dogfighting agent with safety layers; head-on score 0.39 → 0.88.',
      ko: '안전 계층을 갖춘 F-16 PPO 공중전 에이전트, 정면 교전 점수 0.39 → 0.88.',
    },
  },
  {
    date: { en: 'Jul 2026', ko: '2026년 7월' },
    kind: 'team',
    title: { en: 'MOA · industry practice team project', ko: '모아 · 산업체 실습 팀 프로젝트' },
    detail: {
      en: 'AI classifier and React admin console, merged in PRs #28 and #29.',
      ko: 'AI 분류기와 React 관리자 콘솔, PR #28·#29 머지.',
    },
  },
  {
    date: { en: 'Spring 2026', ko: '2026년 봄' },
    kind: 'award',
    title: { en: 'Excellence Award · Capstone Design Competition', ko: '캡스톤디자인 경진대회 우수상' },
    detail: {
      en: 'Industry-Linked Capstone Design Competition, Korea University Sejong, with Multi-Agent BEMS.',
      ko: '고려대 세종 산학연계 캡스톤디자인 경진대회, Multi-Agent BEMS.',
    },
  },
  {
    date: { en: 'Sep 2025 – Present', ko: '2025년 9월 – 현재' },
    kind: 'research',
    title: { en: 'Undergraduate Research Assistant', ko: '학부연구생' },
    detail: {
      en: 'Multi-agent reinforcement learning for air combat, Korea University.',
      ko: '고려대학교, 공중전 멀티 에이전트 강화학습.',
    },
  },
  {
    date: { en: '2022', ko: '2022년' },
    kind: 'team',
    title: { en: 'BidderBidder iOS', ko: 'BidderBidder iOS' },
    detail: {
      en: 'Firebase phone verification, search UI and SwiftLint CI through merged PRs.',
      ko: '머지된 PR로 Firebase 휴대폰 인증, 검색 화면, SwiftLint CI에 기여.',
    },
  },
]

const MOA = 'https://github.com/nxtcloud-edu/2026-07-kosj-industry-practice-team04'
const BB = 'https://github.com/FakeDevelopers/BidderBidder_IOS'

export const teamWork = [
  {
    name: 'MOA (모아)',
    subtitle: { en: 'AI-powered civic reporting', ko: 'AI 생활 인프라 신고 플랫폼' } as Text,
    context: { en: 'Korea University Sejong industry practice · Team 4 · Jul 2026', ko: '고려대 세종 산업체 실습 4팀 · 2026년 7월' } as Text,
    summary: {
      en: 'Contributed AI classification, the React admin console, and report grouping and prioritization.',
      ko: 'AI 분류, React 관리자 콘솔, 신고 통합과 우선순위 작업에 기여했습니다.',
    } as Text,
    repo: MOA,
    prs: [
      { num: 28, date: '2026-07-21', title: { en: 'Image classifier + accuracy spot check', ko: '이미지 분류기 + 정확도 표본 점검' } as Text, href: `${MOA}/pull/28` },
      { num: 29, date: '2026-07-21', title: { en: 'Admin console: dashboard, reclassification, split wrong merges', ko: '관리자 콘솔: 대시보드·재분류·오통합 분리' } as Text, href: `${MOA}/pull/29` },
    ],
    tech: ['React', 'Gemini', 'Node.js'],
  },
  {
    name: 'BidderBidder iOS',
    subtitle: { en: 'Used-goods auction app', ko: '중고 물품 경매 앱' } as Text,
    context: { en: 'Team project · 2022', ko: '팀 프로젝트 · 2022년' } as Text,
    summary: {
      en: 'Contributed login and signup flows, Firebase phone verification, the search UI and SwiftLint CI.',
      ko: '로그인·회원가입 흐름, Firebase 휴대폰 인증, 검색 화면, SwiftLint CI를 맡았습니다.',
    } as Text,
    repo: BB,
    prs: [
      { num: 10, date: '2022-07-15', title: { en: 'Firebase phone verification', ko: 'Firebase 휴대폰 인증' } as Text, href: `${BB}/pull/10` },
      { num: 15, date: '2022-07-20', title: { en: 'SwiftLint CI workflow', ko: 'SwiftLint CI 워크플로' } as Text, href: `${BB}/pull/15` },
      { num: 21, date: '2022-10-08', title: { en: 'Search screen', ko: '검색 화면' } as Text, href: `${BB}/pull/21` },
    ],
    tech: ['Swift', 'Firebase', 'SwiftLint'],
  },
]

export const skills: { group: Text; items: string[] }[] = [
  { group: { en: 'Languages', ko: '언어' }, items: ['Python', 'JavaScript', 'Kotlin', 'Swift', 'SQL'] },
  { group: { en: 'ML & RL', ko: 'ML · 강화학습' }, items: ['PyTorch', 'JAX', 'Ray RLlib', 'scikit-learn', 'QLoRA'] },
  { group: { en: 'Simulation', ko: '시뮬레이션' }, items: ['JSBSim', 'MuJoCo', 'SUMO', 'Blender', 'Unreal Engine 5'] },
  { group: { en: 'AI agents & LLMs', ko: 'AI 에이전트 · LLM' }, items: ['LangGraph', 'Ollama', 'Gemini', 'SAM 3.1', 'Muse Spark'] },
  { group: { en: 'Web & apps', ko: '웹 · 앱' }, items: ['React', 'Next.js', 'Three.js', 'FastAPI', 'Streamlit', 'Android Automotive'] },
  { group: { en: 'Tools', ko: '도구' }, items: ['Git', 'GitHub Actions', 'GitHub Pages', 'Cloudflare Tunnel'] },
]
