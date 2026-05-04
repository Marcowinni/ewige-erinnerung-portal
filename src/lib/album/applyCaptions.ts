// Applies user-supplied per-image captions to a pre-built album pages array.
// Album viewers only render ONE text overlay per page, so we pick the first
// image on the page that actually has a caption. If no image on the page is
// captioned, the page keeps its default text (or none).
//
// Generic over modern / classic / timeless page configs — they all share
// `text?: string`, `showText?: boolean`, plus image fields (img / imgs[] /
// imgA + imgB / hero + r1 + r2 / s1 + s2 + s3 / bg + s* / t1..t3).

type AnyPage = Record<string, any>

const IMAGE_KEYS = [
  'img', 'imgA', 'imgB', 'hero', 'r1', 'r2', 'bg',
  's1', 's2', 's3', 't1', 't2', 't3', 'big',
] as const

function imagesOf(page: AnyPage): string[] {
  const out: string[] = []
  for (const k of IMAGE_KEYS) {
    const v = page[k]
    if (typeof v === 'string' && v.length > 0) out.push(v)
  }
  if (Array.isArray(page.imgs)) {
    for (const v of page.imgs) {
      if (typeof v === 'string' && v.length > 0) out.push(v)
    }
  }
  return out
}

export function applyCaptions<T extends AnyPage>(
  pages: T[],
  captionsByPath: Record<string, string> | undefined,
): T[] {
  if (!captionsByPath || Object.keys(captionsByPath).length === 0) return pages
  return pages.map((page) => {
    // Skip hero / close — those carry their own scaffolding text
    if (page.type === 'hero' || page.type === 'close') return page
    for (const img of imagesOf(page)) {
      const cap = captionsByPath[img]?.trim()
      if (cap) return { ...page, text: cap, showText: true } as T
    }
    return page
  })
}
