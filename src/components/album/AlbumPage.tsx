import { cn } from '@/lib/utils'
import type { AlbumLayoutPage } from './types'

interface AlbumPageProps {
  page: AlbumLayoutPage
  getImageUrl: (index: number) => string | null
  getCaption: (index: number) => string
  albumStyle: 'modern' | 'classic'
  className?: string
}

function PhotoFrame({
  src,
  caption,
  className,
  variant,
  albumStyle,
}: {
  src: string | null
  caption: string
  className?: string
  variant: 'default' | 'polaroid' | 'shadow'
  albumStyle: 'modern' | 'classic'
}) {
  if (!src) return <div className={cn('bg-muted/30', className)} />
  const isClassic = albumStyle === 'classic'
  const isPolaroid = variant === 'polaroid'

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        isClassic ? 'bg-[#f5f0e6]' : 'bg-white',
        isPolaroid && (isClassic ? 'p-3 pb-10 shadow-[0_6px_24px_rgba(80,50,20,0.25)] border border-amber-900/20' : 'p-2 pb-8 shadow-[0_4px_16px_rgba(0,0,0,0.12)]'),
        variant === 'shadow' && (isClassic ? 'shadow-[0_4px_20px_rgba(80,50,20,0.2)] rounded-sm border border-amber-900/15' : 'shadow-lg rounded-xl'),
        className
      )}
    >
      <img src={src} alt={caption} className="w-full h-full object-cover" />
      {caption && isPolaroid && (
        <p className={cn(
          'absolute bottom-2 left-2 right-2 text-center text-sm font-serif',
          isClassic ? 'text-amber-900/80' : 'text-foreground/80'
        )}>
          {caption}
        </p>
      )}
      {caption && !isPolaroid && (
        <p className="absolute bottom-2 left-2 right-2 text-center text-sm text-white drop-shadow-lg">
          {caption}
        </p>
      )}
    </div>
  )
}

