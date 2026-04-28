import type { EngineMediaItem, LayoutMatchResult, LayoutSpec } from './types'
import { VINTAGE_LAYOUTS } from './vintage-catalog'

const land = (m: EngineMediaItem) => m.orientation === 'landscape'
const port = (m: EngineMediaItem) => m.orientation === 'portrait'
const sq = (m: EngineMediaItem) => m.orientation === 'square'
const vid = (m: EngineMediaItem) => m.type === 'video'
const img = (m: EngineMediaItem) => m.type === 'image'

function mk(consume: number, predicate: boolean): LayoutMatchResult {
  return { ok: predicate, consume }
}

/** Editorial: 3× Quadrat */
function matchSquareTrio(a?: EngineMediaItem, b?: EngineMediaItem, c?: EngineMediaItem) {
  return !!a && !!b && !!c && img(a) && img(b) && img(c) && sq(a) && sq(b) && sq(c)
}

/** MODERN */
export const MODERN_LAYOUTS: LayoutSpec[] = [
  {
    id: 'cinematic-video-feature',
    mode: 'modern',
    family: 'video',
    baseScore: 220,
    consume: 1,
    match: ([a]) => mk(1, !!a && vid(a)),
  },
  {
    id: 'full-bleed-moment',
    mode: 'modern',
    family: 'hero',
    baseScore: 124,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a) && land(a) && a.aspectRatio >= 1.38),
  },
  {
    id: 'hero-single-landscape',
    mode: 'modern',
    family: 'hero',
    baseScore: 108,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a) && (land(a) || sq(a)) && a.aspectRatio < 1.38),
  },
  {
    id: 'hero-single-portrait',
    mode: 'modern',
    family: 'hero',
    baseScore: 104,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a) && port(a)),
  },
  {
    id: 'quiet-single',
    mode: 'modern',
    family: 'quiet',
    baseScore: 86,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a) && port(a) && a.aspectRatio <= 1.02),
  },
  {
    id: 'asymmetric-feature',
    mode: 'modern',
    family: 'feature',
    baseScore: 128,
    consume: 2,
    match: ([a, b]) =>
      mk(
        2,
        !!a &&
          !!b &&
          img(a) &&
          img(b) &&
          (a.featured === true || (land(a) && a.aspectRatio >= 1.52))
      ),
  },
  {
    id: 'portrait-left-stack-right',
    mode: 'modern',
    family: 'triple',
    baseScore: 132,
    consume: 3,
    match: ([a, b, c]) => {
      if (!a || !b || !c || !img(a) || !img(b) || !img(c)) return mk(3, false)
      const Ps = [a, b, c].filter(port).length
      const Ls = [a, b, c].filter(land).length
      return mk(3, Ps === 1 && Ls === 2)
    },
  },
  {
    id: 'landscape-top-two-bottom',
    mode: 'modern',
    family: 'triple',
    baseScore: 130,
    consume: 3,
    match: ([a, b, c]) => {
      if (!a || !b || !c || !img(a) || !img(b) || !img(c)) return mk(3, false)
      const Ps = [a, b, c].filter(port).length
      const Ls = [a, b, c].filter(land).length
      return mk(3, Ls === 1 && Ps === 2)
    },
  },
  {
    id: 'three-grid-balanced',
    mode: 'modern',
    family: 'grid',
    baseScore: 78,
    consume: 3,
    match: ([a, b, c]) => {
      if (!a || !b || !c || !img(a) || !img(b) || !img(c)) return mk(3, false)
      const Ps = [a, b, c].filter(port).length
      const Ls = [a, b, c].filter(land).length
      if (Ps === 1 && Ls === 2) return mk(3, false)
      if (Ls === 1 && Ps === 2) return mk(3, false)
      return mk(3, true)
    },
  },
  {
    id: 'square-cluster',
    mode: 'modern',
    family: 'square',
    baseScore: 102,
    consume: 3,
    match: ([a, b, c]) => mk(3, matchSquareTrio(a, b, c)),
  },
  {
    id: 'two-portraits',
    mode: 'modern',
    family: 'pair_port',
    baseScore: 112,
    consume: 2,
    match: ([a, b]) => mk(2, !!a && !!b && img(a) && img(b) && port(a) && port(b)),
  },
  {
    id: 'gallery-break',
    mode: 'modern',
    family: 'pair_land',
    baseScore: 105,
    consume: 2,
    match: ([a, b]) => mk(2, !!a && !!b && img(a) && img(b) && land(a) && land(b)),
  },
  {
    id: 'two-landscapes',
    mode: 'modern',
    family: 'pair_land',
    baseScore: 100,
    consume: 2,
    match: ([a, b]) => mk(2, !!a && !!b && img(a) && img(b) && land(a) && land(b)),
  },
  {
    id: 'mixed-split',
    mode: 'modern',
    family: 'mixed',
    baseScore: 108,
    consume: 2,
    match: ([a, b]) =>
      mk(
        2,
        !!a &&
          !!b &&
          img(a) &&
          img(b) &&
          ((port(a) && land(b)) || (land(a) && port(b)) || sq(a) || sq(b))
      ),
  },
]

