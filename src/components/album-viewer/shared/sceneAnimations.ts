import type { TargetAndTransition, Transition, Variants } from 'motion/react'

export type EasingName = 'spring' | 'ease' | 'bouncy'

function ease(speed: 'fast' | 'normal' | 'slow'): Transition {
  const dur = speed === 'fast' ? 0.65 : speed === 'slow' ? 1.4 : 1.0
  return { duration: dur, ease: [0.22, 1, 0.36, 1] }
}

// Ken-Burns: subtle scale loop on a still image
export function kenBurns(): { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition } {
  return {
    initial: { scale: 1.0 },
    animate: { scale: 1.08 },
    transition: { duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
  }
}

// Clip-path reveal left-to-right
export const clipRevealVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
  visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
}

// Circle mask expand
export const maskCircleVariants: Variants = {
  hidden: { clipPath: 'circle(0% at 50% 50%)', opacity: 1 },
  visible: { clipPath: 'circle(75% at 50% 50%)', opacity: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } },
}

// Split pair — left side
export const splitLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: ease('normal') },
}

// Split pair — right side (staggered 200ms)
export const splitRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { ...ease('normal'), delay: 0.2 } },
}

// Stagger grid item
export function staggerGridVariant(index: number, speed: 'fast' | 'normal' | 'slow' = 'normal'): Variants {
  return {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...ease(speed), delay: index * 0.12 },
    },
  }
}

// Fade + lift (generic)
export function fadeUp(delay = 0, speed: 'fast' | 'normal' | 'slow' = 'normal'): Variants {
  return {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { ...ease(speed), delay } },
  }
}

// Word-by-word reveal
export function wordRevealVariants(words: string[]): { container: Variants; word: Variants } {
  return {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.07 } },
    },
    word: {
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    },
  }
}

// Vintage rotate-in
export function rotateIn(rotation: number, fromDir: 'left' | 'right' | 'bottom', delay = 0): Variants {
  const initX = fromDir === 'left' ? -60 : fromDir === 'right' ? 60 : 0
  const initY = fromDir === 'bottom' ? 50 : 0
  const initRot = fromDir === 'left' ? rotation - 8 : fromDir === 'right' ? rotation + 8 : rotation - 4
  return {
    hidden: { opacity: 0, x: initX, y: initY, rotate: initRot },
    visible: { opacity: 1, x: 0, y: 0, rotate: rotation, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay } },
  }
}
