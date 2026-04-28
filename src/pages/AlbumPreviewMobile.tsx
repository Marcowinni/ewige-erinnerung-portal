import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ModernPhotoAlbum, type PageConfig } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import { ClassicPhotoAlbum, type ClassicPageConfig } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import { TimelessPhotoAlbum, type TimelessPageConfig } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'
import type { AlbumMode } from '@/lib/album-engine/types'
import type { FocalByUrl } from '@/lib/album/focalContext'

export const PREVIEW_STORAGE_PREFIX = 'memora:mobile-preview:'
export const PREVIEW_MESSAGE_TYPE = 'memora:preview-update'

interface PreviewPayload {
  mode: AlbumMode
  subjectName: string
  dedication?: string | null
  dateRange?: string
  images: string[]
  pages?: unknown[]
  focalByUrl?: FocalByUrl
}

export default function AlbumPreviewMobile() {
  const [params] = useSearchParams()
  const [payload, setPayload] = useState<PreviewPayload | null>(null)

  useEffect(() => {
    const key = params.get('k')
    if (!key) return
    const raw = sessionStorage.getItem(PREVIEW_STORAGE_PREFIX + key)
    if (!raw) return
    try {
      setPayload(JSON.parse(raw) as PreviewPayload)
    } catch {
      // ignore
    }
  }, [params])

  // Live sync — parent editor pushes updated payload via postMessage on every
  // text/layout change. Re-render iframe content immediately, no reload.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data as { type?: string; payload?: PreviewPayload } | null
      if (!data || data.type !== PREVIEW_MESSAGE_TYPE || !data.payload) return
      setPayload(data.payload)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  if (!payload) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui', color: '#888' }}>
        Vorschau wird geladen…
      </div>
    )
  }

  const { mode, subjectName, dedication, dateRange, images, pages, focalByUrl } = payload

  if (mode === 'modern') {
    return (
      <ModernPhotoAlbum
        subjectName={subjectName}
        dedication={dedication}
        dateRange={dateRange}
        images={images}
        pages={pages as PageConfig[] | undefined}
        focalByUrl={focalByUrl}
      />
    )
  }
  if (mode === 'classic') {
    return (
      <ClassicPhotoAlbum
        subjectName={subjectName}
        dedication={dedication}
        dateRange={dateRange}
        images={images}
        pages={pages as ClassicPageConfig[] | undefined}
        focalByUrl={focalByUrl}
      />
    )
  }
  // backward compat: 'vintage' → 'timeless'
  return (
    <TimelessPhotoAlbum
      subjectName={subjectName}
      dedication={dedication}
      dateRange={dateRange}
      images={images}
      pages={pages as TimelessPageConfig[] | undefined}
      focalByUrl={focalByUrl}
    />
  )
}
