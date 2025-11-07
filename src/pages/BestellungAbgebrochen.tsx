import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { Helmet } from 'react-helmet-async';

const BestellungAbgebrochen = () => {
  // Holt die Texte für die aktuell ausgewählte Sprache
  const { sharedContent } = useContent();
  const copy = sharedContent.orderCancelPage;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Helmet für SEO und Browser-Tab-Titel */}
      <Helmet>
        <title>{copy.title}</title>
        <meta name="description" content={copy.heading} />
      </Helmet>

      <Navbar />
      <main className="flex-grow flex items-center justify-center text-center py-32 bg-background">
        <div className="container mx-auto px-4">
          <XCircle className="w-24 h-24 text-destructive mx-auto mb-6" />
          
          {/* Texte aus dem ContentContext */}
          <h1 className="text-4xl font-serif mb-4">{copy.heading}</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            {copy.message}
          </p>
          <Button asChild size="lg">
            <Link to="/gedenken">{copy.buttonBack}</Link>
          </Button>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BestellungAbgebrochen;