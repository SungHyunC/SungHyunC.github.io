import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Mode = 'light' | 'dark'

type ThemeCtx = { mode: Mode; toggle: () => void }

const Ctx = createContext<ThemeCtx | null>(null)
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function readSaved(): Mode | null {
  try {
    const v = localStorage.getItem('theme')
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

/**
 * Follows the operating-system setting until the visitor presses the toggle;
 * after that their choice is remembered.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Mode | null>(readSaved)
  const [system, setSystem] = useState<Mode>(() => (media().matches ? 'dark' : 'light'))
  const mode = saved ?? system

  useEffect(() => {
    const m = media()
    const onChange = () => setSystem(m.matches ? 'dark' : 'light')
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  const toggle = useCallback(() => {
    const next: Mode = mode === 'dark' ? 'light' : 'dark'
    setSaved(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore */
    }
  }, [mode])

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
