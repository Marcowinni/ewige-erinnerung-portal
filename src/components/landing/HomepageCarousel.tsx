import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const IMAGES = [
  "/bilderhomepage/human/hf_20260428_090719_13674779-7832-434e-8c31-404a3a042ba6.png",
  "/bilderhomepage/pet/hf_20260428_092241_9cc35e11-ae7e-42ca-afde-32819c21e21e.png",
  "/bilderhomepage/human/hf_20260428_091801_63c3f186-dc0f-4436-8d18-c3d8c16bd62e.png",
  "/bilderhomepage/pet/hf_20260428_092255_343a522e-dfcb-49a3-a00a-a89be2ae6785.png",
  "/bilderhomepage/human/hf_20260428_100308_77b1614e-a110-4648-aaad-9fb4c0c29b65.png",
  "/bilderhomepage/pet/hf_20260428_101553_baa525a1-dbd5-45bb-9fa5-6c8e0e8c12b0.png",
];

const TRACK = [...IMAGES, ...IMAGES];

export default function HomepageCarousel() {
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!openSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSrc(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openSrc]);

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

        <div className={`hpc-marquee ${openSrc ? "hpc-paused" : ""}`}>
          <div className="hpc-track">
            {TRACK.map((src, i) => (
              <button
                type="button"
                key={i}
                className="hpc-item"
                onClick={() => setOpenSrc(src)}
                aria-label="Bild vergrössern"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {openSrc && (
          <motion.div
            key="hpc-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setOpenSrc(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setOpenSrc(null)}
              aria-label="Schliessen"
              className="absolute right-4 top-4 sm:right-6 sm:top-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <motion.img
              key={openSrc}
              src={openSrc}
              alt=""
              draggable={false}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                maxWidth: "min(100vw, 100%)",
                maxHeight: "min(100vh, 100%)",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
        .hpc-marquee:hover .hpc-track,
        .hpc-paused .hpc-track {
          animation-play-state: paused;
        }
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
          padding: 0;
          border: 0;
          cursor: zoom-in;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, box-shadow 0.4s ease;
        }
        .hpc-item:hover {
          opacity: 1;
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        .hpc-item:focus-visible {
          outline: 2px solid hsl(var(--memorial-bronze));
          outline-offset: 3px;
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
