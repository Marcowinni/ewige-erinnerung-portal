import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type Orient = 'L' | 'P' | 'S' | 'U'

/** Eher quer = L (≥1), eher hoch = P (≤0.95), damit keine Quer-Bilder als „P“ in schmalen Spalten landen */
export function classifyOrient(ar?: number): Orient {
  if (ar === undefined) return 'U'
  if (ar >= 1) return 'L'
  if (ar <= 0.95) return 'P'
  return 'S'
}

/** Zwei Bilder nebeneinander volle Höhe → nur sinnvoll, wenn beide messbar hochkant */
function bothMeasuredPortrait(getAspect: ((i: number) => number | undefined) | undefined, ia: number, ib: number): boolean {
  const a = getAspect?.(ia)
  const b = getAspect?.(ib)
  return a !== undefined && b !== undefined && a < 1 && b < 1
}

function bucketByOrient(indices: number[], getAspect?: (i: number) => number | undefined) {
  const L: number[] = []
  const P: number[] = []
  const S: number[] = []
  const U: number[] = []
  for (const i of indices) {
    const o = classifyOrient(getAspect?.(i))
    if (o === 'L') L.push(i)
    else if (o === 'P') P.push(i)
    else if (o === 'S') S.push(i)
    else U.push(i)
  }
  return { L, P, S, U }
}

interface AlbumSpreadProps {
  imageIndices: number[]
  spreadVariant: number
  getImageUrl: (index: number) => string | null
  getCaption: (index: number) => string
  getAspect?: (index: number) => number | undefined
  albumStyle: 'modern' | 'classic' | 'vintage'
  className?: string
}

function Cell({
  idx,
  className,
  getImageUrl,
  getCaption,
  albumStyle,
}: {
  idx: number
  className?: string
  getImageUrl: (i: number) => string | null
  getCaption: (i: number) => string
  albumStyle: 'modern' | 'classic' | 'vintage'
}) {
  const src = getImageUrl(idx)
  const cap = getCaption(idx)
  const isClassic = albumStyle === 'classic'
  if (!src) return <div className={cn('bg-muted/30 min-h-[4rem]', className)} />
  return (
    <div
      className={cn(
        'min-h-0 min-w-0 flex flex-col overflow-hidden',
        isClassic ? 'bg-[#f0ebe3] rounded-sm' : 'bg-neutral-100 rounded-xl',
        className
      )}
    >
      <div className="flex-1 min-h-0 flex items-center justify-center p-1">
        <img src={src} alt={cap} className="max-w-full max-h-full w-auto h-auto object-contain" />
      </div>
      {cap ? (
        <p
          className={cn(
            'shrink-0 text-center text-[11px] sm:text-xs px-1 pb-0.5',
            isClassic ? 'text-amber-900/85' : 'text-foreground/80'
          )}
        >
          {cap}
        </p>
      ) : null}
    </div>
  )
}

function renderGrid(
  cells: { idx: number; className: string }[],
  getImageUrl: (i: number) => string | null,
  getCaption: (i: number) => string,
  albumStyle: 'modern' | 'classic' | 'vintage',
  gridClass: string
) {
  return (
    <div className={cn('grid h-full min-h-0 w-full gap-1.5 sm:gap-2 p-2 sm:p-3', gridClass)}>
      {cells.map(({ idx, className: c }) => (
        <Cell key={`${idx}-${c}`} idx={idx} className={c} getImageUrl={getImageUrl} getCaption={getCaption} albumStyle={albumStyle} />
      ))}
    </div>
  )
}

/**
 * 4:5-Seite: 2×2-Gitter erzeugt wieder 4:5-Zellen → Querformat wirkt winzig.
 * Quer: bevorzugt horizontale Bänder (volle Breite, relativ niedrige Zeile).
 */
