import { useState, useEffect, useMemo } from 'react'

/**
 * Lädt natürliche Seitenverhältnisse (width/height) für Bild-URLs.
 * Wird genutzt, um Raster (Quer/Hoch) sinnvoll zu wählen.
 */
export function useImageAspectRatios(urls: (string | null | undefined)[]) {
  const key = useMemo(() => urls.map((u) => u ?? '').join('|'), [urls])

  const [byIndex, setByIndex] = useState<Map<number, number>>(new Map())

  useEffect(() => {
    setByIndex(new Map())
    let active = true
    urls.forEach((url, i) => {
      if (!url) return
      const img = new Image()
      img.onload = () => {
        if (!active || img.naturalHeight <= 0) return
        const ratio = img.naturalWidth / img.naturalHeight
        setByIndex((prev) => {
          const n = new Map(prev)
          n.set(i, ratio)
          return n
        })
      }
      img.onerror = () => {}
      img.src = url
    })

    return () => {
      active = false
    }
  }, [key])

  return (index: number) => byIndex.get(index)
}

export function layoutForPair(ar0?: number, ar1?: number): 'sideBySide' | 'stacked' {
  const land0 = ar0 !== undefined && ar0 > 1.05
  const land1 = ar1 !== undefined && ar1 > 1.05
  const port0 = ar0 !== undefined && ar0 < 0.95
  const port1 = ar1 !== undefined && ar1 < 0.95
  if (land0 && land1) return 'stacked'
  if (port0 && port1) return 'sideBySide'
  return 'sideBySide'
}

export function layoutForTriple(aspects: (number | undefined)[]): 'heroTop' | 'heroLeft' {
  const defined = aspects.filter((a): a is number => a !== undefined)
  if (defined.length === 0) return 'heroTop'
  const avg = defined.reduce((s, a) => s + a, 0) / defined.length
  return avg > 1.1 ? 'heroTop' : 'heroLeft'
}
