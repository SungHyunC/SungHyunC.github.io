import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { Bento } from './components/Bento'
import { Nav } from './components/Nav'
import { ProjectModalProvider, Projects } from './components/Projects'
import { Contact, Research, Skills, Team, Timeline } from './components/Sections'
import { TrajectoryCanvas } from './components/TrajectoryCanvas'
import { LangProvider } from './lib/i18n'
import { ThemeProvider } from './lib/theme'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent to-accent-2"
    />
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <MotionConfig reducedMotion="user">
          <ProjectModalProvider>
            <TrajectoryCanvas />
            <ScrollProgress />
            <Nav />
            <main>
              <Bento />
              <Projects />
              <Research />
              <Timeline />
              <Team />
              <Skills />
            </main>
            <Contact />
          </ProjectModalProvider>
        </MotionConfig>
      </LangProvider>
    </ThemeProvider>
  )
}
