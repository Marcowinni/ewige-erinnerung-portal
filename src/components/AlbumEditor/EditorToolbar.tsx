import { ArrowLeft, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LayoutPicker } from './LayoutPicker'
import type { AlbumMode } from '@/lib/album-engine/types'

interface Props {
  currentPage: number
  totalPages: number
  onBack: () => void
  onPreview: () => void
  currentLayoutId?: string
  mode: AlbumMode
  mediaCount: number
  onLayoutChange?: (layoutId: string) => void
}

export function EditorToolbar({
  currentPage,
  totalPages,
  onBack,
  onPreview,
  currentLayoutId,
  mode,
  mediaCount,
  onLayoutChange,
}: Props) {
  return (
    <div
      className={cn(
        'sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-2.5',
        'bg-[hsl(var(--memorial-canvas)/0.88)] backdrop-blur-xl',
        'border-b border-memorial-line shadow-[0_1px_8px_hsl(var(--memorial-ink)/0.06)]'
      )}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[12px] text-memorial-ink-soft hover:text-memorial-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Zurück</span>
      </button>

      <div className="flex items-center gap-3 min-w-0">
        <span className="font-display-italic text-[14px] text-memorial-ink whitespace-nowrap">
          Seite {currentPage} von {totalPages}
        </span>
        {currentLayoutId && onLayoutChange && (
          <>
            <span className="h-4 w-px bg-memorial-line" />
            <LayoutPicker
              currentLayoutId={currentLayoutId}
              mode={mode}
              mediaCount={mediaCount}
              onChange={onLayoutChange}
            />
          </>
        )}
      </div>

      <button
        onClick={onPreview}
        className="memorial-cta memorial-cta-primary flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium"
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Vorschau</span>
      </button>
    </div>
  )
}
