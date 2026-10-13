import { createContext, useContext } from 'react'
import { useReducedMotion } from 'motion/react'

export const PausedMotionContext = createContext(false)

export function useMotionPreference() {
  const paused = useContext(PausedMotionContext)
  const reduced = useReducedMotion()
  return paused || Boolean(reduced)
}
