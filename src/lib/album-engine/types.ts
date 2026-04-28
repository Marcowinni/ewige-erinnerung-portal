/**
 * Memora Moments — Album-Engine Kern-Typen
 * Zwei Modi: editorial-modern vs. physisches Erinnerungsalbum (classic)
 */

export type AlbumMode = 'modern' | 'classic' | 'timeless' | 'vintage'

export type MediaOrientation = 'portrait' | 'landscape' | 'square'

/** Reichhaltiges Medienmodell (erweiterbar: focusX, featured, …) */
export interface EngineMediaItem {
  id: string
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
  /** später: manuelles Lieblings-/Hero-Bild */
  featured?: boolean
  priority?: number
}

/** Layout-Familie für Rhythmus / Wiederholungs-Strafe (nicht für jedes ID-Detail) */
export type LayoutFamily =
  | 'hero'
  | 'pair_land'
  | 'pair_port'
  | 'triple'
  | 'grid'
  | 'video'
  | 'mixed'
  | 'square'
  | 'feature'
  | 'quiet'

export type ModernLayoutId =
  | 'hero-single-landscape'
  | 'hero-single-portrait'
  | 'two-portraits'
  | 'two-landscapes'
  | 'portrait-left-stack-right'
  | 'landscape-top-two-bottom'
  | 'three-grid-balanced'
  | 'asymmetric-feature'
  | 'mixed-split'
  | 'cinematic-video-feature'
  | 'square-cluster'
  | 'full-bleed-moment'
  | 'quiet-single'
  | 'gallery-break'

export type ClassicLayoutId =
  | 'classic-single-mounted'
  | 'classic-two-photos-offset'
  | 'classic-three-photo-page'
  | 'classic-four-photo-page'
  | 'classic-feature-with-supporting'
  | 'classic-mixed-memory-page'
  | 'classic-video-memory-card'
  | 'classic-collage-balanced'
  | 'classic-portrait-pair'
  | 'classic-landscape-pair'

export type VintageLayoutId =
  | 'vintage-single-polaroid'
  | 'vintage-photo-pair-stacked'
  | 'vintage-triple-scatter'
  | 'vintage-portrait-duo'
  | 'vintage-landscape-feature'
  | 'vintage-memory-collage'
  | 'vintage-video-memory'
  | 'vintage-quiet-page'

/** @deprecated Use VintageLayoutId — kept for backward compat */
export type TimelessLayoutId = VintageLayoutId

export type EngineLayoutId = ModernLayoutId | ClassicLayoutId | VintageLayoutId

export interface LayoutMatchResult {
  ok: boolean
  consume: number
}

export interface LayoutSpec {
  id: EngineLayoutId
  mode: AlbumMode
  family: LayoutFamily
  /** Basis-Attraktivität wenn das Layout passt */
  baseScore: number
  consume: number
  match: (items: EngineMediaItem[]) => LayoutMatchResult
}

export interface EngineAlbumBlock {
  layoutId: EngineLayoutId
  mode: AlbumMode
  family: LayoutFamily
  items: EngineMediaItem[]
  /** Visuelle Untervariante (Hash), stabil pro Position */
  variant: number
}

export type StoryPage =
  | { kind: 'intro'; title: string }
  | { kind: 'outro' }
  | { kind: 'block'; block: EngineAlbumBlock }

export interface BuiltAlbumStory {
  pages: StoryPage[]
}

/** Für spätere Page-Flip-Lib: ungefähre visuelle „Gewichtung“ einer Seite */
export type PageWeight = 'light' | 'medium' | 'rich'
