import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { kenBurns, fadeUp } from '../sceneAnimations'
import type { HeroScene as HeroSceneType } from '../buildScenes'

interface Props {
  scene: HeroSceneType
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: {
    bg: 'hsl(36 40% 97%)',
    overlay: 'rgba(20,15,8,0.52)',
    nameFont: 'Cormorant Garamond, serif',
    nameColor: '#FFFCF5',
    metaFont: 'Inter, sans-serif',
    metaColor: 'rgba(255,252,245,0.72)',
    tagline: 'Erinnerungen · Momente · Liebe',
    tagColor: 'rgba(255,252,245,0.55)',
  },
  classic: {
    bg: '#F5EBD7',
    overlay: 'rgba(15,8,2,0.58)',
    nameFont: 'Playfair Display, serif',
    nameColor: '#F5EBD7',
    metaFont: 'Cormorant Garamond, serif',
    metaColor: 'rgba(245,235,215,0.8)',
    tagline: 'In liebevoller Erinnerung',
    tagColor: 'rgba(201,168,76,0.85)',
  },
  vintage: {
    bg: '#E8D9C4',
    overlay: 'rgba(30,16,4,0.55)',
    nameFont: 'Dancing Script, cursive',
    nameColor: '#FFFCF5',
    metaFont: 'Dancing Script, cursive',
    metaColor: 'rgba(255,252,245,0.78)',
    tagline: 'Erinnerungen',
    tagColor: 'rgba(210,185,140,0.9)',
  },
}

export function HeroScene({ scene, theme }: Props) {
  const t = THEMES[theme]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const kb = kenBurns()

  return (
    <section
      className="relative flex-shrink-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
      aria-label={`Album für ${scene.subjectName}`}
    >
      {/* Background image with Ken-Burns */}
      {scene.heroImageSrc && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={scene.heroImageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: 'transform' }}
            initial={kb.initial}
            animate={kb.animate}
            transition={kb.transition}
            aria-hidden
          />
          <div className="absolute inset-0" style={{ background: t.overlay }} />
        </div>
      )}

      {/* Content */}
      <div ref={ref} className="relative z-10 text-center px-8 max-w-2xl mx-auto">
        <motion.p
          className="uppercase tracking-[0.3em] text-[11px] mb-6"
          style={{ fontFamily: t.metaFont, color: t.tagColor }}
          variants={fadeUp(0, 'normal')}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {t.tagline}
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-7xl font-semibold leading-[1.08] mb-6"
          style={{ fontFamily: t.nameFont, color: t.nameColor }}
          variants={fadeUp(0.1, 'normal')}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {scene.subjectName}
        </motion.h1>

        {scene.dateRange && (
          <motion.p
            className="text-sm sm:text-base tracking-[0.15em]"
            style={{ fontFamily: t.metaFont, color: t.metaColor }}
            variants={fadeUp(0.2, 'normal')}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {scene.dateRange}
          </motion.p>
        )}

        {theme === 'classic' && (
          <motion.div
            className="mt-8 mx-auto"
            style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', width: 120 }}
            variants={fadeUp(0.3, 'slow')}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          />
        )}
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ x: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
            <path d="M0 7h28M22 1.5l7 5.5-7 5.5" stroke={t.tagColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
