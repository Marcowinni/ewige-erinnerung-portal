import type { PageConfig } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import type { ClassicPageConfig } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import type { TimelessPageConfig } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'

export type SampleMode = 'human' | 'pet'
export type SampleStyle = 'modern' | 'classic' | 'timeless'

export const PET_IMAGES = [
  '/dog_pics/2.jpeg',
  '/dog_pics/3.jpeg',
  '/dog_pics/5.jpeg',
  '/dog_pics/6.jpeg',
  '/dog_pics/7.jpeg',
  '/dog_pics/WhatsApp%20Video%202026-04-24%20at%2014.20.26.mp4',
  '/dog_pics/8.jpeg',
  '/dog_pics/9.jpeg',
  '/dog_pics/88.jpeg',
  '/dog_pics/WhatsApp%20Video%202026-04-24%20at%2014.23.01.mp499.mp4',
  '/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.20.jpeg',
  '/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.204.jpeg',
  '/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.21.jpeg',
  '/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.21.jpeg3.jpeg',
]

// Younger-period media first (filenames marked "alt")
export const HUMAN_IMAGES = [
  '/bilder_eveline/alt.png',
  '/bilder_eveline/alt2.png',
  '/bilder_eveline/alt.mp4',
  '/bilder_eveline/ChatGPT%20Image%2015.%20Sept.%202025,%2019_36_30.png',
  '/bilder_eveline/ChatGPT%20Image%2015.%20Sept.%202025,%2019_36_41.png',
  '/bilder_eveline/ChatGPT%20Image%2015.%20Sept.%202025,%2019_51_53.png',
  '/bilder_eveline/ChatGPT%20Image%2015.%20Sept.%202025,%2020_11_38.png',
  '/bilder_eveline/ChatGPT%20Image%2015.%20Sept.%202025,%2020_17_54.png',
  '/bilder_eveline/image%20(1).png',
  '/bilder_eveline/png%20(2).png',
  '/bilder_eveline/AZlXAzCvM2H1LEa0Xp3Adw-AZlXAzCvAdA8i2d25yiCPw%20(1)%20-%20Trim.mp4',
]

export const SAMPLE_SUBJECT = {
  pet: { name: 'Bello', range: '2010 – 2025' },
  human: { name: 'Eveline', range: '1948 – 2024' },
} as const

// ─── Pet builders ─────────────────────────────────────────────────────────────

export function buildModernPetPages(imgs: string[]): PageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'bleed', img: next(), showText: true, text: 'Ein Augenblick.' },
    { type: 'split', imgs: [next(), next(), next()], showText: true, text: 'Leise Stunden.' },
    { type: 'stack', imgs: [next(), next(), next(), next()], showText: false },
    { type: 'story', bg: next(), s1: next(), s2: next(), s3: next(), showText: true, text: 'Tage, wie sie waren.' },
    { type: 'bleed', img: next(), showText: false },
    { type: 'quote-card', img: next(), showText: true, text: 'Was bleibt, ist Liebe.' },
    { type: 'close', showText: true },
  ]
}

export function buildClassicPetPages(imgs: string[]): ClassicPageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'bleed', img: next(), showText: true, text: 'Im Licht bewahrt.' },
    { type: 'duo', imgA: next(), imgB: next(), showText: true, text: 'Ein gemeinsamer Weg.' },
    { type: 'polaroids', imgA: next(), imgB: next(), showText: true, text: 'Vertraute Tage.' },
    { type: 'tape', imgA: next(), imgB: next(), showText: false, text: '' },
    { type: 'herald', hero: next(), r1: next(), r2: next(), showText: true, text: 'Wie wir Dich kannten.' },
    { type: 'diagonal', t1: next(), t2: next(), t3: next(), showText: true, text: 'Bewahrte Bilder.' },
    { type: 'envelope-letter', img: next(), showText: true, text: 'Momente, die bleiben.' },
    { type: 'pinned', imgA: next(), imgB: next(), showText: true, text: 'Angeheftet. Bewahrt.' },
    { type: 'strip', s1: next(), s2: next(), s3: next(), big: next(), showText: true, text: 'Liebste Augenblicke.' },
    { type: 'close', showText: true },
  ]
}

export function buildTimelessPetPages(imgs: string[]): TimelessPageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'single', img: next(), showText: true, text: 'In Liebe bewahrt.' },
    { type: 'duo', imgA: next(), imgB: next(), showText: true, text: 'Vertraute Zeit.' },
    { type: 'single', img: next(), showText: true, text: 'Unvergessen.' },
    { type: 'duo', imgA: next(), imgB: next(), showText: true, text: 'Kleine Augenblicke.' },
    { type: 'single', img: next(), showText: true, text: 'Im Herzen bewahrt.' },
    { type: 'close', showText: true },
  ]
}

