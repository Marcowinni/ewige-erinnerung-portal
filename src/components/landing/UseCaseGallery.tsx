import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const IMAGES = [
  "/bilderhomepage/human/hf_20260428_090719_13674779-7832-434e-8c31-404a3a042ba6.png",
  "/bilderhomepage/pet/hf_20260428_092241_9cc35e11-ae7e-42ca-afde-32819c21e21e.png",
  "/bilderhomepage/human/hf_20260428_091801_63c3f186-dc0f-4436-8d18-c3d8c16bd62e.png",
  "/bilderhomepage/pet/hf_20260428_092255_343a522e-dfcb-49a3-a00a-a89be2ae6785.png",
  "/bilderhomepage/human/hf_20260428_100308_77b1614e-a110-4648-aaad-9fb4c0c29b65.png",
  "/bilderhomepage/pet/hf_20260428_101553_baa525a1-dbd5-45bb-9fa5-6c8e0e8c12b0.png",
];

export default function UseCaseGallery() {
  const { sharedContent } = useContent();
  const t = sharedContent.landing.useCaseGallery;
  const labels = [
    t.cases.gravestone,
    t.cases.urn,
    t.cases.memorialWall,
    t.cases.keepsake,
    t.cases.petCorner,
    t.cases.photoFrame,
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slack = 4;
    setCanPrev(el.scrollLeft > slack);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - slack);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [updateBounds]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas)) 0%, hsl(var(--memorial-sepia-light) / 0.35) 100%)",
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
          <p className="mt-6 text-[15px] leading-relaxed text-memorial-ink-soft">
            {t.intro}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mt-16 max-w-6xl mx-auto">
          {/* Edge fade overlays */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[hsl(var(--memorial-canvas))] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[hsl(var(--memorial-sepia-light)/0.35)] to-transparent"
          />

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {IMAGES.map((src, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.figure
                  key={src}
                  data-card
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="snap-start shrink-0 group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_22px_44px_rgba(0,0,0,0.12)]"
                  style={{
                    flexBasis:
                      "calc((100% - 1.5rem) / 1.15)",
                  }}
                >
                  <div className="hidden sm:block lg:hidden absolute inset-0 -z-10" />
                  <span className="absolute top-4 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm font-display text-[13px] tracking-wide text-memorial-ink shadow-sm">
                    {num}
                  </span>

                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
                    <img
                      src={src}
                      alt={labels[i]}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <figcaption className="px-5 py-4 sm:px-6 sm:py-5 border-t border-memorial-line/30">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-memorial-ink-soft block">
                      {t.eyebrow}
                    </span>
                    <span className="mt-1 block font-display text-lg sm:text-xl text-memorial-ink leading-snug">
                      {labels[i]}
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          {/* Responsive widths via CSS — overrides inline flexBasis at breakpoints */}
          <style>{`
            @media (min-width: 640px) {
              [data-card] { flex-basis: calc((100% - 1.5rem * 1) / 2) !important; }
            }
            @media (min-width: 900px) {
              [data-card] { flex-basis: calc((100% - 1.5rem * 2) / 3) !important; }
            }
            @media (min-width: 1100px) {
              [data-card] { flex-basis: calc((100% - 1.5rem * 3) / 4) !important; }
            }
          `}</style>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Vorheriges Beispiel"
              className="grid place-items-center h-11 w-11 rounded-full border border-memorial-line/60 bg-white/80 backdrop-blur-sm text-memorial-ink transition-all duration-300 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Nächstes Beispiel"
              className="grid place-items-center h-11 w-11 rounded-full border border-memorial-line/60 bg-white/80 backdrop-blur-sm text-memorial-ink transition-all duration-300 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
