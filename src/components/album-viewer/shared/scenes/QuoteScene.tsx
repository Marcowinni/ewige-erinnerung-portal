import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { wordRevealVariants } from '../sceneAnimations'
import type { QuoteScene as QuoteSceneType } from '../buildScenes'

interface Props {
  scene: QuoteSceneType
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: {
    bg: 'hsl(36 40% 97%)',
    quoteFont: 'Playfair Display, serif',
    quoteColor: 'hsl(30 10% 10%)',
    accentColor: 'hsl(27 34% 54%)',
    ruleStyle: '1px solid hsl(27 34% 54% / 0.25)',
  },
  classic: {
    bg: '#F5EBD7',
    quoteFont: 'Playfair Display, serif',
    quoteColor: '#3D2E1F',
    accentColor: '#C9A84C',
    ruleStyle: '1px solid rgba(201,168,76,0.4)',
  },
  vintage: {
    bg: '#E8D9C4',
    quoteFont: 'Dancing Script, cursive',
    quoteColor: '#3D2E1F',
    accentColor: '#8B6B47',
    ruleStyle: '1px dashed rgba(139,107,71,0.35)',
  },
}

export function QuoteScene({ scene, theme }: Props) {
  const t = THEMES[theme]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const words = scene.text.split(' ')
  const { container, word: wordVar } = wordRevealVariants(words)

  return (
    <section
      className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden px-10 sm:px-16"
      style={{ minWidth: 'min(100vw, 720px)', scrollSnapAlign: 'center', background: t.bg }}
    >
      {/* Grain overlay for vintage */}
      {theme === 'vintage' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
      )}

      <div ref={ref} className="w-full max-w-lg text-center">
        {/* Rule top */}
        <motion.div
          className="mb-10 mx-auto"
          style={{ height: 0, borderTop: t.ruleStyle, width: 80 }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {theme === 'classic' && (
          <motion.div
            className="mb-6 text-[10px] uppercase tracking-[0.3em]"
            style={{ color: t.accentColor, fontFamily: 'Cormorant Garamond, serif' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ✦
          </motion.div>
        )}

        {/* Word-by-word reveal */}
        <motion.p
          className={`italic leading-relaxed ${theme === 'vintage' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}
          style={{ fontFamily: t.quoteFont, color: t.quoteColor }}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {words.map((w, i) => (
            <motion.span key={i} variants={wordVar} style={{ display: 'inline-block', marginRight: '0.25em' }}>
              {w}
            </motion.span>
          ))}
        </motion.p>

        {/* Rule bottom */}
        <motion.div
          className="mt-10 mx-auto"
          style={{ height: 0, borderTop: t.ruleStyle, width: 80 }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </div>
    </section>
  )
}
