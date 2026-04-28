import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import type { DateMarkerScene as DateMarkerSceneType } from '../buildScenes'

interface Props {
  scene: DateMarkerSceneType
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: {
    bg: 'hsl(36 40% 97%)',
    labelFont: 'Cormorant Garamond, serif',
    labelColor: 'hsl(30 10% 10% / 0.12)',
    subFont: 'Inter, sans-serif',
    subColor: 'hsl(27 34% 54%)',
  },
  classic: {
    bg: '#F5EBD7',
    labelFont: 'Playfair Display, serif',
    labelColor: 'rgba(61,46,31,0.1)',
    subFont: 'Cormorant Garamond, serif',
    subColor: '#C9A84C',
  },
  vintage: {
    bg: '#E8D9C4',
    labelFont: 'Dancing Script, cursive',
    labelColor: 'rgba(61,46,31,0.12)',
    subFont: 'Dancing Script, cursive',
    subColor: '#8B6B47',
  },
}

export function DateMarkerScene({ scene, theme }: Props) {
  const t = THEMES[theme]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ minWidth: 'min(100vw, 480px)', scrollSnapAlign: 'center', background: t.bg }}
    >
      <div ref={ref} className="text-center select-none">
        {/* Giant year — decorative */}
        <motion.div
          className="text-[18vw] sm:text-[12vw] font-bold leading-none"
          style={{ fontFamily: t.labelFont, color: t.labelColor, userSelect: 'none' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {scene.label}
        </motion.div>

        {/* Subtle label below */}
        <motion.p
          className="mt-4 uppercase tracking-[0.35em] text-[10px]"
          style={{ fontFamily: t.subFont, color: t.subColor }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Erinnerungen
        </motion.p>
      </div>
    </section>
  )
}
