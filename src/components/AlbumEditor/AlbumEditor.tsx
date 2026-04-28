import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion, useMotionTemplate, MotionValue } from 'motion/react'
import { ChevronLeft, ChevronRight, Dice5 } from 'lucide-react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
import type { AlbumMode } from '@/lib/album-engine/types'
import type { EditorMediaItem, AlbumPagesState } from '@/hooks/useAlbumPages'
import { EditorToolbar } from './EditorToolbar'
import { PageCanvas } from './PageCanvas'
import { MediaGallery } from './MediaGallery'

interface Props {
  media: EditorMediaItem[]
  mode: AlbumMode
  value: AlbumPagesState
  onPreview: () => void
  onBack: () => void
  regenerate: (media: EditorMediaItem[], mode: AlbumMode) => void
  swapMediaAt: (pageId: string, slotIndex: number, newMediaId: string) => void
  changePageLayout?: (pageId: string, layoutId: string) => void
}

export function AlbumEditor({ media, mode, value, onPreview, onBack, regenerate, swapMediaAt, changePageLayout }: Props) {
  const [pageIndex, setPageIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [diceSpinning, setDiceSpinning] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [activeDragMediaId, setActiveDragMediaId] = useState<string | null>(null)
  const [lastDropPosition, setLastDropPosition] = useState<{ x: number; y: number } | null>(null)
  // Whether we're mid-flip (for 3D page-turn animation)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right')
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Cursor-following bronze glow — desktop only
  const glowX = useMotionValue(-999)
  const glowY = useMotionValue(-999)
  const springGlowX = useSpring(glowX, { stiffness: 120, damping: 20 })
  const springGlowY = useSpring(glowY, { stiffness: 120, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }, [glowX, glowY])

  const handleMouseLeave = useCallback(() => {
    glowX.set(-999)
    glowY.set(-999)
  }, [glowX, glowY])

  const pages = value.pages
  const totalPages = pages.length
  const activePage = pages[pageIndex] ?? pages[0] ?? null

  const activeDragItem = activeDragMediaId
    ? media.find((m) => m.id === activeDragMediaId) ?? null
    : null

  useEffect(() => {
    setPageIndex((i) => Math.min(i, Math.max(0, pages.length - 1)))
  }, [pages.length])

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= pages.length) return
    const dir = idx > pageIndex ? 'right' : 'left'
    setFlipDirection(dir)
    setDirection(dir)

    if (!shouldReduceMotion) {
      setIsFlipping(true)
      setTimeout(() => {
        setPageIndex(idx)
        setIsFlipping(false)
      }, 275)
    } else {
      setPageIndex(idx)
    }
  }, [pageIndex, pages.length, shouldReduceMotion])

  const handlePrev = useCallback(() => goTo(pageIndex - 1), [goTo, pageIndex])
  const handleNext = useCallback(() => goTo(pageIndex + 1), [goTo, pageIndex])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handlePrev, handleNext])

  // Touch swipe on canvas
  const touchStart = useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0]?.clientX ?? null
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current
    if (Math.abs(delta) > 40) {
      if (delta < 0) handleNext(); else handlePrev()
    }
    touchStart.current = null
  }

  const handleRegenerate = useCallback(() => {
    if (diceSpinning) return
    setDiceSpinning(true)
    setRegenerating(true)
    setTimeout(() => {
      regenerate(media, mode)
      setPageIndex(0)
      setRegenerating(false)
      setDiceSpinning(false)
    }, 600)
  }, [diceSpinning, media, mode, regenerate])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current
    if (data?.type === 'media') {
      setActiveDragMediaId(data.mediaId as string)
    }
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveDragMediaId(null)
    const { active, over } = event

    if (over) {
      const overData = over.data.current
      const activeData = active.data.current

      if (overData?.type === 'canvas-slot' && activeData?.type === 'media') {
        // Capture drop position for particle burst
        const dropPoint = event.activatorEvent instanceof PointerEvent
          ? { x: event.activatorEvent.clientX, y: event.activatorEvent.clientY }
          : null

        // Use final pointer position from delta if available
        const finalX = (event.delta?.x ?? 0) + (dropPoint?.x ?? window.innerWidth / 2)
        const finalY = (event.delta?.y ?? 0) + (dropPoint?.y ?? window.innerHeight / 2)
        setLastDropPosition({ x: finalX, y: finalY })
        setTimeout(() => setLastDropPosition(null), 900)

        swapMediaAt(
          overData.pageId as string,
          overData.slotIndex as number,
          activeData.mediaId as string
        )
      }
    }
  }, [swapMediaAt])

  // 3D flip animation variants
  const flipOut = {
    right: { rotateY: -90, transformOrigin: 'left center', opacity: 0 },
    left: { rotateY: 90, transformOrigin: 'right center', opacity: 0 },
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={containerRef}
        className="flex flex-col min-h-[calc(100dvh-80px)] relative"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--memorial-canvas)) 0%, hsl(36,30%,93%) 100%)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor-following bronze glow — desktop only, pointer-events-none */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden" aria-hidden>
          <GlowLayer x={springGlowX} y={springGlowY} />
        </div>

        <EditorToolbar
          currentPage={(activePage ? pages.indexOf(activePage) : 0) + 1}
          totalPages={totalPages}
          onBack={onBack}
          onPreview={onPreview}
          currentLayoutId={activePage?.layoutId}
          mode={mode}
          mediaCount={activePage?.mediaIds.length ?? 0}
          onLayoutChange={
            activePage && changePageLayout
              ? (layoutId) => changePageLayout(activePage.id, layoutId)
              : undefined
          }
        />

        {/* Canvas area */}
        <div
          className="flex-1 flex flex-col items-center justify-center py-6 px-4 gap-5 relative z-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-center w-full gap-3 max-w-2xl">
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              disabled={pageIndex === 0}
              aria-label="Vorherige Seite"
              className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-memorial-ink-soft hover:text-memorial-ink hover:bg-memorial-line/60 disabled:opacity-25 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Canvas with 3D page-flip transition */}
            <div
              className="flex-1 min-w-0"
              style={{
                maxWidth: '480px',
                perspective: '1200px',
              }}
            >
              <AnimatePresence mode="wait">
                {regenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="aspect-[3/4] rounded-[12px] memorial-card flex items-center justify-center"
                  >
                    <span className="text-memorial-ink-soft text-sm">Wird neu erstellt…</span>
                  </motion.div>
                ) : isFlipping ? (
                  // Ghost page that flips out during transition
                  <motion.div
                    key="flip-out"
                    initial={{ rotateY: 0, opacity: 1 }}
                    animate={shouldReduceMotion ? { opacity: 0 } : flipOut[flipDirection]}
                    transition={{ duration: 0.27, ease: 'easeIn' }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="aspect-[3/4] rounded-[12px] memorial-card bg-memorial-canvas"
                  />
                ) : (
                  <PageCanvas
                    key={activePage?.id ?? 'empty'}
                    page={activePage}
                    pageIndex={pageIndex}
                    media={media}
                    mode={mode}
                    direction={direction}
                    onSwapMedia={swapMediaAt}
                    activeDragExists={activeDragMediaId !== null}
                    lastDropPosition={lastDropPosition}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              disabled={pageIndex >= totalPages - 1}
              aria-label="Nächste Seite"
              className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-memorial-ink-soft hover:text-memorial-ink hover:bg-memorial-line/60 disabled:opacity-25 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Page dots */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-xs">
              {pages.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  aria-label={`Seite ${i + 1}`}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === pageIndex
                      ? 'w-4 h-2 bg-memorial-bronze-deep'
                      : 'w-2 h-2 bg-memorial-ink-soft/30 hover:bg-memorial-ink-soft/60'
                  )}
                />
              ))}
            </div>
          )}

          {/* Regenerate CTA */}
          <div className="flex flex-col items-center gap-2">
            <motion.button
              onClick={handleRegenerate}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={diceSpinning}
              className="memorial-cta memorial-cta-primary flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-medium shadow-md disabled:opacity-70"
            >
              <motion.span
                animate={diceSpinning ? { rotate: 720 } : { rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex"
              >
                <Dice5 className="w-5 h-5" />
              </motion.span>
              Album neu würfeln
            </motion.button>

            <p className="text-[11px] text-memorial-ink-soft/60 text-center">
              Tipp: Ziehe ein Bild in einen Slot oder klicke zum Ansehen
            </p>
          </div>
        </div>

        {/* Media gallery strip — sticky bottom */}
        <MediaGallery media={media} pages={pages} />
      </div>

      {/* DragOverlay — ghost chip with spring physics + rotation */}
      <DragOverlay
        dropAnimation={{
          duration: 280,
          easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {activeDragItem && (
          <motion.div
            initial={{ scale: 0.9, rotate: 0, opacity: 0.8 }}
            animate={{ scale: 1.1, rotate: 2, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="w-[100px] h-[100px] rounded-xl overflow-hidden ring-2 ring-memorial-bronze shadow-[0_8px_32px_hsl(var(--memorial-ink)/0.35),0_0_0_4px_hsl(var(--memorial-bronze)/0.3)] cursor-grabbing"
          >
            {activeDragItem.kind === 'image' ? (
              <img src={activeDragItem.previewUrl} alt="" className="w-full h-full object-cover" draggable={false} />
            ) : (
              <video src={activeDragItem.previewUrl} className="w-full h-full object-cover" preload="metadata" muted playsInline onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }} />
            )}
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

// Separate component so glow re-renders on spring value change without re-rendering whole editor
function GlowLayer({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const bg = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, hsla(27,34%,54%,0.18) 0%, transparent 240px)`
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: bg,
        mixBlendMode: 'screen',
      }}
    />
  )
}
