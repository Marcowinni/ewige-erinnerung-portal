import type { EngineMediaItem, LayoutMatchResult, LayoutSpec } from './types'

const land = (m: EngineMediaItem) => m.orientation === 'landscape'
const port = (m: EngineMediaItem) => m.orientation === 'portrait'
const vid = (m: EngineMediaItem) => m.type === 'video'
const img = (m: EngineMediaItem) => m.type === 'image'

function mk(consume: number, predicate: boolean): LayoutMatchResult {
  return { ok: predicate, consume }
}

export const VINTAGE_LAYOUTS: LayoutSpec[] = [
  {
    id: 'vintage-video-memory',
    mode: 'vintage',
    family: 'video',
    baseScore: 220,
    consume: 1,
    match: ([a]) => mk(1, !!a && vid(a)),
  },
  {
    id: 'vintage-single-polaroid',
    mode: 'vintage',
    family: 'hero',
    baseScore: 68,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a)),
  },
  {
    id: 'vintage-landscape-feature',
    mode: 'vintage',
    family: 'feature',
    baseScore: 72,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a) && land(a)),
  },
  {
    id: 'vintage-quiet-page',
    mode: 'vintage',
    family: 'quiet',
    baseScore: 58,
    consume: 1,
    match: ([a]) => mk(1, !!a && img(a) && port(a) && a.aspectRatio <= 1.02),
  },
  {
    id: 'vintage-portrait-duo',
    mode: 'vintage',
    family: 'pair_port',
    baseScore: 65,
    consume: 2,
    match: ([a, b]) => mk(2, !!a && !!b && img(a) && img(b) && port(a) && port(b)),
  },
  {
    id: 'vintage-photo-pair-stacked',
    mode: 'vintage',
    family: 'pair_land',
    baseScore: 62,
    consume: 2,
    match: ([a, b]) => mk(2, !!a && !!b && img(a) && img(b)),
  },
  {
    id: 'vintage-triple-scatter',
    mode: 'vintage',
    family: 'triple',
    baseScore: 55,
    consume: 3,
    match: ([a, b, c]) => mk(3, !!a && !!b && !!c && img(a) && img(b) && img(c)),
  },
  {
    id: 'vintage-memory-collage',
    mode: 'vintage',
    family: 'grid',
    baseScore: 52,
    consume: 4,
    match: ([a, b, c, d]) =>
      mk(4, !!a && !!b && !!c && !!d && img(a) && img(b) && img(c) && img(d)),
  },
]
