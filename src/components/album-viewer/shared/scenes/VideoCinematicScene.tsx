import { useRef, useEffect } from 'react'
import { motion, useInView } from 'motion/react'
import type { VideoCinematicScene as VideoCinematicSceneType } from '../buildScenes'

interface Props {
  scene: VideoCinematicSceneType
  getUrl: (i: number) => string | null
  theme: 'modern' | 'classic' | 'vintage'
}

const THEMES = {
  modern: { bg: 'hsl(20 10% 6%)', overlay: 'rgba(0,0,0,0.3)' },
  classic: { bg: '#1C0F06', overlay: 'rgba(0,0,0,0.35)' },
  vintage: { bg: '#1A100A', overlay: 'rgba(30,16,4,0.4)' },
}

export function VideoCinematicScene({ scene, getUrl, theme }: Props) {
  const t = THEMES[theme]
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })

  const src = getUrl(scene.item.sourceIndex)

  // Auto-play when in view, pause when out
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (inView) {
      vid.play().catch(() => {})
    } else {
      vid.pause()
    }
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative flex-shrink-0 h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ minWidth: '100vw', scrollSnapAlign: 'center', background: t.bg }}
    >
      {src && (
        <motion.video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      )}
      <div className="absolute inset-0" style={{ background: t.overlay }} />

      {/* Video play indicator */}
      <motion.div
        className="relative z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.25)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l10 6-10 6V4z" fill="rgba(255,255,255,0.9)" />
          </svg>
        </div>
      </motion.div>

      {scene.item.caption && (
        <p
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-[11px] tracking-[0.25em] uppercase"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {scene.item.caption}
        </p>
      )}
    </section>
  )
}
