import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useContent } from "@/contexts/ContentContext";
import MemoryUploader from "@/components/MemoryUploader";

const Gedenken = () => {
  const { modeContent, isPetMode } = useContent();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
            {isPetMode ? "Gedenken für Ihr Haustier" : modeContent.gedenken.heading}
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
