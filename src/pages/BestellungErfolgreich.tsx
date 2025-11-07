import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { Helmet } from 'react-helmet-async';

// Hilfsfunktion zum Leeren des Carts (aus MemoryUploader kopiert)
function clearPersisted() {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("memora:memoryUploader:v1");
    }
  } catch (e) {
    console.error("Failed to clear persisted state", e);
  }
}

const BestellungErfolgreich = () => {
  // NEU: Inhalte für die aktuelle Sprache holen
  const { sharedContent } = useContent();
  const copy = sharedContent.orderSuccessPage;

  // Leert den Warenkorb (bleibt gleich)
  useEffect(() => {
    clearPersisted();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* NEU: Helmet für SEO und Browser-Tab */}
      <Helmet>
        <title>{copy.title}</title>
        <meta name="description" content={copy.heading} />
      </Helmet>

      <Navbar />
      <main className="flex-grow flex items-center justify-center text-center py-32 bg-background">
        <div className="container mx-auto px-4">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          
          {/* NEU: Texte aus 'copy'-Objekt */}
          <h1 className="text-4xl font-serif mb-4">{copy.heading}</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            {copy.message1}
            <br />
          </p>
          <Button asChild size="lg">
            <Link to="/">{copy.buttonHome}</Link>
          </Button>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BestellungErfolgreich;