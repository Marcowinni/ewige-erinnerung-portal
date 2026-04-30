import { motion } from "motion/react";
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

        <div className="mt-16 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {IMAGES.map((src, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.figure
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_18px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_28px_60px_rgba(0,0,0,0.16)] hover:-translate-y-1"
              >
                {/* Number badge */}
                <span className="absolute top-4 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm font-display text-[13px] tracking-wide text-memorial-ink shadow-sm">
                  {num}
                </span>

                {/* Image — full visible, slight zoom on hover */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
                  <img
                    src={src}
                    alt={labels[i]}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.05]"
                  />
                </div>

                {/* Clean caption strip below image */}
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
      </div>
    </section>
  );
}
