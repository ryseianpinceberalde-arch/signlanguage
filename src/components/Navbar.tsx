import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { project } from '../config/project'

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['features', 'Features'],
  ['how-it-works', 'How it works'],
  ['technology', 'Technology'],
  ['developers', 'Our team'],
  ['contact', 'Contact'],
] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 },
    )
    links.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const firstLink = nav.current?.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()
    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    function outside(event: globalThis.PointerEvent) {
      if (
        !nav.current?.contains(event.target as Node) &&
        !menuButton.current?.contains(event.target as Node)
      )
        setOpen(false)
    }
    const media = window.matchMedia('(min-width: 1101px)')
    function resize() {
      if (media.matches) setOpen(false)
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', outside)
    media.addEventListener('change', resize)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', outside)
      media.removeEventListener('change', resize)
    }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a
          className="brand"
          href="#home"
          aria-label="Sign Language Recognition home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-image">
            <img
              src={`${import.meta.env.BASE_URL}${project.logo}`}
              alt=""
              width="48"
              height="48"
            />
          </span>
          <span className="brand-name">
            SIGN LANGUAGE<span>RECOGNITION</span>
          </span>
        </a>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`main-nav${open ? ' is-open' : ''}`}
          ref={nav}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== menuButton.current
            )
              setOpen(false)
          }}
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => {
                setOpen(false)
                setActive(id)
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#preview">
          Explore project <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="mobile-toggle"
          ref={menuButton}
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  )
}
