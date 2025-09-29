import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/contexts/ContentContext';
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, ExternalLink } from "lucide-react";

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
  const isMobile = useIsMobile();
  const [albumData, setAlbumData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [showPlayButtonHint, setShowPlayButtonHint] = useState(true);

  useEffect(() => {
    if (!albumId) {
      setError("Keine Album-ID in der URL gefunden.");
      setLoading(false);
      return;
    }

    const fetchAlbumData = async () => {
      setLoading(true);
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

  useEffect(() => {
    if (albumData && audioRef.current) {
      const audio = audioRef.current;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Autoplay wurde vom Browser blockiert.", error);
        setIsPlaying(false);
      });
    }
  }, [albumData]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
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

  const getMusicSrc = (musicChoice: string) => {
    if (!musicChoice || musicChoice === 'Keine Auswahl') return null;
    if (musicChoice.startsWith('http')) return musicChoice;
    return `/music/${musicChoice}`;
  };

  const embedLink = getEmbedLink(albumData.canva_link);
  const musicSrc = getMusicSrc(albumData.music_choice);
  const subjectName = albumData.subject_details || sharedContent.albumPage.defaultName;

  return (
    <div className="min-h-screen flex flex-col bg-background p-4 pt-8 md:p-8 relative">
      {musicSrc && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12"
            title={isPlaying ? sharedContent.albumPage.pauseButton : sharedContent.albumPage.playButton}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          
          {showPlayButtonHint && (
            <div className="absolute top-16 right-0 z-20 animate-in fade-in duration-500">
              <div className="relative bg-primary text-primary-foreground rounded-lg p-3 pr-8 shadow-lg max-w-[150px] text-center">
                <p className="text-sm font-medium">{sharedContent.albumPage.playButtonHint}</p>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-0 right-0 h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground"
                  onClick={() => setShowPlayButtonHint(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-primary"></div>
              </div>
            </div>
          )}
        </div>
      )}
      <audio ref={audioRef} src={musicSrc ?? ''} loop />

      <main className="w-full h-full flex flex-col text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2 sm:mb-4 shrink-0">
          {sharedContent.albumPage.title(subjectName)}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 shrink-0">
          {sharedContent.albumPage.subtitle}
        </p>
        
        <div className="relative flex-1 w-full max-w-5xl mx-auto">
          {embedLink && (
            <iframe
              loading="lazy"
              src={embedLink}
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-xl"
              allow="fullscreen; autoplay; clipboard-write;"
              allowFullScreen={true}
            ></iframe>
          )}
        </div>

        {/* *** HIER IST DIE ANPASSUNG FÜR DEN BUTTON *** */}
        {/* Der Button wird jetzt nur auf Mobilgeräten *unterhalb* des Albums angezeigt */}
        {isMobile && embedLink && (
            <div className="mt-6 flex justify-center">
                <a
                    href={embedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="secondary" className="rounded-full shadow-lg">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {sharedContent.albumPage.openInNewTab}
                    </Button>
                </a>
            </div>
        )}
      </main>
    </div>
  );
};

export default Album;