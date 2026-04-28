import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[100dvh] w-full overflow-hidden memorial-canvas">
      {/* Subtle warm gradient backdrop — memorial tones (theme-aware) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 30%, hsl(var(--memorial-canvas)) 0%, hsl(var(--memorial-canvas) / 0.92) 40%, hsl(var(--memorial-sepia-light) / 0.45) 75%, hsl(var(--memorial-sepia-light) / 0.6) 100%)
          `,
        }}
      />
      {/* Soft floating light orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 35% 30% at 18% 22%, hsl(var(--memorial-bronze) / 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 30% 28% at 82% 78%, hsl(var(--memorial-sage) / 0.16) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 70% 12%, hsl(var(--memorial-canvas) / 0.4) 0%, transparent 60%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container relative mx-auto flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft"
        >
          <span className="h-px w-8 bg-memorial-ink-soft/50" />
          <span>Memora Moments</span>
          <span className="h-px w-8 bg-memorial-ink-soft/50" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.08 }}
          className="font-display mt-8 text-[clamp(3rem,9vw,7.5rem)] leading-[0.98] text-memorial-ink"
        >
          Ein Moment.
          <br />
          <span className="font-serif italic text-memorial-bronze-deep">
            Für immer.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-memorial-ink-soft sm:text-lg"
        >
          Ein würdevoller Smart Tag. Ein lebendiges digitales Fotoalbum.
          <br className="hidden sm:block" />
          Für die Menschen und Tiere, die bleiben.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.32 }}
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <Link
            to="/erstellen"
            className="memorial-cta memorial-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Album selbst erstellen
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="memorial-scroll-hint" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
