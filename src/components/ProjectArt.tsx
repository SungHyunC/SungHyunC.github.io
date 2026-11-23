import { useId } from 'react'
import { useReducedMotion } from 'motion/react'
import type { Art } from '../data/types'

/** Animated SVG thumbnails for projects that have no public screenshot. */
export function ProjectArt({ art }: { art: Art }) {
  const still = !!useReducedMotion()
  const u = useId().replace(/:/g, '')
  const props = { u, still }
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      {art === 'orbit' && <Orbit {...props} />}
      {art === 'fly' && <Fly {...props} />}
      {art === 'traffic' && <Traffic {...props} />}
      {art === 'ev' && <Ev {...props} />}
      {art === 'moa' && <Moa {...props} />}
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
      <Label x={12} y={22}>3 REPORTS → 1 ISSUE</Label>
    </>
  )
}
