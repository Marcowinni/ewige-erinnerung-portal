import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Heart, PawPrint } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useContent } from "@/contexts/ContentContext";

type ShowcaseMode = "human" | "pet";

type Theme = "modern" | "classic" | "timeless";

// QR codes always point at the production domain so we don't have to
// regenerate / reprint anything once we move off the preview deployment.
const PROD_BASE = "https://memora-moments.ch";

const SLUG_BY_THEME_MODE: Record<Theme, Record<ShowcaseMode, string>> = {
  modern: { human: "MODERN-MENSCH", pet: "MODERN-TIER" },
  classic: { human: "KLASSISCH-MENSCH", pet: "KLASSISCH-TIER" },
  timeless: { human: "ZEITLOS-MENSCH", pet: "ZEITLOS-TIER" },
};

interface AlbumShowcaseProps {
  theme: Theme;
  mode: ShowcaseMode;
  delay: number;
}

function AlbumShowcase({ theme, mode }: AlbumShowcaseProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hovering, setHovering] = useState(false);
  const { sharedContent } = useContent();
  const t = sharedContent.landing.styleShowcase;
  const themeLabel = t.themes[theme];

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
          src={`/showcase/${theme}?mode=${mode}`}
          title={t.previewTitle(themeLabel)}
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
              aria-label={t.navBack}
            >
              <ChevronLeft className="h-5 w-5 text-memorial-ink" />
            </button>
            <button
              onClick={handleForward}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur-sm transition-opacity hover:bg-white"
              aria-label={t.navForward}
            >
              <ChevronRight className="h-5 w-5 text-memorial-ink" />
            </button>
          </>
        )}
      </div>

      <p className="mt-5 font-serif italic text-base text-memorial-ink-soft">
        {themeLabel}
      </p>
    </div>
  );
}

export default function StyleShowcase() {
  const { sharedContent } = useContent();
  const t = sharedContent.landing.styleShowcase;
  const modeLabels = sharedContent.navigation.mode;
  const [mode, setMode] = useState<ShowcaseMode>("human");
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
            {t.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-4xl text-memorial-ink sm:text-5xl">
            {t.titleLine1}
            <br />
            <span className="font-serif italic text-memorial-bronze-deep">{t.titleLine2}</span>
          </h2>
          <p className="mt-4 text-sm text-memorial-ink-soft">
            {t.hint}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10 flex justify-center"
        >
          <div
            role="tablist"
            aria-label="Modus"
            className="inline-flex items-center gap-1 rounded-full border border-memorial-line bg-white/70 p-1 backdrop-blur-sm shadow-sm"
          >
            {([
              { id: "human" as const, icon: Heart, label: modeLabels.human },
              { id: "pet" as const, icon: PawPrint, label: modeLabels.pet },
            ]).map(({ id, icon: Icon, label }) => {
              const active = mode === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(id)}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all",
                    active
                      ? "bg-memorial-bronze-deep text-white shadow"
                      : "text-memorial-ink-soft hover:text-memorial-ink",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-12 sm:flex-row sm:justify-center sm:gap-10 md:gap-14">
          {(["modern", "classic", "timeless"] as Theme[]).map((theme, i) => (
            <motion.div
              key={`${theme}-${mode}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.12,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <AlbumShowcase theme={theme} mode={mode} delay={i * 1200} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <div className="memorial-hairline" />
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft">
              In echt erleben
            </p>
            <h3 className="font-display mt-3 text-2xl text-memorial-ink sm:text-3xl">
              Album auf dem Handy ansehen
            </h3>
            <p className="mt-3 text-sm text-memorial-ink-soft">
              Code scannen oder direkt öffnen — fühlt sich genau so an wie das spätere Original.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8 max-w-4xl mx-auto">
            {(["modern", "classic", "timeless"] as Theme[]).map((theme) => {
              const slug = SLUG_BY_THEME_MODE[theme][mode];
              const url = `${PROD_BASE}/album/${slug}`;
              const label = t.themes[theme];
              return (
                <div
                  key={`${theme}-${mode}-qr`}
                  className="memorial-card flex flex-col items-center rounded-2xl px-6 py-7 text-center"
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-memorial-ink-soft">
                    {label}
                  </p>
                  <div className="mt-4 rounded-xl bg-white p-3 shadow-sm ring-1 ring-memorial-line/40">
                    <QRCodeSVG
                      value={url}
                      size={132}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="hsl(var(--memorial-ink))"
                    />
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-memorial-ink underline decoration-memorial-ink/30 underline-offset-4 transition-all hover:decoration-memorial-ink"
                  >
                    Album öffnen
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </a>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-memorial-ink-soft">
                    /album/{slug}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

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
            {t.ctaPickStyle}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
