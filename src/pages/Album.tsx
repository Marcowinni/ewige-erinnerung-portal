import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, X } from "lucide-react";

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
      <p className="mt-2">{message}</p>
    </div>
  </div>
);

const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { sharedContent } = useContent();

  const [albumData, setAlbumData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayButtonHint, setShowPlayButtonHint] = useState(true);

  // *** FEHLERBEHEBUNG: useMemo MUSS an den Anfang ***
  // Hooks dürfen nicht in Bedingungen aufgerufen werden.
  const embedLink = useMemo(() => {
    if (!albumData?.canva_link) return null;
    try {
      const url = new URL(albumData.canva_link);
      if (!url.searchParams.has('embed')) {
        url.searchParams.set('embed', '');
      }
      return url.toString();
    } catch {
      return null;
    }
  }, [albumData?.canva_link]);

  useEffect(() => {
    if (!albumId) {
      setError("Keine Album-ID in der URL gefunden.");
      setLoading(false);
      return;
    }

    const fetchAlbumData = async () => {
      setLoading(true);
      const { data, error: dbError } = await supabase
        .from("orders")
        .select("canva_link, subject_details, music_choice")
        .eq("id", albumId)
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
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
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

  if (loading) return <Spinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!albumData) return <ErrorDisplay message="Keine Album-Daten zum Anzeigen vorhanden." />;
  
  const musicSrc = albumData.music_choice && albumData.music_choice !== 'Keine Auswahl' 
    ? (albumData.music_choice.startsWith('http') ? albumData.music_choice : `/music/${albumData.music_choice}`) 
    : null;
    
  const subjectName = albumData.subject_details || sharedContent.albumPage.defaultName;

  return (
    <div className="h-screen w-screen flex flex-col bg-background p-4 pt-8 md:p-8 relative">
      {musicSrc && (
        <>
          <audio ref={audioRef} src={musicSrc} loop />
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              title={isPlaying ? sharedContent.albumPage.pauseButton : sharedContent.albumPage.playButton}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>
          {showPlayButtonHint && (
            <div className="absolute top-20 right-4 md:top-24 md:right-8 z-10 animate-in fade-in duration-500">
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
                {/* *** KORRIGIERTER PFEIL *** */}
                <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-primary"></div>
              </div>
            </div>
          )}
        </>
      )}
      <main className="w-full flex-1 flex flex-col text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2 sm:mb-4 shrink-0">
          {sharedContent.albumPage.title(subjectName)}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 shrink-0">
          {sharedContent.albumPage.subtitle}
        </p>
        <div className="relative flex-1 w-full max-w-5xl mx-auto">
          {embedLink ? (
            <iframe
              src={embedLink}
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-xl"
              allow="fullscreen; autoplay"
            ></iframe>
          ) : (
             <ErrorDisplay message="Der Canva-Link ist ungültig." />
          )}
        </div>
      </main>
    </div>
  );
};

export default Album;