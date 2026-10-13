import {
  ArrowDown,
  Accessibility,
  Camera,
  Cpu,
  FlaskConical,
  Pause,
  Play,
} from 'lucide-react'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import HandTracking from './HandTracking'
import { MagneticLink } from './UI'
import { useMotionPreference } from '../hooks/useMotionPreference'

export default function Hero({
  paused,
  onToggleMotion,
}: {
  paused: boolean
  onToggleMotion: () => void
}) {
  const reduced = useMotionPreference()
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end start'],
  })
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 35])
  return (
    <>
      <section
        id="home"
        ref={section}
        className="hero"
        aria-labelledby="hero-heading"
      >
        <div className="hero-background" aria-hidden="true">
          <div className="hero-glow" />
          {Array.from({ length: 13 }, (_, i) => (
            <span
              className="particle"
              key={i}
              style={{
                left: `${(i * 37 + 12) % 100}%`,
                top: `${(i * 23 + 8) % 100}%`,
                animationDelay: `${-i * 1.7}s`,
              }}
            />
          ))}
        </div>
        <div className="container hero-layout">
          <motion.div
            className="hero-copy"
            initial={reduced ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8 }}
          >
            <div className="hero-badge">
              <span className="status-dot" /> A NEW PERSPECTIVE ON COMMUNICATION
            </div>
            <h1 id="hero-heading">
              Sign language
              <br />
              <span>recognition.</span>
            </h1>
            <p className="hero-tagline">
              Breaking communication barriers
              <br className="desktop-break" /> through artificial intelligence.
            </p>
            <p className="hero-description">
              Every gesture has something to say. We’re exploring how AI can
              turn sign language into text—and bring people closer, one
              conversation at a time.
            </p>
            <div className="hero-actions">
              <MagneticLink href="#features">Explore features</MagneticLink>
              <MagneticLink href="#how-it-works" secondary>
                How it works
              </MagneticLink>
            </div>
            <p className="hero-note">
              <span />
              <span>Camera-based recognition</span>
              <span className="note-divider">/</span>
              <span>Human-centered design</span>
            </p>
          </motion.div>
          <motion.div
            className="hero-visual"
            style={{ y: reduced ? 0 : parallax }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 1.3,
              delay: reduced ? 0 : 0.15,
            }}
          >
            <HandTracking />
          </motion.div>
        </div>
        <div className="container hero-bottom">
          <a href="#about" className="scroll-cue">
            <span className="scroll-icon">
              <ArrowDown size={15} />
            </span>{' '}
            A little movement. A lot of meaning.
          </a>
          <button
            type="button"
            className="motion-toggle"
            aria-pressed={paused}
            onClick={onToggleMotion}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            {paused ? 'Resume motion' : 'Pause motion'}
          </button>
        </div>
      </section>
      <div className="project-principles">
        <div className="container principles-inner">
          {[
            { icon: Accessibility, text: 'Designed for inclusion' },
            { icon: Camera, text: 'Camera-based interaction' },
            { icon: Cpu, text: 'Powered by computer vision' },
            { icon: FlaskConical, text: 'A capstone exploration' },
          ].map(({ icon: Icon, text }) => (
            <div key={text}>
              <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
