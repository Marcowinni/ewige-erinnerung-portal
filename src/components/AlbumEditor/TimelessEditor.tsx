import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Check, ChevronDown, AlertCircle, Smartphone, X, Move } from 'lucide-react'
import { MobilePreviewModal } from './MobilePreviewModal'
import { MediaThumb } from './MediaThumb'
import { FocalPicker } from './FocalPicker'
import { lookupMediaKind } from '@/lib/mediaType'
import type { FocalByUrl } from '@/lib/album/focalContext'
import {
  TimelessPhotoAlbum,
  makeSlotPath,
  PAGE_SLOTS,
  GENERIC_PHRASES,
  type SlotPath,
  type TimelessPageType,
  type TimelessPageConfig,
} from '@/components/album-viewer/timeless/TimelessPhotoAlbum'
import { useTimelessLayout } from '@/hooks/useTimelessLayout'
import type { EditorMediaItem } from '@/hooks/useAlbumPages'
import { cn } from '@/lib/utils'

interface Props {
  media: EditorMediaItem[]
  subjectName: string
  dateRange?: string
  dedication?: string | null
  initialPages?: TimelessPageConfig[]
  onPreview: () => void
  onBack: () => void
  onSave: (payload: { pages: TimelessPageConfig[]; assignments: Record<SlotPath, string> }) => void
  onPublish: () => void
  saving: boolean
  publishing: boolean
  isPublished: boolean
  onSetMediaFocal?: (mediaId: string, focalX: number, focalY: number) => void
}

interface SlotMeta {
  path: SlotPath
  label: string
  gridArea?: string
}

interface PageMeta {
  index: number
  type: TimelessPageType
  title: string
  slots: SlotMeta[]
  grid?: { cols: string; rows: string; areas: string }
}

function buildPageMeta(pages: ReturnType<typeof useTimelessLayout>['pages']): PageMeta[] {
  return pages.map((p, i) => {
    const sp = (slotIdx: number) => makeSlotPath(i, slotIdx)

    switch (p.type) {
      case 'hero':
        return {
          index: i, type: 'hero', title: 'Titelseite',
          slots: [{ path: sp(0), label: 'Titelbild', gridArea: 'a' }],
          grid: { cols: '1fr', rows: '1fr', areas: '"a"' },
        }
      case 'single':
        return {
          index: i, type: 'single', title: `Seite ${i + 1} — Ein Bild`,
          slots: [{ path: sp(0), label: 'Foto', gridArea: 'a' }],
          grid: { cols: '1fr', rows: '1fr', areas: '"a"' },
        }
      case 'duo':
        return {
          index: i, type: 'duo', title: `Seite ${i + 1} — Zwei Bilder`,
          slots: [
            { path: sp(0), label: 'Bild 1', gridArea: 'a' },
            { path: sp(1), label: 'Bild 2', gridArea: 'b' },
          ],
          grid: { cols: '1fr', rows: '1fr 1fr', areas: '"a" "b"' },
        }
      case 'close':
        return { index: i, type: 'close', title: 'Abschluss', slots: [] }
    }
  })
}

const LAYOUT_TYPES: { type: TimelessPageType; label: string; slots: number }[] = [
  { type: 'single', label: 'Ein Bild',   slots: 1 },
  { type: 'duo',    label: 'Zwei Bilder', slots: 2 },
]

function LayoutWireframe({ type }: { type: TimelessPageType }) {
  const base = 'bg-stone-400/30 rounded-[2px]'
  switch (type) {
    case 'single':
      return (
        <div className="w-full h-full p-1">
          <div className={cn(base, 'w-full h-full')} />
        </div>
      )
    case 'duo':
      return (
        <div className="w-full h-full p-1 flex flex-col gap-1">
          <div className={cn(base, 'flex-1')} />
          <div className={cn(base, 'flex-1')} />
        </div>
      )
    default:
      return <div className={cn(base, 'w-full h-full m-1')} />
  }
}

