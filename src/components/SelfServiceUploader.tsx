import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  PawPrint,
  Upload,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import SelfServiceDndList, { MediaItem } from "./SelfServiceDndList";
import { AlbumEditor } from "./AlbumEditor/AlbumEditor";
import { PreviewModal } from "./AlbumEditor/PreviewModal";
import { useAlbumPages } from "@/hooks/useAlbumPages";
import type { EditorMediaItem } from "@/hooks/useAlbumPages";

// ─── helpers ────────────────────────────────────────────────────────────────

function sanitizeFileName(filename: string): string {
  const map: Record<string, string> = {
    ä: "ae",
    ö: "oe",
    ü: "ue",
    Ä: "Ae",
    Ö: "Oe",
    Ü: "Ue",
    ß: "ss",
  };
  let s = filename;
  for (const k in map) s = s.replace(new RegExp(k, "g"), map[k]);
  return s
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/--+/g, "-");
}

// ─── types ───────────────────────────────────────────────────────────────────

type SubjectType = "human" | "pet";
type AlbumStyle = "modern" | "classic" | "timeless";

interface MusicChoice {
  type: "preset" | "pixabay" | "none";
  value: string;
  label: string;
}

const MUSIC_TRACKS = [
  { src: "/music/ambient-piano-music.mp3", title: "Ambient Piano", id: "ambient-piano-music.mp3" },
  { src: "/music/inspiring-emotional-uplifting-piano.mp3", title: "Inspiring Piano", id: "inspiring-emotional-uplifting-piano.mp3" },
  { src: "/music/happy-music.mp3", title: "Heitere Musik", id: "happy-music.mp3" },
  { src: "/music/calm-classical-piano.mp3", title: "Klassisches Klavier", id: "calm-classical-piano.mp3" },
  { src: "/music/relaxed-music.mp3", title: "Entspannte Musik", id: "relaxed-music.mp3" },
  { src: "/music/soft-calm-music.mp3", title: "Sanfte Ruhe", id: "soft-calm-music.mp3" },
];

const STEP_LABELS = [
  "Für wen",
  "Stil",
  "Medien",
  "Album",
  "Musik",
  "Vorschau",
  "Details",
  "Bestellen",
];

const TOTAL_STEPS = 8;

const MAX_MEDIA = 40;
const WARN_MEDIA = 30;

// ─── progress indicator ──────────────────────────────────────────────────────

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-10">
      <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">
        Schritt {current} von {total}
      </p>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i + 1 < current
                ? "w-5 bg-memorial-bronze-deep"
                : i + 1 === current
                ? "w-8 bg-memorial-bronze-deep"
                : "w-3 bg-memorial-line"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── step wrapper ────────────────────────────────────────────────────────────

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── step 1 — subject type ──────────────────────────────────────────────────

function Step1({
  value,
  onChange,
}: {
  value: SubjectType | null;
  onChange: (v: SubjectType) => void;
}) {
  const cards: { type: SubjectType; icon: React.ReactNode; title: string; desc: string; accent: string }[] = [
    {
      type: "human",
      icon: <Heart className="w-8 h-8" strokeWidth={1.3} />,
      title: "Für einen Menschen",
      desc: "Ein Gedenkalbum für eine geliebte Person",
      accent: "hover:bg-memorial-bronze/10 data-[selected=true]:bg-memorial-bronze/10 data-[selected=true]:border-memorial-bronze-deep",
    },
    {
      type: "pet",
      icon: <PawPrint className="w-8 h-8" strokeWidth={1.3} />,
      title: "Für ein Tier",
      desc: "Ein liebevolles Album für Ihren tierischen Begleiter",
      accent: "hover:bg-memorial-sage/10 data-[selected=true]:bg-memorial-sage/10 data-[selected=true]:border-memorial-sage-deep",
    },
  ];

  return (
    <StepWrapper>
      <h2 className="font-display text-3xl text-memorial-ink mb-2">
        Für wen gestalten Sie dieses Album?
      </h2>
      <p className="text-memorial-ink-soft text-[15px] mb-8">
        Wählen Sie die Zielgruppe Ihres Gedenkalbums.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <button
            key={c.type}
            data-selected={value === c.type}
            onClick={() => onChange(c.type)}
            className={cn(
              "memorial-card rounded-2xl p-8 text-left border-2 transition-all duration-300 cursor-pointer",
              "border-memorial-line",
              c.accent
            )}
          >
            <div className="text-memorial-bronze-deep mb-4">{c.icon}</div>
            <p className="font-display text-xl text-memorial-ink mb-1">{c.title}</p>
            <p className="text-[13px] text-memorial-ink-soft leading-relaxed">{c.desc}</p>
          </button>
        ))}
      </div>
    </StepWrapper>
  );
}

