/**
 * Converts EditorPage[] (from album_layout.pages) + uploaded_files (with id) + signed URLs
 * into typed PageConfig arrays for the Classic / Modern / Vintage viewers.
 *
 * EditorPage.layoutId → viewer page type mapping:
 *   Classic catalog IDs → ClassicPageType
 *   Modern catalog IDs  → PageType
 *   Vintage catalog IDs → VintagePageType
 */

import type { ClassicPageConfig, ClassicPageType } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import type { PageConfig, PageType } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import type { VintagePageConfig, VintagePageType } from '@/components/album-viewer/vintage/VintagePhotoAlbum'
import type { TimelessPageConfig, TimelessPageType } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'
import { isVideoUrl } from '@/lib/mediaType'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EditorPage {
  id: string
  layoutId: string
  mediaIds: string[]
  showText?: boolean
  text?: string
}

// ─── Classic layoutId → ClassicPageType ──────────────────────────────────────

const CLASSIC_LAYOUT_MAP: Record<string, ClassicPageType> = {
  // Classic catalog IDs
  'classic-video-memory-card':     'bleed',
  'classic-single-mounted':        'bleed',
  'classic-feature-with-supporting': 'herald',
  'classic-mixed-memory-page':     'diagonal',
  'classic-three-photo-page':      'diagonal',
  'classic-four-photo-page':       'strip',
  'classic-collage-balanced':      'strip',
  'classic-portrait-pair':         'polaroids',
  'classic-landscape-pair':        'duo',
  'classic-two-photos-offset':     'tape',
  // Modern catalog IDs (cross-mode fallback)
  'cinematic-video-feature':       'bleed',
  'full-bleed-moment':             'bleed',
  'hero-single-landscape':         'bleed',
  'hero-single-portrait':          'bleed',
  'quiet-single':                  'bleed',
  'asymmetric-feature':            'duo',
  'portrait-left-stack-right':     'herald',
  'landscape-top-two-bottom':      'herald',
  'three-grid-balanced':           'diagonal',
  'square-cluster':                'diagonal',
  'two-portraits':                 'polaroids',
  'gallery-break':                 'duo',
  'two-landscapes':                'duo',
  'mixed-split':                   'tape',
  // Vintage catalog IDs
  'vintage-video-memory':          'bleed',
  'vintage-single-polaroid':       'bleed',
  'vintage-landscape-feature':     'bleed',
  'vintage-quiet-page':            'bleed',
  'vintage-portrait-duo':          'polaroids',
  'vintage-photo-pair-stacked':    'duo',
  'vintage-triple-scatter':        'diagonal',
  'vintage-memory-collage':        'strip',
  // Direct type names
  'hero':             'hero',
  'duo':              'duo',
  'herald':           'herald',
  'polaroids':        'polaroids',
  'bleed':            'bleed',
  'strip':            'strip',
  'tape':             'tape',
  'diagonal':         'diagonal',
  'envelope-letter':  'envelope-letter',
  'pinned':           'pinned',
  'close':            'close',
}

// ─── Modern layoutId → PageType ───────────────────────────────────────────────

const MODERN_LAYOUT_MAP: Record<string, PageType> = {
  // Modern catalog
  'cinematic-video-feature':       'bleed',
  'full-bleed-moment':             'bleed',
  'hero-single-landscape':         'bleed',
  'hero-single-portrait':          'bleed',
  'quiet-single':                  'bleed',
  'asymmetric-feature':            'split',
  'portrait-left-stack-right':     'split',
  'landscape-top-two-bottom':      'split',
  'three-grid-balanced':           'split',
  'square-cluster':                'mosaic',
  'two-portraits':                 'twin-portrait',
  'gallery-break':                 'twin-portrait',
  'two-landscapes':                'twin-portrait',
  'mixed-split':                   'twin-portrait',
  // Classic catalog IDs (cross-mode)
  'classic-video-memory-card':     'bleed',
  'classic-single-mounted':        'bleed',
  'classic-feature-with-supporting': 'split',
  'classic-mixed-memory-page':     'split',
  'classic-three-photo-page':      'split',
  'classic-four-photo-page':       'stack',
  'classic-collage-balanced':      'stack',
  'classic-portrait-pair':         'twin-portrait',
  'classic-landscape-pair':        'twin-portrait',
  'classic-two-photos-offset':     'twin-portrait',
  // Vintage catalog
  'vintage-video-memory':          'bleed',
  'vintage-single-polaroid':       'bleed',
  'vintage-landscape-feature':     'bleed',
  'vintage-quiet-page':            'bleed',
  'vintage-portrait-duo':          'twin-portrait',
  'vintage-photo-pair-stacked':    'twin-portrait',
  'vintage-triple-scatter':        'split',
  'vintage-memory-collage':        'mosaic',
  // Direct type names
  'hero':          'hero',
  'split':         'split',
  'bleed':         'bleed',
  'mosaic':        'mosaic',
  'stack':         'stack',
  'story':         'story',
  'quote-card':    'quote-card',
  'twin-portrait': 'twin-portrait',
  'close':         'close',
}

