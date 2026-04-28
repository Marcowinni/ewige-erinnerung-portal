import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isVideoUrl } from '@/lib/mediaType'

interface ThumbProps {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  // Optional override — if not provided, infers from URL extension
  kind?: 'image' | 'video'
  showPlayBadge?: boolean
  // Focal point in percent (0-100); maps to object-position. Defaults to 50/50.
  focalX?: number
  focalY?: number
}

export function MediaThumb({ src, alt = '', className, imgClassName, kind, showPlayBadge = true, focalX, focalY }: ThumbProps) {
  const isVideo = kind === 'video' || (kind === undefined && isVideoUrl(src))
  const objectPosition =
    focalX !== undefined || focalY !== undefined
      ? `${focalX ?? 50}% ${focalY ?? 50}%`
      : undefined

  if (!isVideo) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('w-full h-full object-cover', imgClassName, className)}
        style={objectPosition ? { objectPosition } : undefined}
      />
    )
  }

  return (
    <div className={cn('relative w-full h-full bg-memorial-ink', className)}>
      <video
        src={src}
        className={cn('w-full h-full object-cover opacity-85', imgClassName)}
        style={objectPosition ? { objectPosition } : undefined}
        preload="metadata"
        muted
        playsInline
        onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }}
      />
      {showPlayBadge && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-9 h-9 rounded-full bg-black/55 flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
      )}
    </div>
  )
}
