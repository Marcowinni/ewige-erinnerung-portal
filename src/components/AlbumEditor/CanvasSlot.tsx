import { useDroppable } from '@dnd-kit/core'
import { RotateCw, X, ImagePlus } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem } from '@/hooks/useAlbumPages'

interface Props {
  pageId: string
  slotIndex: number
  mediaItem: EditorMediaItem | undefined
  onRemove?: () => void
  justDropped?: boolean
}

export function CanvasSlot({ pageId, slotIndex, mediaItem, onRemove, justDropped }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${pageId}-${slotIndex}`,
    data: { type: 'canvas-slot', pageId, slotIndex },
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative h-full w-full rounded-md overflow-hidden group/slot transition-all duration-200',
        isOver && 'ring-2 ring-memorial-bronze ring-offset-1 scale-[0.98]',
        justDropped && 'drop-glow'
      )}
    >
      {mediaItem ? (
        <>
          <motion.div
            initial={justDropped ? { scale: 0.95, opacity: 0.7 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-full h-full"
          >
            {mediaItem.kind === 'image' ? (
              <img
                src={mediaItem.previewUrl}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <video
                src={mediaItem.previewUrl}
                className="w-full h-full object-cover"
                preload="metadata"
                muted
                playsInline
                onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }}
              />
            )}
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover/slot:opacity-100 transition-opacity bg-memorial-ink/30">
            {onRemove && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemove() }}
                className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors shadow"
                aria-label="Bild entfernen"
              >
                <X className="w-3.5 h-3.5 text-memorial-ink" />
              </button>
            )}
            <button
              className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-memorial-canvas transition-colors shadow"
              aria-label="Drehen (bald)"
              tabIndex={-1}
            >
              <RotateCw className="w-3.5 h-3.5 text-memorial-ink" />
            </button>
          </div>
        </>
      ) : (
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-md',
            'border-2 border-dashed transition-all duration-300',
            isOver
              ? 'border-memorial-bronze bg-memorial-bronze/10 text-memorial-bronze-deep'
              : 'border-memorial-bronze/30 text-memorial-ink-soft/40 slot-pulse'
          )}
        >
          {isOver ? (
            <span className="text-[10px] font-medium">Hier ablegen</span>
          ) : (
            <>
              <ImagePlus className="w-5 h-5" />
              <span className="text-[9px] uppercase tracking-widest">+ Foto</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
