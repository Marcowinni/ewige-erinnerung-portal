import { useState, type ReactNode } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LayoutType } from '@/lib/album/mediaTypes'
import { SLOT } from '@/lib/album/mediaTypes'
import { isVideoPath } from '@/lib/album/paths'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface AlbumBlockPageProps {
  layout: LayoutType
  mediaIndices: number[]
  /** Visuelle Untervariante (Hash aus Block-Index + Medien), pro Layout unterschiedlich genutzt */
  blockVariant?: number
  getMediaUrl: (index: number) => string | null
  getCaption: (index: number) => string
  getPath: (index: number) => string
  albumStyle: 'modern' | 'classic' | 'vintage'
  className?: string
}

function coverImg(src: string | null, caption: string, className: string, rounded: string) {
  if (!src) return <div className={cn('bg-muted/40', className)} />
  return (
    <img
      src={src}
      alt={caption}
      className={cn('absolute inset-0 h-full w-full object-cover', rounded, className)}
    />
  )
}

function captionOverlay(text: string, classic: boolean) {
  if (!text) return null
  return (
    <p
      className={cn(
        'pointer-events-none absolute bottom-0 left-0 right-0 z-10 px-2 py-1.5 text-center text-[11px] sm:text-xs',
        classic
          ? 'bg-gradient-to-t from-black/55 to-transparent text-amber-50'
          : 'bg-gradient-to-t from-black/50 to-transparent text-white'
      )}
    >
      {text}
    </p>
  )
}

function Slot({
  idx,
  getMediaUrl,
  getCaption,
  aspect,
  outerClass,
  rounded,
  albumStyle,
}: {
  idx: number
  getMediaUrl: (i: number) => string | null
  getCaption: (i: number) => string
  aspect: string
  outerClass?: string
  rounded: string
  albumStyle: 'modern' | 'classic' | 'vintage'
}) {
  const src = getMediaUrl(idx)
  const cap = getCaption(idx)
  const classic = albumStyle === 'classic'
  return (
    <figure
      className={cn('relative w-full min-h-0 overflow-hidden', outerClass)}
      style={{ aspectRatio: aspect }}
    >
      {coverImg(src, cap, 'min-h-[4rem]', rounded)}
      {captionOverlay(cap, classic)}
    </figure>
  )
}

