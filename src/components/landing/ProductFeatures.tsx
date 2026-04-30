import { motion } from "motion/react";
import { Droplets, Anchor, Award, Pencil, Lock, Layers } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

export default function ProductFeatures() {
  const { sharedContent } = useContent();
  const t = sharedContent.landing.productFeatures;

  const features = [
    { icon: Droplets, ...t.items.waterproof },
    { icon: Anchor, ...t.items.adhesive },
    { icon: Award, ...t.items.quality },
    { icon: Pencil, ...t.items.personal },
    { icon: Lock, ...t.items.privateUrl },
    { icon: Layers, ...t.items.versatile },
  ];

  return (
    <section className="relative py-20 sm:py-28 memorial-canvas">
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="memorial-card rounded-2xl p-7 sm:p-8 border border-memorial-line/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-memorial-bronze/10 text-memorial-bronze-deep">
                  <Icon className="h-5 w-5" strokeWidth={1.4} />
                </div>
                <h3 className="font-display mt-5 text-xl text-memorial-ink leading-snug">
                  {f.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-memorial-ink-soft">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
