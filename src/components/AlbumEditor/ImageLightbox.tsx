import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  src: string | null
  alt?: string
  layoutId?: string
  onClose: () => void
}

export function ImageLightbox({ open, src, alt, layoutId, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ background: 'hsl(var(--memorial-ink) / 0.9)', backdropFilter: 'blur(10px)' }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            layoutId={layoutId}
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ken Burns wrapper — clips the animation */}
            <div className="w-full h-full overflow-hidden" style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
              <motion.img
                src={src}
                alt={alt ?? ''}
                className="object-contain max-w-[90vw] max-h-[90vh] block"
                draggable={false}
                animate={{ scale: [1, 1.06, 1], x: [0, -8, 0], y: [0, -4, 0] }}
                transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
