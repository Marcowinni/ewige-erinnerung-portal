import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlbumPage } from './AlbumPage'
import type { AlbumLayout, ImageSource } from './types'
import { useAlbumImages } from '@/hooks/useAlbumImages'

interface AlbumViewerProps {
  albumLayout: AlbumLayout
  imageSources: ImageSource
  albumStyle: 'modern' | 'classic'
  subjectName: string
}

export function AlbumViewer({
  albumLayout,
  imageSources,
  albumStyle,
  subjectName,
}: AlbumViewerProps) {
  const { getUrl, getCaption, loading } = useAlbumImages(
    imageSources.bucket,
    imageSources.files
  )
  const pages = albumLayout.pages ?? []
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

  if (loading) {
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
    <div className="album-viewer-wrapper flex flex-col h-full w-full">
      {/* Embla viewport – Touch/Swipe wie PowerPoint/Canva */}
      <div className="flex-1 min-h-0 overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
        <div className="flex h-full">
          {pages.map((page, index) => (
            <div
              key={index}
              className="embla-slide flex-[0_0_100%] min-w-0 h-full flex items-center justify-center"
            >
              <div className={`album-page-surface album-${albumStyle} h-full w-full overflow-hidden`}>
                <AlbumPage
                  page={page}
                  getImageUrl={getUrl}
                  getCaption={getCaption}
                  albumStyle={albumStyle}
                  className="h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
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
