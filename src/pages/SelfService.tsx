import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerUpload from "@/components/CustomerUpload";

export default function SelfService() {
  return (
    <div className="memorial-canvas min-h-screen">
      <Helmet>
        <title>Bilder hochladen — Memora Moments</title>
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-memorial-ink-soft transition-colors hover:text-memorial-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="mx-auto max-w-2xl text-center mb-14"
          >
            <div className="memorial-hairline" />
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft">
              Ihr Album beginnt hier
            </p>
            <h1 className="font-display mt-4 text-5xl text-memorial-ink sm:text-6xl">
              Ihr Album beginnt{" "}
              <span className="font-display-italic">hier.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-memorial-ink-soft sm:text-lg">
              Sie laden Ihre Fotos hoch — wir gestalten Ihr Album mit Sorgfalt.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <CustomerUpload />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
