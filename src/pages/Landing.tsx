import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import PathChoice from "@/components/landing/PathChoice";
import AudienceSection from "@/components/landing/AudienceSection";
import StyleShowcase from "@/components/landing/StyleShowcase";
import HomepageCarousel from "@/components/landing/HomepageCarousel";
import PartnerSection from "@/components/landing/PartnerSection";
import { useContent } from "@/contexts/ContentContext";

export default function Landing() {
  const { sharedContent } = useContent();
  const meta = sharedContent.meta.landing;
  return (
    <div className="memorial-canvas min-h-screen">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
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
