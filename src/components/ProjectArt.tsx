import { useId } from 'react'
import type { Art } from '../data/types'

/** Drawn SVG thumbnails for projects without a public screenshot (static unless `animate`). */
export function ProjectArt({ art, animate = false }: { art: Art; animate?: boolean }) {
  const still = !animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const u = useId().replace(/:/g, '')
  const props = { u, still }
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      {art === 'orbit' && <Orbit {...props} />}
      {art === 'fly' && <Fly {...props} />}
      {art === 'traffic' && <Traffic {...props} />}
      {art === 'ev' && <Ev {...props} />}
      {art === 'moa' && <Moa {...props} />}
      {art === 'cut' && <Cut {...props} />}
      {art === 'mine' && <Mine {...props} />}
      {art === 'duel' && <Duel {...props} />}
    </svg>
  )
}

type P = { u: string; still: boolean }
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

function Label({ x, y, children, fill = '#94a3b8', anchor = 'start' }: { x: number; y: number; children: string; fill?: string; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} fontSize="8" fill={fill} fontFamily={MONO} letterSpacing="1" textAnchor={anchor}>
      {children}
    </text>
  )
}

/* OrbitLight: a satellite, a moving sun and a failure-rate bar chart. */
function Orbit({ u, still }: P) {
  const stars = [[22, 30], [60, 18], [95, 44], [150, 20], [186, 50], [214, 16], [262, 30], [300, 18], [30, 84], [80, 128], [292, 70], [250, 52], [16, 150], [118, 34]]
  const bars = [1, 2, 4, 7, 12, 20, 33, 52, 71]
  const orbit = 'M40 95 A85 34 0 1 0 210 95 A85 34 0 1 0 40 95'
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060a17" />
          <stop offset="1" stopColor="#101a3a" />
        </linearGradient>
        <radialGradient id={`${u}earth`} cx="0.5" cy="0" r="0.9">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="0.55" stopColor="#1e3a8a" />
          <stop offset="1" stopColor="#0b1530" />
        </radialGradient>
        <radialGradient id={`${u}sun`}>
          <stop offset="0" stopColor="#fff7d1" />
          <stop offset="0.3" stopColor="#fcd34d" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${u}bar`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 0.8 : 1.2} fill="#cbd5e1" opacity={0.45 + (i % 4) * 0.12} />
      ))}
      <ellipse cx="150" cy="262" rx="240" ry="86" fill={`url(#${u}earth)`} />
      <ellipse cx="150" cy="262" rx="242" ry="88" fill="none" stroke="#7dd3fc" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d={orbit} fill="none" stroke="#94a3b8" strokeOpacity="0.35" strokeDasharray="2 5" />
      <g>
        <circle r="22" fill={`url(#${u}sun)`} />
        <circle r="4.5" fill="#fff7d1" />
        {still ? <animateMotion dur="1s" path={orbit} keyPoints="0.2;0.2" keyTimes="0;1" fill="freeze" /> : <animateMotion dur="10s" repeatCount="indefinite" path={orbit} />}
      </g>
      <g transform="translate(125 95)">
        <g>
          {!still && <animateTransform attributeName="transform" type="rotate" values="-10;10;-10" dur="6s" repeatCount="indefinite" />}
          <rect x="-31" y="-4" width="21" height="8" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="0.6" />
          <rect x="10" y="-4" width="21" height="8" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="0.6" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#cbd5e1" />
          <rect x="-8" y="-7" width="16" height="14" rx="1.5" fill="#fbbf24" stroke="#fde68a" strokeWidth="0.6" />
        </g>
      </g>
      <g transform="translate(222 178)">
        {bars.map((v, i) => {
          const h = Math.max(2, v * 0.95)
          return (
            <rect key={i} x={i * 9.5} y={-h} width="6.5" height={h} rx="1.2" fill={`url(#${u}bar)`} opacity="0.92">
              {!still && <animate attributeName="height" values={`0;${h};${h};0`} keyTimes="0;0.3;0.88;1" dur="6s" begin={`${i * 0.09}s`} repeatCount="indefinite" />}
              {!still && <animate attributeName="y" values={`0;${-h};${-h};0`} keyTimes="0;0.3;0.88;1" dur="6s" begin={`${i * 0.09}s`} repeatCount="indefinite" />}
            </rect>
          )
        })}
        <Label x={0} y={12}>0°</Label>
        <Label x={82} y={12} anchor="end">160°</Label>
      </g>
      <Label x={222} y={98}>FAIL 1→71%</Label>
    </>
  )
}

