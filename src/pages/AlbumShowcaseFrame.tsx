import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ModernPhotoAlbum, type PageConfig } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import { ClassicPhotoAlbum, type ClassicPageConfig } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import { TimelessPhotoAlbum, type TimelessPageConfig } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'

const SAMPLE_IMAGES = [
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

const SUBJECT_NAME = 'Bello'
const DATE_RANGE = '1950 – 2025'

function buildModernPages(imgs: string[]): PageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'bleed', img: next(), showText: true, text: 'Ein Augenblick.' },
    { type: 'split', imgs: [next(), next(), next()], showText: true, text: 'Leise Stunden.' },
    { type: 'stack', imgs: [next(), next(), next(), next()], showText: false },
    { type: 'story', bg: next(), s1: next(), s2: next(), s3: next(), showText: true, text: 'Tage, wie sie waren.' },
    { type: 'twin-portrait', imgA: next(), imgB: next(), showText: true, text: 'Zwei Seiten einer Zeit.' },
    { type: 'quote-card', img: next(), showText: true, text: 'Was bleibt, ist Liebe.' },
    { type: 'close', showText: true },
  ]
}

function buildClassicPages(imgs: string[]): ClassicPageConfig[] {
  let i = 0
  const next = () => imgs[i++ % imgs.length] ?? null
  return [
    { type: 'hero', img: next(), showText: true },
    { type: 'bleed', img: next(), showText: true, text: 'Im Licht bewahrt.' },
    { type: 'duo', imgA: next(), imgB: next(), showText: true, text: 'Ein gemeinsamer Weg.' },
    { type: 'polaroids', imgA: next(), imgB: next(), showText: true, text: 'Vertraute Tage.' },
    { type: 'tape', imgA: next(), imgB: next(), showText: true, text: 'Wind im Haar.' },
    { type: 'herald', hero: next(), r1: next(), r2: next(), showText: true, text: 'Wie wir Dich kannten.' },
    { type: 'diagonal', t1: next(), t2: next(), t3: next(), showText: true, text: 'Bewahrte Bilder.' },
    { type: 'envelope-letter', img: next(), showText: true, text: 'Worte, die bleiben.' },
    { type: 'pinned', imgA: next(), imgB: next(), showText: true, text: 'Angeheftet. Bewahrt.' },
    { type: 'strip', s1: next(), s2: next(), s3: next(), big: next(), showText: true, text: 'Liebste Augenblicke.' },
    { type: 'close', showText: true },
  ]
}

function buildTimelessPages(imgs: string[]): TimelessPageConfig[] {
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

export default function AlbumShowcaseFrame() {
  const { theme } = useParams<{ theme: string }>()

  // Auto-advance via window keypress every 3.5s
  useEffect(() => {
    const id = setInterval(() => {
      const btn = document.querySelector<HTMLButtonElement>('[aria-label="Weiter"]')
      if (btn && !btn.disabled) {
        btn.click()
      } else {
        // wrap: spaced back-clicks
        let i = 0
        const wrap = () => {
          const back = document.querySelector<HTMLButtonElement>('[aria-label="Zurück"]')
          if (back && !back.disabled && i++ < 30) {
            back.click()
            setTimeout(wrap, 80)
          }
        }
        wrap()
      }
    }, 6500)
    return () => clearInterval(id)
  }, [])

  const modernPages = useMemo(() => buildModernPages(SAMPLE_IMAGES), [])
  const classicPages = useMemo(() => buildClassicPages(SAMPLE_IMAGES), [])
  const timelessPages = useMemo(() => buildTimelessPages(SAMPLE_IMAGES), [])

  return (
    <div style={{ width: '100%', height: '100dvh', overflow: 'hidden', background: '#fff' }}>
      {theme === 'modern' && (
        <ModernPhotoAlbum
          subjectName={SUBJECT_NAME}
          dateRange={DATE_RANGE}
          images={SAMPLE_IMAGES}
          pages={modernPages}
        />
      )}
      {theme === 'classic' && (
        <ClassicPhotoAlbum
          subjectName={SUBJECT_NAME}
          dateRange={DATE_RANGE}
          images={SAMPLE_IMAGES}
          pages={classicPages}
        />
      )}
      {theme === 'timeless' && (
        <TimelessPhotoAlbum
          subjectName={SUBJECT_NAME}
          dateRange={DATE_RANGE}
          images={SAMPLE_IMAGES}
          pages={timelessPages}
        />
      )}
    </div>
  )
}
