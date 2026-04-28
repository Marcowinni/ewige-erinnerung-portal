import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Heart,
  PawPrint,
  Upload,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import imageCompression from 'browser-image-compression'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { countryList } from '@/data/countries'

// ─── constants ───────────────────────────────────────────────────────────────

const MIN_MEDIA = 5
const MAX_MEDIA = 60

const MUSIC_TRACKS = [
  { src: '/music/ambient-piano-music.mp3', title: 'Ambient Piano', id: 'ambient-piano-music.mp3' },
  { src: '/music/inspiring-emotional-uplifting-piano.mp3', title: 'Inspiring Piano', id: 'inspiring-emotional-uplifting-piano.mp3' },
  { src: '/music/happy-music.mp3', title: 'Heitere Musik', id: 'happy-music.mp3' },
  { src: '/music/calm-classical-piano.mp3', title: 'Klassisches Klavier', id: 'calm-classical-piano.mp3' },
  { src: '/music/relaxed-music.mp3', title: 'Entspannte Musik', id: 'relaxed-music.mp3' },
  { src: '/music/soft-calm-music.mp3', title: 'Sanfte Ruhe', id: 'soft-calm-music.mp3' },
]

// Swiss Post letter rates — domestic / Europe / world
const SHIPPING = { CH: 1.2, EU: 1.9, WORLD: 2.2 } as const
type ShippingZone = keyof typeof SHIPPING

// LI shares Swiss customs union → domestic rate
const CH_ZONE_COUNTRIES = new Set(['CH', 'LI'])

// European countries (EU + EFTA + UK + non-EU Europe) → EU letter rate
const EU_ZONE_COUNTRIES = new Set([
  'DE', 'AT', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'LU', 'IE', 'GB',
  'DK', 'SE', 'NO', 'FI', 'IS', 'PL', 'CZ', 'SK', 'HU', 'SI', 'HR',
  'EE', 'LV', 'LT', 'RO', 'BG', 'GR', 'CY', 'MT',
  'MC', 'SM', 'VA', 'AD',
  'AL', 'BA', 'MK', 'MD', 'ME', 'RS', 'TR', 'UA', 'BY', 'RU',
])

function deriveShippingZone(countryCode: string): ShippingZone {
  if (CH_ZONE_COUNTRIES.has(countryCode)) return 'CH'
  if (EU_ZONE_COUNTRIES.has(countryCode)) return 'EU'
  return 'WORLD'
}

const STEP_LABELS = ['Für wen', 'Stil', 'Fotos', 'Bestellen']
const TOTAL_STEPS = 4

// ─── types ───────────────────────────────────────────────────────────────────

type SubjectType = 'human' | 'pet'
type AlbumStyle = 'modern' | 'classic' | 'timeless'

interface MediaFile {
  id: string
  file: File
  previewUrl: string
  kind: 'image' | 'video'
}

interface MusicChoice {
  type: 'preset' | 'pixabay' | 'none'
  value: string
  label: string
}

interface Step1Data {
  subjectType: SubjectType | null
  subjectName: string
  birthDate: string
  passingDate: string
  dedication: string
}

interface Step4Data {
  contactName: string
  contactEmail: string
  contactPhone: string
  street: string
  postalCode: string
  city: string
  countryCode: string
}

function buildShippingAddress(d: Step4Data): string {
  const country = countryList.find((c) => c.code === d.countryCode)?.name ?? d.countryCode
  const line1 = d.street.trim()
  const line2 = `${d.postalCode.trim()} ${d.city.trim()}`.trim()
  return [line1, line2, country].filter(Boolean).join(', ')
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function sanitizeFileName(filename: string): string {
  const map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue', ß: 'ss' }
  let s = filename
  for (const k in map) s = s.replace(new RegExp(k, 'g'), map[k])
  return s.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/--+/g, '-')
}

// ─── progress indicator ──────────────────────────────────────────────────────

