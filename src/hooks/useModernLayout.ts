import { useState, useCallback, useMemo } from 'react'
import {
  buildPages,
  makeSlotPath,
  parseSlotPath,
  PAGE_SLOTS,
  type PageConfig,
  type PageType,
} from '@/components/album-viewer/modern/ModernPhotoAlbum'
import type { SlotPath } from '@/components/album-viewer/modern/ModernPhotoAlbum'

export interface ModernLayoutState {
  pages: PageConfig[]
  assignments: Record<SlotPath, string>
}

// Build initial assignments using page-based slot paths (p${pageIdx}.${slotIdx})
function buildAssignments(images: string[]): Record<SlotPath, string> {
  const pages = buildPages(images)
  return assignmentsFromPages(pages)
}

// Derive assignments from a pages array — used after buildPages and after layout changes
function assignmentsFromPages(pages: PageConfig[]): Record<SlotPath, string> {
  const assignments: Record<SlotPath, string> = {}

  for (let pageIdx = 0; pageIdx < pages.length; pageIdx++) {
    const page = pages[pageIdx]!
    const set = (slotIdx: number, img: string | null) => {
      if (img) assignments[makeSlotPath(pageIdx, slotIdx)] = img
    }

    switch (page.type) {
      case 'hero': set(0, page.img); break
      case 'split':
        set(0, page.imgs[0]); set(1, page.imgs[1]); set(2, page.imgs[2])
        break
      case 'bleed': set(0, page.img); break
      case 'mosaic':
        set(0, page.imgs[0]); set(1, page.imgs[1]); set(2, page.imgs[2])
        set(3, page.imgs[3]); set(4, page.imgs[4])
        break
      case 'stack':
        set(0, page.imgs[0]); set(1, page.imgs[1])
        set(2, page.imgs[2]); set(3, page.imgs[3])
        break
      case 'story':
        set(0, page.bg); set(1, page.s1); set(2, page.s2); set(3, page.s3)
        break
      case 'quote-card': set(0, page.img); break
      case 'twin-portrait': set(0, page.imgA); set(1, page.imgB); break
      case 'close': break
    }
  }

  return assignments
}

// Build a PageConfig of given type with images filled from a pool
function buildPageOfType(type: PageType, pool: string[], carry?: { showText?: boolean; text?: string }): PageConfig {
  const pick = () => pool.shift() ?? null
  const meta = carry ?? {}

  switch (type) {
    case 'hero': return { type: 'hero', img: pick(), ...meta }
    case 'split': return { type: 'split', imgs: [pick(), pick(), pick()], ...meta }
    case 'bleed': return { type: 'bleed', img: pick(), ...meta }
    case 'mosaic': return { type: 'mosaic', imgs: [pick(), pick(), pick(), pick(), pick()], ...meta }
    case 'stack': return { type: 'stack', imgs: [pick(), pick(), pick(), pick()], ...meta }
    case 'story': return { type: 'story', bg: pick(), s1: pick(), s2: pick(), s3: pick(), ...meta }
    case 'quote-card': return { type: 'quote-card', img: pick(), ...meta }
    case 'twin-portrait': return { type: 'twin-portrait', imgA: pick(), imgB: pick(), ...meta }
    case 'close': return { type: 'close', ...meta }
  }
}

