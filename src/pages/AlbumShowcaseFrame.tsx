import { useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ModernPhotoAlbum, type PageConfig } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import { ClassicPhotoAlbum, type ClassicPageConfig } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import { TimelessPhotoAlbum, type TimelessPageConfig } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'

type ShowcaseMode = 'human' | 'pet'

const PET_IMAGES = [
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
const HUMAN_IMAGES = [
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

const SUBJECT = {
  pet: { name: 'Bello', range: '2010 – 2025' },
  human: { name: 'Eveline', range: '1948 – 2024' },
} as const

// ─── Pet builders (existing copy + density) ──────────────────────────────────

function buildModernPetPages(imgs: string[]): PageConfig[] {
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

function buildClassicPetPages(imgs: string[]): ClassicPageConfig[] {
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

function buildTimelessPetPages(imgs: string[]): TimelessPageConfig[] {
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

function buildModernHumanPages(imgs: string[]): PageConfig[] {
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

function buildClassicHumanPages(imgs: string[]): ClassicPageConfig[] {
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

function buildTimelessHumanPages(imgs: string[]): TimelessPageConfig[] {
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

export default function AlbumShowcaseFrame() {
  const { theme } = useParams<{ theme: string }>()
  const [params] = useSearchParams()
  const auto = params.get('auto') === '1'
  const mode: ShowcaseMode = params.get('mode') === 'human' ? 'human' : 'pet'

  // Auto-advance only when ?auto=1 is set (e.g. wizard step 2 iframes).
  // Homepage StyleShowcase loads without the query and stays manual.
  useEffect(() => {
    if (!auto) return
    const tick = () => {
      const next = document.querySelector<HTMLButtonElement>('[aria-label="Weiter"], [aria-label="Next"], [aria-label="Suivant"], [aria-label="Avanti"]')
      if (next && !next.disabled) {
        next.click()
        return
      }
      let i = 0
      const wrap = () => {
        const back = document.querySelector<HTMLButtonElement>('[aria-label="Zurück"], [aria-label="Back"], [aria-label="Retour"], [aria-label="Indietro"]')
        if (back && !back.disabled && i++ < 30) {
          back.click()
          setTimeout(wrap, 80)
        }
      }
      wrap()
    }
    const id = setInterval(tick, 4500)
    return () => clearInterval(id)
  }, [auto])

  const images = mode === 'human' ? HUMAN_IMAGES : PET_IMAGES
  const subject = SUBJECT[mode]

  const modernPages = useMemo(
    () => (mode === 'human' ? buildModernHumanPages(images) : buildModernPetPages(images)),
    [mode, images],
  )
  const classicPages = useMemo(
    () => (mode === 'human' ? buildClassicHumanPages(images) : buildClassicPetPages(images)),
    [mode, images],
  )
  const timelessPages = useMemo(
    () => (mode === 'human' ? buildTimelessHumanPages(images) : buildTimelessPetPages(images)),
    [mode, images],
  )

  return (
    <div className="album-showcase-wrap" style={{ width: '100%', height: '100dvh', overflow: 'hidden', background: '#fff' }}>
      {/* Eveline showcase media is already sepia/vintage. Disable classic
          viewer's tone filters so they don't double up and look muddy. */}
      {mode === 'human' && (
        <style>{`
          .cpa-photo .cpa-frame img,
          .cpa-photo.bw .cpa-frame img,
          .cpa-photo.sepia .cpa-frame img,
          .cpa-spread.s-bleed .cpa-bleed-img img,
          .cpa-hero-bg img,
          .cpa-hero-bg video,
          .cpa-pinned-item .cpa-frame img,
          .cpa-pinned-item .cpa-frame video {
            filter: none !important;
          }
        `}</style>
      )}
      {theme === 'modern' && (
        <ModernPhotoAlbum
          subjectName={subject.name}
          dateRange={subject.range}
          images={images}
          pages={modernPages}
        />
      )}
      {theme === 'classic' && (
        <ClassicPhotoAlbum
          subjectName={subject.name}
          dateRange={subject.range}
          images={images}
          pages={classicPages}
        />
      )}
      {theme === 'timeless' && (
        <TimelessPhotoAlbum
          subjectName={subject.name}
          dateRange={subject.range}
          images={images}
          pages={timelessPages}
        />
      )}
    </div>
  )
}
