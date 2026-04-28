import { cn } from '@/lib/utils'
import type { AlbumLayoutPage } from './types'
import { AlbumEngineView } from '@/components/album-v2/AlbumEngineView'
import { AlbumBlockPage } from './AlbumBlockPage'
import { AlbumSpread } from './AlbumSpread'
import { layoutForPair, layoutForTriple } from '@/hooks/useImageAspectRatios'

interface AlbumPageProps {
  page: AlbumLayoutPage
  getImageUrl: (index: number) => string | null
  getCaption: (index: number) => string
  /** Natürliches Seitenverhältnis (Breite/Höhe), für Rasterwahl */
  getAspect?: (index: number) => number | undefined
  /** Storage-Pfad für Video-Erkennung in Block-Templates */
  getMediaPath?: (index: number) => string
  albumStyle: 'modern' | 'classic' | 'vintage'
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
  albumStyle: 'modern' | 'classic' | 'vintage'
}) {
  if (!src) return <div className={cn('bg-muted/30', className)} />
  const isClassic = albumStyle === 'classic'
  const isPolaroid = variant === 'polaroid'
  // Modern: Bild komplett sichtbar (kein harter Zuschnitt). Classic: klassisches „füllt Kachel“.
  const imgFit = isClassic ? 'object-cover' : 'object-contain'

  return (
    <div
      className={cn(
        'relative overflow-hidden flex flex-col min-h-0',
        isClassic ? 'bg-[#f5f0e6]' : 'bg-neutral-100',
        isPolaroid && (isClassic ? 'p-3 pb-10 shadow-[0_6px_24px_rgba(80,50,20,0.25)] border border-amber-900/20' : 'p-2 pb-8 shadow-[0_4px_16px_rgba(0,0,0,0.12)]'),
        variant === 'shadow' && (isClassic ? 'shadow-[0_4px_20px_rgba(80,50,20,0.2)] rounded-sm border border-amber-900/15' : 'shadow-lg rounded-xl'),
        className
      )}
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <img src={src} alt={caption} className={cn('max-w-full max-h-full w-full h-full', imgFit)} />
      </div>
      {caption && isPolaroid && (
        <p className={cn(
          'absolute bottom-2 left-2 right-2 text-center text-sm font-serif',
          isClassic ? 'text-amber-900/80' : 'text-foreground/80'
        )}>
          {caption}
        </p>
      )}
      {caption && !isPolaroid && (
        <p
          className={cn(
            'shrink-0 py-1 px-2 text-center text-sm',
            isClassic ? 'text-white drop-shadow-lg absolute bottom-2 left-2 right-2' : 'text-foreground/80 relative'
          )}
        >
          {caption}
        </p>
      )}
    </div>
  )
}

