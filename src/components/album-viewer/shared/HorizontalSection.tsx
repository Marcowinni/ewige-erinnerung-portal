import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HorizontalSectionProps {
  children: ReactNode
  className?: string
  minWidth?: string
  id?: string
}

export function HorizontalSection({
  children,
  className,
  minWidth = '100vw',
  id,
}: HorizontalSectionProps) {
  return (
    <section
      id={id}
      className={cn('flex-shrink-0 scroll-snap-align-center h-full relative', className)}
      style={{ minWidth, scrollSnapAlign: 'center' }}
    >
      {children}
    </section>
  )
}
