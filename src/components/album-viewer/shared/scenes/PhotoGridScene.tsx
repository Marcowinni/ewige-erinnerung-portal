import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { staggerGridVariant } from '../sceneAnimations'
import type { PhotoGridScene as PhotoGridSceneType } from '../buildScenes'

interface Props {
  scene: PhotoGridSceneType
  getUrl: (i: number) => string | null
  getCaption: (i: number) => string
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: { bg: 'hsl(36 40% 97%)', imgFilter: 'none', gap: 'gap-3' },
  classic: { bg: '#F5EBD7', imgFilter: 'none', gap: 'gap-4' },
  vintage: { bg: '#E8D9C4', imgFilter: 'sepia(0.3) contrast(1.05)', gap: 'gap-6' },
}

const VINTAGE_ROTATIONS = [-3.2, 2.5, -1.8, 3.1]

export function PhotoGridScene({ scene, getUrl, getCaption, theme }: Props) {
  const t = THEMES[theme]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })
  const items = scene.items.slice(0, 4)

  function GridItem({ item, index }: { item: typeof items[0]; index: number }) {
    const src = getUrl(item.sourceIndex)
    const caption = item.caption ?? getCaption(item.sourceIndex)
    const aspectRatio = item.orientation === 'portrait' ? '3/4' : '1/1'
    const rotation = theme === 'vintage' ? VINTAGE_ROTATIONS[index % 4]! : 0

    const imgEl = src ? (
      <img
        src={src}
        alt={caption ?? ''}
        className="w-full object-cover block"
        style={{ aspectRatio, filter: t.imgFilter }}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className="w-full bg-stone-200" style={{ aspectRatio }} />
    )

    const inner = theme === 'vintage' ? (
      <div style={{
        background: '#FFFCF5', padding: '6px', paddingBottom: '28px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.25)', borderRadius: 2,
        border: '1px solid rgba(0,0,0,0.06)', position: 'relative',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: -6, left: '50%',
          transform: 'translateX(-50%) rotate(-1deg)',
          width: 36, height: 11,
          background: 'rgba(210,185,140,0.58)', borderRadius: 1, zIndex: 10,
        }} />
        {imgEl}
        {caption && (
          <p className="absolute bottom-[4px] left-0 right-0 text-center text-[9px]"
            style={{ fontFamily: 'Dancing Script, cursive', color: '#5C4328' }}>
            {caption}
          </p>
        )}
      </div>
    ) : theme === 'classic' ? (
      <div style={{ position: 'relative' }}>
        {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-2.5 h-2.5`}
            style={{ background: '#C9A84C', clipPath: 'polygon(0 0, 100% 0, 0 100%)', opacity: 0.6 }} aria-hidden />
        ))}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.3)', zIndex: 1 }} aria-hidden />
        {imgEl}
      </div>
    ) : (
      <div className="overflow-hidden">{imgEl}</div>
    )

    return (
      <motion.div
        variants={staggerGridVariant(index)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ rotate: rotation }}
        whileHover={theme !== 'vintage' ? undefined : { scale: 1.04, rotate: rotation * 0.5, transition: { duration: 0.2 } }}
      >
        {inner}
      </motion.div>
    )
  }

  return (
    <section
      className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden px-6 sm:px-10"
      style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
    >
      <div
        ref={ref}
        className={`grid grid-cols-2 ${t.gap} w-full max-w-xl`}
      >
        {items.map((item, i) => (
          <GridItem key={item.sourceIndex} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
