import type { Project } from './types'

const GH = 'https://github.com/SungHyunC'

export const projects: Project[] = [
  {
    id: 'video2urdf',
    title: 'Video2URDF',
    period: { en: 'Oct – Nov 2026', ko: '2026년 10–11월' },
    context: { en: 'Hackathon, solo', ko: '해커톤, 1인 개발' },
    summary: {
      en: 'Turns one phone video of an articulated object into a measured URDF/MJCF robot model, then checks it by replaying the model in MuJoCo over the video.',
      ko: '관절이 있는 물체를 찍은 휴대폰 영상 한 편으로 치수가 측정된 URDF/MJCF 로봇 모델을 만들고, MuJoCo로 영상 위에 재생해 검증합니다.',
    },
    tech: ['Python', 'SAM 3.1', 'Muse Spark', 'MuJoCo'],
    image: 'projects/video2urdf.webp',
    links: [
      { kind: 'demo', href: 'https://sunghyunc.github.io/video2urdf/' },
      { kind: 'video', href: 'https://youtu.be/aK_csSIU24c' },
      { kind: 'code', href: `${GH}/video2urdf` },
    ],
    award: { en: '5th Place · Meta Global AI Developer Hackathon', ko: 'Meta 글로벌 AI 개발자 해커톤 5위' },
  },
  {
    id: 'f16',
    title: 'F-16 Air Combat AI Agent',
    period: { en: 'Summer 2026', ko: '2026년 여름' },
    context: { en: 'Competition', ko: '경진대회' },
    summary: {
      en: 'A PPO dogfighting agent for the AI Pilot Top Gun Challenge. A new arbitration layer raised its head-on score from 0.39 to 0.88.',
      ko: 'AI 파일럿 탑건 챌린지용 PPO 공중전 에이전트입니다. 중재 계층을 더해 정면 교전 점수를 0.39에서 0.88로 올렸습니다.',
    },
    tech: ['Python', 'Ray RLlib', 'JSBSim'],
    image: 'projects/f16-air-combat-agent.svg',
    links: [],
    privateCode: true,
  },
  {
    id: 'ma-bems',
    title: 'MA-BEMS',
    period: { en: 'Fall 2026', ko: '2026년 가을' },
    context: { en: 'Capstone', ko: '캡스톤 디자인' },
    summary: {
      en: 'Six agents run a simulated campus beside a rule-based BMS and cut energy cost by 16.7%, with a QLoRA fine-tuned local LLM assistant.',
      ko: '에이전트 6개가 규칙 기반 BMS와 나란히 가상 캠퍼스를 운영해 에너지 비용을 16.7% 줄이고, QLoRA로 미세조정한 로컬 LLM 어시스턴트가 함께합니다.',
    },
    tech: ['Python', 'Three.js', 'QLoRA', 'Ollama'],
    image: 'projects/ma-bems.webp',
    links: [
      { kind: 'demo', href: 'https://sunghyunc.github.io/ma-bems/' },
      { kind: 'code', href: `${GH}/ma-bems-project` },
    ],
  },
  {
    id: 'multi-agent-bems',
    title: 'Multi-Agent BEMS',
    period: { en: 'Spring 2026', ko: '2026년 봄' },
    context: { en: 'Capstone', ko: '캡스톤 디자인' },
    summary: {
      en: 'A LangGraph supervisor routes operator questions to monitoring, analysis and report agents over simulated building-energy data.',
      ko: 'LangGraph 슈퍼바이저가 운영자의 질문을 모니터링·분석·보고 에이전트에 나눠 가상 건물 에너지 데이터를 다룹니다.',
    },
    tech: ['Python', 'LangGraph', 'FastAPI', 'Next.js'],
    image: 'projects/multi-agent-bems.webp',
    links: [{ kind: 'code', href: `${GH}/multi-agent-bems` }],
    award: { en: 'Excellence Award · Capstone Design Competition', ko: '캡스톤디자인 경진대회 우수상' },
  },
  {
    id: 'orbitlight',
    title: 'OrbitLight',
    period: { en: 'Nov 2026', ko: '2026년 11월' },
    context: { en: 'Research', ko: '연구' },
    summary: {
      en: 'Maps when spacecraft pose estimation fails under orbital sunlight: failures rise from 1% to 71% as the sun moves behind the satellite.',
      ko: '궤도의 태양광 조건에 따라 우주선 자세 추정이 언제 실패하는지 지도로 그립니다. 역광에 가까워질수록 실패율이 1%에서 71%로 오릅니다.',
    },
    tech: ['Python', 'PyTorch', 'Blender'],
    art: 'orbit',
    links: [{ kind: 'code', href: `${GH}/orbitlight` }],
  },
  {
    id: 'team-b',
    title: 'Traffic Signal Digital Twin',
    period: { en: 'Oct – Nov 2026', ko: '2026년 10–11월' },
    context: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'Built in the Crimson Silicon Valley program: a SUMO digital twin of a four-junction corridor for comparing signal controllers in emergencies.',
      ko: '크림슨 실리콘밸리 프로그램에서 만든 SUMO 기반 4교차로 디지털 트윈으로, 비상 상황에서 신호 제어 방식을 비교합니다.',
    },
    tech: ['Python', 'SUMO', 'Three.js'],
    art: 'traffic',
    links: [
      { kind: 'demo', href: 'https://sunghyunc.github.io/team-b-signal-optimization/' },
      { kind: 'code', href: `${GH}/team-b-signal-optimization` },
    ],
  },
  {
    id: 'flyguard',
    title: 'FlyGuard',
    period: { en: 'Oct 2026', ko: '2026년 10월' },
    context: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'A fruit-fly mushroom-body circuit wired from the FlyWire connectome detects prompt injection, reaching 0.974 test accuracy.',
      ko: 'FlyWire 커넥톰으로 배선한 초파리 버섯체 회로로 프롬프트 인젝션을 탐지해 test 정확도 0.974를 냈습니다.',
    },
    tech: ['Python', 'PyTorch', 'ModernBERT'],
    art: 'fly',
    links: [{ kind: 'code', href: `${GH}/flyguard` }],
  },
  {
    id: 'ifev',
    title: 'ifEV',
    period: { en: 'Nov 2026', ko: '2026년 11월' },
    context: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'A Hyundai Motor Group contest entry: drive your current car as a virtual EV for four weeks and learn whether an EV fits your life.',
      ko: '현대자동차그룹 공모전 출품작입니다. 지금 타는 차로 4주 동안 가상 전기차를 타 보고, 전기차가 내 생활에 맞는지 알려 줍니다.',
    },
    tech: ['Kotlin', 'Android Automotive', 'Pleos Connect'],
    art: 'ev',
    links: [{ kind: 'code', href: `${GH}/ifev` }],
  },
  {
    id: 'etf-answer-agent',
    title: 'ETF Answer Agent',
    period: { en: 'Aug – Oct 2026', ko: '2026년 8–10월' },
    context: { en: 'Personal project', ko: '개인 프로젝트' },
    summary: {
      en: 'A Korean ETF Q&A agent with retrieval, validation gates and revision routing that shows its sources under every answer.',
      ko: '검색, 검증 게이트, 수정 라우팅을 갖춘 한국 ETF 질의응답 에이전트로, 답변마다 출처를 보여 줍니다.',
    },
    tech: ['Python', 'LangGraph'],
    image: 'projects/etf-answer-agent.webp',
    links: [
      { kind: 'demo', href: 'https://sunghyunc.github.io/etf-answer-agent/' },
      { kind: 'code', href: `${GH}/etf-answer-agent` },
    ],
  },
  {
    id: 'moa',
    title: 'MOA',
    period: { en: 'Jul 2026', ko: '2026년 7월' },
    context: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'Civic reporting with one photo and no login. I built the Gemini image classifier and the React admin console.',
      ko: '사진 한 장으로 로그인 없이 생활 불편을 신고하는 서비스입니다. Gemini 이미지 분류기와 React 관리자 콘솔을 맡았습니다.',
    },
    tech: ['React', 'Node.js', 'Gemini'],
    art: 'moa',
    links: [{ kind: 'code', href: 'https://github.com/nxtcloud-edu/2026-07-kosj-industry-practice-team04' }],
  },
]
