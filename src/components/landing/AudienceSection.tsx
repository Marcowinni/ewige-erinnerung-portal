import { motion } from "motion/react";
import { Heart, PawPrint } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

// 3D Smart Tag — uses real product image, floats with 3D-like shadow + animation.
// Positioned to overlap the card edge so it pops out.
function SmartTag3D({ variant }: { variant: "human" | "pet" }) {
  const src =
    variant === "human"
      ? "/vorschaubilder/tag-default-round.png"
      : "/vorschaubilder/pet-tag-default-round.png";
  return (
    <div className="smart-tag-3d" data-variant={variant} aria-hidden>
      <img src={src} alt="" draggable={false} />
      <div className="smart-tag-3d__shadow" />

      <style>{`
        .smart-tag-3d {
          position: absolute;
          top: -32px;
          right: -28px;
          width: 140px;
          height: 140px;
          z-index: 5;
          pointer-events: none;
          animation: tag-float 5s ease-in-out infinite;
          transform-origin: center;
        }
        /* Gold halo behind tag — pulses subtly to feel like NFC glow */
        .smart-tag-3d::before {
          content: "";
          position: absolute;
          inset: -14%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(240,177,52,0.45) 0%, rgba(240,177,52,0.18) 40%, rgba(240,177,52,0) 70%);
          filter: blur(8px);
          z-index: -1;
          animation: tag-glow 3.5s ease-in-out infinite;
        }
        .smart-tag-3d img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          border-radius: 50%;
          filter: drop-shadow(0 14px 24px rgba(0,0,0,0.4))
                  drop-shadow(0 4px 8px rgba(0,0,0,0.25));
        }
        .smart-tag-3d__shadow {
          position: absolute;
          left: 18%;
          right: 18%;
          bottom: 0;
          height: 10px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%);
          filter: blur(3px);
          z-index: -2;
          animation: tag-shadow 5s ease-in-out infinite;
        }

        @keyframes tag-glow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.95; transform: scale(1.08); }
        }

        @keyframes tag-float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%       { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes tag-shadow {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50%       { transform: scale(0.8); opacity: 0.5; }
        }

        @media (max-width: 640px) {
          .smart-tag-3d {
            width: 100px;
            height: 100px;
            top: -22px;
            right: -18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smart-tag-3d, .smart-tag-3d__shadow { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default function AudienceSection() {
  const { sharedContent } = useContent();
  const t = sharedContent.landing.audience;
  const audiences = [
    {
      icon: Heart,
      tagVariant: "human" as const,
      eyebrow: t.human.eyebrow,
      headline: t.human.headline,
      body: t.human.body,
      wrapClass: "bg-memorial-bronze/10 text-memorial-bronze-deep",
      bgImage: "/lovable-uploads/background_human.png",
    },
    {
      icon: PawPrint,
      tagVariant: "pet" as const,
      eyebrow: t.pet.eyebrow,
      headline: t.pet.headline,
      body: t.pet.body,
      wrapClass: "bg-memorial-sage/10 text-memorial-sage-deep",
      bgImage: "/lovable-uploads/background_pet.png",
    },
  ];

  return (
    <section className="relative py-28 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas)) 0%, hsl(32, 30%, 93%) 100%)",
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

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {audiences.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.eyebrow}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.1,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="relative"
              >
                {/* Smart tag pops outside card via overflow:visible wrapper */}
                <SmartTag3D variant={a.tagVariant} />

                <div className="memorial-card relative overflow-hidden rounded-[28px] p-10 sm:p-12">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.16]"
                    style={{ backgroundImage: `url('${a.bgImage}')` }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                      background: `linear-gradient(180deg, hsl(var(--memorial-canvas) / 0.6) 0%, hsl(var(--memorial-canvas) / 0.82) 70%, hsl(var(--memorial-sepia-light) / 0.55) 100%)`,
                    }}
                  />

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full ${a.wrapClass}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-memorial-ink-soft">
                    {a.eyebrow}
                  </p>
                  <h3 className="font-display mt-3 whitespace-pre-line text-3xl leading-tight text-memorial-ink sm:text-4xl">
                    {a.headline}
                  </h3>
                  {a.body && (
                    <p className="mt-5 text-[15px] leading-relaxed text-memorial-ink-soft">
                      {a.body}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
