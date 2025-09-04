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

type EditorText = {
  id: string;
  text: string;
  x: number; // 0..1 relativ
  y: number; // 0..1 relativ
  fontFamily: string;
  fontSize: number; // px
  color: string;
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

  // Optionen für Haustier–Memora Tag (basic im pet-Modus)
  pet_tag_keychain?: boolean; // +7 CHF
  pet_tag_customEnabled?: boolean; // Standard vs. individuell
  pet_tag_custom?: CustomDesign; // Editor-Zustand + Vorschau

  // Optionen für Frame-Produkte (premium, in allen Modi)
  frame_orientation?: "portrait" | "landscape";
  frame_custom?: CustomDesign; // Editor-Zustand + Vorschau
};

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

/* ==================== Design Editor (parametrisierbar) ==================== */
function DesignEditor({
  value,
  onChange,
  shape = "circle",
  width = 420,
  height = 420,
  cornerRadius = 24,
}: {
  value: CustomDesign | undefined;
  onChange: (v: CustomDesign) => void;
  shape?: "circle" | "roundedRect";
  width?: number;
  height?: number;
  cornerRadius?: number;
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

  // Clip-Path auf Canvas anwenden (Kreis oder Rounded Rect)
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

  // Hilfsfunktion für Rounded-Rect-Pfad
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

  // renderTexts steuert, ob Texte in die Canvas gemalt werden (nur Export)
  const draw = (renderTexts: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    // Clip anwenden
    applyClip(ctx);

    // Bild zeichnen
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


    // Texte in Canvas nur beim Export
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

  // Drag Bild
  const onMouseDownCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragImg({ x: e.clientX, y: e.clientY });
  };
  const onMouseMoveCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragImg) return;
    const dx = e.clientX - dragImg.x;
    const dy = e.clientY - dragImg.y;
    setDragImg({ x: e.clientX, y: e.clientY });
    setLocal((s) => ({ ...s, offsetX: s.offsetX + dx, offsetY: s.offsetY + dy }));
  };
  const onMouseUpCanvas = () => setDragImg(null);

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

  // Drag Text
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
  const onMouseMoveOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
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
  const onMouseUpOverlay = () => setDragText(null);

  // Export
  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draw(true);
    const png = canvas.toDataURL("image/png", 1.0);
    draw(false);
    setLocal((s) => ({ ...s, previewDataUrl: png }));
  };

  const activeText = local.texts.find((t) => t.id === activeTextId) || null;

  // Container-Klasse je nach Form
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
                  onMouseDown={onMouseDownCanvas}
                  onMouseMove={onMouseMoveCanvas}
                  onMouseUp={onMouseUpCanvas}
                  onMouseLeave={onMouseUpCanvas}
                  className="w-full h-full"
                />

                {/* Platzhalter, solange kein Bild gewählt ist */}
                {isEmpty && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <div className="text-center text-muted-foreground">
                      <div className="text-sm font-medium mb-1">Kein Bild ausgewählt</div>
                      <div className="text-xs opacity-80">Bitte oben ein Bild wählen</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Text Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-auto"
            onMouseMove={onMouseMoveOverlay}
            onMouseUp={onMouseUpOverlay}
            onMouseLeave={onMouseUpOverlay}
          >
            {local.texts.map((t) => (
              <div
                key={t.id}
                onMouseDown={(e) => onMouseDownText(e, t.id)}
                onClick={() => selectText(t.id)}
                className="absolute cursor-move select-none hover:ring-2 hover:ring-primary/40 hover:rounded"
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
            <Label>Bild</Label>
            <Input type="file" accept="image/*" onChange={(e) => onUpload(e.target.files)} />
          </div>

          <div className="space-y-2">
            <Label>Zoom</Label>
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

          {/* Position – Horizontal */}
          <div className="space-y-2">
            <Label>Horizontale Position</Label>
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

          {/* Position – Vertikal */}
          <div className="space-y-2">
            <Label>Vertikale Position</Label>
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
              Text hinzufügen
            </Button>
            <Button onClick={exportPng} type="button" variant="secondary">
              Design übernehmen
            </Button>
          </div>

          {/* Text-Eigenschaften */}
          {activeText && (
            <div className="space-y-3 border rounded-md p-3">
              <div className="flex justify-between items-center">
                <Label className="font-semibold">Ausgewählter Text</Label>
                <Button size="sm" variant="outline" onClick={removeActiveText}>
                  Entfernen
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Inhalt</Label>
                <Input value={activeText.text} onChange={(e) => updateActiveText({ text: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Schriftart</Label>
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
                  <Label>Grösse</Label>
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
                <Label>Farbe</Label>
                <input type="color" value={activeText.color} onChange={(e) => updateActiveText({ color: e.target.value })} />
              </div>
            </div>
          )}

          {local.previewDataUrl && (
            <div className="space-y-2">
              <Label>Übernommene Vorschau</Label>
              <img
                src={local.previewDataUrl}
                alt="Vorschau"
                className={`border w-48 h-auto ${shape === "circle" ? "rounded-full" : "rounded-xl"}`}
              />
              <p className="text-xs text-muted-foreground">Diese Vorschau wird mit der Bestellung gespeichert.</p>
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
}) {
  const { mode, productMap, selected, setSelected, onNext, form, setForm } = props;

  const showPetTagOptions = mode === "pet" && selected === "basic";
  const showFrameOptions = selected === "premium"; // in allen Modi

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">
        Produkt wählen {mode === "pet" ? "(Haustiere)" : mode === "surprise" ? "(Surprise)" : "(Menschen)"}
      </h2>
      <p className="text-muted-foreground mb-8">Wähle dein Produkt – die Inhalte lädst du im nächsten Schritt hoch.</p>

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

      {/* Optionen nur für Haustier–Tag */}
      {showPetTagOptions && (
        <div className="mt-8 border rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-serif">Optionen für Haustier–Memora Tag</h3>

          <div className="flex items-center gap-3">
            <Checkbox
              id="keychain"
              checked={!!form.pet_tag_keychain}
              onCheckedChange={(v) => setForm((s) => ({ ...s, pet_tag_keychain: !!v }))}
            />
            <Label htmlFor="keychain">mit Schluesselanhaenger (+7 CHF)</Label>
          </div>

          <div className="space-y-3">
            <Label>Design</Label>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant={form.pet_tag_customEnabled ? "outline" : "default"}
                onClick={() => setForm((s) => ({ ...s, pet_tag_customEnabled: false }))}
              >
                Standard
              </Button>
              <Button
                type="button"
                variant={form.pet_tag_customEnabled ? "default" : "outline"}
                onClick={() => setForm((s) => ({ ...s, pet_tag_customEnabled: true }))}
              >
                Individuell gestaltbar
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Hinweis: Individuelles Design kostet <span className="font-semibold">+10 CHF</span>.
          </p>

          {form.pet_tag_customEnabled && (
            <div className="pt-4">
              {/* Runder Tag */}
              <DesignEditor
                shape="circle"
                width={420}
                height={420}
                value={form.pet_tag_custom}
                onChange={(v) => setForm((s) => ({ ...s, pet_tag_custom: v }))}
              />
            </div>
          )}
        </div>
      )}

      {/* Frame-Design (premium) – in ALLEN Modi, immer individuell */}
      {selected === "premium" && (
        <div className="mt-8 border rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-serif">Frame gestalten</h3>

          {/* Ausrichtung */}
          <div className="space-y-2">
            <Label>Ausrichtung</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={(form.frame_orientation ?? "landscape") === "portrait" ? "default" : "outline"}
                onClick={() => setForm((s) => ({ ...s, frame_orientation: "portrait" }))}
              >
                Hochformat
              </Button>
              <Button
                type="button"
                variant={(form.frame_orientation ?? "landscape") === "landscape" ? "default" : "outline"}
                onClick={() => setForm((s) => ({ ...s, frame_orientation: "landscape" }))}
              >
                Querformat
              </Button>
            </div>
          </div>

          {/* Editor */}
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
                />
              );
            })()}
          </div>

          <p className="text-sm text-muted-foreground">
            Tipp: Zoomen per Schieberegler, Texte hinzufügen & frei positionieren.
          </p>
        </div>
      )}


      <div className="mt-8 flex justify-center gap-3">
        <Button size="lg" disabled={!selected} onClick={onNext}>
          Weiter {selected ? `– ${productMap[selected].title}` : ""}
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
}) {
  const { mode, form, setForm, onBack, onNext } = props;

  const humanInvalid = mode === "human" && (!form.human_lastName || !form.human_firstName || !form.human_deathDate);
  const petInvalid = mode === "pet" && (!form.pet_name || !form.pet_deathDate);
  const surpriseInvalid = mode === "surprise" && !form.surprise_name;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">
        {mode === "human" ? "Angaben zur Person" : mode === "pet" ? "Angaben zum Haustier" : "Angaben für Surprise"}
      </h2>
      <p className="text-muted-foreground mb-8">Bitte die folgenden Felder ausfuellen. Notizen sind optional.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mode === "human" && (
          <>
            <div>
              <Label htmlFor="human_lastName">Nachname *</Label>
              <Input
                id="human_lastName"
                value={form.human_lastName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, human_lastName: e.target.value }))}
                placeholder="Mustermann"
                required
              />
            </div>
            <div>
              <Label htmlFor="human_firstName">Vorname *</Label>
              <Input
                id="human_firstName"
                value={form.human_firstName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, human_firstName: e.target.value }))}
                placeholder="Max"
                required
              />
            </div>
            <div>
              <Label htmlFor="human_deathDate">Sterbedatum *</Label>
              <Input
                id="human_deathDate"
                type="date"
                value={form.human_deathDate ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, human_deathDate: e.target.value }))}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes_human">Weitere Notizen</Label>
              <Textarea
                id="notes_human"
                rows={4}
                placeholder="Besondere Wuensche, Zitate, Musik-Hinweise …"
                value={form.notes ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
              />
            </div>
          </>
        )}

        {mode === "pet" && (
          <>
            <div>
              <Label htmlFor="pet_name">Name des Haustiers *</Label>
              <Input
                id="pet_name"
                value={form.pet_name ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, pet_name: e.target.value }))}
                placeholder="Bello"
                required
              />
            </div>
            <div>
              <Label htmlFor="pet_deathDate">Sterbedatum *</Label>
              <Input
                id="pet_deathDate"
                type="date"
                value={form.pet_deathDate ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, pet_deathDate: e.target.value }))}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes_pet">Weitere Notizen</Label>
              <Textarea
                id="notes_pet"
                rows={4}
                placeholder="Besondere Wuensche, Lieblingsgeraeusche, Hinweise …"
                value={form.notes ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
              />
            </div>
          </>
        )}

        {mode === "surprise" && (
          <>
            <div>
              <Label htmlFor="surprise_name">Name (Empfaenger) *</Label>
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
                placeholder="Hochzeit, Geburtstag, Jubilaeum … besondere Wuensche"
                value={form.notes ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          Zurueck
        </Button>
        <Button onClick={onNext} disabled={humanInvalid || petInvalid || surpriseInvalid}>
          Weiter
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
}) {
  const { form, setForm, onBack, onNext } = props;

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
      <h2 className="text-2xl md:text-3xl font-serif mb-3">Bilder & Videos hochladen</h2>
      <p className="text-muted-foreground mb-8">
        Dateien werden im Formular gespeichert und spaeter mitgesendet (nicht im LocalStorage).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bilder */}
        <div>
          <Label htmlFor="images">Bilder (mehrfach moeglich)</Label>
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
                      Entfernen
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Videos */}
        <div>
          <Label htmlFor="videos">Videos (mehrfach moeglich)</Label>
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
                        Entfernen
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
          Zurueck
        </Button>
        <Button onClick={onNext} disabled={form.images.length === 0 && form.videos.length === 0}>
          Weiter
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
}) {
  const { form, setForm, onBack, onNext } = props;
  const invalid = !form.contact_firstName || !form.contact_lastName || !form.contact_email;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">Kontaktangaben</h2>
      <p className="text-muted-foreground mb-8">Diese Daten verwenden wir fuer Rueckfragen und die Auftragsbestaetigung.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact_firstName">Vorname *</Label>
          <Input
            id="contact_firstName"
            value={form.contact_firstName ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, contact_firstName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="contact_lastName">Nachname *</Label>
          <Input
            id="contact_lastName"
            value={form.contact_lastName ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, contact_lastName: e.target.value }))}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="contact_email">E-Mail *</Label>
          <Input
            id="contact_email"
            type="email"
            value={form.contact_email ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, contact_email: e.target.value }))}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="contact_phone">Telefon (optional)</Label>
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
          Zurueck
        </Button>
        <Button onClick={onNext} disabled={invalid}>
          Weiter
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
  onPlaceOrder: () => void; // später Stripe starten
  onReset: () => void;
}) {
  const { mode, form, setForm, productLabel, onBack, onPlaceOrder, onReset } = props;

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

  // kleine Text-Zusammenfassung inkl. Optionen
  const options: string[] = [];
  if (form.pet_tag_keychain) options.push("mit Schluesselanhaenger (+7 CHF)");
  if (form.pet_tag_customEnabled) options.push("individuell gestalteter Tag (+10 CHF)");
  if (form.frame_orientation) options.push(`Frame-Ausrichtung: ${form.frame_orientation === "portrait" ? "Hochformat" : "Querformat"}`);


  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-3">Rechnungsangaben & Uebersicht</h2>
      <p className="text-muted-foreground mb-8">
        Bitte pruefe die Adresse und die Zusammenfassung. Mit „Weiter zur Zahlung“ geht es spaeter in den Checkout.
      </p>

      <div className="space-y-10">
        {/* Rechnungsadresse */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Checkbox id="same" checked={!!form.invoice_sameAsContact} onCheckedChange={(v) => toggleSame(!!v)} />
            <Label htmlFor="same">Rechnungsadresse gleich Kontaktadresse</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="invoice_company">Firma (optional)</Label>
              <Input
                id="invoice_company"
                value={form.invoice_company ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_company: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="invoice_firstName">Vorname *</Label>
              <Input
                id="invoice_firstName"
                value={form.invoice_firstName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="invoice_lastName">Nachname *</Label>
              <Input
                id="invoice_lastName"
                value={form.invoice_lastName ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_lastName: e.target.value }))}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="invoice_street">Strasse & Nr. *</Label>
              <Input
                id="invoice_street"
                value={form.invoice_street ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, invoice_street: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="invoice_zip">PLZ *</Label>
              <Input id="invoice_zip" value={form.invoice_zip ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_zip: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="invoice_city">Ort *</Label>
              <Input id="invoice_city" value={form.invoice_city ?? ""} onChange={(e) => setForm((s) => ({ ...s, invoice_city: e.target.value }))} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="invoice_country">Land *</Label>
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
          <h3 className="text-xl font-serif mb-4">Zusammenfassung</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Modus:</strong> {mode === "pet" ? "Haustiere" : mode === "surprise" ? "Surprise" : "Menschen"}
            </li>
            <li>
              <strong>Produkt:</strong> {productLabel || "-"}
            </li>
            {options.length > 0 && (
              <li>
                <strong>Optionen:</strong> {options.join(", ")}
              </li>
            )}

            {(form.pet_tag_custom?.previewDataUrl || form.frame_custom?.previewDataUrl) && (
              <li className="mt-2">
                <strong>Individuelle Vorschau:</strong>
                <div className="mt-2 flex items-center gap-4">
                  {form.pet_tag_custom?.previewDataUrl && (
                    <img src={form.pet_tag_custom.previewDataUrl} alt="Tag Vorschau" className="w-20 h-20 rounded-full border" />
                  )}
                  {form.frame_custom?.previewDataUrl && (
                    <img src={form.frame_custom.previewDataUrl} alt="Frame Vorschau" className="w-28 h-auto rounded-xl border" />
                  )}
                </div>
              </li>
            )}

            {mode === "human" && (
              <li>
                <strong>Person:</strong> {form.human_firstName} {form.human_lastName}{" "}
                {form.human_deathDate ? `(${form.human_deathDate})` : ""}
              </li>
            )}
            {mode === "pet" && (
              <li>
                <strong>Haustier:</strong> {form.pet_name} {form.pet_deathDate ? `(${form.pet_deathDate})` : ""}
              </li>
            )}
            {mode === "surprise" && (
              <li>
                <strong>Empfaenger:</strong> {form.surprise_name}
              </li>
            )}
            {form.notes && (
              <li>
                <strong>Notizen:</strong> {form.notes}
              </li>
            )}
            <li>
              <strong>Bilder:</strong> {form.images.length} • <strong>Videos:</strong> {form.videos.length}
            </li>
          </ul>
        </div>

        <div className="mt-2 flex flex-wrap justify-between gap-3">
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Zurueck
            </Button>
            <Button variant="ghost" onClick={onReset}>
              Zuruecksetzen
            </Button>
          </div>
          <Button onClick={onPlaceOrder} disabled={invalid}>
            Weiter zur Zahlung
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
    frame_orientation: "landscape",
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
  const goPayment = () => {
    // Hier später Checkout (Stripe o. ä.) starten
    console.log("CHECKOUT PAYLOAD", { mode, form });
    alert("Daten sind gespeichert. Zahlungsintegration (Stripe) folgt.");
    // Nach erfolgreicher Zahlung ggf. clearPersisted();
  };
  const resetAll = () => {
    clearPersisted();
    setStep(1);
    setSelected(null);
    setForm({ images: [], videos: [], invoice_sameAsContact: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        />
      )}
      {step === 2 && (
        <Step2View mode={mode as Mode} form={form} setForm={setForm} onBack={backFromStep2} onNext={nextFromStep2} />
      )}
      {step === 3 && (
        <Step3View form={form} setForm={setForm} onBack={backFromStep3} onNext={nextFromStep3} />
      )}
      {step === 4 && (
        <Step4ContactView
          form={form}
          setForm={setForm}
          onBack={backFromStep3}
          onNext={() => {
            // Rechnung default auf Kontakt setzen, wenn Checkbox aktiv und noch leer
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
        />
      )}
    </div>
  );
};

export default MemoryUploader;
