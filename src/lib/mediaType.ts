import type { EditorMediaItem } from '@/hooks/useAlbumPages'

const VIDEO_EXTS = ['.mp4', '.mov', '.webm', '.m4v', '.ogg', '.avi', '.mkv']

export function isVideoUrl(url: string): boolean {
  const lower = url.split('?')[0]!.toLowerCase()
  return VIDEO_EXTS.some((ext) => lower.endsWith(ext))
}

// Look up media kind by URL — falls back to URL-extension detection
export function lookupMediaKind(url: string, media: EditorMediaItem[]): 'image' | 'video' {
  const m = media.find((x) => x.previewUrl === url)
  if (m) return m.kind
  return isVideoUrl(url) ? 'video' : 'image'
}
