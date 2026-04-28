import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import './ClassicPhotoAlbum.css'
import { isVideoUrl } from '@/lib/mediaType'
import { FocalProvider, useFocalFor, focalToObjectPosition, type FocalByUrl } from '@/lib/album/focalContext'

export type SlotPath = string // format: `p${pageIndex}.${slotIndex}`

export interface SlotWrapperProps {
  slotPath: SlotPath
  pageIndex: number
  children: React.ReactNode
}

export interface ClassicPhotoAlbumProps {
  subjectName: string
  dateRange?: string
  dedication?: string | null
  images: string[]
  pages?: ClassicPageConfig[]
  SlotWrapper?: React.ComponentType<SlotWrapperProps>
  focalByUrl?: FocalByUrl
}

// ── Page types ─────────────────────────────────────────────────────────────────

export type ClassicPageType =
  | 'hero'
  | 'duo'
  | 'herald'
  | 'polaroids'
  | 'bleed'
  | 'strip'
  | 'tape'
  | 'diagonal'
  | 'envelope-letter'
  | 'pinned'
  | 'close'

export interface HeroPage          { type: 'hero';            img: string | null; showText?: boolean; text?: string }
export interface DuoPage           { type: 'duo';             imgA: string | null; imgB: string | null; showText?: boolean; text?: string }
export interface HeraldPage        { type: 'herald';          hero: string | null; r1: string | null; r2: string | null; showText?: boolean; text?: string }
export interface PolaroidsPage     { type: 'polaroids';       imgA: string | null; imgB: string | null; showText?: boolean; text?: string }
export interface BleedPage         { type: 'bleed';           img: string | null; showText?: boolean; text?: string }
export interface StripPage         { type: 'strip';           s1: string | null; s2: string | null; s3: string | null; big: string | null; showText?: boolean; text?: string }
export interface TapePage          { type: 'tape';            imgA: string | null; imgB: string | null; showText?: boolean; text?: string }
export interface DiagonalPage      { type: 'diagonal';        t1: string | null; t2: string | null; t3: string | null; showText?: boolean; text?: string }
export interface EnvelopeLetterPage{ type: 'envelope-letter'; img: string | null; showText?: boolean; text?: string }
export interface PinnedPage        { type: 'pinned';          imgA: string | null; imgB: string | null; showText?: boolean; text?: string }
export interface ClosePage         { type: 'close';           showText?: boolean; text?: string }

export type ClassicPageConfig =
  | HeroPage | DuoPage | HeraldPage | PolaroidsPage | BleedPage
  | StripPage | TapePage | DiagonalPage | EnvelopeLetterPage | PinnedPage | ClosePage

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

export const TEXT_PHRASES: Record<ClassicPageType, string[]> = {
  hero:               [''],
  duo:                ['Ein gemeinsamer Weg.', 'Draußen, im Licht.', 'Geteilte Wege.'],
  herald:             ['— ein stiller Moment —', 'Wie wir Dich kannten.', 'Tage in Liebe.'],
  polaroids:          ['Vertraute Tage.', 'Kleine Freuden.', 'Im Herzen bewahrt.'],
  bleed:              ['sein Licht bleibt.', 'Stille.', 'Unvergessen.'],
  strip:              ['Liebste Augenblicke.', 'Momente, die tragen.', 'Zeit, die bleibt.'],
  tape:               ['Wind im Haar.', 'Ein warmer Tag.', 'Leise Erinnerung.'],
  diagonal:           ['Geteilte Wege.', 'Bewahrte Bilder.', 'Eine Zeit, die war.'],
  'envelope-letter':  ['Ein Brief aus Liebe.', 'Worte, die bleiben.', 'Versiegelt in Gedanken.'],
  'pinned':           ['Angeheftet. Bewahrt.', 'Kleine Momente, gross.', 'Immer dabei.'],
  close:              [''],
}

export const CLOSE_PHRASES: string[] = [
  'Was wir sehr geliebt, können wir nie verlieren — denn es bleibt.',
  'Im Herzen unvergessen.',
  'Licht, das bleibt.',
  'Ein stiller Dank für all die Jahre.',
  'Für immer ein Teil von uns.',
]

function pickPhrase(type: ClassicPageType, n: number): string {
  const arr = TEXT_PHRASES[type]
  return arr[n % arr.length] ?? ''
}

