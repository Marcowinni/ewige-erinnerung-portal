import { useState, useCallback } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { buildEngineBlocks } from '@/lib/album-engine/engine'
import { orientationFromDimensions } from '@/lib/album-engine/media'
import type { AlbumMode, EngineMediaItem } from '@/lib/album-engine/types'

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

export interface EditorMediaItem {
  id: string
  file: File
  previewUrl: string
  caption: string
  kind: 'image' | 'video'
  width: number
  height: number
  // Per-image focal point in percent (0-100). Default 50/50 (center crop).
  focalX?: number
  focalY?: number
}

export interface EditorPage {
  id: string
  layoutId: string
  mediaIds: string[]
}

export interface AlbumPagesState {
  pages: EditorPage[]
  unassignedMediaIds: string[]
}

function mediaItemToEngineItem(m: EditorMediaItem, index: number): EngineMediaItem {
  const ar = m.width / Math.max(m.height, 1)
  return {
    id: m.id,
    sourceIndex: index,
    type: m.kind === 'video' ? 'video' : 'image',
    url: m.previewUrl,
    width: m.width,
    height: m.height,
    aspectRatio: ar,
    orientation: orientationFromDimensions(m.width, m.height),
    caption: m.caption || undefined,
  }
}

function buildInitialPages(media: EditorMediaItem[], mode: AlbumMode): AlbumPagesState {
  if (media.length === 0) {
    return { pages: [], unassignedMediaIds: [] }
  }

  const engineItems = media.map((m, i) => mediaItemToEngineItem(m, i))
  const blocks = buildEngineBlocks(engineItems, mode)

  const idByIndex = new Map(media.map((m, i) => [i, m.id]))

  const pages: EditorPage[] = blocks.map((block) => ({
    id: crypto.randomUUID(),
    layoutId: block.layoutId,
    mediaIds: block.items.map((it) => idByIndex.get(it.sourceIndex)!).filter(Boolean),
  }))

  return { pages, unassignedMediaIds: [] }
}

