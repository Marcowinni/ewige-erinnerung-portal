// Applies user-supplied per-image captions to a pre-built album pages array.
// Walks each page, finds its first non-null image, looks up caption by that
// image path. If a caption exists, overrides page.text and forces showText:true.
//
// Generic over modern / classic / timeless page configs — they all share
// `text?: string`, `showText?: boolean`, plus image fields (img / imgs[] /
// imgA + imgB / hero + r1 + r2 / s1 + s2 + s3 / bg + s* / t1..t3).

type AnyPage = Record<string, any>

const IMAGE_KEYS = [
  'img', 'imgA', 'imgB', 'hero', 'r1', 'r2', 'bg',
  's1', 's2', 's3', 't1', 't2', 't3', 'big',
] as const

function firstImageOf(page: AnyPage): string | null {
  // Direct keys
  for (const k of IMAGE_KEYS) {
    const v = page[k]
    if (typeof v === 'string' && v.length > 0) return v
  }
  // Array key (e.g. modern split / mosaic / stack)
  if (Array.isArray(page.imgs)) {
    for (const v of page.imgs) {
      if (typeof v === 'string' && v.length > 0) return v
    }
  }
  return null
}

export function applyCaptions<T extends AnyPage>(
  pages: T[],
  captionsByPath: Record<string, string> | undefined,
): T[] {
  if (!captionsByPath || Object.keys(captionsByPath).length === 0) return pages
  return pages.map((page) => {
    // Skip hero / close — those carry their own scaffolding text
    if (page.type === 'hero' || page.type === 'close') return page
    const firstImg = firstImageOf(page)
    if (!firstImg) return page
    const cap = captionsByPath[firstImg]?.trim()
    if (!cap) return page
    return { ...page, text: cap, showText: true } as T
  })
}
