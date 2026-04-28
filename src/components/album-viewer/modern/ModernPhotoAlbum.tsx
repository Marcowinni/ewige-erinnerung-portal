import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import './ModernPhotoAlbum.css'
import { isVideoUrl } from '@/lib/mediaType'
import { FocalProvider, useFocalFor, focalToObjectPosition, type FocalByUrl } from '@/lib/album/focalContext'

export type SlotPath = string // format: `p${pageIndex}.${slotIndex}` e.g. 'p0.0', 'p2.1'

export interface SlotWrapperProps {
  slotPath: SlotPath
  pageIndex: number
  children: React.ReactNode
}

export interface ModernPhotoAlbumProps {
  subjectName: string
  dateRange?: string
  dedication?: string | null
  images: string[]
  pages?: PageConfig[]
  SlotWrapper?: React.ComponentType<SlotWrapperProps>
  // Optional focal-point map per image URL (0-100 each). Applied as object-position.
  focalByUrl?: FocalByUrl
}

// ─── Page types ───────────────────────────────────────────────────────────────

export type PageType = 'hero' | 'split' | 'bleed' | 'mosaic' | 'stack' | 'story' | 'quote-card' | 'twin-portrait' | 'close'

export interface HeroPage { type: 'hero'; img: string | null; showText?: boolean; text?: string }
export interface SplitPage { type: 'split'; imgs: [string | null, string | null, string | null]; showText?: boolean; text?: string }
export interface BleedPage { type: 'bleed'; img: string | null; showText?: boolean; text?: string }
export interface MosaicPage { type: 'mosaic'; imgs: [string | null, string | null, string | null, string | null, string | null]; showText?: boolean; text?: string }
export interface StackPage { type: 'stack'; imgs: [string | null, string | null, string | null, string | null]; showText?: boolean; text?: string }
export interface StoryPage { type: 'story'; bg: string | null; s1: string | null; s2: string | null; s3: string | null; showText?: boolean; text?: string }
export interface QuoteCardPage { type: 'quote-card'; img: string | null; showText?: boolean; text?: string }
export interface TwinPortraitPage { type: 'twin-portrait'; imgA: string | null; imgB: string | null; showText?: boolean; text?: string }
export interface ClosePage { type: 'close'; showText?: boolean; text?: string }

// Universal memorial phrases — fit any page, any subject. Admin picks freely.
export const GENERIC_PHRASES: string[] = [
  'In liebevollem Gedenken',
  'Für immer im Herzen',
  'Unvergessen',
  'Was bleibt, ist Liebe',
  'Erinnerung trägt',
  'In stillem Gedenken',
  'Im Licht bewahrt',
  'Du bist bei uns',
  'Ein Leben in Liebe',
  'Zeit heilt, Erinnerung bleibt',
  'Spuren, die bleiben',
  'Stille Begleiter',
  'Leise Momente',
  'Bewahrte Augenblicke',
  'Das, was war — bleibt',
]

// Generic memorial phrases per page type — cycles through on init
export const TEXT_PHRASES: Record<PageType, string[]> = {
  hero: [''],
  split: ['Leise Stunden.', 'Zeit, die bleibt.', 'Kleine Gesten.'],
  bleed: ['Ein Augenblick.', 'Licht.', 'Stille.'],
  mosaic: ['Augenblicke.', 'Momente, die tragen.', 'Bilder einer Zeit.'],
  stack: ['bewahrte Momente.', 'in Ehren gehalten.', 'was bleibt.'],
  story: ['die langen Stunden.', 'Tage, wie sie waren.', 'das Leben dazwischen.'],
  'quote-card': ['Was bleibt, ist Liebe.', 'Stille trägt uns.', 'Unvergessen.'],
  'twin-portrait': ['Zwei Seiten einer Zeit.', 'Nebeneinander.', 'Geteilte Momente.'],
  close: [''],
}

function pickPhrase(type: PageType, n: number): string {
  const arr = TEXT_PHRASES[type]
  return arr[n % arr.length] ?? ''
}

export type PageConfig = HeroPage | SplitPage | BleedPage | MosaicPage | StackPage | StoryPage | QuoteCardPage | TwinPortraitPage | ClosePage

