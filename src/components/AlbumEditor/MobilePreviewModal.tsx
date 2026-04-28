import { useEffect, useMemo, useRef } from 'react'
import { X } from 'lucide-react'
import type { AlbumMode } from '@/lib/album-engine/types'
import { PREVIEW_STORAGE_PREFIX, PREVIEW_MESSAGE_TYPE } from '@/pages/AlbumPreviewMobile'
import { useContent } from '@/contexts/ContentContext'

interface Props {
  open: boolean
  onClose: () => void
  subjectName: string
  dedication?: string | null
  dateRange?: string
  images: string[]
  mode: AlbumMode
  pages?: unknown[]
  focalByUrl?: Record<string, { x: number; y: number }>
}

function makeKey() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function MobilePreviewModal({
  open,
  onClose,
  subjectName,
  dedication,
  dateRange,
  images,
  mode,
  pages,
  focalByUrl,
}: Props) {
  const storageKey = useMemo(() => (open ? makeKey() : null), [open])
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { sharedContent } = useContent()
  const aria = sharedContent.navAria

  // Build payload — also pushed via postMessage on every change for realtime sync
  const payload = useMemo(
    () => ({ mode, subjectName, dedication, dateRange, images, pages, focalByUrl }),
    [mode, subjectName, dedication, dateRange, images, pages, focalByUrl]
  )

  // Seed sessionStorage on open so iframe has initial data on first paint
  useEffect(() => {
    if (!open || !storageKey) return
    const fullKey = PREVIEW_STORAGE_PREFIX + storageKey
    sessionStorage.setItem(fullKey, JSON.stringify(payload))
    return () => {
      sessionStorage.removeItem(fullKey)
    }
  }, [open, storageKey, payload])

  // Push live updates to iframe — keeps preview synced without reloading
  useEffect(() => {
    if (!open) return
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.postMessage({ type: PREVIEW_MESSAGE_TYPE, payload }, '*')
  }, [open, payload])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open || !storageKey) return null

  const iframeSrc = `/preview/mobile?k=${storageKey}`

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex-shrink-0"
        style={{ width: 390, height: 844 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-0 rounded-[60px] pointer-events-none z-10"
          style={{
            border: '12px solid #1a1a1a',
            boxShadow:
              '0 0 0 1px #000, 0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        />

        <div
          className="absolute overflow-hidden bg-white"
          style={{
            inset: 12,
            borderRadius: 48,
          }}
        >
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={aria.closePreview}
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              display: 'block',
            }}
            // Push fresh payload right after iframe finishes loading — covers
            // race where postMessage fires before iframe listener is mounted
            onLoad={() => {
              const win = iframeRef.current?.contentWindow
              if (!win) return
              win.postMessage({ type: PREVIEW_MESSAGE_TYPE, payload }, '*')
            }}
          />
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label={aria.closePreview}
        className="fixed top-4 right-4 z-[210] w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