// ─── Timeless layoutId → TimelessPageType (same as Vintage — just renamed) ───

const TIMELESS_LAYOUT_MAP: Record<string, TimelessPageType> = {
  // Vintage/Timeless catalog — 1-slot types → single, 2+-slot types → duo
  'vintage-video-memory':          'single',
  'vintage-single-polaroid':       'single',
  'vintage-landscape-feature':     'single',
  'vintage-quiet-page':            'single',
  'vintage-portrait-duo':          'duo',
  'vintage-photo-pair-stacked':    'duo',
  'vintage-triple-scatter':        'duo',
  'vintage-memory-collage':        'duo',
  // Modern catalog (cross-mode)
  'cinematic-video-feature':       'single',
  'full-bleed-moment':             'single',
  'hero-single-landscape':         'single',
  'hero-single-portrait':          'single',
  'quiet-single':                  'single',
  'asymmetric-feature':            'duo',
  'portrait-left-stack-right':     'duo',
  'landscape-top-two-bottom':      'duo',
  'three-grid-balanced':           'duo',
  'square-cluster':                'duo',
  'two-portraits':                 'duo',
  'gallery-break':                 'duo',
  'two-landscapes':                'duo',
  'mixed-split':                   'duo',
  // Classic catalog
  'classic-video-memory-card':     'single',
  'classic-single-mounted':        'single',
  'classic-feature-with-supporting': 'duo',
  'classic-mixed-memory-page':     'duo',
  'classic-three-photo-page':      'duo',
  'classic-four-photo-page':       'duo',
  'classic-collage-balanced':      'duo',
  'classic-portrait-pair':         'duo',
  'classic-landscape-pair':        'duo',
  'classic-two-photos-offset':     'duo',
  // Direct type names (new)
  'hero':   'hero',
  'single': 'single',
  'duo':    'duo',
  'close':  'close',
  // Legacy direct type names → mapped to new types
  'portrait-split': 'single',
  'letter-bleed':   'single',
  'postcard':       'single',
  'filmstrip':      'duo',
  'stamp':          'duo',
  'newspaper':      'duo',
  'scrapbook':      'duo',
  'diagonal':       'duo',
}

// ─── Vintage layoutId → VintagePageType ──────────────────────────────────────