// Slots per page type
export const PAGE_SLOTS: Record<PageType, number> = {
  hero: 1,
  split: 3,
  bleed: 1,
  mosaic: 5,
  stack: 4,
  story: 4, // bg + s1 + s2 + s3
  'quote-card': 1,
  'twin-portrait': 2,
  close: 0,
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

// All rotatable layouts with their slot counts
const ROTATABLE: { type: PageType; slots: number }[] = [
  { type: 'split', slots: 3 },
  { type: 'mosaic', slots: 5 },
  { type: 'bleed', slots: 1 },
  { type: 'stack', slots: 4 },
  { type: 'story', slots: 4 },
  { type: 'quote-card', slots: 1 },
  { type: 'twin-portrait', slots: 2 },
]

export function buildPages(images: string[]): PageConfig[] {
  const pages: PageConfig[] = []
  let cursor = 0
  const pick = (): string | null => images[cursor++] ?? null

  const rand = seededRandom(hashString(images.join('|')))

  // Hero
  pages.push({ type: 'hero', img: pick(), showText: true })

  // Alternating text-on/off flag — starts true (first content page has text)
  let textAlternate = true
  const nextShowText = (): boolean => { const v = textAlternate; textAlternate = !textAlternate; return v }

  // Track used phrases across entire album — strict no-duplicates.
  // Type-specific pool tried first; if exhausted, fall back to GENERIC_PHRASES;
  // if both exhausted, return undefined so render hides the caption.
  const usedTexts = new Set<string>()
  const pickUniqueText = (type: PageType): string | undefined => {
    const typePool = (TEXT_PHRASES[type] || []).filter(p => p && !usedTexts.has(p))
    const genericPool = GENERIC_PHRASES.filter(p => p && !usedTexts.has(p))
    const source = typePool.length > 0 ? typePool : genericPool
    if (source.length === 0) return undefined
    const chosen = source[Math.floor(rand() * source.length)]!
    usedTexts.add(chosen)
    return chosen
  }

  let lastType: PageType | null = null
  while (cursor < images.length) {
    const remaining = images.length - cursor
    // Exact-fit mapping when running low
    let type: PageType
    if (remaining === 1) type = 'bleed'
    else if (remaining === 2) type = 'twin-portrait'
    else if (remaining === 3) type = 'split'
    else if (remaining === 4) type = 'stack'
    else {
      // Filter to layouts that fit within remaining images, exclude last used
      const candidates = ROTATABLE.filter(l => l.slots <= remaining && l.type !== lastType)
      const pool = candidates.length > 0 ? candidates : ROTATABLE.filter(l => l.slots <= remaining)
      type = pool[Math.floor(rand() * pool.length)]!.type
    }
    lastType = type

    const showText = nextShowText()
    const text = showText ? pickUniqueText(type) : undefined

    switch (type) {
      case 'split':
        pages.push({ type: 'split', imgs: [pick(), pick(), pick()], showText, text })
        break
      case 'bleed':
        pages.push({ type: 'bleed', img: pick(), showText, text })
        break
      case 'mosaic':
        pages.push({ type: 'mosaic', imgs: [pick(), pick(), pick(), pick(), pick()], showText, text })
        break
      case 'stack':
        pages.push({ type: 'stack', imgs: [pick(), pick(), pick(), pick()], showText, text })
        break
      case 'story':
        pages.push({ type: 'story', bg: pick(), s1: pick(), s2: pick(), s3: pick(), showText, text })
        break
      case 'quote-card':
        pages.push({ type: 'quote-card', img: pick(), showText, text })
        break
      case 'twin-portrait':
        pages.push({ type: 'twin-portrait', imgA: pick(), imgB: pick(), showText, text })
        break
      default: break
    }
  }

  // Close
  pages.push({ type: 'close', showText: true })
  return pages
}

// ─── MediaSlot — renders img or video with mute toggle ───────────────────────

function MpaMediaSlot({
  url,
  className,
  isActive,
  videoRef,
}: {
  url: string
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

  if (!isVideoUrl(url)) {
    return (
      <img
        className={className ?? 'mpa-ken'}
        src={url}
        alt=""
        loading="lazy"
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
      />
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
        style={{
          position: 'absolute', top: 8, right: 8,
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.85)', display: 'grid', placeItems: 'center',
          cursor: 'pointer', zIndex: 20,
        }}
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m) }}
        aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
      >
        {muted ? <VolumeX style={{ width: 13, height: 13 }} /> : <Volume2 style={{ width: 13, height: 13 }} />}
      </button>
    </div>
  )
}

// ─── SlotPath helpers (page-based) ────────────────────────────────────────────

