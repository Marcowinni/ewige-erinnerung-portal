import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { isVideoPath } from '@/lib/album/paths'

const SIGNED_URL_EXPIRY = 3600 // 1 hour

export function useAlbumImages(bucket: string, files: { path: string; caption?: string }[]) {
  const [urls, setUrls] = useState<Map<number, string>>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (files.length === 0) {
      setUrls(new Map())
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    // Note: image transforms require Supabase Pro plan. On Free tier they return 400.
    // Fallback: plain signed URLs. Upload-time client compression handles size.
    Promise.all(
      files.map((f) =>
        supabase.storage.from(bucket).createSignedUrl(f.path, SIGNED_URL_EXPIRY)
      )
    )
      .then((results) => {
        if (cancelled) return
        const newMap = new Map<number, string>()
        results.forEach((r, i) => {
          if (r.data?.signedUrl) newMap.set(i, r.data.signedUrl)
          else if (r.error) setError(r.error.message)
        })
        setUrls(newMap)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Fehler beim Laden der Bilder')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [bucket, files.map((f) => f.path).join('|')])

  const getUrl = (index: number) => urls.get(index) ?? null
  const getCaption = (index: number) => files[index]?.caption ?? ''

  return { urls, getUrl, getCaption, loading, error }
}
