import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/contexts/ContentContext';
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, ExternalLink, Music4, BookOpen } from "lucide-react";

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
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  const embedLink = useMemo(() => {
    if (!albumData?.canva_link) return null;
    try {
      const url = new URL(albumData.canva_link);
      url.searchParams.set('embed', '');
      url.searchParams.set('autoplay', '1');
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
    const audio = audioRef.current;
    if (!audio) return;
    if (isAlbumOpen && albumData?.music_choice) {
      audio.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay blockiert", e));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isAlbumOpen, albumData]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
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

  const getMusicSrc = (musicChoice: string) => {
    if (!musicChoice || musicChoice === 'Keine Auswahl') return null;
    if (musicChoice.startsWith('http')) return musicChoice;
    return `/music/${musicChoice}`;
  };

  const musicSrc = getMusicSrc(albumData.music_choice);
  
  const subjectNameRaw = albumData.subject_details || sharedContent.albumPage.defaultName;
  const subjectName = subjectNameRaw.includes(':') 
      ? subjectNameRaw.substring(subjectNameRaw.indexOf(':') + 1).trim() 
      : subjectNameRaw;

  // ==== Mobile Ansicht ====
  if (isMobile) {
    return (
      <>
        <div className="album-background h-screen w-screen flex flex-col items-center justify-center p-4 text-center">
            {/* Alles ist jetzt in einem z-10 Container */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl font-serif mb-2 text-foreground">{sharedContent.albumPage.title(subjectName)}</h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-sm">{sharedContent.albumPage.subtitle}</p>
                
                <div 
                    className="album-cover-mobile relative w-full max-w-xs aspect-[3/4] rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => setIsAlbumOpen(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60 rounded-lg"></div>
                    {/* Hier wurde die Textfarbe für Icon und Text auf "text-white" geändert */}
                    <BookOpen className="w-16 h-16 text-white/80 mb-4" />
                    <p className="text-xl font-semibold text-white">{sharedContent.albumPage.openAlbum || 'Album öffnen'}</p>
                </div>
                
                <a href={albumData.canva_link} target="_blank" rel="noopener noreferrer" className="mt-8">
                </a>
            </div>
            <audio ref={audioRef} src={musicSrc ?? ''} loop />
        </div>

        {isAlbumOpen && (
            <div className="fixed inset-0 z-50 bg-black animate-in fade-in">
                {embedLink ? (
                    <iframe src={embedLink} className="absolute inset-0 w-full h-full border-0" allow="fullscreen; autoplay; clipboard-write;" allowFullScreen={true}></iframe>
                ) : (
                    <div className="w-full h-full flex items-center justify-center"><ErrorDisplay message="Der Canva-Link ist ungültig." /></div>
                )}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                     {musicSrc && (
                        <Button onClick={togglePlayPause} variant="outline" size="icon" className="rounded-full h-10 w-10 bg-black/30 text-white border-white/50 backdrop-blur-sm" title={isPlaying ? sharedContent.albumPage.pauseButton : sharedContent.albumPage.playButton}>
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                    )}
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-black/30 text-white border-white/50 backdrop-blur-sm" onClick={() => setIsAlbumOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        )}
      </>
    );
  }

  // ==== Desktop Ansicht ====
  return (
    <div className="album-background h-screen w-screen flex items-center justify-center p-8">
      {musicSrc && (
        <div className="absolute top-6 right-6 z-30">
          <Button onClick={togglePlayPause} variant="outline" size="icon" className="rounded-full h-12 w-12 bg-background/50 backdrop-blur-sm" title={isPlaying ? sharedContent.albumPage.pauseButton : sharedContent.albumPage.playButton}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
        </div>
      )}
      <audio ref={audioRef} src={musicSrc ?? ''} loop />
      <div className="album-container w-full h-full max-w-7xl max-h-[90vh]">
        <div className="album-page left-page">
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <Music4 className="w-16 h-16 text-primary/50 mb-8" />
            <h1 className="text-5xl font-serif mb-4">{sharedContent.albumPage.title(subjectName)}</h1>
            <p className="text-xl text-muted-foreground">{sharedContent.albumPage.subtitle}</p>
          </div>
        </div>
        <div className="album-spine"></div>
        <div className="album-page right-page">
          <div className="p-6 w-full h-full">
            {embedLink ? (
                <iframe loading="lazy" src={embedLink} className="w-full h-full border-0 rounded-lg shadow-md" allow="fullscreen; autoplay; clipboard-write;" allowFullScreen={true}></iframe>
            ) : <ErrorDisplay message="Der Canva-Link ist ungültig." />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;