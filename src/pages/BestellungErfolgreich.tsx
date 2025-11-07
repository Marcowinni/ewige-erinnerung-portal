import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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
  // Leert den Warenkorb, sobald die Seite geladen wird
  useEffect(() => {
    clearPersisted();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center text-center py-32 bg-background">
        <div className="container mx-auto px-4">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-serif mb-4">Vielen Dank für Ihre Bestellung!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Wir haben Ihre Bestellung erhalten und werden sie so schnell wie möglich bearbeiten.
            Eine Bestätigung wurde soeben an Ihre E-Mail-Adresse gesendet.
          </p>
          <Button asChild size="lg">
            <Link to="/">Zur Startseite</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default BestellungErfolgreich;