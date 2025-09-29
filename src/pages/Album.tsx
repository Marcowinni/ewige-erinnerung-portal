import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Lade-Spinner Komponente
const Spinner = () => (
  <div className="flex justify-center items-center h-screen bg-background">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  </div>
);

// Fehler-Komponente
const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="min-h-screen flex items-center justify-center text-center text-red-500 bg-background p-4">
        <div>
            <h1 className="text-2xl font-bold">Fehler</h1>
            <p>{message}</p>
        </div>
    </div>
);

const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumData, setAlbumData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!albumId) {
      setError("Keine Album-ID in der URL gefunden.");
      setLoading(false);
      return;
    }

    const fetchAlbumData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('canva_link, subject_details')
        .eq('id', albumId)
        .single();

      if (error || !data) {
        console.error("Fehler beim Abrufen des Album-Links:", error);
        setError("Dieses Album konnte nicht gefunden werden.");
      } else if (!data.canva_link) {
        setError("Für diese Bestellung wurde noch kein Album erstellt.");
      } else {
        setAlbumData(data);
      }
      setLoading(false);
    };

    fetchAlbumData();
  }, [albumId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorDisplay message={error} />;

  // Erstelle den Einbettungs-Link für Canva
  // Statt /view durch /embed zu ersetzen, was oft nicht mehr funktioniert,
  // nutzen wir eine URL-Struktur, die für die Einbettung vorgesehen ist.
  const embedLink = `${albumData.canva_link}?embed`;

  const subjectName = albumData.subject_details || "diese besonderen Momente";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 text-center flex flex-col">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Erinnerungen an {subjectName}</h1>
        <p className="text-xl text-muted-foreground mb-8">Eine Sammlung unvergesslicher Augenblicke.</p>
        
        {/* Eingebettetes Canva-Album */}
        <div className="flex-grow w-full aspect-video border rounded-lg overflow-hidden shadow-xl">
          <iframe
            loading="lazy"
            src={embedLink}
            className="w-full h-full border-0"
            allowFullScreen
            allow="fullscreen"
          ></iframe>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Album;