import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTheme } from '../lib/theme'

/**
 * Full-page background: two teams of "aircraft" fly along a slowly changing
 * flow field and leave fading trails. Near the cursor the cyan team pursues it
 * and the violet team evades it (a nod to pursuit-evasion / air-combat RL),
 * while satellites circle faint orbits in the corner.
 */

type RGB = readonly [number, number, number]
type Palette = { a: RGB; b: RGB; orbit: RGB; strength: number }

const PALETTES: Record<'light' | 'dark', Palette> = {
  dark: { a: [34, 211, 238], b: [167, 139, 250], orbit: [148, 163, 184], strength: 1 },
  light: { a: [8, 145, 178], b: [124, 58, 237], orbit: [71, 85, 105], strength: 0.7 },
}

const TRAIL = 28
const MOUSE_RADIUS = 260

type Agent = {
  x: number
  y: number
  th: number
  v: number
  team: 0 | 1
  turn: number
  trail: Float32Array
  head: number
  len: number
}

const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a))
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

export function TrajectoryCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const { mode } = useTheme()
  const reduce = useReducedMotion()
  const palette = useRef<Palette>(PALETTES[mode])
  const redraw = useRef<() => void>(() => {})

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let w = 0
    let h = 0
    let agents: Agent[] = []
    let raf = 0
    let last = performance.now()
    let time = 0
    const mouse = { x: -9999, y: -9999, at: -1e9 }

    const makeAgent = (i: number): Agent => ({
      x: Math.random() * w,
      y: Math.random() * h,
      th: Math.random() * Math.PI * 2,
      v: 0.6 + Math.random() * 0.9,
      team: (i % 2) as 0 | 1,
      turn: 0.022 + Math.random() * 0.02,
      trail: new Float32Array(TRAIL * 2),
      head: 0,
      len: 0,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(34, Math.max(12, (w * h) / 42000)))
      agents = Array.from({ length: n }, (_, i) => makeAgent(i))
    }

    // smooth, slowly drifting heading field
    const flow = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0021 + t * 0.00011) * 1.6 +
      Math.cos(y * 0.0027 - t * 0.00009) * 1.6 +
      Math.sin((x + y) * 0.0011 + t * 0.00005)

    const step = (t: number, dt: number) => {
      const mouseOn = t - mouse.at < 2500
      for (const a of agents) {
        const f = flow(a.x, a.y, t)
        let vx = Math.cos(f)
        let vy = Math.sin(f)
        if (mouseOn) {
          const dx = mouse.x - a.x
          const dy = mouse.y - a.y
          const d = Math.hypot(dx, dy)
          if (d < MOUSE_RADIUS) {
            const k = (1 - d / MOUSE_RADIUS) * 1.6
            const sign = a.team === 0 ? 1 : -1 // cyan pursues, violet evades
            vx += (sign * dx * k) / (d || 1)
            vy += (sign * dy * k) / (d || 1)
          }
        }
        const diff = wrapAngle(Math.atan2(vy, vx) - a.th)
        const maxTurn = a.turn * dt * (mouseOn ? 1.6 : 1)
        a.th += Math.max(-maxTurn, Math.min(maxTurn, diff))
        a.x += Math.cos(a.th) * a.v * dt
        a.y += Math.sin(a.th) * a.v * dt

        const wx = a.x < -30 ? w + 30 : a.x > w + 30 ? -30 : a.x
        const wy = a.y < -30 ? h + 30 : a.y > h + 30 ? -30 : a.y
        if (wx !== a.x || wy !== a.y) {
          a.x = wx
          a.y = wy
          a.len = 0 // don't draw a trail across the screen
        }

        a.trail[a.head * 2] = a.x
        a.trail[a.head * 2 + 1] = a.y
        a.head = (a.head + 1) % TRAIL
        a.len = Math.min(a.len + 1, TRAIL)
      }
    }

    const drawOrbits = (t: number) => {
      const p = palette.current
      const cx = w * 0.86
      const cy = h * 0.14
      const base = Math.min(w, h) * 0.34
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-0.38)
      const planet = ctx.createRadialGradient(0, 0, 0, 0, 0, base * 0.26)
      planet.addColorStop(0, rgba(p.a, 0.12 * p.strength))
      planet.addColorStop(1, rgba(p.a, 0))
      ctx.fillStyle = planet
      ctx.beginPath()
      ctx.arc(0, 0, base * 0.26, 0, Math.PI * 2)
      ctx.fill()
      ctx.setLineDash([2, 7])
      ctx.lineWidth = 1
      ;[0.55, 0.8, 1.05].forEach((s, k) => {
        const rx = base * s
        const ry = rx * 0.36
        ctx.strokeStyle = rgba(p.orbit, 0.16 * p.strength)
        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()
        const ang = t * 0.00016 * (1.35 - k * 0.3) + k * 2.1
        const sx = Math.cos(ang) * rx
        const sy = Math.sin(ang) * ry
        const c = k === 1 ? p.b : p.a
        ctx.fillStyle = rgba(c, 0.18 * p.strength)
        ctx.beginPath()
        ctx.arc(sx, sy, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = rgba(c, 0.85 * p.strength)
        ctx.beginPath()
        ctx.arc(sx, sy, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    }

    const draw = (t: number) => {
      const p = palette.current
      ctx.clearRect(0, 0, w, h)
      ctx.setLineDash([])
      drawOrbits(t)
      ctx.lineCap = 'round'

      for (const a of agents) {
        const c = a.team === 0 ? p.a : p.b
        const start = (a.head - a.len + TRAIL) % TRAIL
        for (let i = 1; i < a.len; i++) {
          const i0 = ((start + i - 1) % TRAIL) * 2
          const i1 = ((start + i) % TRAIL) * 2
          const f = i / a.len
          ctx.strokeStyle = rgba(c, f * f * 0.55 * p.strength)
          ctx.lineWidth = 0.5 + f * 1.3
          ctx.beginPath()
          ctx.moveTo(a.trail[i0], a.trail[i0 + 1])
          ctx.lineTo(a.trail[i1], a.trail[i1 + 1])
          ctx.stroke()
        }
        ctx.fillStyle = rgba(c, 0.14 * p.strength)
        ctx.beginPath()
        ctx.arc(a.x, a.y, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = rgba(c, 0.9 * p.strength)
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.7, 0, Math.PI * 2)
        ctx.fill()
      }

      // lock-on lines and reticle around the cursor
      if (t - mouse.at < 2500) {
        const fade = 1 - (t - mouse.at) / 2500
        ctx.setLineDash([3, 5])
        ctx.lineWidth = 0.8
        for (const a of agents) {
          if (a.team !== 0) continue
          const d = Math.hypot(mouse.x - a.x, mouse.y - a.y)
          if (d > 170) continue
          ctx.strokeStyle = rgba(p.a, (1 - d / 170) * 0.35 * fade * p.strength)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
        ctx.setLineDash([])
        ctx.save()
        ctx.translate(mouse.x, mouse.y)
        ctx.rotate(t * 0.0012)
        ctx.strokeStyle = rgba(p.a, 0.5 * fade * p.strength)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(0, 0, 15, 0, Math.PI * 2)
        ctx.stroke()
        for (let k = 0; k < 4; k++) {
          ctx.rotate(Math.PI / 2)
          ctx.beginPath()
          ctx.moveTo(19, 0)
          ctx.lineTo(25, 0)
          ctx.stroke()
        }
        ctx.restore()
      }
    }

    const loop = (now: number) => {
      const dt = Math.min(3, (now - last) / 16.67)
      last = now
      time += dt * 16.67
      step(time, dt)
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    const still = () => {
      for (let i = 0; i < 160; i++) {
        time += 16.67
        step(time, 1)
      }
      draw(time)
    }
    redraw.current = () => draw(time)

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.at = time
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }
    const onResize = () => {
      resize()
      if (reduce) still()
    }

    resize()
    if (reduce) still()
    else raf = requestAnimationFrame(loop)

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  // switch colors on theme change; repaint the still frame under reduced motion
  useEffect(() => {
    palette.current = PALETTES[mode]
    if (reduce) redraw.current()
  }, [mode, reduce])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />
}
