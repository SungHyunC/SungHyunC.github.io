import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { Spotlight } from './components/bits'
import { Header, type Tab } from './components/Header'
import { profile } from './data/profile'
import { LangProvider, ui, useLang } from './lib/i18n'
import { ThemeProvider } from './lib/theme'
import { About } from './pages/About'
import { ProjectsPage } from './pages/Projects'

/** Two tabs, kept in the URL hash: #about (default) and #projects. */
function useTab(): Tab {
  const read = (): Tab => (location.hash === '#projects' ? 'projects' : 'about')
  const [tab, setTab] = useState<Tab>(read)
  useEffect(() => {
    const onHash = () => {
      setTab(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return tab
}

function Footer() {
  const { t } = useLang()
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-faint">
        <span>© 2026 {t(profile.name)} · {t(profile.altName)}</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="link">
          {t(ui.backToTop)} ↑
        </button>
      </div>
    </footer>
  )
}

function Shell() {
  const tab = useTab()
  return (
    <>
      <Spotlight />
      <Header tab={tab} />
      {/* keyed so the quiet fade-in replays on every tab switch */}
      <main key={tab} className={`mx-auto px-6 ${tab === 'projects' ? 'max-w-6xl' : 'max-w-3xl'}`}>
        {tab === 'about' ? <About /> : <ProjectsPage />}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <MotionConfig reducedMotion="user">
          <Shell />
        </MotionConfig>
      </LangProvider>
    </ThemeProvider>
  )
}
