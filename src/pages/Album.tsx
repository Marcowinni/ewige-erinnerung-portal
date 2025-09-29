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

  console.log("1. Album-Komponente wird gerendert. Album ID aus URL:", albumId);

  useEffect(() => {
    // Diese Funktion wird nur einmal beim Laden der Seite ausgeführt.
    if (!albumId) {
      console.error("FEHLER: Keine Album-ID in der URL gefunden.");
      setError("Keine Album-ID in der URL gefunden.");
      setLoading(false);
      return;
    }

    const fetchAlbumData = async () => {
      console.log("2. Starte Datenabruf von Supabase für ID:", albumId);
      setLoading(true);

      const { data, error: dbError } = await supabase
        .from('orders')
        .select('canva_link, subject_details')
        .eq('id', albumId)
        .single();

      console.log("3. Supabase-Antwort erhalten:", { data, dbError });

      if (dbError || !data) {
        console.error("FEHLER beim Abrufen der Album-Daten:", dbError);
        setError("Dieses Album konnte nicht gefunden werden oder der Link ist nicht korrekt freigegeben.");
      } else if (!data.canva_link) {
        console.warn("WARNUNG: Album gefunden, aber es ist kein Canva-Link hinterlegt.");
        setError("Für diese Bestellung wurde noch kein Album erstellt.");
      } else {
        console.log("ERFOLG: Album-Daten erfolgreich geladen.");
        setAlbumData(data);
      }
      setLoading(false);
    };

    fetchAlbumData();
  }, [albumId]); // Dieser Haken wird nur ausgeführt, wenn sich die albumId ändert.

  const getEmbedLink = (url: string | undefined) => {
    if (!url) return "";
    try {
      if (!url.includes('canva.com/design')) {
        throw new Error("Ungültiger Canva-Link.");
      }
      return url.includes('?embed') ? url : `${url}?embed`;
    } catch (e) {
      console.error("Fehler beim Erstellen des Einbettungs-Links:", e);
      setError("Der gespeicherte Canva-Link ist ungültig.");
      return "";
    }
  };

  console.log("4. Zustand vor dem Rendern der Ansicht:", { loading, error, hasAlbumData: !!albumData });

  if (loading) {
    console.log("5a. Zeige Lade-Spinner an.");
    return <Spinner />;
  }
  
  if (error) {
    console.log("5b. Zeige Fehlermeldung an:", error);
    return <ErrorDisplay message={error} />;
  }

  if (!albumData) {
    console.log("5c. Zeige Fehlermeldung an, da keine Album-Daten vorhanden sind.");
    return <ErrorDisplay message="Keine Album-Daten zum Anzeigen vorhanden." />;
  }
  
  const embedLink = getEmbedLink(albumData.canva_link);
  const subjectName = albumData.subject_details || "diese besonderen Momente";
  
  console.log("5d. Bereit zum Rendern des Albums mit diesem Link:", embedLink);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 text-center flex flex-col">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Erinnerungen an {subjectName}</h1>
        <p className="text-xl text-muted-foreground mb-8">Eine Sammlung unvergesslicher Augenblicke.</p>
        
        <div className="flex-grow w-full aspect-video border rounded-lg overflow-hidden shadow-xl">
          {embedLink ? (
            <iframe
              loading="lazy"
              src={embedLink}
              className="w-full h-full border-0"
              allowFullScreen
              allow="fullscreen"
            ></iframe>
          ) : <ErrorDisplay message="Einbettungs-Link konnte nicht erstellt werden." />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Album;