import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ModernPhotoAlbum } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import { ClassicPhotoAlbum } from '@/components/album-viewer/classic/ClassicPhotoAlbum'
import { TimelessPhotoAlbum } from '@/components/album-viewer/timeless/TimelessPhotoAlbum'
import {
  HUMAN_IMAGES,
  PET_IMAGES,
  SAMPLE_SUBJECT,
  buildClassicHumanPages,
  buildClassicPetPages,
  buildModernHumanPages,
  buildModernPetPages,
  buildTimelessHumanPages,
  buildTimelessPetPages,
} from '@/data/sampleAlbums'

type ShowcaseMode = 'human' | 'pet'

export function HumanShowcaseStyleOverride() {
  return (
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
      .mpa-img img,
      .mpa-img video {
        object-position: center 22% !important;
      }
    `}</style>
  )
}

export default function AlbumShowcaseFrame() {
  const { theme } = useParams<{ theme: string }>()
  const [params] = useSearchParams()
  const auto = params.get('auto') === '1'
  const mode: ShowcaseMode = params.get('mode') === 'human' ? 'human' : 'pet'

  // Auto-advance only when ?auto=1 is set (e.g. wizard step 2 iframes).
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
  const subject = SAMPLE_SUBJECT[mode]

  const modernPages = mode === 'human' ? buildModernHumanPages(images) : buildModernPetPages(images)
  const classicPages = mode === 'human' ? buildClassicHumanPages(images) : buildClassicPetPages(images)
  const timelessPages = mode === 'human' ? buildTimelessHumanPages(images) : buildTimelessPetPages(images)

  return (
    <div className="album-showcase-wrap" style={{ width: '100%', height: '100dvh', overflow: 'hidden', background: '#fff' }}>
      {mode === 'human' && <HumanShowcaseStyleOverride />}
      {theme === 'modern' && (
        <ModernPhotoAlbum subjectName={subject.name} dateRange={subject.range} images={images} pages={modernPages} />
      )}
      {theme === 'classic' && (
        <ClassicPhotoAlbum subjectName={subject.name} dateRange={subject.range} images={images} pages={classicPages} />
      )}
      {theme === 'timeless' && (
        <TimelessPhotoAlbum subjectName={subject.name} dateRange={subject.range} images={images} pages={timelessPages} />
      )}
    </div>
  )
}
