import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const BestellungAbgebrochen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center text-center py-32 bg-background">
        <div className="container mx-auto px-4">
          <XCircle className="w-24 h-24 text-destructive mx-auto mb-6" />
          <h1 className="text-4xl font-serif mb-4">Bestellung abgebrochen</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Der Bezahlvorgang wurde abgebrochen. Ihr Warenkorb wurde gespeichert.
          </p>
          <Button asChild size="lg">
            <Link to="/gedenken">Zurück zum Warenkorb</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default BestellungAbgebrochen;