/**
 * Converts editor PageConfig[] (with URLs) to a DB-safe StoredPage[] (with file indices)
 * and back again. Avoids storing signed URLs (expire after ~1h) in the DB.
 *
 * Format detection in viewers:
 *   stored[0].type && stored[0].slots  → new StoredPage[] format (this file)
 *   stored[0].layoutId                → old EditorPage[] format (editorLayoutConverter.ts)
 */

import type { PageConfig, PageType } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import type { ClassicPageConfig, ClassicPageType } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import type { VintagePageConfig, VintagePageType } from '@/components/album-viewer/vintage/VintagePhotoAlbum'
import type { TimelessPageConfig, TimelessPageType } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'
import type { EditorMediaItem } from '@/hooks/useAlbumPages'

// ─── StoredPage ───────────────────────────────────────────────────────────────

export interface StoredPage {
  type: string          // PageType / ClassicPageType / VintagePageType
  slots: (number | null)[]  // indices into uploaded_files[], null = empty slot
  showText?: boolean
  text?: string
}

export interface StoredAlbumLayout {
  theme: 'modern' | 'classic' | 'timeless' | 'vintage'
  pages: StoredPage[]
}

// ─── URL → file index helper ──────────────────────────────────────────────────

function urlToIndex(url: string | null, media: EditorMediaItem[]): number | null {
  if (!url) return null
  const idx = media.findIndex((m) => m.previewUrl === url)
  return idx >= 0 ? idx : null
}

function indexToUrl(idx: number | null, urls: Map<number, string>): string | null {
  if (idx === null) return null
  return urls.get(idx) ?? null
}

// ─── Modern: PageConfig[] → StoredPage[] ─────────────────────────────────────

function modernPageToSlots(page: PageConfig): (string | null)[] {
  switch (page.type) {
    case 'hero':         return [page.img]
    case 'split':        return [...page.imgs]
    case 'bleed':        return [page.img]
    case 'mosaic':       return [...page.imgs]
    case 'stack':        return [...page.imgs]
    case 'story':        return [page.bg, page.s1, page.s2, page.s3]
    case 'quote-card':   return [page.img]
    case 'twin-portrait':return [page.imgA, page.imgB]
    case 'close':        return []
  }
}

export function toStoredModernPages(pages: PageConfig[], media: EditorMediaItem[]): StoredPage[] {
  return pages.map((page) => ({
    type: page.type,
    slots: modernPageToSlots(page).map((url) => urlToIndex(url, media)),
    showText: page.showText,
    text: (page as { text?: string }).text,
  }))
}

export function fromStoredModernPage(sp: StoredPage, urls: Map<number, string>): PageConfig {
  const get = (i: number): string | null => indexToUrl(sp.slots[i] ?? null, urls)
  const meta = { showText: sp.showText, text: sp.text }

  switch (sp.type as PageType) {
    case 'hero':          return { type: 'hero', img: get(0), ...meta }
    case 'split':         return { type: 'split', imgs: [get(0), get(1), get(2)], ...meta }
    case 'bleed':         return { type: 'bleed', img: get(0), ...meta }
    case 'mosaic':        return { type: 'mosaic', imgs: [get(0), get(1), get(2), get(3), get(4)], ...meta }
    case 'stack':         return { type: 'stack', imgs: [get(0), get(1), get(2), get(3)], ...meta }
    case 'story':         return { type: 'story', bg: get(0), s1: get(1), s2: get(2), s3: get(3), ...meta }
    case 'quote-card':    return { type: 'quote-card', img: get(0), ...meta }
    case 'twin-portrait': return { type: 'twin-portrait', imgA: get(0), imgB: get(1), ...meta }
    case 'close':         return { type: 'close', ...meta }
    default:              return { type: 'bleed', img: get(0), ...meta }
  }
}

export function fromStoredModernPages(stored: StoredPage[], urls: Map<number, string>): PageConfig[] {
  return stored.map((sp, i) => {
    // First page always hero (title page with name + intro)
    if (i === 0) {
      const firstUrl = (sp.slots?.[0] != null ? urls.get(sp.slots[0]!) : null) ?? null
      return { type: 'hero', img: firstUrl, showText: sp.showText, text: sp.text }
    }
    return fromStoredModernPage(sp, urls)
  })
}

