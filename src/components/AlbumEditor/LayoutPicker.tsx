import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { catalogForMode } from '@/lib/album-engine/catalog'
import type { AlbumMode, LayoutFamily } from '@/lib/album-engine/types'
import { cn } from '@/lib/utils'

interface Props {
  currentLayoutId: string
  mode: AlbumMode
  mediaCount: number
  onChange: (layoutId: string) => void
}

const FAMILY_LABELS: Record<LayoutFamily, string> = {
  hero: 'Hero',
  pair_land: 'Paar',
  pair_port: 'Paar',
  triple: 'Triple',
  grid: 'Raster',
  video: 'Video',
  mixed: 'Gemischt',
  square: 'Quadrat',
  feature: 'Feature',
  quiet: 'Ruhig',
}

function LayoutWireframe({ consume, family }: { consume: number; family: LayoutFamily }) {
  const base = 'bg-memorial-bronze/25 rounded-[2px]'
  if (consume === 1) {
    if (family === 'hero' || family === 'feature' || family === 'quiet') {
      return (
        <div className="w-full h-full p-1">
          <div className={cn(base, 'w-full h-full')} />
        </div>
      )
    }
    return (
      <div className="w-full h-full p-1">
        <div className={cn(base, 'w-full h-full')} />
      </div>
    )
  }
  if (consume === 2) {
    if (family === 'pair_port') {
      return (
        <div className="w-full h-full p-1 flex gap-0.5">
          <div className={cn(base, 'flex-1')} />
          <div className={cn(base, 'flex-1')} />
        </div>
      )
    }
    return (
      <div className="w-full h-full p-1 flex flex-col gap-0.5">
        <div className={cn(base, 'flex-1')} />
        <div className={cn(base, 'flex-1')} />
      </div>
    )
  }
  if (consume === 3) {
    if (family === 'triple') {
      return (
        <div className="w-full h-full p-1 flex flex-col gap-0.5">
          <div className={cn(base, 'flex-[1.2]')} />
          <div className="flex gap-0.5 flex-1">
            <div className={cn(base, 'flex-1')} />
            <div className={cn(base, 'flex-1')} />
          </div>
        </div>
      )
    }
    return (
      <div className="w-full h-full p-1 grid grid-cols-2 gap-0.5">
        <div className={cn(base, 'col-span-1 row-span-2')} />
        <div className={cn(base)} />
        <div className={cn(base)} />
      </div>
    )
  }
  return (
    <div className="w-full h-full p-1 grid grid-cols-2 grid-rows-2 gap-0.5">
      <div className={cn(base)} />
      <div className={cn(base)} />
      <div className={cn(base)} />
      <div className={cn(base)} />
    </div>
  )
}

export function LayoutPicker({ currentLayoutId, mode, mediaCount, onChange }: Props) {
  const [open, setOpen] = useState(false)

  const catalog = catalogForMode(mode)
  const compatible = catalog.filter(
    (spec) => spec.consume >= 1 && spec.consume <= Math.max(mediaCount + 2, 4)
  )

  const current = catalog.find((s) => s.id === currentLayoutId)
  const currentLabel = current ? FAMILY_LABELS[current.family] : 'Layout'

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-memorial-ink-soft hover:text-memorial-ink transition-colors px-2 py-1 rounded-lg hover:bg-memorial-canvas border border-transparent hover:border-memorial-line"
      >
        {currentLabel}
        <ChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 memorial-card rounded-2xl p-3 w-[320px] shadow-xl border border-memorial-line"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-memorial-ink-soft px-2 py-1 mb-2">
                Anordnung wählen ({compatible.length})
              </p>
              <div className="grid grid-cols-4 gap-2">
                {compatible.map((spec) => {
                  const isActive = spec.id === currentLayoutId
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        onChange(spec.id)
                        setOpen(false)
                      }}
                      className={cn(
                        'relative flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all duration-200',
                        isActive
                          ? 'border-memorial-bronze-deep bg-memorial-bronze/10 shadow-[0_0_0_3px_hsl(var(--memorial-bronze)/0.1)]'
                          : 'border-memorial-line hover:border-memorial-bronze/60 hover:bg-memorial-canvas hover:-translate-y-0.5'
                      )}
                      title={`${FAMILY_LABELS[spec.family]} \u00b7 ${spec.consume} Bild${spec.consume === 1 ? '' : 'er'}`}
                    >
                      <div className="w-full aspect-[3/4] bg-memorial-canvas/50 rounded-[3px] border border-memorial-line/60">
                        <LayoutWireframe consume={spec.consume} family={spec.family} />
                      </div>
                      <span className="text-[9px] font-display-italic text-memorial-ink-soft leading-none">
                        {spec.consume}
                      </span>
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-memorial-bronze-deep flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-memorial-canvas" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
