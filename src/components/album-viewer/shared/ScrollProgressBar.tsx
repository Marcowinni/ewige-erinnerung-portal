import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollProgressBarProps {
  containerRef: React.RefObject<HTMLElement>
  className?: string
  barClassName?: string
  position?: 'top' | 'bottom'
}

export function ScrollProgressBar({
  containerRef,
  className,
  barClassName,
  position = 'top',
}: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) { setProgress(1); return }
      setProgress(el.scrollLeft / max)
    }

    el.addEventListener('scroll', update, { passive: true })
    update()
    return () => el.removeEventListener('scroll', update)
  }, [containerRef])

  return (
    <div
      className={cn(
        'absolute left-0 right-0 z-20 h-px bg-transparent',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
    >
      <div
        className={cn('h-full origin-left transition-transform duration-100', barClassName)}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