/** CLASSIC — physisch, Erinnerungsalbum */
export const CLASSIC_LAYOUTS: LayoutSpec[] = [
  {
    id: 'classic-video-memory-card',
    mode: 'classic',
    family: 'video',
    baseScore: 220,
    consume: 1,
    match: ([a]) => mk(1, !!a && vid(a)),
  },
  {
    id: 'classic-single-mounted',
    mode: 'classic',
    family: 'hero',
    baseScore: 110,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a)),
  },
  {
    id: 'classic-feature-with-supporting',
    mode: 'classic',
    family: 'feature',
    baseScore: 125,
    consume: 3,
    match: ([a, b, c]) => {
      if (!a || !b || !c || !img(a) || !img(b) || !img(c)) return mk(3, false)
      const Ls = [a, b, c].filter(land).length
      const Ps = [a, b, c].filter(port).length
      return mk(3, Ls === 1 && Ps === 2)
    },
  },
  {
    id: 'classic-mixed-memory-page',
    mode: 'classic',
    family: 'triple',
    baseScore: 100,
    consume: 3,
    match: ([a, b, c]) => mk(3, !!a && !!b && !!c && img(a) && img(b) && img(c)),
  },
  {
    id: 'classic-three-photo-page',
    mode: 'classic',
    family: 'triple',
    baseScore: 98,
    consume: 3,
    match: ([a, b, c]) => {
      if (!a || !b || !c || !img(a) || !img(b) || !img(c)) return mk(3, false)
      const Ps = [a, b, c].filter(port).length
      return mk(3, Ps === 3)
    },
  },
  {
    id: 'classic-four-photo-page',
    mode: 'classic',
    family: 'grid',
    baseScore: 94,
    consume: 4,
    match: ([a, b, c, d]) => {
      if (!a || !b || !c || !d || !img(a) || !img(b) || !img(c) || !img(d)) return mk(4, false)
      const o = a.orientation
      return mk(4, b.orientation === o && c.orientation === o && d.orientation === o)
    },
  },
  {
    id: 'classic-collage-balanced',
    mode: 'classic',
    family: 'grid',
    baseScore: 96,
    consume: 4,
    match: ([a, b, c, d]) => {
      if (!a || !b || !c || !d || !img(a) || !img(b) || !img(c) || !img(d)) return mk(4, false)
      const set = new Set([a.orientation, b.orientation, c.orientation, d.orientation])
      return mk(4, set.size >= 2)
    },
  },
  {
    id: 'classic-portrait-pair',
    mode: 'classic',
    family: 'pair_port',
    baseScore: 112,
    consume: 2,
    match: ([a, b]) => mk(2, !!a && !!b && img(a) && img(b) && port(a) && port(b)),
  },
  {
    id: 'classic-landscape-pair',
    mode: 'classic',
    family: 'pair_land',
    baseScore: 102,
    consume: 2,
    match: ([a, b]) => mk(2, !!a && !!b && img(a) && img(b) && land(a) && land(b)),
  },
  {
    id: 'classic-two-photos-offset',
    mode: 'classic',
    family: 'mixed',
    baseScore: 99,
    consume: 2,
    match: ([a, b]) =>
      mk(
        2,
        !!a &&
          !!b &&
          img(a) &&
          img(b) &&
          (!(land(a) && land(b)) || sq(a) || sq(b))
      ),
  },
]

export function catalogForMode(mode: 'modern' | 'classic' | 'timeless' | 'vintage'): LayoutSpec[] {
  if (mode === 'modern') return MODERN_LAYOUTS
  if (mode === 'classic') return CLASSIC_LAYOUTS
  // 'timeless' is the renamed 'vintage' — same catalog
  return VINTAGE_LAYOUTS
}
