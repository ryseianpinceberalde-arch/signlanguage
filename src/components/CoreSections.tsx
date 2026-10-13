import {
  Accessibility,
  ArrowUpRight,
  BrainCircuit,
  Camera,
  CircleDot,
  Hand,
  Layers3,
  MessageSquareText,
  Monitor,
  Network,
  ScanLine,
  Sparkles,
  Type,
  Users,
  Zap,
} from 'lucide-react'
import { Reveal, TiltCard } from './UI'

export function About() {
  return (
    <section
      id="about"
      className="section container about-section"
      aria-labelledby="about-heading"
    >
      <Reveal className="about-heading">
        <p className="eyebrow">01 / THE PURPOSE</p>
        <h2 id="about-heading" className="section-heading">
          Technology that
          <br />
          <span>connects people.</span>
        </h2>
        <p className="about-quote">
          Communication is human.
          <br />
          Let’s make it more inclusive.
        </p>
      </Reveal>
      <Reveal className="about-content" delay={0.08}>
        <p className="about-lead">
          A conversation should start with connection,
          <br className="desktop-break" /> not a communication barrier.
        </p>
        <p>
          For sign language users and people who don’t sign, everyday
          conversations can be challenging. This project explores how accessible
          technology can help bridge that gap.
        </p>
        <p>
          Using a webcam, computer vision, and trained machine learning models,
          our capstone prototype recognizes supported, predefined signs and
          converts them into readable text.
        </p>
        <div className="about-pillars">
          {[
            {
              icon: Accessibility,
              title: 'Accessibility',
              text: 'More ways to be understood.',
            },
            {
              icon: Users,
              title: 'Communication',
              text: 'Connection at the center.',
            },
            {
              icon: BrainCircuit,
              title: 'Artificial intelligence',
              text: 'Technology with a purpose.',
            },
            {
              icon: Zap,
              title: 'Real-time interaction',
              text: 'From gesture to response.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon size={18} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="prototype-note">
          <CircleDot size={15} aria-hidden="true" />
          <p>
            A focused research prototype for supported signs—not a universal
            sign language translator.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

const features = [
  {
    icon: ScanLine,
    title: 'Real-time sign recognition',
    description:
      'Capture and process supported hand gestures through a webcam, connecting movement with meaning.',
    tag: 'CAMERA → GESTURE',
    className: 'cyan',
  },
  {
    icon: BrainCircuit,
    title: 'AI-powered recognition',
    description:
      'Trained machine learning models analyze visual features to identify signs in the supported vocabulary.',
    tag: 'TRAINED TO RECOGNIZE',
    className: 'violet',
  },
  {
    icon: MessageSquareText,
    title: 'Sign-to-text conversion',
    description:
      'Bring recognized gestures into everyday conversations with clear, readable text output.',
    tag: 'GESTURE → TEXT',
    className: 'blue',
  },
  {
    icon: Hand,
    title: 'Text-to-sign presentation',
    description:
      'Explore corresponding sign demonstrations for text available in the recognition application’s library.',
    tag: 'TEXT → SIGN',
    className: 'blue',
  },
  {
    icon: Layers3,
    title: 'Multiple recognition modes',
    description:
      'Switch between Auto, Letter, Number, and Word modes to explore the supported recognition categories.',
    tag: 'ONE INTERFACE. FOUR MODES.',
    className: 'cyan',
  },
  {
    icon: Monitor,
    title: 'A web-based interface',
    description:
      'An approachable browser interface brings camera input, recognition controls, and text output together.',
    tag: 'BUILT FOR THE BROWSER',
    className: 'violet',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="features-section"
      aria-labelledby="features-heading"
    >
      <div className="container section">
        <Reveal className="section-heading-row">
          <div>
            <p className="eyebrow">02 / POSSIBILITIES, BUILT IN</p>
            <h2 id="features-heading" className="section-heading">
              Small gestures.
              <br />
              <span>Powerful possibilities.</span>
            </h2>
          </div>
          <p className="section-intro">
            Thoughtfully designed features that bring
            <br className="desktop-break" /> human expression and intelligent
            technology
            <br className="desktop-break" /> a little closer together.
          </p>
        </Reveal>
        <div className="feature-grid">
          {features.map(
            ({ icon: Icon, title, description, tag, className }, index) => (
              <Reveal key={title} delay={(index % 3) * 0.06}>
                <TiltCard className={`feature-card ${className}`}>
                  <div className="feature-card-top">
                    <span className="feature-icon">
                      <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="feature-number">0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="feature-tag">
                    {tag}
                    <span aria-hidden="true">↗</span>
                  </div>
                </TiltCard>
              </Reveal>
            ),
          )}
        </div>
        <p className="feature-disclaimer">
          <Sparkles size={13} aria-hidden="true" /> Features describe the
          capstone recognition application. This website is its project
          showcase.
        </p>
      </div>
    </section>
  )
}

const steps = [
  {
    icon: Camera,
    title: 'Capture',
    label: 'CAMERA INPUT',
    text: 'Your webcam captures the hand gestures you make.',
    detail: 'A familiar starting point.',
  },
  {
    icon: Network,
    title: 'Detect',
    label: 'LANDMARK DETECTION',
    text: 'MediaPipe identifies relevant hand and body landmarks.',
    detail: 'Movement becomes data.',
  },
  {
    icon: BrainCircuit,
    title: 'Recognize',
    label: 'AI RECOGNITION',
    text: 'Trained models analyze features to identify supported signs.',
    detail: 'Patterns become meaning.',
  },
  {
    icon: Type,
    title: 'Connect',
    label: 'TEXT OUTPUT',
    text: 'The recognized sign appears as readable text on the screen.',
    detail: 'Meaning becomes connection.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section container workflow-section"
      aria-labelledby="workflow-heading"
    >
      <Reveal className="center-heading">
        <p className="eyebrow">03 / FROM GESTURE TO MEANING</p>
        <h2 id="workflow-heading" className="section-heading">
          One gesture. <span>Four simple steps.</span>
        </h2>
        <p className="section-intro">
          A little computer vision. A little intelligence. A whole new way to
          connect.
        </p>
      </Reveal>
      <ol className="workflow">
        {steps.map(({ icon: Icon, title, label, text, detail }, index) => (
          <li key={title}>
            <Reveal delay={index * 0.09}>
              <div className="workflow-node">
                <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <p className="workflow-label">{label}</p>
              <h3>{title}</h3>
              <p className="workflow-text">{text}</p>
              <span className="workflow-detail">{detail}</span>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal className="workflow-link">
        <a href="#preview">
          See the interface in action{' '}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  )
}