// ─── Human builders — fewer text overlays, copy fits a person's life ─────────

export function buildModernHumanPages(imgs: string[]): PageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'bleed', img: next(), showText: false },
    { type: 'split', imgs: [next(), next(), next()], showText: false },
    { type: 'stack', imgs: [next(), next(), next(), next()], showText: false },
    { type: 'story', bg: next(), s1: next(), s2: next(), s3: next(), showText: true, text: 'Ein erfülltes Leben.' },
    { type: 'bleed', img: next(), showText: false },
    { type: 'quote-card', img: next(), showText: true, text: 'Was bleibt, ist Liebe.' },
    { type: 'close', showText: true },
  ]
}

export function buildClassicHumanPages(imgs: string[]): ClassicPageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'bleed', img: next(), showText: false, text: '' },
    { type: 'duo', imgA: next(), imgB: next(), showText: true, text: 'Vertraute Gesichter.' },
    { type: 'polaroids', imgA: next(), imgB: next(), showText: false, text: '' },
    { type: 'tape', imgA: next(), imgB: next(), showText: false, text: '' },
    { type: 'herald', hero: next(), r1: next(), r2: next(), showText: true, text: 'Wie wir Dich kannten.' },
    { type: 'diagonal', t1: next(), t2: next(), t3: next(), showText: false, text: '' },
    { type: 'envelope-letter', img: next(), showText: true, text: 'In Erinnerung.' },
    { type: 'pinned', imgA: next(), imgB: next(), showText: false, text: '' },
    { type: 'strip', s1: next(), s2: next(), s3: next(), big: next(), showText: false, text: '' },
    { type: 'close', showText: true },
  ]
}

export function buildTimelessHumanPages(imgs: string[]): TimelessPageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'single', img: next(), showText: false, text: '' },
    { type: 'duo', imgA: next(), imgB: next(), showText: false, text: '' },
    { type: 'single', img: next(), showText: true, text: 'Sanft, in Erinnerung.' },
    { type: 'duo', imgA: next(), imgB: next(), showText: false, text: '' },
    { type: 'single', img: next(), showText: false, text: '' },
    { type: 'close', showText: true },
  ]
}

// ─── Public API ──────────────────────────────────────────────────────────────

export interface SampleAlbum {
  slug: string
  mode: SampleMode
  style: SampleStyle
  subjectName: string
  dateRange: string
  images: string[]
  modernPages: PageConfig[]
  classicPages: ClassicPageConfig[]
  timelessPages: TimelessPageConfig[]
  musicSrc: string
}

const MUSIC_BY_MODE = {
  human: '/music/inspiring-emotional-uplifting-piano.mp3',
  pet: '/music/happy-music.mp3',
} as const

function buildAll(mode: SampleMode, style: SampleStyle, slug: string): SampleAlbum {
  const images = mode === 'human' ? HUMAN_IMAGES : PET_IMAGES
  const subject = SAMPLE_SUBJECT[mode]
  return {
    slug,
    mode,
    style,
    subjectName: subject.name,
    dateRange: subject.range,
    images,
    modernPages: mode === 'human' ? buildModernHumanPages(images) : buildModernPetPages(images),
    classicPages: mode === 'human' ? buildClassicHumanPages(images) : buildClassicPetPages(images),
    timelessPages: mode === 'human' ? buildTimelessHumanPages(images) : buildTimelessPetPages(images),
    musicSrc: MUSIC_BY_MODE[mode],
  }
}

const SAMPLE_DEFS: Array<{ slug: string; mode: SampleMode; style: SampleStyle }> = [
  { slug: 'KLASSISCH-MENSCH', mode: 'human', style: 'classic' },
  { slug: 'MODERN-MENSCH', mode: 'human', style: 'modern' },
  { slug: 'ZEITLOS-MENSCH', mode: 'human', style: 'timeless' },
  { slug: 'KLASSISCH-TIER', mode: 'pet', style: 'classic' },
  { slug: 'MODERN-TIER', mode: 'pet', style: 'modern' },
  { slug: 'ZEITLOS-TIER', mode: 'pet', style: 'timeless' },
]

const SAMPLES: Record<string, SampleAlbum> = SAMPLE_DEFS.reduce((acc, d) => {
  acc[d.slug] = buildAll(d.mode, d.style, d.slug)
  return acc
}, {} as Record<string, SampleAlbum>)

export function getSampleAlbum(slug: string | null | undefined): SampleAlbum | null {
  if (!slug) return null
  return SAMPLES[slug.toUpperCase()] ?? null
}

export const SAMPLE_SLUGS = SAMPLE_DEFS.map((d) => d.slug)