// ─── Classic: ClassicPageConfig[] → StoredPage[] ─────────────────────────────

function classicPageToSlots(page: ClassicPageConfig): (string | null)[] {
  switch (page.type) {
    case 'hero':            return [page.img]
    case 'duo':             return [page.imgA, page.imgB]
    case 'herald':          return [page.hero, page.r1, page.r2]
    case 'polaroids':       return [page.imgA, page.imgB]
    case 'bleed':           return [page.img]
    case 'strip':           return [page.s1, page.s2, page.s3, page.big]
    case 'tape':            return [page.imgA, page.imgB]
    case 'diagonal':        return [page.t1, page.t2, page.t3]
    case 'envelope-letter': return [page.img]
    case 'pinned':          return [page.imgA, page.imgB]
    case 'close':           return []
  }
}

export function toStoredClassicPages(pages: ClassicPageConfig[], media: EditorMediaItem[]): StoredPage[] {
  return pages.map((page) => ({
    type: page.type,
    slots: classicPageToSlots(page).map((url) => urlToIndex(url, media)),
    showText: page.showText,
    text: (page as { text?: string }).text,
  }))
}

export function fromStoredClassicPage(sp: StoredPage, urls: Map<number, string>): ClassicPageConfig {
  const get = (i: number): string | null => indexToUrl(sp.slots[i] ?? null, urls)
  const meta = { showText: sp.showText, text: sp.text }

  switch (sp.type as ClassicPageType) {
    case 'hero':            return { type: 'hero', img: get(0), ...meta }
    case 'duo':             return { type: 'duo', imgA: get(0), imgB: get(1), ...meta }
    case 'herald':          return { type: 'herald', hero: get(0), r1: get(1), r2: get(2), ...meta }
    case 'polaroids':       return { type: 'polaroids', imgA: get(0), imgB: get(1), ...meta }
    case 'bleed':           return { type: 'bleed', img: get(0), ...meta }
    case 'strip':           return { type: 'strip', s1: get(0), s2: get(1), s3: get(2), big: get(3), ...meta }
    case 'tape':            return { type: 'tape', imgA: get(0), imgB: get(1), ...meta }
    case 'diagonal':        return { type: 'diagonal', t1: get(0), t2: get(1), t3: get(2), ...meta }
    case 'envelope-letter': return { type: 'envelope-letter', img: get(0), ...meta }
    case 'pinned':          return { type: 'pinned', imgA: get(0), imgB: get(1), ...meta }
    case 'close':           return { type: 'close', ...meta }
    default:                return { type: 'bleed', img: get(0), ...meta }
  }
}

export function fromStoredClassicPages(stored: StoredPage[], urls: Map<number, string>): ClassicPageConfig[] {
  return stored.map((sp, i) => {
    // First page always hero (title page with name + intro)
    if (i === 0) {
      const firstUrl = (sp.slots?.[0] != null ? urls.get(sp.slots[0]!) : null) ?? null
      return { type: 'hero', img: firstUrl, showText: sp.showText, text: sp.text }
    }
    return fromStoredClassicPage(sp, urls)
  })
}

// ─── Vintage: VintagePageConfig[] → StoredPage[] ─────────────────────────────

function vintagePageToSlots(page: VintagePageConfig): (string | null)[] {
  switch (page.type) {
    case 'hero':   return [page.img]
    case 'single': return [page.img]
    case 'duo':    return [page.imgA, page.imgB]
    case 'close':  return []
  }
}

export function toStoredVintagePages(pages: VintagePageConfig[], media: EditorMediaItem[]): StoredPage[] {
  return pages.map((page) => ({
    type: page.type,
    slots: vintagePageToSlots(page).map((url) => urlToIndex(url, media)),
    showText: page.showText,
    text: (page as { text?: string }).text,
  }))
}

