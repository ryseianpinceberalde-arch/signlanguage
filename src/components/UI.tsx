import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useMotionPreference } from '../hooks/useMotionPreference'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useMotionPreference()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function MagneticLink({
  href,
  children,
  secondary = false,
  className = '',
}: {
  href: string
  children: ReactNode
  secondary?: boolean
  className?: string
}) {
  const reduced = useMotionPreference()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 20 })
  const springY = useSpring(y, { stiffness: 250, damping: 20 })
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.09)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12)
  }
  return (
    <motion.a
      href={href}
      className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`}
      style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </motion.a>
  )
}

export function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const element = useRef<HTMLDivElement>(null)
  const reduced = useMotionPreference()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(y, { stiffness: 180, damping: 22 })
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse' || !element.current) return
    const bounds = element.current.getBoundingClientRect()
    x.set(-(event.clientY - bounds.top - bounds.height / 2) / 90)
    y.set((event.clientX - bounds.left - bounds.width / 2) / 90)
  }
  return (
    <motion.div
      ref={element}
      className={className}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
