import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { Pencil } from 'lucide-react'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'
import type { AlbumMode } from '@/lib/album-engine/types'
import { AlbumEngineView } from '@/components/album-v2/AlbumEngineView'
import { catalogForMode } from '@/lib/album-engine/catalog'
import { orientationFromDimensions } from '@/lib/album-engine/media'
import type { EngineAlbumBlock, EngineMediaItem } from '@/lib/album-engine/types'
import { MediaSwapPopover } from './MediaSwapPopover'
import { ParticleBurst } from './ParticleBurst'
import { ImageLightbox } from './ImageLightbox'

function buildBlock(page: EditorPage, media: EditorMediaItem[], mode: AlbumMode): EngineAlbumBlock | null {
  const catalog = catalogForMode(mode)
  const spec = catalog.find((s) => s.id === page.layoutId)
  if (!spec) return null
  const items: EngineMediaItem[] = page.mediaIds
    .map((id, idx) => {
      const m = media.find((x) => x.id === id)
      if (!m) return null
      return {
        id: m.id,
        sourceIndex: idx,
        type: m.kind === 'video' ? ('video' as const) : ('image' as const),
        url: m.previewUrl,
        width: m.width,
        height: m.height,
        aspectRatio: m.width / Math.max(m.height, 1),
        orientation: orientationFromDimensions(m.width, m.height),
        caption: m.caption || undefined,
      }
    })
    .filter(Boolean) as EngineMediaItem[]
  if (items.length === 0) return null
  return { layoutId: spec.id, mode, family: spec.family, items, variant: 0 }
}

function getSlotCount(page: EditorPage, mode: AlbumMode): number {
  const catalog = catalogForMode(mode)
  const spec = catalog.find((s) => s.id === page.layoutId)
  return spec?.consume ?? 1
}