function LayoutPickerMini({
  currentType,
  onChange,
}: {
  currentType: TimelessPageType
  onChange: (type: TimelessPageType) => void
}) {
  const [open, setOpen] = useState(false)
  const current = LAYOUT_TYPES.find((l) => l.type === currentType)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-memorial-ink-soft hover:text-memorial-ink transition-colors px-2 py-1 rounded-lg hover:bg-memorial-canvas border border-transparent hover:border-memorial-line"
      >
        {current?.label ?? 'Layout'}
        <ChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 memorial-card rounded-2xl p-3 w-[340px] shadow-xl border border-memorial-line"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-memorial-ink-soft px-2 py-1 mb-2">
                Layout wählen
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LAYOUT_TYPES.map((layout) => {
                  const isActive = layout.type === currentType
                  return (
                    <button
                      key={layout.type}
                      onClick={() => { onChange(layout.type); setOpen(false) }}
                      className={cn(
                        'relative flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all duration-200',
                        isActive
                          ? 'border-stone-600 bg-stone-600/10 shadow-[0_0_0_3px_rgba(87,83,78,0.1)]'
                          : 'border-memorial-line hover:border-stone-500/60 hover:bg-memorial-canvas hover:-translate-y-0.5'
                      )}
                      title={`${layout.label} · ${layout.slots} ${layout.slots === 1 ? 'Bild' : 'Bilder'}`}
                    >
                      <div className="w-full aspect-[4/3] bg-memorial-canvas/50 rounded-[3px] border border-memorial-line/60 overflow-hidden">
                        <LayoutWireframe type={layout.type} />
                      </div>
                      <span className="text-[9px] font-display-italic text-memorial-ink-soft leading-none text-center">{layout.label}</span>
                      <span className="text-[8px] text-memorial-ink-soft/60">{layout.slots} {layout.slots === 1 ? 'Bild' : 'Bilder'}</span>
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-stone-600 flex items-center justify-center">
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

function ImagePickerDialog({
  open,
  images,
  usageCount,
  currentUrl,
  onSelect,
  onClose,
}: {
  open: boolean
  images: EditorMediaItem[]
  usageCount: Map<string, number>
  currentUrl?: string
  onSelect: (url: string) => void
  onClose: () => void
}) {
  if (!open) return null
  const unassignedCount = images.filter((img) => (usageCount.get(img.previewUrl) ?? 0) === 0).length
  return (
    <div
      className="fixed inset-0 z-[200] bg-memorial-ink/70 backdrop-blur flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="memorial-card rounded-3xl max-w-4xl w-full max-h-[82vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-memorial-line flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl text-memorial-ink">Bild wählen</h3>
            {unassignedCount > 0 && (
              <p className="text-[11px] text-memorial-ink-soft mt-0.5">
                {unassignedCount} {unassignedCount === 1 ? 'Bild nicht zugeordnet' : 'Bilder nicht zugeordnet'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[12px] uppercase tracking-[0.2em] text-memorial-ink-soft hover:text-memorial-ink transition-colors"
          >
            Schliessen
          </button>
        </div>
        <div className="overflow-y-auto p-5 flex-1">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {images.map((img) => {
              const isActive = img.previewUrl === currentUrl
              const count = usageCount.get(img.previewUrl) ?? 0
              const isUsed = count > 0
              const multi  = count > 1
              return (
                <button
                  key={img.id}
                  onClick={() => onSelect(img.previewUrl)}
                  className={cn(
                    'relative aspect-square rounded-xl overflow-hidden group ring-1 transition-all duration-200',
                    isActive
                      ? 'ring-2 ring-stone-600 shadow-[0_0_0_4px_rgba(87,83,78,0.15)]'
                      : 'ring-memorial-line hover:ring-stone-500/60 hover:-translate-y-0.5'
                  )}
                  title={count === 0 ? 'Noch nicht verwendet' : `${count}× verwendet${multi ? ' (mehrfach)' : ''}`}
                >
                  <MediaThumb
                    src={img.previewUrl}
                    kind={img.kind}
                    imgClassName={cn(isUsed && !isActive && 'opacity-70')}
                  />
                  {count > 0 && (
                    <div className={cn(
                      'absolute top-1.5 right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full flex items-center justify-center text-[11px] font-semibold shadow-md',
                      multi ? 'bg-stone-700 text-stone-50' : 'bg-green-700 text-green-50'
                    )}>
                      {count}×
                    </div>
                  )}
                  {count === 0 && (
                    <div className="absolute top-1.5 right-1.5 px-2 h-[22px] rounded-full flex items-center justify-center text-[9px] uppercase tracking-widest font-medium bg-stone-100 text-stone-700 border border-stone-300">
                      Neu
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-stone-700 flex items-center justify-center ring-2 ring-white">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function PageCard({
  meta,
  assignments,
  showText,
  text,
  media,
  subjectName,
  dateRange,
  dedication,
  focalByUrl,
  onPickSlot,
  onAdjustFocal,
  onChangeLayout,
  onToggleText,
  onEditText,
}: {
  meta: PageMeta
  assignments: Record<SlotPath, string>
  showText: boolean
  text?: string
  media: EditorMediaItem[]
  subjectName: string
  dateRange?: string
  dedication?: string | null
  focalByUrl: FocalByUrl
  onPickSlot: (slot: SlotPath) => void
  onAdjustFocal?: (url: string) => void
  onChangeLayout: (pageIdx: number, type: TimelessPageType) => void
  onToggleText: (pageIdx: number) => void
  onEditText: (pageIdx: number, text: string) => void
}) {
  if (meta.type === 'close') {
    return (
      <div className="memorial-card rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">Seite {meta.index + 1}</p>
          <h3 className="font-display text-2xl text-memorial-ink mt-1">{meta.title}</h3>
          <p className="font-display italic text-[13px] text-memorial-ink-soft mt-1">In Liebe. Für immer.</p>
        </div>
        <div className="text-[11px] text-memorial-ink-soft/60">Keine Bilder — automatisch gestaltet.</div>
      </div>
    )
  }

  const grid = meta.grid ?? { cols: '1fr', rows: '1fr', areas: '"a"' }
  const canChangeLayout = meta.type !== 'hero' && meta.type !== 'close'
  const canToggleText   = meta.type !== 'hero' && meta.type !== 'close'
  const isHero = meta.type === 'hero'

  return (
    <div className="memorial-card rounded-2xl p-5">
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">Seite {meta.index + 1}</p>
          <h3 className="font-display text-xl text-memorial-ink">{meta.title}</h3>
          {isHero && (
            <div className="mt-2 space-y-0.5 text-[12px] text-memorial-ink-soft">
              <p className="font-display text-[15px] text-memorial-ink not-italic">{subjectName || '— Name fehlt —'}</p>
              {dateRange && <p>{dateRange}</p>}
              {dedication && <p className="italic max-w-[280px] truncate" title={dedication}>„{dedication}"</p>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {canToggleText && (
            <button
              onClick={() => onToggleText(meta.index)}
              className={cn(
                'flex items-center gap-2 text-[11px] uppercase tracking-widest px-2 py-1 rounded-lg border transition-colors',
                showText
                  ? 'border-stone-600 bg-stone-600/10 text-stone-800'
                  : 'border-memorial-line text-memorial-ink-soft hover:border-stone-500/50'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full', showText ? 'bg-stone-600' : 'bg-memorial-ink-soft/30')} />
              Text {showText ? 'an' : 'aus'}
            </button>
          )}
          {canChangeLayout && (
            <LayoutPickerMini
              currentType={meta.type}
              onChange={(newType) => onChangeLayout(meta.index, newType)}
            />
          )}
          <p className="text-[11px] text-memorial-ink-soft">
            {meta.slots.length} {meta.slots.length === 1 ? 'Bild' : 'Bilder'}
          </p>
        </div>
      </div>

      {canToggleText && showText && (
        <div className="mb-3 space-y-2">
          <input
            type="text"
            value={text ?? ''}
            onChange={(e) => onEditText(meta.index, e.target.value)}
            placeholder="Text auf dieser Seite …"
            className="memorial-underline-input font-display italic text-[15px] w-full text-memorial-ink placeholder:text-memorial-ink-soft/40"
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[9px] uppercase tracking-[0.25em] text-memorial-ink-soft/60 self-center mr-1">Vorschläge:</span>
            {GENERIC_PHRASES.map((phrase) => {
              const active = text === phrase
              return (
                <button
                  key={phrase}
                  onClick={() => onEditText(meta.index, phrase)}
                  className={cn(
                    'font-display italic text-[12px] px-2.5 py-1 rounded-full border transition-all',
                    active
                      ? 'border-stone-600 bg-stone-600/10 text-stone-800'
                      : 'border-memorial-line text-memorial-ink-soft hover:border-stone-500/50 hover:text-memorial-ink'
                  )}
                >
                  {phrase}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div
        className="aspect-[9/16] max-w-[240px] mx-auto rounded-2xl overflow-hidden border-[3px] border-memorial-ink p-1.5 bg-[hsl(var(--memorial-canvas))] shadow-lg"
        style={{
          display: 'grid',
          gridTemplateColumns: grid.cols,
          gridTemplateRows: grid.rows,
          gridTemplateAreas: grid.areas,
          gap: '6px',
        }}
      >
        {meta.slots.map((s) => {
          const url = assignments[s.path]
          const slotKind = url ? lookupMediaKind(url, media) : 'image'
          const f = url ? focalByUrl[url] : undefined
          return (
            <div
              key={s.path}
              style={{ gridArea: s.gridArea }}
              className="relative rounded-lg overflow-hidden ring-1 ring-memorial-line hover:ring-stone-500 hover:shadow-lg transition-all duration-200 group"
            >
              <button
                onClick={() => onPickSlot(s.path)}
                className="absolute inset-0 z-0"
                aria-label="Bild ersetzen"
              >
                {url ? (
                  <>
                    <MediaThumb src={url} alt={s.label} kind={slotKind} focalX={f?.x} focalY={f?.y} />
                    <div className="absolute inset-0 bg-memorial-ink/0 group-hover:bg-memorial-ink/30 transition-colors duration-200 flex items-center justify-center">
                      <span className="text-memorial-canvas text-[11px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        Ersetzen
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-memorial-canvas flex flex-col items-center justify-center gap-1 text-memorial-ink-soft/50">
                    <Plus className="w-5 h-5" />
                    <span className="text-[9px] uppercase tracking-[0.2em]">{s.label}</span>
                  </div>
                )}
              </button>
              {url && onAdjustFocal && (
                <button
                  onClick={(e) => { e.stopPropagation(); onAdjustFocal(url) }}
                  className="absolute top-1.5 right-1.5 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-memorial-ink shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  title="Bildausschnitt anpassen"
                  aria-label="Bildausschnitt anpassen"
                >
                  <Move className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── TimelessEditor ────────────────────────────────────────────────────────────

export function TimelessEditor({
  media,
  subjectName,
  dateRange,
  dedication,
  initialPages,
  onPreview,
  onSave,
  onPublish,
  saving,
  publishing,
  isPublished,
  onSetMediaFocal,
}: Props) {
  const imageUrls = media.map((m) => m.previewUrl)
  const { pages, assignments, assign, orderedImages, changePageLayout, togglePageText, editPageText } =
    useTimelessLayout(imageUrls, initialPages)

  const [pickerSlot, setPickerSlot] = useState<SlotPath | null>(null)
  const [showPreviewInline, setShowPreviewInline] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [focalUrl, setFocalUrl] = useState<string | null>(null)

  const focalByUrl = useMemo<FocalByUrl>(() => {
    const m: FocalByUrl = {}
    for (const it of media) {
      if (it.focalX !== undefined || it.focalY !== undefined) {
        m[it.previewUrl] = { x: it.focalX ?? 50, y: it.focalY ?? 50 }
      }
    }
    return m
  }, [media])

  const focalMedia = focalUrl ? media.find((m) => m.previewUrl === focalUrl) ?? null : null

  useEffect(() => {
    if (!showFullscreen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowFullscreen(false) }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [showFullscreen])

  const pageMetas  = useMemo(() => buildPageMeta(pages), [pages])
  const imageItems = useMemo(() => media, [media])

  const currentPickerUrl = pickerSlot ? assignments[pickerSlot] : undefined

  const usageCount = useMemo(() => {
    const map = new Map<string, number>()
    for (const url of Object.values(assignments)) {
      map.set(url, (map.get(url) ?? 0) + 1)
    }
    return map
  }, [assignments])

  const unusedImages   = useMemo(() => imageItems.filter((img) => (usageCount.get(img.previewUrl) ?? 0) === 0), [imageItems, usageCount])
  const multipleImages = useMemo(() => imageItems.filter((img) => (usageCount.get(img.previewUrl) ?? 0) > 1), [imageItems, usageCount])

  const canPublish = unusedImages.length === 0 && imageItems.length > 0

  return (
    <div className="h-full overflow-y-auto bg-memorial-canvas">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-memorial-canvas/95 backdrop-blur-xl border-b border-memorial-line px-6 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">Zeitlos Album gestalten</p>
          <p className="font-display text-lg text-memorial-ink">{pageMetas.length} Seiten · {imageItems.length} Bilder</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreviewInline((v) => !v)}
            className="memorial-cta memorial-cta-ghost rounded-full px-4 py-2 text-[12px] font-medium"
          >
            {showPreviewInline ? 'Editor zeigen' : '📱 Handy-Vorschau'}
          </button>
          <button
            onClick={() => setShowMobilePreview(true)}
            className="memorial-cta memorial-cta-ghost rounded-full px-4 py-2 text-[12px] font-medium inline-flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            Vorschau (Handy)
          </button>
          <button
            onClick={() => setShowFullscreen(true)}
            className="memorial-cta memorial-cta-ghost rounded-full px-4 py-2 text-[12px] font-medium"
          >
            Vorschau (Vollbild)
          </button>
          <button
            onClick={() => onSave({ pages, assignments })}
            disabled={saving}
            className="memorial-cta memorial-cta-ghost rounded-full px-4 py-2 text-[12px] font-medium disabled:opacity-60"
          >
            {saving ? 'Speichert…' : 'Speichern'}
          </button>
          {!isPublished && (
            <button
              onClick={onPublish}
              disabled={publishing || !canPublish}
              title={!canPublish ? `${unusedImages.length} Bilder noch nicht verwendet` : undefined}
              className="memorial-cta memorial-cta-primary rounded-full px-4 py-2 text-[12px] font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {publishing ? 'Veröffentlicht…' : 'Veröffentlichen'}
            </button>
          )}
        </div>
      </div>

      {/* Status Panel */}
      {imageItems.length > 0 && (
        <div className={cn(
          'sticky top-[61px] z-20 border-b backdrop-blur-xl px-6 py-3',
          unusedImages.length > 0
            ? 'bg-amber-50/95 border-amber-200'
            : 'bg-green-50/95 border-green-200'
        )}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {unusedImages.length > 0 ? (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              ) : (
                <Check className="w-5 h-5 text-green-700 flex-shrink-0" strokeWidth={2.5} />
              )}
              <div>
                <p className={cn('text-[13px] font-medium', unusedImages.length > 0 ? 'text-amber-900' : 'text-green-800')}>
                  {unusedImages.length > 0
                    ? `${unusedImages.length} von ${imageItems.length} Bildern nicht verwendet`
                    : `Alle ${imageItems.length} Bilder verwendet ✓`}
                </p>
                {multipleImages.length > 0 && (
                  <p className="text-[11px] text-memorial-ink-soft mt-0.5">
                    {multipleImages.length} {multipleImages.length === 1 ? 'Bild' : 'Bilder'} mehrfach verwendet
                  </p>
                )}
              </div>
            </div>

            {unusedImages.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
                <span className="text-[10px] uppercase tracking-widest text-amber-700 flex-shrink-0">Unused:</span>
                {unusedImages.slice(0, 8).map((img) => (
                  <div key={img.id} className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 ring-2 ring-amber-300">
                    <img src={img.previewUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {unusedImages.length > 8 && (
                  <span className="text-[11px] text-amber-700 ml-1">+{unusedImages.length - 8}</span>
                )}
              </div>
            )}

            {multipleImages.length > 0 && unusedImages.length === 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
                <span className="text-[10px] uppercase tracking-widest text-amber-700 flex-shrink-0">Mehrfach:</span>
                {multipleImages.slice(0, 8).map((img) => {
                  const count = usageCount.get(img.previewUrl) ?? 0
                  return (
                    <div key={img.id} className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0 ring-2 ring-amber-500">
                      <img src={img.previewUrl} alt="" className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 bg-stone-700 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {showPreviewInline ? (
        <div className="flex items-start justify-center py-10 px-4 min-h-[calc(100vh-120px)] bg-memorial-ink/5">
          <div
            className="relative bg-black rounded-[48px] p-[12px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
            style={{ width: 390, height: 844 }}
          >
            <div
              aria-hidden
              className="absolute top-[14px] left-1/2 -translate-x-1/2 z-20 bg-black rounded-full"
              style={{ width: 126, height: 34 }}
            />
            <div className="relative w-full h-full overflow-hidden rounded-[36px] bg-white">
              <TimelessPhotoAlbum
                subjectName={subjectName}
                dateRange={dateRange}
                dedication={dedication}
                images={orderedImages}
                pages={pages}
                focalByUrl={focalByUrl}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-5">
          <div className="text-center mb-8">
            <p className="font-display-italic text-memorial-ink-soft text-[14px]">
              Klicken Sie auf ein Bild um es zu ersetzen. Layout pro Seite änderbar.
            </p>
          </div>
          {pageMetas.map((meta) => {
            const page     = pages[meta.index]
            const showText = page?.showText ?? false
            const text     = (page && 'text' in page ? (page as { text?: string }).text : undefined) ?? ''
            return (
              <PageCard
                key={meta.index}
                meta={meta}
                assignments={assignments}
                showText={showText}
                text={text}
                media={imageItems}
                subjectName={subjectName}
                dateRange={dateRange}
                dedication={dedication}
                focalByUrl={focalByUrl}
                onPickSlot={setPickerSlot}
                onAdjustFocal={onSetMediaFocal ? (url) => setFocalUrl(url) : undefined}
                onChangeLayout={changePageLayout}
                onToggleText={togglePageText}
                onEditText={editPageText}
              />
            )
          })}
        </div>
      )}

      <ImagePickerDialog
        open={pickerSlot !== null}
        images={imageItems}
        usageCount={usageCount}
        currentUrl={currentPickerUrl}
        onSelect={(url) => {
          if (pickerSlot) assign(pickerSlot, url)
          setPickerSlot(null)
        }}
        onClose={() => setPickerSlot(null)}
      />

      <MobilePreviewModal
        open={showMobilePreview}
        onClose={() => setShowMobilePreview(false)}
        subjectName={subjectName}
        dedication={dedication}
        dateRange={dateRange}
        images={orderedImages}
        mode="timeless"
        pages={pages}
        focalByUrl={focalByUrl}
      />

      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-white"
            role="dialog"
            aria-modal="true"
          >
            <TimelessPhotoAlbum
              subjectName={subjectName}
              dateRange={dateRange}
              dedication={dedication}
              images={orderedImages}
              pages={pages}
              focalByUrl={focalByUrl}
            />
            <button
              onClick={() => setShowFullscreen(false)}
              aria-label="Vorschau schliessen"
              className="fixed top-4 right-4 z-[310] w-11 h-11 rounded-full flex items-center justify-center bg-memorial-canvas/90 backdrop-blur border border-memorial-line text-memorial-ink hover:bg-memorial-canvas transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <FocalPicker
        open={focalUrl !== null}
        src={focalUrl}
        kind={focalMedia?.kind}
        initialFocalX={focalMedia?.focalX}
        initialFocalY={focalMedia?.focalY}
        onClose={() => setFocalUrl(null)}
        onSave={(x, y) => {
          if (focalMedia && onSetMediaFocal) {
            onSetMediaFocal(focalMedia.id, x, y)
          }
        }}
      />
    </div>
  )
}
