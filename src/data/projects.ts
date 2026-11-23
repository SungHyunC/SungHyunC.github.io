import type { Award, Category, Project, Text } from './types'

const GH = 'https://github.com/SungHyunC'

export const categories: { id: 'all' | Category; label: Text }[] = [
  { id: 'all', label: { en: 'All', ko: '전체' } },
  { id: 'rl', label: { en: 'RL & Simulation', ko: '강화학습 · 시뮬레이션' } },
  { id: 'agents', label: { en: 'AI Agents & LLMs', ko: 'AI 에이전트 · LLM' } },
  { id: 'ml', label: { en: 'ML & Vision', ko: 'ML · 비전' } },
  { id: 'apps', label: { en: 'Apps & Web', ko: '앱 · 웹' } },
]

export const metaAward: Award = {
  short: { en: '5th Place · Meta AI Hackathon', ko: 'Meta AI 해커톤 5위' },
  title: { en: '5th Place · Indie Developer Track', ko: '5위 · 인디 개발자 트랙' },
  event: { en: 'Meta Global AI Developer Hackathon', ko: 'Meta 글로벌 AI 개발자 해커톤' },
  date: { en: 'Nov 2026', ko: '2026년 11월' },
  href: 'https://cerebralvalley.ai/e/meta-ai-developer-hackathon/hackathon/gallery/2050',
  note: { en: '$25,000 prize · $1M total prize pool · 5,367 projects submitted', ko: '상금 $25,000 · 총상금 $1M · 출품작 5,367개' },
  medal: 'place',
  place: 5,
}

export const capstoneAward: Award = {
  short: { en: 'Excellence Award · Capstone', ko: '캡스톤디자인 우수상' },
  title: { en: 'Excellence Award', ko: '우수상' },
  event: { en: 'Industry-Linked Capstone Design Competition', ko: '산학연계 캡스톤디자인 경진대회' },
  date: { en: 'Spring 2026', ko: '2026년 봄' },
  medal: 'star',
}

