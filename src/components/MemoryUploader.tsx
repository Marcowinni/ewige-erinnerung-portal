import { useMemo, useState, useEffect, useRef } from "react";
import { useContent } from "@/contexts/ContentContext";
import type { Mode } from "@/data/content/types";
import { getMediaForMode } from "@/data/productMedia";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/* -------------------- Types & Helpers -------------------- */
type ProductKey = "basic" | "premium" | "deluxe";
const productKeyOrder: ProductKey[] = ["basic", "premium", "deluxe"];
type TagFormat = "round_3cm" | "square_6cm";

type EditorText = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontFamily: string;
  fontSize: number;
  color: string;
};

type CustomDesign = {
  bgImageUrl?: string;
  scale: number;
  offsetX: number;
  offsetY: number;
  texts: EditorText[];
  previewDataUrl?: string;
};

type FormState = {
  product?: ProductKey;

  // gemeinsame Notizen
  notes?: string;

  // Menschen
  human_lastName?: string;
  human_firstName?: string;
  human_deathDate?: string;

  // Haustiere
  pet_name?: string;
  pet_deathDate?: string;

  // Surprise
  surprise_name?: string;

  // Uploads (werden NICHT im LocalStorage persistiert)
  images: File[];
  videos: File[];

  // Kontakt
  contact_firstName?: string;
  contact_lastName?: string;
  contact_email?: string;
  contact_phone?: string;

  // Rechnung
  invoice_company?: string;
  invoice_firstName?: string;
  invoice_lastName?: string;
  invoice_street?: string;
  invoice_zip?: string;
  invoice_city?: string;
  invoice_country?: string;

  invoice_sameAsContact?: boolean;

  // Tag-Format (gilt für alle Modi beim "basic"-Produkt)
  tag_format?: TagFormat;

  // Optionen NUR für Haustier–Memora Tag (basic im pet-Modus)
  pet_tag_keychain?: boolean; // +7 CHF (nur bei rund)
  pet_tag_customEnabled?: boolean; // Standard vs. individuell
  pet_tag_custom?: CustomDesign;

  // Optionen für Frame-Produkte (premium, in allen Modi)
  frame_orientation?: "portrait" | "landscape";
  frame_custom?: CustomDesign;
};

