import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlbumPage } from './AlbumPage'
import type { AlbumLayout, AlbumLayoutPage, ImageSource } from './types'
import { useAlbumImages } from '@/hooks/useAlbumImages'
import { useImageAspectRatios } from '@/hooks/useImageAspectRatios'
import { useAlbumMediaDimensions, countReadyDimensions, countUrls } from '@/hooks/useAlbumMediaDimensions'
import { buildEngineBlocks } from '@/lib/album-engine/engine'
import { engineItemsFromSources } from '@/lib/album-engine/media'

interface AlbumViewerProps {
  albumLayout: AlbumLayout
  imageSources: ImageSource
  albumStyle: 'modern' | 'classic' | 'vintage'
  subjectName: string
  /** Feste Bild-URLs für lokale Stil-Vorschau (ohne Supabase) */
  previewImageUrls?: string[]
}

function buildResolvedPages(args: {
  albumLayout: AlbumLayout
  subjectName: string
  files: { path: string; caption?: string }[]
  urlList: (string | null)[]
  dimensions: Map<number, { width: number; height: number }>
  albumStyle: 'modern' | 'classic' | 'vintage'
}): AlbumLayoutPage[] {
  const { albumLayout, subjectName, files, urlList, dimensions, albumStyle } = args
  const engineMode = albumStyle === 'classic' ? 'classic' : albumStyle === 'vintage' ? 'vintage' : 'modern'
  const introFromLayout = albumLayout.pages?.find((p) => p.type === 'intro')
  const intro: AlbumLayoutPage = introFromLayout
    ? { ...introFromLayout, name: introFromLayout.name ?? subjectName }
    : { type: 'intro', name: subjectName }
  const outro: AlbumLayoutPage = albumLayout.pages?.find((p) => p.type === 'outro') ?? { type: 'outro' }

  if (files.length === 0) {
    return [intro, outro]
  }

  const engineItems = engineItemsFromSources(files, urlList, dimensions)
  const blocks = buildEngineBlocks(engineItems, engineMode)
  const blockPages: AlbumLayoutPage[] = blocks.map((b) => {
    return {
      type: 'block' as const,
      mediaIndices: b.items.map((it) => it.sourceIndex),
      engineBlock: b,
    }
  })

  return [intro, ...blockPages, outro]
}

export function AlbumViewer({
  albumLayout,
  imageSources,
  albumStyle,
  subjectName,
  previewImageUrls,
}: AlbumViewerProps) {
  const { urls, getUrl: supaGetUrl, getCaption: supaGetCaption, loading: supaLoading } = useAlbumImages(
    imageSources.bucket,
    previewImageUrls?.length ? [] : imageSources.files
  )

  const files = useMemo(
    () =>
      previewImageUrls?.length
        ? previewImageUrls.map((_, i) => ({ path: `preview:${i}.jpg`, caption: undefined as string | undefined }))
        : imageSources.files,
    [previewImageUrls, imageSources.files]
  )

  const getUrl = previewImageUrls?.length ? (i: number) => previewImageUrls[i] ?? null : supaGetUrl
  const getCaption = previewImageUrls?.length ? () => '' : supaGetCaption
  const loading = previewImageUrls?.length ? false : supaLoading
  const fileCount = previewImageUrls?.length ?? imageSources.files.length

  const urlList = useMemo<(string | null)[]>(() => {
    if (previewImageUrls?.length) return previewImageUrls.map((u) => u ?? null)
    return Array.from({ length: fileCount }, (_, i) => urls.get(i) ?? null)
  }, [previewImageUrls, fileCount, urls])

  const paths = useMemo(() => files.map((f) => f.path), [files])
  const { dimensions } = useAlbumMediaDimensions(urlList, paths)

  const [metaTimeout, setMetaTimeout] = useState(false)
  useEffect(() => {
    if (fileCount === 0) return
    const t = window.setTimeout(() => setMetaTimeout(true), 2200)
    return () => window.clearTimeout(t)
  }, [fileCount, paths.join('|')])

  const urlN = countUrls(urlList)
  const readyN = countReadyDimensions(urlList, dimensions)
  const metaReady = fileCount === 0 || readyN >= urlN || metaTimeout

  const resolvedPages = useMemo(
    () =>
      buildResolvedPages({
        albumLayout,
        subjectName,
        files,
        urlList,
        dimensions,
        albumStyle,
      }),
    [albumLayout, subjectName, files, urlList, dimensions, albumStyle]
  )

  const pages = metaReady ? resolvedPages : []
  const getAspectFromImages = useImageAspectRatios(urlList)
  const getAspectCombined = useCallback(
    (i: number) => {
      const d = dimensions.get(i)
      if (d) return d.width / d.height
      return getAspectFromImages(i)
    },
    [dimensions, getAspectFromImages]
  )
  const getMediaPath = useCallback((index: number) => files[index]?.path ?? '', [files])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    inViewThreshold: 0.5,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    setSelectedIndex(0)
    emblaApi?.scrollTo(0)
  }, [resolvedPages.length, emblaApi])

  if (loading || (fileCount > 0 && !metaReady)) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary" />
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-muted-foreground">
        Keine Seiten vorhanden.
      </div>
    )
  }

  return (
    <div className="album-viewer-wrapper flex flex-col h-full w-full min-h-0">
      <div
        className="flex-1 min-h-0 overflow-hidden cursor-grab active:cursor-grabbing select-none sm:min-h-[min(64dvh,640px)]"
        ref={emblaRef}
      >
        <div className="flex h-full min-h-0 touch-pan-y">
          {pages.map((page, index) => (
            <div
              key={`${page.type}-${index}-${page.type === 'block' ? `${page.engineBlock?.layoutId ?? 'block'}-${page.engineBlock?.variant ?? 0}` : ''}`}
              className="embla-slide flex-[0_0_100%] min-w-0 min-h-0 h-full flex items-center justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-5 sm:min-h-[min(68dvh,680px)]"
            >
              <div
                className={`album-page-surface album-page-frame album-${albumStyle} overflow-hidden shadow-xl`}
              >
                <AlbumPage
                  page={page}
                  getImageUrl={getUrl}
                  getCaption={getCaption}
                  getAspect={getAspectCombined}
                  getMediaPath={getMediaPath}
                  albumStyle={albumStyle}
                  className="h-full w-full min-h-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-4 px-6 shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={selectedIndex === 0}
          className="rounded-full h-11 w-11 shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground tabular-nums">
            {selectedIndex + 1} / {pages.length}
          </span>
          <div className="flex gap-1">
            {pages.slice(0, 10).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={selectedIndex >= pages.length - 1}
          className="rounded-full h-11 w-11 shrink-0"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