export const projects: Project[] = [
  {
    id: 'video2urdf',
    title: 'Video2URDF',
    subtitle: { en: 'One phone video in, a measured robot model out', ko: '휴대폰 영상 한 편으로 측정한 로봇 모델 만들기' },
    period: { en: 'Oct – Nov 2026', ko: '2026년 10–11월' },
    role: { en: 'Hackathon, solo', ko: '해커톤, 1인 개발' },
    summary: {
      en: 'Turns one phone video of an articulated object into a measured URDF/MJCF robot model, then checks it by replaying the model in MuJoCo over the video.',
      ko: '관절이 있는 물체를 찍은 휴대폰 영상 한 편으로 치수가 측정된 URDF/MJCF 로봇 모델을 만들고, MuJoCo로 영상 위에 재생해 검증합니다.',
    },
    description: {
      en: 'One phone video of a real articulated object in, a measured URDF/MJCF out. A Muse Spark agent finds the parts with SAM 3.1, fits each joint by least squares, and checks the model by replaying it in MuJoCo over the video.',
      ko: '관절이 있는 실제 물체를 찍은 휴대폰 영상 한 편으로 치수가 측정된 URDF/MJCF를 만듭니다. Muse Spark 에이전트가 SAM 3.1로 부품을 찾고 관절을 최소제곱으로 피팅한 뒤, MuJoCo로 모델을 영상 위에 재생해 검증합니다.',
    },
    bullets: [
      {
        en: 'The agent tracks parts, fits joints and writes URDF and MJCF, then compares the MuJoCo replay with the video frame by frame before it reports.',
        ko: '에이전트가 부품 추적, 관절 피팅, URDF·MJCF 작성까지 마친 뒤 MuJoCo 재생 화면을 영상과 프레임마다 비교하고 나서야 결과를 보고합니다.',
      },
      {
        en: 'It corrects itself: when the base was lost on 89 of 408 frames, it re-segmented, re-tracked and refit.',
        ko: '스스로 고칩니다. 408프레임 중 89프레임에서 베이스를 놓치자 다시 분할하고 추적하고 피팅했습니다.',
      },
      {
        en: 'A simulated Franka Panda grasps and works the measured model, and URDF Doctor checks an existing URDF against a video.',
        ko: '시뮬레이션 속 Franka Panda가 측정된 모델을 잡고 움직이며, URDF Doctor는 기존 URDF를 영상과 대조해 점검합니다.',
      },
      {
        en: 'Also runs on open weights only; a reproduce script reruns the published measurement without API keys.',
        ko: '오픈 웨이트 모델만으로도 동작하고, API 키 없이 공개된 측정을 다시 돌려 보는 재현 스크립트를 제공합니다.',
      },
    ],
    metric: {
      value: { en: '5th Place', ko: '5위' },
      label: { en: 'Indie Developer Track · 5,367 projects submitted', ko: '인디 개발자 트랙 · 출품작 5,367개' },
    },
    tech: ['Python', 'SAM 3.1', 'Muse Spark', 'MuJoCo', 'URDF/MJCF'],
    categories: ['agents', 'ml', 'rl'],
    image: 'projects/video2urdf.webp',
    links: [
      { kind: 'demo', label: { en: 'Live demo', ko: '라이브 데모' }, href: 'https://sunghyunc.github.io/video2urdf/' },
      { kind: 'video', label: { en: 'Demo video', ko: '데모 영상' }, href: 'https://youtu.be/aK_csSIU24c' },
      { kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/video2urdf` },
    ],
    award: metaAward,
  },
  {
    id: 'f16',
    title: 'F-16 Air Combat AI Agent',
    subtitle: { en: 'AI Pilot Top Gun Challenge', ko: 'AI 파일럿 탑건 챌린지' },
    period: { en: 'Summer 2026', ko: '2026년 여름' },
    role: { en: 'Competition', ko: '경진대회' },
    summary: {
      en: 'A PPO dogfighting agent for the AI Pilot Top Gun Challenge. A new arbitration layer raised its head-on score from 0.39 to 0.88.',
      ko: 'AI 파일럿 탑건 챌린지용 PPO 공중전 에이전트입니다. 중재 계층을 더해 정면 교전 점수를 0.39에서 0.88로 올렸습니다.',
    },
    description: {
      en: 'A PPO dogfighting policy on a 6-DOF F-16 flight model, wrapped in rule-based safety layers and checked against large opponent pools before every release.',
      ko: '6자유도 F-16 비행 모델에서 PPO로 학습한 공중전 정책에 규칙 기반 안전 계층을 씌우고, 릴리스마다 대규모 상대 풀로 검증했습니다.',
    },
    bullets: [
      {
        en: 'Zero crashes or dropped responses across thousands of local and dozens of live-server rounds.',
        ko: '로컬 수천 라운드와 라이브 서버 수십 라운드에서 추락이나 응답 누락이 한 번도 없었습니다.',
      },
      {
        en: 'Built a competition-rules simulator, unattended server orchestration, and 83- and 122-opponent evaluation pools; every release had to pass league, held-out, live-server and bit-identical checks.',
        ko: '대회 규칙 시뮬레이터, 무인 서버 오케스트레이션, 83개·122개 상대 평가 풀을 만들었고, 모든 릴리스가 리그·홀드아웃·라이브 서버·비트 동일성 검사를 통과해야 했습니다.',
      },
      {
        en: 'Traced aim overshoot in live-server logs (0.4 s on target vs. 1.0–1.4 s for a reference model), then added an arbitration layer that raised the head-on score from 0.39 to 0.88 over 64 paired rounds.',
        ko: '라이브 서버 로그에서 조준 오버슈트(목표 유지 0.4초, 참조 모델 1.0–1.4초)를 찾아내고 중재 계층을 더해, 64쌍 라운드 기준 정면 교전 점수를 0.39에서 0.88로 올렸습니다.',
      },
    ],
    metric: {
      value: { en: '0.39 → 0.88', ko: '0.39 → 0.88' },
      label: { en: 'head-on score after the arbitration layer', ko: '중재 계층 추가 후 정면 교전 점수' },
    },
    tech: ['Python', 'PPO', 'Ray RLlib', 'JSBSim'],
    categories: ['rl'],
    image: 'projects/f16-air-combat-agent.svg',
    links: [],
    privateNote: {
      en: 'Code is private: the repository includes the competition environment files.',
      ko: '대회 환경 파일이 들어 있어 코드는 비공개입니다.',
    },
  },
  {
    id: 'ma-bems',
    title: 'MA-BEMS',
    subtitle: { en: 'Multi-agent building energy management', ko: '멀티 에이전트 건물 에너지 관리' },
    period: { en: 'Fall 2026', ko: '2026년 가을' },
    role: { en: 'Capstone', ko: '캡스톤 디자인' },
    summary: {
      en: 'Six agents run a simulated campus beside a rule-based BMS and cut energy cost by 16.7%, with a QLoRA fine-tuned local LLM assistant.',
      ko: '에이전트 6개가 규칙 기반 BMS와 나란히 가상 캠퍼스를 운영해 에너지 비용을 16.7% 줄이고, QLoRA로 미세조정한 로컬 LLM 어시스턴트가 함께합니다.',
    },
    description: {
      en: 'Six agents (coordinator, HVAC, lighting, PV, ESS, EV charging) run a simulated campus side by side with a rule-based BMS on identical inputs, with a QLoRA fine-tuned local LLM assistant.',
      ko: '코디네이터·공조·조명·태양광·ESS·EV 충전 에이전트 6개가 같은 입력으로 규칙 기반 BMS와 나란히 가상 캠퍼스를 운영하고, QLoRA로 미세조정한 로컬 LLM 어시스턴트가 함께합니다.',
    },
    bullets: [
      {
        en: 'Cut energy cost by 16.7 ± 0.2% vs. the rule-based BMS and held peak demand under the 1,000 kW limit (0 vs. 1,996 minutes over) in simulation; ablations and nine stress scenarios, including one where the agents do worse, are reported.',
        ko: '시뮬레이션에서 규칙 기반 BMS보다 에너지 비용을 16.7 ± 0.2% 줄이고 피크 수요를 1,000kW 한도 아래로 유지했습니다(초과 0분 vs 1,996분). 제거 실험과, 에이전트가 더 나빴던 경우를 포함한 스트레스 시나리오 9개도 함께 보고합니다.',
      },
      {
        en: 'Fine-tuned Qwen3-8B with QLoRA on simulator-generated data: answers passing a number check rose from 86.4% to 98.3%, and proposed actions that would change nothing fell from 121/228 to 3/209.',
        ko: '시뮬레이터가 만든 데이터로 Qwen3-8B를 QLoRA 미세조정해 수치 검증 통과율을 86.4%에서 98.3%로 높이고, 아무것도 바꾸지 않는 제안을 121/228에서 3/209로 줄였습니다.',
      },
      {
        en: 'Deployed as a static dashboard on GitHub Pages, with an access-keyed LLM gateway behind a Cloudflare tunnel.',
        ko: 'GitHub Pages 정적 대시보드로 배포하고, LLM 게이트웨이는 접근 키와 Cloudflare 터널 뒤에 두었습니다.',
      },
    ],
    metric: {
      value: { en: '−16.7%', ko: '−16.7%' },
      label: { en: 'energy cost vs. a rule-based BMS', ko: '규칙 기반 BMS 대비 에너지 비용' },
    },
    tech: ['Python', 'JavaScript', 'Three.js', 'QLoRA', 'Ollama'],
    categories: ['rl', 'agents', 'apps'],
    image: 'projects/ma-bems.webp',
    links: [
      { kind: 'demo', label: { en: 'Live dashboard', ko: '라이브 대시보드' }, href: 'https://sunghyunc.github.io/ma-bems/' },
      { kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/ma-bems-project` },
    ],
  },
  {
    id: 'multi-agent-bems',
    title: 'Multi-Agent BEMS',
    subtitle: { en: 'LangGraph supervisor for building energy', ko: 'LangGraph 슈퍼바이저 기반 건물 에너지 관리' },
    period: { en: 'Spring 2026', ko: '2026년 봄' },
    role: { en: 'Capstone', ko: '캡스톤 디자인' },
    summary: {
      en: 'A LangGraph supervisor routes operator questions to monitoring, analysis and report agents over simulated building-energy data.',
      ko: 'LangGraph 슈퍼바이저가 운영자의 질문을 모니터링·분석·보고 에이전트에 나눠 가상 건물 에너지 데이터를 다룹니다.',
    },
    description: {
      en: 'The spring capstone that preceded MA-BEMS: a LangGraph supervisor routes operator questions to monitoring, analysis and report agents over simulated building-energy data, with rule-based alerts and fallbacks.',
      ko: 'MA-BEMS의 전신인 봄 학기 캡스톤입니다. LangGraph 슈퍼바이저가 운영자의 질문을 모니터링·분석·보고 에이전트로 보내 가상 건물 에너지 데이터를 다루고, 규칙 기반 알림과 폴백을 갖췄습니다.',
    },
    bullets: [
      {
        en: 'Excellence Award at the Industry-Linked Capstone Design Competition, Korea University Sejong Campus.',
        ko: '고려대학교 세종캠퍼스 산학연계 캡스톤디자인 경진대회 우수상.',
      },
      {
        en: 'Gemini 2.5 Flash agents under a LangGraph supervisor, with rule-based alerts and fallbacks.',
        ko: 'LangGraph 슈퍼바이저 아래에 Gemini 2.5 Flash 에이전트를 두고, 규칙 기반 알림과 폴백을 갖췄습니다.',
      },
      {
        en: 'FastAPI backend and a Next.js dashboard with energy KPIs, a power chart and the agents’ responses.',
        ko: 'FastAPI 백엔드와 Next.js 대시보드로 에너지 KPI, 전력 차트, 에이전트 응답을 보여 줍니다.',
      },
    ],
    metric: {
      value: { en: '3 agents', ko: '에이전트 3개' },
      label: { en: 'monitoring · analysis · report', ko: '모니터링 · 분석 · 보고' },
    },
    tech: ['Python', 'LangGraph', 'FastAPI', 'Next.js', 'Gemini'],
    categories: ['agents', 'apps'],
    image: 'projects/multi-agent-bems.webp',
    links: [{ kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/multi-agent-bems` }],
    award: capstoneAward,
  },
  {
    id: 'orbitlight',
    title: 'OrbitLight',
    subtitle: { en: 'Where spacecraft pose estimation fails in sunlight', ko: '태양광 조건별 우주선 자세 추정 실패 지도' },
    period: { en: 'Nov 2026', ko: '2026년 11월' },
    role: { en: 'Research', ko: '연구' },
    summary: {
      en: 'Maps when spacecraft pose estimation fails under orbital sunlight: failures rise from 1% to 71% as the sun moves behind the satellite.',
      ko: '궤도의 태양광 조건에 따라 우주선 자세 추정이 언제 실패하는지 지도로 그립니다. 역광에 가까워질수록 실패율이 1%에서 71%로 오릅니다.',
    },
    description: {
      en: 'A lighting simulator for orbital scenes that maps under which sun conditions a spacecraft pose-estimation network (SPNv2 on SPEED+) fails, then tests whether targeted synthetic renders reduce those failures.',
      ko: '궤도 장면 조명 시뮬레이터로, 우주선 자세 추정 네트워크(SPEED+의 SPNv2)가 어떤 태양 조건에서 실패하는지 지도로 그리고, 약점을 겨냥한 합성 렌더로 실패를 줄일 수 있는지 실험합니다.',
    },
    bullets: [
      {
        en: 'Reproduced the sim-to-real gap: SPNv2’s pose score is 5–8× worse on real-lighting (HIL) images, and about 1 in 10 is off by more than 10°.',
        ko: '시뮬레이션과 실제의 격차를 재현했습니다. 실제 조명(HIL) 이미지에서 SPNv2 자세 점수가 5–8배 나빠지고, 약 10장 중 1장은 10° 넘게 틀립니다.',
      },
      {
        en: 'Rendered 6,500 Blender images sweeping only the sun: failures rise from 1% to 71% as the phase angle goes from 0° to 160°.',
        ko: '태양 방향만 바꾼 Blender 이미지 6,500장으로, 위상각이 0°에서 160°로 커질 때 실패율이 1%에서 71%로 오르는 것을 확인했습니다.',
      },
      {
        en: 'Back-lit training renders cut renderer-side failures from 26% to 14% but hurt real-lighting data; material and texture randomization kept the gain and brought sunlamp failures back to the control level (15.1% vs. 15.7%).',
        ko: '역광 렌더로 재학습하자 렌더러 기준 실패는 26%에서 14%로 줄었지만 실제 조명 데이터에서는 나빠졌고, 재질·텍스처 무작위화로 이득은 지키면서 sunlamp 실패율을 대조군 수준(15.1% vs 15.7%)으로 되돌렸습니다.',
      },
      {
        en: 'Lesson: a better synthetic failure map does not imply a real-world improvement, so claims are checked on real-lighting data.',
        ko: '교훈: 합성 실패 지도가 좋아져도 실제가 좋아진다는 보장은 없으므로, 주장은 실제 조명 데이터로 확인합니다.',
      },
    ],
    metric: {
      value: { en: '1% → 71%', ko: '1% → 71%' },
      label: { en: 'failure rate, sun phase 0° → 160°', ko: '실패율, 태양 위상각 0° → 160°' },
    },
    tech: ['Python', 'PyTorch', 'Blender', 'SPNv2', 'SPEED+'],
    categories: ['ml', 'rl'],
    art: 'orbit',
    links: [{ kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/orbitlight` }],
  },
  {
    id: 'team-b',
    title: 'Traffic Signal Digital Twin',
    subtitle: { en: 'Team B · Crimson Silicon Valley SW·AI Leaders', ko: 'Team B · 크림슨 실리콘밸리 SW·AI 리더스' },
    period: { en: 'Oct – Nov 2026', ko: '2026년 10–11월' },
    role: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'Built in the Crimson Silicon Valley program: a SUMO digital twin of a four-junction corridor for comparing signal controllers in emergencies.',
      ko: '크림슨 실리콘밸리 프로그램에서 만든 SUMO 기반 4교차로 디지털 트윈으로, 비상 상황에서 신호 제어 방식을 비교합니다.',
    },
    description: {
      en: 'A SUMO-based digital twin of a four-junction corridor: cars and signals move live in 3D, and you can switch signal controllers, send an ambulance, flood a road or feed the AI fake navigation data, then compare the numbers.',
      ko: 'SUMO 기반 4교차로 디지털 트윈입니다. 차량과 신호가 3D로 실시간 움직이고, 신호 제어 방식을 바꾸거나 구급차 출동·도로 침수·가짜 내비 데이터 공격을 걸어 결과를 비교할 수 있습니다.',
    },
    bullets: [
      {
        en: 'The online demo replays 13 recorded runs (rush hour, ambulances, flood, earthquake, fake-data attack) in the browser, on phones too, in English and Korean.',
        ko: '온라인 데모에서 녹화된 실행 13개(출퇴근, 구급차, 침수, 지진, 가짜 데이터 공격)를 휴대폰에서도 한국어·영어로 재생합니다.',
      },
      {
        en: 'Every controller runs behind the same safety supervisor; paired multi-seed experiments produce impact and cost-benefit reports.',
        ko: '모든 신호 제어기가 같은 안전 감독자 아래에서 동작하고, 시드별 짝 비교 실험으로 효과·비용편익 보고서를 만듭니다.',
      },
      {
        en: 'A research-only spillback controller was rejected after independent validation; max-pressure stayed the baseline.',
        ko: '연구용 스필백 제어기는 독립 검증 뒤 기각했고, 기존 max-pressure를 기준선으로 유지했습니다.',
      },
    ],
    metric: {
      value: { en: '13 runs', ko: '실행 13개' },
      label: { en: 'recorded scenarios, live in the browser', ko: '브라우저에서 보는 녹화 시나리오' },
    },
    tech: ['Python', 'SUMO', 'Three.js', 'WebSockets'],
    categories: ['rl', 'apps'],
    art: 'traffic',
    links: [
      {
        kind: 'demo',
        label: { en: 'Online demo', ko: '온라인 데모' },
        href: 'https://sunghyunc.github.io/team-b-signal-optimization/',
      },
      { kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/team-b-signal-optimization` },
    ],
  },
  {
    id: 'flyguard',
    title: 'FlyGuard',
    subtitle: { en: 'A fruit-fly brain circuit that sniffs out prompt injection', ko: '초파리 버섯체로 프롬프트 인젝션 골라내기' },
    period: { en: 'Oct 2026', ko: '2026년 10월' },
    role: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'A fruit-fly mushroom-body circuit wired from the FlyWire connectome detects prompt injection, reaching 0.974 test accuracy.',
      ko: 'FlyWire 커넥톰으로 배선한 초파리 버섯체 회로로 프롬프트 인젝션을 탐지해 test 정확도 0.974를 냈습니다.',
    },
    description: {
      en: 'A mushroom-body circuit wired from the FlyWire connectome “smells” each prompt, and in a T-maze web demo the fly decides whether to pass it to the LLM or quarantine it.',
      ko: 'FlyWire 커넥톰으로 배선한 초파리 버섯체 회로가 프롬프트를 “냄새”로 맡고, T자 미로 웹 데모에서 LLM으로 보낼지 격리할지 직접 고릅니다.',
    },
    bullets: [
      {
        en: 'Hybrid model: a fine-tuned ModernBERT encoder is the “nose” and the mushroom body makes the final call; a five-fly vote reaches 0.974 test accuracy.',
        ko: '하이브리드 모델: 미세조정한 ModernBERT 인코더가 “코”, 버섯체가 최종 판정을 맡고, 초파리 5마리 투표로 test 정확도 0.974를 냈습니다.',
      },
      {
        en: 'Learns fast from little data: 91.7% validation accuracy from only 50 training sentences.',
        ko: '적은 데이터로 빨리 배웁니다. 학습 문장 50개만으로 validation 정확도 91.7%를 냈습니다.',
      },
      {
        en: 'Honest controls: real, random and shuffled wiring differ within seed noise (paired McNemar tests), matching prior work.',
        ko: '정직한 대조 실험: 실제·무작위·셔플 배선의 차이는 시드 오차 범위 안이었고(짝지은 McNemar 검정), 선행연구와 같은 결론입니다.',
      },
    ],
    metric: {
      value: { en: '0.974', ko: '0.974' },
      label: { en: 'test accuracy (five-fly vote)', ko: 'test 정확도 (초파리 5마리 투표)' },
    },
    tech: ['Python', 'PyTorch', 'ModernBERT', 'FlyWire'],
    categories: ['ml', 'agents'],
    art: 'fly',
    links: [{ kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/flyguard` }],
  },
  {
    id: 'ifev',
    title: 'ifEV (이프EV)',
    subtitle: { en: 'Should your next car be an EV? Ask your current one.', ko: '내 차 주행 기록으로 보는 전기차 전환 진단' },
    period: { en: 'Nov 2026', ko: '2026년 11월' },
    role: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'A Hyundai Motor Group contest entry: drive your current car as a virtual EV for four weeks and learn whether an EV fits your life.',
      ko: '현대자동차그룹 공모전 출품작입니다. 지금 타는 차로 4주 동안 가상 전기차를 타 보고, 전기차가 내 생활에 맞는지 알려 줍니다.',
    },
    description: {
      en: 'A Pleos Connect in-car app that lets you drive your current car as a “virtual EV” for four weeks, then tells you whether an EV fits your life and which single change would flip the verdict.',
      ko: '지금 타는 차로 4주 동안 “가상 전기차”를 타 보는 Pleos Connect 차량용 앱입니다. 전기차가 내 생활에 맞는지, 무엇 하나가 바뀌면 판정이 달라지는지 알려 줍니다.',
    },
    bullets: [
      {
        en: 'A preliminary diagnosis one minute after install, from records the car and navigation already have.',
        ko: '설치 1분 만에 차와 내비에 이미 있는 기록으로 예비 진단을 보여 줍니다.',
      },
      {
        en: 'In-the-moment voice lines: battery left at the destination, the cost of the trip just driven, energy recovered while braking.',
        ko: '도착 시 배터리 잔량, 방금 주행의 충전 비용, 감속 때 되찾은 전기를 그 순간 음성으로 알려 줍니다.',
      },
      {
        en: 'A 4-week report with a winter preview (recomputed at Seoul’s January temperatures) and “the one change”: a workplace charger, a home charger or a bigger battery.',
        ko: '4주 리포트에 겨울 미리 보기(서울 1월 평년 기온으로 재계산)와 “판정을 바꾸는 한 가지”(회사 완속, 집 충전기, 큰 배터리)를 담았습니다.',
      },
      {
        en: 'Driven by real vehicle signals (gear, speed, steering, brake, fuel), with a neon top-view virtual EV that redraws once per second while driving.',
        ko: '기어·차속·조향·브레이크·연료 같은 실제 차량 신호로 움직이고, 주행 중에는 네온 탑뷰 가상 전기차를 초당 한 번만 다시 그립니다.',
      },
    ],
    metric: {
      value: { en: '4 weeks', ko: '4주' },
      label: { en: 'as a virtual EV, from real driving signals', ko: '실제 주행 신호로 타 보는 가상 전기차' },
    },
    tech: ['Kotlin', 'Android Automotive', 'Pleos Connect'],
    categories: ['apps'],
    art: 'ev',
    links: [{ kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/ifev` }],
  },
  {
    id: 'etf-answer-agent',
    title: 'ETF Answer Agent',
    subtitle: { en: 'Traceable answers about Korean ETFs', ko: '근거를 추적할 수 있는 한국 ETF 질의응답' },
    period: { en: 'Aug – Oct 2026', ko: '2026년 8–10월' },
    role: { en: 'Personal project', ko: '개인 프로젝트' },
    summary: {
      en: 'A Korean ETF Q&A agent with retrieval, validation gates and revision routing that shows its sources under every answer.',
      ko: '검색, 검증 게이트, 수정 라우팅을 갖춘 한국 ETF 질의응답 에이전트로, 답변마다 출처를 보여 줍니다.',
    },
    description: {
      en: 'A Korean ETF Q&A prototype: retrieval, validation gates and revision routing in a LangGraph workflow, with local LLM adapters and evaluation tooling.',
      ko: '한국 ETF 질의응답 프로토타입입니다. LangGraph 워크플로에 검색, 검증 게이트, 수정 라우팅을 넣고 로컬 LLM 어댑터와 평가 도구를 갖췄습니다.',
    },
    bullets: [
      {
        en: 'TF-IDF retrieval, with the citations shown under each answer.',
        ko: 'TF-IDF로 검색하고, 답변 아래에 출처를 보여 줍니다.',
      },
      {
        en: 'A validation-and-retry loop: answers that fail a check are routed back for revision.',
        ko: '검증-재시도 루프: 검사를 통과하지 못한 답변은 수정 단계로 되돌아갑니다.',
      },
      {
        en: 'The browser demo shows the five processing steps behind every answer.',
        ko: '브라우저 데모에서 답변마다 거친 5단계 처리 과정을 볼 수 있습니다.',
      },
    ],
    metric: {
      value: { en: '5 steps', ko: '5단계' },
      label: { en: 'traceable answer pipeline', ko: '추적 가능한 답변 파이프라인' },
    },
    tech: ['Python', 'LangGraph', 'TF-IDF', 'Local LLMs'],
    categories: ['agents'],
    image: 'projects/etf-answer-agent.webp',
    links: [
      { kind: 'demo', label: { en: 'Live demo', ko: '라이브 데모' }, href: 'https://sunghyunc.github.io/etf-answer-agent/' },
      { kind: 'repo', label: { en: 'Repository', ko: '저장소' }, href: `${GH}/etf-answer-agent` },
    ],
  },
  {
    id: 'moa',
    title: 'MOA (모아)',
    subtitle: { en: 'AI-powered civic reporting', ko: 'AI 생활 인프라 유지관리 플랫폼' },
    period: { en: 'Jul 2026', ko: '2026년 7월' },
    role: { en: 'Team project', ko: '팀 프로젝트' },
    summary: {
      en: 'Civic reporting with one photo and no login. I built the Gemini image classifier and the React admin console.',
      ko: '사진 한 장으로 로그인 없이 생활 불편을 신고하는 서비스입니다. Gemini 이미지 분류기와 React 관리자 콘솔을 맡았습니다.',
    },
    description: {
      en: 'Report a local problem with one photo and a location, with no app install or login. AI classifies the type and merges similar reports into one issue, and staff see issues in priority order.',
      ko: '앱 설치·로그인 없이 사진 한 장과 위치로 생활 불편을 신고합니다. AI가 유형을 분류하고 비슷한 신고를 하나의 문제로 묶어, 담당자에게 우선순위대로 전달합니다.',
    },
    bullets: [
      {
        en: 'Built the Gemini image classifier with an accuracy spot check (merged in PR #28).',
        ko: 'Gemini 이미지 분류기와 정확도 표본 점검을 만들었습니다 (PR #28 머지).',
      },
      {
        en: 'Built the React admin console: dashboard, reclassification and splitting wrongly merged reports (merged in PR #29).',
        ko: 'React 관리자 콘솔(대시보드, 재분류, 잘못 묶인 신고 분리)을 만들었습니다 (PR #29 머지).',
      },
      {
        en: 'Contributed report grouping and prioritization: risk + report count + “me too” votes (capped at 5).',
        ko: '신고 통합과 우선순위(위험도 + 신고 건수 + 공감 수, 상한 5) 작업에 기여했습니다.',
      },
    ],
    metric: {
      value: { en: '3 steps', ko: '3단계' },
      label: { en: 'to file a report, no login', ko: '로그인 없이 신고 완료까지' },
    },
    tech: ['React', 'Vite', 'Node.js', 'Gemini', 'Leaflet'],
    categories: ['agents', 'apps'],
    art: 'moa',
    links: [
      {
        kind: 'repo',
        label: { en: 'Team repository', ko: '팀 저장소' },
        href: 'https://github.com/nxtcloud-edu/2026-07-kosj-industry-practice-team04',
      },
      {
        kind: 'pr',
        label: { en: 'PR #28', ko: 'PR #28' },
        href: 'https://github.com/nxtcloud-edu/2026-07-kosj-industry-practice-team04/pull/28',
      },
      {
        kind: 'pr',
        label: { en: 'PR #29', ko: 'PR #29' },
        href: 'https://github.com/nxtcloud-edu/2026-07-kosj-industry-practice-team04/pull/29',
      },
    ],
  },
]

export const projectById = (id: string) => projects.find((p) => p.id === id)!
