import { useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { X, GripVertical } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'
import type { AlbumMode } from '@/lib/album-engine/types'
import { AlbumEngineView } from '@/components/album-v2/AlbumEngineView'
import { catalogForMode } from '@/lib/album-engine/catalog'
import { orientationFromDimensions } from '@/lib/album-engine/media'
import type { EngineAlbumBlock, EngineMediaItem } from '@/lib/album-engine/types'

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

interface Props {
  page: EditorPage
  index: number
  media: EditorMediaItem[]
  mode: AlbumMode
  isActive: boolean
  isDraggingPage: boolean
  onClick: () => void
  onRemove: () => void
}

export function PageThumbnail({ page, index, media, mode, isActive, isDraggingPage, onClick, onRemove }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id, data: { type: 'page', pageId: page.id } })

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `thumb-drop-${page.id}`,
    data: { type: 'canvas-slot', pageId: page.id, slotIndex: 0 },
  })

  const setRef = (el: HTMLDivElement | null) => {
    setSortableRef(el)
  }

  const pageMedia = page.mediaIds.map((id) => media.find((m) => m.id === id)).filter(Boolean) as EditorMediaItem[]
  const block = buildBlock(page, media, mode)

  return (
    <motion.div
      layout
      ref={setRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('relative group/thumb flex-shrink-0 cursor-pointer select-none', isDragging && 'opacity-40')}
      onClick={onClick}
    >
      <div
        ref={setDropRef}
        className={cn(
          'relative rounded-lg overflow-hidden border-2 transition-all duration-200',
          'w-[100px]',
          isActive
            ? 'border-memorial-bronze shadow-[0_2px_12px_hsl(var(--memorial-bronze)/0.35)] scale-[1.04]'
            : 'border-memorial-line/60 hover:border-memorial-bronze/40',
          isOver && !isDraggingPage && 'border-memorial-bronze bg-memorial-bronze/5'
        )}
        style={{ aspectRatio: '3/4' }}
      >
        {block ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              style={{
                width: '560px',
                height: '747px',
                transform: 'scale(0.179)',
                transformOrigin: 'top left',
              }}
            >
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
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-memorial-ink-soft/30">
            <span className="text-[9px] text-center px-1">Leer</span>
          </div>
        )}

        {isOver && !isDraggingPage && (
          <div className="absolute inset-0 bg-memorial-bronze/15 flex items-center justify-center">
            <span className="text-[8px] text-memorial-bronze-deep font-medium bg-white/80 px-1.5 py-0.5 rounded-full">
              Ablegen
            </span>
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500/80 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity"
          aria-label="Seite entfernen"
        >
          <X className="w-2.5 h-2.5 text-white" />
        </button>

        <div
          ref={containerRef}
          {...attributes}
          {...listeners}
          className="absolute top-1 left-1 w-4 h-4 rounded flex items-center justify-center text-memorial-ink-soft/40 cursor-grab active:cursor-grabbing touch-none opacity-0 group-hover/thumb:opacity-100 transition-opacity"
        >
          <GripVertical className="w-3 h-3" />
        </div>
      </div>

      <p className="text-center text-[9px] text-memorial-ink-soft/60 mt-1 font-display-italic">
        {index + 1}
      </p>
    </motion.div>
  )
}
