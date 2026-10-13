import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  BrainCircuit,
  Code2,
  ExternalLink,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Mail,
  Network,
  Radio,
  ScanEye,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import {
  contactHref,
  externalUrl,
  project,
  type TeamMember,
} from '../config/project'
import { Reveal } from './UI'
import './ProjectDetails.css'

const technologies = [
  { name: 'Python', label: 'Core language', icon: Code2, color: 'blue' },
  { name: 'OpenCV', label: 'Frame processing', icon: ScanEye, color: 'mint' },
  {
    name: 'MediaPipe',
    label: 'Landmark detection',
    icon: Network,
    color: 'mint',
  },
  {
    name: 'TensorFlow / Keras',
    label: 'Recognition models',
    icon: BrainCircuit,
    color: 'orange',
  },
  {
    name: 'Machine Learning',
    label: 'Gesture classification',
    icon: Sparkles,
    color: 'violet',
  },
  { name: 'Flask', label: 'Application server', icon: Braces, color: 'white' },
  {
    name: 'Flask-SocketIO',
    label: 'Live communication',
    icon: Radio,
    color: 'blue',
  },
  {
    name: 'HTML, CSS & JS',
    label: 'Recognition interface',
    icon: Globe2,
    color: 'orange',
  },
] as const

export function Technology() {
  return (
    <section
      className="section details-technology"
      id="technology"
      aria-labelledby="technology-title"
    >
      <div className="container">
        <Reveal className="details-section-top">
          <div>
            <p className="eyebrow">04 / THE TECHNOLOGY</p>
            <h2 className="section-heading" id="technology-title">
              A connected stack. <br />
              <span>One shared purpose.</span>
            </h2>
          </div>
          <p className="section-intro">
            From a camera frame to readable text, each part of the recognition
            system has a role to play.
          </p>
        </Reveal>
        <div className="details-tech-grid">
          {technologies.map(({ name, label, icon: Icon, color }, index) => (
            <Reveal
              key={name}
              className="details-tech-card"
              delay={(index % 4) * 0.06}
            >
              <span className={`details-tech-icon details-color-${color}`}>
                <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3>{name}</h3>
                <p>{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="details-stack-note">
          <span aria-hidden="true">↳</span> The recognition prototype uses the
          stack above. This promotional website is built with React, TypeScript,
          and Vite.
        </p>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: Users,
    title: 'More inclusive conversations',
    description: 'Explore ways to connect sign language users and non-signers.',
  },
  {
    icon: HeartHandshake,
    title: 'Accessibility awareness',
    description: 'Bring everyday communication barriers into focus.',
  },
  {
    icon: BrainCircuit,
    title: 'AI with a practical purpose',
    description:
      'Connect computer vision research to a human-centered challenge.',
  },
  {
    icon: Lightbulb,
    title: 'Room for new ideas',
    description: 'Encourage innovation in assistive technology.',
  },
  {
    icon: GraduationCap,
    title: 'Built for learning',
    description: 'Offer a capstone prototype for experimentation and research.',
  },
] as const

export function Benefits() {
  return (
    <section
      className="section details-benefits"
      aria-labelledby="benefits-title"
    >
      <div className="container details-benefits-layout">
        <Reveal className="details-benefits-intro">
          <p className="eyebrow">06 / THE HUMAN IMPACT</p>
          <h2 className="section-heading" id="benefits-title">
            Why Sign Language <br />
            Recognition Matters
          </h2>
          <p className="section-intro">
            The most meaningful technology starts with people. This project is a
            small step toward a more connected world.
          </p>
          <div className="details-connection-art" aria-hidden="true">
            <div className="details-connection-orbit" />
            <span className="details-person details-person-one">
              <Users size={24} strokeWidth={1.4} />
            </span>
            <span className="details-connection-center">
              <HeartHandshake size={38} strokeWidth={1.2} />
            </span>
            <span className="details-person details-person-two">
              <Users size={24} strokeWidth={1.4} />
            </span>
            <span className="details-connection-caption">
              HUMAN CONNECTION, REIMAGINED
            </span>
          </div>
        </Reveal>
        <div className="details-benefit-list">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              className="details-benefit"
              key={title}
              delay={index * 0.04}
            >
              <span className="details-benefit-icon">
                <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="details-benefit-number" aria-hidden="true">
                0{index + 1}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)
  const photoDialog = useRef<HTMLDialogElement>(null)
  const photoUrl = member.photoUrl ?? ''
  const photo = /^\/images\/[\w.-]+$/.test(photoUrl)
    ? photoUrl
    : externalUrl(photoUrl)
  const links = [
    { name: 'Portfolio', url: externalUrl(member.portfolioUrl ?? '') },
    { name: 'LinkedIn', url: externalUrl(member.linkedinUrl ?? '') },
  ].filter((link) => link.url)
  const nameParts = member.name.trim().split(/\s+/)
  const initials = `${nameParts[0][0]}${nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : ''}`

  useEffect(() => {
    const dialog = photoDialog.current
    if (photoOpen && dialog && !dialog.open) dialog.showModal()
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [photoOpen])

  return (
    <article
      className="details-developer-card"
      aria-label={`${member.name}, ${member.role}`}
    >
      <div className="details-developer-avatar">
        {photo && !photoFailed ? (
          <button
            className="details-developer-photo-button"
            type="button"
            aria-label={`View ${member.name}'s photo`}
            onClick={() => setPhotoOpen(true)}
          >
            <img
              src={photo}
              alt={member.name}
              loading="lazy"
              onError={() => setPhotoFailed(true)}
            />
          </button>
        ) : (
          <>
            <span aria-hidden="true">
              {initials}
              <span>.</span>
            </span>
            <small>TEAM MEMBER</small>
          </>
        )}
      </div>
      <div className="details-developer-copy">
        <p className="details-role">
          <span />
          {member.role}
        </p>
        <h3>{member.name}</h3>
        {links.length > 0 && (
          <div className="details-developer-links">
            {links.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
                <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
      {photo && !photoFailed && (
        <dialog
          ref={photoDialog}
          className="details-photo-dialog"
          aria-label={`${member.name}'s photo`}
          onClose={() => setPhotoOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setPhotoOpen(false)
          }}
        >
          <button
            className="details-photo-dialog-close"
            type="button"
            aria-label="Close photo"
            onClick={() => setPhotoOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
          <img src={photo} alt={member.name} />
          <p>{member.name}</p>
        </dialog>
      )}
    </article>
  )
}

export function Developer() {
  return (
    <section
      className="section details-developer"
      id="developers"
      aria-labelledby="developer-title"
    >
      <div className="container">
        <Reveal className="details-section-top">
          <div>
            <p className="eyebrow">07 / BEHIND THE PROJECT</p>
            <h2 className="section-heading" id="developer-title">
              An idea. A purpose. <br />
              <span>A team behind it.</span>
            </h2>
          </div>
          <p className="section-intro">
            Meet the team behind our camera-based capstone project, bringing
            system development, project management, database design, and
            interface design together.
          </p>
        </Reveal>
        <div className="details-team-grid">
          {[project.developer, ...project.team].map((member, index) => (
            <Reveal key={member.name} delay={(index % 2) * 0.06}>
              <TeamMemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

type SocialName = keyof typeof project.socials
const socials: { key: SocialName; title: string; label: string }[] = [
  { key: 'facebook', title: 'Facebook', label: 'Official project page' },
  { key: 'instagram', title: 'Instagram', label: 'Official project profile' },
  { key: 'tiktok', title: 'TikTok', label: 'Ideas in motion' },
]

function SocialIcon({ name }: { name: SocialName }) {
  const paths: Record<SocialName, ReactNode> = {
    facebook: (
      <path
        d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5C17 1.3 16 1 15 1c-3 0-5 2-5 5v3H7v4h3v8z"
        fill="currentColor"
      />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    tiktok: (
      <path
        d="M14 3v12.5a4.5 4.5 0 1 1-4.5-4.5M14 3c.3 3 2.4 5 5 5"
        strokeWidth="3"
      />
    ),
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export function SocialMedia() {
  const email = contactHref(project.contactEmail)
  return (
    <section
      className="section details-social"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <Reveal className="details-centered-heading">
          <p className="eyebrow">08 / STAY IN THE LOOP</p>
          <h2 className="section-heading" id="contact-title">
            Connect With Our Project
          </h2>
          <p className="section-intro">
            Follow the journey. Discover the ideas. Be part of the conversation.
          </p>
        </Reveal>
        <div className="details-social-grid">
          {socials.map(({ key, title, label }, index) => {
            const url = externalUrl(project.socials[key])
            const isInstagramReel =
              key === 'instagram' &&
              url &&
              new URL(url).pathname.startsWith('/reel/')
            const content = (
              <>
                <span className={`details-social-icon details-social-${key}`}>
                  <SocialIcon name={key} />
                </span>
                <h3>{title}</h3>
                <p>{label}</p>
                <span className="details-social-status">
                  {url ? (
                    <>
                      {isInstagramReel
                        ? 'Watch our reel'
                        : key === 'tiktok'
                          ? 'Open TikTok'
                          : 'Visit our page'}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <span className="details-status-dot" />
                      Coming soon
                    </>
                  )}
                </span>
                {url && <span className="sr-only">Opens in a new tab</span>}
              </>
            )
            return (
              <Reveal key={key} delay={index * 0.04}>
                {url ? (
                  <a
                    className="details-social-card details-social-enabled"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="details-social-card">{content}</div>
                )}
              </Reveal>
            )
          })}
        </div>
        <p className="details-contact-note">
          <Mail size={16} aria-hidden="true" />
          {email ? (
            <a href={email}>{project.contactEmail}</a>
          ) : (
            'Official channels and contact details will be shared here when available.'
          )}
        </p>
      </div>
    </section>
  )
}

export function ClosingCTA() {
  return (
    <section className="section details-cta" aria-labelledby="cta-title">
      <div className="details-cta-orbit" aria-hidden="true" />
      <Reveal className="container details-cta-content">
        <span className="details-cta-symbol" aria-hidden="true">
          <HeartHandshake size={26} strokeWidth={1.4} />
        </span>
        <p className="eyebrow">A SMALL STEP. A MORE CONNECTED WORLD.</p>
        <h2 id="cta-title">
          Building a Future Where <br />
          Communication Has <span>No Barriers.</span>
        </h2>
        <p>
          Explore how computer vision and artificial intelligence can support
          accessible and inclusive communication.
        </p>
        <div className="details-cta-actions">
          <a className="button button-primary" href="#preview">
            Explore the Project
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href="#contact">
            Follow Our Updates
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const enabledSocials = socials.filter(({ key }) =>
    externalUrl(project.socials[key]),
  )
  return (
    <footer className="details-footer">
      <div className="container">
        <div className="details-footer-top">
          <a
            href="#home"
            className="details-footer-brand"
            aria-label={`${project.title} — home`}
          >
            <img
              src={`${import.meta.env.BASE_URL}${project.logo}`}
              alt=""
              width="62"
              height="62"
              loading="lazy"
            />
            <span>
              <strong>{project.title}</strong>
              <small>Breaking Communication Barriers Through AI</small>
            </span>
          </a>
          <nav aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#technology">Technology</a>
            <a href="#developers">Our team</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="details-footer-bottom">
          <p>
            © {new Date().getFullYear()} {project.title}.
          </p>
          <p>
            Developed by <span>{project.developer.name}</span> &amp;{' '}
            <a href="#developers">team</a>
          </p>
          {enabledSocials.length > 0 && (
            <div className="details-footer-socials">
              {enabledSocials.map(({ key, title }) => (
                <a
                  key={key}
                  href={externalUrl(project.socials[key])}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} (opens in a new tab)`}
                >
                  <SocialIcon name={key} />
                  <ExternalLink size={10} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
