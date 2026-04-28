import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { EngineAlbumBlock, EngineMediaItem } from '@/lib/album-engine/types'
import { isVideoPath } from '@/lib/album/paths'
import { MediaFrame } from './MediaFrame'
import { VideoPremiumBlock } from './VideoPremiumBlock'
import { ClassicPhotoMount } from './ClassicPhotoMount'

function land(m: EngineMediaItem) {
  return m.orientation === 'landscape'
}
function port(m: EngineMediaItem) {
  return m.orientation === 'portrait'
}

/**
 * Portrait-Vorlagen: 3:4 wie klassischer Abzug (nie extremes „Turm“-Hochformat).
 * fitGridHeight: innerhalb eines Raster-Zellen (max. Zeilenhöhe); sonst viewport-schonend.
 */
function PortraitSlot({
  children,
  fitGridHeight,
  className,
}: {
  children: ReactNode
  /** true: Höhe maximal 100% der Grid-Zelle (nebeneinander / Sidebar) */
  fitGridHeight?: boolean
  className?: string
}) {
  return (
    <div
      className={cn('relative mx-auto w-full max-w-full min-h-0', className)}
      style={{
        aspectRatio: '3 / 4',
        maxHeight: fitGridHeight ? '100%' : 'min(100%, min(72dvh, 520px))',
      }}
    >
      {children}
    </div>
  )
}

/** Leichte, deterministische Drehung pro Bild wie hand eingeklebt (ca. −3,5° … +3,5°). */
function classicSlotRotation(variant: number, sourceIndex: number, slot: number): number {
  let h = Math.imul(variant, 374761393) ^ Math.imul(sourceIndex, 668265263) ^ Math.imul(slot, 1274126177)
  h = (h ^ (h >>> 13)) >>> 0
  return ((h % 700) / 100) - 3.5
}

/** Stärkere, deterministische Drehung für Vintage-Feeling (ca. −6° … +6°). */
function vintageSlotRotation(variant: number, sourceIndex: number, slot: number): number {
  let h = Math.imul(variant, 2654435761) ^ Math.imul(sourceIndex, 668265263) ^ Math.imul(slot, 2246822519)
  h = (h ^ (h >>> 16)) >>> 0
  return ((h % 1200) / 100) - 6
}

