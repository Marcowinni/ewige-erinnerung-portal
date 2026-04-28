import { useDraggable } from '@dnd-kit/core'
import { Play, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'

interface Props {
  item: EditorMediaItem
  pages: EditorPage[]
  floatIndex?: number
}

export function MediaChip({ item, pages, floatIndex = 0 }: Props) {
  const usedOnPage = pages.find((p) => p.mediaIds.includes(item.id))
  const pageIndex = usedOnPage ? pages.indexOf(usedOnPage) + 1 : null

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `chip:${item.id}`,
    data: { type: 'media', mediaId: item.id },
  })

  const floatDelay = `${(floatIndex % 5) * 200}ms`

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      title={usedOnPage ? `Auf Seite ${pageIndex}` : undefined}
      style={!usedOnPage && !isDragging ? { animationDelay: floatDelay } : undefined}
      className={cn(
        'relative flex-shrink-0 w-[100px] h-[100px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none',
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
        isDragging ? 'opacity-40 scale-95' : 'opacity-100',
        usedOnPage && !isDragging && 'brightness-90 saturate-75',
        // Subtle float animation only for unused, non-dragging chips
        !usedOnPage && !isDragging && 'animate-float'
      )}
    >
      {item.kind === 'image' ? (
        <img src={item.previewUrl} alt="" className="w-full h-full object-cover" draggable={false} />
      ) : (
        <>
          <video
            src={item.previewUrl}
            className="w-full h-full object-cover opacity-80"
            preload="metadata"
            muted
            playsInline
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-4 h-4 text-white drop-shadow" />
          </div>
        </>
      )}

      {usedOnPage && (
        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-memorial-bronze-deep flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-white" />
        </div>
      )}
    </div>
  )
}