export function AlbumSpread({
  imageIndices,
  spreadVariant,
  getImageUrl,
  getCaption,
  getAspect,
  albumStyle,
  className,
}: AlbumSpreadProps) {
  const v = spreadVariant % 4
  const n = imageIndices.length

  const shell = (inner: ReactNode) => (
    <div className={cn('h-full min-h-0 min-w-0 flex flex-col', className)}>{inner}</div>
  )

  if (n === 0) return null

  // ——— 1 Bild ———
  if (n === 1) {
    const idx = imageIndices[0]
    return shell(
      renderGrid([{ idx, className: 'min-h-0' }], getImageUrl, getCaption, albumStyle, 'grid-cols-1 grid-rows-1 auto-rows-fr')
    )
  }

  const { L, P, S, U } = bucketByOrient(imageIndices, getAspect)
  /** Nur echtes Hochkant (P); S/U nie in „3 Hochkant“-Vorlage zwängen */
  const tall = P
  const anyUnknown = U.length > 0
  const [a, b] = imageIndices

  // ——— 2 Bilder ———
  if (n === 2) {
    if (L.length === 1 && P.length === 1) {
      const land = L[0]
      const port = P[0]
      /** Nur volle Breite × Zeile — nie Quer in einer schmalen Seitenspalte auf 4:5 */
      if (v % 2 === 0) {
        return shell(
          renderGrid(
            [
              { idx: land, className: 'col-span-2 min-h-0' },
              { idx: port, className: 'col-span-2 min-h-0 justify-self-center max-w-[78%] w-full' },
            ],
            getImageUrl,
            getCaption,
            albumStyle,
            'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,1.15fr)_1fr]'
          )
        )
      }
      return shell(
        renderGrid(
          [
            { idx: port, className: 'col-span-2 min-h-0 justify-self-center max-w-[78%] w-full' },
            { idx: land, className: 'col-span-2 min-h-0' },
          ],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-2 grid-rows-2 grid-rows-[1fr_minmax(0,1.15fr)]'
        )
      )
    }

    /**
     * Standard: zwei volle Breite — auf 4:5 nie „2 Spalten volle Höhe“ für Quer/Square/Unbekannt
     * (sonst wird die Zelle ~0,4× so breit wie hoch → Miniatur).
     * Seitlich nur, wenn beide Bilder messbar hochkant (AR < 1).
     */
    const sideBySidePortraits =
      !anyUnknown && P.length === 2 && bothMeasuredPortrait(getAspect, a, b) && v % 2 === 0

    if (sideBySidePortraits) {
      return shell(
        renderGrid(
          [{ idx: a, className: 'min-h-0' }, { idx: b, className: 'min-h-0' }],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-2 grid-rows-1'
        )
      )
    }

    const topIdx = v % 2 === 0 ? a : b
    const bottomIdx = topIdx === a ? b : a
    return shell(
      renderGrid(
        [{ idx: topIdx, className: 'min-h-0' }, { idx: bottomIdx, className: 'min-h-0' }],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-1 grid-rows-2 grid-rows-[1fr_1fr]'
      )
    )
  }

  // ——— 3 Bilder ———
  const l0 = L[0]
  const l1 = L[1]
  const l2 = L[2]
  const p0 = P[0]
  const t0 = tall[0]
  const t1 = tall[1]
  const t2 = tall[2]

  /** Solange AR fehlt: drei Querbänder (nie Pseudo-Hochkant-3er) */
  if (anyUnknown && n === 3) {
    const [i0, i1, i2] = imagesSortedForThreeBand(imageIndices, L, P, S, U)
    return shell(
      renderGrid(
        [{ idx: i0, className: 'min-h-0' }, { idx: i1, className: 'min-h-0' }, { idx: i2, className: 'min-h-0' }],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-1 grid-rows-3 grid-rows-[1fr_1fr_1fr]'
      )
    )
  }

  /** Drei echte Querformate: nur horizontale Streifen oder oben 2 quer nebeneinander in niedriger Zeile */
  if (L.length === 3 && l0 !== undefined && l1 !== undefined && l2 !== undefined) {
    if (v === 0) {
      return shell(
        renderGrid(
          [{ idx: l0, className: 'min-h-0' }, { idx: l1, className: 'min-h-0' }, { idx: l2, className: 'min-h-0' }],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-1 grid-rows-3 grid-rows-[1fr_1fr_1fr]'
        )
      )
    }
    if (v === 1) {
      return shell(
        renderGrid(
          [
            { idx: l0, className: 'min-h-0' },
            { idx: l1, className: 'min-h-0' },
            { idx: l2, className: 'col-span-2 min-h-0' },
          ],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.42fr)_minmax(0,0.58fr)]'
        )
      )
    }
    return shell(
      renderGrid(
        [
          { idx: l0, className: 'col-span-2 min-h-0' },
          { idx: l1, className: 'min-h-0' },
          { idx: l2, className: 'min-h-0' },
        ],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.42fr)_minmax(0,0.58fr)]'
      )
    )
  }

  /** Drei Hochformat: nur 3 schmale Spalten, wenn alle messbar hochkant – sonst Bänder */
  if (tall.length === 3 && L.length === 0 && S.length === 0 && t0 !== undefined && t1 !== undefined && t2 !== undefined) {
    const allPortraitMeasured =
      (getAspect?.(t0) ?? 2) < 1 &&
      (getAspect?.(t1) ?? 2) < 1 &&
      (getAspect?.(t2) ?? 2) < 1
    if (v % 2 === 0 && allPortraitMeasured) {
      return shell(
        renderGrid(
          [{ idx: t0, className: 'min-h-0' }, { idx: t1, className: 'min-h-0' }, { idx: t2, className: 'min-h-0' }],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-3 grid-rows-1 min-h-0'
        )
      )
    }
    return shell(
      renderGrid(
        [{ idx: t0, className: 'min-h-0' }, { idx: t1, className: 'min-h-0' }, { idx: t2, className: 'min-h-0' }],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-1 grid-rows-3 grid-rows-[1fr_1fr_1fr]'
      )
    )
  }

  /**
   * 2 Quer + 1 Hochkant: oben zwei Quer nebeneinander in niedriger Zeile (querförmige Zellen),
   * unten Hochkant über volle Breite.
   */
  if (L.length === 2 && tall.length === 1 && l0 !== undefined && l1 !== undefined && t0 !== undefined) {
    if (v % 2 === 0) {
      return shell(
        renderGrid(
          [
            { idx: l0, className: 'min-h-0' },
            { idx: l1, className: 'min-h-0' },
            { idx: t0, className: 'col-span-2 min-h-0 justify-self-center max-w-[85%] w-full' },
          ],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.4fr)_minmax(0,0.6fr)]'
        )
      )
    }
    return shell(
      renderGrid(
        [
          { idx: t0, className: 'col-span-2 min-h-0 justify-self-center max-w-[70%] w-full' },
          { idx: l0, className: 'min-h-0' },
          { idx: l1, className: 'min-h-0' },
        ],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.58fr)_minmax(0,0.42fr)]'
      )
    )
  }

  /**
   * 2 Hochkant + 1 Quer: oben volle Breite Querband, unten zwei Hochkant nebeneinander.
   */
  if (tall.length === 2 && L.length === 1 && t0 !== undefined && t1 !== undefined && l0 !== undefined) {
    if (v % 2 === 0) {
      return shell(
        renderGrid(
          [
            { idx: l0, className: 'col-span-2 min-h-0' },
            { idx: t0, className: 'min-h-0' },
            { idx: t1, className: 'min-h-0' },
          ],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.42fr)_minmax(0,0.58fr)]'
        )
      )
    }
    return shell(
      renderGrid(
        [
          { idx: t0, className: 'min-h-0' },
          { idx: t1, className: 'min-h-0' },
          { idx: l0, className: 'col-span-2 min-h-0' },
        ],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.55fr)_minmax(0,0.45fr)]'
      )
    )
  }

  /** 1L + 1P + Rest (S): kein Hochkant-3er-Layout */
  if (L.length === 1 && P.length === 1 && n === 3) {
    const third = imageIndices.find((i) => i !== l0 && i !== p0)
    if (third !== undefined) {
      const ot = classifyOrient(getAspect?.(third))
      if (ot === 'L' || ot === 'S' || ot === 'U') {
        return shell(
          renderGrid(
            [
              { idx: l0!, className: 'col-span-2 min-h-0' },
              { idx: p0!, className: 'min-h-0' },
              { idx: third, className: 'min-h-0' },
            ],
            getImageUrl,
            getCaption,
            albumStyle,
            'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.42fr)_minmax(0,0.58fr)]'
          )
        )
      }
      if (ot === 'P') {
        return shell(
          renderGrid(
            [
              { idx: l0!, className: 'col-span-2 min-h-0' },
              { idx: p0!, className: 'min-h-0' },
              { idx: third, className: 'min-h-0' },
            ],
            getImageUrl,
            getCaption,
            albumStyle,
            'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.38fr)_minmax(0,0.62fr)]'
          )
        )
      }
    }
  }

  /** 2L + 1S (nur Quadrate „mitte“): wie 3 Quer */
  if (L.length === 2 && S.length === 1 && l0 !== undefined && l1 !== undefined) {
    const s0 = S[0]
    if (v % 2 === 0) {
      return shell(
        renderGrid(
          [
            { idx: l0, className: 'min-h-0' },
            { idx: l1, className: 'min-h-0' },
            { idx: s0, className: 'col-span-2 min-h-0' },
          ],
          getImageUrl,
          getCaption,
          albumStyle,
          'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.4fr)_minmax(0,0.6fr)]'
        )
      )
    }
    return shell(
      renderGrid(
        [{ idx: l0, className: 'min-h-0' }, { idx: l1, className: 'min-h-0' }, { idx: s0, className: 'min-h-0' }],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-1 grid-rows-3 grid-rows-[1fr_1fr_1fr]'
      )
    )
  }

  /** 1L + 2S */
  if (L.length === 1 && S.length === 2 && P.length === 0 && l0 !== undefined) {
    const [s0, s1] = S
    return shell(
      renderGrid(
        [
          { idx: l0, className: 'col-span-2 min-h-0' },
          { idx: s0, className: 'min-h-0' },
          { idx: s1, className: 'min-h-0' },
        ],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-2 grid-rows-2 grid-rows-[minmax(0,0.42fr)_minmax(0,0.58fr)]'
      )
    )
  }

  /** 3× Quadrat: drei gleiche Streifen */
  if (L.length === 0 && P.length === 0 && S.length === 3) {
    const [s0, s1, s2] = S
    return shell(
      renderGrid(
        [{ idx: s0, className: 'min-h-0' }, { idx: s1, className: 'min-h-0' }, { idx: s2, className: 'min-h-0' }],
        getImageUrl,
        getCaption,
        albumStyle,
        'grid-cols-1 grid-rows-3 grid-rows-[1fr_1fr_1fr]'
      )
    )
  }

  const [i0, i1, i2] = imageIndices
  return shell(
    renderGrid(
      [
        { idx: i0, className: 'min-h-0' },
        { idx: i1, className: 'min-h-0' },
        { idx: i2, className: 'min-h-0' },
      ],
      getImageUrl,
      getCaption,
      albumStyle,
      'grid-cols-1 grid-rows-3 grid-rows-[1fr_1fr_1fr]'
    )
  )
}

/** Reihenfolge für Bänder: bekannte L zuerst, dann S, dann P */
function imagesSortedForThreeBand(
  imageIndices: number[],
  L: number[],
  P: number[],
  S: number[],
  U: number[]
): [number, number, number] {
  const rest = [...imageIndices]
  const pickOrder = [...L, ...S, ...U, ...P]
  const out: number[] = []
  for (const idx of pickOrder) {
    if (out.length >= 3) break
    if (out.includes(idx)) continue
    out.push(idx)
  }
  for (const idx of rest) {
    if (out.length >= 3) break
    if (!out.includes(idx)) out.push(idx)
  }
  return [out[0]!, out[1]!, out[2]!]
}
