import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import MemoryUploader from "@/components/MemoryUploader";
import TagDesigner from "@/components/TagDesigner";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";

const Gedenken = () => {
  const { modeContent, isPetMode, t } = useContent();
  const [productType, setProductType] = useState<"basic" | "premium">("basic");

  return (
    <>
      <Helmet>
        <title>{modeContent.gedenken.title}</title>
        <meta name="description" content={modeContent.gedenken.description} />
        <link rel="canonical" href="/gedenken" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-16">
          <div className="container mx-auto px-4">
            <header className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif mb-4">
                {modeContent.gedenken.heading}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {modeContent.gedenken.description}
              </p>
            </header>

            {/* Product selection */}
            <section className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-serif mb-4">{isPetMode ? "Produkt wählen (Haustiere)" : "Produkt wählen (Menschen)"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className={`text-left border rounded-lg p-5 transition-colors ${productType === "basic" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`}
                  onClick={() => setProductType("basic")}
                >
                  <div className="text-sm text-muted-foreground mb-1">{isPetMode ? "Memora Tag (rund 3cm)" : "Memora Tag (6×6cm)"}</div>
                  <div className="text-xl font-serif">{modeContent.products.basic.title}</div>
                  <p className="text-sm text-muted-foreground mt-2">{modeContent.products.basic.desc}</p>
                </button>
                <button
                  className={`text-left border rounded-lg p-5 transition-colors ${productType === "premium" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`}
                  onClick={() => setProductType("premium")}
                >
                  <div className="text-sm text-muted-foreground mb-1">Memora Frame</div>
                  <div className="text-xl font-serif">{modeContent.products.premium.title}</div>
                  <p className="text-sm text-muted-foreground mt-2">{modeContent.products.premium.desc}</p>
                </button>
              </div>
            </section>

            {/* Tag designer for Memora Tag */}
            {productType === "basic" && (
              <section className="max-w-5xl mx-auto mb-16">
                <h2 className="text-2xl font-serif mb-4">{isPetMode ? "Gestalte deinen 3cm Memora Tag" : "Gestalte deinen 6×6cm Memora Tag"}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {isPetMode
                    ? "Füge ein Bild hinzu und platziere deinen Text frei auf dem runden Tag."
                    : "Füge ein Bild hinzu und platziere deinen Text frei auf dem rechteckigen Tag."}
                </p>
                <TagDesigner shape={isPetMode ? "round" : "square"} />
              </section>
            )}

            {/* Memory uploader (bestehende Schritte) */}
            <section className="max-w-5xl mx-auto">
              <MemoryUploader />
            </section>
          </div>
        </main>
        
        <Footer />
        <DarkModeToggle />
      </div>
    </>
  );
};

export default Gedenken;