export function AlbumEngineView({
  block,
  getUrl,
  getCaption,
  getPath,
  className,
}: {
  block: EngineAlbumBlock
  getUrl: (index: number) => string | null
  getCaption: (index: number) => string
  getPath: (index: number) => string
  className?: string
}) {
  const classic = block.mode === 'classic'
  const vintage = block.mode === 'vintage'
  const items = block.items
  const v = block.variant
  const rotSlot = (m: EngineMediaItem, slot: number) =>
    vintage
      ? vintageSlotRotation(v, m.sourceIndex, slot)
      : classic
        ? classicSlotRotation(v, m.sourceIndex, slot)
        : 0

  const u = (m: EngineMediaItem) => getUrl(m.sourceIndex)
  const cap = (m: EngineMediaItem) => m.caption ?? getCaption(m.sourceIndex)

  const shell = (inner: ReactNode) => (
    <motion.div
      className={cn('h-full w-full min-h-0', className)}
      initial={{ opacity: 0.92, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {classic ? (
        <div className="album-page-classic flex h-full w-full min-h-0 overflow-hidden rounded-[inherit]">
          <div className="classic-engine-spine self-stretch" aria-hidden />
          <div className="classic-engine-page flex min-h-0 min-w-0 flex-1 flex-col p-4 sm:p-5 md:p-6">
            {/* Gold hairline top-rule */}
            <div
              aria-hidden
              className="mb-3 flex items-center gap-2 shrink-0"
              style={{ color: '#C9A84C' }}
            >
              <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C88, transparent)' }} />
              <span className="page-marker-classic">{block.variant % 20 + 1}</span>
              <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C88, transparent)' }} />
            </div>
            <div className="relative z-[1] flex min-h-0 w-full flex-1 flex-col">{inner}</div>
          </div>
        </div>
      ) : vintage ? (
        <div className="album-page-vintage vintage-sepia-strong flex h-full w-full min-h-0 overflow-hidden rounded-[inherit]">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col p-5 sm:p-6 md:p-8">
            <div className="relative z-[1] flex min-h-0 w-full flex-1 flex-col">{inner}</div>
          </div>
        </div>
      ) : (
        /* Modern — Inspired by: Kinfolk, Cereal, The Gentlewoman */
        <div className="album-page-modern flex h-full w-full min-h-0 flex-col rounded-[inherit]">
          {/* Issue-number top marker */}
          <div className="flex shrink-0 items-center justify-between px-5 pt-4 pb-0">
            <span className="page-marker-modern">N° {String(block.variant % 20 + 1).padStart(2, '0')}</span>
            <span className="h-px flex-1 mx-4" style={{ background: 'hsl(0 0% 88%)' }} />
          </div>
          <div className="flex min-h-0 w-full flex-1 flex-col p-4 sm:p-5 pt-3">
            {inner}
          </div>
        </div>
      )}
    </motion.div>
  )

  const isVideoLayout =
    block.layoutId === 'cinematic-video-feature' ||
    block.layoutId === 'classic-video-memory-card' ||
    block.layoutId === 'vintage-video-memory'

  if (isVideoLayout && items[0]) {
    const m0 = items[0]
    const path = getPath(m0.sourceIndex)
    if (isVideoPath(path)) {
      return shell(<VideoPremiumBlock src={u(m0)} caption={cap(m0)} classic={classic || vintage} />)
    }
  }

  const one = (extra?: string) => {
    const m = items[0]!
    const heroRatio =
      block.layoutId === 'hero-single-portrait' || block.layoutId === 'quiet-single'
        ? '3 / 4'
        : block.layoutId === 'full-bleed-moment'
          ? '16 / 9'
          : '16 / 9'
    const isPortraitHero =
      block.layoutId === 'hero-single-portrait' || block.layoutId === 'quiet-single'
    return (
      <div className={cn('flex flex-1 flex-col items-center justify-center min-h-0', extra)}>
        <div
          className="relative w-full max-w-full min-h-0"
          style={{
            aspectRatio: heroRatio,
            maxHeight: isPortraitHero ? 'min(100%, min(72dvh, 520px))' : 'min(100%, min(85dvh, 520px))',
          }}
        >
          <MediaFrame
            src={u(m)}
            alt={cap(m)}
            caption={cap(m)}
            classic={classic}
            rotationDeg={rotSlot(m, 0)}
            className={cn('h-full w-full', !classic && 'rounded-lg')}
          />
        </div>
      </div>
    )
  }

  // Vintage-specific render helpers — use ClassicPhotoMount as polaroid base
  const vintageOne = (captionItalic?: boolean) => {
    const m = items[0]!
    const isQuiet = block.layoutId === 'vintage-quiet-page'
    return (
      <div className={cn('flex flex-1 flex-col items-center justify-center min-h-0', isQuiet && 'gap-4')}>
        <ClassicPhotoMount
          rotationDeg={rotSlot(m, 0)}
          className="w-[min(88%,340px)]"
          matClassName="pb-[clamp(28px,5vw,44px)]"
        >
          <div className="relative w-full" style={{ aspectRatio: m.orientation === 'portrait' ? '3 / 4' : '4 / 3' }}>
            <MediaFrame
              src={u(m)}
              alt={cap(m)}
              caption=""
              classic={false}
              rotationDeg={0}
              className="h-full w-full"
            />
          </div>
        </ClassicPhotoMount>
        {cap(m) && (
          <p className={cn('caption-vintage text-center leading-snug px-4')}>
            {cap(m)}
          </p>
        )}
      </div>
    )
  }

  const vintagePair = () => {
    const [a, b] = items
    const bothPort = port(a!) && port(b!)
    return (
      <div className={cn('flex flex-1 min-h-0 items-center justify-center', bothPort ? 'gap-6' : 'flex-col gap-4')}>
        {[a!, b!].map((m, i) => (
          <ClassicPhotoMount
            key={m.sourceIndex}
            rotationDeg={rotSlot(m, i)}
            className={cn(bothPort ? 'w-[min(44%,200px)]' : 'w-[min(80%,320px)]')}
            matClassName="pb-[clamp(22px,4vw,36px)]"
          >
            <div className="relative w-full" style={{ aspectRatio: m.orientation === 'portrait' ? '3 / 4' : '4 / 3' }}>
              <MediaFrame
                src={u(m)}
                alt={cap(m)}
                caption=""
                classic={false}
                rotationDeg={0}
                className="h-full w-full"
              />
            </div>
          </ClassicPhotoMount>
        ))}
      </div>
    )
  }

  const vintageTriple = () => {
    const offsets = [
      { x: -12, y: 0 },
      { x: 12, y: 16 },
      { x: -4, y: 32 },
    ]
    return (
      <div className="relative flex flex-1 min-h-0 items-center justify-center">
        {items.slice(0, 3).map((m, i) => (
          <div
            key={m.sourceIndex}
            className="absolute"
            style={{
              left: `${30 + offsets[i]!.x}%`,
              top: `${10 + offsets[i]!.y}px`,
              zIndex: i + 1,
              transform: `translateX(-50%)`,
            }}
          >
            <ClassicPhotoMount
              rotationDeg={rotSlot(m, i)}
              className="w-[min(52%,220px)] min-w-[140px]"
              matClassName="pb-[clamp(20px,3.5vw,32px)]"
            >
              <div className="relative w-full" style={{ aspectRatio: m.orientation === 'portrait' ? '3 / 4' : '4 / 3' }}>
                <MediaFrame
                  src={u(m)}
                  alt={cap(m)}
                  caption=""
                  classic={false}
                  rotationDeg={0}
                  className="h-full w-full"
                />
              </div>
            </ClassicPhotoMount>
          </div>
        ))}
      </div>
    )
  }

  const vintageFourGrid = () => (
    <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-4 sm:gap-5 min-h-0 items-center justify-items-center">
      {items.slice(0, 4).map((m, i) => (
        <ClassicPhotoMount
          key={m.sourceIndex}
          rotationDeg={rotSlot(m, i)}
          className="w-full max-w-[200px]"
          matClassName="pb-[clamp(18px,3vw,28px)]"
        >
          <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
            <MediaFrame
              src={u(m)}
              alt={cap(m)}
              caption=""
              classic={false}
              rotationDeg={0}
              className="h-full w-full"
            />
          </div>
        </ClassicPhotoMount>
      ))}
    </div>
  )

  const twoBands = () => {
    const [a, b] = items
    const mode = v % 4
    if (mode === 3) {
      return (
        <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 min-h-0">
          {[a!, b!].map((m, i) => (
            <MediaFrame
              key={m.sourceIndex}
              src={u(m)}
              alt={cap(m)}
              caption={cap(m)}
              classic={classic}
              rotationDeg={rotSlot(m, i)}
              className={cn('h-full min-h-0', !classic && 'rounded-lg')}
            />
          ))}
        </div>
      )
    }
    if (mode === 1 || mode === 2) {
      const top = mode === 1 ? a! : b!
      const bot = mode === 1 ? b! : a!
      return (
        <div className="flex flex-1 flex-col gap-3 min-h-0">
          <div className="relative flex-[1.2] min-h-0" style={{ aspectRatio: '16 / 9' }}>
            <MediaFrame
              src={u(top)}
              alt={cap(top)}
              caption={cap(top)}
              classic={classic}
              rotationDeg={rotSlot(top, 0)}
              className={cn('h-full', !classic && 'rounded-lg')}
            />
          </div>
          <div className="relative flex-1 min-h-0" style={{ aspectRatio: '4 / 3' }}>
            <MediaFrame
              src={u(bot)}
              alt={cap(bot)}
              caption={cap(bot)}
              classic={classic}
              rotationDeg={rotSlot(bot, 1)}
              className={cn('h-full', !classic && 'rounded-lg')}
            />
          </div>
        </div>
      )
    }
    return (
      <div className="flex flex-1 flex-col gap-3 min-h-0">
        {[a!, b!].map((m, i) => (
          <div key={m.sourceIndex} className="relative flex-1 min-h-0" style={{ aspectRatio: '4 / 3' }}>
            <MediaFrame
              src={u(m)}
              alt={cap(m)}
              caption={cap(m)}
              classic={classic}
              rotationDeg={rotSlot(m, i)}
              className={cn('h-full', !classic && 'rounded-lg')}
            />
          </div>
        ))}
      </div>
    )
  }

  const twoPortraits = () => {
    const [a, b] = items
    const swap = (v & 1) === 1
    const left = swap ? b! : a!
    const right = swap ? a! : b!
    return (
      <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 min-h-0 items-center">
        {[left, right].map((m, i) => (
          <div key={m.sourceIndex} className="flex min-h-0 items-center justify-center px-0.5 py-1">
            <PortraitSlot>
              <MediaFrame
                src={u(m)}
                alt={cap(m)}
                caption={cap(m)}
                classic={classic}
                rotationDeg={rotSlot(m, i)}
                className={cn('h-full w-full', !classic && 'rounded-lg')}
              />
            </PortraitSlot>
          </div>
        ))}
      </div>
    )
  }

  const tripleEqual = () => (
    <div className="flex flex-1 flex-col gap-3 min-h-0">
      {items.map((m, i) => (
        <div
          key={m.sourceIndex}
          className={cn('relative min-h-0 flex-1', classic ? 'overflow-visible py-0.5' : 'overflow-hidden rounded-lg')}
        >
          <MediaFrame
            src={u(m)}
            alt={cap(m)}
            caption={cap(m)}
            classic={classic}
            rotationDeg={rotSlot(m, i)}
            className="h-full"
          />
        </div>
      ))}
    </div>
  )

  const tripleHeroBottom = () => {
    const [a, b, c] = items
    return (
      <div className="flex flex-1 flex-col gap-3 min-h-0">
        <div
          className={cn('relative min-h-0 flex-[1.25]', classic ? 'overflow-visible py-0.5' : 'overflow-hidden rounded-lg')}
        >
          <MediaFrame
            src={u(a!)}
            alt={cap(a!)}
            caption={cap(a!)}
            classic={classic}
            rotationDeg={rotSlot(a!, 0)}
            className="h-full"
          />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3 min-h-0">
          <MediaFrame
            src={u(b!)}
            alt={cap(b!)}
            caption={cap(b!)}
            classic={classic}
            rotationDeg={rotSlot(b!, 1)}
            className={cn('min-h-0', !classic && 'rounded-lg')}
          />
          <MediaFrame
            src={u(c!)}
            alt={cap(c!)}
            caption={cap(c!)}
            classic={classic}
            rotationDeg={rotSlot(c!, 2)}
            className={cn('min-h-0', !classic && 'rounded-lg')}
          />
        </div>
      </div>
    )
  }

  const pLeftLR = () => {
    const P = items.find(port)!
    const Ls = items.filter(land)
    const mirror = (v & 1) === 1
    const [l1, l2] = Ls
    if (mirror) {
      return (
        <div className="grid flex-1 grid-cols-[1fr_minmax(9rem,38%)] grid-rows-2 gap-3 min-h-0">
          <div className="col-start-1 row-start-1 min-h-0">
            <MediaFrame
              src={u(l1!)}
              alt={cap(l1!)}
              caption={cap(l1!)}
              classic={classic}
              rotationDeg={rotSlot(l1!, 0)}
              className={cn('h-full', !classic && 'rounded-lg')}
            />
          </div>
          <div className="col-start-1 row-start-2 min-h-0">
            <MediaFrame
              src={u(l2!)}
              alt={cap(l2!)}
              caption={cap(l2!)}
              classic={classic}
              rotationDeg={rotSlot(l2!, 1)}
              className={cn('h-full', !classic && 'rounded-lg')}
            />
          </div>
          <div className="col-start-2 row-span-2 flex items-center justify-center min-h-0 py-0.5">
            <PortraitSlot fitGridHeight>
              <MediaFrame
                src={u(P)}
                alt={cap(P)}
                caption={cap(P)}
                classic={classic}
                rotationDeg={rotSlot(P, 2)}
                className={cn('h-full w-full', !classic && 'rounded-lg')}
              />
            </PortraitSlot>
          </div>
        </div>
      )
    }
    return (
      <div className="grid flex-1 grid-cols-[minmax(9rem,38%)_1fr] grid-rows-2 gap-3 min-h-0">
        <div className="row-span-2 flex items-center justify-center min-h-0 py-0.5">
          <PortraitSlot fitGridHeight>
            <MediaFrame
              src={u(P)}
              alt={cap(P)}
              caption={cap(P)}
              classic={classic}
              rotationDeg={rotSlot(P, 0)}
              className={cn('h-full w-full', !classic && 'rounded-lg')}
            />
          </PortraitSlot>
        </div>
        <MediaFrame
          src={u(l1!)}
          alt={cap(l1!)}
          caption={cap(l1!)}
          classic={classic}
          rotationDeg={rotSlot(l1!, 1)}
          className={cn('min-h-0', !classic && 'rounded-lg')}
        />
        <MediaFrame
          src={u(l2!)}
          alt={cap(l2!)}
          caption={cap(l2!)}
          classic={classic}
          rotationDeg={rotSlot(l2!, 2)}
          className={cn('min-h-0', !classic && 'rounded-lg')}
        />
      </div>
    )
  }

  const lTopPP = () => {
    const L = items.find(land)!
    const Ps = items.filter(port)
    const [p1, p2] = Ps
    const swap = (v & 1) === 1
    return (
      <div className="grid flex-1 grid-cols-2 gap-3 min-h-0 grid-rows-[minmax(0,0.44fr)_1fr]">
        <div className="col-span-2 min-h-0">
          <MediaFrame
            src={u(L)}
            alt={cap(L)}
            caption={cap(L)}
            classic={classic}
            rotationDeg={rotSlot(L, 0)}
            className={cn('h-full', !classic && 'rounded-lg')}
          />
        </div>
        <div className="flex min-h-0 items-center justify-center">
          <PortraitSlot fitGridHeight className="w-full">
            <MediaFrame
              src={u(swap ? p2! : p1!)}
              alt={cap(swap ? p2! : p1!)}
              caption={cap(swap ? p2! : p1!)}
              classic={classic}
              rotationDeg={rotSlot(swap ? p2! : p1!, 1)}
              className={cn('h-full w-full', !classic && 'rounded-lg')}
            />
          </PortraitSlot>
        </div>
        <div className="flex min-h-0 items-center justify-center">
          <PortraitSlot fitGridHeight className="w-full">
            <MediaFrame
              src={u(swap ? p1! : p2!)}
              alt={cap(swap ? p1! : p2!)}
              caption={cap(swap ? p1! : p2!)}
              classic={classic}
              rotationDeg={rotSlot(swap ? p1! : p2!, 2)}
              className={cn('h-full w-full', !classic && 'rounded-lg')}
            />
          </PortraitSlot>
        </div>
      </div>
    )
  }

  const fourGrid = () => {
    const order = (v & 1) === 1 ? [0, 2, 1, 3] : [0, 1, 2, 3]
    return (
      <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-3 sm:gap-4 min-h-0">
        {order.map((idx, i) => {
          const m = items[idx]!
          return (
            <div
              key={m.sourceIndex}
              className={cn(
                'relative min-h-0',
                classic ? 'overflow-visible py-0.5' : 'overflow-hidden rounded-lg'
              )}
              style={{ aspectRatio: '1 / 1' }}
            >
              <MediaFrame
                src={u(m)}
                alt={cap(m)}
                caption={cap(m)}
                classic={classic}
                rotationDeg={rotSlot(m, i)}
                className="h-full"
              />
            </div>
          )
        })}
      </div>
    )
  }

  const id = block.layoutId

  // Vintage dispatch — dedicated polaroid/scatter rendering
  if (vintage) {
    if (items.length === 1) {
      return shell(vintageOne(id === 'vintage-quiet-page' || id === 'vintage-landscape-feature'))
    }
    if (items.length === 2) return shell(vintagePair())
    if (items.length === 3) return shell(vintageTriple())
    if (items.length === 4) return shell(vintageFourGrid())
    return shell(vintageOne())
  }

  if (items.length === 1) {
    return shell(one())
  }

  if (items.length === 2) {
    if (
      id === 'two-portraits' ||
      id === 'classic-portrait-pair' ||
      (port(items[0]!) && port(items[1]!))
    ) {
      return shell(twoPortraits())
    }
    if (
      id === 'two-landscapes' ||
      id === 'gallery-break' ||
      id === 'classic-landscape-pair' ||
      (land(items[0]!) && land(items[1]!))
    ) {
      return shell(twoBands())
    }
    return shell(twoBands())
  }

  if (items.length === 3) {
    if (id === 'portrait-left-stack-right' || (items.filter(port).length === 1 && items.filter(land).length === 2)) {
      return shell(pLeftLR())
    }
    if (id === 'landscape-top-two-bottom' || (items.filter(land).length === 1 && items.filter(port).length === 2)) {
      return shell(lTopPP())
    }
    if (id === 'three-grid-balanced' || id === 'square-cluster' || id === 'classic-mixed-memory-page') {
      return shell((v & 2) === 0 ? tripleEqual() : tripleHeroBottom())
    }
    if (id === 'asymmetric-feature' || id === 'classic-feature-with-supporting') {
      return shell(tripleHeroBottom())
    }
    if (id === 'classic-three-photo-page') {
      return shell(tripleEqual())
    }
    return shell((v & 1) === 0 ? tripleEqual() : tripleHeroBottom())
  }

  if (items.length === 4) {
    return shell(fourGrid())
  }

  return shell(one('items-center text-muted-foreground text-sm'))
}
