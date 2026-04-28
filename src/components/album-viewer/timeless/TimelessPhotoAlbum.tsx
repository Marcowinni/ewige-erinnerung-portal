import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import './TimelessPhotoAlbum.css'
import { GENERIC_PHRASES } from '@/components/album-viewer/modern/ModernPhotoAlbum'
import { isVideoUrl } from '@/lib/mediaType'
import { FocalProvider, useFocalFor, focalToObjectPosition, type FocalByUrl } from '@/lib/album/focalContext'

export type SlotPath = string // format: `p${pageIndex}.${slotIndex}`

export interface SlotWrapperProps {
  slotPath: SlotPath
  pageIndex: number
  children: React.ReactNode
}

export interface TimelessPhotoAlbumProps {
  subjectName: string
  dateRange?: string
  dedication?: string | null
  images: string[]
  pages?: TimelessPageConfig[]
  SlotWrapper?: React.ComponentType<SlotWrapperProps>
  focalByUrl?: FocalByUrl
}

// ─── Page types ───────────────────────────────────────────────────────────────

export type TimelessPageType =
  | 'hero'
  | 'single'
  | 'duo'
  | 'close'

export interface TimelessHeroPage  { type: 'hero';   img: string | null; showText?: boolean; text?: string }
export interface TimelessSinglePage{ type: 'single'; img: string | null; showText?: boolean; text?: string }
export interface TimelessDuoPage   { type: 'duo';    imgA: string|null; imgB: string|null; showText?: boolean; text?: string }
export interface TimelessClosePage { type: 'close';  showText?: boolean; text?: string }

export type TimelessPageConfig =
  | TimelessHeroPage | TimelessSinglePage | TimelessDuoPage | TimelessClosePage

// Re-export for convenience
export { GENERIC_PHRASES }

export const TEXT_PHRASES: Record<TimelessPageType, string[]> = {
  'hero':   [''],
  'single': ['In Liebe bewahrt.', 'Unvergessen.', 'Im Herzen bewahrt.'],
  'duo':    ['Kleine Augenblicke.', 'Momente, die bleiben.', 'Vertraute Zeit.'],
  'close':  [''],
}

export const CLOSE_HAND_PHRASES: string[] = [
  '— in Gedenken —',
  '— in Liebe —',
  '— für immer —',
  '— unvergessen —',
  '— in Dankbarkeit —',
]

function pickPhrase(type: TimelessPageType, n: number): string {
  const arr = TEXT_PHRASES[type]
  return arr[n % arr.length] ?? ''
}

export const PAGE_SLOTS: Record<TimelessPageType, number> = {
  'hero':   1,
  'single': 1,
  'duo':    2,
  'close':  0,
}

// Seeded PRNG (mulberry32) — deterministic but varied per seed
function seededRandom(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0
  return h >>> 0
}

// Rotatable layouts: single (1 slot) and duo (2 slots)
const ROTATABLE: { type: TimelessPageType; slots: number }[] = [
  { type: 'single', slots: 1 },
  { type: 'duo',    slots: 2 },
]

export function buildTimelessPages(images: string[]): TimelessPageConfig[] {
  const pages: TimelessPageConfig[] = []
  let cursor = 0
  const pick = (): string | null => images[cursor++] ?? null

  const rand = seededRandom(hashString(images.join('|')))

  pages.push({ type: 'hero', img: pick(), showText: true })

  let textAlternate = true
  const nextShowText = (): boolean => { const v = textAlternate; textAlternate = !textAlternate; return v }

  // Strict no-duplicates — type pool first, then GENERIC_PHRASES, then undefined.
  const usedTexts = new Set<string>()
  const pickUniqueText = (type: TimelessPageType): string | undefined => {
    const typePool = (TEXT_PHRASES[type] || []).filter(p => p && !usedTexts.has(p))
    const genericPool = GENERIC_PHRASES.filter(p => p && !usedTexts.has(p))
    const source = typePool.length > 0 ? typePool : genericPool
    if (source.length === 0) return undefined
    const chosen = source[Math.floor(rand() * source.length)]!
    usedTexts.add(chosen)
    return chosen
  }

  let lastType: TimelessPageType | null = null
  while (cursor < images.length) {
    const remaining = images.length - cursor
    let type: TimelessPageType
    if (remaining === 1) {
      type = 'single'
    } else {
      const candidates = ROTATABLE.filter(l => l.slots <= remaining && l.type !== lastType)
      const pool = candidates.length > 0 ? candidates : ROTATABLE.filter(l => l.slots <= remaining)
      type = pool[Math.floor(rand() * pool.length)]!.type
    }
    lastType = type

    const showText = nextShowText()
    const text = showText ? pickUniqueText(type) : undefined

    switch (type) {
      case 'single':
        pages.push({ type: 'single', img: pick(), showText, text }); break
      case 'duo':
        pages.push({ type: 'duo', imgA: pick(), imgB: pick(), showText, text }); break
      default: break
    }
  }

  pages.push({ type: 'close', showText: true })
  return pages
}