export function makeSlotPath(pageIdx: number, slotIdx: number): SlotPath {
  return `p${pageIdx}.${slotIdx}`
}

export function parseSlotPath(sp: SlotPath): { pageIndex: number; slotIndex: number } | null {
  const m = sp.match(/^p(\d+)\.(\d+)$/)
  if (!m) return null
  return { pageIndex: Number(m[1]), slotIndex: Number(m[2]) }
}

// Deterministic slot-index → image mapping per page type
// Returns slot indices in order matching the page's image fields
function slotsForPage(page: PageConfig, pageIdx: number): { slotPath: SlotPath; img: string | null }[] {
  switch (page.type) {
    case 'hero':
      return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'split':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgs[0] },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgs[1] },
        { slotPath: makeSlotPath(pageIdx, 2), img: page.imgs[2] },
      ]
    case 'bleed':
      return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'mosaic':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgs[0] },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgs[1] },
        { slotPath: makeSlotPath(pageIdx, 2), img: page.imgs[2] },
        { slotPath: makeSlotPath(pageIdx, 3), img: page.imgs[3] },
        { slotPath: makeSlotPath(pageIdx, 4), img: page.imgs[4] },
      ]
    case 'stack':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgs[0] },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgs[1] },
        { slotPath: makeSlotPath(pageIdx, 2), img: page.imgs[2] },
        { slotPath: makeSlotPath(pageIdx, 3), img: page.imgs[3] },
      ]
    case 'story':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.bg },  // slot 0 = bg
        { slotPath: makeSlotPath(pageIdx, 1), img: page.s1 },  // slot 1 = s1
        { slotPath: makeSlotPath(pageIdx, 2), img: page.s2 },  // slot 2 = s2
        { slotPath: makeSlotPath(pageIdx, 3), img: page.s3 },  // slot 3 = s3
      ]
    case 'quote-card':
      return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'twin-portrait':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgA },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgB },
      ]
    case 'close':
      return []
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ModernPhotoAlbum({ subjectName, dateRange, dedication, images, pages: pagesProp, SlotWrapper, focalByUrl }: ModernPhotoAlbumProps) {
  const pages = useMemo(
    () => pagesProp ?? buildPages(images),
    // pagesProp takes priority; fall back to building from images
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
      if (pageIdx !== idx) { v.pause(); v.muted = true }
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
      animatingRef.current = false
    }, 1100)
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
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goTo(idx - 1) }
      if (e.key === 'Home') goTo(0)
      if (e.key === 'End') goTo(total - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, goTo, total])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let dragStart: { x: number; t: number } | null = null
    let dragDx = 0
    const onDown = (e: PointerEvent) => {
      if (animatingRef.current) return
      dragStart = { x: e.clientX, t: Date.now() }
      dragDx = 0
    }
    const onMove = (e: PointerEvent) => {
      if (!dragStart) return
      dragDx = e.clientX - dragStart.x
    }
    const onUp = () => {
      if (!dragStart) return
      const dt = Date.now() - dragStart.t
      // lower threshold on narrow phones (≤420px) for easier swipe
      const swipeMin = window.innerWidth <= 420 ? 30 : 40
      const fast = dt < 400 && Math.abs(dragDx) > swipeMin
      const far = Math.abs(dragDx) > window.innerWidth * 0.18
      if (fast || far) {
        if (dragDx < 0) goTo(idx + 1)
        else goTo(idx - 1)
      }
      dragStart = null
      dragDx = 0
    }
    const onCancel = () => { dragStart = null; dragDx = 0 }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onCancel)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onCancel)
    }
  }, [idx, goTo])

  const pad = (n: number) => String(n).padStart(2, '0')
  const railPct = total > 1 ? (idx / (total - 1)) * 100 : 100

  const nameParts = subjectName.split(' ')
  const nameFirst = nameParts[0] ?? subjectName
  const nameRest = nameParts.slice(1).join(' ')

  const heroSub = dateRange ? dateRange : 'In liebevollem Gedenken'

  const closeSub =
    dedication && dedication.trim().length > 0
      ? dedication
      : 'Ein Leben, das uns begleitet. Eine Erinnerung, die bleibt.'

  // Wrap image slot with optional SlotWrapper
  const wrap = (slotPath: SlotPath, pageIdx: number, children: React.ReactNode) => {
    if (!SlotWrapper) return <>{children}</>
    return <SlotWrapper slotPath={slotPath} pageIndex={pageIdx}>{children}</SlotWrapper>
  }

  return (
    <FocalProvider value={focalByUrl}>
    <div className="mpa">
      {/* chrome */}
      <header className="mpa-chrome">
        <div className="mpa-brand">Memora<span className="mpa-brand-dot" />Moments</div>
        <div className="mpa-brand-r">Erinnerungen, die weiterleben</div>
      </header>

      <div className="mpa-rail" aria-hidden>
        <span style={{ width: `${railPct}%` }} />
      </div>

      <footer className="mpa-bottom">
        <div className="mpa-counter">
          <b>{pad(idx + 1)}</b>
          <span className="slash">/</span>
          <span>{pad(total)}</span>
        </div>
        <div className="mpa-hint"><span className="line" /> ← →</div>
      </footer>

      <div className="mpa-arrows">
        <button className="mpa-arrow" aria-label="Zurück" onClick={() => goTo(idx - 1)} disabled={idx === 0}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M15 5 L8 12 L15 19" /></svg>
        </button>
        <button className="mpa-arrow" aria-label="Weiter" onClick={() => goTo(idx + 1)} disabled={idx === total - 1}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 5 L16 12 L9 19" /></svg>
        </button>
      </div>

      {/* touch-action: pan-y allows vertical scroll, pinch-zoom natural; swipe handled via pointerdown */}
      <main className="mpa-stage" ref={stageRef} style={{ touchAction: 'pan-y pinch-zoom' }}>
        <div className="mpa-track" ref={trackRef}>
          {pages.map((page, pageIdx) => {
            const isActive = idx === pageIdx
            const activeClass = isActive ? 'is-active' : ''
            const slots = slotsForPage(page, pageIdx)
            const img = (slotIdx: number) => slots[slotIdx]?.img ?? null
            const sp = (slotIdx: number) => makeSlotPath(pageIdx, slotIdx)
            const vKey = (slotIdx: number) => `${pageIdx}-${slotIdx}`
            // Effective text: only what user/auto-build set. No hardcoded fallback —
            // empty text + showText hides the caption entirely.
            const rawText = (page as { text?: string }).text
            const effText = rawText && rawText.trim().length > 0 ? rawText : ''
            const showText = page.showText !== false && effText.length > 0

            // Render media (img or video) with optional SlotWrapper
            const renderMedia = (slotIdx: number, className?: string) => {
              const url = img(slotIdx)
              if (!url) return null
              return wrap(sp(slotIdx), pageIdx, (
                <MpaMediaSlot
                  url={url}
                  className={className}
                  isActive={isActive}
                  videoRef={registerVideo(vKey(slotIdx))}
                />
              ))
            }

            switch (page.type) {
              case 'hero':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-hero ${activeClass}`}>
                    {img(0) && (isVideoUrl(img(0)!)
                      ? wrap(sp(0), pageIdx, (
                          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                            <MpaMediaSlot url={img(0)!} isActive={isActive} videoRef={registerVideo(vKey(0))} />
                          </div>
                        ))
                      : wrap(sp(0), pageIdx, (
                          <div className="mpa-bg" style={{ backgroundImage: `url('${img(0)}')` }} />
                        ))
                    )}
                    <div className="mpa-vignette" />
                    <div className="mpa-center">
                      <div>
                        <h1 className="mpa-reveal" style={{ ['--d' as never]: '.35s' }}>
                          {nameRest ? (
                            <>{nameFirst}<br /><em>{nameRest}</em></>
                          ) : (
                            <>{nameFirst}</>
                          )}
                        </h1>
                        <div className="mpa-sub mpa-reveal" style={{ ['--d' as never]: '.6s' }}>
                          {heroSub}
                        </div>
                      </div>
                    </div>
                    {dateRange && (
                      <div className="mpa-meta-r mpa-reveal" style={{ ['--d' as never]: '1s' }}>
                        {dateRange}
                      </div>
                    )}
                  </section>
                )

              case 'split':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-split ${activeClass}`}>
                    {showText && (
                      <div className="mpa-col-left">
                        <div className="mpa-monogram mpa-reveal" style={{ ['--d' as never]: '.1s' }}>
                          {nameFirst.charAt(0).toUpperCase()}
                        </div>
                        <div className="mpa-rule mpa-reveal" style={{ ['--d' as never]: '.25s' }} />
                        <div className="mpa-caption mpa-reveal" style={{ ['--d' as never]: '.3s' }}>
                          <em>{effText}</em>
                        </div>
                      </div>
                    )}
                    <div className="mpa-col-right">
                      {img(0) && (
                        <div className="mpa-img i1 mpa-reveal-clip" style={{ ['--d' as never]: '.2s' }}>
                          {renderMedia(0)}
                        </div>
                      )}
                      {img(1) && (
                        <div className="mpa-img i2 mpa-reveal-clip" style={{ ['--d' as never]: '.35s' }}>
                          {renderMedia(1)}
                        </div>
                      )}
                      {img(2) && (
                        <div className="mpa-img i3 mpa-reveal-clip" style={{ ['--d' as never]: '.5s' }}>
                          {renderMedia(2)}
                        </div>
                      )}
                    </div>
                  </section>
                )

              case 'bleed':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-bleed ${activeClass}`}>
                    {img(0) ? (isVideoUrl(img(0)!)
                      ? wrap(sp(0), pageIdx, (
                          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                            <MpaMediaSlot url={img(0)!} isActive={isActive} videoRef={registerVideo(vKey(0))} />
                          </div>
                        ))
                      : wrap(sp(0), pageIdx, (
                          <div className="mpa-bg" style={{ backgroundImage: `url('${img(0)}')` }} />
                        ))
                    ) : (
                      <div className="mpa-bg mpa-bg-fallback" aria-hidden />
                    )}
                    <div className="mpa-grad" />
                    {showText && (
                      <div className="mpa-bleed-caption mpa-reveal" style={{ ['--d' as never]: '.5s' }}>
                        <em>{effText}</em>
                      </div>
                    )}
                  </section>
                )

              case 'mosaic':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-mosaic ${activeClass}`}>
                    {showText && (
                      <div className="mpa-mosaic-caption mpa-text-zone mpa-reveal" style={{ ['--d' as never]: '.15s' }}>
                        <em>{effText}</em>
                      </div>
                    )}
                    <div className="mpa-grid">
                      {img(0) && <div className="mpa-img m1 mpa-reveal-scale" style={{ ['--d' as never]: '.2s' }}>{renderMedia(0)}</div>}
                      {img(1) && <div className="mpa-img m2 mpa-reveal-scale" style={{ ['--d' as never]: '.35s' }}>{renderMedia(1)}</div>}
                      {img(2) && <div className="mpa-img m3 mpa-reveal-scale" style={{ ['--d' as never]: '.5s' }}>{renderMedia(2)}</div>}
                      {img(3) && <div className="mpa-img m4 mpa-reveal-scale" style={{ ['--d' as never]: '.6s' }}>{renderMedia(3)}</div>}
                      {img(4) && <div className="mpa-img m5 mpa-reveal-scale" style={{ ['--d' as never]: '.7s' }}>{renderMedia(4)}</div>}
                    </div>
                    <div className="mpa-mosaic-deco" aria-hidden>
                      <div className="mpa-mosaic-rule mpa-reveal-clip" style={{ ['--d' as never]: '.8s' }} />
                      <div className="mpa-mosaic-meta mpa-reveal" style={{ ['--d' as never]: '.95s' }}>
                        <span>Memora</span>
                        <span className="mpa-mosaic-dot" />
                        <span>Moments</span>
                      </div>
                      <div className="mpa-mosaic-rule-short mpa-reveal-clip" style={{ ['--d' as never]: '1.05s' }} />
                      <div className="mpa-mosaic-folio mpa-reveal" style={{ ['--d' as never]: '1.15s' }}>
                        <em>Erinnerung</em>
                      </div>
                    </div>
                  </section>
                )

              case 'stack':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-stack ${activeClass}`}>
                    {showText && (
                      <div className="mpa-title">
                        <div className="word mpa-reveal">{effText}</div>
                      </div>
                    )}
                    <div className="mpa-scene">
                      {img(0) && <div className="mpa-polaroid mpa-pol-1"><div className="ph">{renderMedia(0)}</div></div>}
                      {img(1) && <div className="mpa-polaroid mpa-pol-2"><div className="ph">{renderMedia(1)}</div></div>}
                      {img(2) && <div className="mpa-polaroid mpa-pol-3"><div className="ph">{renderMedia(2)}</div></div>}
                      {img(3) && <div className="mpa-polaroid mpa-pol-4"><div className="ph">{renderMedia(3)}</div></div>}
                    </div>
                  </section>
                )

              case 'story':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-story ${activeClass}${showText ? ' has-text' : ''}`}>
                    {img(0) ? (isVideoUrl(img(0)!)
                      ? wrap(sp(0), pageIdx, (
                          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                            <MpaMediaSlot url={img(0)!} isActive={isActive} videoRef={registerVideo(vKey(0))} />
                          </div>
                        ))
                      : wrap(sp(0), pageIdx, (
                          <div className="mpa-bg" style={{ backgroundImage: `url('${img(0)}')` }} />
                        ))
                    ) : (
                      <div className="mpa-bg mpa-bg-fallback" aria-hidden />
                    )}
                    {showText && (
                      <div className="mpa-story-caption mpa-text-zone mpa-reveal" style={{ ['--d' as never]: '.2s' }}>
                        <em>{effText}</em>
                      </div>
                    )}
                    <div className="mpa-story-images">
                      {img(1) && <div className="mpa-img s1 mpa-reveal-clip-up" style={{ ['--d' as never]: '.3s' }}>{renderMedia(1)}</div>}
                      {img(2) && <div className="mpa-img s2 mpa-reveal-clip-up" style={{ ['--d' as never]: '.5s' }}>{renderMedia(2)}</div>}
                      {img(3) && <div className="mpa-img s3 mpa-reveal-clip-up" style={{ ['--d' as never]: '.7s' }}>{renderMedia(3)}</div>}
                    </div>
                  </section>
                )

              case 'quote-card':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-quote-card ${activeClass}`}>
                    <div className="mpa-qc-photo mpa-reveal-clip" style={{ ['--d' as never]: '.15s' }}>
                      {renderMedia(0, 'mpa-ken')}
                    </div>
                    <div className="mpa-qc-text">
                      <div className="mpa-qc-mark mpa-reveal" style={{ ['--d' as never]: '.3s' }}>&ldquo;</div>
                      <div className="mpa-qc-quote mpa-reveal" style={{ ['--d' as never]: '.45s' }}>
                        <em>{effText}</em>
                      </div>
                      <div className="mpa-qc-rule mpa-reveal" style={{ ['--d' as never]: '.65s' }} />
                      <div className="mpa-qc-name mpa-reveal" style={{ ['--d' as never]: '.75s' }}>
                        {nameFirst}
                      </div>
                    </div>
                  </section>
                )

              case 'twin-portrait':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-twin-portrait ${activeClass}`}>
                    <div className="mpa-twin-grid">
                      <div className="mpa-twin-slot mpa-twin-a mpa-reveal-clip" style={{ ['--d' as never]: '.1s' }}>
                        {renderMedia(0, 'mpa-ken')}
                      </div>
                      <div className="mpa-twin-slot mpa-twin-b mpa-reveal-clip" style={{ ['--d' as never]: '.28s' }}>
                        {renderMedia(1, 'mpa-ken')}
                      </div>
                    </div>
                    {showText && (
                      <div className="mpa-twin-caption mpa-text-zone mpa-reveal" style={{ ['--d' as never]: '.5s' }}>
                        <em>{effText}</em>
                      </div>
                    )}
                  </section>
                )

              case 'close':
                return (
                  <section key={pageIdx} className={`mpa-page mpa-close ${activeClass}`}>
                    <div className="mpa-frame" />
                    <div className="mpa-corner c-tl mpa-reveal">Memora Moments</div>
                    <div className="mpa-corner c-tr mpa-reveal" style={{ ['--d' as never]: '.1s' }}>—</div>
                    <div className="mpa-corner c-bl mpa-reveal" style={{ ['--d' as never]: '.2s' }}>{dateRange || ''}</div>
                    <div className="mpa-corner c-br mpa-reveal" style={{ ['--d' as never]: '.3s' }}>Fin.</div>
                    <div className="mpa-deco mpa-reveal" style={{ ['--d' as never]: '.4s' }}>— in Gedenken —</div>
                    <div className="mpa-center">
                      <div>
                        <h2 className="mpa-reveal" style={{ ['--d' as never]: '.5s' }}>
                          In Liebe.<br /><em>Für immer.</em>
                        </h2>
                        <div className="mpa-sub mpa-reveal" style={{ ['--d' as never]: '.7s' }}>
                          {closeSub}
                        </div>
                      </div>
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

export default ModernPhotoAlbum
