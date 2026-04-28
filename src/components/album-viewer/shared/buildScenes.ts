import type { EngineAlbumBlock, EngineMediaItem } from '@/lib/album-engine/types'

export type SceneType =
  | 'hero'
  | 'photo-solo'
  | 'photo-pair'
  | 'photo-grid'
  | 'photo-mask'
  | 'photo-tilt3d'
  | 'photo-parallax'
  | 'video-cinematic'
  | 'quote'
  | 'date-marker'
  | 'end'

export interface SceneBase {
  id: string
  type: SceneType
}

export interface HeroScene extends SceneBase {
  type: 'hero'
  subjectName: string
  dateRange: string
  heroImageSrc: string | null
}

export interface PhotoSoloScene extends SceneBase {
  type: 'photo-solo'
  item: EngineMediaItem
  animVariant: 'clip' | 'mask' | 'parallax' | 'tilt3d'
}

export interface PhotoPairScene extends SceneBase {
  type: 'photo-pair'
  items: [EngineMediaItem, EngineMediaItem]
}

export interface PhotoGridScene extends SceneBase {
  type: 'photo-grid'
  items: EngineMediaItem[]
}

export interface VideoCinematicScene extends SceneBase {
  type: 'video-cinematic'
  item: EngineMediaItem
}

export interface QuoteScene extends SceneBase {
  type: 'quote'
  text: string
  index: number
}

export interface DateMarkerScene extends SceneBase {
  type: 'date-marker'
  label: string
}

export interface EndScene extends SceneBase {
  type: 'end'
  subjectName: string
  dateRange: string
}

export type Scene =
  | HeroScene
  | PhotoSoloScene
  | PhotoPairScene
  | PhotoGridScene
  | VideoCinematicScene
  | QuoteScene
  | DateMarkerScene
  | EndScene

const SOLO_ANIM_CYCLE: PhotoSoloScene['animVariant'][] = ['clip', 'mask', 'tilt3d', 'parallax']

export function buildScenes(
  blocks: EngineAlbumBlock[],
  opts: {
    subjectName: string
    dedication?: string
    birthDate?: string
    passingDate?: string
    getUrl: (i: number) => string | null
  }
): Scene[] {
  const { subjectName, dedication, birthDate, passingDate, getUrl } = opts

  const dateRange = [birthDate, passingDate].filter(Boolean).join(' – ')

  // Hero image: first available image
  let heroSrc: string | null = null
  for (const block of blocks) {
    for (const item of block.items) {
      const u = getUrl(item.sourceIndex)
      if (u) { heroSrc = u; break }
    }
    if (heroSrc) break
  }

  const scenes: Scene[] = []
  scenes.push({ id: 'hero', type: 'hero', subjectName, dateRange, heroImageSrc: heroSrc })

  if (dedication) {
    scenes.push({ id: 'quote-dedication', type: 'quote', text: dedication, index: 0 })
  }

  let soloCount = 0
  let totalPhotoSections = 0
  const quoteTexts = [
    'Jeder Augenblick, der festgehalten wird, lebt ewig weiter.',
    'In Liebe und Dankbarkeit.',
    'Erinnerungen sind das, was bleibt.',
    'Unvergessliche Momente, die für immer im Herzen bleiben.',
  ]
  let quoteIdx = 0

  blocks.forEach((block, i) => {
    const isVideo = block.family === 'video'
    const itemCount = block.items.length

    if (isVideo && block.items[0]) {
      scenes.push({ id: `video-${i}`, type: 'video-cinematic', item: block.items[0] })
      totalPhotoSections++
      return
    }

    if (itemCount === 1 && block.items[0]) {
      const anim = SOLO_ANIM_CYCLE[soloCount % SOLO_ANIM_CYCLE.length]!
      scenes.push({ id: `solo-${i}`, type: 'photo-solo', item: block.items[0], animVariant: anim })
      soloCount++
      totalPhotoSections++
    } else if (itemCount === 2 && block.items[0] && block.items[1]) {
      scenes.push({ id: `pair-${i}`, type: 'photo-pair', items: [block.items[0], block.items[1]] })
      totalPhotoSections++
    } else if (itemCount >= 3) {
      scenes.push({ id: `grid-${i}`, type: 'photo-grid', items: block.items.slice(0, 4) })
      totalPhotoSections++
    }

    // Insert date-marker every ~5 photo sections
    if (totalPhotoSections > 0 && totalPhotoSections % 5 === 0 && i < blocks.length - 1) {
      scenes.push({ id: `date-${i}`, type: 'date-marker', label: String(new Date().getFullYear()) })
    }

    // Insert quote every ~8 photo sections (if we have texts left)
    if (totalPhotoSections > 0 && totalPhotoSections % 8 === 0 && i < blocks.length - 1 && quoteIdx < quoteTexts.length) {
      scenes.push({
        id: `quote-${i}`,
        type: 'quote',
        text: quoteTexts[quoteIdx]!,
        index: quoteIdx + 1,
      })
      quoteIdx++
    }
  })

  scenes.push({ id: 'end', type: 'end', subjectName, dateRange })
  return scenes
}
