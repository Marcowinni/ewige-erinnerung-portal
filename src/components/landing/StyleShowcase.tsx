import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ModernPhotoAlbum, type PageConfig } from "@/components/album-viewer/modern/ModernPhotoAlbum";
import { ClassicPhotoAlbum, type ClassicPageConfig } from "@/components/album-viewer/classic/ClassicPhotoAlbum";
import { TimelessPhotoAlbum, type TimelessPageConfig } from "@/components/album-viewer/timeless/TimelessPhotoAlbum";

const SAMPLE_IMAGES = [
  "/dog_pics/2.jpeg",
  "/dog_pics/3.jpeg",
  "/dog_pics/5.jpeg",
  "/dog_pics/6.jpeg",
  "/dog_pics/7.jpeg",
  "/dog_pics/WhatsApp%20Video%202026-04-24%20at%2014.20.26.mp4",
  "/dog_pics/8.jpeg",
  "/dog_pics/9.jpeg",
  "/dog_pics/88.jpeg",
  "/dog_pics/WhatsApp%20Video%202026-04-24%20at%2014.23.01.mp499.mp4",
  "/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.20.jpeg",
  "/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.204.jpeg",
  "/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.21.jpeg",
  "/dog_pics/WhatsApp%20Image%202026-04-24%20at%2014.20.21.jpeg3.jpeg",
];

const SUBJECT_NAME = "Bello";
const DATE_RANGE = "1950 – 2025";

type Theme = "modern" | "classic" | "timeless";

const THEME_LABELS: Record<Theme, string> = {
  modern: "Modern",
  classic: "Klassisch",
  timeless: "Zeitlos",
};

// Curated page sequences — exactly the layouts available in admin editor per theme
function buildModernShowcasePages(imgs: string[]): PageConfig[] {
  let i = 0;
  const next = () => imgs[i++ % imgs.length] ?? null;
  return [
    { type: "hero", img: next(), showText: true },
    { type: "bleed", img: next(), showText: true, text: "Ein Augenblick." },
    { type: "split", imgs: [next(), next(), next()], showText: true, text: "Leise Stunden." },
    { type: "stack", imgs: [next(), next(), next(), next()], showText: false },
    { type: "story", bg: next(), s1: next(), s2: next(), s3: next(), showText: true, text: "Tage, wie sie waren." },
    { type: "twin-portrait", imgA: next(), imgB: next(), showText: true, text: "Zwei Seiten einer Zeit." },
    { type: "quote-card", img: next(), showText: true, text: "Was bleibt, ist Liebe." },
    { type: "close", showText: true },
  ];
}

function buildClassicShowcasePages(imgs: string[]): ClassicPageConfig[] {
  let i = 0;
  const next = () => imgs[i++ % imgs.length] ?? null;
  return [
    { type: "hero", img: next(), showText: true },
    { type: "bleed", img: next(), showText: true, text: "Im Licht bewahrt." },
    { type: "duo", imgA: next(), imgB: next(), showText: true, text: "Ein gemeinsamer Weg." },
    { type: "polaroids", imgA: next(), imgB: next(), showText: true, text: "Vertraute Tage." },
    { type: "tape", imgA: next(), imgB: next(), showText: true, text: "Wind im Haar." },
    { type: "herald", hero: next(), r1: next(), r2: next(), showText: true, text: "Wie wir Dich kannten." },
    { type: "diagonal", t1: next(), t2: next(), t3: next(), showText: true, text: "Bewahrte Bilder." },
    { type: "envelope-letter", img: next(), showText: true, text: "Worte, die bleiben." },
    { type: "pinned", imgA: next(), imgB: next(), showText: true, text: "Angeheftet. Bewahrt." },
    { type: "strip", s1: next(), s2: next(), s3: next(), big: next(), showText: true, text: "Liebste Augenblicke." },
    { type: "close", showText: true },
  ];
}

function buildTimelessShowcasePages(imgs: string[]): TimelessPageConfig[] {
  let i = 0;
  const next = () => imgs[i++ % imgs.length] ?? null;
  return [
    { type: "hero", img: next(), showText: true },
    { type: "single", img: next(), showText: true, text: "In Liebe bewahrt." },
    { type: "duo", imgA: next(), imgB: next(), showText: true, text: "Vertraute Zeit." },
    { type: "single", img: next(), showText: true, text: "Unvergessen." },
    { type: "duo", imgA: next(), imgB: next(), showText: true, text: "Kleine Augenblicke." },
    { type: "single", img: next(), showText: true, text: "Im Herzen bewahrt." },
    { type: "close", showText: true },
  ];
}

interface AlbumShowcaseProps {
  theme: Theme;
  delay: number;
}

function AlbumShowcase({ theme }: AlbumShowcaseProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hovering, setHovering] = useState(false);

  const fireKey = (key: string) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  };

  const handleBack = () => fireKey('ArrowLeft');
  const handleForward = () => fireKey('ArrowRight');

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Phone frame — iframe gives album its own viewport so mobile CSS triggers.
          Width capped to viewport on small screens (avoid overflow under 380px). */}
      <div
        className="relative w-full"
        style={{
          maxWidth: 380,
          aspectRatio: '380 / 760',
          borderRadius: 44,
          boxShadow: '0 20px 60px rgba(0,0,0,0.22), 0 0 0 2px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <iframe
          ref={iframeRef}
          src={`/showcase/${theme}`}
          title={`${THEME_LABELS[theme]} Album Vorschau`}
          style={{
            width: '100%',
            height: '100%',
            border: 0,
            display: 'block',
            pointerEvents: hovering ? 'auto' : 'none',
          }}
        />

        {hovering && (
          <>
            <button
              onClick={handleBack}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur-sm transition-opacity hover:bg-white"
              aria-label="Zurück"
            >
              <ChevronLeft className="h-5 w-5 text-memorial-ink" />
            </button>
            <button
              onClick={handleForward}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur-sm transition-opacity hover:bg-white"
              aria-label="Weiter"
            >
              <ChevronRight className="h-5 w-5 text-memorial-ink" />
            </button>
          </>
        )}
      </div>

      <p className="mt-5 font-serif italic text-base text-memorial-ink-soft">
        {THEME_LABELS[theme]}
      </p>
    </div>
  );
}

export default function StyleShowcase() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url('/lovable-uploads/background_album.png')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--memorial-sepia-light) / 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 50% 100%, hsl(var(--memorial-bronze) / 0.18) 0%, transparent 60%),
            linear-gradient(180deg, hsl(var(--memorial-canvas) / 0.85) 0%, hsl(var(--memorial-canvas) / 0.7) 50%, hsl(var(--memorial-canvas) / 0.9) 100%)
          `,
        }}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="memorial-hairline" />
          <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft">
            Drei Stile
          </p>
          <h2 className="font-display mt-4 text-4xl text-memorial-ink sm:text-5xl">
            Jede Geschichte
            <br />
            <span className="font-serif italic text-memorial-bronze-deep">verdient ihren Ton.</span>
          </h2>
          <p className="mt-4 text-sm text-memorial-ink-soft">
            Fahren Sie über ein Album, um es selbst zu steuern.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-12 sm:flex-row sm:justify-center sm:gap-10 md:gap-14">
          {(["modern", "classic", "timeless"] as Theme[]).map((theme, i) => (
            <motion.div
              key={theme}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.12,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <AlbumShowcase theme={theme} delay={i * 1200} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/erstellen"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-memorial-ink underline decoration-memorial-ink/30 underline-offset-[6px] transition-all hover:decoration-memorial-ink"
          >
            Ihren Stil wählen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
