import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import PathChoice from "@/components/landing/PathChoice";
import AudienceSection from "@/components/landing/AudienceSection";
import StyleShowcase from "@/components/landing/StyleShowcase";
import HomepageCarousel from "@/components/landing/HomepageCarousel";
import PartnerSection from "@/components/landing/PartnerSection";

export default function Landing() {
  return (
    <div className="memorial-canvas min-h-screen">
      <Helmet>
        <title>Memora Moments — Ein Moment. Für immer.</title>
        <meta
          name="description"
          content="Ein würdevoller Smart Tag und ein lebendiges digitales Fotoalbum. Für Menschen und Tiere, die in Erinnerung bleiben."
        />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <PathChoice />
        <AudienceSection />
        <StyleShowcase />
        <PartnerSection />
        <HomepageCarousel />
      </main>
      <Footer />
    </div>
  );
}