export const PAGE_SLOTS: Record<ClassicPageType, number> = {
  hero:               1,
  duo:                2,
  herald:             3,
  polaroids:          2,
  bleed:              1,
  strip:              4,
  tape:               2,
  diagonal:           3,
  'envelope-letter':  1,
  'pinned':           2,
  close:              0,
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
const ROTATABLE: { type: ClassicPageType; slots: number }[] = [
  { type: 'duo', slots: 2 },
  { type: 'herald', slots: 3 },
  { type: 'diagonal', slots: 3 },
  { type: 'polaroids', slots: 2 },
  { type: 'strip', slots: 4 },
  { type: 'tape', slots: 2 },
  { type: 'envelope-letter', slots: 1 },
  { type: 'pinned', slots: 2 },
  { type: 'bleed', slots: 1 },
]

export function buildClassicPages(images: string[]): ClassicPageConfig[] {
  const pages: ClassicPageConfig[] = []
  let cursor = 0
  const pick = (): string | null => images[cursor++] ?? null

  const rand = seededRandom(hashString(images.join('|')))

  pages.push({ type: 'hero', img: pick(), showText: true })

  // Classic: no auto-text. User picks all text in editor mode.
  // Content pages start with showText=false + text=undefined; hero/close keep their handling.

  let lastType: ClassicPageType | null = null
  while (cursor < images.length) {
    const remaining = images.length - cursor
    let type: ClassicPageType
    if (remaining === 1) type = 'envelope-letter'
    else if (remaining === 2) type = 'pinned'
    else if (remaining === 3) type = 'herald'
    else if (remaining === 4) type = 'strip'
    else {
      const candidates = ROTATABLE.filter(l => l.slots <= remaining && l.type !== lastType)
      const pool = candidates.length > 0 ? candidates : ROTATABLE.filter(l => l.slots <= remaining)
      type = pool[Math.floor(rand() * pool.length)]!.type
    }
    lastType = type

    // No hardcoded text — admin sets via editor. Content pages start with text off.
    const showText = false
    const text: string | undefined = undefined

    switch (type) {
      case 'duo':
        pages.push({ type: 'duo', imgA: pick(), imgB: pick(), showText, text }); break
      case 'herald':
        pages.push({ type: 'herald', hero: pick(), r1: pick(), r2: pick(), showText, text }); break
      case 'polaroids':
        pages.push({ type: 'polaroids', imgA: pick(), imgB: pick(), showText, text }); break
      case 'bleed':
        pages.push({ type: 'bleed', img: pick(), showText, text }); break
      case 'strip':
        pages.push({ type: 'strip', s1: pick(), s2: pick(), s3: pick(), big: pick(), showText, text }); break
      case 'tape':
        pages.push({ type: 'tape', imgA: pick(), imgB: pick(), showText, text }); break
      case 'diagonal':
        pages.push({ type: 'diagonal', t1: pick(), t2: pick(), t3: pick(), showText, text }); break
      case 'envelope-letter':
        pages.push({ type: 'envelope-letter', img: pick(), showText, text }); break
      case 'pinned':
        pages.push({ type: 'pinned', imgA: pick(), imgB: pick(), showText, text }); break
      default: break
    }
  }

  pages.push({ type: 'close', showText: true })
  return pages
}

// ── SlotPath helpers ────────────────────────────────────────────────────────────

export function makeSlotPath(pageIdx: number, slotIdx: number): SlotPath {
  return `p${pageIdx}.${slotIdx}`
}

export function parseSlotPath(sp: SlotPath): { pageIndex: number; slotIndex: number } | null {
  const m = sp.match(/^p(\d+)\.(\d+)$/)
  if (!m) return null
  return { pageIndex: Number(m[1]), slotIndex: Number(m[2]) }
}

export function slotsForClassicPage(
  page: ClassicPageConfig,
  pageIdx: number
): { slotPath: SlotPath; img: string | null }[] {
  switch (page.type) {
    case 'hero':
      return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'duo':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgA },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgB },
      ]
    case 'herald':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.hero },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.r1 },
        { slotPath: makeSlotPath(pageIdx, 2), img: page.r2 },
      ]
    case 'polaroids':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgA },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgB },
      ]
    case 'bleed':
      return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'strip':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.s1 },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.s2 },
        { slotPath: makeSlotPath(pageIdx, 2), img: page.s3 },
        { slotPath: makeSlotPath(pageIdx, 3), img: page.big },
      ]
    case 'tape':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgA },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgB },
      ]
    case 'diagonal':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.t1 },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.t2 },
        { slotPath: makeSlotPath(pageIdx, 2), img: page.t3 },
      ]
    case 'envelope-letter':
      return [{ slotPath: makeSlotPath(pageIdx, 0), img: page.img }]
    case 'pinned':
      return [
        { slotPath: makeSlotPath(pageIdx, 0), img: page.imgA },
        { slotPath: makeSlotPath(pageIdx, 1), img: page.imgB },
      ]
    case 'close':
      return []
  }
}

