import { useRef, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Play, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'
import type { AlbumMode } from '@/lib/album-engine/types'
import { AlbumEngineView } from '@/components/album-v2/AlbumEngineView'
import { catalogForMode } from '@/lib/album-engine/catalog'
import { orientationFromDimensions } from '@/lib/album-engine/media'
import type { EngineAlbumBlock, EngineMediaItem } from '@/lib/album-engine/types'
import { LayoutPicker } from './LayoutPicker'

function buildPreviewBlock(page: EditorPage, media: EditorMediaItem[], mode: AlbumMode): EngineAlbumBlock | null {
  const catalog = catalogForMode(mode)
  const spec = catalog.find((s) => s.id === page.layoutId)
  if (!spec) return null

  const items: EngineMediaItem[] = page.mediaIds
    .map((id, idx) => {
      const m = media.find((x) => x.id === id)
      if (!m) return null
      const ar = m.width / Math.max(m.height, 1)
      return {
        id: m.id,
        sourceIndex: idx,
        type: m.kind === 'video' ? 'video' as const : 'image' as const,
        url: m.previewUrl,
        width: m.width,
        height: m.height,
        aspectRatio: ar,
        orientation: orientationFromDimensions(m.width, m.height),
        caption: m.caption || undefined,
      }
    })
    .filter(Boolean) as EngineMediaItem[]

  if (items.length === 0) return null

  return {
    layoutId: spec.id,
    mode,
    family: spec.family,
    items,
    variant: 0,
  }
}

function MediaThumb({
  item,
  pageId,
  onCaptionChange,
}: {
  item: EditorMediaItem
  pageId: string
  onCaptionChange: (id: string, caption: string) => void
}) {
  const [captionOpen, setCaptionOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: { type: 'media', mediaId: item.id, fromPageId: pageId },
  })

  return (
    <div className="relative flex-shrink-0 group/thumb">
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.4 : 1,
        }}
        {...attributes}
        {...listeners}
        className="w-14 h-14 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing touch-none"
        onClick={(e) => {
          e.stopPropagation()
          setCaptionOpen((v) => !v)
        }}
      >
        {item.kind === 'image' ? (
          <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="relative w-full h-full">
            <video src={item.previewUrl} className="w-full h-full object-cover opacity-80" preload="metadata" muted playsInline onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }} />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Play className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </div>

      {captionOpen && (
        <div className="absolute bottom-full mb-1 left-0 z-20 w-36 memorial-card rounded-lg p-2 shadow-lg border border-memorial-line">
          <input
            type="text"
            value={item.caption}
            onChange={(e) => onCaptionChange(item.id, e.target.value)}
            placeholder="Beschriftung…"
            className="memorial-underline-input w-full text-[11px]"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

interface Props {
  page: EditorPage
  media: EditorMediaItem[]
  mode: AlbumMode
  index: number
  isDraggingPage: boolean
  onRemove: (pageId: string) => void
  onChangeLayout: (pageId: string, layoutId: string) => void
  onCaptionChange: (mediaId: string, caption: string) => void
  onAddAfter: (afterId: string) => void
}

export function PageCard({
  page,
  media,
  mode,
  index,
  isDraggingPage,
  onRemove,
  onChangeLayout,
  onCaptionChange,
  onAddAfter,
}: Props) {
  const previewContainerRef = useRef<HTMLDivElement>(null)

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: page.id,
    data: { type: 'page', pageId: page.id },
  })

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: page.id,
    data: { type: 'page', pageId: page.id },
  })

  const setRef = (el: HTMLDivElement | null) => {
    setSortableRef(el)
    setDropRef(el)
  }

  const pageMedia = page.mediaIds
    .map((id) => media.find((m) => m.id === id))
    .filter(Boolean) as EditorMediaItem[]

  const previewBlock = buildPreviewBlock(page, media, mode)

  const catalog = catalogForMode(mode)
  const spec = catalog.find((s) => s.id === page.layoutId)
  const expectedCount = spec?.consume ?? 1
  const hasEnough = pageMedia.length >= Math.max(1, expectedCount - 1)

  return (
    <motion.div
      layout
      ref={setRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        'memorial-card rounded-2xl overflow-hidden border-2 transition-all duration-200 flex flex-col',
        isDragging ? 'opacity-50 scale-[0.97]' : 'opacity-100',
        isOver && !isDraggingPage
          ? 'border-memorial-bronze shadow-[0_0_0_3px_hsl(var(--memorial-bronze)/0.18)] drop-zone-pulse'
          : 'border-memorial-line',
        !isDragging && 'hover:-translate-y-0.5'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-memorial-line">
        <button
          {...attributes}
          {...listeners}
          className="text-memorial-ink-soft hover:text-memorial-ink cursor-grab active:cursor-grabbing touch-none p-0.5"
          aria-label="Seite verschieben"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="text-[11px] uppercase tracking-widest text-memorial-ink-soft flex-1">
          Seite {index + 1}
        </span>
        <button
          onClick={() => onRemove(page.id)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-memorial-ink-soft/50 hover:text-red-400 hover:bg-red-50 transition-colors"
          aria-label="Seite entfernen"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Preview area */}
      <div
        ref={previewContainerRef}
        className="relative flex-1 min-h-0 overflow-hidden bg-memorial-canvas"
        style={{ aspectRatio: '4/5' }}
      >
        {previewBlock ? (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transformOrigin: 'top left',
            }}
          >
            <div className="w-full h-full">
              <AlbumEngineView
                block={previewBlock}
                getUrl={(i) => pageMedia[i]?.previewUrl ?? null}
                getCaption={(i) => pageMedia[i]?.caption ?? ''}
                getPath={(i) => {
                  const m = pageMedia[i]
                  return m ? `preview:${m.id}.${m.kind === 'video' ? 'mp4' : 'jpg'}` : ''
                }}
                className="h-full w-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-memorial-ink-soft/40 text-[12px] text-center px-4">
            {pageMedia.length === 0 ? 'Medien hierher ziehen' : 'Vorschau nicht verfügbar'}
          </div>
        )}

        {/* Drop overlay hint */}
        {isOver && !isDraggingPage && (
          <div className="absolute inset-0 bg-memorial-bronze/10 flex items-center justify-center">
            <div className="bg-memorial-bronze-deep/90 text-white text-[11px] px-3 py-1.5 rounded-full">
              Hier ablegen
            </div>
          </div>
        )}

        {/* Invalid page warning */}
        {!hasEnough && pageMedia.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] px-2 py-1 rounded-lg text-center">
              Layout erwartet {expectedCount} Bilder
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-memorial-line space-y-2">
        <div className="flex items-center justify-between">
          <LayoutPicker
            currentLayoutId={page.layoutId}
            mode={mode}
            mediaCount={pageMedia.length}
            onChange={(layoutId) => onChangeLayout(page.id, layoutId)}
          />
          <span className="text-[10px] text-memorial-ink-soft/60">
            {pageMedia.length} Bild{pageMedia.length !== 1 ? 'er' : ''}
          </span>
        </div>

        {/* Media row */}
        <SortableContext
          items={page.mediaIds}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 min-h-[3.5rem]">
            {pageMedia.length === 0 ? (
              <div className="flex items-center justify-center w-full text-[11px] text-memorial-ink-soft/40 italic">
                Noch leer
              </div>
            ) : (
              pageMedia.map((m) => (
                <MediaThumb
                  key={m.id}
                  item={m}
                  pageId={page.id}
                  onCaptionChange={onCaptionChange}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>

      {/* Add page after */}
      <button
        onClick={() => onAddAfter(page.id)}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-memorial-canvas border border-memorial-line flex items-center justify-center text-memorial-ink-soft hover:text-memorial-bronze-deep hover:border-memorial-bronze transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 shadow-sm"
        aria-label="Seite danach einfügen"
      >
        <Plus className="w-3 h-3" />
      </button>
    </motion.div>
  )
}
