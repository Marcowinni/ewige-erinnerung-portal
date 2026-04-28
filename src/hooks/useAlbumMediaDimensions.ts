import { useEffect, useMemo, useState } from 'react'
import { isVideoPath } from '@/lib/album/paths'

export type MediaDimensions = { width: number; height: number }

/**
 * Lädt natürliche Breite/Höhe für jede URL (Bild oder Video-Metadaten).
 * wird bei jeder geladenen Datei neu gerendert (dimensions-Map ändert sich).
 */
export function useAlbumMediaDimensions(urls: (string | null | undefined)[], paths: string[]) {
  const key = useMemo(() => urls.map((u) => u ?? '').join('|') + paths.join('|'), [urls, paths])

  const [dimensions, setDimensions] = useState<Map<number, MediaDimensions>>(new Map())

  useEffect(() => {
    setDimensions(new Map())
    let active = true

    urls.forEach((url, i) => {
      const path = paths[i] ?? ''
      if (!url) return

      if (isVideoPath(path)) {
        const v = document.createElement('video')
        v.preload = 'metadata'
        v.muted = true
        const done = () => {
          if (!active || v.videoWidth <= 0) return
          setDimensions((prev) => {
            const n = new Map(prev)
            n.set(i, { width: v.videoWidth, height: v.videoHeight })
            return n
          })
        }
        v.onloadedmetadata = done
        v.onerror = () => {
          if (!active) return
          setDimensions((prev) => {
            const n = new Map(prev)
            if (!n.has(i)) n.set(i, { width: 1920, height: 1080 })
            return n
          })
        }
        v.src = url
        return
      }

      const img = new Image()
      img.onload = () => {
        if (!active || img.naturalHeight <= 0) return
        setDimensions((prev) => {
          const n = new Map(prev)
          n.set(i, { width: img.naturalWidth, height: img.naturalHeight })
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

  const getDim = (index: number) => dimensions.get(index)

  return { dimensions, getDim }
}

export function countReadyDimensions(
  urls: (string | null | undefined)[],
  dimensions: Map<number, MediaDimensions>
): number {
  let n = 0
  for (let i = 0; i < urls.length; i++) {
    if (!urls[i]) continue
    if (dimensions.has(i)) n++
  }
  return n
}

export function countUrls(urls: (string | null | undefined)[]): number {
  return urls.filter(Boolean).length
}