export function AlbumPage({ page, getImageUrl, getCaption, albumStyle, className }: AlbumPageProps) {
  const isClassic = albumStyle === 'classic'

  // ========== INTRO ==========
  if (page.type === 'intro') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center h-full w-full p-8 text-center',
          isClassic
            ? 'bg-gradient-to-b from-[#ebe4d8] via-[#e8e0d2] to-[#e5dcc8]'
            : 'bg-gradient-to-b from-neutral-50 via-white to-white',
          className
        )}
      >
        {isClassic ? (
          <>
            <div className="font-serif text-4xl md:text-5xl text-amber-900/90 mb-3 tracking-wide">
              {page.name || 'Erinnerungen'}
            </div>
            <p className="text-amber-800/70 text-lg font-serif italic">Ein Fotobuch</p>
            <div className="mt-10 w-24 h-px bg-amber-900/30" />
            <div className="mt-2 w-16 h-px bg-amber-900/20" />
          </>
        ) : (
          <>
            <div className="font-serif text-4xl md:text-5xl text-foreground mb-3 tracking-tight font-light">
              {page.name || 'Erinnerungen'}
            </div>
            <p className="text-muted-foreground text-lg font-light">Ein digitales Fotoalbum</p>
            <div className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </>
        )}
      </div>
    )
  }

  // ========== OUTRO ==========
  if (page.type === 'outro') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center h-full w-full p-8 text-center',
          isClassic
            ? 'bg-gradient-to-b from-[#e5dcc8] via-[#e8e0d2] to-[#ebe4d8]'
            : 'bg-gradient-to-b from-white via-white to-neutral-50',
          className
        )}
      >
        {isClassic ? (
          <>
            <p className="font-serif text-2xl text-amber-900/80 italic">In liebevoller Erinnerung</p>
            <div className="mt-8 w-12 h-12 rounded-full border-2 border-amber-900/30" />
          </>
        ) : (
          <>
            <p className="font-serif text-xl text-muted-foreground italic">In liebevoller Erinnerung</p>
            <div className="mt-6 w-8 h-8 rounded-full border-2 border-primary/20" />
          </>
        )}
      </div>
    )
  }

  // ========== HERO / SINGLE ==========
  if ((page.type === 'hero' || page.type === 'single') && page.imageIndex !== undefined) {
    const src = getImageUrl(page.imageIndex)
    if (!src) return <div className={cn('flex items-center justify-center h-full bg-muted/20', className)} />
    return (
      <div className={cn(
        'relative h-full w-full flex items-center justify-center p-4 md:p-6',
        isClassic ? 'bg-[#e8e0d2]' : 'bg-neutral-100',
        className
      )}>
        <img
          src={src}
          alt={getCaption(page.imageIndex)}
          className="max-w-full max-h-full w-auto h-auto object-contain"
        />
        {getCaption(page.imageIndex) && (
          <p className={cn(
            'absolute bottom-4 left-4 right-4 text-center text-sm',
            isClassic ? 'text-amber-900/90 drop-shadow' : 'text-foreground/90'
          )}>
            {getCaption(page.imageIndex)}
          </p>
        )}
      </div>
    )
  }

  // ========== POLAROID ==========
  if (page.type === 'polaroid' && page.imageIndices?.length) {
    const indices = page.imageIndices
    const srcs = indices.map((i) => getImageUrl(i))

    // Modern: sauberes 2er-Grid, keine Überlappung
    if (!isClassic) {
      return (
        <div className={cn('grid grid-cols-2 gap-3 md:gap-4 h-full w-full p-4 md:p-6', className)}>
          {srcs.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl shadow-md">
              <PhotoFrame src={src} caption={getCaption(indices[i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
            </div>
          ))}
        </div>
      )
    }

    // Classic: überlappende Polaroids
    const configs = [
      { rot: -5, x: '50%', y: '50%', w: '65%' },
      { rot: 6, x: '30%', y: '35%', w: '42%' },
      { rot: -4, x: '70%', y: '65%', w: '42%' },
    ]
    return (
      <div className={cn('relative h-full w-full flex items-center justify-center p-4 md:p-8', className)}>
        <div className="relative w-full max-w-lg h-full">
          {srcs.map((src, i) => {
            const cfg = configs[i % 3]
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: cfg.x, top: cfg.y, width: cfg.w, aspectRatio: '1', zIndex: i, transform: `translate(-50%, -50%) rotate(${cfg.rot}deg)` }}
              >
                <PhotoFrame src={src} caption={getCaption(indices[i])} variant="polaroid" albumStyle={albumStyle} className="h-full w-full" />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ========== OVERLAP ==========
  if (page.type === 'overlap' && page.imageIndices?.length) {
    const indices = page.imageIndices
    const srcs = indices.map((i) => getImageUrl(i))

    // Modern: sauberes Grid (2 oder 3 Bilder), keine Überlappung
    if (!isClassic) {
      const n = indices.length
      return (
        <div className={cn(
          'h-full w-full p-4 md:p-6',
          n === 2 ? 'grid grid-cols-2 gap-3 md:gap-4' : 'grid grid-cols-2 grid-rows-2 gap-3 md:gap-4',
          className
        )}>
          {srcs.map((src, i) => (
            <div key={i} className={cn('overflow-hidden rounded-xl shadow-md', n === 3 && i === 0 && 'col-span-2')}>
              <PhotoFrame src={src} caption={getCaption(indices[i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
            </div>
          ))}
        </div>
      )
    }

    // Classic: überlappende Bilder
    const positions = [
      { left: '5%', top: '10%', width: '58%', rotate: -5 },
      { left: '32%', top: '30%', width: '58%', rotate: 4 },
      { left: '15%', top: '52%', width: '52%', rotate: -3 },
    ]
    return (
      <div className={cn('relative h-full w-full overflow-hidden p-4 md:p-8', className)}>
        {srcs.map((src, i) => (
          <div
            key={i}
            className="absolute overflow-hidden rounded-sm"
            style={{
              left: positions[i]?.left ?? '15%',
              top: positions[i]?.top ?? '20%',
              width: positions[i]?.width ?? '60%',
              aspectRatio: '4/3',
              transform: `rotate(${positions[i]?.rotate ?? 0}deg)`,
              zIndex: i,
              boxShadow: '0 4px 20px rgba(80,50,20,0.25)',
            }}
          >
            <PhotoFrame src={src} caption={getCaption(indices[i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
          </div>
        ))}
      </div>
    )
  }

  // ========== BENTO ==========
  if (page.type === 'bento' && page.imageIndices?.length) {
    const indices = page.imageIndices
    const srcs = indices.map((i) => getImageUrl(i))
    const n = indices.length
    const gap = isClassic ? 'gap-2' : 'gap-3'
    const rounded = isClassic ? 'rounded-sm' : 'rounded-xl'
    return (
      <div className={cn('h-full w-full p-3 md:p-5', className)}>
        {n === 3 ? (
          <div className={cn('grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 h-full')}>
            <div className={cn('col-span-2 row-span-2 overflow-hidden', rounded)}>
              <PhotoFrame src={srcs[0]} caption={getCaption(indices[0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
            </div>
            <div className={cn('overflow-hidden', rounded)}>
              <PhotoFrame src={srcs[1]} caption={getCaption(indices[1])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
            </div>
            <div className={cn('overflow-hidden', rounded)}>
              <PhotoFrame src={srcs[2]} caption={getCaption(indices[2])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
            </div>
          </div>
        ) : (
          <div className={cn('grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 h-full')}>
            {srcs.map((src, i) => (
              <div key={i} className={cn('overflow-hidden', rounded, i === 0 && 'col-span-2 row-span-2')}>
                <PhotoFrame src={src} caption={getCaption(indices[i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ========== DOUBLE ==========
  if (page.type === 'double' && page.imageIndices?.length === 2) {
    const [src0, src1] = page.imageIndices.map((i) => getImageUrl(i))
    const rounded = isClassic ? 'rounded-sm' : 'rounded-xl'
    return (
      <div className={cn('grid grid-cols-2 gap-2 md:gap-4 h-full w-full p-3 md:p-5', className)}>
        {[src0, src1].map((src, i) => (
          <div key={i} className={cn('relative overflow-hidden', rounded)}>
            <PhotoFrame src={src} caption={getCaption(page.imageIndices![i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
          </div>
        ))}
      </div>
    )
  }

  // ========== TRIPLE ==========
  if (page.type === 'triple' && page.imageIndices?.length === 3) {
    const rounded = isClassic ? 'rounded-sm' : 'rounded-xl'
    return (
      <div className={cn('flex flex-col gap-2 md:gap-3 h-full w-full p-3 md:p-5', className)}>
        <div className={cn('flex-1 min-h-0 overflow-hidden', rounded)}>
          <PhotoFrame src={getImageUrl(page.imageIndices![0])} caption={getCaption(page.imageIndices![0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
        </div>
        <div className={cn('grid grid-cols-2 gap-2 md:gap-3 flex-1 min-h-0')}>
          {[1, 2].map((i) => (
            <div key={i} className={cn('overflow-hidden', rounded)}>
              <PhotoFrame src={getImageUrl(page.imageIndices![i])} caption={getCaption(page.imageIndices![i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ========== GRID ==========
  if (page.type === 'grid' && page.imageIndices?.length === 4) {
    const rounded = isClassic ? 'rounded-sm' : 'rounded-xl'
    return (
      <div className={cn('grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 h-full w-full p-3 md:p-5', className)}>
        {page.imageIndices.map((i, idx) => (
          <div key={idx} className={cn('overflow-hidden', rounded)}>
            <PhotoFrame src={getImageUrl(i)} caption={getCaption(i)} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
          </div>
        ))}
      </div>
    )
  }

  return null
}
