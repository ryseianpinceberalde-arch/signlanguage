import { useEffect, useRef, useState } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Features, HowItWorks } from './components/CoreSections'
import ProjectPreview from './components/ProjectPreview'
import {
  Technology,
  Benefits,
  Developer,
  SocialMedia,
  ClosingCTA,
  Footer,
} from './components/ProjectDetails'
import { PausedMotionContext } from './hooks/useMotionPreference'

export default function App() {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle(
      'motion-disabled',
      paused || Boolean(reduced),
    )
    return () => document.documentElement.classList.remove('motion-disabled')
  }, [paused, reduced])

  useEffect(() => {
    const onScroll = () => setShowBack(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (reduced || paused || !window.matchMedia('(pointer: fine)').matches)
      return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!glow.current) return
        glow.current.style.setProperty('--cursor-x', `${event.clientX}px`)
        glow.current.style.setProperty('--cursor-y', `${event.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [reduced, paused])

  return (
    <PausedMotionContext value={paused}>
      <MotionConfig reducedMotion={paused ? 'always' : 'user'}>
        <div className={`site-shell${paused ? ' motion-paused' : ''}`}>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div className="cursor-glow" ref={glow} aria-hidden="true" />
          <Navbar />
          <main id="main" tabIndex={-1}>
            <Hero paused={paused} onToggleMotion={() => setPaused(!paused)} />
            <About />
            <Features />
            <HowItWorks />
            <Technology />
            <ProjectPreview />
            <Benefits />
            <Developer />
            <SocialMedia />
            <ClosingCTA />
          </main>
          <Footer />
          {showBack && (
            <a href="#home" className="back-to-top" aria-label="Back to top">
              <ArrowUp size={18} />
            </a>
          )}
        </div>
      </MotionConfig>
    </PausedMotionContext>
  )
}
