import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useContent } from "@/contexts/ContentContext";
import MemoryUploader from "@/components/MemoryUploader";
import { Helmet } from "react-helmet-async";

const Gedenken = () => {
  const { modeContent, isPetMode } = useContent();

  return (
    <div className="min-h-screen flex flex-col">


      {/* Meta Tags */}
      <Helmet>
        <title>{modeContent.gedenken.title}</title>
        <meta name="description" content={modeContent.gedenken.description} />
      </Helmet>

      <Navbar />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
            {modeContent.gedenken.heading}
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {modeContent.gedenken.description}
          </p>

          <MemoryUploader />
        </div>
      </section>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Gedenken;