const GRAIN_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E`

interface SlotOverlayProps {
  pageId: string
  slotIndex: number
  cols: number
  rows: number
  activeDragExists: boolean
  onClickSlot: (i: number, e: React.MouseEvent) => void
  onLightboxSlot: (i: number) => void
}

function SlotOverlay({ pageId, slotIndex, cols, rows, activeDragExists, onClickSlot, onLightboxSlot }: SlotOverlayProps) {
  const col = (slotIndex % cols) + 1
  const row = Math.floor(slotIndex / cols) + 1

  const { setNodeRef, isOver } = useDroppable({
    id: `slot:${pageId}:${slotIndex}`,
    data: { type: 'canvas-slot', pageId, slotIndex },
  })

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)

  const handlePointerDown = () => {
    didLongPress.current = false
    pressTimer.current = setTimeout(() => {
      didLongPress.current = true
    }, 400)
  }

  const handlePointerUp = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (didLongPress.current) {
      onClickSlot(slotIndex, e)
    } else {
      onLightboxSlot(slotIndex)
    }
  }

  return (
    <button
      ref={setNodeRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      aria-label="Bild ansehen"
      className="absolute group/slot cursor-pointer"
      style={{
        left: `${((col - 1) / cols) * 100}%`,
        top: `${((row - 1) / rows) * 100}%`,
        width: `${(1 / cols) * 100}%`,
        height: `${(1 / rows) * 100}%`,
        minWidth: 44,
        minHeight: 44,
      }}
    >
      {/* Drop-hint when dragging */}
      {activeDragExists && !isOver && (
        <div className="absolute inset-1 rounded-md border-2 border-dashed border-memorial-bronze/40 pointer-events-none transition-opacity animate-pulse" />
      )}

      {/* isOver — magnetic pull highlight */}
      {isOver && (
        <motion.div
          className="absolute inset-0 rounded-md bg-memorial-bronze/15 ring-2 ring-memorial-bronze ring-inset pointer-events-none"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}

      {/* Hover ring */}
      <div className={cn(
        'absolute inset-0 rounded-md transition-all duration-150',
        !isOver && 'group-hover/slot:ring-2 group-hover/slot:ring-memorial-bronze group-hover/slot:ring-inset'
      )} />

      {/* Pen icon — swap action */}
      <div
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity shadow z-10"
        onClick={(e) => {
          e.stopPropagation()
          onClickSlot(slotIndex, e)
        }}
        title="Bild tauschen"
      >
        <Pencil className="w-3.5 h-3.5 text-memorial-ink" />
      </div>
    </button>
  )
}

interface Props {
  page: EditorPage | null
  pageIndex: number
  media: EditorMediaItem[]
  mode: AlbumMode
  onSwapMedia: (pageId: string, slotIndex: number, newMediaId: string) => void
  direction?: 'left' | 'right'
  activeDragExists?: boolean
  lastDropPosition?: { x: number; y: number } | null
  onDropHandled?: () => void
}

export function PageCanvas({
  page,
  pageIndex,
  media,
  mode,
  onSwapMedia,
  direction = 'right',
  activeDragExists = false,
  lastDropPosition = null,
  onDropHandled,
}: Props) {
  const [swapSlot, setSwapSlot] = useState<number | null>(null)
  const [lightboxSlot, setLightboxSlot] = useState<number | null>(null)
  const [particleActive, setParticleActive] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // 3D tilt — desktop only via media query
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 180, damping: 24 })
  const springY = useSpring(rotateY, { stiffness: 180, damping: 24 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    // Only on desktop — window.innerWidth check at runtime
    if (window.innerWidth < 1024) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateX.set(-dy * 6)
    rotateY.set(dx * 8)
  }, [shouldReduceMotion, rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  const isVintage = mode === 'vintage'
  const isClassic = mode === 'classic'

  const canvasBg = isVintage
    ? 'bg-gradient-to-br from-[hsl(34,40%,90%)] to-[hsl(29,33%,82%)]'
    : isClassic
    ? 'bg-[hsl(36,30%,95%)]'
    : 'bg-[hsl(36,40%,97%)]'

  const borderStyle = isClassic ? '1px solid hsla(30, 40%, 40%, 0.18)' : undefined

  if (!page) {
    return (
      <div className="flex items-center justify-center text-memorial-ink-soft/40 text-sm">
        Seite auswählen
      </div>
    )
  }

  const block = buildBlock(page, media, mode)
  const slotCount = getSlotCount(page, mode)
  const pageMedia = page.mediaIds.map((id) => media.find((m) => m.id === id)).filter(Boolean) as EditorMediaItem[]

  const currentSlotMedia = swapSlot !== null ? pageMedia[swapSlot] : undefined
  const lightboxMedia = lightboxSlot !== null ? pageMedia[lightboxSlot] : undefined

  const cols = slotCount <= 1 ? 1 : 2
  const rows = slotCount <= 2 ? 1 : 2

  // Particle burst on drop
  const handleDropHandled = useCallback(() => {
    if (lastDropPosition) {
      setParticleActive(true)
      setTimeout(() => setParticleActive(false), 800)
      onDropHandled?.()
    }
  }, [lastDropPosition, onDropHandled])

  // Trigger particle when drop position arrives
  if (lastDropPosition && !particleActive) {
    // Will trigger on next render via effect — handled by parent passing down
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={page.id}
          ref={canvasRef}
          initial={{ opacity: 0, x: direction === 'right' ? 40 : -40, rotateY: direction === 'right' ? 15 : -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0, filter: activeDragExists ? 'brightness(0.97)' : 'none' }}
          exit={{ opacity: 0, x: direction === 'right' ? -40 : 40, rotateY: direction === 'right' ? -15 : 15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            maxWidth: '560px',
            aspectRatio: '3/4',
            border: borderStyle,
            filter: isVintage ? 'sepia(0.12) contrast(1.02)' : undefined,
            rotateX: shouldReduceMotion ? 0 : springX,
            rotateY: shouldReduceMotion ? undefined : springY,
            transformStyle: 'preserve-3d',
            perspective: 1200,
          }}
          className={cn(
            'relative w-full rounded-[12px] overflow-hidden shadow-[0_8px_40px_hsl(var(--memorial-ink)/0.18),inset_8px_0_16px_-8px_hsl(var(--memorial-ink)/0.1)]',
            canvasBg
          )}
        >
          {/* Paper grain */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.04] mix-blend-multiply rounded-[12px]"
            style={{ backgroundImage: `url("${GRAIN_SVG}")`, backgroundSize: '200px 200px' }}
          />

          {isClassic && (
            <div className="absolute inset-[6px] pointer-events-none z-10 rounded-[8px] border border-[hsla(30,40%,40%,0.15)]" />
          )}

          {block ? (
            <>
              <div className="absolute inset-0 pointer-events-none">
                <AlbumEngineView
                  block={block}
                  getUrl={(i) => pageMedia[i]?.previewUrl ?? null}
                  getCaption={(i) => pageMedia[i]?.caption ?? ''}
                  getPath={(i) => {
                    const m = pageMedia[i]
                    return m ? `preview:${m.id}.${m.kind === 'video' ? 'mp4' : 'jpg'}` : ''
                  }}
                  className="w-full h-full"
                />
              </div>

              <div className="absolute inset-0 z-20">
                {Array.from({ length: slotCount }).map((_, i) => (
                  <SlotOverlay
                    key={i}
                    pageId={page.id}
                    slotIndex={i}
                    cols={cols}
                    rows={rows}
                    activeDragExists={activeDragExists}
                    onClickSlot={(idx, _e) => setSwapSlot(idx)}
                    onLightboxSlot={(idx) => setLightboxSlot(idx)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-memorial-ink-soft/30 text-sm">
              Kein Bild
            </div>
          )}

          <div className="absolute bottom-2 right-3 z-30 pointer-events-none">
            <span className="font-display-italic text-[11px] text-memorial-ink/30">
              — {pageIndex + 1} —
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Particle burst on drop */}
      {lastDropPosition && (
        <ParticleBurst
          active={particleActive}
          x={lastDropPosition.x}
          y={lastDropPosition.y}
        />
      )}

      <MediaSwapPopover
        open={swapSlot !== null}
        currentMediaId={currentSlotMedia?.id}
        allMedia={media}
        onSelect={(mediaId) => {
          if (swapSlot !== null) {
            onSwapMedia(page.id, swapSlot, mediaId)
          }
          setSwapSlot(null)
        }}
        onClose={() => setSwapSlot(null)}
      />

      <ImageLightbox
        open={lightboxSlot !== null}
        src={lightboxMedia?.previewUrl ?? null}
        alt={lightboxMedia?.caption ?? undefined}
        layoutId={lightboxMedia ? `media-lb-${lightboxMedia.id}` : undefined}
        onClose={() => setLightboxSlot(null)}
      />
    </>
  )
}
