import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { fadeUp } from '../sceneAnimations'
import type { EndScene as EndSceneType } from '../buildScenes'

interface Props {
  scene: EndSceneType
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: {
    bg: 'hsl(36 40% 97%)',
    nameFont: 'Cormorant Garamond, serif',
    nameColor: 'hsl(30 10% 10%)',
    subFont: 'Inter, sans-serif',
    subColor: 'hsl(27 34% 54%)',
    ruleColor: 'hsl(27 34% 54% / 0.3)',
    tagline: 'In liebevoller Erinnerung',
    brand: 'Memora Moments',
  },
  classic: {
    bg: '#F5EBD7',
    nameFont: 'Playfair Display, serif',
    nameColor: '#3D2E1F',
    subFont: 'Cormorant Garamond, serif',
    subColor: '#C9A84C',
    ruleColor: 'rgba(201,168,76,0.45)',
    tagline: 'In liebevoller Erinnerung',
    brand: 'Memora Moments',
  },
  vintage: {
    bg: '#E8D9C4',
    nameFont: 'Dancing Script, cursive',
    nameColor: '#3D2E1F',
    subFont: 'Dancing Script, cursive',
    subColor: '#8B6B47',
    ruleColor: 'rgba(139,107,71,0.3)',
    tagline: 'Danke für alles',
    brand: 'Memora Moments',
  },
}

export function EndScene({ scene, theme }: Props) {
  const t = THEMES[theme]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden px-12"
      style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
    >
      {theme === 'vintage' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
      )}

      <div ref={ref} className="text-center w-full max-w-md">
        <motion.p
          className="text-sm mb-6 uppercase tracking-[0.3em]"
          style={{ fontFamily: t.subFont, color: t.subColor }}
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {t.tagline}
        </motion.p>

        {/* Rule */}
        <motion.div
          className="mx-auto mb-8"
          style={{ height: 0, borderTop: `1px solid ${t.ruleColor}`, width: 100 }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />

        <motion.h2
          className="text-4xl sm:text-5xl font-semibold leading-tight mb-4"
          style={{ fontFamily: t.nameFont, color: t.nameColor }}
          variants={fadeUp(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {scene.subjectName}
        </motion.h2>

        {scene.dateRange && (
          <motion.p
            className="text-sm tracking-[0.15em] mb-8"
            style={{ fontFamily: t.subFont, color: t.subColor }}
            variants={fadeUp(0.25)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {scene.dateRange}
          </motion.p>
        )}

        <motion.div
          className="mx-auto mb-6"
          style={{ height: 0, borderTop: `1px solid ${t.ruleColor}`, width: 100 }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        />

        <motion.p
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ fontFamily: t.subFont, color: t.subColor, opacity: 0.6 }}
          variants={fadeUp(0.45, 'slow')}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {t.brand}
        </motion.p>

        {theme === 'classic' && (
          <motion.div
            className="mt-6 text-[12px]"
            style={{ color: t.subColor }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            ✦
          </motion.div>
        )}
      </div>
    </section>
  )
}
