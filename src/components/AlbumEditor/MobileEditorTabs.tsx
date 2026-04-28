import { useState } from 'react'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { LayoutList, Images } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'
import type { AlbumMode } from '@/lib/album-engine/types'
import { MediaChip } from './MediaChip'
import { PageThumbnail } from './PageThumbnail'

interface Props {
  pages: EditorPage[]
  media: EditorMediaItem[]
  mode: AlbumMode
  activePageId: string | null
  isDraggingPage: boolean
  onSelectPage: (id: string) => void
  onRemovePage: (id: string) => void
}

export function MobileEditorTabs({
  pages,
  media,
  mode,
  activePageId,
  isDraggingPage,
  onSelectPage,
  onRemovePage,
}: Props) {
  const [tab, setTab] = useState<'pages' | 'photos'>('pages')

  return (
    <div className="border-t border-memorial-line bg-[hsl(var(--memorial-canvas)/0.95)] backdrop-blur-xl">
      {/* Tab bar */}
      <div className="flex border-b border-memorial-line">
        {(['pages', 'photos'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] uppercase tracking-widest transition-colors',
              tab === t
                ? 'text-memorial-bronze-deep border-b-2 border-memorial-bronze'
                : 'text-memorial-ink-soft'
            )}
          >
            {t === 'pages' ? <LayoutList className="w-3.5 h-3.5" /> : <Images className="w-3.5 h-3.5" />}
            {t === 'pages' ? 'Seiten' : 'Fotos'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-x-auto py-3 px-3" style={{ height: '130px' }}>
        <div className="flex gap-2.5 min-w-max h-full items-center">
          {tab === 'pages' ? (
            <SortableContext items={pages.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
              {pages.map((page, i) => (
                <PageThumbnail
                  key={page.id}
                  page={page}
                  index={i}
                  media={media}
                  mode={mode}
                  isActive={page.id === activePageId}
                  isDraggingPage={isDraggingPage}
                  onClick={() => onSelectPage(page.id)}
                  onRemove={() => onRemovePage(page.id)}
                />
              ))}
            </SortableContext>
          ) : (
            <SortableContext items={media.map((m) => m.id)} strategy={horizontalListSortingStrategy}>
              {media.map((item) => (
                <MediaChip key={item.id} item={item} pages={pages} />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  )
}
