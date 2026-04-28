import { cn } from '@/lib/utils'
import { ClassicPhotoMount } from './ClassicPhotoMount'
import { isVideoUrl } from '@/lib/mediaType'

export function MediaFrame({
  src,
  alt,
  caption,
  className,
  imgClassName,
  classic,
  vintage,
  rotationDeg = 0,
}: {
  src: string | null
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
  classic?: boolean
  /** Pass true for vintage polaroid framing */
  vintage?: boolean
  rotationDeg?: number
}) {
  if (!src) {
    return <div className={cn('min-h-[4rem] bg-muted/30', className)} />
  }

  const isVideo = isVideoUrl(src)

  const imageInner = (
    <>
      <div className="absolute inset-0">
        {isVideo ? (
          <video
            src={src}
            className={cn('h-full w-full object-cover', imgClassName)}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className={cn('h-full w-full object-cover', imgClassName)}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      {caption ? (
        <figcaption
          className={cn(
            'absolute bottom-0 left-0 right-0 z-10 px-2 py-1',
            classic
              ? 'caption-classic text-center bg-gradient-to-t from-stone-950/70 to-transparent'
              : 'bg-gradient-to-t from-black/45 to-transparent text-white text-[10px] sm:text-[11px] text-center'
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </>
  )

  if (classic) {
    return (
      <figure className={cn('relative h-full w-full min-h-0 min-w-0', className)}>
        <ClassicPhotoMount rotationDeg={rotationDeg} className="h-full w-full" classic={true}>
          <div className="relative h-full w-full min-h-0 frame-classic-gold">
            {imageInner}
          </div>
        </ClassicPhotoMount>
      </figure>
    )
  }

  if (vintage) {
    return (
      <figure
        className={cn('relative h-full w-full min-h-0 min-w-0 overflow-hidden', className)}
        style={rotationDeg !== 0 ? { transform: `rotate(${rotationDeg}deg)` } : undefined}
      >
        {imageInner}
      </figure>
    )
  }

  /* Modern — edge-to-edge, no frame, clean */
  return (
    <figure
      className={cn(
        'relative h-full w-full overflow-hidden min-h-0 min-w-0',
        className
      )}
      style={rotationDeg !== 0 ? { transform: `rotate(${rotationDeg}deg)` } : undefined}
    >
      {imageInner}
    </figure>
  )
}
