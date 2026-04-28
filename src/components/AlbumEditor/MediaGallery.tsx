import { Images } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'
import { MediaChip } from './MediaChip'

interface Props {
  media: EditorMediaItem[]
  pages: EditorPage[]
  className?: string
}

export function MediaGallery({ media, pages, className }: Props) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-20 border-t border-memorial-line',
        'bg-[hsl(var(--memorial-canvas)/0.92)] backdrop-blur-xl',
        className
      )}
      style={{ height: '140px' }}
    >
      <div className="flex items-center h-full px-4 gap-4">
        <div className="flex-shrink-0 flex flex-col items-center gap-1 text-memorial-ink-soft/50">
          <Images className="w-4 h-4" />
          <span className="text-[9px] uppercase tracking-widest">{media.length}</span>
        </div>

        <div
          className="flex-1 overflow-x-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--memorial-bronze)/0.4) transparent',
          }}
        >
          <div className="flex gap-2.5 pb-2 pt-1 min-w-max">
            {media.map((item, i) => (
              <MediaChip key={item.id} item={item} pages={pages} floatIndex={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
