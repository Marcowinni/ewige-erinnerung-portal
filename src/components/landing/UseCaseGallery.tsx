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

// Subtle rotations for scattered polaroid look — alternating left/right tilt
const ROTATIONS = [-2.5, 2, -1.5, 2.5, -2, 1.8];

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
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas) / 0.5) 0%, hsl(var(--memorial-sepia-light) / 0.4) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: "url('/lovable-uploads/background_album.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
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

        {/* Polaroid grid — full image visible, handwritten label below */}
        <div className="mt-16 grid gap-y-10 gap-x-6 sm:gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {IMAGES.map((src, i) => {
            const rot = ROTATIONS[i] ?? 0;
            return (
              <motion.figure
                key={src}
                initial={{ opacity: 0, y: 28, rotate: rot * 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.08,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
                className="bg-white p-3 sm:p-4 pb-12 shadow-[0_14px_30px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.10)] mx-auto"
                style={{
                  maxWidth: 360,
                  width: "100%",
                  transformOrigin: "center",
                  transition: "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                <div className="relative w-full overflow-hidden bg-memorial-canvas" style={{ aspectRatio: "4 / 3" }}>
                  <img
                    src={src}
                    alt={labels[i]}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                <figcaption
                  className="mt-3 text-center"
                  style={{
                    fontFamily: "'Caveat', cursive, var(--cpa-f-display)",
                    fontSize: "1.5rem",
                    color: "#2a2118",
                    lineHeight: 1.1,
                  }}
                >
                  {labels[i]}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
