import { useRef, useEffect, useState, useCallback } from 'react'
import { ScrollProgressBar } from './shared/ScrollProgressBar'
import type { Scene } from './shared/buildScenes'
import { HeroScene } from './shared/scenes/HeroScene'
import { PhotoSoloScene } from './shared/scenes/PhotoSoloScene'
import { PhotoPairScene } from './shared/scenes/PhotoPairScene'
import { PhotoGridScene } from './shared/scenes/PhotoGridScene'
import { VideoCinematicScene } from './shared/scenes/VideoCinematicScene'
import { QuoteScene } from './shared/scenes/QuoteScene'
import { DateMarkerScene } from './shared/scenes/DateMarkerScene'
import { EndScene } from './shared/scenes/EndScene'

interface HorizontalStoryViewerProps {
  scenes: Scene[]
  theme: 'modern' | 'classic' | 'vintage'
  getUrl: (i: number) => string | null
  getCaption: (i: number) => string
  progressBarClassName: string
  bgColor: string
}

function SceneRenderer({
  scene,
  theme,
  getUrl,
  getCaption,
}: {
  scene: Scene
  theme: HorizontalStoryViewerProps['theme']
  getUrl: (i: number) => string | null
  getCaption: (i: number) => string
}) {
  switch (scene.type) {
    case 'hero':
      return <HeroScene scene={scene} theme={theme} />
    case 'photo-solo':
      return <PhotoSoloScene scene={scene} getUrl={getUrl} getCaption={getCaption} theme={theme} />
    case 'photo-pair':
      return <PhotoPairScene scene={scene} getUrl={getUrl} getCaption={getCaption} theme={theme} />
    case 'photo-grid':
      return <PhotoGridScene scene={scene} getUrl={getUrl} getCaption={getCaption} theme={theme} />
    case 'video-cinematic':
      return <VideoCinematicScene scene={scene} getUrl={getUrl} theme={theme} />
    case 'quote':
      return <QuoteScene scene={scene} theme={theme} />
    case 'date-marker':
      return <DateMarkerScene scene={scene} theme={theme} />
    case 'end':
      return <EndScene scene={scene} theme={theme} />
    default:
      return null
  }
}

export function HorizontalStoryViewer({
  scenes,
  theme,
  getUrl,
  getCaption,
  progressBarClassName,
  bgColor,
}: HorizontalStoryViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [hintVisible, setHintVisible] = useState(true)
  const total = scenes.length

  // Mouse-wheel → horizontal scroll
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // already horizontal
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Keyboard arrows
  const scrollTo = useCallback((dir: 1 | -1) => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') scrollTo(1)
      if (e.key === 'ArrowLeft') scrollTo(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scrollTo])

  // Track current section for nav counter
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      setHintVisible(false)
      const max = el.scrollWidth - el.clientWidth
      if (max > 0) setCurrent(Math.round((el.scrollLeft / max) * (total - 1)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [total])

  const HINT_COLORS: Record<HorizontalStoryViewerProps['theme'], string> = {
    modern: 'hsl(27 34% 54%)',
    classic: '#C9A84C',
    vintage: '#8B6B47',
  }
  const NAV_FONTS: Record<HorizontalStoryViewerProps['theme'], string> = {
    modern: 'Inter, sans-serif',
    classic: 'Cormorant Garamond, serif',
    vintage: 'Dancing Script, cursive',
  }

  const hintColor = HINT_COLORS[theme]
  const navFont = NAV_FONTS[theme]

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: bgColor }}>
      {/* Progress bar */}
      <ScrollProgressBar
        containerRef={containerRef as React.RefObject<HTMLElement>}
        className="z-30"
        barClassName={progressBarClassName}
        position="top"
      />

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="hsv-scroll flex h-full overflow-x-auto overflow-y-hidden"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          // Hide scrollbar cross-browser
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {scenes.map((scene) => (
          <SceneRenderer
            key={scene.id}
            scene={scene}
            theme={theme}
            getUrl={getUrl}
            getCaption={getCaption}
          />
        ))}
      </div>

      {/* Scroll hint — fades after first scroll */}
      {hintVisible && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: hintVisible ? 1 : 0, transition: 'opacity 0.4s' }}
        >
          <svg
            width="32"
            height="14"
            viewBox="0 0 32 14"
            fill="none"
            style={{
              animation: 'hsvArrowBounce 1.6s ease-in-out infinite',
            }}
          >
            <path d="M0 7h28M22 1.5l7 5.5-7 5.5" stroke={hintColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: hintColor, fontFamily: navFont }}>
            scrollen
          </span>
        </div>
      )}

      {/* Nav counter + buttons */}
      <div className="absolute bottom-5 right-6 flex items-center gap-2 z-20">
        <button
          onClick={() => scrollTo(-1)}
          className="w-8 h-8 flex items-center justify-center opacity-40 hover:opacity-90 transition-opacity"
          aria-label="Vorherige"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-[10px] tabular-nums" style={{ fontFamily: navFont, color: hintColor }}>
          {current + 1} / {total}
        </span>
        <button
          onClick={() => scrollTo(1)}
          className="w-8 h-8 flex items-center justify-center opacity-40 hover:opacity-90 transition-opacity"
          aria-label="Nächste"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <style>{`
        .hsv-scroll::-webkit-scrollbar { display: none; }
        @keyframes hsvArrowBounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(10px)} }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  )
}