// Build images array in page order from assignments + pages (for rendering MPA)
function orderedImagesFromState(pages: PageConfig[], assignments: Record<SlotPath, string>): string[] {
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

// Rebuild pages array from current assignments (assignments are source of truth after edits)
function pagesFromAssignments(pages: PageConfig[], assignments: Record<SlotPath, string>): PageConfig[] {
  return pages.map((page, pageIdx) => {
    const get = (slotIdx: number): string | null =>
      assignments[makeSlotPath(pageIdx, slotIdx)] ?? null
    const meta = { showText: page.showText, text: (page as { text?: string }).text }

    switch (page.type) {
      case 'hero': return { type: 'hero', img: get(0), ...meta }
      case 'split': return { type: 'split', imgs: [get(0), get(1), get(2)], ...meta }
      case 'bleed': return { type: 'bleed', img: get(0), ...meta }
      case 'mosaic': return { type: 'mosaic', imgs: [get(0), get(1), get(2), get(3), get(4)], ...meta }
      case 'stack': return { type: 'stack', imgs: [get(0), get(1), get(2), get(3)], ...meta }
      case 'story': return { type: 'story', bg: get(0), s1: get(1), s2: get(2), s3: get(3), ...meta }
      case 'quote-card': return { type: 'quote-card', img: get(0), ...meta }
      case 'twin-portrait': return { type: 'twin-portrait', imgA: get(0), imgB: get(1), ...meta }
      case 'close': return { type: 'close', ...meta }
    }
  })
}

export function useModernLayout(images: string[], initial?: PageConfig[]) {
  const initialPages = useMemo(
    () => (initial && initial.length > 0 ? initial : buildPages(images)),
    [images, initial]
  )
  const initialAssignments = useMemo(
    () => (initial && initial.length > 0 ? assignmentsFromPages(initial) : buildAssignments(images)),
    [images, initial]
  )

  const [assignments, setAssignments] = useState<Record<SlotPath, string>>(initialAssignments)
  const [pages, setPages] = useState<PageConfig[]>(initialPages)

  // Swap two slots (A ↔ B)
  const swap = useCallback((slotA: SlotPath, slotB: SlotPath) => {
    setAssignments((prev) => {
      const next = { ...prev }
      const a = next[slotA]
      const b = next[slotB]
      if (a) next[slotA] = b ?? a
      else delete next[slotA]
      if (b) next[slotB] = a ?? b
      else delete next[slotB]
      return next
    })
  }, [])

  // Assign imageUrl to a slot — same image may appear in multiple slots
  const assign = useCallback((slotPath: SlotPath, imageUrl: string) => {
    setAssignments((prev) => ({ ...prev, [slotPath]: imageUrl }))
  }, [])

  // Change layout of a single page — moves freed images into new slots where possible
  const changePageLayout = useCallback((pageIdx: number, newType: PageType) => {
    setPages((prevPages) => {
      setAssignments((prevAssignments) => {
        const oldPage = prevPages[pageIdx]
        if (!oldPage) return prevAssignments
        // Don't allow changing hero/close
        if (oldPage.type === 'hero' || oldPage.type === 'close') return prevAssignments

        const oldSlotCount = PAGE_SLOTS[oldPage.type]
        // Collect images currently in this page's slots
        const pool: string[] = []
        for (let i = 0; i < oldSlotCount; i++) {
          const v = prevAssignments[makeSlotPath(pageIdx, i)]
          if (v) pool.push(v)
        }

        // Remove old page slots from assignments
        const next = { ...prevAssignments }
        for (let i = 0; i < oldSlotCount; i++) {
          delete next[makeSlotPath(pageIdx, i)]
        }

        // Fill new slots with images from pool
        const newSlotCount = PAGE_SLOTS[newType]
        for (let i = 0; i < newSlotCount; i++) {
          const img = pool[i]
          if (img) next[makeSlotPath(pageIdx, i)] = img
          // Images beyond new slot count are simply unassigned (visible in pool)
        }

        return next
      })

      // Replace page type in pages array, carry over showText + text
      const nextPages = [...prevPages]
      const old = prevPages[pageIdx]
      nextPages[pageIdx] = buildPageOfType(newType, [], {
        showText: old?.showText,
        text: (old as { text?: string } | undefined)?.text,
      })
      return nextPages
    })
  }, [])

  // Add empty page after given index
  const addPage = useCallback((afterIdx: number, type: PageType) => {
    setPages((prevPages) => {
      setAssignments((prevAssignments) => {
        // Shift all slot paths for pages after insertion point
        const insertIdx = afterIdx + 1
        const next: Record<SlotPath, string> = {}

        for (const [sp, url] of Object.entries(prevAssignments)) {
          const parsed = parseSlotPath(sp)
          if (!parsed) continue
          if (parsed.pageIndex >= insertIdx) {
            // Shift up by 1
            next[makeSlotPath(parsed.pageIndex + 1, parsed.slotIndex)] = url
          } else {
            next[sp] = url
          }
        }
        // New page starts empty — no assignments for it
        return next
      })

      const nextPages = [...prevPages]
      nextPages.splice(afterIdx + 1, 0, buildPageOfType(type, []))
      return nextPages
    })
  }, [])

  // Remove page at index, shift following page slot paths down
  const removePage = useCallback((pageIdx: number) => {
    setPages((prevPages) => {
      const page = prevPages[pageIdx]
      if (!page) return prevPages
      // Never remove hero or close
      if (page.type === 'hero' || page.type === 'close') return prevPages

      setAssignments((prevAssignments) => {
        const oldSlotCount = PAGE_SLOTS[page.type]
        const next: Record<SlotPath, string> = {}

        for (const [sp, url] of Object.entries(prevAssignments)) {
          const parsed = parseSlotPath(sp)
          if (!parsed) continue
          if (parsed.pageIndex === pageIdx) continue // drop removed page slots
          if (parsed.pageIndex > pageIdx) {
            // Shift down by 1
            next[makeSlotPath(parsed.pageIndex - 1, parsed.slotIndex)] = url
          } else {
            next[sp] = url
          }
        }
        void oldSlotCount // silence unused warning
        return next
      })

      const nextPages = [...prevPages]
      nextPages.splice(pageIdx, 1)
      return nextPages
    })
  }, [])

  // All used images (for marking in gallery)
  const usedUrls = useMemo(() => new Set(Object.values(assignments)), [assignments])

  // Current images array in page order — used for MPA rendering
  const orderedImages = useMemo(
    () => orderedImagesFromState(pages, assignments),
    [pages, assignments]
  )

  // Synced pages array with actual assignment values (source of truth for rendering)
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