function ProgressIndicator({ current }: { current: number }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-10">
      <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">
        Schritt {current} von {TOTAL_STEPS}
      </p>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 rounded-full transition-all duration-500',
              i + 1 < current
                ? 'w-5 bg-memorial-bronze-deep'
                : i + 1 === current
                ? 'w-8 bg-memorial-bronze-deep'
                : 'w-3 bg-memorial-line'
            )}
          />
        ))}
      </div>
    </div>
  )
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── step 1 — subject + name + widmung ───────────────────────────────────────

function Step1({ data, onChange }: { data: Step1Data; onChange: (d: Step1Data) => void }) {
  const isHuman = data.subjectType !== 'pet'
  const set = (key: keyof Step1Data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value })

  return (
    <StepWrapper>
      <h2 className="font-display text-3xl text-memorial-ink mb-2">Für wen gestalten wir das Album?</h2>
      <p className="text-memorial-ink-soft text-[15px] mb-8">Wählen Sie und füllen Sie die Details aus.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {([
          { type: 'human' as const, icon: <Heart className="w-8 h-8" strokeWidth={1.3} />, title: 'Für einen Menschen', accent: 'hover:bg-memorial-bronze/10 data-[selected=true]:bg-memorial-bronze/10 data-[selected=true]:border-memorial-bronze-deep' },
          { type: 'pet' as const, icon: <PawPrint className="w-8 h-8" strokeWidth={1.3} />, title: 'Für ein Tier', accent: 'hover:bg-memorial-sage/10 data-[selected=true]:bg-memorial-sage/10 data-[selected=true]:border-memorial-sage-deep' },
        ]).map((c) => (
          <button
            key={c.type}
            data-selected={data.subjectType === c.type}
            onClick={() => onChange({ ...data, subjectType: c.type })}
            className={cn('memorial-card rounded-2xl p-8 text-left border-2 transition-all duration-300 cursor-pointer border-memorial-line', c.accent)}
          >
            <div className="text-memorial-bronze-deep mb-4">{c.icon}</div>
            <p className="font-display text-xl text-memorial-ink">{c.title}</p>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
            Name *
          </label>
          <input
            type="text"
            placeholder={isHuman || !data.subjectType ? 'Name der Person' : 'Name des Tieres'}
            value={data.subjectName}
            onChange={set('subjectName')}
            className="memorial-underline-input w-full text-lg text-memorial-ink font-display"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
              Geburtsdatum (optional)
            </label>
            <input type="date" value={data.birthDate} onChange={set('birthDate')} className="memorial-underline-input w-full text-[14px] text-memorial-ink" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
              {isHuman ? 'Sterbedatum' : 'Todesdatum'} (optional)
            </label>
            <input type="date" value={data.passingDate} onChange={set('passingDate')} className="memorial-underline-input w-full text-[14px] text-memorial-ink" />
          </div>
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
            Widmung (optional)
          </label>
          <textarea
            placeholder="Eine kurze Nachricht, die das Album begleitet…"
            value={data.dedication}
            onChange={set('dedication')}
            rows={3}
            className="memorial-underline-input w-full text-[15px] text-memorial-ink resize-none"
          />
        </div>
      </div>
    </StepWrapper>
  )
}

// ─── step 2 — stil wählen ────────────────────────────────────────────────────

function StylePhoneFrame({ theme, selected }: { theme: AlbumStyle; selected: boolean }) {
  // Render iframe at real phone viewport (380x760, matches homepage), then
  // visually scale down so albums detect mobile breakpoint (<768) AND content
  // (header, classic layouts) fits without cropping.
  const FRAME_W = 200
  const FRAME_H = 400
  const VIEWPORT_W = 380
  const VIEWPORT_H = 760
  const scale = FRAME_W / VIEWPORT_W

  return (
    <div
      className="relative mx-auto"
      style={{
        width: FRAME_W,
        height: FRAME_H,
        borderRadius: 28,
        boxShadow: selected
          ? '0 18px 40px rgba(0,0,0,0.22), 0 0 0 2px hsl(var(--memorial-bronze-deep))'
          : '0 14px 32px rgba(0,0,0,0.16), 0 0 0 1.5px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        background: '#fff',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <iframe
        src={`/showcase/${theme}`}
        title={`${theme} Vorschau`}
        style={{
          width: VIEWPORT_W,
          height: VIEWPORT_H,
          border: 0,
          display: 'block',
          pointerEvents: 'none',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}

function Step2({ value, onChange }: { value: AlbumStyle | null; onChange: (v: AlbumStyle) => void }) {
  const styles: { id: AlbumStyle; label: string; desc: string }[] = [
    { id: 'modern', label: 'Modern', desc: 'Klar, zeitlos, minimalistisch' },
    { id: 'classic', label: 'Klassisch', desc: 'Warm, würdevoll, traditionell' },
    { id: 'timeless', label: 'Zeitlos', desc: 'Klar, ruhig, grosse Bilder' },
  ]

  return (
    <StepWrapper>
      <h2 className="font-display text-3xl text-memorial-ink mb-2">Welchen Stil soll Ihr Album haben?</h2>
      <p className="text-memorial-ink-soft text-[15px] mb-10">Der Stil prägt das Erscheinungsbild aller Seiten.</p>
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:items-start sm:gap-6">
        {styles.map((s) => {
          const isSelected = value === s.id
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className="group flex flex-col items-center cursor-pointer outline-none"
              aria-pressed={isSelected}
            >
              <StylePhoneFrame theme={s.id} selected={isSelected} />
              <p
                className={cn(
                  'mt-4 font-display text-lg transition-colors',
                  isSelected ? 'text-memorial-bronze-deep' : 'text-memorial-ink group-hover:text-memorial-bronze-deep'
                )}
              >
                {s.label}
              </p>
              <p className="text-[12px] text-memorial-ink-soft mt-0.5 text-center">{s.desc}</p>
              {isSelected && (
                <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-memorial-bronze-deep">
                  Ausgewählt
                </span>
              )}
            </button>
          )
        })}
      </div>
    </StepWrapper>
  )
}

// ─── step 3 — bilder + musik ─────────────────────────────────────────────────

function Step3({
  items,
  onAdd,
  onRemove,
  music,
  onMusicChange,
}: {
  items: MediaFile[]
  onAdd: (files: FileList) => Promise<void>
  onRemove: (id: string) => void
  music: MusicChoice
  onMusicChange: (v: MusicChoice) => void
}) {
  const [isCompressing, setIsCompressing] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [nowPlaying, setNowPlaying] = useState<string | null>(null)
  const [pixabayLink, setPixabayLink] = useState(music.type === 'pixabay' ? music.value : '')
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const remaining = MAX_MEDIA - items.length
    if (remaining <= 0) { toast.error(`Maximum ${MAX_MEDIA} Bilder erreicht.`); return }
    setIsCompressing(true)
    await onAdd(files)
    setIsCompressing(false)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [items.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePlayToggle = (src: string) => {
    const el = audioRef.current
    if (!el) return
    if (nowPlaying !== src) {
      setNowPlaying(src); el.src = src; el.play(); setIsPlaying(true)
    } else {
      if (isPlaying) { el.pause(); setIsPlaying(false) }
      else { el.play(); setIsPlaying(true) }
    }
  }

  const count = items.length
  const countColor = count >= MAX_MEDIA ? 'text-red-500' : count >= MIN_MEDIA ? 'text-memorial-bronze-deep' : 'text-memorial-ink-soft'

  return (
    <StepWrapper>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />

      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-display text-3xl text-memorial-ink">Ihre Fotos & Videos</h2>
        <span className={cn('text-sm font-medium tabular-nums', countColor)}>{count} / {MAX_MEDIA}</span>
      </div>
      <p className="text-memorial-ink-soft text-[15px] mb-2">
        Laden Sie <strong>mindestens {MIN_MEDIA} Bilder</strong> hoch (max. {MAX_MEDIA}). Wir gestalten Ihr Album daraus.
      </p>
      {count > 0 && count < MIN_MEDIA && (
        <p className="text-[12px] text-amber-600 mb-4">Noch {MIN_MEDIA - count} weitere Bilder nötig (Minimum: {MIN_MEDIA}).</p>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 mb-6',
          isDragOver ? 'border-memorial-bronze bg-memorial-bronze/5' : 'border-memorial-line hover:border-memorial-bronze/40 hover:bg-memorial-canvas'
        )}
      >
        {isCompressing ? (
          <><Loader2 className="w-8 h-8 text-memorial-bronze-deep animate-spin" /><p className="text-memorial-ink-soft text-[14px]">Bilder werden komprimiert…</p></>
        ) : (
          <>
            <Upload className="w-8 h-8 text-memorial-bronze-deep" strokeWidth={1.3} />
            <p className="font-display text-xl text-memorial-ink">Dateien hier ablegen</p>
            <p className="text-[13px] text-memorial-ink-soft">oder <span className="text-memorial-bronze-deep underline underline-offset-2">Dateien auswählen</span></p>
            <p className="text-[11px] text-memorial-ink-soft/60 mt-1">Bilder & Videos · min. {MIN_MEDIA}, max. {MAX_MEDIA} Dateien</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>

      {/* Thumbnail grid */}
      {count > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-8">
          {items.map((item) => (
            <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden group">
              {item.kind === 'image' ? (
                <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <video src={item.previewUrl} className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => onRemove(item.id)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Entfernen"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Music */}
      <div className="border-t border-memorial-line pt-6">
        <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mb-4">Begleitende Musik (optional)</p>
        <div className="space-y-2 mb-4">
          {MUSIC_TRACKS.map((track) => {
            const isCurrentlyPlaying = nowPlaying === track.src && isPlaying
            const isSelected = music.type === 'preset' && music.value === track.id
            return (
              <div key={track.id} className={cn('memorial-card rounded-xl flex items-center gap-3 px-4 py-3 border transition-all duration-200', isSelected ? 'border-memorial-bronze-deep' : 'border-transparent')}>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-memorial-canvas border border-memorial-line hover:border-memorial-bronze transition-colors flex-shrink-0"
                  onClick={() => handlePlayToggle(track.src)}
                  aria-label={isCurrentlyPlaying ? 'Pause' : 'Abspielen'}
                >
                  {isCurrentlyPlaying ? <Pause className="w-3.5 h-3.5 text-memorial-bronze-deep" /> : <Play className="w-3.5 h-3.5 text-memorial-bronze-deep" />}
                </button>
                <span className="flex-1 text-[14px] text-memorial-ink">{track.title}</span>
                <button
                  onClick={() => { setPixabayLink(''); onMusicChange({ type: 'preset', value: track.id, label: track.title }) }}
                  className={cn('text-[12px] px-3 py-1 rounded-full border transition-all duration-200', isSelected ? 'bg-memorial-bronze-deep text-white border-memorial-bronze-deep' : 'border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze')}
                >
                  {isSelected ? 'Ausgewählt' : 'Auswählen'}
                </button>
              </div>
            )
          })}
        </div>
        <div className="memorial-card rounded-xl p-4 border border-memorial-line flex gap-2 items-center">
          <input
            type="url"
            placeholder="Pixabay-Link (optional)"
            value={pixabayLink}
            onChange={(e) => {
              setPixabayLink(e.target.value)
              onMusicChange(e.target.value.trim() ? { type: 'pixabay', value: e.target.value.trim(), label: 'Pixabay-Link' } : { type: 'none', value: '', label: 'Keine Auswahl' })
            }}
            className="memorial-underline-input flex-1 text-[14px]"
          />
          <a href="https://pixabay.com/music/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[12px] text-memorial-bronze-deep hover:underline whitespace-nowrap">
            Öffnen <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </StepWrapper>
  )
}

// ─── step 4 — kontakt + bezahlen ─────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-memorial-line last:border-0">
      <span className="text-[12px] uppercase tracking-widest text-memorial-ink-soft">{label}</span>
      <span className="text-[14px] text-memorial-ink font-medium">{value}</span>
    </div>
  )
}

function Step4({
  data,
  onChange,
  step1,
  albumStyle,
  mediaCount,
  musicLabel,
  isSubmitting,
  onSubmit,
  onTestSubmit,
}: {
  data: Step4Data
  onChange: (d: Step4Data) => void
  step1: Step1Data
  albumStyle: AlbumStyle | null
  mediaCount: number
  musicLabel: string
  isSubmitting: boolean
  onSubmit: () => void
  onTestSubmit: () => void
}) {
  const setField = (key: keyof Step4Data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value })

  const styleLabels: Record<AlbumStyle, string> = { modern: 'Modern', classic: 'Klassisch', timeless: 'Zeitlos' }
  const shippingLabels: Record<ShippingZone, string> = { CH: 'Schweiz', EU: 'Europa', WORLD: 'Weltweit' }

  // Country list with priority countries on top, then alphabetical with separator
  const sortedCountries = useMemo(() => {
    const priorityCodes = ['CH', 'DE', 'AT', 'FR', 'IT', 'LI']
    const priority = priorityCodes
      .map((code) => countryList.find((c) => c.code === code))
      .filter((c): c is { name: string; code: string } => Boolean(c))
    const rest = countryList
      .filter((c) => !priorityCodes.includes(c.code))
      .sort((a, b) => a.name.localeCompare(b.name, 'de'))
    return { priority, rest }
  }, [])

  const zone = deriveShippingZone(data.countryCode)
  const shipping = SHIPPING[zone]
  const total = 89 + shipping
  const countryName = countryList.find((c) => c.code === data.countryCode)?.name ?? '—'
  const formatPrice = (n: number) => n.toFixed(2).replace('.', '.')

  return (
    <StepWrapper>
      <h2 className="font-display text-3xl text-memorial-ink mb-2">Kontakt & Bezahlung</h2>
      <p className="text-memorial-ink-soft text-[15px] mb-8">Fast geschafft — wir kümmern uns um den Rest.</p>

      {/* Contact */}
      <p className="text-[11px] uppercase tracking-[0.25em] text-memorial-ink-soft mb-4">Kontakt</p>
      <div className="space-y-6 mb-10">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">Ihr Name *</label>
          <input type="text" placeholder="Vor- und Nachname" value={data.contactName} onChange={setField('contactName')} className="memorial-underline-input w-full text-[15px] text-memorial-ink" />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">E-Mail *</label>
            <input type="email" placeholder="ihre@email.ch" value={data.contactEmail} onChange={setField('contactEmail')} className="memorial-underline-input w-full text-[15px] text-memorial-ink" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">Telefon (optional)</label>
            <input type="tel" placeholder="+41 79 000 00 00" value={data.contactPhone} onChange={setField('contactPhone')} className="memorial-underline-input w-full text-[15px] text-memorial-ink" />
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-[11px] uppercase tracking-[0.25em] text-memorial-ink-soft">Lieferadresse (für Smart Tag)</p>
        <span className="text-[11px] text-memorial-ink-soft">
          Versand: <span className="text-memorial-bronze-deep font-medium">{shippingLabels[zone]} · CHF {formatPrice(shipping)}</span>
        </span>
      </div>
      <div className="space-y-6 mb-8">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">Strasse & Nr. *</label>
          <input type="text" placeholder="Musterstrasse 12" value={data.street} onChange={setField('street')} className="memorial-underline-input w-full text-[15px] text-memorial-ink" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">PLZ *</label>
            <input type="text" inputMode="numeric" autoComplete="postal-code" placeholder="8000" value={data.postalCode} onChange={setField('postalCode')} className="memorial-underline-input w-full text-[15px] text-memorial-ink" />
          </div>
          <div className="col-span-2">
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">Ort *</label>
            <input type="text" autoComplete="address-level2" placeholder="Zürich" value={data.city} onChange={setField('city')} className="memorial-underline-input w-full text-[15px] text-memorial-ink" />
          </div>
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">Land *</label>
          <select value={data.countryCode} onChange={setField('countryCode')} className="memorial-underline-input w-full text-[15px] text-memorial-ink bg-transparent">
            {sortedCountries.priority.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
            <option disabled>──────────</option>
            {sortedCountries.rest.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="memorial-card rounded-2xl p-6 mb-8">
        <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mb-4">Zusammenfassung</p>
        <SummaryRow label="Für" value={step1.subjectName || '—'} />
        <SummaryRow label="Stil" value={albumStyle ? styleLabels[albumStyle] : '—'} />
        <SummaryRow label="Bilder" value={`${mediaCount} Dateien`} />
        <SummaryRow label="Musik" value={musicLabel || 'Keine Auswahl'} />
        <SummaryRow label="Versand" value={`${countryName} — CHF ${formatPrice(shipping)}`} />
        <div className="flex justify-between pt-4 mt-2">
          <span className="font-display text-lg text-memorial-ink">Gesamtpreis</span>
          <span className="font-display text-xl text-memorial-bronze-deep">CHF {formatPrice(total)}</span>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="memorial-cta memorial-cta-primary w-full flex items-center justify-center gap-3 rounded-full py-5 text-[15px] font-medium tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Wird verarbeitet…</>
        ) : (
          `Zahlungspflichtig bestellen — CHF ${formatPrice(total)}`
        )}
      </button>

      {import.meta.env.VITE_TEST_MODE === 'true' && (
        <button
          onClick={onTestSubmit}
          disabled={isSubmitting}
          className="memorial-cta memorial-cta-ghost mt-3 w-full rounded-full px-6 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          🧪 Test-Bestellung (ohne Zahlung)
        </button>
      )}
    </StepWrapper>
  )
}

// ─── success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="w-16 h-16 rounded-full bg-memorial-sage/20 flex items-center justify-center mb-6">
        <Heart className="w-8 h-8 text-memorial-sage-deep" strokeWidth={1.5} />
      </div>
      <h2 className="font-display text-3xl text-memorial-ink mb-3">Bestellung eingegangen</h2>
      <p className="text-memorial-ink-soft max-w-sm text-[15px] leading-relaxed">
        Vielen Dank. Wir erstellen Ihr Album mit Sorgfalt innert 48 Stunden und senden Ihnen den Link per E-Mail.
      </p>
    </div>
  )
}

// ─── main wizard ──────────────────────────────────────────────────────────────

export default function CustomerUpload() {
  const [step, setStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [step1, setStep1] = useState<Step1Data>({ subjectType: null, subjectName: '', birthDate: '', passingDate: '', dedication: '' })
  const [albumStyle, setAlbumStyle] = useState<AlbumStyle | null>(null)
  const [mediaItems, setMediaItems] = useState<MediaFile[]>([])
  const [music, setMusic] = useState<MusicChoice>({ type: 'none', value: '', label: 'Keine Auswahl' })
  const [step4, setStep4] = useState<Step4Data>({ contactName: '', contactEmail: '', contactPhone: '', street: '', postalCode: '', city: '', countryCode: 'CH' })

  const canAdvance = (): boolean => {
    if (step === 1) return step1.subjectType !== null && step1.subjectName.trim().length > 0
    if (step === 2) return albumStyle !== null
    if (step === 3) return mediaItems.length >= MIN_MEDIA
    return true
  }

  const next = () => {
    if (!canAdvance()) {
      const msgs: Record<number, string> = {
        1: 'Bitte Zielgruppe wählen und Namen eingeben.',
        2: 'Bitte einen Stil wählen.',
        3: `Bitte mindestens ${MIN_MEDIA} Bilder hochladen.`,
      }
      toast.error(msgs[step] ?? 'Bitte alle Pflichtfelder ausfüllen.')
      return
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setStep((s) => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddMedia = async (files: FileList) => {
    const imgOptions = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true }
    const toProcess = Array.from(files).slice(0, MAX_MEDIA - mediaItems.length)

    const results = await Promise.all(
      toProcess.map(async (file): Promise<MediaFile | null> => {
        if (file.type.startsWith('image/')) {
          try {
            const compressed = await imageCompression(file, imgOptions)
            return { id: crypto.randomUUID(), file: compressed, previewUrl: URL.createObjectURL(compressed), kind: 'image' }
          } catch {
            return { id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file), kind: 'image' }
          }
        }
        if (file.type.startsWith('video/')) {
          if (file.size > 200 * 1024 * 1024) { toast.error(`${file.name} zu groß (max 200 MB).`); return null }
          return { id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file), kind: 'video' }
        }
        return null
      })
    )

    const valid = results.filter(Boolean) as MediaFile[]
    setMediaItems((prev) => [...prev, ...valid])
    if (valid.length > 0) toast.success(`${valid.length} Dateien hinzugefügt.`)
  }

  const validateContactAndAddress = (): boolean => {
    if (!step4.contactEmail.trim()) { toast.error('Bitte E-Mail-Adresse eingeben.'); return false }
    if (!step4.contactName.trim()) { toast.error('Bitte Namen eingeben.'); return false }
    if (!step4.street.trim() || !step4.postalCode.trim() || !step4.city.trim()) {
      toast.error('Bitte Lieferadresse vollständig ausfüllen.'); return false
    }
    return true
  }

  const handleTestSubmit = async () => {
    if (!validateContactAndAddress()) return
    if (!step1.subjectType || !albumStyle) { toast.error('Bitte alle Schritte abschliessen.'); return }
    if (mediaItems.length < MIN_MEDIA) { toast.error(`Mindestens ${MIN_MEDIA} Bilder erforderlich.`); return }

    const shippingAddress = buildShippingAddress(step4)
    const shippingZone = deriveShippingZone(step4.countryCode)

    setIsSubmitting(true)
    try {
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-customer-order', {
        body: {
          subjectType: step1.subjectType,
          subjectName: step1.subjectName,
          albumStyle,
          dedication: step1.dedication,
          birthDate: step1.birthDate,
          passingDate: step1.passingDate,
          music,
          contactEmail: step4.contactEmail,
          contactName: step4.contactName,
          contactPhone: step4.contactPhone,
          shippingAddress,
          shippingZone,
          isTest: true,
        },
      })

      if (orderError || !orderData?.orderId) {
        throw new Error(orderData?.error ?? 'Fehler beim Erstellen der Test-Bestellung.')
      }

      const { folderName, orderId, slug } = orderData

      toast.info(`Lade ${mediaItems.length} Dateien hoch…`)
      const uploadedFiles: { path: string }[] = []

      await Promise.all(
        mediaItems.map(async (item) => {
          const cleanName = sanitizeFileName(item.file.name)
          const filePath = `${folderName}/${crypto.randomUUID()}-${cleanName}`
          const { data: up, error: upErr } = await supabase.storage.from('uploads').upload(filePath, item.file, { upsert: true })
          if (upErr) throw upErr
          if (up?.path) uploadedFiles.push({ path: up.path })
        })
      )

      // Single atomic finalize with all paths — prevents race where parallel
      // per-file finalize calls overwrite each other's uploaded_files array
      await supabase.functions.invoke('finalize-customer-order', {
        body: { orderId, uploadedFilePaths: uploadedFiles },
      })

      window.location.href = `/bestellung-erfolgreich?slug=${encodeURIComponent(slug)}&test=1`
    } catch (err) {
      console.error(err)
      toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    if (!validateContactAndAddress()) return
    if (!step1.subjectType || !albumStyle) { toast.error('Bitte alle Schritte abschliessen.'); return }
    if (mediaItems.length < MIN_MEDIA) { toast.error(`Mindestens ${MIN_MEDIA} Bilder erforderlich.`); return }

    const shippingAddress = buildShippingAddress(step4)
    const shippingZone = deriveShippingZone(step4.countryCode)

    setIsSubmitting(true)

    try {
      // 1. Create order record
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-customer-order', {
        body: {
          subjectType: step1.subjectType,
          subjectName: step1.subjectName,
          albumStyle,
          dedication: step1.dedication,
          birthDate: step1.birthDate,
          passingDate: step1.passingDate,
          music,
          contactEmail: step4.contactEmail,
          contactName: step4.contactName,
          contactPhone: step4.contactPhone,
          shippingAddress,
          shippingZone,
        },
      })

      if (orderError || !orderData?.folderName) {
        throw new Error(orderData?.error ?? 'Fehler beim Erstellen der Bestellung.')
      }

      const { folderName, orderId, stripeOrderId } = orderData

      // 2. Upload files
      toast.info(`Lade ${mediaItems.length} Dateien hoch…`)
      const uploadedFiles: { path: string }[] = []

      await Promise.all(
        mediaItems.map(async (item) => {
          const cleanName = sanitizeFileName(item.file.name)
          const filePath = `${folderName}/${crypto.randomUUID()}-${cleanName}`
          const { data: up, error: upErr } = await supabase.storage.from('uploads').upload(filePath, item.file, { upsert: true })
          if (upErr) throw upErr
          if (up?.path) uploadedFiles.push({ path: up.path })
        })
      )

      // 3. Store file list
      await supabase.functions.invoke('finalize-customer-order', {
        body: { orderId, uploadedFilePaths: uploadedFiles },
      })

      // 4. Stripe checkout
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          orderId: stripeOrderId ?? orderId,
          productName: `Memora Moments — ${step1.subjectName}`,
          unitAmount: Math.round((89 + SHIPPING[shippingZone]) * 100) / 100,
        },
      })

      if (checkoutError || !checkoutData?.url) {
        setIsSuccess(true)
        toast.warning('Bestellung erstellt. Zahlung bitte per Rechnung.')
        return
      }

      window.location.href = checkoutData.url
    } catch (err) {
      console.error(err)
      toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) return <SuccessScreen />

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <ProgressIndicator current={step} />

      <AnimatePresence mode="wait">
        {step === 1 && <Step1 key="s1" data={step1} onChange={setStep1} />}
        {step === 2 && <Step2 key="s2" value={albumStyle} onChange={setAlbumStyle} />}
        {step === 3 && (
          <Step3
            key="s3"
            items={mediaItems}
            onAdd={handleAddMedia}
            onRemove={(id) => setMediaItems((prev) => prev.filter((i) => i.id !== id))}
            music={music}
            onMusicChange={setMusic}
          />
        )}
        {step === 4 && (
          <Step4
            key="s4"
            data={step4}
            onChange={setStep4}
            step1={step1}
            albumStyle={albumStyle}
            mediaCount={mediaItems.length}
            musicLabel={music.label}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onTestSubmit={handleTestSubmit}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-memorial-line">
        {step > 1 ? (
          <button onClick={back} className="memorial-cta memorial-cta-ghost flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
        ) : (
          <div />
        )}
        {step < TOTAL_STEPS && (
          <button onClick={next} className="memorial-cta memorial-cta-primary flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium">
            {step === 3 ? 'Weiter zur Bestellung' : 'Weiter'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
