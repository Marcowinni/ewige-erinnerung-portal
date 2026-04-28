import { useState, useCallback, useMemo } from 'react'
import {
  buildTimelessPages,
  makeSlotPath,
  parseSlotPath,
  PAGE_SLOTS,
  slotsForTimelessPage,
  type TimelessPageConfig,
  type TimelessPageType,
} from '@/components/album-viewer/timeless/TimelessPhotoAlbum'
import type { SlotPath } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'

export interface TimelessLayoutState {
  pages: TimelessPageConfig[]
  assignments: Record<SlotPath, string>
}

function buildAssignments(images: string[]): Record<SlotPath, string> {
  const pages = buildTimelessPages(images)
  return assignmentsFromPages(pages)
}

function assignmentsFromPages(pages: TimelessPageConfig[]): Record<SlotPath, string> {
  const assignments: Record<SlotPath, string> = {}
  for (let pageIdx = 0; pageIdx < pages.length; pageIdx++) {
    const page = pages[pageIdx]!
    for (const { slotPath, img } of slotsForTimelessPage(page, pageIdx)) {
      if (img) assignments[slotPath] = img
    }
  }
  return assignments
}

function buildPageOfType(
  type: TimelessPageType,
  pool: string[],
  carry?: { showText?: boolean; text?: string }
): TimelessPageConfig {
  const pick = () => pool.shift() ?? null
  const meta = carry ?? {}

  switch (type) {
    case 'hero':   return { type: 'hero', img: pick(), ...meta }
    case 'single': return { type: 'single', img: pick(), ...meta }
    case 'duo':    return { type: 'duo', imgA: pick(), imgB: pick(), ...meta }
    case 'close':  return { type: 'close', ...meta }
  }
}

function pagesFromAssignments(
  pages: TimelessPageConfig[],
  assignments: Record<SlotPath, string>
): TimelessPageConfig[] {
  return pages.map((page, pageIdx) => {
    const get = (slotIdx: number): string | null =>
      assignments[makeSlotPath(pageIdx, slotIdx)] ?? null
    const meta = { showText: page.showText, text: (page as { text?: string }).text }

    switch (page.type) {
      case 'hero':   return { type: 'hero', img: get(0), ...meta }
      case 'single': return { type: 'single', img: get(0), ...meta }
      case 'duo':    return { type: 'duo', imgA: get(0), imgB: get(1), ...meta }
      case 'close':  return { type: 'close', ...meta }
    }
  })
}

function orderedImagesFromState(
  pages: TimelessPageConfig[],
  assignments: Record<SlotPath, string>
): string[] {
  const imgs: string[] = []
  for (let pageIdx = 0; pageIdx < pages.length; pageIdx++) {
    const page = pages[pageIdx]!
    const count = PAGE_SLOTS[page.type]
    for (let slotIdx = 0; slotIdx < count; slotIdx++) {
      const v = assignments[makeSlotPath(pageIdx, slotIdx)]
      if (v) imgs.push(v)
    }
  }
  return imgs
}

