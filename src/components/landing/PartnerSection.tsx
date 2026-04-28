import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import MemoraLogo from "@/components/MemoraLogo";
import { useContent } from "@/contexts/ContentContext";

export default function PartnerSection() {
  const { sharedContent } = useContent();
  const t = sharedContent.landing.partner;
  return (
    <section className="relative overflow-hidden py-28 sm:py-32 memorial-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.1]"
        style={{ backgroundImage: "url('/lovable-uploads/background_album.png')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas) / 0.92) 0%, hsl(var(--memorial-sepia-light) / 0.45) 50%, hsl(var(--memorial-canvas) / 0.92) 100%)",
        }}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-4xl"
        >
          <div className="memorial-card rounded-[32px] p-10 text-center sm:p-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft">
              {t.eyebrow}
            </p>
            <h2 className="font-display mt-4 text-3xl text-memorial-ink sm:text-5xl">
              {t.titleLine1}
              <br />
              <span className="font-serif italic text-memorial-bronze-deep">
                {t.titleLine2}
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-memorial-ink-soft">
              {t.body}
            </p>

            <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
              <div className="flex items-center gap-2 text-memorial-bronze-deep">
                <MemoraLogo className="h-9 w-9 sm:h-12 sm:w-12" />
                <span className="font-display text-2xl tracking-wide text-memorial-ink sm:text-3xl">
                  Memora <span className="font-serif italic text-memorial-bronze-deep">Moments</span>
                </span>
              </div>
              <span className="hidden sm:block h-px w-12 bg-memorial-line sm:w-20" />
              <span className="sm:hidden h-px w-20 bg-memorial-line" />
              <img
                src="/lovable-uploads/flueckiger-logo.png"
                alt="Flückiger Zeichnungsverlag"
                className="h-10 w-auto max-w-[80%] object-contain sm:h-16"
                loading="lazy"
              />
            </div>

            <div className="mt-10">
              <a
                href="https://www.zeichnungsverlag.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="memorial-cta memorial-cta-ghost inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium"
              >
                {t.cta}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
