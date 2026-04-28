import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PathChoice() {
  return (
    <section className="relative py-28 sm:py-36 memorial-canvas overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: "url('/lovable-uploads/background_album.png')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--memorial-canvas) / 0.92) 0%, hsl(var(--memorial-canvas) / 0.7) 50%, hsl(var(--memorial-canvas) / 0.92) 100%)",
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
            So funktionierts!
          </p>
          <h2 className="font-display mt-4 text-4xl text-memorial-ink sm:text-5xl">
            Jeder Moment
            <br />
            <span className="font-display-italic">verdient seinen Platz.</span>
          </h2>
        </motion.div>

        {/* Placeholder video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        >
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover aspect-video"
            aria-hidden
          />
        </motion.div>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/erstellen"
            className="memorial-cta memorial-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-sm font-medium"
          >
            Album erstellen
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
