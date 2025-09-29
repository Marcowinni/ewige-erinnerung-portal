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
import { Toggle } from "@/components/ui/toggle";
import { Check, Music4, Play, Pause, Bold, Italic } from "lucide-react";
import PrivacyTermsNotice from "@/components/PrivacyTermsNotice";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { set } from "date-fns";

// Preiskalkulation
function calculatePrice(form: FormState, mode: Mode): number {
  if (!form.product) return 0;

  let price = 0;

  switch (form.product) {
    case "basic":
      price = 49;
      if (mode === 'pet') {
        if (form.pet_tag_keychain) {
          price += 7; // Aufpreis Schlüsselanhänger
        }
        if (form.pet_tag_customEnabled) {
          price += 10; // Aufpreis individuelles Design
        }
      }
      break;
    case "premium":
      price = 79;
      break;
    case "deluxe":
      price = 129;
      break;
    default:
      price = 0;
  }
  return price;
}

/* -------------------- Types & Helpers -------------------- */
type ProductKey = "basic" | "premium" | "deluxe";
const productKeyOrder: ProductKey[] = ["basic", "premium", "deluxe"];
type TagFormat = "round_3cm" | "square_6cm";

// NEU: MediaFile Typ, um Datei und optionale Beschreibung zu bündeln
type MediaFile = {
  file: File;
  caption?: string;
  id: string; // Eindeutige ID für die Bearbeitung und als React-Key
};

// Hilfsfunktion, um DataURL in Blob zu konvertieren
const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return blob;
  };

type EditorText = {
  id: string;
  text: string;
  x: number; // 0..1 relativ
  y: number; // 0..1 relativ
  fontFamily: string;
  fontSize: number; // px
  color: string;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  width?: number; 
};

type CustomDesign = {
  bgImageUrl?: string; // ObjectURL für Vorschau
  scale: number; // Zoom
  offsetX: number; // px relativ zum Canvas
  offsetY: number; // px
  texts: EditorText[];
  previewDataUrl?: string; // gerenderte PNG Vorschau
};

type FormState = {
  product?: ProductKey;

  // gemeinsame Notizen
  notes?: string;

  // Menschen
  human_lastName?: string;
  human_firstName?: string;
  human_deathDate?: string; // optional

  // Haustiere
  pet_name?: string;
  pet_deathDate?: string; // optional

  // Surprise
  surprise_name?: string;

  // Uploads (werden NICHT im LocalStorage persistiert)
  // GEÄNDERT: von File[] zu MediaFile[]
  images: MediaFile[];
  videos: MediaFile[];

  // NEW: Music selection
  selectedLocalMusic?: string; // filename from public/music
  pixabayMusicLink?: string; // URL from Pixabay

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
  tag_format?: TagFormat; // "round_3cm" | "square_6cm"

  // Optionen NUR für Haustier–Memora Tag (basic im pet-Modus)
  pet_tag_keychain?: boolean; // +7 CHF (nur bei rund)
  pet_tag_customEnabled?: boolean; // Standard vs. individuell
  pet_tag_custom?: CustomDesign; // Editor-Zustand + Vorschau

  // Optionen für Frame-Produkte (premium, in allen Modi)
  frame_orientation?: "portrait" | "landscape";
  frame_custom?: CustomDesign; // Editor-Zustand + Vorschau

  // NEU: Deluxe-Editor (immer 12x12 cm, keine Ausrichtung)
  deluxe_custom?: CustomDesign;
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
    formatTitleDeluxe?: string;
    roundLabel: string;
    squareLabel: string;
    petOptionsTitle: string;
    keychainLabel: string;
    designLabel: string;
    designStandard: string;
    designCustom: string;
    designCustomNote: string;
    frameTitle: string;
    frameTitleDeluxe: string;
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
    notes_human: string;
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
    audiosLabel?: string;
    audiosLinksLabel?: string;
    remove: string;
    // NEU: Platzhalter für Beschreibungen
    imageCaptionPlaceholder: string;
    videoCaptionPlaceholder: string;
    musicSelection?: {
      title: string;
      availableMusic: string;
      selected: string;
      select: string;
      moreMusic: string;
      pixabayPlaceholder: string;
      pixabayButton: string;
    };
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
    total: string;
    optionOrientation: string;
    optionPortrait: string;
    optionLandscape: string;
    modeHuman: string;
    modePet: string;
    modeSurprise: string;
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
    step3Title: "Bilder, Videos & Audio hochladen",
    step3Subtitle:
      "Dateien werden im Formular gespeichert und später mitgesendet.",
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
    formatTitleDeluxe: "Deluxe Gestalten",
    roundLabel: "Rund · Ø 3 cm",
    squareLabel: "Quadratisch · 6×6 cm",
    petOptionsTitle: "Optionen für Haustier–Memora Tag",
    keychainLabel: "mit Schlüsselanhänger (+7 CHF)",
    designLabel: "Design",
    designStandard: "Standard",
    designCustom: "Individuell gestaltbar (+10 CHF)",
    designCustomNote: "Hinweis: Individuelles Design kostet +10 CHF.",
    frameTitle: "Frame gestalten",
    frameTitleDeluxe: "Deluxe gestalten",
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
    human_deathDate: "Sterbedatum",
    notes_human: "Notizen (optional)",
    human_notesPH: "Besondere Wünsche, Zitate, Musik-Hinweise …",
    pet_name: "Name des Haustiers *",
    pet_deathDate: "Sterbedatum",
    pet_notesPH: "Besondere Wünsche, Lieblingsgeräusche, Hinweise …",
    surprise_name: "Name (Empfänger) *",
    surprise_notesPH: "Hochzeit, Geburtstag, Jubiläum … besondere Wünsche",
  },
  step3Fields: {
    imagesLabel: "Bilder (mehrfach möglich)",
    videosLabel: "Videos (mehrfach möglich)",
    remove: "Entfernen",
    // Texte für die Beschreibungsfelder
    imageCaptionPlaceholder: "Beschreibung für digitales Album (optional)",
    videoCaptionPlaceholder: "Beschreibung für digitales Album (optional)",
    // Musik-Auswahl
    musicSelection: {
      title: "Musik auswählen",
      availableMusic: "Verfügbare Musik",
      selected: "Ausgewählt",
      select: "Auswählen",
      moreMusic: "Weitere Musik von Pixabay",
      pixabayPlaceholder: "Link von pixabay.com/music/ einfügen...",
      pixabayButton: "Pixabay Music",
    },
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
    total: "Gesamtpreis:",
    optionOrientation: "Ausrichtung",
    optionPortrait: "Hochformat",
    optionLandscape: "Querformat",
    modeHuman: "Human",
    modePet: "Pet",
    modeSurprise: "Surprise"
  },
};

