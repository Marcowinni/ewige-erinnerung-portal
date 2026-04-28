import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { splitLeftVariants, splitRightVariants } from '../sceneAnimations'
import type { PhotoPairScene as PhotoPairSceneType } from '../buildScenes'

interface Props {
  scene: PhotoPairSceneType
  getUrl: (i: number) => string | null
  getCaption: (i: number) => string
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: { bg: 'hsl(36 40% 97%)', captionFont: 'Inter, sans-serif', captionColor: 'hsl(27 34% 54%)', imgFilter: 'none' },
  classic: { bg: '#F5EBD7', captionFont: 'Cormorant Garamond, serif', captionColor: '#8B6B47', imgFilter: 'none' },
  vintage: { bg: '#E8D9C4', captionFont: 'Dancing Script, cursive', captionColor: '#5C4328', imgFilter: 'sepia(0.3) contrast(1.05)' },
}

const VINTAGE_ROTATIONS = [-3.5, 2.8]

export function PhotoPairScene({ scene, getUrl, getCaption, theme }: Props) {
  const t = THEMES[theme]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  const [a, b] = scene.items
  const srcA = getUrl(a.sourceIndex)
  const srcB = getUrl(b.sourceIndex)
  const capA = a.caption ?? getCaption(a.sourceIndex)
  const capB = b.caption ?? getCaption(b.sourceIndex)

  const isPortA = a.orientation === 'portrait'
  const isPortB = b.orientation === 'portrait'

  function PhotoCard({ src, caption, isPortrait, side }: { src: string | null; caption?: string; isPortrait: boolean; side: 'left' | 'right' }) {
    const variants = side === 'left' ? splitLeftVariants : splitRightVariants
    const aspectRatio = isPortrait ? '3/4' : '4/3'
    const rotation = theme === 'vintage' ? VINTAGE_ROTATIONS[side === 'left' ? 0 : 1] : 0

    const imgEl = src ? (
      <img
        src={src}
        alt={caption ?? ''}
        className="w-full h-full object-cover block"
        style={{ filter: t.imgFilter, aspectRatio }}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className="w-full bg-stone-200" style={{ aspectRatio }} />
    )

    const inner = theme === 'vintage' ? (
      <div
        style={{
          background: '#FFFCF5',
          padding: '8px',
          paddingBottom: '36px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
          borderRadius: 2,
          border: '1px solid rgba(0,0,0,0.06)',
          position: 'relative',
        }}
      >
        {/* Tape */}
        <div
          aria-hidden
          style={{
            position: 'absolute', top: -7, left: '50%',
            transform: 'translateX(-50%) rotate(-1deg)',
            width: 44, height: 13,
            background: 'rgba(210,185,140,0.58)', borderRadius: 1,
            zIndex: 10,
          }}
        />
        {imgEl}
        {caption && (
          <p className="absolute bottom-[6px] left-0 right-0 text-center text-[11px]"
            style={{ fontFamily: t.captionFont, color: t.captionColor }}>
            {caption}
          </p>
        )}
      </div>
    ) : theme === 'classic' ? (
      <div style={{ position: 'relative' }}>
        {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-2.5 h-2.5`}
            style={{ background: '#C9A84C', clipPath: 'polygon(0 0, 100% 0, 0 100%)', opacity: 0.7 }} aria-hidden />
        ))}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.35)', zIndex: 1 }} aria-hidden />
        {imgEl}
        {caption && (
          <p className="mt-2 text-center text-[10px] italic" style={{ fontFamily: t.captionFont, color: t.captionColor }}>
            {caption}
          </p>
        )}
      </div>
    ) : (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {imgEl}
        {caption && (
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: t.captionFont, color: t.captionColor }}>
            {caption}
          </p>
        )}
      </div>
    )

    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ rotate: rotation }}
        className="flex-1 min-w-0"
      >
        {inner}
      </motion.div>
    )
  }

  return (
    <section
      className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden px-6 sm:px-12"
      style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
    >
      <div ref={ref} className="flex gap-6 sm:gap-10 items-center w-full max-w-3xl">
        <PhotoCard src={srcA} caption={capA} isPortrait={isPortA} side="left" />
        <PhotoCard src={srcB} caption={capB} isPortrait={isPortB} side="right" />
      </div>
    </section>
  )
}
