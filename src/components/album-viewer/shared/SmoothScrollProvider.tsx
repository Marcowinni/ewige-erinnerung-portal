import { useEffect, useRef, createContext, useContext, type ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'

const LenisCtx = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisCtx)
}

export function SmoothScrollProvider({
  children,
  horizontal = false,
  containerRef,
}: {
  children: ReactNode
  horizontal?: boolean
  containerRef?: React.RefObject<HTMLElement>
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const wrapper = containerRef?.current ?? undefined
    const lenis = new Lenis({
      wrapper,
      orientation: horizontal ? 'horizontal' : 'vertical',
      gestureOrientation: horizontal ? 'both' : 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      lerp: 0.085,
    })
    lenisRef.current = lenis

    let raf: number
    function loop(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [horizontal, containerRef])

  return (
    <LenisCtx.Provider value={lenisRef.current}>
      {children}
    </LenisCtx.Provider>
  )
}
