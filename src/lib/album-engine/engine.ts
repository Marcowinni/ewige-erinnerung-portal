import { catalogForMode } from './catalog'
import { orientationRunLength } from './media'
import type {
  AlbumMode,
  EngineAlbumBlock,
  EngineLayoutId,
  EngineMediaItem,
  LayoutFamily,
  LayoutSpec,
} from './types'

function hashVariant(index: number, layoutId: EngineLayoutId): number {
  let h = index * 0x9e3779b9
  for (let i = 0; i < layoutId.length; i++) {
    h = Math.imul(h ^ layoutId.charCodeAt(i), 0x85ebca6b)
  }
  return h >>> 0
}

function scoreSpec(
  spec: LayoutSpec,
  index: number,
  all: EngineMediaItem[],
  recentFamilies: LayoutFamily[],
  recentLayoutIds: EngineLayoutId[]
): { score: number; consume: number } | null {
  const slice = all.slice(index)
  const result = spec.match(slice)
  if (!result.ok || result.consume < 1) return null

  const first = slice[0]!
  if (first.type === 'video' && spec.family !== 'video') return null
  if (first.type !== 'video' && spec.family === 'video') return null

  let s = spec.baseScore

  const lastF = recentFamilies[recentFamilies.length - 1]
  const lastF2 = recentFamilies[recentFamilies.length - 2]
  if (spec.family === lastF) s -= 52
  if (spec.family === lastF2) s -= 26

  const lastId = recentLayoutIds[recentLayoutIds.length - 1]
  if (spec.id === lastId) s -= 44

  const run = orientationRunLength(all, index)
  if (run >= 4 && spec.family === 'pair_land') s -= 62
  if (run >= 3 && spec.family === 'hero') s += 34
  if (run >= 3 && spec.family === 'feature') s += 22
  if (run >= 3 && spec.family === 'quiet') s += 14
  if (run >= 6 && spec.family === 'pair_land') s -= 90

  if (lastF === 'grid' && spec.family === 'grid') s -= 38

  return { score: s, consume: result.consume }
}

function fallbackBlock(i: number, item: EngineMediaItem, mode: AlbumMode): EngineAlbumBlock {
  if (item.type === 'video') {
    const layoutId =
      mode === 'modern'
        ? 'cinematic-video-feature'
        : mode === 'classic'
          ? 'classic-video-memory-card'
          : 'vintage-video-memory'
    return {
      layoutId,
      mode,
      family: 'video',
      items: [item],
      variant: hashVariant(i, layoutId),
    }
  }
  const layoutId =
    mode === 'modern'
      ? 'hero-single-landscape'
      : mode === 'classic'
        ? 'classic-single-mounted'
        : 'vintage-single-polaroid'
  return {
    layoutId,
    mode,
    family: 'hero',
    items: [item],
    variant: hashVariant(i, layoutId),
  }
}

/**
 * Score-basierte Block-Kette: Kandidaten aus Katalog, Wiederholungs- und Serien-Strafen,
 * stabil pro Medienliste.
 */
export function buildEngineBlocks(items: EngineMediaItem[], mode: AlbumMode): EngineAlbumBlock[] {
  const catalog = catalogForMode(mode)
  const blocks: EngineAlbumBlock[] = []
  const recentFamilies: LayoutFamily[] = []
  const recentIds: EngineLayoutId[] = []
  let i = 0

  while (i < items.length) {
    let best: { spec: LayoutSpec; score: number; consume: number } | null = null

    for (const spec of catalog) {
      const scored = scoreSpec(spec, i, items, recentFamilies, recentIds)
      if (!scored) continue
      if (!best || scored.score > best.score) {
        best = { spec, score: scored.score, consume: scored.consume }
      } else if (best && scored.score === best.score && spec.baseScore > best.spec.baseScore) {
        best = { spec, score: scored.score, consume: scored.consume }
      }
    }

    if (!best) {
      const fb = fallbackBlock(blocks.length, items[i]!, mode)
      blocks.push(fb)
      recentFamilies.push(fb.family)
      recentIds.push(fb.layoutId)
      if (recentFamilies.length > 10) recentFamilies.shift()
      if (recentIds.length > 10) recentIds.shift()
      i += 1
      continue
    }

    const slice = items.slice(i, i + best.consume)
    blocks.push({
      layoutId: best.spec.id,
      mode,
      family: best.spec.family,
      items: slice,
      variant: hashVariant(blocks.length, best.spec.id),
    })
    recentFamilies.push(best.spec.family)
    recentIds.push(best.spec.id)
    if (recentFamilies.length > 10) recentFamilies.shift()
    if (recentIds.length > 10) recentIds.shift()
    i += best.consume
  }

  return blocks
}
