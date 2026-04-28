import type { EngineMediaItem, MediaOrientation } from './types'
import type { MediaItem } from '@/lib/album/mediaTypes'
import { isVideoPath } from '@/lib/album/paths'

export function orientationFromDimensions(width: number, height: number): MediaOrientation {
  if (height <= 0) return 'square'
  const ar = width / height
  if (ar >= 1.06) return 'landscape'
  if (ar <= 0.94) return 'portrait'
  return 'square'
}

export function toEngineMediaItem(m: MediaItem): EngineMediaItem {
  return {
    id: m.id,
    sourceIndex: m.sourceIndex,
    type: m.type,
    url: m.url,
    thumbnailUrl: m.thumbnailUrl,
    width: m.width,
    height: m.height,
    aspectRatio: m.aspectRatio,
    orientation: m.orientation as MediaOrientation,
    caption: m.caption,
    createdAt: m.createdAt,
    featured: undefined,
    priority: undefined,
  }
}

/** Medien aus Storage-Pfaden + geladenen Dimensionen (wie bisher im Viewer) */
export function engineItemsFromSources(
  files: { path: string; caption?: string }[],
  urlList: (string | null)[],
  dimensions: Map<number, { width: number; height: number }>
): EngineMediaItem[] {
  return files.map((f, i) => {
    const dim = dimensions.get(i)
    const w = dim?.width ?? (isVideoPath(f.path) ? 1920 : 1200)
    const h = dim?.height ?? (isVideoPath(f.path) ? 1080 : 800)
    const ar = w / Math.max(h, 1)
    const orientation = orientationFromDimensions(w, h)
    const type = isVideoPath(f.path) ? 'video' : 'image'
    return {
      id: String(i),
      sourceIndex: i,
      type,
      url: urlList[i] ?? '',
      width: w,
      height: h,
      aspectRatio: ar,
      orientation,
      caption: f.caption,
    }
  })
}

/** Länge der aktuellen Serie gleicher Orientierung ab Index */
export function orientationRunLength(items: EngineMediaItem[], startIndex: number): number {
  if (startIndex >= items.length) return 0
  const o = items[startIndex]!.orientation
  let n = 0
  for (let i = startIndex; i < items.length; i++) {
    if (items[i]!.orientation === o) n++
    else break
  }
  return n
}

/** Grobe Kompatibilität für Gruppen (Editorial-Hints) */
export function isLandscapeHeavy(items: EngineMediaItem[]): boolean {
  return items.filter((m) => m.orientation === 'landscape').length >= items.length / 2
}