// ── MediaSlot — renders img or video with mute toggle ───────────────────────

function CpaMediaSlot({
  url,
  isActive,
  videoRef,
}: {
  url: string
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
          position: 'absolute', top: 6, right: 6,
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.85)', display: 'grid', placeItems: 'center',
          cursor: 'pointer', zIndex: 20,
        }}
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m) }}
        aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
      >
        {muted ? <VolumeX style={{ width: 12, height: 12 }} /> : <Volume2 style={{ width: 12, height: 12 }} />}
      </button>
    </div>
  )
}

// ── Photo helper ────────────────────────────────────────────────────────────────

function Corners() {
  return (
    <>
      <div className="cpa-corner-decor cpa-corner-tl" />
      <div className="cpa-corner-decor cpa-corner-tr" />
      <div className="cpa-corner-decor cpa-corner-bl" />
      <div className="cpa-corner-decor cpa-corner-br" />
    </>
  )
}

// ── Component ────────────────────────────────────────────────────────────────────

export function ClassicPhotoAlbum({
  subjectName,
  dateRange,
  dedication,
  images,
  pages: pagesProp,
  SlotWrapper,
  focalByUrl,
}: ClassicPhotoAlbumProps) {
  const pages = useMemo(
    () => pagesProp ?? buildClassicPages(images),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesProp, images]
  )

  const stageRef = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const [splashGone, setSplashGone] = useState(false)
  const [leavingDir, setLeavingDir] = useState<'forward' | 'back' | null>(null)
  const animatingRef = useRef(false)
  const total = pages.length
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

  // Splash dismiss
  useEffect(() => {
    const t = setTimeout(() => setSplashGone(true), 1600)
    return () => clearTimeout(t)
  }, [])

  const goTo = useCallback((n: number) => {
    if (animatingRef.current) return
    const clamped = Math.max(0, Math.min(total - 1, n))
    if (clamped === idx) return
    const dir = clamped > idx ? 'forward' : 'back'
    setLeavingDir(dir)
    animatingRef.current = true
    setTimeout(() => {
      setIdx(clamped)
      setLeavingDir(null)
      setTimeout(() => { animatingRef.current = false }, 700)
    }, 350)
  }, [idx, total])

  // Wheel navigation
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let accum = 0
    let timer: ReturnType<typeof setTimeout> | null = null
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (animatingRef.current) return
      const dy = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      accum += dy
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => { accum = 0 }, 160)
      if (accum > 40) { goTo(idx + 1); accum = 0 }
      else if (accum < -40) { goTo(idx - 1); accum = 0 }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      if (timer) clearTimeout(timer)
    }
  }, [idx, goTo])

  // Keyboard navigation
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

  // Touch/pointer swipe
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
    el.addEventListener('pointerup',   onUp)
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

  const wrap = (slotPath: SlotPath, pageIdx: number, children: React.ReactNode) => {
    if (!SlotWrapper) return <>{children}</>
    return <SlotWrapper slotPath={slotPath} pageIndex={pageIdx}>{children}</SlotWrapper>
  }

  return (
    <FocalProvider value={focalByUrl}>
    <div className="cpa">
      {/* Splash */}
      {!splashGone && (
        <div className={`cpa-splash${splashGone ? ' gone' : ''}`}>
          <div>
            <div className="cpa-s-brand">Memora Moments</div>
            <div className="cpa-s-sub">In liebevollem Gedenken</div>
          </div>
        </div>
      )}

      {/* Top Chrome */}
      <header className="cpa-chrome">
        <div className="cpa-brand">Memora Moments</div>
        <div className="cpa-tagline">Erinnerungen, die weiterleben</div>
      </header>

      {/* Rail */}
      <div className="cpa-rail" aria-hidden>
        <span style={{ width: `${railPct}%` }} />
      </div>

      {/* Bottom Chrome */}
      <footer className="cpa-bottom">
        <div className="cpa-counter">
          <b>{pad(idx + 1)}</b>
          <span className="cpa-slash">/</span>
          <span>{pad(total)}</span>
        </div>
        <div className="cpa-hint">
          <span className="cpa-line" /> turn page · ← →
        </div>
      </footer>

      {/* Arrow buttons */}
      <div className="cpa-arrows">
        <button className="cpa-arrow" aria-label="Zurück" onClick={() => goTo(idx - 1)} disabled={idx === 0}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 5 L8 12 L15 19" /></svg>
        </button>
        <button className="cpa-arrow" aria-label="Weiter" onClick={() => goTo(idx + 1)} disabled={idx === total - 1}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 5 L16 12 L9 19" /></svg>
        </button>
      </div>

      {/* Stage — touch-action allows pinch-zoom naturally; horizontal swipe handled via pointer events */}
      <div className="cpa-stage" ref={stageRef} style={{ touchAction: 'pan-y pinch-zoom' }}>
        <div className="cpa-book">
          <div className="cpa-spine" aria-hidden />

          {pages.map((page, pageIdx) => {
            const isActive  = idx === pageIdx
            const isLeaving = !isActive && leavingDir !== null && pageIdx === (leavingDir === 'forward' ? idx - 1 : idx + 1)
            const spreadCls = [
              'cpa-spread',
              `s-${page.type}`,
              isActive  ? 'is-active' : '',
              isLeaving ? (leavingDir === 'forward' ? 'leaving-forward' : 'leaving-back') : '',
            ].filter(Boolean).join(' ')

            const slots = slotsForClassicPage(page, pageIdx)
            const img   = (slotIdx: number): string | null => slots[slotIdx]?.img ?? null
            const sp    = (slotIdx: number): SlotPath => makeSlotPath(pageIdx, slotIdx)
            const vKey  = (slotIdx: number) => `${pageIdx}-${slotIdx}`

            const renderMedia = (slotIdx: number) => {
              const url = img(slotIdx)
              if (!url) return <div className="cpa-bg-fallback" />
              return wrap(sp(slotIdx), pageIdx, (
                <CpaMediaSlot url={url} isActive={isActive} videoRef={registerVideo(vKey(slotIdx))} />
              ))
            }

            const rawText = (page as { text?: string }).text
            const effText = rawText && rawText.trim().length > 0 ? rawText : ''
            const showText = page.showText !== false && effText.length > 0

            switch (page.type) {

              case 'hero':
                return (
                  <div key={pageIdx} className={`${spreadCls} s-hero-bleed`}>
                    <div className="cpa-leaf left cpa-hero-bleed">
                      <div className="cpa-hero-bg">
                        {img(0) ? renderMedia(0) : <div className="cpa-bg-fallback" />}
                      </div>
                      <div className="cpa-hero-overlay" aria-hidden />
                      <div className="cpa-hero-center">
                        <div className="cpa-hero-brand cpa-fade">Memora Moments</div>
                        <h1 className="cpa-hero-name cpa-fade" style={{ ['--d' as never]: '.25s' }}>
                          {nameRest ? (
                            <>{nameFirst}<br /><em>{nameRest}</em></>
                          ) : nameFirst}
                        </h1>
                        <div className="cpa-hero-rule cpa-fade" style={{ ['--d' as never]: '.4s' }} />
                        <div className="cpa-hero-sub cpa-fade" style={{ ['--d' as never]: '.55s' }}>
                          {dateRange ?? 'In liebevollem Gedenken'}
                        </div>
                      </div>
                    </div>
                  </div>
                )

              case 'duo':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left">
                      <div className="cpa-photo cpa-ph-a bw cpa-fall" style={{ ['--d' as never]: '.15s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(0)}</div>
                      </div>
                      {showText && (
                        <div className="cpa-caption cpa-cap-a cpa-text-zone cpa-fade" style={{ ['--d' as never]: '.45s' }}>{effText}</div>
                      )}
                    </div>
                    <div className="cpa-leaf right">
                      <div className="cpa-photo cpa-ph-b cpa-fall" style={{ ['--d' as never]: '.25s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(1)}</div>
                      </div>
                    </div>
                  </div>
                )

              case 'herald':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left">
                      <div className="cpa-photo cpa-ph-hero-l sepia cpa-fall" style={{ ['--d' as never]: '.2s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(0)}</div>
                      </div>
                      {showText && (
                        <div className="cpa-caption cpa-cap-hero cpa-text-zone cpa-fade" style={{ ['--d' as never]: '.5s' }}>{effText}</div>
                      )}
                    </div>
                    <div className="cpa-leaf right">
                      <div className="cpa-photo cpa-ph-r1 bw cpa-fall" style={{ ['--d' as never]: '.3s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(1)}</div>
                      </div>
                      <div className="cpa-photo cpa-ph-r2 sepia cpa-fall" style={{ ['--d' as never]: '.45s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(2)}</div>
                      </div>
                    </div>
                  </div>
                )

              case 'polaroids':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left">
                      <div className="cpa-photo cpa-ph-pol cpa-pol-a bw cpa-fall" style={{ ['--d' as never]: '.2s' }}>
                        <div className="cpa-frame">{renderMedia(0)}</div>
                        {showText && <div className="cpa-pol-label">{effText}</div>}
                      </div>
                    </div>
                    <div className="cpa-leaf right">
                      <div className="cpa-photo cpa-ph-pol cpa-pol-b sepia cpa-fall" style={{ ['--d' as never]: '.35s' }}>
                        <div className="cpa-frame">{renderMedia(1)}</div>
                      </div>
                    </div>
                  </div>
                )

              case 'bleed':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left">
                      {img(0) ? (
                        <div className="cpa-bleed-img cpa-fade">{renderMedia(0)}</div>
                      ) : <div className="cpa-bg-fallback" />}
                    </div>
                    <div className="cpa-leaf right">
                      {showText && (
                        <div className="cpa-bleed-text cpa-fade" style={{ ['--d' as never]: '.3s' }}>
                          <div className="cpa-q">{effText}</div>
                          <div className="cpa-rule" />
                          <div className="cpa-by">— bleibt bei uns —</div>
                        </div>
                      )}
                    </div>
                  </div>
                )

              case 'strip':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left">
                      <div className="cpa-strip-row">
                        {([0, 1, 2] as const).map((si) => (
                          <div key={si} className="cpa-photo bw cpa-fall" style={{ ['--d' as never]: `${si * 0.12}s` }}>
                            <Corners />
                            <div className="cpa-frame">{renderMedia(si)}</div>
                          </div>
                        ))}
                      </div>
                      {showText && (
                        <div className="cpa-caption cpa-cap-strip cpa-text-zone cpa-fade" style={{ ['--d' as never]: '.55s' }}>{effText}</div>
                      )}
                    </div>
                    <div className="cpa-leaf right">
                      <div className="cpa-photo cpa-strip-big sepia cpa-fall" style={{ ['--d' as never]: '.3s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(3)}</div>
                      </div>
                    </div>
                  </div>
                )

              case 'tape':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left">
                      <div className="cpa-photo cpa-ph-ta tape bw cpa-fall" style={{ ['--d' as never]: '.2s' }}>
                        <div className="cpa-frame">{renderMedia(0)}</div>
                      </div>
                      {showText && (
                        <div className="cpa-caption cpa-cap-td cpa-text-zone cpa-fade" style={{ ['--d' as never]: '.5s' }}>{effText}</div>
                      )}
                    </div>
                    <div className="cpa-leaf right">
                      <div className="cpa-photo cpa-ph-td tape sepia cpa-fall" style={{ ['--d' as never]: '.3s' }}>
                        <div className="cpa-frame">{renderMedia(1)}</div>
                      </div>
                    </div>
                  </div>
                )

              case 'diagonal':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left">
                      <div className="cpa-photo cpa-ph-t1 bw cpa-fall" style={{ ['--d' as never]: '.15s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(0)}</div>
                      </div>
                      <div className="cpa-photo cpa-ph-t2 sepia cpa-fall" style={{ ['--d' as never]: '.3s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(1)}</div>
                      </div>
                      {showText && (
                        <div className="cpa-caption cpa-cap-diag cpa-text-zone cpa-fade" style={{ ['--d' as never]: '.55s' }}>{effText}</div>
                      )}
                    </div>
                    <div className="cpa-leaf right">
                      <div className="cpa-photo cpa-ph-t3 cpa-fall" style={{ ['--d' as never]: '.25s' }}>
                        <Corners />
                        <div className="cpa-frame">{renderMedia(2)}</div>
                      </div>
                    </div>
                  </div>
                )

              case 'envelope-letter':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    {/* Mobile: single column — photo top, handwriting text bottom */}
                    <div className="cpa-leaf left cpa-env-letter-leaf">
                      <div className="cpa-env-letter-frame cpa-fall" style={{ ['--d' as never]: '.2s' }}>
                        <div className="cpa-env-letter-flap" aria-hidden />
                        <div className="cpa-env-letter-photo">
                          {renderMedia(0)}
                        </div>
                      </div>
                    </div>
                    <div className="cpa-leaf right cpa-env-letter-text-leaf">
                      {showText && (
                        <div className="cpa-env-letter-handwriting cpa-fade" style={{ ['--d' as never]: '.5s' }}>
                          <em>{effText}</em>
                        </div>
                      )}
                      <div className="cpa-env-letter-lines cpa-fade" style={{ ['--d' as never]: '.7s' }} aria-hidden>
                        {[0,1,2,3,4].map((n) => <div key={n} className="cpa-env-letter-line" />)}
                      </div>
                    </div>
                  </div>
                )

              case 'pinned':
                return (
                  <div key={pageIdx} className={`${spreadCls}${showText ? ' has-text' : ''}`}>
                    <div className="cpa-leaf left cpa-pinned-leaf">
                      <div className="cpa-pinned-item cpa-pinned-a cpa-fall" style={{ ['--d' as never]: '.15s' }}>
                        <div className="cpa-pin cpa-pin-a" aria-hidden />
                        <div className="cpa-frame">{renderMedia(0)}</div>
                      </div>
                      {showText && (
                        <div className="cpa-caption cpa-cap-pinned cpa-text-zone cpa-fade" style={{ ['--d' as never]: '.55s' }}>{effText}</div>
                      )}
                    </div>
                    <div className="cpa-leaf right cpa-pinned-leaf">
                      <div className="cpa-pinned-item cpa-pinned-b cpa-fall" style={{ ['--d' as never]: '.3s' }}>
                        <div className="cpa-pin cpa-pin-b" aria-hidden />
                        <div className="cpa-frame">{renderMedia(1)}</div>
                      </div>
                    </div>
                  </div>
                )

              case 'close': {
                // Closing phrase: only the dedication user set in editor — no hardcoded fallback.
                const closeSub = dedication && dedication.trim().length > 0 ? dedication : ''
                const nameParts = subjectName.split(' ')
                const nameFirst = nameParts[0] ?? subjectName
                const nameRest  = nameParts.slice(1).join(' ')
                return (
                  <div key={pageIdx} className={spreadCls}>
                    <div className="cpa-leaf left">
                      <div className="cpa-env">
                        <div className="cpa-env-label">Memora Moments</div>
                        <h2>
                          {nameRest ? (
                            <>{nameFirst}<br /><em>{nameRest}</em></>
                          ) : nameFirst}
                        </h2>
                        <div className="cpa-env-rule" />
                        <div className="cpa-env-hand">— in Gedenken —</div>
                        {closeSub && <div className="cpa-env-sub">{closeSub}</div>}
                        {dateRange && <div className="cpa-env-dates">{dateRange}</div>}
                      </div>
                    </div>
                    <div className="cpa-leaf right cpa-close-right">
                      <div className="cpa-close-right-inner">
                        {closeSub && (
                          <div className="cpa-fade cpa-close-sub">
                            {closeSub}
                          </div>
                        )}
                        <div className="cpa-fade cpa-close-dates" style={{ ['--d' as never]: '.3s' }}>
                          {dateRange ?? ''}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              default:
                return null
            }
          })}
        </div>
      </div>
    </div>
    </FocalProvider>
  )
}

export default ClassicPhotoAlbum
