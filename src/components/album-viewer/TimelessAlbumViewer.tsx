import { useMemo } from 'react'
import type { AlbumLayout, ImageSource } from '@/components/album/types'
import { useAlbumImages } from '@/hooks/useAlbumImages'
import { TimelessPhotoAlbum } from './timeless/TimelessPhotoAlbum'
import {
  isEditorPages,
  buildMediaIdUrlMap,
  editorPagesToTimeless,
} from '@/lib/editorLayoutConverter'
import { isStoredPages, fromStoredTimelessPages } from '@/lib/storedAlbumLayout'
import type { FocalByUrl } from '@/lib/album/focalContext'

interface TimelessAlbumViewerProps {
  albumLayout: AlbumLayout
  imageSources: ImageSource
  subjectName: string
  dedication?: string
  dateRange?: string
}

export function TimelessAlbumViewer({
  albumLayout,
  imageSources,
  subjectName,
  dedication,
  dateRange,
}: TimelessAlbumViewerProps) {
  const files = imageSources.files
  const { urls, loading } = useAlbumImages(imageSources.bucket, files)

  const resolvedUrls = useMemo(() => {
    const list: string[] = []
    for (let i = 0; i < files.length; i++) {
      const u = urls.get(i)
      if (u) list.push(u)
    }
    return list
  }, [files.length, urls])

  const focalByUrl = useMemo<FocalByUrl>(() => {
    const m: FocalByUrl = {}
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      const u = urls.get(i)
      if (!u || !f) continue
      if (f.focalX !== undefined || f.focalY !== undefined) {
        m[u] = { x: f.focalX ?? 50, y: f.focalY ?? 50 }
      }
    }
    return m
  }, [files, urls])

  // Build pages from album_layout — supports two stored formats:
  // 1. StoredPage[] (new admin editor flow) — resolves file indices to signed URLs
  // 2. EditorPage[] (legacy self-service flow) — uses mediaId→URL map
  const editorPages = useMemo(() => {
    const rawPages = albumLayout?.pages
    if (!Array.isArray(rawPages) || rawPages.length === 0) return null
    if (loading && files.length > 0) return null

    // New format: StoredPage[] with slots (file indices)
    if (isStoredPages(rawPages)) {
      return fromStoredTimelessPages(rawPages, urls)
    }

    // Legacy format: EditorPage[] with mediaIds
    if (isEditorPages(rawPages)) {
      const idUrlMap = buildMediaIdUrlMap(files, urls)
      return editorPagesToTimeless(rawPages, idUrlMap)
    }

    return null
  }, [albumLayout, files, urls, loading])

  if (loading && files.length > 0) {
    return (
      <div className="flex items-center justify-center h-full w-full" style={{ background: '#f4f1ea' }}>
        <div className="w-10 h-10 border-2 border-dashed rounded-full animate-spin" style={{ borderColor: '#3d3530' }} />
      </div>
    )
  }

  return (
    <TimelessPhotoAlbum
      subjectName={subjectName}
      dateRange={dateRange}
      dedication={dedication}
      images={resolvedUrls}
      pages={editorPages ?? undefined}
      focalByUrl={focalByUrl}
    />
  )
}