// Hilfs-Merger (flach + nested einfach)
function mergeCopy<T>(base: T, patch: Partial<T>): T {
  const out: any = { ...base };
  for (const k in patch) {
    const v: any = (patch as any)[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = mergeCopy((base as any)[k] ?? {}, v);
    } else if (v !== undefined) {
      out[k] = v;
    }
  }
  return out;
}

// --- LocalStorage Helpers ---
const STORAGE_KEY = "memora:memoryUploader:v1";
type PersistedForm = Omit<FormState, "images" | "videos" | "audios">;

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
    const { images, videos, ...rest } = form; // Files NICHT speichern
    const payload = { step, form: rest as PersistedForm };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

function clearPersisted() {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ==================== Design Editor ==================== */
function DesignEditor({
  value,
  onChange,
  shape = "circle",
  width = 420,
  height = 420,
  cornerRadius = 24,
  copy, // Nimmt jetzt das ganze `UploaderCopy` Objekt an
  tip,
}: {
  value: CustomDesign | undefined;
  onChange: (v: CustomDesign) => void;
  shape?: "circle" | "roundedRect";
  width?: number;
  height?: number;
  cornerRadius?: number;
  copy: UploaderCopy; // Geändert von UploaderCopy["editor"] zu UploaderCopy
  tip?: string;
}) {
  const W = width;
  const H = height;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stabile onChange-Referenz
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

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

  useEffect(() => {
    const handleMove = (e: PointerEvent | MouseEvent) => {
      if (!dragText) return;
      const rect = overlayRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
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

  const ZOOM_MIN = 0.1;
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
      const canvasW = rect.width;
      const canvasH = rect.height;
      return {
        ...s,
        scale: newScale,
        offsetX: s.offsetX - (cx - canvasW / 2) * k,
        offsetY: s.offsetY - (cy - canvasH / 2) * k,
      };
    });
  };


  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
      zoomAt(e.clientX, e.clientY, factor);
    };

    const editorDiv = editorContainerRef.current;
    editorDiv?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      editorDiv?.removeEventListener('wheel', onWheel);
    };
  }, []);

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinch = useRef<{ dist: number; midX: number; midY: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!local.bgImageUrl || (e.target as HTMLElement).closest('[data-text-id]')) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) setDragImg({ x: e.clientX, y: e.clientY });
    else if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      lastPinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), midX: (a.x + b.x) / 2, midY: (a.y + b.y) / 2 };
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1 && dragImg) {
      const p = pointers.current.get(e.pointerId)!;
      const dx = p.x - dragImg.x;
      const dy = p.y - dragImg.y;
      setDragImg({ x: p.x, y: p.y });
      setLocal((s) => ({ ...s, offsetX: s.offsetX + dx, offsetY: s.offsetY + dy }));
    } else if (pointers.current.size === 2 && lastPinch.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const factor = dist / lastPinch.current.dist;
      zoomAt(lastPinch.current.midX, lastPinch.current.midY, factor);
      lastPinch.current = { ...lastPinch.current, dist };
    }
  };
  const onPointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    setDragImg(null);
    if (pointers.current.size < 2) lastPinch.current = null;
  };

  useEffect(() => { onChangeRef.current(local); }, [local]);

  // Debounced auto-save for the preview
  useEffect(() => {
    const handler = setTimeout(() => {
      // Nur eine Vorschau generieren, wenn ein Bild vorhanden ist
      if (canvasRef.current && local.bgImageUrl) {
        exportPng();
      }
    }, 500); // Wartet 500ms nach der letzten Änderung

    return () => {
      clearTimeout(handler);
    };
  }, [local.bgImageUrl, local.scale, local.offsetX, local.offsetY, local.texts]);
  
  const draw = (renderTexts: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, W, H);
    applyClip(ctx, W, H);
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
      local.texts.forEach(t => {
        ctx.fillStyle = t.color || "#ffffff";
        ctx.font = `${t.fontStyle || 'normal'} ${t.fontWeight || 'normal'} ${t.fontSize || 24}px ${t.fontFamily || "system-ui, Arial"}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        wrapText(ctx, t.text || "", t.x * W, t.y * H, (t.width || 0.8) * W, t.fontSize || 24);
      });
    }
    ctx.restore();
  };

  useEffect(() => {
    if (!local.bgImageUrl) {
      imgRef.current = null;
      draw(false);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { imgRef.current = img; draw(false); };
    img.src = local.bgImageUrl;
    return () => { if (local.bgImageUrl?.startsWith("blob:")) URL.revokeObjectURL(local.bgImageUrl); };
  }, [local.bgImageUrl]);

  useEffect(() => { draw(false); }, [local.scale, local.offsetX, local.offsetY, local.texts]);

  const applyClip = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.save();
    if (shape === "circle") {
      const r = Math.min(w, h) / 2 - 1;
      ctx.beginPath(); ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2); ctx.clip();
    } else {
      const r = cornerRadius * (w / W);
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath(); ctx.moveTo(rr, 0); ctx.arcTo(w, 0, w, h, rr); ctx.arcTo(w, h, 0, h, rr); ctx.arcTo(0, h, 0, 0, rr); ctx.arcTo(0, 0, w, 0, rr); ctx.closePath(); ctx.clip();
    }
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(" "); let lines: string[] = []; let currentLine = words[0] || '';
    for (let i = 1; i < words.length; i++) {
      let word = words[i]; let width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) { currentLine += " " + word; } else { lines.push(currentLine); currentLine = word; }
    }
    lines.push(currentLine); const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => ctx.fillText(line, x, startY + i * lineHeight));
  };
  
  const onUpload = (files: FileList | null) => {
    if (files && files[0]) {
      if (local.bgImageUrl && local.bgImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(local.bgImageUrl);
      }
      const url = URL.createObjectURL(files[0]);
      
      const tempImg = new Image();
      tempImg.src = url;
      tempImg.onload = () => {
        const canvasWidth = W;
        const canvasHeight = H;
        const scaleX = canvasWidth / tempImg.width;
        const scaleY = canvasHeight / tempImg.height;
        const initialScale = Math.max(scaleX, scaleY); // 'Cover' effect

        setLocal((s) => ({
          ...s,
          bgImageUrl: url,
          scale: initialScale,
          offsetX: 0,
          offsetY: 0,
        }));
      };
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const addText = () => {
    const id = crypto.randomUUID();
    setLocal((s) => ({ ...s, texts: [...s.texts, { id, text: "Neuer Text", x: 0.5, y: 0.5, fontFamily: "system-ui, sans-serif", fontSize: 28, color: "#ffffff", fontWeight: "normal", fontStyle: "normal", width: 0.8 }] }));
    setActiveTextId(id);
  };
  const selectText = (id: string) => setActiveTextId(id);
  const updateActiveText = (patch: Partial<EditorText>) => setLocal((s) => ({ ...s, texts: s.texts.map((t) => (t.id === activeTextId ? { ...t, ...patch } : t)) }));
  const removeActiveText = () => {
    if (activeTextId) {
      setLocal((s) => ({ ...s, texts: s.texts.filter((t) => t.id !== activeTextId) }));
      setActiveTextId(null);
    }
  };

  const onMouseDownText = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    const t = local.texts.find((x) => x.id === id)!;
    setDragText({ id, startX: e.clientX, startY: e.clientY, origX: t.x, origY: t.y });
    setActiveTextId(id);
  };

  const exportPng = () => { draw(true); const png = canvasRef.current?.toDataURL("image/png", 1.0); draw(false); setLocal((s) => ({ ...s, previewDataUrl: png })); };
  const activeText = local.texts.find((t) => t.id === activeTextId) || null;
  const FONT_OPTIONS = [
    { label: "System / Arial", value: "system-ui, Arial, sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Courier New", value: "'Courier New', Courier, monospace" },
    { label: "Playfair Display", value: "'Playfair Display', serif" },
    { label: "Lora", value: "'Lora', serif" },
    { label: "Montserrat", value: "'Montserrat', sans-serif" },
    { label: "Lato", value: "'Lato', sans-serif" },
    { label: "Dancing Script", value: "'Dancing Script', cursive" },
    { label: "Great Vibes", value: "'Great Vibes', cursive" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/5">
          {tip && <p className="text-xs text-muted-foreground mb-2 text-center md:text-left">{tip}</p>}
          {(() => {
            const EditorWrapper = local.bgImageUrl ? "div" : "label";
            return (
              <EditorWrapper
                htmlFor={!local.bgImageUrl ? "file-upload-input" : undefined}
                className={`relative block w-full mx-auto touch-none select-none bg-muted/20 ${!local.bgImageUrl ? 'cursor-pointer' : 'cursor-grab'}`}
                style={{
                  aspectRatio: `${W} / ${H}`,
                  borderRadius: shape === 'circle' ? '50%' : `${cornerRadius}px`
                }}
              >
                {/* Der innere Teil bleibt gleich */}
                <div
                  ref={editorContainerRef}
                  className="absolute inset-0"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUpOrCancel}
                  onPointerCancel={onPointerUpOrCancel}
                >
                  <canvas ref={canvasRef} width={W} height={H} className="w-full h-full" />
                  {!local.bgImageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none border-dashed border-muted-foreground/30 border-2" style={{ borderRadius: 'inherit' }}>
                      <div className="text-center text-muted-foreground">
                        <p className="text-sm font-medium">{copy.editor.emptyTitle}</p>
                        <p className="text-xs">{copy.editor.emptySub}</p>
                      </div>
                    </div>
                  )}
                  <div ref={overlayRef} className="absolute inset-0">
                    {local.texts.map(t => {
                      const rect = overlayRef.current?.getBoundingClientRect();
                      const scaleFactor = rect ? rect.width / W : 1;
                      return (
                        <div key={t.id} data-text-id={t.id} onPointerDown={e => onMouseDownText(e as any, t.id)} onClick={(e) => { e.preventDefault(); selectText(t.id); }}
                          className="absolute cursor-move whitespace-pre-wrap text-center"
                          style={{
                            left: `${t.x * 100}%`, top: `${t.y * 100}%`, transform: 'translate(-50%, -50%)',
                            width: `${(t.width || 0.8) * 100}%`,
                            fontSize: (t.fontSize || 24) * scaleFactor, fontFamily: t.fontFamily, color: t.color,
                            fontWeight: t.fontWeight, fontStyle: t.fontStyle,
                            border: activeTextId === t.id ? '1px dashed currentColor' : 'none', padding: '2px 4px',
                          }}>
                          {t.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </EditorWrapper>
            );
          })()}
        </div>
        <div className="w-full md:w-2/5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload-input">{copy.editor.image}</Label>
            <div className="flex items-center gap-2">
                <Input
                    id="file-upload-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onUpload(e.target.files)}
                    className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Datei auswählen
                </Button>
                <span className="text-sm text-muted-foreground truncate">
                    {local.bgImageUrl && fileInputRef.current?.files?.[0] ? fileInputRef.current.files[0].name : "Keine ausgewählt"}
                </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>{copy.editor.zoom} ({local.scale.toFixed(2)})</Label>
            <Input type="range" min={ZOOM_MIN} max={ZOOM_MAX} step={0.01} value={local.scale} onChange={(e) => setLocal(s => ({ ...s, scale: Number(e.target.value) }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-upload-input">{copy.editor.image}</Label>
            <div className="flex items-center gap-2">
                <Input
                    id="file-upload-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onUpload(e.target.files)}
                    className="hidden"
                />
                <Button onClick={addText} type="button">{copy.buttons.addText}</Button>
            </div>
          </div>
          {activeText && (
            <div className="space-y-3 border rounded-md p-3">
              <div className="flex justify-between items-center"><Label className="font-semibold">{copy.editor.selectedText}</Label><Button size="sm" variant="outline" onClick={removeActiveText}>{copy.buttons.remove}</Button></div>
              <div className="space-y-2"><Label>{copy.editor.content}</Label><Textarea value={activeText.text} onChange={e => updateActiveText({ text: e.target.value })} /></div>
              <div className="space-y-2">
                <Label>Textbox Breite ({Math.round((activeText.width || 0.8) * 100)}%)</Label>
                <Input type="range" min={0.2} max={1} step={0.01} value={activeText.width} onChange={(e) => updateActiveText({ width: Number(e.target.value) })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>{copy.editor.font}</Label><select className="w-full border rounded-md h-10 px-2 bg-background" value={activeText.fontFamily} onChange={e => updateActiveText({ fontFamily: e.target.value })}>{FONT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select></div>
                <div><Label>{copy.editor.size}</Label><Input type="number" min={10} max={96} value={activeText.fontSize} onChange={e => updateActiveText({ fontSize: Number(e.target.value) })} /></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Toggle size="sm" pressed={activeText.fontWeight === 'bold'} onPressedChange={(pressed) => updateActiveText({ fontWeight: pressed ? 'bold' : 'normal' })} aria-label="Toggle bold"><Bold className="h-4 w-4" /></Toggle>
                    <Toggle size="sm" pressed={activeText.fontStyle === 'italic'} onPressedChange={(pressed) => updateActiveText({ fontStyle: pressed ? 'italic' : 'normal' })} aria-label="Toggle italic"><Italic className="h-4 w-4" /></Toggle>
                </div>
                <div><Label className="sr-only">{copy.editor.color}</Label><input type="color" value={activeText.color} onChange={e => updateActiveText({ color: e.target.value })} className="w-8 h-8"/></div>
              </div>
            </div>
          )}
          {local.previewDataUrl && (
            <div className="space-y-2">
              <Label>{copy.editor.previewLabel}</Label>
              <img src={local.previewDataUrl} alt="Vorschau" className={`border w-48 h-auto ${shape === "circle" ? "rounded-full" : "rounded-xl"}`} />
              <p className="text-xs text-muted-foreground">{copy.editor.previewNote}</p>
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
    {
      title: string;
      desc: string;
      price: string;
      images: { src: string; alt: string }[];
      features: string[];
    }
  >;
  selected: ProductKey | null;
  setSelected: (k: ProductKey) => void;
  onNext: () => void;

  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  copy: UploaderCopy;
  onPreviewClick: (gallery: { images: { src: string; alt: string }[]; startIndex: number }) => void;
}) {
  const { mode, productMap, selected, setSelected, onNext, form, setForm, copy } = props;

  const showPetTagOptions = mode === "pet" && selected === "basic";
  const showFrameOptions = selected === "premium"; // Frames
  const showDeluxeEditor = selected === "deluxe"; // NEU: Deluxe
  const showTagFormat = selected === "basic"; // Format-Auswahl für alle Modi beim basic-Produkt
  const isRound = (form.tag_format ?? "round_3cm") === "round_3cm";

  // NEU: Validierungslogik für den "Weiter"-Button
  const isImageUploadRequired =
    (selected === "premium" && !form.frame_custom?.bgImageUrl) ||
    (selected === "deluxe" && !form.deluxe_custom?.bgImageUrl) ||
    (selected === "basic" && mode === "pet" && form.pet_tag_customEnabled && !form.pet_tag_custom?.bgImageUrl);

  const isNextButtonDisabled = !selected || isImageUploadRequired;

  const pageTitle =
    mode === "pet"
      ? copy.headings.pageTitleByMode.pet
      : mode === "surprise"
      ? copy.headings.pageTitleByMode.surprise
      : copy.headings.pageTitleByMode.human;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">
        {pageTitle}
      </h2>
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
                      <CarouselItem key={idx} onClick={() => props.onPreviewClick({ images: p.images ?? [], startIndex: idx })} className="cursor-pointer">
                        <img src={img.src} alt={img.alt} className="w-full h-[26rem] md:h-[26rem] object-cover" loading="lazy" />
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
                      <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
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
                  width={300}
                  height={300}
                  value={form.pet_tag_custom}
                  onChange={(v) => setForm((s) => ({ ...s, pet_tag_custom: v }))}
                  copy={copy}
                  tip={copy.products.frameTip}
                />
              ) : (
                <DesignEditor
                  shape="roundedRect"
                  width={300}
                  height={300}
                  cornerRadius={20}
                  value={form.pet_tag_custom}
                  onChange={(v) => setForm((s) => ({ ...s, pet_tag_custom: v }))}
                  copy={copy}
                  tip={copy.products.frameTip}
                />
              )}
              <PrivacyTermsNotice />
            </div>
          )}
        </div>
      )}

      {/* Frame-Design (premium) – mit Ausrichtung */}
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
              const W = isPortrait ? 300 : 380;
              const H = isPortrait ? 380 : 300;
              return (
                <DesignEditor
                  shape="roundedRect"
                  width={W}
                  height={H}
                  cornerRadius={24}
                  value={form.frame_custom}
                  onChange={(v) => setForm((s) => ({ ...s, frame_custom: v }))}
                  copy={copy}
                  tip={copy.products.frameTip}
                />
              );
            })()}
            <PrivacyTermsNotice />
          </div>

        </div>
      )}

      {/* NEU: Deluxe-Design (immer quadratisch 12×12 cm, keine Ausrichtung) */}
      {showDeluxeEditor && (
        <div className="mt-8 border rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-serif">
            {(copy.products as any).deluxeTitle ?? copy.products.formatTitleDeluxe}
          </h3>

          {/* 12×12 cm ≈ 300x300 px Arbeitsfläche */}
          <div className="pt-2">
            <DesignEditor
              shape="roundedRect"
              width={300}
              height={300}
              cornerRadius={24}
              value={form.deluxe_custom}
              onChange={(v) => setForm((s) => ({ ...s, deluxe_custom: v }))}
              copy={copy}
              tip={copy.products.frameTip}
            />
            <PrivacyTermsNotice />
          </div>

        </div>
      )}

      <div className="mt-8 text-center">
        <Button size="lg" disabled={isNextButtonDisabled} onClick={onNext}>
          {copy.buttons.next} {selected ? `– ${productMap[selected].title}` : ""}
        </Button>
        {isImageUploadRequired}
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

  // Sterbedatum ist FREIWILLIG – nur Pflichtfelder sind Name(n)
  const humanInvalid = mode === "human" && (!form.human_lastName || !form.human_firstName);
  const petInvalid = mode === "pet" && (!form.pet_name);
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
            <Label htmlFor="notes_human">{copy.step2Fields.notes_human}</Label>
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

  // State für den neuen Audio-Player
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Liste der verfügbaren Musikstücke
  const musicTracks = [
    { src: "/music/ambient-piano-music.mp3", title: "Ambient Piano Music", id: "ambient-piano-music.mp3" },
    { src: "/music/inspiring-emotional-uplifting-piano.mp3", title: "Inspiring Piano Music", id: "inspiring-emotional-uplifting-piano.mp3" },
    { src: "/music/happy-music.mp3", title: "Happy Music", id: "happy-music.mp3" },
    { src: "/music/calm-classical-piano.mp3", title: "Modern Classical Music", id: "calm-classical-piano.mp3" },
    { src: "/music/relaxed-music.mp3", title: "Relaxed Music", id: "relaxed-music.mp3" },
    { src: "/music/soft-calm-music.mp3", title: "Soft Calm Music", id: "soft-calm-music.mp3" },
  ];

  const addImages = (files: FileList | null) => {
    if (files) {
      const newMediaFiles: MediaFile[] = Array.from(files).map(f => ({ file: f, caption: "", id: crypto.randomUUID() }));
      setForm((s) => ({ ...s, images: [...s.images, ...newMediaFiles] }));
    }
  };
  const addVideos = (files: FileList | null) => {
    if (files) {
      const newMediaFiles: MediaFile[] = Array.from(files).map(f => ({ file: f, caption: "", id: crypto.randomUUID() }));
      setForm((s) => ({ ...s, videos: [...s.videos, ...newMediaFiles] }));
    }
  };
  const removeImage = (id: string) => setForm((s) => ({ ...s, images: s.images.filter(img => img.id !== id) }));
  const removeVideo = (id: string) => setForm((s) => ({ ...s, videos: s.videos.filter(vid => vid.id !== id) }));

  const handleImageCaptionChange = (id: string, text: string) => {
    setForm(s => ({ ...s, images: s.images.map(img => img.id === id ? { ...img, caption: text } : img) }));
  };
  const handleVideoCaptionChange = (id: string, text: string) => {
    setForm(s => ({ ...s, videos: s.videos.map(vid => vid.id === id ? { ...vid, caption: text } : vid) }));
  };

  const handlePlayToggle = (trackSrc: string) => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (nowPlaying !== trackSrc) {
      setNowPlaying(trackSrc);
      audioEl.src = trackSrc;
      audioEl.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioEl.pause();
        setIsPlaying(false);
      } else {
        audioEl.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    const handleEnd = () => setIsPlaying(false);
    audioEl?.addEventListener('ended', handleEnd);
    return () => {
      audioEl?.removeEventListener('ended', handleEnd);
      audioEl?.pause();
    };
  }, []);

  const hasAnyUpload = form.images.length > 0 || form.videos.length > 0;

  return (
    <div>
      <audio ref={audioRef} />
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{copy.headings.step3Title}</h2>
      <p className="text-muted-foreground mb-8">{copy.headings.step3Subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bilder */}
        <div>
          <Label htmlFor="images">{copy.step3Fields.imagesLabel}</Label>
          <Input id="images" type="file" accept="image/*" multiple onChange={(e) => addImages(e.target.files)} />
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {form.images.map((mediaFile) => {
                const url = URL.createObjectURL(mediaFile.file);
                return (
                  <div key={mediaFile.id} className="relative space-y-2">
                    <img src={url} alt={mediaFile.file.name} className="w-full h-32 object-cover rounded-md border" />
                    <Button size="sm" variant="destructive" className="absolute top-2 right-2 h-7 w-auto px-2 py-1 text-xs" onClick={() => removeImage(mediaFile.id)}>
                      {copy.step3Fields.remove}
                    </Button>
                    <Input type="text" placeholder={copy.step3Fields.imageCaptionPlaceholder} value={mediaFile.caption ?? ""} onChange={(e) => handleImageCaptionChange(mediaFile.id, e.target.value)} className="h-9 text-xs" />
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
            <div className="space-y-4 mt-4">
              {form.videos.map((mediaFile) => {
                const url = URL.createObjectURL(mediaFile.file);
                return (
                  <div key={mediaFile.id} className="relative border rounded-md p-3 space-y-2">
                    <div className="relative">
                      <video src={url} className="w-full rounded" controls />
                      <Button size="sm" variant="destructive" className="absolute top-2 right-2 h-7 w-auto px-2 py-1 text-xs" onClick={() => removeVideo(mediaFile.id)}>
                        {copy.step3Fields.remove}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground truncate flex-1">{mediaFile.file.name}</span>
                    </div>
                    <Input type="text" placeholder={copy.step3Fields.videoCaptionPlaceholder} value={mediaFile.caption ?? ""} onChange={(e) => handleVideoCaptionChange(mediaFile.id, e.target.value)} className="h-9 text-xs" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Music Selection */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium mb-4">{copy.step3Fields.musicSelection?.title}</h3>
          <div className="mb-6">
            <h4 className="text-md font-medium text-muted-foreground mb-3">{copy.step3Fields.musicSelection?.availableMusic}</h4>
            <div className="space-y-2">
              {musicTracks.map((track) => {
                const isCurrentlyPlaying = nowPlaying === track.src && isPlaying;
                const isSelected = form.selectedLocalMusic === track.id;
                return (
                  <div
                    key={track.id}
                    className={`transition-all border rounded-lg p-2.5 flex items-center gap-3 ${
                      isSelected ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0" onClick={() => handlePlayToggle(track.src)}>
                      {isCurrentlyPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <div className="flex-grow min-w-0">
                      <p className="font-medium truncate">{track.title}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setForm(s => ({ ...s, selectedLocalMusic: track.id, pixabayMusicLink: "" }))} // Setzt Pixabay-Link zurück
                      variant={isSelected ? "default" : "outline"} 
                      className="flex-shrink-0"
                    >
                      {isSelected ? copy.step3Fields.musicSelection?.selected : copy.step3Fields.musicSelection?.select}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pixabay Music Link */}
          <div>
            <h4 className="text-md font-medium text-muted-foreground mb-3">{copy.step3Fields.musicSelection?.moreMusic}</h4>
            <div className="flex gap-2">
              <Input 
                type="url" 
                placeholder={copy.step3Fields.musicSelection?.pixabayPlaceholder} 
                value={form.pixabayMusicLink || ""} 
                onChange={(e) => setForm(s => ({ ...s, pixabayMusicLink: e.target.value, selectedLocalMusic: undefined }))} // Setzt lokale Musikauswahl zurück
                className="flex-1" 
              />
              <Button onClick={() => window.open("https://pixabay.com/music/", "_blank")} variant="outline">
                {copy.step3Fields.musicSelection?.pixabayButton}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          {copy.buttons.back}
        </Button>
        <Button onClick={onNext} disabled={!hasAnyUpload}>
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
  isSubmitting: boolean;
  onReset: () => void;
  copy: UploaderCopy;
  media: any;
  onPreviewClick: (gallery: { images: { src: string; alt: string }[]; startIndex: number }) => void;
}) {
  const { mode, form, setForm, productLabel, onBack, onPlaceOrder, isSubmitting, onReset, copy, media, onPreviewClick } = props;

  // Preisberechnung aufrufen
  const totalPrice = calculatePrice(form, mode as Mode);

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

  // Options-Logik mit Übersetzungen
  const options: string[] = [];
  if (form.product === 'basic' && mode === 'pet' && (form.tag_format ?? "round_3cm") === "round_3cm" && form.pet_tag_keychain) {
    options.push(copy.products.keychainLabel);
  }
  if (form.product === 'basic' && mode === 'pet' && form.pet_tag_customEnabled) {
    options.push(copy.products.designCustom);
  }
  // Stellt sicher, dass die Ausrichtung NUR beim Frame (premium) angezeigt wird
  if (form.product === 'premium' && form.frame_orientation) {
    const orientationLabel = form.frame_orientation === "portrait" ? copy.summary.optionPortrait : copy.summary.optionLandscape;
    options.push(`${copy.summary.optionOrientation}: ${orientationLabel}`);
  }
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{copy.headings.step5Title}</h2>
      <p className="text-muted-foreground mb-8">
        {copy.headings.step5Subtitle}
      </p>

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
              <Input id="invoice_company" value={form.invoice_company ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_company: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="invoice_firstName">{copy.invoiceFields.firstName}</Label>
              <Input id="invoice_firstName" value={form.invoice_firstName ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_firstName: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="invoice_lastName">{copy.invoiceFields.lastName}</Label>
              <Input id="invoice_lastName" value={form.invoice_lastName ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_lastName: e.target.value }))} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="invoice_street">{copy.invoiceFields.street}</Label>
              <Input id="invoice_street" value={form.invoice_street ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_street: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="invoice_zip">{copy.invoiceFields.zip}</Label>
              <Input id="invoice_zip" value={form.invoice_zip ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_zip: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="invoice_city">{copy.invoiceFields.city}</Label>
              <Input id="invoice_city" value={form.invoice_city ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_city: e.target.value }))} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="invoice_country">{copy.invoiceFields.country}</Label>
              <Input id="invoice_country" value={form.invoice_country ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_country: e.target.value }))} placeholder="Schweiz" required />
            </div>
          </div>
        </div>

        {/* Zusammenfassung */}
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-serif mb-4">{copy.headings.summary}</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><strong>{copy.summary.mode}:</strong> <span className="text-foreground">{mode === "pet" ? "Pet" : mode === "surprise" ? "Surprise" : "Human"}</span></li>
            <li><strong>{copy.summary.product}:</strong> <span className="text-foreground">{productLabel || "-"}</span></li>
            {form.product === "basic" && (<li><strong>{copy.summary.format}:</strong> <span className="text-foreground">{(form.tag_format ?? "round_3cm") === "square_6cm" ? copy.summary.formatSquare : copy.summary.formatRound}</span></li>)}
            {options.length > 0 && (<li><strong>{copy.summary.options}:</strong> <span className="text-foreground">{options.join(", ")}</span></li>)}
            
            {/* Klickbare Vorschauen für individuelle Designs */}
            {(form.pet_tag_custom?.previewDataUrl || form.frame_custom?.previewDataUrl || form.deluxe_custom?.previewDataUrl) && (
              <li className="mt-2">
                <strong>{copy.summary.previewTitle}:</strong>
                <div className="mt-2 flex items-center gap-4">
                  {form.pet_tag_custom?.previewDataUrl && (
                    <img 
                      src={form.pet_tag_custom.previewDataUrl} 
                      alt="Tag Vorschau" 
                      className="w-20 h-20 rounded-full border cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => props.onPreviewClick({ images: [{ src: form.pet_tag_custom!.previewDataUrl!, alt: 'Tag Vorschau' }], startIndex: 0 })}
                    />
                  )}
                  {form.frame_custom?.previewDataUrl && (
                    <img 
                      src={form.frame_custom.previewDataUrl} 
                      alt="Frame Vorschau" 
                      className="w-28 h-auto rounded-xl border cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => props.onPreviewClick({ images: [{ src: form.frame_custom!.previewDataUrl!, alt: 'Frame Vorschau' }], startIndex: 0 })}
                    />
                  )}
                  {form.deluxe_custom?.previewDataUrl && (
                    <img 
                      src={form.deluxe_custom.previewDataUrl} 
                      alt="Deluxe Vorschau" 
                      className="w-28 h-auto rounded-xl border cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => props.onPreviewClick({ images: [{ src: form.deluxe_custom!.previewDataUrl!, alt: 'Deluxe Vorschau' }], startIndex: 0 })}
                    />
                  )}
                </div>
              </li>
            )}

            {/* Klickbare Vorschau für Standard-Tag (der korrigierte Block) */}
            {form.product === 'basic' && !(mode === 'pet' && form.pet_tag_customEnabled) && (() => {
              const isRound = (form.tag_format ?? "round_3cm") === "round_3cm";
              const mediaData = getMediaForMode(mode);
              const defaultImageSrc = isRound ? mediaData.tagDefaults?.round : mediaData.tagDefaults?.square;
              
              if (!defaultImageSrc) return null;

              return (
                <li className="mt-2">
                  <strong>{copy.summary.previewTitle}:</strong>
                  <div className="mt-2 flex items-center gap-4">
                    <img
                      src={defaultImageSrc}
                      alt="Standard Tag Vorschau"
                      className={`w-20 h-20 border cursor-pointer hover:opacity-80 transition-opacity ${isRound ? 'rounded-full' : 'rounded-xl'}`}
                      onClick={() => props.onPreviewClick({ images: [{ src: defaultImageSrc, alt: 'Standard Tag Vorschau' }], startIndex: 0 })}
                    />
                  </div>
                </li>
              );
            })()}

            {/* Restliche Zusammenfassungs-Infos */}
            {mode === "human" && (<li><strong>{copy.summary.person}:</strong> <span className="text-foreground">{form.human_firstName} {form.human_lastName}{" "}{form.human_deathDate ? `(${form.human_deathDate})` : ""}</span></li>)}
            {mode === "pet" && (<li><strong>{copy.summary.pet}:</strong> <span className="text-foreground">{form.pet_name} {form.pet_deathDate ? `(${form.pet_deathDate})` : ""}</span></li>)}
            {mode === "surprise" && (<li><strong>{copy.summary.recipient}:</strong> <span className="text-foreground">{form.surprise_name}</span></li>)}
            {form.notes && (<li><strong>{copy.summary.notes}:</strong> <span className="text-foreground">{form.notes}</span></li>)}
            <li><strong>{copy.summary.counts(form.images.length, form.videos.length)}</strong></li>
            {form.selectedLocalMusic && (
              <li>
                <strong>Musik:</strong>
                <span className="text-foreground ml-1">
                  {form.selectedLocalMusic.replace('.mp3', '').replace(/-/g, ' ')}
                </span>
              </li>
            )}
            {form.pixabayMusicLink && (
              <li>
                <strong>Pixabay Musik:</strong>
                <span className="text-foreground ml-1">{form.pixabayMusicLink}</span>
              </li>
            )}
            <li className="font-bold text-lg pt-2 mt-2 border-t">
              <div className="flex justify-between items-center text-foreground">
                <span>{copy.summary.total}:</span>
                <span>CHF {totalPrice.toFixed(2)}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-2 flex flex-wrap justify-between gap-3">
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>{copy.buttons.back}</Button>
            <Button variant="ghost" onClick={onReset}>{copy.buttons.reset}</Button>
          </div>
          <Button size="lg" onClick={onPlaceOrder} disabled={invalid || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bestellung wird verarbeitet...
              </>
            ) : (
              `${copy.buttons.toPay} (CHF ${totalPrice.toFixed(2)})`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Parent: MemoryUploader -------------------- */
const MemoryUploader = () => {
  const { mode, modeContent } = useContent();
  const media = useMemo(() => getMediaForMode(mode as Mode), [mode]);
  const products = modeContent.products;
  const [activeGallery, setActiveGallery] = useState<{ images: { src: string; alt: string }[]; startIndex: number } | null>(null);
  // Copy zusammenbauen (Content + Fallbacks)
  const contentCopy = (modeContent as any)?.uploaderCopy as Partial<UploaderCopy> | undefined;
  const COPY: UploaderCopy = mergeCopy(DEFAULT_COPY, contentCopy ?? {});

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const isInitialRender = useRef(true);
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
    frame_orientation: "portrait", // default Hochformat
    tag_format: "round_3cm", // default Rund Ø 3 cm
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

   // Setzt das Formular zurück, wenn der Modus wechselt
  useEffect(() => {
    // Führe den Reset nur aus, wenn es nicht der erste Render ist, um den initialen Zustand nicht zu löschen
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      console.log("Modus gewechselt, setze Formular zurück.");
      resetAll();
    }
  }, [mode]); // Beobachtet Änderungen am Modus

  const productMap: Record<
    ProductKey,
    { title: string; desc: string; price: string; images: { src: string; alt: string }[]; features: string[] }
  > = {
    basic: {
      title: products.basic.title,
      desc: products.basic.desc,
      price: products.basic.price,
      images: media.basicProduct?.images ?? [],
      features: [products.features.tag1, products.features.tag2, products.features.tag3, products.features.tag4],
    },
    premium: {
      title: products.premium.title,
      desc: products.premium.desc,
      price: products.premium.price,
      images: media.premiumProduct?.images ?? [],
      features: [products.features.premium1, products.features.premium2, products.features.premium3, products.features.premium4],
    },
    deluxe: {
      title: products.deluxe.title,
      desc: products.deluxe.desc,
      price: products.deluxe.price,
      images: media.deluxeProduct?.images ?? media.premiumProduct?.images ?? [],
      features: [products.features.deluxe1, products.features.deluxe2, products.features.deluxe3, products.features.deluxe4],
    },
  };

  const scrollToTop = () => {
    const el = document.getElementById("memory-form-start");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Navigation
  const nextFromStep1 = () => {
    if (!selected) return;
    setForm((s) => ({ ...s, product: selected }));
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
  // placement of order
  const onPlaceOrder = async () => {
    setIsSubmitting(true);
    toast.info("Bestellung wird verarbeitet...");

    try {
      // 1. Bereite die strukturierten Daten für die Datenbank vor
      const optionsSummary = [];
      if (form.product === 'basic' && form.tag_format) optionsSummary.push(`Format: ${form.tag_format}`);
      if (form.product === 'premium' && form.frame_orientation) optionsSummary.push(`Ausrichtung: ${form.frame_orientation}`);
      if (form.pet_tag_keychain) optionsSummary.push("Mit Schlüsselanhänger");
      if (form.pet_tag_customEnabled) optionsSummary.push("Individuelles Design");

      const subjectDetails = 
        mode === 'human' ? `Person: ${form.human_firstName} ${form.human_lastName}` :
        mode === 'pet' ? `Haustier: ${form.pet_name}` :
        `Anlass für: ${form.surprise_name}`;
      
      const billingAddress = `${form.invoice_street}, ${form.invoice_zip} ${form.invoice_city}, ${form.invoice_country}`;

      const musicChoice = form.selectedLocalMusic || form.pixabayMusicLink || "Keine Auswahl";

      // 2. Erstelle einen ersten Datenbank-Eintrag, um eine ID zu bekommen
      const initialOrderPayload = {
        product_type: selected ? productMap[selected].title : "N/A",
        options_summary: optionsSummary.join(', '),
        total_price: calculatePrice(form, mode as Mode),
        subject_details: subjectDetails,
        music_choice: musicChoice,
        contact_name: `${form.contact_firstName} ${form.contact_lastName}`,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone || "N/A",
        billing_address: billingAddress,
        notes: form.notes || "Keine Notizen",
      };

      const { data: orderData, error: initialInsertError } = await supabase
        .from('orders')
        .insert(initialOrderPayload)
        .select('id')
        .single();

      if (initialInsertError || !orderData) {
        throw new Error(`Fehler beim Erstellen der Bestellung: ${initialInsertError?.message}`);
      }
      
      const orderId = orderData.id;
      const orderFolderPath = `order_${orderId}`;

      // 3. Lade jetzt alle Dateien in den bestellungs-spezifischen Ordner hoch
      toast.info("Lade Dateien hoch...");
      const uploadPromises = [
        ...form.images.map(f => supabase.storage.from('uploads').upload(`${orderFolderPath}/${f.file.name}`, f.file)),
        ...form.videos.map(f => supabase.storage.from('uploads').upload(`${orderFolderPath}/${f.file.name}`, f.file))
      ];

      const uploadResults = await Promise.all(uploadPromises);

      const uploadedFilePaths: string[] = [];
      for (const result of uploadResults) {
        if (result.error) throw new Error(`Datei-Upload fehlgeschlagen: ${result.error.message}`);
        uploadedFilePaths.push(result.data.path);
      }

      // 4. Lade das erstellte Vorschau-Bild hoch
      let previewFilePath: string | null = null;
      const previewDataUrl = form.frame_custom?.previewDataUrl || form.deluxe_custom?.previewDataUrl || form.pet_tag_custom?.previewDataUrl;
      
      if (previewDataUrl) {
        toast.info("Lade Vorschau hoch...");
        const previewBlob = await dataUrlToBlob(previewDataUrl);
        const previewPath = `${orderFolderPath}/previews/custom_design_preview.png`;
        
        const { data: previewUploadData, error: previewUploadError } = await supabase.storage
          .from('uploads')
          .upload(previewPath, previewBlob, { contentType: 'image/png' });

        if (previewUploadError) throw new Error(`Vorschau-Upload fehlgeschlagen: ${previewUploadError.message}`);
        previewFilePath = previewUploadData.path;
      }
      
      // 5. Aktualisiere den Datenbank-Eintrag mit den Dateipfaden
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          uploaded_files: uploadedFilePaths,
          preview_file_path: previewFilePath
        })
        .eq('id', orderId);

      if (updateError) throw new Error(`Fehler beim Speichern der Dateipfade: ${updateError.message}`);

      // 6. Erfolg!
      toast.success("Vielen Dank! Deine Bestellung wurde erfolgreich übermittelt.");
      resetAll();

    } catch (error) {
      console.error("Ein Fehler ist im Bestellprozess aufgetreten:", error);
      toast.error(`Fehler bei der Bestellung: ${error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten."}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetAll = () => {
    clearPersisted();
    setStep(1);
    setSelected(null);
    setForm({ images: [], videos: [], invoice_sameAsContact: true, frame_orientation: 'portrait', tag_format: 'round_3cm' });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="memory-form-start" className="space-y-10">
      <Dialog open={!!activeGallery} onOpenChange={(isOpen) => !isOpen && setActiveGallery(null)}>
        <DialogContent className="max-w-5xl p-2">
          <DialogTitle className="sr-only">Produktgalerie</DialogTitle>
          <DialogDescription className="sr-only">
            Durchblättern der Produktbilder mit den Pfeiltasten.
          </DialogDescription>
          {activeGallery && (
            <Carousel opts={{ loop: true, startIndex: activeGallery.startIndex }}>
              <CarouselContent>
                {activeGallery.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img src={image.src} alt={image.alt} className="w-full h-auto object-contain rounded-md max-h-[80vh]" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 md:-left-10" />
              <CarouselNext className="right-2 md:-right-10" />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
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
          onPreviewClick={setActiveGallery}
        />
      )}
      {step === 2 && (
        <Step2View mode={mode as Mode} form={form} setForm={setForm} onBack={backFromStep2} onNext={nextFromStep2} copy={COPY} />
      )}
      {step === 3 && <Step3View form={form} setForm={setForm} onBack={backFromStep3} onNext={nextFromStep3} copy={COPY} />}
      {step === 4 && (
        <Step4ContactView
          form={form}
          setForm={setForm}
          onBack={backFromStep4} // Korrigiert
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
          onPlaceOrder={onPlaceOrder}
          isSubmitting={isSubmitting}
          onReset={resetAll}
          copy={COPY}
          media={media}
          onPreviewClick={setActiveGallery}
        />
      )}
    </div>
  );
};

export default MemoryUploader;