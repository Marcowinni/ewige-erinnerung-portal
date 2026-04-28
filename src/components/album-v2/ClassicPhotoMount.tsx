import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Kleine dreieckige Foto-Ecken wie beim physischen Einstecken */
function PhotoCorners({ className }: { className?: string }) {
  const arm = 'absolute z-20 pointer-events-none border-[#100e0c]'
  return (
    <>
      <span
        className={cn(arm, 'left-1 top-1 h-3 w-3 border-l-[2.5px] border-t-[2.5px]', className)}
        aria-hidden
      />
      <span
        className={cn(arm, 'right-1 top-1 h-3 w-3 border-r-[2.5px] border-t-[2.5px]', className)}
        aria-hidden
      />
      <span
        className={cn(arm, 'bottom-1 left-1 h-3 w-3 border-b-[2.5px] border-l-[2.5px]', className)}
        aria-hidden
      />
      <span
        className={cn(arm, 'bottom-1 right-1 h-3 w-3 border-b-[2.5px] border-r-[2.5px]', className)}
        aria-hidden
      />
    </>
  )
}

/**
 * Photo mount used in two modes:
 * - Default (classic=false): vintage Polaroid — thick white bottom border, tape hint, sepia tint
 * - Classic (classic=true): cream cartridge mat with dark photo-corner tabs
 */
export function ClassicPhotoMount({
  children,
  rotationDeg = 0,
  className,
  matClassName,
  classic = false,
}: {
  children: ReactNode
  rotationDeg?: number
  className?: string
  matClassName?: string
  /** true = Classic album style (dark corners, cream mat). false = Vintage Polaroid style */
  classic?: boolean
}) {
  if (classic) {
    return (
      <div
        className={cn('classic-photo-mount relative isolate min-h-0 min-w-0', className)}
        style={rotationDeg !== 0 ? { transform: `rotate(${rotationDeg}deg)` } : undefined}
      >
        <div
          className={cn(
            'relative isolate h-full w-full min-h-0 min-w-0 overflow-hidden',
            'rounded-[2px]',
            'bg-[#ebe4d6]',
            'shadow-[0_5px_18px_rgba(0,0,0,0.42),0_1px_0_rgba(255,255,255,0.12)_inset]',
            'ring-1 ring-black/15',
            matClassName
          )}
          style={{
            padding: 'clamp(7px, 1.6vw, 11px)',
            backgroundImage: `
              linear-gradient(165deg, rgba(255,252,245,0.55) 0%, transparent 42%),
              radial-gradient(ellipse 80% 50% at 20% 0%, rgba(212,190,160,0.22) 0%, transparent 55%),
              radial-gradient(ellipse 60% 40% at 100% 100%, rgba(160,130,95,0.12) 0%, transparent 50%),
              linear-gradient(180deg, #efe8da 0%, #e8e0d1 48%, #ddd5c6 100%)
            `,
          }}
        >
          <span
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.14] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          <div className="relative z-[2] h-full w-full min-h-0 min-w-0 overflow-hidden rounded-[1px] ring-1 ring-black/[0.08]">
            {children}
          </div>
          <PhotoCorners />
        </div>
      </div>
    )
  }

  /* Vintage Polaroid — white mat, thick bottom, tape strip, sepia tint overlay */
  return (
    <div
      className={cn('relative isolate min-h-0 min-w-0', className)}
      style={rotationDeg !== 0 ? { transform: `rotate(${rotationDeg}deg)` } : undefined}
    >
      {/* Tape strip */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 -top-[9px] z-20"
        style={{
          transform: 'translateX(-50%) rotate(-1.5deg)',
          width: 'clamp(36px, 30%, 52px)',
          height: '14px',
          background: 'rgba(210, 185, 140, 0.55)',
          borderRadius: '1px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
          display: 'block',
        }}
      />
      <div
        className={cn(
          'relative isolate w-full min-h-0 min-w-0 overflow-hidden',
          'rounded-[2px]',
          'bg-[#FFFCF5]',
          'shadow-[0_8px_24px_rgba(0,0,0,0.32),0_1px_3px_rgba(0,0,0,0.18)]',
          matClassName
        )}
        style={{
          padding: 'clamp(7px, 1.8vw, 11px)',
          paddingBottom: 'clamp(28px, 6vw, 44px)',
        }}
      >
        {/* Sepia-tint vignette over image */}
        <span
          className="pointer-events-none absolute inset-0 z-[3] rounded-[1px]"
          style={{ background: 'rgba(139, 107, 71, 0.07)', mixBlendMode: 'multiply' }}
          aria-hidden
        />
        {/* Subtle paper aging */}
        <span
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.10] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative z-[2] h-full w-full min-h-0 min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
