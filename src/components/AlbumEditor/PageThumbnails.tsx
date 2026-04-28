import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'
import type { AlbumMode } from '@/lib/album-engine/types'
import { PageThumbnail } from './PageThumbnail'

interface Props {
  pages: EditorPage[]
  media: EditorMediaItem[]
  mode: AlbumMode
  activePageId: string | null
  isDraggingPage: boolean
  onSelectPage: (id: string) => void
  onRemovePage: (id: string) => void
  onAddPage: () => void
  className?: string
}

export function PageThumbnails({
  pages,
  media,
  mode,
  activePageId,
  isDraggingPage,
  onSelectPage,
  onRemovePage,
  onAddPage,
  className,
}: Props) {
  return (
    <div className={cn('flex flex-col gap-2 overflow-y-auto py-3 px-2', className)}>
      <SortableContext items={pages.map((p) => p.id)} strategy={verticalListSortingStrategy}>
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

      <button
        onClick={onAddPage}
        className={cn(
          'flex-shrink-0 w-[100px] rounded-lg border-2 border-dashed border-memorial-line',
          'hover:border-memorial-bronze/50 hover:bg-memorial-bronze/4 transition-all duration-200',
          'flex flex-col items-center justify-center gap-1 text-memorial-ink-soft hover:text-memorial-bronze-deep',
          'py-4 text-[9px] uppercase tracking-widest'
        )}
      >
        <Plus className="w-3.5 h-3.5" />
        Neu
      </button>
    </div>
  )
}