/* FlyGuard: a fly walks a T-maze and turns left (LLM) or right (quarantine). */
function Fly({ u, still }: P) {
  const nodes = [[30, 40], [70, 22], [110, 50], [40, 120], [80, 150], [250, 30], [290, 60], [270, 140], [220, 160], [300, 170], [20, 180], [130, 170]]
  const links = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [5, 6], [6, 7], [7, 8], [8, 9], [5, 7], [10, 4], [11, 4], [3, 10]]
  const left = 'M160 188 L160 82 L84 82'
  const right = 'M160 188 L160 82 L236 82'
  const flyShape = (color: string) => (
    <g>
      <ellipse rx="5" ry="2.6" fill={color} />
      <ellipse cx="-1" cy="-3.4" rx="3.4" ry="1.7" fill="#e2e8f0" opacity="0.75" />
      <ellipse cx="-1" cy="3.4" rx="3.4" ry="1.7" fill="#e2e8f0" opacity="0.75" />
    </g>
  )
  const motion = (path: string, begin: string) => (
    <>
      <animateMotion dur="5s" begin={begin} repeatCount="indefinite" rotate="auto" path={path} keyPoints="0;0.58;0.58;1" keyTimes="0;0.42;0.56;1" calcMode="linear" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" dur="5s" begin={begin} repeatCount="indefinite" />
    </>
  )
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#120a22" />
          <stop offset="1" stopColor="#24123f" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#a78bfa" strokeOpacity="0.25" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="#c4b5fd" opacity="0.55">
          {!still && <animate attributeName="opacity" values="0.25;0.9;0.25" dur={`${2 + (i % 4) * 0.6}s`} repeatCount="indefinite" />}
        </circle>
      ))}
      <path d="M160 192 L160 82 M76 82 L244 82" stroke="#a78bfa" strokeOpacity="0.16" strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M160 192 L160 82 M76 82 L244 82" stroke="#c4b5fd" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <circle cx="70" cy="82" r="15" fill="#34d399" fillOpacity="0.18" stroke="#34d399" />
      <path d="M63 82l5 5 9-10" stroke="#34d399" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="250" cy="82" r="15" fill="#fb7185" fillOpacity="0.18" stroke="#fb7185" />
      <path d="M244 76l12 12M256 76l-12 12" stroke="#fb7185" strokeWidth="2.2" strokeLinecap="round" />
      <Label x={70} y={112} fill="#6ee7b7" anchor="middle">LLM</Label>
      <Label x={250} y={112} fill="#fda4af" anchor="middle">QUARANTINE</Label>
      {still ? (
        <g transform="translate(160 130) rotate(-90)">{flyShape('#22d3ee')}</g>
      ) : (
        <>
          <g opacity="0">
            {flyShape('#22d3ee')}
            {motion(left, '0s')}
          </g>
          <g opacity="0">
            {flyShape('#f472b6')}
            {motion(right, '2.5s')}
          </g>
        </>
      )}
    </>
  )
}