// --- Copy (Texte zentral) ---
type UploaderCopy = {
  headings: {
    pageTitleByMode: { human: string; pet: string; surprise: string };
    step1Subtitle: string;
    step2ByMode: { human: string; pet: string; surprise: string };
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    step4Title: string;
    step4Subtitle: string;
    step5Title: string;
    step5Subtitle: string;
    summary: string;
  };
  buttons: {
    back: string;
    next: string;
    reset: string;
    toPay: string;
    addText: string;
    applyDesign: string;
    remove: string;
  };
  products: {
    formatTitle: string;
    roundLabel: string;
    squareLabel: string;
    petOptionsTitle: string;
    keychainLabel: string;
    designLabel: string;
    designStandard: string;
    designCustom: string;
    designCustomNote: string;
    frameTitle: string;
    frameOrientationLabel: string;
    framePortrait: string;
    frameLandscape: string;
    frameTip: string;
  };
  editor: {
    image: string;
    zoom: string;
    posX: string;
    posY: string;
    emptyTitle: string;
    emptySub: string;
    selectedText: string;
    content: string;
    font: string;
    size: string;
    color: string;
    previewLabel: string;
    previewNote: string;
  };
  step2Fields: {
    human_lastName: string;
    human_firstName: string;
    human_deathDate: string;
    human_notesPH: string;
    pet_name: string;
    pet_deathDate: string;
    pet_notesPH: string;
    surprise_name: string;
    surprise_notesPH: string;
  };
  step3Fields: {
    imagesLabel: string;
    videosLabel: string;
    remove: string;
  };
  contactFields: {
    firstName: string;
    lastName: string;
    email: string;
    phoneOpt: string;
  };
  invoiceFields: {
    sameAsContact: string;
    companyOpt: string;
    firstName: string;
    lastName: string;
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  summary: {
    mode: string;
    product: string;
    format: string;
    formatRound: string;
    formatSquare: string;
    options: string;
    person: string;
    pet: string;
    recipient: string;
    notes: string;
    counts: (imgs: number, vids: number) => string;
    previewTitle: string;
  };
};

// Fallbacks (werden mit Content gemerged)
const DEFAULT_COPY: UploaderCopy = {
  headings: {
    pageTitleByMode: {
      human: "Produkt wählen (Menschen)",
      pet: "Produkt wählen (Haustiere)",
      surprise: "Produkt wählen (Surprise)",
    },
    step1Subtitle: "Wähle dein Produkt – die Inhalte lädst du im nächsten Schritt hoch.",
    step2ByMode: {
      human: "Angaben zur Person",
      pet: "Angaben zum Haustier",
      surprise: "Angaben für Surprise",
    },
    step2Subtitle: "Bitte die folgenden Felder ausfüllen. Notizen sind optional.",
    step3Title: "Bilder & Videos hochladen",
    step3Subtitle:
      "Dateien werden im Formular gespeichert und später mitgesendet (nicht im LocalStorage).",
    step4Title: "Kontaktangaben",
    step4Subtitle:
      "Diese Daten verwenden wir für Rückfragen und die Auftragsbestätigung.",
    step5Title: "Rechnungsangaben & Übersicht",
    step5Subtitle:
      "Bitte prüfe die Adresse und die Zusammenfassung. Mit „Weiter zur Zahlung“ geht es später in den Checkout.",
    summary: "Zusammenfassung",
  },
  buttons: {
    back: "Zurück",
    next: "Weiter",
    reset: "Zurücksetzen",
    toPay: "Weiter zur Zahlung",
    addText: "Text hinzufügen",
    applyDesign: "Design übernehmen",
    remove: "Entfernen",
  },
  products: {
    formatTitle: "Format",
    roundLabel: "Rund · Ø 3 cm",
    squareLabel: "Quadratisch · 6×6 cm",
    petOptionsTitle: "Optionen für Haustier–Memora Tag",
    keychainLabel: "mit Schlüsselanhänger (+7 CHF)",
    designLabel: "Design",
    designStandard: "Standard",
    designCustom: "Individuell gestaltbar",
    designCustomNote: "Hinweis: Individuelles Design kostet +10 CHF.",
    frameTitle: "Frame gestalten",
    frameOrientationLabel: "Ausrichtung",
    framePortrait: "Hochformat",
    frameLandscape: "Querformat",
    frameTip:
      "Tipp: Bild mit der Maus/Touch verschieben, mit dem Mausrad/Pinch zoomen, Texte hinzufügen & frei positionieren.",
  },
  editor: {
    image: "Bild",
    zoom: "Zoom",
    posX: "Horizontale Position",
    posY: "Vertikale Position",
    emptyTitle: "Kein Bild ausgewählt",
    emptySub: "Bitte oben ein Bild wählen",
    selectedText: "Ausgewählter Text",
    content: "Inhalt",
    font: "Schriftart",
    size: "Grösse",
    color: "Farbe",
    previewLabel: "Übernommene Vorschau",
    previewNote: "Diese Vorschau wird mit der Bestellung gespeichert.",
  },
  step2Fields: {
    human_lastName: "Nachname *",
    human_firstName: "Vorname *",
    human_deathDate: "Sterbedatum *",
    human_notesPH: "Besondere Wünsche, Zitate, Musik-Hinweise …",
    pet_name: "Name des Haustiers *",
    pet_deathDate: "Sterbedatum *",
    pet_notesPH: "Besondere Wünsche, Lieblingsgeräusche, Hinweise …",
    surprise_name: "Name (Empfänger) *",
    surprise_notesPH: "Hochzeit, Geburtstag, Jubiläum … besondere Wünsche",
  },
  step3Fields: {
    imagesLabel: "Bilder (mehrfach möglich)",
    videosLabel: "Videos (mehrfach möglich)",
    remove: "Entfernen",
  },
  contactFields: {
    firstName: "Vorname *",
    lastName: "Nachname *",
    email: "E-Mail *",
    phoneOpt: "Telefon (optional)",
  },
  invoiceFields: {
    sameAsContact: "Rechnungsadresse gleich Kontaktadresse",
    companyOpt: "Firma (optional)",
    firstName: "Vorname *",
    lastName: "Nachname *",
    street: "Strasse & Nr. *",
    zip: "PLZ *",
    city: "Ort *",
    country: "Land *",
  },
  summary: {
    mode: "Modus",
    product: "Produkt",
    format: "Format",
    formatRound: "Rund Ø 3 cm",
    formatSquare: "Quadratisch 6×6 cm",
    options: "Optionen",
    person: "Person",
    pet: "Haustier",
    recipient: "Empfänger",
    notes: "Notizen",
    counts: (imgs, vids) => `Bilder: ${imgs} • Videos: ${vids}`,
    previewTitle: "Individuelle Vorschau",
  },
};
// ---- Deep-Merge Helper (direkt unter DEFAULT_COPY einfügen) ----
function mergeCopy<T>(base: T, patch?: Partial<T>): T {
  if (!patch) return base;
  const out: any = Array.isArray(base) ? [...(base as any)] : { ...(base as any) };
  for (const key in patch) {
    const pv = (patch as any)[key];
    if (pv === undefined) continue;
    const bv = (out as any)[key];
    if (pv && typeof pv === "object" && !Array.isArray(pv)) {
      (out as any)[key] = mergeCopy(
        (bv && typeof bv === "object" && !Array.isArray(bv)) ? bv : {},
        pv
      );
    } else {
      (out as any)[key] = pv;
    }
  }
  return out as T;
}


// --- LocalStorage Helpers ---
const STORAGE_KEY = "memora:memoryUploader:v1";
type PersistedForm = Omit<FormState, "images" | "videos">;

function loadPersisted():
  | { step?: number; form?: PersistedForm }
  | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persist(step: number, form: FormState) {
  try {
    if (typeof window === "undefined") return;
    const { images, videos, ...rest } = form;
    const payload = { step, form: rest as PersistedForm };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {}
}

function clearPersisted() {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

/* ==================== Design Editor (parametrisierbar) ==================== */
function DesignEditor({
  value,
  onChange,
  shape = "circle",
  width = 420,
  height = 420,
  cornerRadius = 24,
  copy,
  buttons,
}: {
  value: CustomDesign | undefined;
  onChange: (v: CustomDesign) => void;
  shape?: "circle" | "roundedRect";
  width?: number;
  height?: number;
  cornerRadius?: number;
  copy: UploaderCopy["editor"];
  buttons: UploaderCopy["buttons"];
}) {
  const W = width;
  const H = height;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [local, setLocal] = useState<CustomDesign>(() => ({
    scale: value?.scale ?? 1,
    offsetX: value?.offsetX ?? 0,
    offsetY: value?.offsetY ?? 0,
    bgImageUrl: value?.bgImageUrl,
    texts: value?.texts ?? [],
    previewDataUrl: value?.previewDataUrl,
  }));
  const [dragImg, setDragImg] = useState<{ x: number; y: number } | null>(null);
  const [activeTextId, setActiveTextId] = useState<string | null>(null);
  const [dragText, setDragText] = useState<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  // Globales Dragging für Text
  useEffect(() => {
    const handleMove = (e: PointerEvent | MouseEvent) => {
      if (!dragText) return;
      const rect = overlayRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = (e.clientX - dragText.startX) / rect.width;
      const dy = (e.clientY - dragText.startY) / rect.height;
      const nx = Math.min(0.98, Math.max(0.02, dragText.origX + dx));
      const ny = Math.min(0.98, Math.max(0.02, dragText.origY + dy));
      setLocal((s) => ({
        ...s,
        texts: s.texts.map((t) => (t.id === dragText.id ? { ...t, x: nx, y: ny } : t)),
      }));
    };

    const handleUp = () => setDragText(null);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [dragText]);

  // --- Interaktion: Zoom & Pan ---
  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 3;

  const zoomAt = (clientX: number, clientY: number, scaleFactor: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) {
      setLocal((s) => ({ ...s, scale: Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s.scale * scaleFactor)) }));
      return;
    }
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    setLocal((s) => {
      const oldScale = s.scale;
      const newScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, oldScale * scaleFactor));
      const k = newScale / oldScale - 1;
      return {
        ...s,
        scale: newScale,
        offsetX: s.offsetX - (cx - W / 2) * k,
        offsetY: s.offsetY - (cy - H / 2) * k,
      };
    });
  };

  const onWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
    zoomAt(e.clientX, e.clientY, factor);
  };

  // Pointer/Touch: Pan + Pinch
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinch = useRef<{ dist: number; midX: number; midY: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      setDragImg({ x: e.clientX, y: e.clientY });
    } else if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const dx = a.x - b.x,
        dy = a.y - b.y;
      lastPinch.current = { dist: Math.hypot(dx, dy), midX: (a.x + b.x) / 2, midY: (a.y + b.y) / 2 };
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1 && dragImg) {
      const p = pointers.current.get(e.pointerId)!;
      const dx = p.x - dragImg.x;
      const dy = p.y - dragImg.y;
      setDragImg({ x: p.x, y: p.y });
      setLocal((s) => ({ ...s, offsetX: s.offsetX + dx, offsetY: s.offsetY + dy }));
    } else if (pointers.current.size === 2 && lastPinch.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dx = a.x - b.x,
        dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      const factor = dist / lastPinch.current.dist;
      zoomAt(lastPinch.current.midX, lastPinch.current.midY, factor);
      const midX = (a.x + b.x) / 2,
        midY = (a.y + b.y) / 2;
      lastPinch.current = { dist, midX, midY };
    }
  };

  const onPointerUpOrCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointers.current.delete(e.pointerId);
    setDragImg(null);
    if (pointers.current.size < 2) lastPinch.current = null;
  };

  useEffect(() => {
    onChange(local);
  }, [local, onChange]);

  // Bild laden
  useEffect(() => {
    if (!local.bgImageUrl) {
      imgRef.current = null;
      draw(false);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      draw(false);
    };
    img.src = local.bgImageUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local.bgImageUrl]);

  // neu zeichnen
  useEffect(() => {
    draw(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local.scale, local.offsetX, local.offsetY, local.texts]);

  // Clip-Path
  const applyClip = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    if (shape === "circle") {
      const r = Math.min(W, H) / 2 - 2;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
      ctx.clip();
    } else {
      const r = cornerRadius;
      ctx.beginPath();
      roundedRectPath(ctx, 1, 1, W - 2, H - 2, r);
      ctx.clip();
    }
  };

  function roundedRectPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  // Zeichnen
  const draw = (renderTexts: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);
    applyClip(ctx);

    if (imgRef.current) {
      const img = imgRef.current;
      const scaledW = img.width * local.scale;
      const scaledH = img.height * local.scale;
      const x = -scaledW / 2 + W / 2 + local.offsetX;
      const y = -scaledH / 2 + H / 2 + local.offsetY;
      ctx.drawImage(img, x, y, scaledW, scaledH);
    } else {
      ctx.fillStyle = "rgba(148, 163, 184, 0.15)";
      ctx.fillRect(0, 0, W, H);
    }

    if (renderTexts) {
      for (const t of local.texts) {
        ctx.fillStyle = t.color || "#ffffff";
        ctx.font = `${t.fontSize || 24}px ${t.fontFamily || "system-ui, Arial"}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const tx = t.x * W;
        const ty = t.y * H;
        wrapText(ctx, t.text || "", tx, ty, W * 0.9, t.fontSize || 24);
      }
    }

    ctx.restore();
  };

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (ctx.measureText(test).width < maxWidth) cur = test;
      else {
        lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((ln, i) => ctx.fillText(ln, x, startY + i * lineHeight));
  }

  const onUpload = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const url = URL.createObjectURL(files[0]);
    setLocal((s) => ({ ...s, bgImageUrl: url }));
  };

  // Texte
  const addText = () => {
    const id = crypto.randomUUID();
    const t: EditorText = {
      id,
      text: "Text",
      x: 0.5,
      y: 0.5,
      fontFamily: "system-ui, Arial",
      fontSize: 28,
      color: "#ffffff",
    };
    setLocal((s) => ({ ...s, texts: [...s.texts, t] }));
    setActiveTextId(id);
  };
  const selectText = (id: string) => setActiveTextId(id);
  const updateActiveText = (patch: Partial<EditorText>) => {
    setLocal((s) => ({
      ...s,
      texts: s.texts.map((t) => (t.id === activeTextId ? { ...t, ...patch } : t)),
    }));
  };
  const removeActiveText = () => {
    if (!activeTextId) return;
    setLocal((s) => ({ ...s, texts: s.texts.filter((t) => t.id !== activeTextId) }));
    setActiveTextId(null);
  };

  const onMouseDownText = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = local.texts.find((x) => x.id === id)!;
    setDragText({
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: t.x,
      origY: t.y,
    });
    setActiveTextId(id);
  };

  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draw(true);
    const png = canvas.toDataURL("image/png", 1.0);
    draw(false);
    setLocal((s) => ({ ...s, previewDataUrl: png }));
  };

  const activeText = local.texts.find((t) => t.id === activeTextId) || null;

  const containerClass =
    shape === "circle" ? "rounded-full overflow-hidden" : "rounded-xl overflow-hidden";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative">
          {(() => {
            const isEmpty = !local.bgImageUrl;
            const wrapperClasses =
              `${containerClass} relative shadow-sm ` +
              (isEmpty
                ? "bg-muted/20 border-2 border-dashed border-muted-foreground/30"
                : "bg-transparent border border-border");

            return (
              <div className={wrapperClasses} style={{ width: W, height: H }}>
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUpOrCancel}
                  onPointerCancel={onPointerUpOrCancel}
                  onWheel={onWheel}
                  className="w-full h-full touch-none"
                  style={{ touchAction: "none", cursor: dragImg ? "grabbing" : "grab" }}
                />

                {isEmpty && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <div className="text-center text-muted-foreground">
                      <div className="text-sm font-medium mb-1">{copy.emptyTitle}</div>
                      <div className="text-xs opacity-80">{copy.emptySub}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Text Overlay */}
          <div ref={overlayRef} className="absolute inset-0 pointer-events-none">
            {local.texts.map((t) => (
              <div
                key={t.id}
                onMouseDown={(e) => onMouseDownText(e as any, t.id)}
                onClick={() => selectText(t.id)}
                className="absolute cursor-move select-none hover:ring-2 hover:ring-primary/40 hover:rounded pointer-events-auto"
                style={{
                  left: t.x * W - 2,
                  top: t.y * H - t.fontSize / 2 - 2,
                  transform: "translate(-50%, 0)",
                  padding: "2px 4px",
                }}
              >
                <span
                  style={{
                    fontFamily: t.fontFamily,
                    fontSize: t.fontSize,
                    color: t.color,
                  }}
                >
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label>{copy.image}</Label>
            <Input type="file" accept="image/*" onChange={(e) => onUpload(e.target.files)} />
          </div>

          <div className="space-y-2">
            <Label>{copy.zoom}</Label>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.01}
              value={local.scale}
              onChange={(e) => setLocal((s) => ({ ...s, scale: Number(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>{copy.posX}</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocal((s) => ({ ...s, offsetX: s.offsetX - 10 }))}
              >
                ←
              </Button>
              <input
                type="range"
                min={-Math.max(W, H) / 2}
                max={Math.max(W, H) / 2}
                step={1}
                value={local.offsetX}
                onChange={(e) => setLocal((s) => ({ ...s, offsetX: Number(e.target.value) }))}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocal((s) => ({ ...s, offsetX: s.offsetX + 10 }))}
              >
                →
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{copy.posY}</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocal((s) => ({ ...s, offsetY: s.offsetY - 10 }))}
              >
                ↑
              </Button>
              <input
                type="range"
                min={-Math.max(W, H) / 2}
                max={Math.max(W, H) / 2}
                step={1}
                value={local.offsetY}
                onChange={(e) => setLocal((s) => ({ ...s, offsetY: Number(e.target.value) }))}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocal((s) => ({ ...s, offsetY: s.offsetY + 10 }))}
              >
                ↓
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={addText} type="button">
              {buttons.addText}
            </Button>
            <Button onClick={exportPng} type="button" variant="secondary">
              {buttons.applyDesign}
            </Button>
          </div>

          {/* Text-Eigenschaften */}
          {activeText && (
            <div className="space-y-3 border rounded-md p-3">
              <div className="flex justify-between items-center">
                <Label className="font-semibold">{copy.selectedText}</Label>
                <Button size="sm" variant="outline" onClick={removeActiveText}>
                  {buttons.remove}
                </Button>
              </div>
              <div className="space-y-2">
                <Label>{copy.content}</Label>
                <Input
                  value={activeText.text}
                  onChange={(e) => updateActiveText({ text: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{copy.font}</Label>
                  <select
                    className="w-full border rounded-md h-10 px-2 bg-background"
                    value={activeText.fontFamily}
                    onChange={(e) => updateActiveText({ fontFamily: e.target.value })}
                  >
                    <option value="system-ui, Arial">System / Arial</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Times New Roman, serif">Times</option>
                    <option value="Trebuchet MS, sans-serif">Trebuchet</option>
                    <option value="Courier New, monospace">Courier</option>
                  </select>
                </div>
                <div>
                  <Label>{copy.size}</Label>
                  <Input
                    type="number"
                    min={10}
                    max={96}
                    value={activeText.fontSize}
                    onChange={(e) => updateActiveText({ fontSize: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label>{copy.color}</Label>
                <input
                  type="color"
                  value={activeText.color}
                  onChange={(e) => updateActiveText({ color: e.target.value })}
                />
              </div>
            </div>
          )}

          {local.previewDataUrl && (
            <div className="space-y-2">
              <Label>{copy.previewLabel}</Label>
              <img
                src={local.previewDataUrl}
                alt="Vorschau"
                className={`border w-48 h-auto ${shape === "circle" ? "rounded-full" : "rounded-xl"}`}
              />
              <p className="text-xs text-muted-foreground">{copy.previewNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Step 1 (Produktwahl + Optionen) -------------------- */
function Step1View(props: {
  mode: Mode;
  productMap: Record<
    ProductKey,
    { title: string; desc: string; price: string; images: { src: string; alt: string }[]; features: string[] }
  >;
  selected: ProductKey | null;
  setSelected: (k: ProductKey) => void;
  onNext: () => void;

  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  copy: UploaderCopy;
}) {
  const { mode, productMap, selected, setSelected, onNext, form, setForm, copy } = props;

  const showPetTagOptions = mode === "pet" && selected === "basic";
  const showFrameOptions = selected === "premium";
  const showTagFormat = selected === "basic";
  const isRound = (form.tag_format ?? "round_3cm") === "round_3cm";

  const pageTitle =
    mode === "pet"
      ? copy.headings.pageTitleByMode.pet
      : mode === "surprise"
      ? copy.headings.pageTitleByMode.surprise
      : copy.headings.pageTitleByMode.human;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{pageTitle}</h2>
      <p className="text-muted-foreground mb-8">{copy.headings.step1Subtitle}</p>

      <div className="grid gap-6 md:grid-cols-3">
        {productKeyOrder.map((key) => {
          const p = productMap[key];
          const active = selected === key;
          return (
            <Card
              key={key}
              onClick={() => setSelected(key)}
              className={`h-full border-2 cursor-pointer transition-all ${
                active ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40"
              }`}
            >
              <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                <Carousel className="w-full">
                  <CarouselContent>
                    {(p.images ?? []).map((img, idx) => (
                      <CarouselItem key={idx}>
                        <img src={img.src} alt={img.alt} className="w-full h-56 md:h-64 object-cover" loading="lazy" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl md:text-2xl font-serif mb-2 text-center">{p.title}</h3>
                <ul className="space-y-2 mb-4 text-muted-foreground">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-center text-muted-foreground">{p.desc}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-2xl md:text-3xl font-bold">{p.price}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Format-Auswahl für alle Modi beim "basic"-Produkt */}
      {showTagFormat && (
        <div className="mt-8 border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-serif">{copy.products.formatTitle}</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant={isRound ? "default" : "outline"}
              onClick={() => setForm((s) => ({ ...s, tag_format: "round_3cm", pet_tag_keychain: s.pet_tag_keychain }))}
            >
              {copy.products.roundLabel}
            </Button>
            <Button
              type="button"
              variant={!isRound ? "default" : "outline"}
              onClick={() => setForm((s) => ({ ...s, tag_format: "square_6cm", pet_tag_keychain: false }))}
            >
              {copy.products.squareLabel}
            </Button>
          </div>
        </div>
      )}

      {/* Optionen nur für Haustier–Tag */}
      {showPetTagOptions && (
        <div className="mt-8 border rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-serif">{copy.products.petOptionsTitle}</h3>

          {(form.tag_format ?? "round_3cm") === "round_3cm" && (
            <div className="flex items-center gap-3">
              <Checkbox
                id="keychain"
                checked={!!form.pet_tag_keychain}
                onCheckedChange={(v) => setForm((s) => ({ ...s, pet_tag_keychain: !!v }))}
              />
              <Label htmlFor="keychain">{copy.products.keychainLabel}</Label>
            </div>
          )}

          <div className="space-y-3">
            <Label>{copy.products.designLabel}</Label>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant={form.pet_tag_customEnabled ? "outline" : "default"}
                onClick={() => setForm((s) => ({ ...s, pet_tag_customEnabled: false }))}
              >
                {copy.products.designStandard}
              </Button>
              <Button
                type="button"
                variant={form.pet_tag_customEnabled ? "default" : "outline"}
                onClick={() => setForm((s) => ({ ...s, pet_tag_customEnabled: true }))}
              >
                {copy.products.designCustom}
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{copy.products.designCustomNote}</p>

          {form.pet_tag_customEnabled && (
            <div className="pt-4">
              {(form.tag_format ?? "round_3cm") === "round_3cm" ? (
                <DesignEditor
                  shape="circle"
                  width={420}
                  height={420}
                  value={form.pet_tag_custom}
                  onChange={(v) => setForm((s) => ({ ...s, pet_tag_custom: v }))}
                  copy={copy.editor}
                  buttons={copy.buttons}
                />
              ) : (
                <DesignEditor
                  shape="roundedRect"
                  width={420}
                  height={420}
                  cornerRadius={20}
                  value={form.pet_tag_custom}
                  onChange={(v) => setForm((s) => ({ ...s, pet_tag_custom: v }))}
                  copy={copy.editor}
                  buttons={copy.buttons}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Frame-Design */}
      {showFrameOptions && (
        <div className="mt-8 border rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-serif">{copy.products.frameTitle}</h3>

          <div className="space-y-2">
            <Label>{copy.products.frameOrientationLabel}</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={(form.frame_orientation ?? "landscape") === "portrait" ? "default" : "outline"}
                onClick={() => setForm((s) => ({ ...s, frame_orientation: "portrait" }))}
              >
                {copy.products.framePortrait}
              </Button>
              <Button
                type="button"
                variant={(form.frame_orientation ?? "landscape") === "landscape" ? "default" : "outline"}
                onClick={() => setForm((s) => ({ ...s, frame_orientation: "landscape" }))}
              >
                {copy.products.frameLandscape}
              </Button>
            </div>
          </div>

          <div className="pt-2">
            {(() => {
              const isPortrait = (form.frame_orientation ?? "landscape") === "portrait";
              const W = isPortrait ? 360 : 520;
              const H = isPortrait ? 520 : 360;
              return (
                <DesignEditor
                  shape="roundedRect"
                  width={W}
                  height={H}
                  cornerRadius={24}
                  value={form.frame_custom}
                  onChange={(v) => setForm((s) => ({ ...s, frame_custom: v }))}
                  copy={copy.editor}
                  buttons={copy.buttons}
                />
              );
            })()}
          </div>

          <p className="text-sm text-muted-foreground">{copy.products.frameTip}</p>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-3">
        <Button size="lg" disabled={!selected} onClick={onNext}>
          {copy.buttons.next} {selected ? `– ${productMap[selected].title}` : ""}
        </Button>
      </div>
    </div>
  );
}

/* -------------------- Step 2 (Modusabhängige Angaben) -------------------- */
function Step2View(props: {
  mode: Mode;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onBack: () => void;
  onNext: () => void;
  copy: UploaderCopy;
}) {
  const { mode, form, setForm, onBack, onNext, copy } = props;

  const humanInvalid = mode === "human" && (!form.human_lastName || !form.human_firstName);
  const petInvalid   = mode === "pet"   && (!form.pet_name);
  const surpriseInvalid = mode === "surprise" && !form.surprise_name;

  const title =
    mode === "pet"
      ? copy.headings.step2ByMode.pet
      : mode === "surprise"
      ? copy.headings.step2ByMode.surprise
      : copy.headings.step2ByMode.human;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{title}</h2>
      <p className="text-muted-foreground mb-8">{copy.headings.step2Subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mode === "human" && (
          <>
            <div>
              <Label htmlFor="human_lastName">{copy.step2Fields.human_lastName}</Label>
              <Input
                id="human_lastName"
                value={form.human_lastName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, human_lastName: e.target.value }))}
                placeholder="Mustermann"
                required
              />
            </div>
            <div>
              <Label htmlFor="human_firstName">{copy.step2Fields.human_firstName}</Label>
              <Input
                id="human_firstName"
                value={form.human_firstName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, human_firstName: e.target.value }))}
                placeholder="Max"
                required
              />
            </div>
            <div>
              <Label htmlFor="human_deathDate">{copy.step2Fields.human_deathDate}</Label>
              <Input
                id="human_deathDate"
                type="date"
                value={form.human_deathDate ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, human_deathDate: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes_human">Weitere Notizen</Label>
              <Textarea
                id="notes_human"
                rows={4}
                placeholder={copy.step2Fields.human_notesPH}
                value={form.notes ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
              />
            </div>
          </>
        )}

        {mode === "pet" && (
          <>
            <div>
              <Label htmlFor="pet_name">{copy.step2Fields.pet_name}</Label>
              <Input
                id="pet_name"
                value={form.pet_name ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, pet_name: e.target.value }))}
                placeholder="Bello"
                required
              />
            </div>
            <div>
              <Label htmlFor="pet_deathDate">{copy.step2Fields.pet_deathDate}</Label>
              <Input
                id="pet_deathDate"
                type="date"
                value={form.pet_deathDate ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, pet_deathDate: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes_pet">Weitere Notizen</Label>
              <Textarea
                id="notes_pet"
                rows={4}
                placeholder={copy.step2Fields.pet_notesPH}
                value={form.notes ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
              />
            </div>
          </>
        )}

        {mode === "surprise" && (
          <>
            <div>
              <Label htmlFor="surprise_name">{copy.step2Fields.surprise_name}</Label>
              <Input
                id="surprise_name"
                value={form.surprise_name ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, surprise_name: e.target.value }))}
                placeholder="z. B. Lisa & Jan"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes_surprise">Anlass / Notizen</Label>
              <Textarea
                id="notes_surprise"
                rows={4}
                placeholder={copy.step2Fields.surprise_notesPH}
                value={form.notes ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          {copy.buttons.back}
        </Button>
        <Button onClick={onNext} disabled={humanInvalid || petInvalid || surpriseInvalid}>
          {copy.buttons.next}
        </Button>
      </div>
    </div>
  );
}

/* -------------------- Step 3 (Uploads) -------------------- */
function Step3View(props: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onBack: () => void;
  onNext: () => void;
  copy: UploaderCopy;
}) {
  const { form, setForm, onBack, onNext, copy } = props;

  const addImages = (files: FileList | null) => {
    if (files) setForm((s) => ({ ...s, images: [...s.images, ...Array.from(files)] }));
  };
  const addVideos = (files: FileList | null) => {
    if (files) setForm((s) => ({ ...s, videos: [...s.videos, ...Array.from(files)] }));
  };
  const removeImage = (i: number) => setForm((s) => ({ ...s, images: s.images.filter((_, idx) => idx !== i) }));
  const removeVideo = (i: number) => setForm((s) => ({ ...s, videos: s.videos.filter((_, idx) => idx !== i) }));

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{copy.headings.step3Title}</h2>
      <p className="text-muted-foreground mb-8">{copy.headings.step3Subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bilder */}
        <div>
          <Label htmlFor="images">{copy.step3Fields.imagesLabel}</Label>
          <Input id="images" type="file" accept="image/*" multiple onChange={(e) => addImages(e.target.files)} />
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {form.images.map((f, idx) => {
                const url = URL.createObjectURL(f);
                return (
                  <div key={idx} className="relative">
                    <img src={url} alt={f.name} className="w-full h-32 object-cover rounded-md border" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(idx)}
                    >
                      {copy.step3Fields.remove}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Videos */}
        <div>
          <Label htmlFor="videos">{copy.step3Fields.videosLabel}</Label>
          <Input id="videos" type="file" accept="video/*" multiple onChange={(e) => addVideos(e.target.files)} />
          {form.videos.length > 0 && (
            <div className="space-y-3 mt-4">
              {form.videos.map((f, idx) => {
                const url = URL.createObjectURL(f);
                return (
                  <div key={idx} className="relative border rounded-md p-2">
                    <video src={url} className="w-full rounded" controls />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground truncate">{f.name}</span>
                      <Button size="sm" variant="outline" onClick={() => removeVideo(idx)}>
                        {copy.step3Fields.remove}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          {copy.buttons.back}
        </Button>
        <Button onClick={onNext} disabled={form.images.length === 0 && form.videos.length === 0}>
          {copy.buttons.next}
        </Button>
      </div>
    </div>
  );
}

/* -------------------- Step 4 (Kontakt) -------------------- */
function Step4ContactView(props: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onBack: () => void;
  onNext: () => void;
  copy: UploaderCopy;
}) {
  const { form, setForm, onBack, onNext, copy } = props;
  const invalid = !form.contact_firstName || !form.contact_lastName || !form.contact_email;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{copy.headings.step4Title}</h2>
      <p className="text-muted-foreground mb-8">{copy.headings.step4Subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact_firstName">{copy.contactFields.firstName}</Label>
          <Input
            id="contact_firstName"
            value={form.contact_firstName ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, contact_firstName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="contact_lastName">{copy.contactFields.lastName}</Label>
          <Input
            id="contact_lastName"
            value={form.contact_lastName ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, contact_lastName: e.target.value }))}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="contact_email">{copy.contactFields.email}</Label>
          <Input
            id="contact_email"
            type="email"
            value={form.contact_email ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, contact_email: e.target.value }))}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="contact_phone">{copy.contactFields.phoneOpt}</Label>
          <Input
            id="contact_phone"
            value={form.contact_phone ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, contact_phone: e.target.value }))}
            placeholder="+41 ..."
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          {copy.buttons.back}
        </Button>
        <Button onClick={onNext} disabled={invalid}>
          {copy.buttons.next}
        </Button>
      </div>
    </div>
  );
}

/* -------------------- Step 5 (Rechnung & Zahlung) -------------------- */
function Step5InvoiceAndPayView(props: {
  mode: Mode;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  productLabel: string;
  onBack: () => void;
  onPlaceOrder: () => void;
  onReset: () => void;
  copy: UploaderCopy;
  defaultTagImage?: string;
}) {
  const { mode, form, setForm, productLabel, onBack, onPlaceOrder, onReset, copy, defaultTagImage } = props;

  const toggleSame = (checked: boolean) => {
    setForm((s) => ({
      ...s,
      invoice_sameAsContact: checked,
      invoice_firstName: checked ? s.contact_firstName : s.invoice_firstName,
      invoice_lastName: checked ? s.contact_lastName : s.invoice_lastName,
    }));
  };

  const invalid =
    !form.invoice_firstName ||
    !form.invoice_lastName ||
    !form.invoice_street ||
    !form.invoice_zip ||
    !form.invoice_city ||
    !form.invoice_country;

  const options: string[] = [];
  if ((form.tag_format ?? "round_3cm") === "round_3cm" && form.pet_tag_keychain) {
    options.push(copy.products.keychainLabel);
  }
  if (form.pet_tag_customEnabled) options.push(copy.products.designCustom + " (+10 CHF)");
  if (form.product === "premium" && form.frame_orientation) {
    options.push(
      `Frame-Ausrichtung: ${
        form.frame_orientation === "portrait"
          ? copy.products.framePortrait
          : copy.products.frameLandscape
      }`
    );
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{copy.headings.step5Title}</h2>
      <p className="text-muted-foreground mb-8">{copy.headings.step5Subtitle}</p>

      <div className="space-y-10">
        {/* Rechnungsadresse */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Checkbox id="same" checked={!!form.invoice_sameAsContact} onCheckedChange={(v) => toggleSame(!!v)} />
            <Label htmlFor="same">{copy.invoiceFields.sameAsContact}</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="invoice_company">{copy.invoiceFields.companyOpt}</Label>
              <Input
                id="invoice_company"
                value={form.invoice_company ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_company: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="invoice_firstName">{copy.invoiceFields.firstName}</Label>
              <Input
                id="invoice_firstName"
                value={form.invoice_firstName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="invoice_lastName">{copy.invoiceFields.lastName}</Label>
              <Input
                id="invoice_lastName"
                value={form.invoice_lastName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_lastName: e.target.value }))}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="invoice_street">{copy.invoiceFields.street}</Label>
              <Input
                id="invoice_street"
                value={form.invoice_street ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_street: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="invoice_zip">{copy.invoiceFields.zip}</Label>
              <Input
                id="invoice_zip"
                value={form.invoice_zip ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_zip: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="invoice_city">{copy.invoiceFields.city}</Label>
              <Input
                id="invoice_city"
                value={form.invoice_city ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_city: e.target.value }))}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="invoice_country">{copy.invoiceFields.country}</Label>
              <Input
                id="invoice_country"
                value={form.invoice_country ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_country: e.target.value }))}
                placeholder="Schweiz"
                required
              />
            </div>
          </div>
        </div>

        {/* Zusammenfassung */}
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-serif mb-4">{copy.headings.summary}</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>{copy.summary.mode}:</strong>{" "}
              {mode === "pet" ? "Haustiere" : mode === "surprise" ? "Surprise" : "Menschen"}
            </li>
            <li>
              <strong>{copy.summary.product}:</strong> {productLabel || "-"}
            </li>

            {form.product === "basic" && (
              <li>
                <strong>{copy.summary.format}:</strong>{" "}
                {(form.tag_format ?? "round_3cm") === "square_6cm"
                  ? copy.summary.formatSquare
                  : copy.summary.formatRound}
              </li>
            )}

            {options.length > 0 && (
              <li>
                <strong>{copy.summary.options}:</strong> {options.join(", ")}
              </li>
            )}

            {/* Vorschau: Tag (basic) oder Frame (premium) */}
            {(() => {
              // Tag (basic):
              if (form.product === "basic") {
                // Nur im PET-Modus gibt es die individuelle Tag-Gestaltung
                const customActive =
                  mode === "pet" &&
                  !!form.pet_tag_customEnabled &&
                  !!form.pet_tag_custom?.previewDataUrl;

                const tagImg = customActive
                  ? form.pet_tag_custom!.previewDataUrl!
                  : defaultTagImage; // <- fällt auf Standardbild zurück

                if (tagImg) {
                  const isRound = (form.tag_format ?? "round_3cm") === "round_3cm";
                  return (
                    <li className="mt-2">
                      <strong>{copy.summary.previewTitle}:</strong>
                      <div className="mt-2 flex items-center gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              type="button"
                              aria-label="Tag-Vorschau vergrössern"
                              className="focus:outline-none"
                            >
                              <img
                                src={tagImg}
                                alt={customActive ? "Individuelle Tag-Vorschau" : "Standard Tag-Vorschau"}
                                className={`border ${isRound ? "w-20 h-20 rounded-full" : "w-24 h-24 rounded-xl"} object-cover hover:opacity-90 transition`}
                              />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[720px]">
                            <div className="w-full flex items-center justify-center">
                              <img
                                src={tagImg}
                                alt={customActive ? "Individuelle Tag-Vorschau (gross)" : "Standard Tag-Vorschau (gross)"}
                                className={`${isRound ? "rounded-full" : "rounded-xl"} w-full h-auto max-h-[80vh] object-contain`}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>

                      </div>
                    </li>
                  );
                }
                return null;
              }

              // Frame (premium):
              if (form.product === "premium" && form.frame_custom?.previewDataUrl) {
                return (
                  <li className="mt-2">
                    <strong>{copy.summary.previewTitle}:</strong>
                    <div className="mt-2 flex items-center gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            aria-label="Frame-Vorschau vergrössern"
                            className="focus:outline-none"
                          >
                            <img
                              src={form.frame_custom.previewDataUrl}
                              alt="Frame Vorschau"
                              className="w-28 h-auto rounded-xl border hover:opacity-90 transition"
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[900px]">
                          <div className="w-full flex items-center justify-center">
                            <img
                              src={form.frame_custom.previewDataUrl}
                              alt="Frame Vorschau (gross)"
                              className="rounded-xl w-full h-auto max-h-[85vh] object-contain"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </li>
                );
              }

              return null;
            })()}


            {mode === "human" && (
              <li>
                <strong>{copy.summary.person}:</strong> {form.human_firstName} {form.human_lastName}{" "}
                {form.human_deathDate ? `(${form.human_deathDate})` : ""}
              </li>
            )}
            {mode === "pet" && (
              <li>
                <strong>{copy.summary.pet}:</strong> {form.pet_name}{" "}
                {form.pet_deathDate ? `(${form.pet_deathDate})` : ""}
              </li>
            )}
            {mode === "surprise" && (
              <li>
                <strong>{copy.summary.recipient}:</strong> {form.surprise_name}
              </li>
            )}
            {form.notes && (
              <li>
                <strong>{copy.summary.notes}:</strong> {form.notes}
              </li>
            )}
            <li>{copy.summary.counts(form.images.length, form.videos.length)}</li>
          </ul>
        </div>

        <div className="mt-2 flex flex-wrap justify-between gap-3">
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              {copy.buttons.back}
            </Button>
            <Button variant="ghost" onClick={onReset}>
              {copy.buttons.reset}
            </Button>
          </div>
          <Button onClick={onPlaceOrder} disabled={invalid}>
            {copy.buttons.toPay}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Parent: MemoryUploader -------------------- */
const MemoryUploader = () => {
  // ⬇️ getUploaderCopy zusätzlich aus dem Context holen
  const { mode, modeContent, getUploaderCopy } = useContent();
  const media = useMemo(() => getMediaForMode(mode as Mode), [mode]);
  const products = modeContent.products;

  // ⬇️ Copy aus Content (modeContent.uploaderCopy) + Fallbacks (DEFAULT_COPY) mergen
  //    Kein mergeCopy mehr nötig – zentral über den Context-Helper:
  const COPY: UploaderCopy = getUploaderCopy<UploaderCopy>(DEFAULT_COPY);

  // Persisted Defaults laden
  const persistedInit = loadPersisted();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(
    ([1, 2, 3, 4, 5] as number[]).includes(persistedInit?.step ?? 0)
      ? (persistedInit!.step as 1 | 2 | 3 | 4 | 5)
      : 1
  );

  const [form, setForm] = useState<FormState>({
    images: [],
    videos: [],
    invoice_sameAsContact: true,
    tag_format: "round_3cm",
    ...(persistedInit?.form ?? {}),
  });

  const [selected, setSelected] = useState<ProductKey | null>(
    (persistedInit?.form?.product ?? null) as ProductKey | null
  );

  // Auto-Persist (debounced)
  useEffect(() => {
    const t = setTimeout(() => persist(step, form), 300);
    return () => clearTimeout(t);
  }, [step, form]);

  const productMap: Record<
    ProductKey,
    { title: string; desc: string; price: string; images: { src: string; alt: string }[]; features: string[] }
  > = {
    basic: {
      title: products.basic.title,
      desc: products.basic.desc,
      price: products.basic.price,
      images: media.basicProduct?.images ?? [],
      features: [products.features.glass, products.features.nfc, products.features.format, products.features.weather],
    },
    premium: {
      title: products.premium.title,
      desc: products.premium.desc,
      price: products.premium.price,
      images: media.premiumProduct?.images ?? [],
      features: [products.features.all, products.features.photo, products.features.engraving, products.features.premium],
    },
    deluxe: {
      title: products.deluxe.title,
      desc: products.deluxe.desc,
      price: products.deluxe.price,
      images: media.deluxeProduct?.images ?? media.premiumProduct?.images ?? [],
      features: [products.features.all, products.features.photo, products.features.engraving, products.features.premium],
    },
  };

  const scrollToTop = () => {
    const el = document.getElementById("memory-form-start");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Navigation
  const nextFromStep1 = () => {
    if (!selected) return;
    setForm((s) => ({ ...s, product: selected,
    // wenn kein premium: Frame-Felder leeren
    ...(selected !== "premium" ? { frame_orientation: undefined, frame_custom: undefined } : {}),
    // wenn kein basic: Tag-Custom-Felder leeren
    ...(selected !== "basic" ? { pet_tag_customEnabled: undefined, pet_tag_custom: undefined } : {}),
  }));
    setStep(2);
    scrollToTop();
  };
  const backFromStep2 = () => {
    setStep(1);
    scrollToTop();
  };
  const nextFromStep2 = () => {
    setStep(3);
    scrollToTop();
  };
  const backFromStep3 = () => {
    setStep(2);
    scrollToTop();
  };
  const nextFromStep3 = () => {
    setStep(4);
    scrollToTop();
  };
  const backFromStep4 = () => {
    setStep(3);
    scrollToTop();
  };
  const goPayment = () => {
    console.log("CHECKOUT PAYLOAD", { mode, form });
    alert("Daten sind gespeichert. Zahlungsintegration (Stripe) folgt.");
  };
  const resetAll = () => {
    clearPersisted();
    setStep(1);
    setSelected(null);
    setForm({ images: [], videos: [], invoice_sameAsContact: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Default-Tag-Preview anhand Modus & Format bestimmen ---
  const defaultTagImage =
    form.product === "basic"
      ? (form.tag_format === "square_6cm"
          ? media.tagDefaults?.square
          : media.tagDefaults?.round)
      : undefined;

  return (
    <div id="memory-form-start" className="space-y-10">
      {step === 1 && (
        <Step1View
          mode={mode as Mode}
          productMap={productMap}
          selected={selected}
          setSelected={(k) => setSelected(k)}
          onNext={nextFromStep1}
          form={form}
          setForm={setForm}
          copy={COPY}
        />
      )}
      {step === 2 && (
        <Step2View
          mode={mode as Mode}
          form={form}
          setForm={setForm}
          onBack={backFromStep2}
          onNext={nextFromStep2}
          copy={COPY}
        />
      )}
      {step === 3 && (
        <Step3View
          form={form}
          setForm={setForm}
          onBack={backFromStep3}
          onNext={nextFromStep3}
          copy={COPY}
        />
      )}
      {step === 4 && (
        <Step4ContactView
          form={form}
          setForm={setForm}
          onBack={backFromStep3}
          onNext={() => {
            setForm((s) =>
              s.invoice_sameAsContact
                ? {
                    ...s,
                    invoice_firstName: s.contact_firstName ?? s.invoice_firstName,
                    invoice_lastName: s.contact_lastName ?? s.invoice_lastName,
                  }
                : s
            );
            setStep(5);
            scrollToTop();
          }}
          copy={COPY}
        />
      )}
      {step === 5 && (
        <Step5InvoiceAndPayView
          mode={mode as Mode}
          form={form}
          setForm={setForm}
          productLabel={selected ? productMap[selected].title : ""}
          onBack={backFromStep4}
          onPlaceOrder={goPayment}
          onReset={resetAll}
          copy={COPY}
          defaultTagImage={defaultTagImage}
        />
      )}
    </div>
  );
};


export default MemoryUploader;