const VINTAGE_LAYOUT_MAP: Record<string, VintagePageType> = {
  // Vintage catalog — 1-slot types → single, 2+-slot types → duo
  'vintage-video-memory':          'single',
  'vintage-single-polaroid':       'single',
  'vintage-landscape-feature':     'single',
  'vintage-quiet-page':            'single',
  'vintage-portrait-duo':          'duo',
  'vintage-photo-pair-stacked':    'duo',
  'vintage-triple-scatter':        'duo',
  'vintage-memory-collage':        'duo',
  // Modern catalog (cross-mode)
  'cinematic-video-feature':       'single',
  'full-bleed-moment':             'single',
  'hero-single-landscape':         'single',
  'hero-single-portrait':          'single',
  'quiet-single':                  'single',
  'asymmetric-feature':            'duo',
  'portrait-left-stack-right':     'duo',
  'landscape-top-two-bottom':      'duo',
  'three-grid-balanced':           'duo',
  'square-cluster':                'duo',
  'two-portraits':                 'duo',
  'gallery-break':                 'duo',
  'two-landscapes':                'duo',
  'mixed-split':                   'duo',
  // Classic catalog
  'classic-video-memory-card':     'single',
  'classic-single-mounted':        'single',
  'classic-feature-with-supporting': 'duo',
  'classic-mixed-memory-page':     'duo',
  'classic-three-photo-page':      'duo',
  'classic-four-photo-page':       'duo',
  'classic-collage-balanced':      'duo',
  'classic-portrait-pair':         'duo',
  'classic-landscape-pair':        'duo',
  'classic-two-photos-offset':     'duo',
  // Direct type names (new)
  'hero':   'hero',
  'single': 'single',
  'duo':    'duo',
  'close':  'close',
  // Legacy direct type names → mapped to new types
  'portrait-split': 'single',
  'letter-bleed':   'single',
  'postcard':       'single',
  'filmstrip':      'duo',
  'stamp':          'duo',
  'newspaper':      'duo',
  'scrapbook':      'duo',
  'diagonal':       'duo',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isVideoPath(path: string): boolean {
  return isVideoUrl(path)
}

/** Build mediaId → signed URL map from uploaded_files + urls Map from useAlbumImages.
 *  - If f.id present, use it (new flow)
 *  - Also register `file-{idx}-{path}` fallback (legacy AdminAlbum / old self-service orders)
 *  - Also register plain path as id (extra fallback)
 */
export function buildMediaIdUrlMap(
  files: { path: string; id?: string }[],
  urls: Map<number, string>
): Map<string, string> {
  const map = new Map<string, string>()
  files.forEach((f, i) => {
    const url = urls.get(i)
    if (!url) return
    if (f.id) map.set(f.id, url)
    map.set(`file-${i}-${f.path}`, url)
    map.set(f.path, url)
  })
  return map
}

function pickUrl(mediaIds: string[], idx: number, idUrlMap: Map<string, string>): string | null {
  const id = mediaIds[idx]
  if (!id) return null
  return idUrlMap.get(id) ?? null
}

// ─── Classic Conversion ───────────────────────────────────────────────────────

export function editorPagesToClassic(
  editorPages: EditorPage[],
  idUrlMap: Map<string, string>
): ClassicPageConfig[] {
  const result: ClassicPageConfig[] = []
  let typeCounts: Partial<Record<ClassicPageType, number>> = {}
  let textAlternate = true

  for (let i = 0; i < editorPages.length; i++) {
    const ep = editorPages[i]!
    const rawType = CLASSIC_LAYOUT_MAP[ep.layoutId] ?? 'bleed'
    const mediaIds = ep.mediaIds

    // If any media is a video → force bleed layout
    const hasVideo = mediaIds.some((id) => {
      const url = idUrlMap.get(id)
      return url ? isVideoPath(url) : false
    })

    // First page is always hero (title page with name + intro)
    const type: ClassicPageType = i === 0 ? 'hero' : (hasVideo ? 'bleed' : rawType)
    const n = typeCounts[type] ?? 0
    typeCounts[type] = n + 1

    // Use stored showText/text from editor if present, otherwise alternate
    const showText = ep.showText !== undefined ? ep.showText : textAlternate
    textAlternate = !textAlternate
    const text = ep.text

    const p = (idx: number) => pickUrl(mediaIds, idx, idUrlMap)

    switch (type) {
      case 'hero':
        result.push({ type: 'hero', img: p(0), showText, text }); break
      case 'duo':
        result.push({ type: 'duo', imgA: p(0), imgB: p(1), showText, text }); break
      case 'herald':
        result.push({ type: 'herald', hero: p(0), r1: p(1), r2: p(2), showText, text }); break
      case 'polaroids':
        result.push({ type: 'polaroids', imgA: p(0), imgB: p(1), showText, text }); break
      case 'bleed':
        result.push({ type: 'bleed', img: p(0), showText, text }); break
      case 'strip':
        result.push({ type: 'strip', s1: p(0), s2: p(1), s3: p(2), big: p(3), showText, text }); break
      case 'tape':
        result.push({ type: 'tape', imgA: p(0), imgB: p(1), showText, text }); break
      case 'diagonal':
        result.push({ type: 'diagonal', t1: p(0), t2: p(1), t3: p(2), showText, text }); break
      case 'envelope-letter':
        result.push({ type: 'envelope-letter', img: p(0), showText, text }); break
      case 'pinned':
        result.push({ type: 'pinned', imgA: p(0), imgB: p(1), showText, text }); break
      case 'close':
        result.push({ type: 'close', showText: true, text }); break
      default:
        result.push({ type: 'bleed', img: p(0), showText, text }); break
    }
  }

  // Always ensure close page exists at the end
  if (result.length === 0 || result[result.length - 1]?.type !== 'close') {
    result.push({ type: 'close', showText: true })
  }

  return result
}

// ─── Modern Conversion ────────────────────────────────────────────────────────

export function editorPagesToModern(
  editorPages: EditorPage[],
  idUrlMap: Map<string, string>
): PageConfig[] {
  const result: PageConfig[] = []
  let textAlternate = true

  for (let i = 0; i < editorPages.length; i++) {
    const ep = editorPages[i]!
    const rawType = MODERN_LAYOUT_MAP[ep.layoutId] ?? 'bleed'
    const mediaIds = ep.mediaIds

    const hasVideo = mediaIds.some((id) => {
      const url = idUrlMap.get(id)
      return url ? isVideoPath(url) : false
    })

    // First page always hero (title page with name + intro)
    const type: PageType = i === 0 ? 'hero' : (hasVideo ? 'bleed' : rawType)
    const showText = ep.showText !== undefined ? ep.showText : textAlternate
    textAlternate = !textAlternate
    const text = ep.text

    const p = (idx: number) => pickUrl(mediaIds, idx, idUrlMap)

    switch (type) {
      case 'hero':
        result.push({ type: 'hero', img: p(0), showText, text }); break
      case 'split':
        result.push({ type: 'split', imgs: [p(0), p(1), p(2)], showText, text }); break
      case 'bleed':
        result.push({ type: 'bleed', img: p(0), showText, text }); break
      case 'mosaic':
        result.push({ type: 'mosaic', imgs: [p(0), p(1), p(2), p(3), p(4)], showText, text }); break
      case 'stack':
        result.push({ type: 'stack', imgs: [p(0), p(1), p(2), p(3)], showText, text }); break
      case 'story':
        result.push({ type: 'story', bg: p(0), s1: p(1), s2: p(2), s3: p(3), showText, text }); break
      case 'quote-card':
        result.push({ type: 'quote-card', img: p(0), showText, text }); break
      case 'twin-portrait':
        result.push({ type: 'twin-portrait', imgA: p(0), imgB: p(1), showText, text }); break
      case 'close':
        result.push({ type: 'close', showText: true, text }); break
      default:
        result.push({ type: 'bleed', img: p(0), showText, text }); break
    }
  }

  if (result.length === 0 || result[result.length - 1]?.type !== 'close') {
    result.push({ type: 'close', showText: true })
  }

  return result
}

// ─── Vintage Conversion ───────────────────────────────────────────────────────

export function editorPagesToVintage(
  editorPages: EditorPage[],
  idUrlMap: Map<string, string>
): VintagePageConfig[] {
  const result: VintagePageConfig[] = []
  let textAlternate = true

  for (let i = 0; i < editorPages.length; i++) {
    const ep = editorPages[i]!
    const rawType = VINTAGE_LAYOUT_MAP[ep.layoutId] ?? 'letter-bleed'
    const mediaIds = ep.mediaIds

    const hasVideo = mediaIds.some((id) => {
      const url = idUrlMap.get(id)
      return url ? isVideoPath(url) : false
    })

    // First page always hero (title page with name + intro)
    const type: VintagePageType = i === 0 ? 'hero' : (hasVideo ? 'single' : rawType)
    const showText = ep.showText !== undefined ? ep.showText : textAlternate
    textAlternate = !textAlternate
    const text = ep.text

    const p = (idx: number) => pickUrl(mediaIds, idx, idUrlMap)

    switch (type) {
      case 'hero':
        result.push({ type: 'hero', img: p(0), showText, text }); break
      case 'single':
        result.push({ type: 'single', img: p(0), showText, text }); break
      case 'duo':
        result.push({ type: 'duo', imgA: p(0), imgB: p(1), showText, text }); break
      case 'close':
        result.push({ type: 'close', showText: true, text }); break
      default:
        result.push({ type: 'single', img: p(0), showText, text }); break
    }
  }

  if (result.length === 0 || result[result.length - 1]?.type !== 'close') {
    result.push({ type: 'close', showText: true })
  }

  return result
}

// ─── Timeless Conversion ──────────────────────────────────────────────────────

export function editorPagesToTimeless(
  editorPages: EditorPage[],
  idUrlMap: Map<string, string>
): TimelessPageConfig[] {
  const result: TimelessPageConfig[] = []
  let textAlternate = true

  for (let i = 0; i < editorPages.length; i++) {
    const ep = editorPages[i]!
    const rawType = TIMELESS_LAYOUT_MAP[ep.layoutId] ?? 'single'
    const mediaIds = ep.mediaIds

    const hasVideo = mediaIds.some((id) => {
      const url = idUrlMap.get(id)
      return url ? isVideoPath(url) : false
    })

    const type: TimelessPageType = i === 0 ? 'hero' : (hasVideo ? 'single' : rawType)
    const showText = ep.showText !== undefined ? ep.showText : textAlternate
    textAlternate = !textAlternate
    const text = ep.text

    const p = (idx: number) => pickUrl(mediaIds, idx, idUrlMap)

    switch (type) {
      case 'hero':
        result.push({ type: 'hero', img: p(0), showText, text }); break
      case 'single':
        result.push({ type: 'single', img: p(0), showText, text }); break
      case 'duo':
        result.push({ type: 'duo', imgA: p(0), imgB: p(1), showText, text }); break
      case 'close':
        result.push({ type: 'close', showText: true, text }); break
      default:
        result.push({ type: 'single', img: p(0), showText, text }); break
    }
  }

  if (result.length === 0 || result[result.length - 1]?.type !== 'close') {
    result.push({ type: 'close', showText: true })
  }

  return result
}

/** Detect if album_layout.pages contains EditorPages (has layoutId field) */
export function isEditorPages(pages: unknown[]): pages is EditorPage[] {
  if (!Array.isArray(pages) || pages.length === 0) return false
  const first = pages[0] as Record<string, unknown>
  return typeof first?.layoutId === 'string' && Array.isArray(first?.mediaIds)
}
