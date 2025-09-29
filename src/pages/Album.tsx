import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/contexts/ContentContext';
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

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
  const { sharedContent } = useContent();
  const [albumData, setAlbumData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State für den Audio Player
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!albumId) {
      setError("Keine Album-ID in der URL gefunden.");
      setLoading(false);
      return;
    }

    const fetchAlbumData = async () => {
      setLoading(true);
      // Wir holen jetzt auch `music_choice` aus der Datenbank
      const { data, error: dbError } = await supabase
        .from('orders')
        .select('canva_link, subject_details, music_choice')
        .eq('id', albumId)
        .single();

      if (dbError || !data) {
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

  // Audio Player Logik
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Audio-Wiedergabe fehlgeschlagen:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);


  if (loading) return <Spinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!albumData) return <ErrorDisplay message="Keine Album-Daten zum Anzeigen vorhanden." />;

  const getEmbedLink = (url: string) => {
    try {
      if (!url.includes('canva.com/design')) throw new Error("Ungültiger Canva-Link.");
      return url.includes('?embed') ? url : `${url}?embed`;
    } catch (e) {
      setError("Der gespeicherte Canva-Link ist ungültig.");
      return "";
    }
  };

  // Ermittle die korrekte Musik-URL
  const getMusicSrc = (musicChoice: string) => {
    if (!musicChoice || musicChoice === 'Keine Auswahl') {
      return null;
    }
    // Prüft, ob es ein externer Link ist
    if (musicChoice.startsWith('http')) {
      return musicChoice;
    }
    // Andernfalls ist es eine lokale Datei
    return `/music/${musicChoice}`;
  };

  const embedLink = getEmbedLink(albumData.canva_link);
  const musicSrc = getMusicSrc(albumData.music_choice);
  const subjectName = albumData.subject_details || sharedContent.albumPage.defaultName;

  return (
    <div className="min-h-screen flex flex-col bg-background p-4 md:p-8 relative">
      {/* Audio-Player und Button */}
      {musicSrc && (
        <>
          <audio ref={audioRef} src={musicSrc} loop />
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 rounded-full h-12 w-12"
            title={isPlaying ? sharedContent.albumPage.pauseButton : sharedContent.albumPage.playButton}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
        </>
      )}

      <main className="flex-grow container mx-auto text-center flex flex-col">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">
          {sharedContent.albumPage.title(subjectName)}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {sharedContent.albumPage.subtitle}
        </p>
        
        <div className="flex-grow w-full aspect-video border rounded-lg overflow-hidden shadow-xl">
          {embedLink && (
            <iframe
              loading="lazy"
              src={embedLink}
              className="w-full h-full border-0"
              allowFullScreen
              allow="fullscreen; autoplay"
            ></iframe>
          )}
        </div>
      </main>
    </div>
  );
};

export default Album;