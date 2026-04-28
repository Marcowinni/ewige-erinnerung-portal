import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Crosshair, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isVideoUrl } from '@/lib/mediaType'

interface Props {
  open: boolean
  src: string | null
  kind?: 'image' | 'video'
  // Crop preview aspect ratio (matches the slot in the album)
  previewAspect?: string
  initialFocalX?: number
  initialFocalY?: number
  onClose: () => void
  onSave: (focalX: number, focalY: number) => void
}

export function FocalPicker({
  open,
  src,
  kind,
  previewAspect = '9 / 16',
  initialFocalX,
  initialFocalY,
  onClose,
  onSave,
}: Props) {
  const [x, setX] = useState(initialFocalX ?? 50)
  const [y, setY] = useState(initialFocalY ?? 50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  useEffect(() => {
    if (open) {
      setX(initialFocalX ?? 50)
      setY(initialFocalY ?? 50)
    }
  }, [open, initialFocalX, initialFocalY])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const updateFromPointer = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = ((clientX - rect.left) / rect.width) * 100
    const py = ((clientY - rect.top) / rect.height) * 100
    setX(Math.max(0, Math.min(100, px)))
    setY(Math.max(0, Math.min(100, py)))
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    updateFromPointer(e.clientX, e.clientY)
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    updateFromPointer(e.clientX, e.clientY)
  }
  const handlePointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  const isVideo = kind === 'video' || (src ? isVideoUrl(src) : false)
  const objectPosition = `${x}% ${y}%`

  return (
    <AnimatePresence>
      {open && src && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-memorial-ink/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] z-[410] mx-auto max-w-3xl memorial-card rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-memorial-line shrink-0">
              <div>
                <h3 className="font-display text-lg text-memorial-ink">Bildausschnitt anpassen</h3>
                <p className="text-[11px] text-memorial-ink-soft">Tippe oder ziehe — wähle den wichtigen Punkt im Bild.</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Schliessen"
                className="w-9 h-9 rounded-full flex items-center justify-center text-memorial-ink-soft hover:text-memorial-ink hover:bg-memorial-line/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 grid gap-5 sm:grid-cols-[1.4fr_1fr] items-start">
              {/* Full image with focal handle */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.25em] text-memorial-ink-soft">Vollbild — Punkt setzen</p>
                <div
                  ref={containerRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="relative w-full rounded-2xl overflow-hidden bg-memorial-ink/5 ring-1 ring-memorial-line cursor-crosshair touch-none select-none"
                  style={{ aspectRatio: '4 / 3' }}
                >
                  {isVideo ? (
                    <video
                      src={src}
                      className="w-full h-full object-contain"
                      preload="metadata"
                      muted
                      playsInline
                      onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }}
                    />
                  ) : (
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  )}
                  {/* Focal handle */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-9 h-9 rounded-full ring-[3px] ring-memorial-bronze-deep ring-offset-2 ring-offset-white/40 bg-memorial-bronze-deep/15 flex items-center justify-center shadow-[0_0_0_8px_rgba(0,0,0,0.18)]">
                      <Crosshair className="w-4 h-4 text-memorial-bronze-deep" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-memorial-ink-soft">
                  Position: <span className="font-mono">{Math.round(x)}% / {Math.round(y)}%</span>
                </p>
              </div>

              {/* Live crop preview matching slot aspect */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.25em] text-memorial-ink-soft">Vorschau im Album</p>
                <div
                  className="relative w-full max-w-[260px] mx-auto rounded-xl overflow-hidden ring-1 ring-memorial-line bg-memorial-canvas"
                  style={{ aspectRatio: previewAspect }}
                >
                  {isVideo ? (
                    <video
                      src={src}
                      className="w-full h-full object-cover"
                      style={{ objectPosition }}
                      preload="metadata"
                      muted
                      playsInline
                      onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }}
                    />
                  ) : (
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ objectPosition }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-memorial-line shrink-0">
              <button
                onClick={() => { setX(50); setY(50) }}
                className={cn(
                  'inline-flex items-center gap-1.5 text-[12px] uppercase tracking-widest text-memorial-ink-soft hover:text-memorial-ink',
                  'px-3 py-1.5 rounded-full border border-memorial-line hover:border-memorial-bronze/50 transition-colors'
                )}
              >
                <RotateCcw className="w-3 h-3" />
                Zentriert
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="memorial-cta memorial-cta-ghost rounded-full px-4 py-2 text-[12px] font-medium"
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => { onSave(Math.round(x), Math.round(y)); onClose() }}
                  className="memorial-cta memorial-cta-primary rounded-full px-5 py-2 text-[12px] font-medium"
                >
                  Übernehmen
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
