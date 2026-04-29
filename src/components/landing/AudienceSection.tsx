import { motion } from "motion/react";
import { Heart, PawPrint } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

// 3D Smart Tag — round black puck with gold motif. Two variants: human (candle), pet (paw-heart).
function SmartTag3D({ variant }: { variant: "human" | "pet" }) {
  return (
    <div className="smart-tag-3d" data-variant={variant} aria-hidden>
      <div className="smart-tag-3d__face">
        {variant === "human" ? (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Candle */}
            <path
              d="M50 22c-2 4-5 6-5 11 0 3 2.2 5 5 5s5-2 5-5c0-5-3-7-5-11z"
              fill="#f0b134"
            />
            <rect x="42" y="42" width="16" height="34" rx="3" fill="#f0b134" />
            <ellipse cx="50" cy="42" rx="8" ry="2.5" fill="#d49422" />
            <line x1="50" y1="38" x2="50" y2="44" stroke="#3a2a14" strokeWidth="1.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heart with pet silhouettes */}
            <path
              d="M50 78c-12-8-22-16-22-28a10 10 0 0 1 20-2 10 10 0 0 1 20 2c0 12-10 20-22 28h4z"
              stroke="#f0b134"
              strokeWidth="3.5"
              fill="none"
            />
            {/* Dog silhouette */}
            <path
              d="M37 50c0-3 1-5 3-7l3 3-1 5 4-2 2 5v6h-5l-2 2h-3z"
              fill="#f0b134"
            />
            {/* Cat silhouette */}
            <path
              d="M58 50l3-4 1 4 4 1-2 4 1 5h-7l-1-4z"
              fill="#f0b134"
            />
          </svg>
        )}
      </div>
      <div className="smart-tag-3d__shine" />
      <div className="smart-tag-3d__shadow" />

      <style>{`
        .smart-tag-3d {
          position: relative;
          width: 84px;
          height: 84px;
          flex-shrink: 0;
          transform-style: preserve-3d;
          animation: tag-float 5s ease-in-out infinite;
        }
        .smart-tag-3d__face {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 25%, #3a3a3a 0%, #1a1a1a 45%, #050505 100%);
          box-shadow:
            0 14px 30px rgba(0,0,0,0.45),
            0 4px 10px rgba(0,0,0,0.35),
            inset 0 -2px 6px rgba(0,0,0,0.6),
            inset 0 2px 4px rgba(255,255,255,0.08);
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .smart-tag-3d__face svg {
          width: 60%;
          height: 60%;
          filter: drop-shadow(0 2px 4px rgba(240,177,52,0.35));
        }
        .smart-tag-3d__shine {
          position: absolute;
          inset: 4px 4px auto 4px;
          height: 35%;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          opacity: 0.7;
        }
        .smart-tag-3d__shadow {
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: -10px;
          height: 8px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%);
          filter: blur(2px);
          animation: tag-shadow 5s ease-in-out infinite;
        }

        @keyframes tag-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%       { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes tag-shadow {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50%       { transform: scale(0.85); opacity: 0.55; }
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
                className="memorial-card relative overflow-hidden rounded-[28px] p-10 sm:p-12"
              >
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

                <div className="flex items-start justify-between gap-6">
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full ${a.wrapClass}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <SmartTag3D variant={a.tagVariant} />
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
