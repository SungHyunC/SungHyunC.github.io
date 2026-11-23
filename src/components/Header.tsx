import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { ui, useLang, type Lang } from '../lib/i18n'
import { useTheme } from '../lib/theme'

export type Tab = 'about' | 'projects'

function LangToggle() {
  const { lang, setLang, t } = useLang()
  const opts: [Lang, string][] = [
    ['en', 'EN'],
    ['ko', '한'],
  ]
  return (
    <div role="group" aria-label={t(ui.langSwitch)} className="flex items-center rounded-full border border-line p-0.5">
      {opts.map(([l, label]) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${
            lang === l ? 'bg-ink text-bg' : 'text-faint hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { mode, toggle } = useTheme()
  const { t } = useLang()
  const label = t(mode === 'dark' ? ui.themeToLight : ui.themeToDark)
  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-ink"
    >
      <span key={mode} className="fade-in transition-transform duration-300 group-hover:rotate-12">
        {mode === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>
    </button>
  )
}

export function Header({ tab }: { tab: Tab }) {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tabs: Tab[] = ['about', 'projects']

  return (
    // The background is always on (it matches the page at the top), so text can never show
    // through it; only the bottom border appears once the page is scrolled.
    <header
      className={`sticky top-0 z-30 border-b bg-bg/85 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-6">
        <nav aria-label="Primary" className="-ml-2 flex h-full items-center">
          {tabs.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={tab === id ? 'page' : undefined}
              className={`relative flex h-full items-center px-2 text-[15px] font-medium transition-colors ${
                tab === id ? 'text-ink' : 'text-faint hover:text-ink'
              }`}
            >
              {t(ui.tabs[id])}
              {tab === id && <span className="absolute inset-x-2 bottom-[-1px] h-[2px] rounded-full bg-ink" />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