// ─── SlotPath helpers ─────────────────────────────────────────────────────────

export function makeSlotPath(pageIdx: number, slotIdx: number): SlotPath {
  return `p${pageIdx}.${slotIdx}`
}

export function parseSlotPath(sp: SlotPath): { pageIndex: number; slotIndex: number } | null {
  const m = sp.match(/^p(\d+)\.(\d+)$/)
  if (!m) return null
  return { pageIndex: Number(m[1]), slotIndex: Number(m[2]) }
}

export function slotsForTimelessPage(
  page: TimelessPageConfig,
  pageIdx: number
): { slotPath: SlotPath; img: string | null }[] {
  switch (page.type) {
    case 'hero':   return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'single': return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'duo':    return [
      { slotPath: makeSlotPath(pageIdx, 0), img: page.imgA },
      { slotPath: makeSlotPath(pageIdx, 1), img: page.imgB },
    ]
    case 'close': return []
  }
}

// ─── MediaSlot — renders img or video with sound toggle ───────────────────────

function MediaSlot({
  url,
  alt,
  style,
  className,
  isActive,
  videoRef,
}: {
  url: string
  alt?: string
  style?: React.CSSProperties
  className?: string
  isActive: boolean
  videoRef?: (el: HTMLVideoElement | null) => void
}) {
  const [muted, setMuted] = useState(true)
  const localRef = useRef<HTMLVideoElement | null>(null)

  const setRef = useCallback((el: HTMLVideoElement | null) => {
    localRef.current = el
    videoRef?.(el)
  }, [videoRef])

  useEffect(() => {
    const v = localRef.current
    if (!v) return
    if (isActive) {
      v.muted = muted
      v.play().catch(() => {/* autoplay blocked */})
    } else {
      v.pause()
      v.muted = true
    }
  }, [isActive, muted])

  const focal = useFocalFor(url)
  const objectPosition = focalToObjectPosition(focal)
  const mergedStyle = objectPosition ? { ...(style ?? {}), objectPosition } : style

  if (!isVideoUrl(url)) {
    return <img src={url} alt={alt ?? ''} loading="lazy" decoding="async" style={mergedStyle} className={className} />
  }

  return (
    <div className="tpa-media-wrap" style={style}>
      <video
        ref={setRef}
        src={url}
        muted={muted}
        autoPlay={isActive}
        loop
        playsInline
        preload={isActive ? 'metadata' : 'none'}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition }}
      />
      <button
        className="tpa-sound-btn"
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m) }}
        aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
      >
        {muted
          ? <VolumeX style={{ width: 14, height: 14 }} />
          : <Volume2 style={{ width: 14, height: 14 }} />
        }
      </button>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TimelessPhotoAlbum({
  subjectName,
  dateRange,
  dedication,
  images,
  pages: pagesProp,
  SlotWrapper,
  focalByUrl,
}: TimelessPhotoAlbumProps) {
  const pages = useMemo(
    () => pagesProp ?? buildTimelessPages(images),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesProp, images]
  )

  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const total = pages.length
  const animatingRef = useRef(false)
  const videoRefsRef = useRef<Map<string, HTMLVideoElement>>(new Map())

  const registerVideo = useCallback((key: string) => (el: HTMLVideoElement | null) => {
    if (el) videoRefsRef.current.set(key, el)
    else videoRefsRef.current.delete(key)
  }, [])

  useEffect(() => {
    videoRefsRef.current.forEach((v, key) => {
      const pageIdx = parseInt(key.split('-')[0] ?? '0', 10)
      if (pageIdx !== idx) {
        v.pause()
        v.muted = true
      }
    })
  }, [idx])

  const goTo = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(total - 1, n))
    setIdx(clamped)
    animatingRef.current = true
    if (trackRef.current) {
      trackRef.current.classList.add('transitioning')
      trackRef.current.style.transform = `translateX(${-clamped * 100}%)`
    }
    setTimeout(() => {
      trackRef.current?.classList.remove('transitioning')
    }, 420)
    setTimeout(() => { animatingRef.current = false }, 1100)
  }, [total])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let wheelAccum = 0
    let wheelTimer: ReturnType<typeof setTimeout> | null = null
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (animatingRef.current) return
      const dy = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      wheelAccum += dy
      if (wheelTimer) clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => { wheelAccum = 0 }, 160)
      if (wheelAccum > 40) { goTo(idx + 1); wheelAccum = 0 }
      else if (wheelAccum < -40) { goTo(idx - 1); wheelAccum = 0 }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      if (wheelTimer) clearTimeout(wheelTimer)
    }
  }, [idx, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goTo(idx + 1) }
      if (e.key === 'ArrowLeft'  || e.key === 'PageUp')                    { e.preventDefault(); goTo(idx - 1) }
      if (e.key === 'Home') goTo(0)
      if (e.key === 'End')  goTo(total - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, goTo, total])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let dragStart: { x: number; t: number } | null = null
    let dragDx = 0
    const onDown = (e: PointerEvent) => { if (animatingRef.current) return; dragStart = { x: e.clientX, t: Date.now() }; dragDx = 0 }
    const onMove = (e: PointerEvent) => { if (!dragStart) return; dragDx = e.clientX - dragStart.x }
    const onUp   = () => {
      if (!dragStart) return
      const dt = Date.now() - dragStart.t
      const swipeMin = window.innerWidth <= 420 ? 30 : 40
      const fast = dt < 400 && Math.abs(dragDx) > swipeMin
      const far  = Math.abs(dragDx) > window.innerWidth * 0.18
      if (fast || far) { if (dragDx < 0) goTo(idx + 1); else goTo(idx - 1) }
      dragStart = null; dragDx = 0
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', () => { dragStart = null; dragDx = 0 })
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
    }
  }, [idx, goTo])

  const pad = (n: number) => String(n).padStart(2, '0')
  const railPct = total > 1 ? (idx / (total - 1)) * 100 : 100

  const nameParts = subjectName.split(' ')
  const nameFirst = nameParts[0] ?? subjectName
  const nameRest  = nameParts.slice(1).join(' ')

  const closeSub = dedication && dedication.trim().length > 0 ? dedication : null

  const wrap = (slotPath: SlotPath, pageIdx: number, children: React.ReactNode) => {
    if (!SlotWrapper) return <>{children}</>
    return <SlotWrapper slotPath={slotPath} pageIndex={pageIdx}>{children}</SlotWrapper>
  }

  return (
    <FocalProvider value={focalByUrl}>
    <div className="tpa">
      {/* Top Chrome */}
      <header className="tpa-chrome">
        <div className="tpa-brand">Memora<span className="tpa-brand-sep">·</span>Moments</div>
        <div className="tpa-brand-r">Erinnerungen, die weiterleben</div>
      </header>

      {/* Rail */}
      <div className="tpa-rail" aria-hidden>
        <span style={{ width: `${railPct}%` }} />
      </div>

      {/* Bottom Chrome */}
      <footer className="tpa-bottom">
        <div className="tpa-counter">
          <b>{pad(idx + 1)}</b>
          <span className="tpa-slash">/</span>
          <span>{pad(total)}</span>
        </div>
        <div className="tpa-hint"><span className="tpa-line" /> ← →</div>
      </footer>

      {/* Arrows */}
      <div className="tpa-arrows">
        <button className="tpa-arrow" aria-label="Zurück" onClick={() => goTo(idx - 1)} disabled={idx === 0}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M15 5 L8 12 L15 19" /></svg>
        </button>
        <button className="tpa-arrow" aria-label="Weiter" onClick={() => goTo(idx + 1)} disabled={idx === total - 1}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M9 5 L16 12 L9 19" /></svg>
        </button>
      </div>

      <main className="tpa-stage" ref={stageRef} style={{ touchAction: 'pan-y pinch-zoom' }}>
        <div className="tpa-track" ref={trackRef}>
          {pages.map((page, pageIdx) => {
            const isActive = idx === pageIdx
            const activeClass = isActive ? 'is-active' : ''
            const slots = slotsForTimelessPage(page, pageIdx)
            const img  = (slotIdx: number): string | null => slots[slotIdx]?.img ?? null
            const sp   = (slotIdx: number): SlotPath => makeSlotPath(pageIdx, slotIdx)
            const vKey = (slotIdx: number) => `${pageIdx}-${slotIdx}`

            const rawText = (page as { text?: string }).text
            const effText = rawText && rawText.trim().length > 0 ? rawText : ''
            const showText = page.showText !== false && effText.length > 0

            const renderMedia = (
              slotIdx: number,
              extraStyle?: React.CSSProperties,
              extraClass?: string,
            ) => {
              const url = img(slotIdx)
              if (!url) return null
              return wrap(sp(slotIdx), pageIdx, (
                <MediaSlot
                  url={url}
                  style={extraStyle}
                  className={extraClass}
                  isActive={isActive}
                  videoRef={registerVideo(vKey(slotIdx))}
                />
              ))
            }

            switch (page.type) {

              case 'hero':
                return (
                  <section key={pageIdx} className={`tpa-page tpa-hero ${activeClass}`}>
                    {img(0)
                      ? (isVideoUrl(img(0)!)
                          ? wrap(sp(0), pageIdx, (
                              <MediaSlot
                                url={img(0)!}
                                style={{ position: 'absolute', inset: 0 }}
                                isActive={isActive}
                                videoRef={registerVideo(vKey(0))}
                              />
                            ))
                          : wrap(sp(0), pageIdx, (
                              <div className="tpa-bg" style={{ backgroundImage: `url('${img(0)}')` }} />
                            ))
                        )
                      : <div className="tpa-bg tpa-bg-fallback" />
                    }
                    <div className="tpa-hero-vignette" />
                    <div className="tpa-hero-center">
                      <h1 className="tpa-fade" style={{ ['--d' as never]: '.3s' }}>
                        {nameRest ? (
                          <>{nameFirst}<br /><em>{nameRest}</em></>
                        ) : nameFirst}
                      </h1>
                      <div className="tpa-hero-sub tpa-fade" style={{ ['--d' as never]: '.55s' }}>
                        {dateRange || dedication || 'In liebevollem Gedenken'}
                      </div>
                    </div>
                  </section>
                )

              case 'single':
                return (
                  <section key={pageIdx} className={`tpa-page tpa-single ${activeClass}`}>
                    <div className="tpa-single-photo tpa-fade" style={{ ['--d' as never]: '.1s' }}>
                      {img(0)
                        ? wrap(sp(0), pageIdx, (
                            <MediaSlot
                              url={img(0)!}
                              isActive={isActive}
                              videoRef={registerVideo(vKey(0))}
                            />
                          ))
                        : <div className="tpa-bg-fallback" style={{ width: '100%', height: '100%' }} />
                      }
                    </div>
                    {showText && (
                      <div className="tpa-single-caption tpa-fade" style={{ ['--d' as never]: '.3s' }}>
                        {effText}
                      </div>
                    )}
                  </section>
                )

              case 'duo':
                return (
                  <section key={pageIdx} className={`tpa-page tpa-duo ${activeClass}`}>
                    <div className="tpa-duo-photo tpa-fade" style={{ ['--d' as never]: '.1s' }}>
                      {img(0)
                        ? wrap(sp(0), pageIdx, (
                            <MediaSlot
                              url={img(0)!}
                              isActive={isActive}
                              videoRef={registerVideo(vKey(0))}
                            />
                          ))
                        : <div className="tpa-bg-fallback" style={{ width: '100%', height: '100%' }} />
                      }
                    </div>
                    {showText && (
                      <div className="tpa-duo-caption tpa-fade" style={{ ['--d' as never]: '.25s' }}>
                        {effText}
                      </div>
                    )}
                    <div className="tpa-duo-photo tpa-fade" style={{ ['--d' as never]: '.2s' }}>
                      {img(1)
                        ? wrap(sp(1), pageIdx, (
                            <MediaSlot
                              url={img(1)!}
                              isActive={isActive}
                              videoRef={registerVideo(vKey(1))}
                            />
                          ))
                        : <div className="tpa-bg-fallback" style={{ width: '100%', height: '100%' }} />
                      }
                    </div>
                  </section>
                )

              case 'close':
                return (
                  <section key={pageIdx} className={`tpa-page tpa-close ${activeClass}`}>
                    <div className="tpa-close-envelope">
                      <div className="tpa-close-brand tpa-fade">Memora Moments</div>
                      <h2 className="tpa-close-h2 tpa-fade" style={{ ['--d' as never]: '.2s' }}>
                        {nameRest ? (
                          <>{nameFirst}<br /><em>{nameRest}</em></>
                        ) : nameFirst}
                      </h2>
                      <div className="tpa-close-rule tpa-fade" style={{ ['--d' as never]: '.35s' }} />
                      <div className="tpa-close-hand tpa-fade" style={{ ['--d' as never]: '.45s' }}>
                        {CLOSE_HAND_PHRASES[pageIdx % CLOSE_HAND_PHRASES.length]}
                      </div>
                      {closeSub && (
                        <div className="tpa-close-sub tpa-fade" style={{ ['--d' as never]: '.6s' }}>
                          {closeSub}
                        </div>
                      )}
                    </div>
                  </section>
                )

              default:
                return null
            }
          })}
        </div>
      </main>
    </div>
    </FocalProvider>
  )
}

export default TimelessPhotoAlbum
