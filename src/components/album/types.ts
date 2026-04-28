import type { LayoutType } from '@/lib/album/mediaTypes'
import type { EngineAlbumBlock } from '@/lib/album-engine/types'

export type AlbumPageType =
  | 'intro'
  | 'outro'
  | 'block'
  | 'spread'
  | 'hero'
  | 'single'
  | 'polaroid'
  | 'overlap'
  | 'bento'
  | 'double'
  | 'triple'
  | 'grid'

export interface AlbumLayoutPage {
  type: AlbumPageType
  name?: string
  imageIndex?: number
  imageIndices?: number[]
  /** Template-basiertes Raster (Client aus Metadaten) */
  layout?: LayoutType
  mediaIndices?: number[]
  /** Zufalls-Stil innerhalb gleicher Bildkonstellation (0–3), stabil pro Seite vom Server */
  spreadVariant?: number
  /** Visuelle Untervariante pro Block (0–7), stabil aus Block-Index + Medien */
  blockVariant?: number
  /** Score-basierte Album-Engine (Modern / Classic getrennt) */
  engineBlock?: EngineAlbumBlock
}

export interface AlbumLayout {
  pages: AlbumLayoutPage[]
}

export interface ImageSource {
  bucket: string
  folder: string
  files: { path: string; caption?: string; type?: string; id?: string; focalX?: number; focalY?: number }[]
}

export type { LayoutType } from '@/lib/album/mediaTypes'
export type { EngineAlbumBlock, AlbumMode as EngineAlbumMode } from '@/lib/album-engine/types'