function VideoFeatureBlock({
  idx,
  getMediaUrl,
  getCaption,
  albumStyle,
  rounded,
}: {
  idx: number
  getMediaUrl: (i: number) => string | null
  getCaption: (i: number) => string
  albumStyle: 'modern' | 'classic' | 'vintage'
  rounded: string
}) {
  const [open, setOpen] = useState(false)
  const src = getMediaUrl(idx)
  const cap = getCaption(idx)
  const classic = albumStyle === 'classic'

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2 min-h-0">
      <button
        type="button"
        className={cn(
          'relative w-full flex-1 min-h-0 overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-primary',
          rounded,
          classic ? 'ring-1 ring-amber-900/20' : ''
        )}
        style={{ aspectRatio: SLOT.heroLandscape }}
        onClick={() => src && setOpen(true)}
      >
        {src ? (
          <video
            src={src}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : (
          <div className="absolute inset-0 bg-muted/40" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/25">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 shadow-lg">
            <Play className="h-8 w-8 text-white fill-white" />
          </span>
        </span>
        {captionOverlay(cap, classic)}
      </button>
      {cap ? (
        <p
          className={cn(
            'shrink-0 text-center text-xs px-1',
            classic ? 'text-amber-900/85' : 'text-muted-foreground'
          )}
        >
          {cap}
        </p>
      ) : null}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(96vw,56rem)] border-0 bg-black p-0 overflow-hidden shadow-2xl">
          <DialogTitle className="sr-only">Video abspielen</DialogTitle>
          {src ? (
            <video src={src} controls playsInline className="max-h-[88vh] w-full bg-black" autoPlay />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function AlbumBlockPage({
  layout,
  mediaIndices,
  blockVariant = 0,
  getMediaUrl,
  getCaption,
  getPath,
  albumStyle,
  className,
}: AlbumBlockPageProps) {
  const classic = albumStyle === 'classic'
  const rounded = classic ? 'rounded-sm' : 'rounded-xl'
  const shell = (children: ReactNode) => (
    <div className={cn('flex h-full min-h-0 w-full flex-col bg-transparent', className)}>{children}</div>
  )
  const bv = (mod: number) => blockVariant % mod

  const idx = (k: number) => mediaIndices[k]!

  if (layout === 'video-feature' && mediaIndices[0] !== undefined) {
    const i = mediaIndices[0]
    if (!isVideoPath(getPath(i))) {
      // Fallback falls nur Bild-Index übergeben wurde
      return shell(
        <div className="flex flex-1 flex-col gap-2 p-2 min-h-0">
          <Slot
            idx={i}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.heroLandscape}
            outerClass="flex-1 min-h-0 max-h-full mx-auto w-full"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
      )
    }
    return shell(<VideoFeatureBlock idx={i} getMediaUrl={getMediaUrl} getCaption={getCaption} albumStyle={albumStyle} rounded={rounded} />)
  }

  if (layout === 'hero-single' && mediaIndices[0] !== undefined) {
    const v = bv(3)
    if (v === 1) {
      return shell(
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-3 min-h-0">
          <Slot
            idx={idx(0)}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.standardLandscape}
            outerClass="w-full max-h-full min-h-0 flex-1"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
      )
    }
    if (v === 2) {
      const i0 = idx(0)
      const cap = getCaption(i0)
      const src = getMediaUrl(i0)
      return shell(
        <div className="relative flex-1 min-h-0 overflow-hidden p-2">
          {coverImg(src, cap, '', rounded)}
          {captionOverlay(cap, classic)}
        </div>
      )
    }
    return shell(
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-2 min-h-0">
        <Slot
          idx={idx(0)}
          getMediaUrl={getMediaUrl}
          getCaption={getCaption}
          aspect={SLOT.heroLandscape}
          outerClass="w-full max-h-full min-h-0 flex-1"
          rounded={rounded}
          albumStyle={albumStyle}
        />
      </div>
    )
  }

  if (layout === 'two-landscapes' && mediaIndices.length >= 2) {
    const v = bv(4)
    const a = idx(0)
    const b = idx(1)
    if (v === 3) {
      return shell(
        <div className="grid flex-1 grid-cols-2 gap-2 p-2 min-h-0">
          {[a, b].map((mediaIdx) => (
            <div key={mediaIdx} className={cn('relative min-h-0 h-full w-full overflow-hidden', rounded)}>
              {coverImg(getMediaUrl(mediaIdx), getCaption(mediaIdx), 'absolute inset-0 min-h-0', rounded)}
              {captionOverlay(getCaption(mediaIdx), classic)}
            </div>
          ))}
        </div>
      )
    }
    if (v === 1) {
      return shell(
        <div className="flex flex-1 flex-col gap-2 p-2 min-h-0">
          <Slot
            idx={a}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.heroLandscape}
            outerClass="min-h-0 w-full flex-[1.22]"
            rounded={rounded}
            albumStyle={albumStyle}
          />
          <Slot
            idx={b}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.standardLandscape}
            outerClass="flex-1 min-h-0 w-full"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
      )
    }
    if (v === 2) {
      return shell(
        <div className="flex flex-1 flex-col gap-2 p-2 min-h-0">
          <Slot
            idx={b}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.heroLandscape}
            outerClass="min-h-0 w-full flex-[1.22]"
            rounded={rounded}
            albumStyle={albumStyle}
          />
          <Slot
            idx={a}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.standardLandscape}
            outerClass="flex-1 min-h-0 w-full"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
      )
    }
    return shell(
      <div className="flex flex-1 flex-col gap-2 p-2 min-h-0">
        <Slot
          idx={a}
          getMediaUrl={getMediaUrl}
          getCaption={getCaption}
          aspect={SLOT.standardLandscape}
          outerClass="flex-1 min-h-0 w-full"
          rounded={rounded}
          albumStyle={albumStyle}
        />
        <Slot
          idx={b}
          getMediaUrl={getMediaUrl}
          getCaption={getCaption}
          aspect={SLOT.standardLandscape}
          outerClass="flex-1 min-h-0 w-full"
          rounded={rounded}
          albumStyle={albumStyle}
        />
      </div>
    )
  }

  if (layout === 'two-portraits' && mediaIndices.length >= 2) {
    const swap = bv(2) === 1
    const leftIdx = swap ? idx(1) : idx(0)
    const rightIdx = swap ? idx(0) : idx(1)
    return shell(
      <div className="grid flex-1 grid-cols-2 gap-2 p-2 min-h-0 items-center">
        <div className="flex min-h-0 items-center justify-center px-0.5">
          <Slot
            idx={leftIdx}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.portrait}
            outerClass="w-full max-w-full max-h-[min(100%,min(72dvh,520px))]"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
        <div className="flex min-h-0 items-center justify-center px-0.5">
          <Slot
            idx={rightIdx}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.portrait}
            outerClass="w-full max-w-full max-h-[min(100%,min(72dvh,520px))]"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
      </div>
    )
  }

  if (layout === 'mixed-split' && mediaIndices.length >= 2) {
    const swap = bv(2) === 1
    const topIdx = swap ? idx(1) : idx(0)
    const botIdx = swap ? idx(0) : idx(1)
    return shell(
      <div className="grid flex-1 grid-rows-2 gap-2 p-2 min-h-0">
        <Slot
          idx={topIdx}
          getMediaUrl={getMediaUrl}
          getCaption={getCaption}
          aspect={SLOT.standardLandscape}
          outerClass="min-h-0 w-full"
          rounded={rounded}
          albumStyle={albumStyle}
        />
        <Slot
          idx={botIdx}
          getMediaUrl={getMediaUrl}
          getCaption={getCaption}
          aspect={SLOT.standardLandscape}
          outerClass="min-h-0 w-full"
          rounded={rounded}
          albumStyle={albumStyle}
        />
      </div>
    )
  }

  if (layout === 'portrait-left-stack-right' && mediaIndices.length >= 3) {
    const mirror = bv(2) === 1
    if (mirror) {
      return shell(
        <div className="grid flex-1 grid-cols-[1fr_minmax(9rem,38%)] grid-rows-2 gap-2 p-2 min-h-0">
          <Slot
            idx={idx(1)}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.standardLandscape}
            outerClass="col-start-1 row-start-1 min-h-0 w-full"
            rounded={rounded}
            albumStyle={albumStyle}
          />
          <Slot
            idx={idx(2)}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.standardLandscape}
            outerClass="col-start-1 row-start-2 min-h-0 w-full"
            rounded={rounded}
            albumStyle={albumStyle}
          />
          <div className="col-start-2 row-span-2 row-start-1 flex min-h-0 items-center justify-center py-0.5">
            <Slot
              idx={idx(0)}
              getMediaUrl={getMediaUrl}
              getCaption={getCaption}
              aspect={SLOT.portrait}
              outerClass="w-full max-w-full max-h-full min-h-0"
              rounded={rounded}
              albumStyle={albumStyle}
            />
          </div>
        </div>
      )
    }
    return shell(
      <div className="grid flex-1 grid-cols-[minmax(9rem,38%)_1fr] grid-rows-2 gap-2 p-2 min-h-0">
        <div className="row-span-2 flex min-h-0 items-center justify-center py-0.5">
          <Slot
            idx={idx(0)}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.portrait}
            outerClass="w-full max-w-full max-h-full min-h-0"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
        <Slot
          idx={idx(1)}
          getMediaUrl={getMediaUrl}
          getCaption={getCaption}
          aspect={SLOT.standardLandscape}
          outerClass="min-h-0 w-full"
          rounded={rounded}
          albumStyle={albumStyle}
        />
        <Slot
          idx={idx(2)}
          getMediaUrl={getMediaUrl}
          getCaption={getCaption}
          aspect={SLOT.standardLandscape}
          outerClass="min-h-0 w-full"
          rounded={rounded}
          albumStyle={albumStyle}
        />
      </div>
    )
  }

  if (layout === 'landscape-top-two-bottom' && mediaIndices.length >= 3) {
    const swapBottom = bv(2) === 1
    const i1 = swapBottom ? idx(2) : idx(1)
    const i2 = swapBottom ? idx(1) : idx(2)
    return shell(
      <div className="grid flex-1 grid-cols-2 gap-2 p-2 min-h-0 grid-rows-[minmax(0,0.44fr)_1fr]">
        <div className="col-span-2 min-h-0">
          <Slot
            idx={idx(0)}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.heroLandscape}
            outerClass="h-full w-full max-h-full"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
        <div className="flex min-h-0 items-center justify-center">
          <Slot
            idx={i1}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.portrait}
            outerClass="w-full max-w-full max-h-full min-h-0"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
        <div className="flex min-h-0 items-center justify-center">
          <Slot
            idx={i2}
            getMediaUrl={getMediaUrl}
            getCaption={getCaption}
            aspect={SLOT.portrait}
            outerClass="w-full max-w-full max-h-full min-h-0"
            rounded={rounded}
            albumStyle={albumStyle}
          />
        </div>
      </div>
    )
  }

  if (layout === 'three-grid' && mediaIndices.length >= 3) {
    const v = bv(2)
    if (v === 1) {
      return shell(
        <div className="flex flex-1 flex-col gap-2 p-2 min-h-0">
          <div className="relative min-h-0 flex-[1.28] overflow-hidden rounded-lg">
            {coverImg(getMediaUrl(idx(0)), getCaption(idx(0)), 'min-h-[4rem]', rounded)}
            {captionOverlay(getCaption(idx(0)), classic)}
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
            {[1, 2].map((k) => (
              <div key={k} className="relative min-h-0 overflow-hidden rounded-lg">
                {coverImg(getMediaUrl(idx(k)), getCaption(idx(k)), 'min-h-[3rem]', rounded)}
                {captionOverlay(getCaption(idx(k)), classic)}
              </div>
            ))}
          </div>
        </div>
      )
    }
    return shell(
      <div className="flex flex-1 flex-col gap-2 p-2 min-h-0">
        {[0, 1, 2].map((k) => (
          <div key={k} className="relative min-h-0 flex-1 overflow-hidden rounded-lg">
            {coverImg(getMediaUrl(idx(k)), getCaption(idx(k)), 'min-h-[3rem]', rounded)}
            {captionOverlay(getCaption(idx(k)), classic)}
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'four-grid' && mediaIndices.length >= 4) {
    const order = bv(2) === 1 ? [0, 2, 1, 3] : [0, 1, 2, 3]
    return shell(
      <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-2 p-2 min-h-0">
        {order.map((k) => (
          <div
            key={k}
            className="relative min-h-0 overflow-hidden"
            style={{ aspectRatio: SLOT.square }}
          >
            {coverImg(getMediaUrl(idx(k)), getCaption(idx(k)), 'min-h-0', rounded)}
            {captionOverlay(getCaption(idx(k)), classic)}
          </div>
        ))}
      </div>
    )
  }

  return shell(
    <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">Layout nicht verfügbar</div>
  )
}