export function fromStoredVintagePage(sp: StoredPage, urls: Map<number, string>): VintagePageConfig {
  const get = (i: number): string | null => indexToUrl(sp.slots[i] ?? null, urls)
  const meta = { showText: sp.showText, text: sp.text }

  switch (sp.type as VintagePageType) {
    case 'hero':   return { type: 'hero', img: get(0), ...meta }
    case 'single': return { type: 'single', img: get(0), ...meta }
    case 'duo':    return { type: 'duo', imgA: get(0), imgB: get(1), ...meta }
    case 'close':  return { type: 'close', ...meta }
    // Legacy types — map to closest equivalent
    default: {
      const t = sp.type as string
      const is2slot = ['duo','stamp','newspaper','scrapbook','filmstrip','diagonal'].includes(t)
      if (is2slot) return { type: 'duo', imgA: get(0), imgB: get(1), ...meta }
      if (t === 'close') return { type: 'close', ...meta }
      return { type: 'single', img: get(0), ...meta }
    }
  }
}

export function fromStoredVintagePages(stored: StoredPage[], urls: Map<number, string>): VintagePageConfig[] {
  return stored.map((sp, i) => {
    // First page always hero (title page with name + intro)
    if (i === 0) {
      const firstUrl = (sp.slots?.[0] != null ? urls.get(sp.slots[0]!) : null) ?? null
      return { type: 'hero', img: firstUrl, showText: sp.showText, text: sp.text }
    }
    return fromStoredVintagePage(sp, urls)
  })
}

// ─── Timeless: TimelessPageConfig[] → StoredPage[] ───────────────────────────

function timelessPageToSlots(page: TimelessPageConfig): (string | null)[] {
  switch (page.type) {
    case 'hero':   return [page.img]
    case 'single': return [page.img]
    case 'duo':    return [page.imgA, page.imgB]
    case 'close':  return []
  }
}

export function toStoredTimelessPages(pages: TimelessPageConfig[], media: EditorMediaItem[]): StoredPage[] {
  return pages.map((page) => ({
    type: page.type,
    slots: timelessPageToSlots(page).map((url) => urlToIndex(url, media)),
    showText: page.showText,
    text: (page as { text?: string }).text,
  }))
}

export function fromStoredTimelessPage(sp: StoredPage, urls: Map<number, string>): TimelessPageConfig {
  const get = (i: number): string | null => indexToUrl(sp.slots[i] ?? null, urls)
  const meta = { showText: sp.showText, text: sp.text }

  switch (sp.type as TimelessPageType) {
    case 'hero':   return { type: 'hero', img: get(0), ...meta }
    case 'single': return { type: 'single', img: get(0), ...meta }
    case 'duo':    return { type: 'duo', imgA: get(0), imgB: get(1), ...meta }
    case 'close':  return { type: 'close', ...meta }
    default: {
      const t = sp.type as string
      const is2slot = ['duo','stamp','newspaper','scrapbook','filmstrip','diagonal'].includes(t)
      if (is2slot) return { type: 'duo', imgA: get(0), imgB: get(1), ...meta }
      if (t === 'close') return { type: 'close', ...meta }
      return { type: 'single', img: get(0), ...meta }
    }
  }
}

export function fromStoredTimelessPages(stored: StoredPage[], urls: Map<number, string>): TimelessPageConfig[] {
  return stored.map((sp, i) => {
    if (i === 0) {
      const firstUrl = (sp.slots?.[0] != null ? urls.get(sp.slots[0]!) : null) ?? null
      return { type: 'hero', img: firstUrl, showText: sp.showText, text: sp.text }
    }
    return fromStoredTimelessPage(sp, urls)
  })
}

// ─── Format detection ─────────────────────────────────────────────────────────

/** Returns true if pages[] is the new StoredPage[] format (has type + slots array) */
export function isStoredPages(pages: unknown[]): pages is StoredPage[] {
  if (!Array.isArray(pages) || pages.length === 0) return false
  const first = pages[0] as Record<string, unknown>
  return typeof first?.type === 'string' && Array.isArray(first?.slots)
}
