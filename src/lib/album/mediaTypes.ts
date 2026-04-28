export type MediaOrientation = 'portrait' | 'landscape' | 'square'

import { isVideoPath } from './paths'

export type MediaItem = {
  id: string
  /** Index in get-album-data files / signed URLs Map */
  sourceIndex: number
  type: 'image' | 'video'
  url: string
  thumbnailUrl?: string
  width: number
  height: number
  aspectRatio: number
  orientation: MediaOrientation
  caption?: string
  createdAt?: string
}

export type LayoutType =
  | 'hero-single'
  | 'two-portraits'
  | 'two-landscapes'
  | 'portrait-left-stack-right'
  | 'landscape-top-two-bottom'
  | 'three-grid'
  | 'four-grid'
  | 'video-feature'
  | 'mixed-split'

export type AlbumBlock = {
  layout: LayoutType
  items: MediaItem[]
}

/** Container slot presets (editorial): nur „gesunde“ Seitenverhältnisse (kein extremes Turm-Hochformat). */
export const SLOT = {
  heroLandscape: '16 / 9',
  standardLandscape: '4 / 3',
  /** Klassischer Portrait-Abzug ≈ 6×8, nicht schmaler Staffelmast */
  portrait: '3 / 4',
  square: '1 / 1',
} as const

export function orientationFromAspectRatio(ar: number): MediaOrientation {
  if (ar > 1.06) return 'landscape'
  if (ar < 0.94) return 'portrait'
  return 'square'
}

export function createMediaItemFromSource(args: {
  sourceIndex: number
  path: string
  url: string | null
  caption?: string
  width?: number
  height?: number
}): MediaItem {
  const { sourceIndex, path, url, caption, width, height } = args
  const isVideo = isVideoPath(path)
  const w = width ?? (isVideo ? 1920 : 1200)
  const h = height ?? (isVideo ? 1080 : 800)
  const ar = w / Math.max(h, 1)
  return {
    id: String(sourceIndex),
    sourceIndex,
    type: isVideo ? 'video' : 'image',
    url: url ?? '',
    width: w,
    height: h,
    aspectRatio: ar,
    orientation: orientationFromAspectRatio(ar),
    caption,
  }
}