export function useTimelessLayout(images: string[], initial?: TimelessPageConfig[]) {
  const initialPages       = useMemo(
    () => (initial && initial.length > 0 ? initial : buildTimelessPages(images)),
    [images, initial]
  )
  const initialAssignments = useMemo(
    () => (initial && initial.length > 0 ? assignmentsFromPages(initial) : buildAssignments(images)),
    [images, initial]
  )

  const [assignments, setAssignments] = useState<Record<SlotPath, string>>(initialAssignments)
  const [pages, setPages]             = useState<TimelessPageConfig[]>(initialPages)

  const swap = useCallback((slotA: SlotPath, slotB: SlotPath) => {
    setAssignments((prev) => {
      const next = { ...prev }
      const a = next[slotA]
      const b = next[slotB]
      if (a) next[slotA] = b ?? a; else delete next[slotA]
      if (b) next[slotB] = a ?? b; else delete next[slotB]
      return next
    })
  }, [])

  const assign = useCallback((slotPath: SlotPath, imageUrl: string) => {
    setAssignments((prev) => ({ ...prev, [slotPath]: imageUrl }))
  }, [])

  const changePageLayout = useCallback((pageIdx: number, newType: TimelessPageType) => {
    setPages((prevPages) => {
      setAssignments((prevAssignments) => {
        const oldPage = prevPages[pageIdx]
        if (!oldPage) return prevAssignments
        if (oldPage.type === 'hero' || oldPage.type === 'close') return prevAssignments

        const oldSlotCount = PAGE_SLOTS[oldPage.type]
        const pool: string[] = []
        for (let i = 0; i < oldSlotCount; i++) {
          const v = prevAssignments[makeSlotPath(pageIdx, i)]
          if (v) pool.push(v)
        }
        const next = { ...prevAssignments }
        for (let i = 0; i < oldSlotCount; i++) delete next[makeSlotPath(pageIdx, i)]

        const newSlotCount = PAGE_SLOTS[newType]
        for (let i = 0; i < newSlotCount; i++) {
          const img = pool[i]
          if (img) next[makeSlotPath(pageIdx, i)] = img
        }
        return next
      })

      const nextPages = [...prevPages]
      const old = prevPages[pageIdx]
      nextPages[pageIdx] = buildPageOfType(newType, [], {
        showText: old?.showText,
        text: (old as { text?: string } | undefined)?.text,
      })
      return nextPages
    })
  }, [])

  const addPage = useCallback((afterIdx: number, type: TimelessPageType) => {
    setPages((prevPages) => {
      setAssignments((prevAssignments) => {
        const insertIdx = afterIdx + 1
        const next: Record<SlotPath, string> = {}
        for (const [sp, url] of Object.entries(prevAssignments)) {
          const parsed = parseSlotPath(sp)
          if (!parsed) continue
          if (parsed.pageIndex >= insertIdx) {
            next[makeSlotPath(parsed.pageIndex + 1, parsed.slotIndex)] = url
          } else {
            next[sp] = url
          }
        }
        return next
      })
      const nextPages = [...prevPages]
      nextPages.splice(afterIdx + 1, 0, buildPageOfType(type, []))
      return nextPages
    })
  }, [])

  const removePage = useCallback((pageIdx: number) => {
    setPages((prevPages) => {
      const page = prevPages[pageIdx]
      if (!page) return prevPages
      if (page.type === 'hero' || page.type === 'close') return prevPages

      setAssignments((prevAssignments) => {
        const next: Record<SlotPath, string> = {}
        for (const [sp, url] of Object.entries(prevAssignments)) {
          const parsed = parseSlotPath(sp)
          if (!parsed) continue
          if (parsed.pageIndex === pageIdx) continue
          if (parsed.pageIndex > pageIdx) {
            next[makeSlotPath(parsed.pageIndex - 1, parsed.slotIndex)] = url
          } else {
            next[sp] = url
          }
        }
        return next
      })

      const nextPages = [...prevPages]
      nextPages.splice(pageIdx, 1)
      return nextPages
    })
  }, [])

  const usedUrls = useMemo(() => new Set(Object.values(assignments)), [assignments])

  const orderedImages = useMemo(
    () => orderedImagesFromState(pages, assignments),
    [pages, assignments]
  )

  const syncedPages = useMemo(
    () => pagesFromAssignments(pages, assignments),
    [pages, assignments]
  )

  const togglePageText = useCallback((pageIdx: number) => {
    setPages((prev) => prev.map((p, i) => (i === pageIdx ? { ...p, showText: !(p.showText ?? false) } : p)))
  }, [])

  const editPageText = useCallback((pageIdx: number, text: string) => {
    setPages((prev) => prev.map((p, i) => (i === pageIdx ? { ...p, text } : p)))
  }, [])

  return {
    pages: syncedPages,
    assignments,
    orderedImages,
    usedUrls,
    swap,
    assign,
    setAssignments,
    setPages,
    changePageLayout,
    addPage,
    removePage,
    togglePageText,
    editPageText,
  }
}
