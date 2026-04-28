import { createContext, useContext, type ReactNode } from 'react'

export type FocalPoint = { x: number; y: number }
export type FocalByUrl = Record<string, FocalPoint>

const FocalContext = createContext<FocalByUrl | undefined>(undefined)

export function FocalProvider({ value, children }: { value: FocalByUrl | undefined; children: ReactNode }) {
  return <FocalContext.Provider value={value}>{children}</FocalContext.Provider>
}

export function useFocalFor(url: string | null | undefined): FocalPoint | undefined {
  const map = useContext(FocalContext)
  if (!url) return undefined
  return map?.[url]
}

export function focalToObjectPosition(f: FocalPoint | undefined): string | undefined {
  if (!f) return undefined
  return `${f.x}% ${f.y}%`
}
