import { useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem, EditorPage } from '@/hooks/useAlbumPages'
import type { AlbumMode, EngineAlbumBlock, EngineMediaItem } from '@/lib/album-engine/types'
import { catalogForMode } from '@/lib/album-engine/catalog'
import { orientationFromDimensions } from '@/lib/album-engine/media'
import { HorizontalStoryViewer } from '@/components/album-viewer/HorizontalStoryViewer'
import { ModernPhotoAlbum } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import { ClassicPhotoAlbum } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import { TimelessPhotoAlbum } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'
import { buildScenes } from '@/components/album-viewer/shared/buildScenes'

function pageToEngineBlock(
  page: EditorPage,
  media: EditorMediaItem[],
  mode: AlbumMode
): EngineAlbumBlock | null {
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
  return { layoutId: spec.id, mode, family: spec.family, items, variant: 0 }
}

const THEME_PROGRESS_CLASS: Record<AlbumMode, string> = {
  modern: 'bg-memorial-bronze',
  classic: 'bg-[#C9A84C]',
  timeless: 'bg-stone-700',
  vintage: 'bg-stone-700', // backward compat
}

const THEME_BG: Record<AlbumMode, string> = {
  modern: 'hsl(var(--memorial-canvas))',
  classic: '#F5EBD7',
  timeless: '#fff',
  vintage: '#fff', // backward compat
}

interface Props {
  open: boolean
  onClose: () => void
  onOrder: () => void
  pages: EditorPage[]
  media: EditorMediaItem[]
  mode: AlbumMode
  subjectName: string
  dedication?: string
  birthDate?: string
  passingDate?: string
}

export function PreviewModal({
  open,
  onClose,
  onOrder,
  pages,
  media,
  mode,
  subjectName,
  dedication,
  birthDate,
  passingDate,
}: Props) {
  // ESC key closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const { scenes, flatMedia } = useMemo(() => {
    // EditorPage format has mediaIds (strings), StoredPage format has slots (indices)
    const flat = pages.flatMap((p) => {
      const anyP = p as { mediaIds?: string[]; slots?: (number | null)[] }
      if (Array.isArray(anyP.mediaIds)) {
        return anyP.mediaIds
          .map((id) => media.find((m) => m.id === id))
          .filter(Boolean) as EditorMediaItem[]
      }
      if (Array.isArray(anyP.slots)) {
        return anyP.slots
          .map((idx) => (idx != null ? media[idx] : undefined))
          .filter(Boolean) as EditorMediaItem[]
      }
      return []
    })
    const blocks = pages
      .map((p) => pageToEngineBlock(p, media, mode))
      .filter((b): b is EngineAlbumBlock => b !== null)
    const getUrl = (idx: number): string | null => flat[idx]?.previewUrl ?? null
    const sc = buildScenes(blocks, {
      subjectName,
      dedication,
      birthDate,
      passingDate,
      getUrl,
    })
    return { scenes: sc, flatMedia: flat }
  }, [pages, media, mode, subjectName, dedication, birthDate, passingDate])

  const getUrl = useCallback(
    (globalIdx: number): string | null => flatMedia[globalIdx]?.previewUrl ?? null,
    [flatMedia]
  )

  const getCaption = useCallback(
    (globalIdx: number): string => flatMedia[globalIdx]?.caption ?? '',
    [flatMedia]
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100]"
          style={{ background: THEME_BG[mode] }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0">
            {mode === 'modern' ? (
              <ModernPhotoAlbum
                subjectName={subjectName}
                dedication={dedication ?? null}
                dateRange={
                  [birthDate, passingDate].filter(Boolean).map((d) => {
                    const y = d ? new Date(d).getFullYear() : null
                    return y ? String(y) : ''
                  }).filter(Boolean).join(' – ') || undefined
                }
                images={flatMedia.map((m) => m.previewUrl)}
              />
            ) : mode === 'classic' ? (
              <ClassicPhotoAlbum
                subjectName={subjectName}
                dedication={dedication ?? null}
                dateRange={
                  [birthDate, passingDate].filter(Boolean).map((d) => {
                    const y = d ? new Date(d).getFullYear() : null
                    return y ? String(y) : ''
                  }).filter(Boolean).join(' – ') || undefined
                }
                images={flatMedia.map((m) => m.previewUrl)}
              />
            ) : (mode === 'timeless' || mode === 'vintage') ? (
              <TimelessPhotoAlbum
                subjectName={subjectName}
                dedication={dedication ?? null}
                dateRange={
                  [birthDate, passingDate].filter(Boolean).map((d) => {
                    const y = d ? new Date(d).getFullYear() : null
                    return y ? String(y) : ''
                  }).filter(Boolean).join(' – ') || undefined
                }
                images={flatMedia.map((m) => m.previewUrl)}
              />
            ) : (
              <HorizontalStoryViewer
                scenes={scenes}
                theme={mode}
                getUrl={getUrl}
                getCaption={getCaption}
                progressBarClassName={THEME_PROGRESS_CLASS[mode]}
                bgColor={THEME_BG[mode]}
              />
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Vorschau schliessen"
            className={cn(
              'fixed top-4 right-4 z-[110]',
              'w-11 h-11 rounded-full flex items-center justify-center',
              'bg-memorial-canvas/90 backdrop-blur border border-memorial-line',
              'text-memorial-ink hover:bg-memorial-canvas transition-colors shadow-md'
            )}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Order CTA */}
          <button
            onClick={onOrder}
            className={cn(
              'fixed bottom-6 right-6 z-[110]',
              'memorial-cta memorial-cta-primary',
              'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg'
            )}
          >
            <ShoppingBag className="w-4 h-4" />
            Bestellen
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
