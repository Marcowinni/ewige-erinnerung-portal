import { motion } from "motion/react";
import { Heart, PawPrint } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

export default function AudienceSection() {
  const { sharedContent } = useContent();
  const t = sharedContent.landing.audience;
  const audiences = [
    {
      icon: Heart,
      eyebrow: t.human.eyebrow,
      headline: t.human.headline,
      body: t.human.body,
      wrapClass: "bg-memorial-bronze/10 text-memorial-bronze-deep",
      bgImage: "/lovable-uploads/background_human.png",
    },
    {
      icon: PawPrint,
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
                <p className="mt-5 text-[15px] leading-relaxed text-memorial-ink-soft">
                  {a.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
