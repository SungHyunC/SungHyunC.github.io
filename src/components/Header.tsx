import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { profile } from '../data/profile'
import { ui, useLang, type Lang } from '../lib/i18n'
import { useTheme } from '../lib/theme'
import { asset } from './bits'

export type Tab = 'about' | 'projects'

function LangToggle() {
  const { lang, setLang, t } = useLang()
  const opts: [Lang, string][] = [
    ['en', 'EN'],
    ['ko', '한'],
  ]
  return (
    <div role="group" aria-label={t(ui.langSwitch)} className="flex items-center rounded-full border border-line bg-surface p-0.5">
      {opts.map(([l, label]) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            lang === l ? 'text-bg' : 'text-faint hover:text-ink'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-ink"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative">{label}</span>
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
      className="grid size-8 place-items-center overflow-hidden rounded-full border border-line bg-surface text-muted transition-colors hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ y: -14, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: 14, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {mode === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
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
    // The background is always on (it matches the page at the top), so text never shows
    // through; only the bottom border appears once the page is scrolled.
    <header
      className={`sticky top-0 z-30 border-b bg-bg/80 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        <a href="#about" className="hidden items-center gap-2.5 justify-self-start font-bold tracking-tight sm:flex" aria-label={t(profile.name)}>
          {profile.photo ? (
            <img src={asset(profile.photo)} alt="" className="size-7 rounded-full object-cover ring-2 ring-accent/30" />
          ) : null}
          <span className="whitespace-nowrap text-[15px]">{t(profile.name)}</span>
        </a>

        <nav aria-label="Primary" className="-ml-2.5 flex h-full items-center sm:ml-0">
          {tabs.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={tab === id ? 'page' : undefined}
              className={`relative flex h-full items-center whitespace-nowrap px-2.5 text-[15px] font-semibold transition-colors sm:px-3 ${
                tab === id ? 'text-ink' : 'text-faint hover:text-ink'
              }`}
            >
              {t(ui.tabs[id])}
              {tab === id && (
                <motion.span
                  layoutId="tab-line"
                  className="absolute inset-x-2.5 bottom-[-1px] h-[2px] rounded-full bg-gradient-to-r from-accent to-accent-2 sm:inset-x-3"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 justify-self-end">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
