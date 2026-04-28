import type { LayoutType } from './mediaTypes'

/** Deterministisch pro Album-Seite – gleiche Daten → gleiche Variante, aber von Seite zu Seite unterschiedlich */
export function computeBlockVariant(
  blockIndex: number,
  layout: LayoutType,
  firstMediaIndex: number,
  totalMediaCount: number
): number {
  let h =
    blockIndex * 0x9e3779b1 +
    firstMediaIndex * 0x85ebca6b +
    totalMediaCount * 0xc2b2ae35 +
    hashLayout(layout)
  h = Math.imul(h ^ (h >>> 16), 0x7feb352d)
  h = Math.imul(h ^ (h >>> 15), 0x846ca68b)
  return (h ^ (h >>> 16)) >>> 0
}

function hashLayout(layout: LayoutType): number {
  let h = 0
  for (let i = 0; i < layout.length; i++) {
    h = Math.imul(31, h) + layout.charCodeAt(i)
  }
  return h >>> 0
}
