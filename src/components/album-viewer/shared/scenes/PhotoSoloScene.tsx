import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { clipRevealVariants, maskCircleVariants, kenBurns } from '../sceneAnimations'
import type { PhotoSoloScene as PhotoSoloSceneType } from '../buildScenes'

interface Props {
  scene: PhotoSoloSceneType
  getUrl: (i: number) => string | null
  getCaption: (i: number) => string
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: { bg: 'hsl(36 40% 97%)', captionFont: 'Inter, sans-serif', captionColor: 'hsl(27 34% 54%)', imgFilter: 'none' },
  classic: { bg: '#F5EBD7', captionFont: 'Cormorant Garamond, serif', captionColor: '#8B6B47', imgFilter: 'none' },
  vintage: { bg: '#E8D9C4', captionFont: 'Dancing Script, cursive', captionColor: '#5C4328', imgFilter: 'sepia(0.3) contrast(1.05)' },
}

function PolaroidWrapper({ children, caption, theme }: { children: React.ReactNode; caption?: string; theme: string }) {
  if (theme !== 'vintage') return <>{children}</>
  const t = THEMES.vintage
  return (
    <div
      style={{
        background: '#FFFCF5',
        padding: '10px',
        paddingBottom: '42px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.14)',
        borderRadius: 2,
        border: '1px solid rgba(0,0,0,0.06)',
        position: 'relative',
      }}
    >
      {/* Tape strip */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -8,
          left: '50%',
          transform: 'translateX(-50%) rotate(-1.5deg)',
          width: 56,
          height: 16,
          background: 'rgba(210,185,140,0.6)',
          borderRadius: 1,
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          zIndex: 10,
        }}
      />
      {children}
      {caption && (
        <p
          className="absolute bottom-[8px] left-0 right-0 text-center text-sm"
          style={{ fontFamily: t.captionFont, color: t.captionColor, fontStyle: 'italic' }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}

function ClassicMountWrapper({ children, caption, theme }: { children: React.ReactNode; caption?: string; theme: string }) {
  if (theme !== 'classic') return <>{children}</>
  const t = THEMES.classic
  return (
    <div style={{ position: 'relative' }}>
      {/* Corner tabs */}
      {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} w-3 h-3`}
          style={{ background: '#C9A84C', clipPath: 'polygon(0 0, 100% 0, 0 100%)', opacity: 0.7 }}
          aria-hidden
        />
      ))}
      {/* Gold inset border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.4)', zIndex: 1 }}
        aria-hidden
      />
      {children}
      {caption && (
        <p
          className="mt-3 text-center text-[11px] italic"
          style={{ fontFamily: t.captionFont, color: t.captionColor }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}

export function PhotoSoloScene({ scene, getUrl, getCaption, theme }: Props) {
  const t = THEMES[theme]
  const src = getUrl(scene.item.sourceIndex)
  const caption = scene.item.caption ?? getCaption(scene.item.sourceIndex)

  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-5% 0px' })

  // Parallax: image moves at 60% speed of section scroll
  const { scrollXProgress } = useScroll({ container: undefined, target: sectionRef, axis: 'x' })
  const parallaxX = useTransform(scrollXProgress, [0, 1], ['-6%', '6%'])

  const isPortrait = scene.item.orientation === 'portrait'
  const aspectRatio = isPortrait ? '3/4' : '16/9'

  const imgContent = src ? (
    <img
      src={src}
      alt={caption ?? ''}
      className="w-full h-full object-cover block"
      style={{ filter: t.imgFilter }}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div className="w-full h-full bg-stone-200" style={{ aspectRatio }} />
  )

  const kb = kenBurns()

  const maxW = isPortrait
    ? 'min(60vw, 360px)'
    : 'min(85vw, 700px)'

  if (scene.animVariant === 'parallax') {
    return (
      <section
        ref={sectionRef}
        className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
      >
        <div className="relative overflow-hidden rounded-sm" style={{ width: maxW, aspectRatio }}>
          <motion.div
            className="absolute inset-0"
            style={{ x: parallaxX }}
          >
            {imgContent}
          </motion.div>
        </div>
        {caption && (
          <p
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ fontFamily: t.captionFont, color: t.captionColor }}
          >
            {caption}
          </p>
        )}
      </section>
    )
  }

  if (scene.animVariant === 'tilt3d') {
    return (
      <section
        ref={sectionRef}
        className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
      >
        <motion.div
          className="relative overflow-hidden rounded-sm"
          style={{ width: maxW, aspectRatio, perspective: 800 }}
          initial={{ opacity: 0, rotateY: -12 }}
          animate={inView ? { opacity: 1, rotateY: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {imgContent}
        </motion.div>
        {caption && (
          <p
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ fontFamily: t.captionFont, color: t.captionColor }}
          >
            {caption}
          </p>
        )}
      </section>
    )
  }

  if (scene.animVariant === 'mask') {
    return (
      <section
        ref={sectionRef}
        className="relative flex-shrink-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
        style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
      >
        <ClassicMountWrapper caption={undefined} theme={theme}>
          <PolaroidWrapper caption={undefined} theme={theme}>
            <motion.div
              ref={imageRef}
              className="overflow-hidden rounded-sm"
              style={{ width: maxW, aspectRatio }}
              variants={maskCircleVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <motion.div className="w-full h-full" initial={kb.initial} animate={kb.animate} transition={kb.transition}>
                {imgContent}
              </motion.div>
            </motion.div>
          </PolaroidWrapper>
        </ClassicMountWrapper>
        {caption && (
          <p
            className="mt-5 text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: t.captionFont, color: t.captionColor }}
          >
            {caption}
          </p>
        )}
      </section>
    )
  }

  // Default: clip-reveal
  return (
    <section
      ref={sectionRef}
      className="relative flex-shrink-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
    >
      <ClassicMountWrapper caption={undefined} theme={theme}>
        <PolaroidWrapper caption={undefined} theme={theme}>
          <motion.div
            ref={imageRef}
            className="overflow-hidden rounded-sm"
            style={{ width: maxW, aspectRatio }}
            variants={clipRevealVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div className="w-full h-full" initial={kb.initial} animate={kb.animate} transition={kb.transition}>
              {imgContent}
            </motion.div>
          </motion.div>
        </PolaroidWrapper>
      </ClassicMountWrapper>
      {caption && (
        <p
          className="mt-5 text-[11px] tracking-[0.2em] uppercase"
          style={{ fontFamily: t.captionFont, color: t.captionColor }}
        >
          {caption}
        </p>
      )}
    </section>
  )
}