export function useAlbumPages(initialMedia: EditorMediaItem[], mode: AlbumMode) {
  const [state, setState] = useState<AlbumPagesState>(() =>
    buildInitialPages(initialMedia, mode)
  )

  const reorderPages = useCallback((from: number, to: number) => {
    setState((prev) => ({
      ...prev,
      pages: arrayMove(prev.pages, from, to),
    }))
  }, [])

  const moveMediaBetweenPages = useCallback(
    (mediaId: string, fromPageId: string | null, toPageId: string, toIndex: number) => {
      setState((prev) => {
        const pages = prev.pages.map((p) => ({ ...p, mediaIds: [...p.mediaIds] }))
        let unassigned = [...prev.unassignedMediaIds]

        // Remove from source
        if (fromPageId === null) {
          unassigned = unassigned.filter((id) => id !== mediaId)
        } else {
          const fromPage = pages.find((p) => p.id === fromPageId)
          if (fromPage) {
            fromPage.mediaIds = fromPage.mediaIds.filter((id) => id !== mediaId)
          }
        }

        // Insert into target
        const toPage = pages.find((p) => p.id === toPageId)
        if (toPage) {
          const clampedIndex = Math.min(toIndex, toPage.mediaIds.length)
          toPage.mediaIds.splice(clampedIndex, 0, mediaId)
        }

        return { pages, unassignedMediaIds: unassigned }
      })
    },
    []
  )

  const reorderMediaInPage = useCallback((pageId: string, from: number, to: number) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId ? { ...p, mediaIds: arrayMove(p.mediaIds, from, to) } : p
      ),
    }))
  }, [])

  const changePageLayout = useCallback((pageId: string, layoutId: string) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.id === pageId ? { ...p, layoutId } : p)),
    }))
  }, [])

  const addPage = useCallback((afterId: string | null, layoutId: string) => {
    setState((prev) => {
      const newPage: EditorPage = { id: crypto.randomUUID(), layoutId, mediaIds: [] }
      if (afterId === null) {
        return { ...prev, pages: [...prev.pages, newPage] }
      }
      const idx = prev.pages.findIndex((p) => p.id === afterId)
      const pages = [...prev.pages]
      pages.splice(idx + 1, 0, newPage)
      return { ...prev, pages }
    })
  }, [])

  const removePage = useCallback((pageId: string) => {
    setState((prev) => {
      const page = prev.pages.find((p) => p.id === pageId)
      const freed = page?.mediaIds ?? []
      return {
        pages: prev.pages.filter((p) => p.id !== pageId),
        unassignedMediaIds: [...prev.unassignedMediaIds, ...freed],
      }
    })
  }, [])

  const assignUnassigned = useCallback((mediaId: string, pageId: string, index: number) => {
    setState((prev) => {
      const unassigned = prev.unassignedMediaIds.filter((id) => id !== mediaId)
      const pages = prev.pages.map((p) => {
        if (p.id !== pageId) return p
        const mediaIds = [...p.mediaIds]
        mediaIds.splice(Math.min(index, mediaIds.length), 0, mediaId)
        return { ...p, mediaIds }
      })
      return { pages, unassignedMediaIds: unassigned }
    })
  }, [])

  const unassignMedia = useCallback((mediaId: string) => {
    setState((prev) => {
      const pages = prev.pages.map((p) => ({
        ...p,
        mediaIds: p.mediaIds.filter((id) => id !== mediaId),
      }))
      return {
        pages,
        unassignedMediaIds: prev.unassignedMediaIds.includes(mediaId)
          ? prev.unassignedMediaIds
          : [...prev.unassignedMediaIds, mediaId],
      }
    })
  }, [])

  const setCaption = useCallback(
    (_mediaId: string, _caption: string) => {
      // Caption lives in EditorMediaItem, not in pages state.
      // Handled externally via mediaItems state in SelfServiceUploader.
    },
    []
  )

  const reset = useCallback((media: EditorMediaItem[]) => {
    setState(buildInitialPages(media, mode))
  }, [mode])

  const regenerate = useCallback((media: EditorMediaItem[], regenerateMode: AlbumMode) => {
    const shuffled = fisherYates(media)
    setState(buildInitialPages(shuffled, regenerateMode))
  }, [])

  const swapMediaAt = useCallback((pageId: string, slotIndex: number, newMediaId: string) => {
    setState((prev) => {
      const pages = prev.pages.map((p) => ({ ...p, mediaIds: [...p.mediaIds] }))
      let unassigned = [...prev.unassignedMediaIds]

      const targetPage = pages.find((p) => p.id === pageId)
      if (!targetPage) return prev

      const oldMediaId = targetPage.mediaIds[slotIndex]

      // Find where newMediaId currently lives
      let sourcePageId: string | null = null
      let sourceSlotIndex = -1
      for (const p of pages) {
        const idx = p.mediaIds.indexOf(newMediaId)
        if (idx !== -1) { sourcePageId = p.id; sourceSlotIndex = idx; break }
      }
      const inUnassigned = unassigned.includes(newMediaId)

      // Perform the swap
      targetPage.mediaIds[slotIndex] = newMediaId

      if (sourcePageId !== null && sourceSlotIndex !== -1) {
        const sourcePage = pages.find((p) => p.id === sourcePageId)!
        // Put old media where new was (swap), unless same slot
        if (sourcePageId === pageId && sourceSlotIndex === slotIndex) return prev
        sourcePage.mediaIds[sourceSlotIndex] = oldMediaId ?? ''
        if (!oldMediaId) sourcePage.mediaIds.splice(sourceSlotIndex, 1)
      } else if (inUnassigned) {
        unassigned = unassigned.filter((id) => id !== newMediaId)
        if (oldMediaId) unassigned.push(oldMediaId)
      }

      return { pages, unassignedMediaIds: unassigned }
    })
  }, [])

  return {
    state,
    setState,
    reorderPages,
    moveMediaBetweenPages,
    reorderMediaInPage,
    changePageLayout,
    addPage,
    removePage,
    assignUnassigned,
    unassignMedia,
    setCaption,
    reset,
    regenerate,
    swapMediaAt,
  }
}