export function AlbumPage({
  page,
  getImageUrl,
  getCaption,
  getAspect,
  getMediaPath,
  albumStyle,
  className,
}: AlbumPageProps) {
  const isClassic = albumStyle === 'classic'

  // ========== INTRO ==========
  if (page.type === 'intro') {
    return (
      <div
        className={cn(
          'relative z-[1] flex flex-col items-center justify-center h-full w-full p-8 text-center',
          isClassic ? 'classic-engine-page' : 'bg-gradient-to-b from-neutral-50 via-white to-white',
          className
        )}
      >
        {isClassic ? (
          <>
            <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 mb-3 tracking-wide drop-shadow-sm">
              {page.name || 'Erinnerungen'}
            </div>
            <p className="text-stone-400 text-base sm:text-lg font-serif italic">Ein Erinnerungsalbum</p>
            <div className="mt-10 w-24 h-px bg-stone-500/45" />
            <div className="mt-2 w-16 h-px bg-stone-600/35" />
          </>
        ) : (
          <>
            <div className="font-serif text-3xl sm:text-4xl md:text-[2.65rem] text-stone-900 mb-3 tracking-tight font-normal leading-tight">
              {page.name || 'Erinnerungen'}
            </div>
            <p className="text-stone-600 text-base sm:text-lg font-normal tracking-wide">
              Ein digitales Erinnerungsalbum
            </p>
            <div className="mt-9 h-px w-20 bg-gradient-to-r from-stone-300 via-stone-400/80 to-stone-300" />
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
          'relative z-[1] flex flex-col items-center justify-center h-full w-full p-8 text-center',
          isClassic ? 'classic-engine-page' : 'bg-gradient-to-b from-white via-white to-neutral-50',
          className
        )}
      >
        {isClassic ? (
          <>
            <p className="font-serif text-2xl text-stone-200/95 italic">In liebevoller Erinnerung</p>
            <div className="mt-8 w-12 h-12 rounded-full border-2 border-stone-500/40" />
          </>
        ) : (
          <>
            <p className="font-serif text-xl text-stone-700 italic">In liebevoller Erinnerung</p>
            <div className="mt-6 w-9 h-9 rounded-full border-2 border-stone-300/90" />
          </>
        )}
      </div>
    )
  }

  // ========== BLOCK (Score-Engine: Modern / Classic) ==========
  if (page.type === 'block' && page.engineBlock) {
    return (
      <AlbumEngineView
        block={page.engineBlock}
        getUrl={getImageUrl}
        getCaption={getCaption}
        getPath={(i) => getMediaPath?.(i) ?? ''}
        className={className}
      />
    )
  }

  // ========== BLOCK (Legacy: template-basiert) ==========
  if (page.type === 'block' && page.layout && page.mediaIndices?.length) {
    return (
      <AlbumBlockPage
        layout={page.layout}
        mediaIndices={page.mediaIndices}
        blockVariant={page.blockVariant ?? 0}
        getMediaUrl={getImageUrl}
        getCaption={getCaption}
        getPath={(i) => getMediaPath?.(i) ?? ''}
        albumStyle={albumStyle}
        className={className}
      />
    )
  }

  // ========== SPREAD (1–3 Bilder, Vorlagen nach Format + Zufallsvariante) ==========
  if (page.type === 'spread' && page.imageIndices?.length) {
    const indices = page.imageIndices
    if (indices.length > 3) return null
    return (
      <AlbumSpread
        imageIndices={indices}
        spreadVariant={page.spreadVariant ?? 0}
        getImageUrl={getImageUrl}
        getCaption={getCaption}
        getAspect={getAspect}
        albumStyle={albumStyle}
        className={className}
      />
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

    // Modern: 2 Bilder – Querformat untereinander, Hochformat nebeneinander
    if (!isClassic) {
      const pair = layoutForPair(getAspect?.(indices[0]), getAspect?.(indices[1]))
      return (
        <div
          className={cn(
            'grid gap-3 md:gap-4 h-full w-full p-4 md:p-6 min-h-0',
            pair === 'stacked' ? 'grid-cols-1 grid-rows-2' : 'grid-cols-2 grid-rows-1',
            className
          )}
        >
          {srcs.map((src, i) => (
            <div key={i} className="min-h-0 overflow-hidden rounded-xl shadow-md">
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

    // Modern: 2–3 Bilder, Raster abhängig vom Format
    if (!isClassic) {
      const n = indices.length
      if (n === 2) {
        const pair = layoutForPair(getAspect?.(indices[0]), getAspect?.(indices[1]))
        return (
          <div
            className={cn(
              'grid gap-3 md:gap-4 h-full w-full p-4 md:p-6 min-h-0',
              pair === 'stacked' ? 'grid-cols-1 grid-rows-2' : 'grid-cols-2 grid-rows-1',
              className
            )}
          >
            {srcs.map((src, i) => (
              <div key={i} className="min-h-0 overflow-hidden rounded-xl shadow-md">
                <PhotoFrame src={src} caption={getCaption(indices[i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
              </div>
            ))}
          </div>
        )
      }
      const mode = layoutForTriple(indices.map((i) => getAspect?.(i)))
      if (mode === 'heroTop') {
        return (
          <div className={cn('flex flex-col gap-3 md:gap-4 h-full w-full p-4 md:p-6 min-h-0', className)}>
            <div className="flex-[1.15] min-h-0 overflow-hidden rounded-xl shadow-md">
              <PhotoFrame src={srcs[0]} caption={getCaption(indices[0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0">
              <div className="min-h-0 overflow-hidden rounded-xl shadow-md">
                <PhotoFrame src={srcs[1]} caption={getCaption(indices[1])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
              </div>
              <div className="min-h-0 overflow-hidden rounded-xl shadow-md">
                <PhotoFrame src={srcs[2]} caption={getCaption(indices[2])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className={cn('grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-full w-full p-4 md:p-6 min-h-0', className)}>
          <div className="row-span-2 min-h-0 overflow-hidden rounded-xl shadow-md">
            <PhotoFrame src={srcs[0]} caption={getCaption(indices[0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
          </div>
          <div className="min-h-0 overflow-hidden rounded-xl shadow-md">
            <PhotoFrame src={srcs[1]} caption={getCaption(indices[1])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
          </div>
          <div className="min-h-0 overflow-hidden rounded-xl shadow-md">
            <PhotoFrame src={srcs[2]} caption={getCaption(indices[2])} variant="shadow" albumStyle={albumStyle} className="h-full w-full rounded-xl" />
          </div>
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
    const rounded = isClassic ? 'rounded-sm' : 'rounded-xl'
    return (
      <div className={cn('h-full w-full p-3 md:p-5 min-h-0', className)}>
        {n === 3 ? (
          layoutForTriple(indices.map((i) => getAspect?.(i))) === 'heroTop' && !isClassic ? (
            <div className="flex flex-col gap-2 md:gap-3 h-full min-h-0">
              <div className={cn('flex-[1.15] min-h-0 overflow-hidden', rounded)}>
                <PhotoFrame src={srcs[0]} caption={getCaption(indices[0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3 flex-1 min-h-0">
                <div className={cn('min-h-0 overflow-hidden', rounded)}>
                  <PhotoFrame src={srcs[1]} caption={getCaption(indices[1])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
                </div>
                <div className={cn('min-h-0 overflow-hidden', rounded)}>
                  <PhotoFrame src={srcs[2]} caption={getCaption(indices[2])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
                </div>
              </div>
            </div>
          ) : (
          <div className={cn('grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 h-full min-h-0')}>
            <div className={cn('col-span-2 row-span-2 min-h-0 overflow-hidden', rounded)}>
              <PhotoFrame src={srcs[0]} caption={getCaption(indices[0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
            </div>
            <div className={cn('min-h-0 overflow-hidden', rounded)}>
              <PhotoFrame src={srcs[1]} caption={getCaption(indices[1])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
            </div>
            <div className={cn('min-h-0 overflow-hidden', rounded)}>
              <PhotoFrame src={srcs[2]} caption={getCaption(indices[2])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
            </div>
          </div>
          )
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
    const pair = !isClassic
      ? layoutForPair(getAspect?.(page.imageIndices![0]), getAspect?.(page.imageIndices![1]))
      : 'sideBySide'
    return (
      <div
        className={cn(
          'grid gap-2 md:gap-4 h-full w-full p-3 md:p-5 min-h-0',
          pair === 'stacked' ? 'grid-cols-1 grid-rows-2' : 'grid-cols-2 grid-rows-1',
          className
        )}
      >
        {[src0, src1].map((src, i) => (
          <div key={i} className={cn('min-h-0 overflow-hidden', rounded)}>
            <PhotoFrame src={src} caption={getCaption(page.imageIndices![i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
          </div>
        ))}
      </div>
    )
  }

  // ========== TRIPLE ==========
  if (page.type === 'triple' && page.imageIndices?.length === 3) {
    const rounded = isClassic ? 'rounded-sm' : 'rounded-xl'
    const idx = page.imageIndices!
    const mode = !isClassic ? layoutForTriple(idx.map((i) => getAspect?.(i))) : 'heroTop'
    if (mode === 'heroLeft') {
      return (
        <div className={cn('grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 h-full w-full p-3 md:p-5 min-h-0', className)}>
          <div className={cn('row-span-2 min-h-0 overflow-hidden', rounded)}>
            <PhotoFrame src={getImageUrl(idx[0])} caption={getCaption(idx[0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
          </div>
          <div className={cn('min-h-0 overflow-hidden', rounded)}>
            <PhotoFrame src={getImageUrl(idx[1])} caption={getCaption(idx[1])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
          </div>
          <div className={cn('min-h-0 overflow-hidden', rounded)}>
            <PhotoFrame src={getImageUrl(idx[2])} caption={getCaption(idx[2])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
          </div>
        </div>
      )
    }
    return (
      <div className={cn('flex flex-col gap-2 md:gap-3 h-full w-full p-3 md:p-5 min-h-0', className)}>
        <div className={cn('flex-[1.15] min-h-0 overflow-hidden', rounded)}>
          <PhotoFrame src={getImageUrl(idx[0])} caption={getCaption(idx[0])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
        </div>
        <div className={cn('grid grid-cols-2 gap-2 md:gap-3 flex-1 min-h-0')}>
          {[1, 2].map((i) => (
            <div key={i} className={cn('min-h-0 overflow-hidden', rounded)}>
              <PhotoFrame src={getImageUrl(idx[i])} caption={getCaption(idx[i])} variant="shadow" albumStyle={albumStyle} className="h-full w-full" />
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
