import type { AlbumBlock, MediaItem, MediaOrientation } from './mediaTypes'
import { computeBlockVariant } from './blockVariant'

function isImage(m: MediaItem): boolean {
  return m.type === 'image'
}

function bothImage(a: MediaItem, b: MediaItem | undefined): b is MediaItem {
  return !!b && isImage(a) && isImage(b)
}

function allImages(a: MediaItem, b: MediaItem, c: MediaItem): boolean {
  return isImage(a) && isImage(b) && isImage(c)
}

function allImages4(a: MediaItem, b: MediaItem, c: MediaItem, d: MediaItem): boolean {
  return allImages(a, b, c) && isImage(d)
}

/**
 * Editoriale Block-Kette: Videos eigenständig, Paare nach Orientierung,
 * Dreier/ Vierer mit klaren Vorlagen, sonst lieber hero-single als „schlechtes“ Raster.
 */
export function buildAlbumBlocks(items: MediaItem[]): AlbumBlock[] {
  const out: AlbumBlock[] = []
  let i = 0
  /** Vermeidet 3+ Seiten hintereinander im gleichen Doppel-Quer-Raster */
  let streakTwoLandscapeBands = 0

  while (i < items.length) {
    const cur = items[i]

    if (cur.type === 'video') {
      out.push({ layout: 'video-feature', items: [cur] })
      streakTwoLandscapeBands = 0
      i += 1
      continue
    }

    const next = items[i + 1]
    const third = items[i + 2]
    const fourth = items[i + 3]

    if (!next) {
      out.push({ layout: 'hero-single', items: [cur] })
      streakTwoLandscapeBands = 0
      i += 1
      continue
    }

    // Video direkt nach Bild: nicht zwanghaft paaren
    if (next.type === 'video') {
      out.push({ layout: 'hero-single', items: [cur] })
      streakTwoLandscapeBands = 0
      i += 1
      continue
    }

    if (
      fourth &&
      third &&
      allImages4(cur, next, third, fourth) &&
      cur.orientation === next.orientation &&
      next.orientation === third.orientation &&
      third.orientation === fourth.orientation
    ) {
      out.push({ layout: 'four-grid', items: [cur, next, third, fourth] })
      streakTwoLandscapeBands = 0
      i += 4
      continue
    }

    /**
     * Zwei Quer (oder zwei Quadrate): nicht immer „two-landscapes“ —
     * Hash + Streak sorgen für Abwechslung mit großem hero-single.
     */
    if (
      bothImage(cur, next) &&
      ((cur.orientation === 'landscape' && next.orientation === 'landscape') ||
        (cur.orientation === 'square' && next.orientation === 'square'))
    ) {
      const h = computeBlockVariant(out.length, 'two-landscapes', cur.sourceIndex, items.length)
      const preferPair = (h & 1) === 0 && streakTwoLandscapeBands < 2
      if (preferPair) {
        out.push({ layout: 'two-landscapes', items: [cur, next] })
        streakTwoLandscapeBands += 1
        i += 2
      } else {
        out.push({ layout: 'hero-single', items: [cur] })
        streakTwoLandscapeBands = 0
        i += 1
      }
      continue
    }

    if (bothImage(cur, next)) {
      const pairLayout = layoutForPair(cur.orientation, next.orientation)
      if (pairLayout) {
        out.push({ layout: pairLayout, items: [cur, next] })
        streakTwoLandscapeBands = 0
        i += 2
        continue
      }
    }

    if (third && bothImage(cur, next) && isImage(third)) {
      const tri = layoutForTriple(cur, next, third)
      if (tri) {
        out.push({ layout: tri.layout, items: tri.items })
        streakTwoLandscapeBands = 0
        i += 3
        continue
      }
    }

    // Kein sauberes Triple: lieber starkes Paar als Miniatur-Held
    if (third && bothImage(cur, next) && isImage(third)) {
      out.push({ layout: 'mixed-split', items: [cur, next] })
      streakTwoLandscapeBands = 0
      i += 2
      continue
    }

    // Verbleibendes Paar ohne passendes Template
    if (bothImage(cur, next)) {
      out.push({ layout: 'mixed-split', items: [cur, next] })
      streakTwoLandscapeBands = 0
      i += 2
      continue
    }

    out.push({ layout: 'hero-single', items: [cur] })
    streakTwoLandscapeBands = 0
    i += 1
  }

  return out
}

function layoutForPair(
  a: MediaOrientation,
  b: MediaOrientation
): 'two-portraits' | 'two-landscapes' | 'mixed-split' | null {
  if (a === 'portrait' && b === 'portrait') return 'two-portraits'
  /* L+L und S+S werden vorher in buildAlbumBlocks gesondert behandelt */
  if ((a === 'portrait' && b === 'landscape') || (a === 'landscape' && b === 'portrait')) return 'mixed-split'
  if (a === 'square' || b === 'square') return 'mixed-split'
  return null
}

function layoutForTriple(
  x: MediaItem,
  y: MediaItem,
  z: MediaItem
): { layout: AlbumBlock['layout']; items: MediaItem[] } | null {
  const items = [x, y, z]
  const Ls = items.filter((m) => m.orientation === 'landscape')
  const Ps = items.filter((m) => m.orientation === 'portrait')
  const Ss = items.filter((m) => m.orientation === 'square')

  // 1 Hoch + 2 Quer → links Hoch, rechts zwei Quer
  if (Ps.length === 1 && Ls.length === 2) {
    return { layout: 'portrait-left-stack-right', items: [Ps[0]!, Ls[0]!, Ls[1]!] }
  }

  // 1 Quer oben + 2 Hoch unten
  if (Ls.length === 1 && Ps.length === 2) {
    return { layout: 'landscape-top-two-bottom', items: [Ls[0]!, Ps[0]!, Ps[1]!] }
  }

  const allLand = Ls.length === 3
  const allPort = Ps.length === 3
  const allSq = Ss.length === 3
  if (allLand || allPort || allSq) {
    return { layout: 'three-grid', items: [x, y, z] }
  }

  // Gemischt mit Quadraten → einheitlich three-grid (editorial, keine schmalen Quer-Spalten)
  if (Ss.length > 0) {
    return { layout: 'three-grid', items: [x, y, z] }
  }

  return null
}