/* Team B: a four-junction corridor with cycling signals and moving cars. */
function Traffic({ u, still }: P) {
  const xs = [50, 125, 200, 275]
  const cars = [
    { y: 94, dur: 7, begin: 0, color: '#38bdf8', dir: 1 },
    { y: 94, dur: 7, begin: -3.5, color: '#a78bfa', dir: 1 },
    { y: 106, dur: 9, begin: -2, color: '#f472b6', dir: -1 },
    { y: 106, dur: 9, begin: -6.5, color: '#fbbf24', dir: -1 },
  ]
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1220" />
          <stop offset="1" stopColor="#0f1b2e" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />
      {[30, 60, 140, 170].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#1e293b" strokeWidth="1" />
      ))}
      {xs.map((x) => (
        <rect key={x} x={x - 11} y="0" width="22" height="200" fill="#1f2937" />
      ))}
      <rect x="0" y="87" width="320" height="26" fill="#1f2937" />
      <line x1="0" x2="320" y1="100" y2="100" stroke="#fbbf24" strokeOpacity="0.5" strokeDasharray="6 6" />
      {xs.map((x, i) => (
        <g key={x}>
          {[
            [x - 15, 83],
            [x + 15, 117],
          ].map(([cx, cy], k) => (
            <circle key={k} cx={cx} cy={cy} r="3.2" fill={k ? '#ef4444' : '#22c55e'}>
              {!still && (
                <animate
                  attributeName="fill"
                  values={k ? '#ef4444;#ef4444;#22c55e;#22c55e;#ef4444' : '#22c55e;#f59e0b;#ef4444;#ef4444;#22c55e'}
                  keyTimes="0;0.4;0.5;0.9;1"
                  dur="6s"
                  begin={`${-i * 1.2}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </g>
      ))}
      {cars.map((c, i) => (
        <g key={i} transform={`translate(${still ? 40 + i * 70 : 0} ${c.y})`}>
          <rect x="-6" y="-3" width="12" height="6" rx="2" fill={c.color} />
          {!still && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values={c.dir > 0 ? `-20 ${c.y};340 ${c.y}` : `340 ${c.y};-20 ${c.y}`}
              dur={`${c.dur}s`}
              begin={`${c.begin}s`}
              repeatCount="indefinite"
            />
          )}
        </g>
      ))}
      <g transform={`translate(125 ${still ? 40 : 0})`}>
        <rect x="-4" y="-7" width="8" height="14" rx="2" fill="#f8fafc" />
        <rect x="-1" y="-4" width="2" height="8" fill="#ef4444" />
        <circle cy="-8" r="2" fill="#ef4444">
          {!still && <animate attributeName="fill" values="#ef4444;#3b82f6;#ef4444" dur="0.6s" repeatCount="indefinite" />}
        </circle>
        {!still && <animateTransform attributeName="transform" type="translate" values="128 -20;128 220" dur="5s" repeatCount="indefinite" />}
      </g>
      <Label x={10} y={188}>SUMO DIGITAL TWIN · 4 JUNCTIONS</Label>
    </>
  )
}

/* ifEV: a neon top-view virtual EV whose regen energy flows into the battery. */
function Ev({ u, still }: P) {
  const neon = '#1FD3F0'
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#03060a" />
          <stop offset="1" stopColor="#0a1620" />
        </linearGradient>
        <filter id={`${u}glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />
      {[44, 76, 124, 156].map((y, i) => (
        <line key={y} x1="0" x2="40" y1={y} y2={y} stroke={neon} strokeOpacity="0.35" strokeLinecap="round">
          {!still && <animate attributeName="x1" values="60;-40" dur={`${0.9 + i * 0.2}s`} repeatCount="indefinite" />}
          {!still && <animate attributeName="x2" values="90;-10" dur={`${0.9 + i * 0.2}s`} repeatCount="indefinite" />}
        </line>
      ))}
      <g filter={`url(#${u}glow)`} stroke={neon} fill="none" strokeWidth="2">
        <rect x="60" y="68" width="150" height="64" rx="28" fill={neon} fillOpacity="0.05" />
        <path d="M150 74 Q172 100 150 126" />
        <path d="M98 76 Q86 100 98 124" />
        <line x1="104" y1="78" x2="146" y2="78" strokeOpacity="0.6" />
        <line x1="104" y1="122" x2="146" y2="122" strokeOpacity="0.6" />
      </g>
      {[
        [80, 62],
        [80, 130],
        [172, 62],
        [172, 130],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="20" height="8" rx="3" fill={neon} opacity="0.75" />
      ))}
      <g stroke={neon} fill="none" strokeWidth="2" filter={`url(#${u}glow)`}>
        <rect x="240" y="86" width="52" height="28" rx="5" />
        <rect x="292" y="95" width="5" height="10" rx="1.5" fill={neon} />
      </g>
      <rect x="244" y="90" width={still ? 34 : 10} height="20" rx="3" fill={neon} opacity="0.8">
        {!still && <animate attributeName="width" values="8;44;8" keyTimes="0;0.85;1" dur="5s" repeatCount="indefinite" />}
      </rect>
      {!still &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} r="2.2" fill={neon} opacity="0">
            <animateMotion dur="1.6s" begin={`${i * 0.27}s`} repeatCount="indefinite" path={i % 2 ? 'M190 66 Q220 70 246 98' : 'M190 134 Q220 130 246 102'} />
            <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${i * 0.27}s`} repeatCount="indefinite" />
          </circle>
        ))}
      <Label x={60} y={170} fill="#67e8f9">VIRTUAL EV · 4 WEEKS · REGEN</Label>
    </>
  )
}

/* MOA: three reports drop onto a map and merge into one prioritized issue. */
function Moa({ u, still }: P) {
  const pins = [
    { x: 146, y: 98, c: '#f97316' },
    { x: 172, y: 108, c: '#f43f5e' },
    { x: 156, y: 124, c: '#eab308' },
  ]
  const pin = (c: string) => (
    <g>
      <path d="M0 0 C-7 -9 -9 -13 -9 -17 A9 9 0 0 1 9 -17 C9 -13 7 -9 0 0Z" fill={c} stroke="#0f172a" strokeWidth="1" />
      <circle cy="-17" r="3.2" fill="#fff" />
    </g>
  )
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1424" />
          <stop offset="1" stopColor="#13213a" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />
      <path d="M-10 150 C60 130 100 175 170 160 S280 120 330 140 L330 210 L-10 210Z" fill="#0ea5e9" opacity="0.14" />
      <rect x="220" y="20" width="70" height="50" rx="6" fill="#22c55e" opacity="0.12" />
      {[40, 90, 140, 190, 240, 290].map((x) => (
        <line key={x} x1={x} x2={x - 20} y1="0" y2="200" stroke="#334155" strokeOpacity="0.6" />
      ))}
      {[35, 75, 115].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y + 10} stroke="#334155" strokeOpacity="0.6" />
      ))}
      <circle cx="160" cy="102" r="34" fill="#22d3ee" fillOpacity="0.08" stroke="#22d3ee" strokeDasharray="3 4" opacity={still ? 1 : 0}>
        {!still && <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.42;0.5;0.9;1" dur="6s" repeatCount="indefinite" />}
        {!still && <animate attributeName="r" values="10;10;34;34;34" keyTimes="0;0.42;0.5;0.9;1" dur="6s" repeatCount="indefinite" />}
      </circle>
      {pins.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <g opacity={still ? 1 : 0}>
            {pin(p.c)}
            {!still && (
              <>
                <animateTransform attributeName="transform" type="translate" values="0 -40;0 -40;0 0;0 0" keyTimes={`0;${0.06 + i * 0.1};${0.14 + i * 0.1};1`} dur="6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${0.06 + i * 0.1};${0.14 + i * 0.1};0.92;1`} dur="6s" repeatCount="indefinite" />
              </>
            )}
          </g>
        </g>
      ))}
      <g transform="translate(198 56)" opacity={still ? 1 : 0}>
        {!still && <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.62;0.92;1" dur="6s" repeatCount="indefinite" />}
        <rect width="86" height="30" rx="8" fill="#0f172a" stroke="#22d3ee" strokeOpacity="0.6" />
        <rect x="6" y="7" width="22" height="16" rx="4" fill="#f43f5e" />
        <text x="17" y="19" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily={MONO}>P1</text>
        <text x="34" y="19" fontSize="9" fill="#e2e8f0" fontFamily={MONO}>3 → 1</text>
      </g>
      <Label x={308} y={190} anchor="end">
        3 REPORTS → 1 ISSUE
      </Label>
    </>
  )
}

/* LEFT ON THE FLOOR: a crate is cut out of the film set above and drops into the pit on the editing-room floor below. */
function Cut({ u, still }: P) {
  const holes = Array.from({ length: 14 }, (_, i) => 6 + i * 23)
  const loop = { dur: '6s', repeatCount: 'indefinite' as const }
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#120d07" />
          <stop offset="1" stopColor="#06110f" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />

      {/* the film set, framed like a strip of film */}
      <rect x="0" y="10" width="320" height="90" fill="#2b2013" />
      {holes.map((x) => (
        <g key={x} fill="#0d0905">
          <rect x={x} y="13" width="11" height="6" rx="1.5" />
          <rect x={x} y="91" width="11" height="6" rx="1.5" />
        </g>
      ))}
      <rect x="0" y="78" width="320" height="10" fill="#8a6531" />
      {/* the editing-room floor below: a negative image with a pit */}
      <rect x="0" y="110" width="320" height="90" fill="#0b2a28" />
      <rect x="0" y="164" width="114" height="10" fill="#5eead4" opacity="0.55" />
      <rect x="150" y="164" width="170" height="10" fill="#5eead4" opacity="0.55" />
      <rect x="114" y="164" width="36" height="36" fill="#031312" />
      <rect x="266" y="38" width="28" height="40" fill="#3b2b17" stroke="#f5c76b" strokeOpacity="0.55" />
      <path d="M212 54 L162 40 L162 74Z" fill="#fde68a" opacity="0.1" />
      <rect x="212" y="46" width="12" height="32" rx="6" fill="#e7e5e4" />
      <circle cx="218" cy="42" r="5" fill="#e7e5e4" />

      {/* the crate: cut, then dropped one floor */}
      <g>
        {!still && <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 110;0 110" keyTimes="0;0.36;0.5;1" {...loop} />}
        <rect x="118" y="54" width="28" height="24" fill="#b7791f" stroke="#fde68a" strokeWidth="1" />
        <path d="M118 54 L146 78 M146 54 L118 78" stroke="#fde68a" strokeOpacity="0.6" />
        <rect x="114" y="50" width="36" height="32" fill="none" stroke="#f43f5e" strokeDasharray="3 2" opacity="0">
          {!still && <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.24;0.26;0.34;0.37;1" {...loop} />}
        </rect>
      </g>
      <g opacity={still ? 0 : 1}>
        {!still && <animateTransform attributeName="transform" type="translate" values="40 30;132 66;132 66;132 66" keyTimes="0;0.22;0.38;1" {...loop} />}
        {!still && <animate attributeName="opacity" values="1;1;1;0;0" keyTimes="0;0.36;0.38;0.4;1" {...loop} />}
        <circle r="7" fill="none" stroke="#f43f5e" strokeWidth="1.4" />
        <path d="M-11 0 H-4 M4 0 H11 M0 -11 V-4 M0 4 V11" stroke="#f43f5e" strokeWidth="1.4" />
      </g>
      <text x="132" y="42" fontSize="10" fontWeight="700" fill="#f43f5e" textAnchor="middle" fontFamily={MONO} opacity="0">
        CUT!
        {!still && <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.25;0.27;0.4;0.44;1" {...loop} />}
      </text>

      <g>
        {!still && <animateTransform attributeName="transform" type="translate" values="20 0;20 0;150 0;270 0;270 0" keyTimes="0;0.55;0.75;0.92;1" {...loop} />}
        <rect x="-5" y="142" width="10" height="22" rx="5" fill="#a5f3fc" transform={still ? 'translate(70 0)' : undefined} />
      </g>

      <Label x={258} y={32} fill="#f5c76b" anchor="end">
        FILM SET
      </Label>
      <Label x={12} y={128} fill="#5eead4">
        EDITING FLOOR
      </Label>
      <Label x={308} y={192} anchor="end">
        CUT IT · CROSS ON IT
      </Label>
    </>
  )
}

/* ROADMINE: a dashcam frame gets detections, an event tag and irreversible masks, then passes
   three gates into a signed package. The key parts sit in the middle (x 70–250), so the square
   thumbnail of a wide award card still shows all of them. */
function Mine({ u, still }: P) {
  const loop = { dur: '6s', repeatCount: 'indefinite' as const }
  const show = (at: number) => (still ? undefined : <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${at};${at + 0.04};0.94;1`} {...loop} />)
  const gates: [string, number, number][] = [
    ['RIGHTS', 96, 0.46],
    ['PRIVACY', 140, 0.56],
    ['QUALITY', 184, 0.66],
  ]
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a0f1a" />
          <stop offset="1" stopColor="#111a2e" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />
      {/* incoming clips on the left, outputs on the right (decoration; a square crop may hide them) */}
      {[34, 62, 90].map((y) => (
        <rect key={y} x="14" y={y} width="42" height="22" rx="3" fill="#0f172a" stroke="#334155" />
      ))}
      {['mp4', 'xosc', 'json'].map((f, i) => (
        <text key={f} x="282" y={44 + i * 26} fontSize="8" fill="#475569" textAnchor="middle" fontFamily={MONO}>
          .{f}
        </text>
      ))}

      {/* dashcam frame */}
      <rect x="72" y="26" width="136" height="98" rx="7" fill="#070b14" stroke="#334155" />
      <path d="M78 124 L134 70 L146 70 L202 124Z" fill="#1e293b" />
      <path d="M140 74 L140 84 M140 92 L140 104 M140 112 L140 122" stroke="#e2e8f0" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="199" cy="35" r="2.6" fill="#ef4444">
        {!still && <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />}
      </circle>
      {/* a car cutting in, and a pedestrian */}
      <rect x="146" y="90" width="30" height="18" rx="3.5" fill="#64748b" />
      <rect x="155" y="101" width="12" height="4.5" fill="#facc15" />
      <circle cx="98" cy="84" r="4.2" fill="#cbd5e1" />
      <rect x="93.5" y="89" width="9" height="17" rx="3.5" fill="#94a3b8" />

      {/* detections and the event tag */}
      <g opacity={still ? 1 : 0}>
        {show(0.1)}
        <rect x="142.5" y="86.5" width="37" height="25" fill="none" stroke="#22d3ee" strokeDasharray="3 2" />
        <rect x="89.5" y="77.5" width="17" height="32" fill="none" stroke="#22d3ee" strokeDasharray="3 2" />
      </g>
      <g opacity={still ? 1 : 0}>
        {show(0.2)}
        <rect x="78" y="32" width="46" height="12" rx="3" fill="#f43f5e" />
        <text x="101" y="41" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily={MONO}>
          CUT-IN
        </text>
      </g>
      {/* irreversible masks: solid blocks, never blur */}
      <g opacity={still ? 1 : 0}>
        {show(0.32)}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={155 + i * 4} y="100.5" width="4" height="5.5" fill={i % 2 ? '#0f172a' : '#1e293b'} />
        ))}
        <rect x="94" y="80" width="4" height="4" fill="#0f172a" />
        <rect x="98" y="80" width="4" height="4" fill="#1e293b" />
        <rect x="94" y="84" width="4" height="4" fill="#1e293b" />
        <rect x="98" y="84" width="4" height="4" fill="#0f172a" />
      </g>

      {/* three gates in a row under the frame */}
      {gates.map(([name, x, at]) => (
        <g key={name} transform={`translate(${x} 140)`}>
          <circle r="6" fill="#334155" />
          <circle r="6" fill="#34d399" opacity={still ? 1 : 0}>
            {show(at)}
          </circle>
          <text y="17" fontSize="7" fill="#cbd5e1" textAnchor="middle" fontFamily={MONO} letterSpacing="0.6">
            {name}
          </text>
        </g>
      ))}
      {/* the signed delivery package */}
      <g transform="translate(216 62)" opacity={still ? 1 : 0}>
        {show(0.76)}
        <path d="M2 8 L16 2 L30 8 L30 26 L16 32 L2 26Z" fill="#fbbf24" opacity="0.88" />
        <path d="M2 8 L16 14 L30 8 M16 14 L16 32" stroke="#0f172a" strokeWidth="1" fill="none" />
        <text x="16" y="46" fontSize="7" fontWeight="700" fill="#fde68a" textAnchor="middle" fontFamily={MONO}>
          SIGNED
        </text>
      </g>

      <Label x={160} y={188} anchor="middle">
        MASK → 3 GATES → SIGNED ZIP
      </Label>
    </>
  )
}

/* JAX air combat: a 3v3 engagement on curved paths, and training time on CPU (JSBSim) vs GPU (JAX). */
function Duel({ u, still }: P) {
  const blue = ['M-10 60 C60 40 120 90 175 70 S260 30 330 60', 'M-10 96 C70 80 130 120 190 100 S270 70 330 96', 'M-10 132 C60 120 140 150 200 128 S270 110 330 130']
  const red = ['M330 44 C250 70 190 30 130 58 S40 100 -10 80', 'M330 88 C260 110 200 70 140 96 S50 130 -10 116', 'M330 140 C250 150 190 110 120 136 S40 160 -10 150']
  const jet = (fill: string) => <path d="M7 0 L-5 -5 L-2 0 L-5 5Z" fill={fill} stroke="#0b1020" strokeWidth="0.8" />
  const flight = (d: string, i: number, dur: number) =>
    still ? (
      <animateMotion dur="1s" path={d} keyPoints={`${0.25 + i * 0.12};${0.25 + i * 0.12}`} keyTimes="0;1" fill="freeze" rotate="auto" />
    ) : (
      <animateMotion dur={`${dur}s`} begin={`${-i * 1.3}s`} repeatCount="indefinite" path={d} rotate="auto" />
    )
  return (
    <>
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050a18" />
          <stop offset="1" stopColor="#0c1730" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}bg)`} />
      {[40, 80, 120, 160, 200, 240, 280].map((x) => (
        <line key={x} x1={x} x2={x} y1="0" y2="200" stroke="#1e293b" strokeOpacity="0.7" />
      ))}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#1e293b" strokeOpacity="0.7" />
      ))}
      {blue.map((d) => (
        <path key={d} d={d} fill="none" stroke="#22d3ee" strokeOpacity="0.22" strokeDasharray="2 4" />
      ))}
      {red.map((d) => (
        <path key={d} d={d} fill="none" stroke="#f43f5e" strokeOpacity="0.22" strokeDasharray="2 4" />
      ))}
      {blue.map((d, i) => (
        <g key={`b${i}`}>
          {jet('#22d3ee')}
          {flight(d, i, 7)}
        </g>
      ))}
      {red.map((d, i) => (
        <g key={`r${i}`}>
          {jet('#f43f5e')}
          {flight(d, i, 8)}
        </g>
      ))}

      {/* training time: JSBSim on CPU vs the JAX port on GPU */}
      <g transform="translate(14 164)">
        <rect width="292" height="30" rx="6" fill="#0b1224" stroke="#334155" />
        <text x="8" y="12" fontSize="7" fill="#94a3b8" fontFamily={MONO}>
          JSBSim · CPU
        </text>
        <rect x="72" y="6" width="190" height="7" rx="2" fill="#fbbf24" opacity="0.8">
          {!still && <animate attributeName="width" values="0;190;190" keyTimes="0;0.5;1" dur="6s" repeatCount="indefinite" />}
        </rect>
        <text x="286" y="12" fontSize="7" fill="#fde68a" textAnchor="end" fontFamily={MONO}>
          190h
        </text>
        <text x="8" y="24" fontSize="7" fill="#94a3b8" fontFamily={MONO}>
          JAX · GPU
        </text>
        <rect x="72" y="18" width="20" height="7" rx="2" fill="#22d3ee">
          {!still && <animate attributeName="width" values="0;20;20" keyTimes="0;0.06;1" dur="6s" repeatCount="indefinite" />}
        </rect>
        <text x="100" y="24" fontSize="7" fill="#a5f3fc" fontFamily={MONO}>
          ~20h
        </text>
      </g>
      <Label x={308} y={22} anchor="end">
        3V3 · 10 SEEDS · JAX ≈ JSBSIM
      </Label>
    </>
  )
}