// ─── step 2 — style ──────────────────────────────────────────────────────────

function Step2({
  value,
  onChange,
}: {
  value: AlbumStyle | null;
  onChange: (v: AlbumStyle) => void;
}) {
  const styles: {
    id: AlbumStyle;
    label: string;
    desc: string;
    preview: React.ReactNode;
  }[] = [
    {
      id: "modern",
      label: "Modern",
      desc: "Klar, zeitlos, minimalistisch",
      preview: (
        <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2 p-4">
          <div className="w-12 h-0.5 bg-slate-400" />
          <p className="font-display text-lg text-slate-700">In Erinnerung</p>
          <div className="w-6 h-0.5 bg-slate-300" />
        </div>
      ),
    },
    {
      id: "classic",
      label: "Klassisch",
      desc: "Warm, würdevoll, traditionell",
      preview: (
        <div className="aspect-[3/4] bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col items-center justify-center gap-2 p-4">
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 flex items-center justify-center">
            <Heart className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
          </div>
          <p className="font-display text-lg text-amber-900">In liebevoller Erinnerung</p>
        </div>
      ),
    },
    {
      id: "timeless",
      label: "Zeitlos",
      desc: "Schlicht, elegant, grossformatige Bilder",
      preview: (
        <div className="aspect-[3/4] bg-white flex flex-col overflow-hidden">
          <div className="flex-1 bg-gradient-to-br from-stone-700 to-stone-900 relative">
            <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic', fontSize: 11, color: '#fff', opacity: 0.9 }}>Marie</p>
            </div>
          </div>
          <div className="h-px bg-stone-200" />
          <div className="flex" style={{ height: 28 }}>
            <div className="flex-1 bg-stone-300" />
            <div className="w-px bg-white" />
            <div className="flex-1 bg-stone-400" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <StepWrapper>
      <h2 className="font-display text-3xl text-memorial-ink mb-2">
        Welchen Stil soll Ihr Album haben?
      </h2>
      <p className="text-memorial-ink-soft text-[15px] mb-8">
        Der Stil prägt das Erscheinungsbild aller Seiten.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {styles.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={cn(
              "memorial-card rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer text-left",
              value === s.id
                ? "border-memorial-bronze-deep ring-1 ring-memorial-bronze-deep/30"
                : "border-memorial-line hover:border-memorial-bronze/40"
            )}
          >
            <div className="overflow-hidden rounded-t-xl">{s.preview}</div>
            <div className="p-4">
              <p className="font-display text-lg text-memorial-ink">{s.label}</p>
              <p className="text-[12px] text-memorial-ink-soft mt-0.5">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </StepWrapper>
  );
}

// ─── step 3 — media ──────────────────────────────────────────────────────────

function Step3({
  items,
  onAdd,
  onReorder,
  onRemove,
  onCaptionChange,
}: {
  items: MediaItem[];
  onAdd: (files: FileList) => Promise<void>;
  onReorder: (items: MediaItem[]) => void;
  onRemove: (id: string) => void;
  onCaptionChange: (id: string, caption: string) => void;
}) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = MAX_MEDIA - items.length;
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_MEDIA} Medien erreicht.`);
      return;
    }
    setIsCompressing(true);
    await onAdd(files);
    setIsCompressing(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [items.length]
  );

  const count = items.length;
  const countColor =
    count >= MAX_MEDIA
      ? "text-red-500"
      : count >= WARN_MEDIA
      ? "text-amber-600"
      : "text-memorial-bronze-deep";

  return (
    <StepWrapper>
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-display text-3xl text-memorial-ink">
          Ihre Fotos & Videos
        </h2>
        <span className={cn("text-sm font-medium tabular-nums", countColor)}>
          {count} / {MAX_MEDIA} Medien
        </span>
      </div>
      <p className="text-memorial-ink-soft text-[15px] mb-6">
        Laden Sie bis zu {MAX_MEDIA} Bilder oder Videos hoch und ordnen Sie diese per Drag & Drop.
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300",
          isDragOver
            ? "border-memorial-bronze bg-memorial-bronze/5"
            : "border-memorial-line hover:border-memorial-bronze/40 hover:bg-memorial-canvas"
        )}
      >
        {isCompressing ? (
          <>
            <Loader2 className="w-8 h-8 text-memorial-bronze-deep animate-spin" />
            <p className="text-memorial-ink-soft text-[14px]">Bilder werden komprimiert…</p>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-memorial-bronze-deep" strokeWidth={1.3} />
            <p className="font-display text-xl text-memorial-ink">
              Dateien hier ablegen
            </p>
            <p className="text-[13px] text-memorial-ink-soft">
              oder{" "}
              <span className="text-memorial-bronze-deep underline underline-offset-2">
                Dateien auswählen
              </span>
            </p>
            <p className="text-[11px] text-memorial-ink-soft/60 mt-1">
              Bilder & Videos · max. 200 MB pro Video
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {count >= WARN_MEDIA && count < MAX_MEDIA && (
        <p className="text-[12px] text-amber-600 mt-2">
          Fast voll — noch {MAX_MEDIA - count} Medien möglich.
        </p>
      )}

      {/* Sortable list */}
      {count > 0 && (
        <div className="mt-6 space-y-1">
          <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mb-3">
            Reihenfolge anpassen
          </p>
          <SelfServiceDndList
            items={items}
            onReorder={onReorder}
            onRemove={onRemove}
            onCaptionChange={onCaptionChange}
          />
        </div>
      )}
    </StepWrapper>
  );
}

// ─── step 4 — album editor (placeholder wrapper) ─────────────────────────────
// AlbumEditor is rendered directly in the main wizard to access hook state

// ─── step 5 — music ──────────────────────────────────────────────────────────

function Step4({
  value,
  onChange,
}: {
  value: MusicChoice;
  onChange: (v: MusicChoice) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [pixabayLink, setPixabayLink] = useState(
    value.type === "pixabay" ? value.value : ""
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayToggle = (src: string) => {
    const el = audioRef.current;
    if (!el) return;
    if (nowPlaying !== src) {
      setNowPlaying(src);
      el.src = src;
      el.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) { el.pause(); setIsPlaying(false); }
      else { el.play(); setIsPlaying(true); }
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    const onEnd = () => setIsPlaying(false);
    el?.addEventListener("ended", onEnd);
    return () => { el?.removeEventListener("ended", onEnd); el?.pause(); };
  }, []);

  return (
    <StepWrapper>
      <audio ref={audioRef} className="custom-audio-player" />
      <h2 className="font-display text-3xl text-memorial-ink mb-2">
        Begleitende Musik wählen
      </h2>
      <p className="text-memorial-ink-soft text-[15px] mb-6">
        Die Musik spielt leise im Hintergrund während das Album läuft.
      </p>

      <div className="space-y-2 mb-6">
        {MUSIC_TRACKS.map((track) => {
          const isCurrentlyPlaying = nowPlaying === track.src && isPlaying;
          const isSelected = value.type === "preset" && value.value === track.id;
          return (
            <div
              key={track.id}
              className={cn(
                "memorial-card rounded-xl flex items-center gap-3 px-4 py-3 border transition-all duration-200",
                isSelected ? "border-memorial-bronze-deep" : "border-transparent"
              )}
            >
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center bg-memorial-canvas border border-memorial-line hover:border-memorial-bronze transition-colors flex-shrink-0"
                onClick={() => handlePlayToggle(track.src)}
                aria-label={isCurrentlyPlaying ? "Pause" : "Abspielen"}
              >
                {isCurrentlyPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-memorial-bronze-deep" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-memorial-bronze-deep" />
                )}
              </button>
              <span className="flex-1 text-[14px] text-memorial-ink">{track.title}</span>
              <button
                onClick={() => {
                  setPixabayLink("");
                  onChange({ type: "preset", value: track.id, label: track.title });
                }}
                className={cn(
                  "text-[12px] px-3 py-1 rounded-full border transition-all duration-200",
                  isSelected
                    ? "bg-memorial-bronze-deep text-white border-memorial-bronze-deep"
                    : "border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze"
                )}
              >
                {isSelected ? "Ausgewählt" : "Auswählen"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pixabay */}
      <div className="memorial-card rounded-xl p-5 border border-memorial-line">
        <p className="text-[12px] uppercase tracking-widest text-memorial-ink-soft mb-3">
          Eigene Musik von Pixabay
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://pixabay.com/music/..."
            value={pixabayLink}
            onChange={(e) => {
              setPixabayLink(e.target.value);
              if (e.target.value.trim()) {
                onChange({ type: "pixabay", value: e.target.value.trim(), label: "Pixabay-Link" });
              } else {
                onChange({ type: "none", value: "", label: "Keine Auswahl" });
              }
            }}
            className="memorial-underline-input flex-1 text-[14px]"
          />
          <a
            href="https://pixabay.com/music/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[12px] text-memorial-bronze-deep hover:text-memorial-bronze underline-offset-2 hover:underline whitespace-nowrap"
          >
            Pixabay öffnen <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </StepWrapper>
  );
}

// ─── step 5 — details ────────────────────────────────────────────────────────

interface Details {
  subjectName: string;
  dedication: string;
  birthDate: string;
  passingDate: string;
}

function Step5({ value, onChange, subjectType }: { value: Details; onChange: (v: Details) => void; subjectType: SubjectType | null }) {
  const isHuman = subjectType !== "pet";
  const namePlaceholder = isHuman ? "Name der Person" : "Name des Tieres";

  const set = (key: keyof Details) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...value, [key]: e.target.value });

  return (
    <StepWrapper>
      <h2 className="font-display text-3xl text-memorial-ink mb-2">
        Name & Widmung
      </h2>
      <p className="text-memorial-ink-soft text-[15px] mb-8">
        Diese Details erscheinen auf der Titelseite Ihres Albums.
      </p>

      <div className="space-y-8">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
            Name *
          </label>
          <input
            type="text"
            placeholder={namePlaceholder}
            value={value.subjectName}
            onChange={set("subjectName")}
            className="memorial-underline-input w-full text-lg text-memorial-ink font-display"
          />
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
            Widmung (optional)
          </label>
          <textarea
            placeholder="Eine kurze Nachricht, die das Album begleitet…"
            value={value.dedication}
            onChange={set("dedication")}
            rows={3}
            className="memorial-underline-input w-full text-[15px] text-memorial-ink resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
              Geburtsdatum (optional)
            </label>
            <input
              type="date"
              value={value.birthDate}
              onChange={set("birthDate")}
              className="memorial-underline-input w-full text-[14px] text-memorial-ink"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
              {isHuman ? "Sterbedatum" : "Todesdatum"} (optional)
            </label>
            <input
              type="date"
              value={value.passingDate}
              onChange={set("passingDate")}
              className="memorial-underline-input w-full text-[14px] text-memorial-ink"
            />
          </div>
        </div>
      </div>
    </StepWrapper>
  );
}

// ─── step 6 — contact & order ────────────────────────────────────────────────

interface ContactInfo {
  email: string;
  phone: string;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-memorial-line last:border-0">
      <span className="text-[12px] uppercase tracking-widest text-memorial-ink-soft">{label}</span>
      <span className="text-[14px] text-memorial-ink font-medium">{value}</span>
    </div>
  );
}

function Step6({
  contact,
  onContactChange,
  subjectType,
  albumStyle,
  mediaCount,
  musicLabel,
  subjectName,
  isSubmitting,
  onSubmit,
}: {
  contact: ContactInfo;
  onContactChange: (v: ContactInfo) => void;
  subjectType: SubjectType | null;
  albumStyle: AlbumStyle | null;
  mediaCount: number;
  musicLabel: string;
  subjectName: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}) {
  const set = (key: keyof ContactInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onContactChange({ ...contact, [key]: e.target.value });

  const styleLabels: Record<AlbumStyle, string> = { modern: "Modern", classic: "Klassisch", timeless: "Zeitlos" };
  const subjectLabels: Record<SubjectType, string> = { human: "Mensch", pet: "Tier" };

  return (
    <StepWrapper>
      <h2 className="font-display text-3xl text-memorial-ink mb-2">
        Kontakt & Bestellung
      </h2>
      <p className="text-memorial-ink-soft text-[15px] mb-8">
        Wir senden Ihnen nach der Bestellung eine Bestätigung zu.
      </p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
            Ihre E-Mail-Adresse *
          </label>
          <input
            type="email"
            placeholder="ihre@email.ch"
            value={contact.email}
            onChange={set("email")}
            className="memorial-underline-input w-full text-[15px] text-memorial-ink"
          />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-2">
            Telefon (optional)
          </label>
          <input
            type="tel"
            placeholder="+41 79 000 00 00"
            value={contact.phone}
            onChange={set("phone")}
            className="memorial-underline-input w-full text-[15px] text-memorial-ink"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="memorial-card rounded-2xl p-6 mb-8">
        <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mb-4">
          Zusammenfassung
        </p>
        <SummaryRow label="Für" value={subjectType ? subjectLabels[subjectType] : "—"} />
        <SummaryRow label="Stil" value={albumStyle ? styleLabels[albumStyle] : "—"} />
        <SummaryRow label="Medien" value={`${mediaCount} Dateien`} />
        <SummaryRow label="Musik" value={musicLabel || "Keine Auswahl"} />
        <SummaryRow label="Name" value={subjectName || "—"} />
        <div className="flex justify-between pt-4 mt-2">
          <span className="font-display text-lg text-memorial-ink">Gesamtpreis</span>
          <span className="font-display text-xl text-memorial-bronze-deep">CHF 89.–</span>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="memorial-cta memorial-cta-primary w-full flex items-center justify-center gap-3 rounded-full py-5 text-[15px] font-medium tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Wird verarbeitet…
          </>
        ) : (
          "Zahlungspflichtig bestellen — CHF 89.–"
        )}
      </button>
      <p className="text-center text-[11px] text-memorial-ink-soft mt-3">
        Sie werden nach der Bestellung zu Stripe weitergeleitet.
      </p>
    </StepWrapper>
  );
}

// ─── success screen ──────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="w-16 h-16 rounded-full bg-memorial-sage/20 flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-memorial-sage-deep" strokeWidth={1.5} />
      </div>
      <h2 className="font-display text-3xl text-memorial-ink mb-3">Bestellung eingegangen</h2>
      <p className="text-memorial-ink-soft max-w-sm text-[15px] leading-relaxed">
        Vielen Dank. Wir haben Ihre Bestellung erhalten und beginnen mit der Erstellung Ihres Albums.
        Eine Bestätigung wird an Ihre E-Mail gesendet.
      </p>
    </div>
  );
}

// ─── main wizard ─────────────────────────────────────────────────────────────

export default function SelfServiceUploader() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [subjectType, setSubjectType] = useState<SubjectType | null>(null);
  const [albumStyle, setAlbumStyle] = useState<AlbumStyle | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [music, setMusic] = useState<MusicChoice>({ type: "none", value: "", label: "Keine Auswahl" });
  const [details, setDetails] = useState<Details>({
    subjectName: "",
    dedication: "",
    birthDate: "",
    passingDate: "",
  });
  const [contact, setContact] = useState<ContactInfo>({ email: "", phone: "" });

  // Convert MediaItems to EditorMediaItems for the album engine
  const editorMedia: EditorMediaItem[] = mediaItems.map((m) => ({
    id: m.id,
    file: m.file,
    previewUrl: m.previewUrl,
    caption: m.caption,
    kind: m.kind,
    width: m.kind === "image" ? 1200 : 1920,
    height: m.kind === "image" ? 800 : 1080,
  }));

  const effectiveMode = (albumStyle ?? "modern") as "modern" | "classic" | "timeless";

  const albumPages = useAlbumPages([], effectiveMode);

  // Re-build pages when entering step 4
  const handleEnterEditor = useCallback(() => {
    albumPages.reset(editorMedia);
  }, [mediaItems, effectiveMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Validation per step
  const canAdvance = (): boolean => {
    if (step === 1) return subjectType !== null;
    if (step === 2) return albumStyle !== null;
    if (step === 3) return mediaItems.length > 0;
    if (step === 7) return details.subjectName.trim().length > 0;
    return true;
  };

  const next = () => {
    if (!canAdvance()) {
      const msgs: Record<number, string> = {
        1: "Bitte wählen Sie eine Zielgruppe.",
        2: "Bitte wählen Sie einen Stil.",
        3: "Bitte laden Sie mindestens eine Datei hoch.",
        7: "Bitte geben Sie einen Namen ein.",
      };
      toast.error(msgs[step] ?? "Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    // When advancing to step 4 (album editor), rebuild pages from current media
    if (step === 3) {
      handleEnterEditor();
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add media with compression
  const handleAddMedia = async (files: FileList) => {
    const imgOptions = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
    const toProcess = Array.from(files).slice(0, MAX_MEDIA - mediaItems.length);

    const results = await Promise.all(
      toProcess.map(async (file): Promise<MediaItem> => {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (isImage) {
          try {
            const compressed = await imageCompression(file, imgOptions);
            return {
              id: crypto.randomUUID(),
              file: compressed,
              previewUrl: URL.createObjectURL(compressed),
              caption: "",
              kind: "image",
            };
          } catch {
            return {
              id: crypto.randomUUID(),
              file,
              previewUrl: URL.createObjectURL(file),
              caption: "",
              kind: "image",
            };
          }
        } else if (isVideo) {
          const MAX_VIDEO = 200 * 1024 * 1024;
          if (file.size > MAX_VIDEO) {
            toast.error(`${file.name} ist zu groß (max 200 MB).`);
            return null as unknown as MediaItem;
          }
          return {
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            caption: "",
            kind: "video",
          };
        }
        return null as unknown as MediaItem;
      })
    );

    const valid = results.filter(Boolean);
    setMediaItems((prev) => [...prev, ...valid]);
    if (valid.length > 0) toast.success(`${valid.length} Dateien hinzugefügt.`);
  };

  // Submit
  const handleSubmit = async () => {
    if (!contact.email.trim()) {
      toast.error("Bitte geben Sie Ihre E-Mail-Adresse ein.");
      return;
    }
    if (!subjectType || !albumStyle) {
      toast.error("Bitte füllen Sie alle Schritte aus.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create order record
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        "create-self-service-order",
        {
          body: {
            subjectType,
            albumStyle,
            subjectName: details.subjectName,
            dedication: details.dedication,
            birthDate: details.birthDate,
            passingDate: details.passingDate,
            musicChoice: music,
            email: contact.email,
            phone: contact.phone,
            albumLayout: { pages: albumPages.state.pages },
          },
        }
      );

      if (orderError || !orderData?.folderName) {
        throw new Error(orderData?.error ?? "Fehler beim Erstellen der Bestellung.");
      }

      const { folderName, orderId } = orderData;

      // 2. Upload files (preserving mediaItem.id for editor→viewer mapping)
      toast.info(`Lade ${mediaItems.length} Dateien hoch…`);
      const uploadedFiles: { path: string; caption: string; id: string }[] = [];

      await Promise.all(
        mediaItems.map(async (item) => {
          const cleanName = sanitizeFileName(item.file.name);
          const filePath = `${folderName}/${crypto.randomUUID()}-${cleanName}`;
          const { data: up, error: upErr } = await supabase.storage
            .from("uploads")
            .upload(filePath, item.file, { upsert: true });
          if (upErr) throw upErr;
          if (up?.path) uploadedFiles.push({ path: up.path, caption: item.caption, id: item.id });
        })
      );

      // 3. Finalize (store file list)
      const { error: finalizeError } = await supabase.functions.invoke("finalize-partner-order", {
        body: { orderId, uploadedFilePaths: uploadedFiles },
      });
      if (finalizeError) {
        console.error("Finalize error:", finalizeError);
        toast.warning("Dateien hochgeladen, aber Dateiliste konnte nicht gespeichert werden.");
      }

      // 4. Stripe checkout
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            orderId: orderData.stripeOrderId ?? orderId,
            productName: `Memora Moments — ${details.subjectName || "Gedenkalbum"}`,
            unitAmount: 89,
          },
        }
      );

      if (checkoutError || !checkoutData?.url) {
        // Order placed but checkout failed — still treat as success
        console.error("Checkout error:", checkoutError);
        setIsSuccess(true);
        toast.warning("Bestellung erstellt. Zahlung bitte per Rechnung.");
        return;
      }

      window.location.href = checkoutData.url;
    } catch (err) {
      console.error(err);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) return <SuccessScreen />;

  const isEditorStep = step === 4;
  const isPreviewStep = step === 6;

  return (
    <div className={cn(
      "mx-auto",
      isEditorStep ? "max-w-full px-0 py-0" : "max-w-3xl px-4 py-10"
    )}>
      {!isEditorStep && <ProgressIndicator current={step} total={TOTAL_STEPS} />}
      {isEditorStep && (
        <div className="px-4 py-2">
          <ProgressIndicator current={step} total={TOTAL_STEPS} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1 key="s1" value={subjectType} onChange={(v) => { setSubjectType(v); }} />
        )}
        {step === 2 && (
          <Step2 key="s2" value={albumStyle} onChange={(v) => { setAlbumStyle(v); }} />
        )}
        {step === 3 && (
          <Step3
            key="s3"
            items={mediaItems}
            onAdd={handleAddMedia}
            onReorder={setMediaItems}
            onRemove={(id) => setMediaItems((prev) => prev.filter((i) => i.id !== id))}
            onCaptionChange={(id, caption) =>
              setMediaItems((prev) =>
                prev.map((i) => (i.id === id ? { ...i, caption } : i))
              )
            }
          />
        )}
        {step === 4 && (
          <motion.div
            key="s4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlbumEditor
              media={editorMedia}
              mode={effectiveMode}
              value={albumPages.state}
              onPreview={() => setPreviewOpen(true)}
              onBack={back}
              regenerate={albumPages.regenerate}
              swapMediaAt={albumPages.swapMediaAt}
              changePageLayout={albumPages.changePageLayout}
            />
          </motion.div>
        )}
        {step === 5 && (
          <Step4 key="s5" value={music} onChange={setMusic} />
        )}
        {step === 6 && (
          <StepWrapper key="s6">
            <div className="text-center py-8">
              <h2 className="font-display text-3xl text-memorial-ink mb-3">Album-Vorschau</h2>
              <p className="text-memorial-ink-soft text-[15px] mb-8">
                So wird Ihr Album aussehen. Klicken Sie auf „Vorschau öffnen" um alle Seiten zu sehen.
              </p>
              <button
                onClick={() => setPreviewOpen(true)}
                className="memorial-cta memorial-cta-primary flex items-center gap-2 rounded-full px-10 py-4 text-[15px] mx-auto"
              >
                Vorschau öffnen
              </button>
            </div>
          </StepWrapper>
        )}
        {step === 7 && (
          <Step5 key="s7" value={details} onChange={setDetails} subjectType={subjectType} />
        )}
        {step === 8 && (
          <Step6
            key="s8"
            contact={contact}
            onContactChange={setContact}
            subjectType={subjectType}
            albumStyle={albumStyle}
            mediaCount={mediaItems.length}
            musicLabel={music.label}
            subjectName={details.subjectName}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-memorial-line">
        {step > 1 ? (
          <button
            onClick={back}
            className="memorial-cta memorial-cta-ghost flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS && (
          <button
            onClick={next}
            className="memorial-cta memorial-cta-primary flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium"
          >
            {step === 7 ? "Weiter zur Bestellung" : step === 4 ? "Vorschau & Musik" : "Weiter"}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Preview modal (accessible from step 4 and 6) */}
      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onOrder={() => {
          setPreviewOpen(false);
          setStep(TOTAL_STEPS);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        pages={albumPages.state.pages}
        media={editorMedia}
        mode={effectiveMode}
        subjectName={details.subjectName}
      />
    </div>
  );
}
