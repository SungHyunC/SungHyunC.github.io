import type { ComponentType } from 'react'
import {
  Bot,
  BrainCircuit,
  Car,
  Cpu,
  Database,
  FileCode,
  Layers,
  Network,
  Plane,
  Radio,
  Satellite,
  Search,
  Sparkles,
  TrafficCone,
  Zap,
} from 'lucide-react'
import {
  siAndroid,
  siBlender,
  siCloudflare,
  siFastapi,
  siFirebase,
  siGit,
  siGithubactions,
  siGithubpages,
  siGooglegemini,
  siJavascript,
  siKotlin,
  siLanggraph,
  siLeaflet,
  siMeta,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPython,
  siPytorch,
  siRay,
  siReact,
  siScikitlearn,
  siStreamlit,
  siSwift,
  siThreedotjs,
  siTypescript,
  siUnrealengine,
  siVite,
} from 'simple-icons'

type Brand = { path: string; hex: string }
type Glyph = { brand: Brand } | { lucide: ComponentType<{ className?: string; style?: object }>; hex: string }

/** Brand marks from Simple Icons (CC0); generic Lucide icons where no brand mark exists. */
const ICONS: Record<string, Glyph> = {
  Python: { brand: siPython },
  JavaScript: { brand: siJavascript },
  TypeScript: { brand: siTypescript },
  Kotlin: { brand: siKotlin },
  Swift: { brand: siSwift },
  SwiftLint: { brand: siSwift },
  SQL: { lucide: Database, hex: '336791' },
  PyTorch: { brand: siPytorch },
  JAX: { lucide: Zap, hex: '5E97F6' },
  'Ray RLlib': { brand: siRay },
  'scikit-learn': { brand: siScikitlearn },
  QLoRA: { lucide: Layers, hex: '8B5CF6' },
  PPO: { lucide: BrainCircuit, hex: 'EC4899' },
  JSBSim: { lucide: Plane, hex: '0EA5E9' },
  MuJoCo: { lucide: Bot, hex: '14B8A6' },
  SUMO: { lucide: TrafficCone, hex: 'F97316' },
  Blender: { brand: siBlender },
  'Unreal Engine 5': { brand: siUnrealengine },
  LangGraph: { brand: siLanggraph },
  Ollama: { brand: siOllama },
  Gemini: { brand: siGooglegemini },
  'SAM 3.1': { brand: siMeta },
  'Muse Spark': { lucide: Sparkles, hex: 'A855F7' },
  'URDF/MJCF': { lucide: FileCode, hex: '64748B' },
  React: { brand: siReact },
  'Next.js': { brand: siNextdotjs },
  'Three.js': { brand: siThreedotjs },
  FastAPI: { brand: siFastapi },
  Streamlit: { brand: siStreamlit },
  Android: { brand: siAndroid },
  'Android Automotive': { brand: siAndroid },
  'Pleos Connect': { lucide: Car, hex: '1FB6D0' },
  'Node.js': { brand: siNodedotjs },
  Vite: { brand: siVite },
  Leaflet: { brand: siLeaflet },
  Git: { brand: siGit },
  'GitHub Actions': { brand: siGithubactions },
  'GitHub Pages': { brand: siGithubpages },
  Cloudflare: { brand: siCloudflare },
  Firebase: { brand: siFirebase },
  WebSockets: { lucide: Radio, hex: '22C55E' },
  SPNv2: { lucide: Satellite, hex: '6366F1' },
  'SPEED+': { lucide: Satellite, hex: '6366F1' },
  ModernBERT: { lucide: BrainCircuit, hex: 'F59E0B' },
  FlyWire: { lucide: Network, hex: 'A78BFA' },
  'TF-IDF': { lucide: Search, hex: '0EA5E9' },
  'Local LLMs': { lucide: Cpu, hex: '64748B' },
}

/** Brand colors that are nearly black or white would vanish on one of the themes. */
function usable(hex: string) {
  const n = parseInt(hex, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return lum > 0.18 && lum < 0.88
}

export function TechIcon({ name, className = 'size-3.5' }: { name: string; className?: string }) {
  const g = ICONS[name]
  if (!g) return null
  if ('brand' in g) {
    const color = usable(g.brand.hex) ? `#${g.brand.hex}` : 'currentColor'
    return (
      <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden>
        <path d={g.brand.path} fill={color} />
      </svg>
    )
  }
  const Icon = g.lucide
  return <Icon className={`shrink-0 ${className}`} style={{ color: `#${g.hex}` }} />
}

/** A tech name with its icon. */
export function TechChip({ name, size = 'sm' }: { name: string; size?: 'sm' | 'md' }) {
  const pad = size === 'md' ? 'gap-2 px-3 py-1.5 text-[13px]' : 'gap-1.5 px-2.5 py-1 text-xs'
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border border-line bg-surface font-medium text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink ${pad}`}
    >
      <TechIcon name={name} className={size === 'md' ? 'size-4' : 'size-3.5'} />
      {name}
    </span>
  )
}
