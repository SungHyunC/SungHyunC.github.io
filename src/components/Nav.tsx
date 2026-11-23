import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { ui, useLang, type Lang } from '../lib/i18n'
import { useTheme } from '../lib/theme'

const SECTIONS = ['projects', 'research', 'timeline', 'team', 'skills', 'contact'] as const

function useActiveSection() {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    // 'top' (the bento) is observed too, so no nav item is highlighted there
    const els = ['top', ...SECTIONS].map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

function LangToggle() {
  const { lang, setLang, t } = useLang()
  const opts: [Lang, string][] = [
    ['en', 'EN'],
    ['ko', '한'],
  ]
  return (
    <div role="group" aria-label={t(ui.langSwitch)} className="relative flex rounded-full border border-line bg-surface p-0.5 text-xs font-bold">
      {opts.map(([l, label]) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 rounded-full px-2.5 py-1 transition-colors ${lang === l ? 'text-white' : 'text-ink-soft hover:text-ink'}`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent-2"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {label}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { mode, toggle } = useTheme()
  const { t } = useLang()
  return (
    <button
      onClick={toggle}
      aria-label={t(mode === 'dark' ? ui.themeToLight : ui.themeToDark)}
      title={t(mode === 'dark' ? ui.themeToLight : ui.themeToDark)}
      className="relative grid size-8 place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink-soft transition hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ y: -18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: 18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {mode === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export function Nav() {
  const { t } = useLang()
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <nav
        className={`mx-auto flex max-w-6xl items-center gap-2 rounded-2xl border px-3 py-2 transition-all duration-300 ${
          scrolled ? 'border-line bg-surface shadow-lg shadow-black/5 backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 rounded-full pr-2 font-extrabold tracking-tight" aria-label="Home">
          <span className="relative grid size-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[11px] font-black text-white">
            JK
          </span>
          <span className="hidden text-sm sm:inline">SungHyunC</span>
        </a>

        <ul className="mx-auto hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active === id ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-line"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {t(ui.nav[id])}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LangToggle />
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t(ui.menu)}
            aria-expanded={open}
            className="grid size-8 place-items-center rounded-full border border-line bg-surface md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="card mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-1 p-2 md:hidden"
          >
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-ink-soft hover:bg-line hover:text-ink"
                >
                  {t(ui.nav[id])}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
