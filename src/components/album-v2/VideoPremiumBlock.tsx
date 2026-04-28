import { useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ClassicPhotoMount } from './ClassicPhotoMount'

export function VideoPremiumBlock({
  src,
  caption,
  classic,
}: {
  src: string | null
  caption: string
  classic?: boolean
}) {
  const [open, setOpen] = useState(false)
  const rounded = classic ? 'rounded-sm' : 'rounded-xl'

  const button = (
    <button
      type="button"
      className={cn(
        'relative w-full flex-1 min-h-0 overflow-hidden text-left',
        rounded,
        !classic && 'shadow-xl ring-1 ring-black/10'
      )}
      style={{ aspectRatio: '16 / 9' }}
      onClick={() => src && setOpen(true)}
    >
      {src ? (
        <video
          src={src}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <div className="absolute inset-0 bg-muted/40" />
      )}
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          classic ? 'bg-stone-950/30' : 'bg-black/30'
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 shadow-lg ring-1 ring-white/15">
          <Play className="h-7 w-7 text-white fill-white" />
        </span>
      </span>
    </button>
  )

  return (
    <div className={cn('flex h-full w-full flex-col gap-2 min-h-0', classic && 'px-0.5 py-1')}>
      {classic ? (
        <ClassicPhotoMount rotationDeg={-1.25} className="min-h-0 w-full flex-1">
          <div className="relative flex min-h-[7rem] w-full flex-col">{button}</div>
        </ClassicPhotoMount>
      ) : (
        button
      )}
      {caption ? (
        <p
          className={cn(
            'shrink-0 text-center text-xs px-1',
            classic ? 'font-serif text-stone-300/90' : 'text-muted-foreground'
          )}
        >
          {caption}
        </p>
      ) : null}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(96vw,56rem)] border-0 bg-black p-0 overflow-hidden">
          <DialogTitle className="sr-only">Video</DialogTitle>
          {src ? (
            <video src={src} controls playsInline className="max-h-[88vh] w-full bg-black" autoPlay />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
