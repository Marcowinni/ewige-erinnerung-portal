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
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas) / 0.4) 0%, hsl(var(--memorial-sepia-light) / 0.35) 100%)",
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {IMAGES.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.07,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="group relative overflow-hidden rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.10)]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-memorial-canvas">
                <img
                  src={src}
                  alt={labels[i]}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-5 py-4">
                <span className="font-display-italic text-white text-[15px] sm:text-base drop-shadow">
                  {labels[i]}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
