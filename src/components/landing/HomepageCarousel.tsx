import { motion } from "motion/react";

const IMAGES = [
  "/bilderhomepage/human/hf_20260428_090719_13674779-7832-434e-8c31-404a3a042ba6.png",
  "/bilderhomepage/pet/hf_20260428_092241_9cc35e11-ae7e-42ca-afde-32819c21e21e.png",
  "/bilderhomepage/human/hf_20260428_091801_63c3f186-dc0f-4436-8d18-c3d8c16bd62e.png",
  "/bilderhomepage/pet/hf_20260428_092255_343a522e-dfcb-49a3-a00a-a89be2ae6785.png",
  "/bilderhomepage/human/hf_20260428_100308_77b1614e-a110-4648-aaad-9fb4c0c29b65.png",
  "/bilderhomepage/pet/hf_20260428_101553_baa525a1-dbd5-45bb-9fa5-6c8e0e8c12b0.png",
];

// Duplicate the strip so the marquee loops seamlessly
const TRACK = [...IMAGES, ...IMAGES];

export default function HomepageCarousel() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas) / 0) 0%, hsl(var(--memorial-canvas) / 0.6) 50%, hsl(var(--memorial-canvas) / 0) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative"
      >
        {/* Edge fades blend into background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--memorial-canvas)) 0%, hsl(var(--memorial-canvas) / 0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
          style={{
            background:
              "linear-gradient(270deg, hsl(var(--memorial-canvas)) 0%, hsl(var(--memorial-canvas) / 0) 100%)",
          }}
        />

        <div className="hpc-marquee">
          <div className="hpc-track">
            {TRACK.map((src, i) => (
              <div key={i} className="hpc-item">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        .hpc-marquee {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .hpc-track {
          display: flex;
          width: max-content;
          animation: hpc-scroll 60s linear infinite;
          will-change: transform;
        }
        /* Use margin-right (not flex gap) so each item slot has equal width
           including its trailing space — translateX(-50%) lands exactly on the
           start of the cloned half, no visual jump on loop. */
        .hpc-item {
          flex: 0 0 auto;
          width: clamp(180px, 22vw, 260px);
          margin-right: 24px;
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.10), 0 0 0 1px rgba(0, 0, 0, 0.04);
          background: hsl(var(--memorial-canvas));
          opacity: 0.92;
        }
        .hpc-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.92) contrast(0.98);
        }
        @keyframes hpc-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hpc-track { animation-duration: 180s; }
        }
      `}</style>
    </section>
  );
}
