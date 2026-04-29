import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import { useContent } from "@/contexts/ContentContext";

export default function PathChoice() {
  const { sharedContent } = useContent();
  const t = sharedContent.landing.pathChoice;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {/* autoplay blocked */});
    setPlaying(true);
  };
  return (
    <section className="relative py-28 sm:py-36 memorial-canvas overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: "url('/lovable-uploads/background_album.png')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas) / 0.92) 0%, hsl(var(--memorial-canvas) / 0.7) 50%, hsl(var(--memorial-canvas) / 0.92) 100%)",
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
            <span className="font-display-italic">{t.titleLine2}</span>
          </h2>
        </motion.div>

        {/* Placeholder video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        >
          <video
            ref={videoRef}
            src="/video_howitworks.mp4"
            playsInline
            preload="metadata"
            controls={playing}
            onEnded={() => setPlaying(false)}
            className="w-full object-cover aspect-video bg-black"
          />

          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Video abspielen"
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            >
              <span className="absolute inset-0 bg-memorial-ink/35 transition-colors group-hover:bg-memorial-ink/45" />
              <span
                className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white/95 text-memorial-bronze-deep shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105 group-active:scale-95"
              >
                <Play className="h-9 w-9 sm:h-10 sm:w-10 fill-current translate-x-[2px]" strokeWidth={0} />
              </span>
            </button>
          )}
        </motion.div>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/erstellen"
            className="memorial-cta memorial-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-sm font-medium"
          >
            {t.ctaCreate}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
