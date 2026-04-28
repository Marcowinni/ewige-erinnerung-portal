import { motion, AnimatePresence } from 'motion/react'
import { X, Check, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorMediaItem } from '@/hooks/useAlbumPages'

interface Props {
  open: boolean
  currentMediaId: string | undefined
  allMedia: EditorMediaItem[]
  onSelect: (mediaId: string) => void
  onClose: () => void
}

export function MediaSwapPopover({ open, currentMediaId, allMedia, onSelect, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-memorial-ink/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-x-4 top-[10%] z-50 max-w-2xl mx-auto memorial-card rounded-2xl shadow-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-[17px] text-memorial-ink">
                Welches Bild soll hier stehen?
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-memorial-ink-soft hover:text-memorial-ink hover:bg-memorial-line/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[60vh] overflow-y-auto pr-1">
              {allMedia.map((m) => {
                const isSelected = m.id === currentMediaId
                return (
                  <motion.button
                    key={m.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelect(m.id)}
                    className={cn(
                      'relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-150',
                      isSelected
                        ? 'border-memorial-bronze-deep shadow-[0_0_0_2px_hsl(var(--memorial-bronze))]'
                        : 'border-transparent hover:border-memorial-bronze/50'
                    )}
                  >
                    {m.kind === 'image' ? (
                      <img src={m.previewUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="relative w-full h-full bg-memorial-ink">
                        <video
                          src={m.previewUrl}
                          className="w-full h-full object-cover opacity-70"
                          preload="metadata"
                          muted
                          playsInline
                          onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5 }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-memorial-bronze-deep flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
