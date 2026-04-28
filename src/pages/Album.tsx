import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/contexts/ContentContext';
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, BookOpen } from "lucide-react";
import { AlbumViewerRouter } from "@/components/album-viewer/AlbumViewerRouter";

// ─── placeholder for unassigned / unpublished slugs ──────────────────────────

function AlbumPlaceholder() {
  return (
    <div className="memorial-canvas min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-memorial-ink-soft mb-3">
            Memora Moments
          </p>
          <p className="font-display text-[15px] text-memorial-bronze-deep tracking-widest mb-8">
            Erinnerungen, die weiterleben
          </p>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-memorial-bronze/10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-memorial-bronze/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="font-display text-3xl text-memorial-ink mb-4">
              Dieses Album entsteht gerade.
            </h1>
            <p className="text-memorial-ink-soft text-[15px] leading-relaxed">
              Schön, dass Sie hier sind. Sobald das Album bereit ist, erscheint es an dieser Stelle.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

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
  const { albumSlug } = useParams<{albumSlug: string }>();
  const { sharedContent } = useContent();
  const isMobile = useIsMobile();
  const [albumData, setAlbumData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  const embedLink = useMemo(() => {
    if (!albumData?.canva_link || albumData?.album_type !== 'canva') return null;
    try {
      const url = new URL(albumData.canva_link);
      url.searchParams.set('embed', '');
      url.searchParams.set('autoplay', '1');
      return url.toString();
    } catch {
      return null;
    }
  }, [albumData?.canva_link, albumData?.album_type]);

  const isNativeAlbum = albumData?.album_type === 'native';

  useEffect(() => {
    if (!albumSlug) {
      setError("Keine Album-ID in der URL gefunden.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    const fetchAlbumData = async (showLoading: boolean) => {
      if (showLoading) setLoading(true);
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'get-album-data',
        { body: { albumSlug: albumSlug } }
      );
      if (cancelled) return;

      if (functionError) {
         console.error("Function invoke error:", functionError);
         if (showLoading) setError(`Fehler beim Laden der Albumdaten: ${functionError.message}`);
      } else if (functionData.error) {
         console.error("Function returned error:", functionData.error);
         if (showLoading) setError(functionData.error === "Album not found." || functionData.error === "Album data not found."
           ? "Dieses Album konnte nicht gefunden werden."
           : `Fehler: ${functionData.error}`);
      } else if (functionData.placeholder) {
         setAlbumData(functionData);
      } else if (functionData.album_type === 'canva' && !functionData.canva_link) {
         if (showLoading) setError("Für diese Bestellung wurde noch kein Album erstellt.");
      } else if (functionData.album_type === 'native' && !functionData.image_sources) {
         if (showLoading) setError("Album-Daten sind noch nicht vollständig. Bitte versuchen Sie es später erneut.");
      } else {
         setAlbumData(functionData);
      }
      if (showLoading) setLoading(false);
    };
    fetchAlbumData(true);

    // Re-fetch on window focus (e.g. after admin saves changes in another tab)
    const onFocus = () => fetchAlbumData(false);
    window.addEventListener('focus', onFocus);

    // Realtime subscription: re-fetch when the row backing this slug changes.
    // Subscribe to both tables — get-album-data searches customer_orders first, then partner_orders.
    const channel = supabase
      .channel(`album-${albumSlug}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'customer_orders', filter: `slug=eq.${albumSlug}` },
        () => { fetchAlbumData(false); }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'partner_orders', filter: `slug=eq.${albumSlug}` },
        () => { fetchAlbumData(false); }
      )
      .subscribe();

    return () => {
      cancelled = true;
      window.removeEventListener('focus', onFocus);
      supabase.removeChannel(channel);
    };
  }, [albumSlug]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const shouldPlay = albumData?.music_choice && (isAlbumOpen || !isMobile);
    if (shouldPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isAlbumOpen, albumData, isMobile]);

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
  if (albumData.placeholder) return <AlbumPlaceholder />;

  const getMusicSrc = (musicChoice: unknown): string | null => {
    if (!musicChoice) return null;
    const value: string = typeof musicChoice === 'string'
      ? musicChoice
      : ((musicChoice as { value?: string; url?: string })?.value ?? (musicChoice as { url?: string })?.url ?? '');
    if (!value || value === 'Keine Auswahl') return null;
    if (value.startsWith('http')) return value;
    return `/music/${value}`;
  };

  const musicSrc = getMusicSrc(albumData.music_choice);
  
  const subjectNameRaw: string = String(albumData.subject_name || albumData.subject_details || sharedContent.albumPage.defaultName || '');
  const subjectName = subjectNameRaw.includes(':')
      ? subjectNameRaw.substring(subjectNameRaw.indexOf(':') + 1).trim()
      : subjectNameRaw;

  const formatYear = (d?: string | null) => (d ? new Date(d).getFullYear().toString() : null);
  const fromYear = formatYear(albumData.birth_date);
  const toYear = formatYear(albumData.passing_date);
  const dateRange = fromYear && toYear ? `${fromYear} – ${toYear}` : fromYear || toYear || undefined;

  // ==== Mobile Ansicht ====
  if (isMobile) {
    return (
      <>
        <div className="album-background h-screen w-screen flex flex-col items-center justify-center p-4 text-center">
            {/* Alles ist jetzt in einem z-10 Container */}
            <div className="relative z-10 flex flex-col items-center">
                <h1
                  className="font-serif font-bold mb-3 text-memorial-ink leading-[1.1] tracking-tight px-2"
                  style={{
                    fontSize: 'clamp(2rem, 8vw, 3rem)',
                    textShadow: '0 1px 2px rgba(255,255,255,0.85), 0 2px 12px rgba(255,255,255,0.6)',
                  }}
                >
                  {sharedContent.albumPage.title(subjectName)}
                </h1>
                <p
                  className="text-[15px] sm:text-lg mb-8 max-w-sm font-medium px-3"
                  style={{
                    color: 'hsl(var(--memorial-ink))',
                    opacity: 0.78,
                    textShadow: '0 1px 2px rgba(255,255,255,0.7)',
                  }}
                >
                  {sharedContent.albumPage.subtitle}
                </p>
                
                <div 
                    className="album-cover-mobile relative w-full max-w-xs aspect-[3/4] rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => setIsAlbumOpen(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60 rounded-lg"></div>
                    {/* Hier wurde die Textfarbe für Icon und Text auf "text-white" geändert */}
                    <BookOpen className="w-16 h-16 text-white/80 mb-4" />
                    <p className="text-xl font-semibold text-white">{sharedContent.albumPage.openAlbum || 'Album öffnen'}</p>
                </div>
                
            </div>
            <audio ref={audioRef} src={musicSrc ?? ''} loop />
        </div>

        {isAlbumOpen && (
            <div className="fixed inset-0 z-50 bg-background animate-in fade-in flex flex-col">
                {isNativeAlbum ? (
                  <div className="flex-1 min-h-0 flex flex-col">
                    <AlbumViewerRouter
                      albumLayout={albumData.album_layout ?? { pages: [] }}
                      imageSources={albumData.image_sources}
                      albumStyle={albumData.album_style || 'modern'}
                      subjectName={subjectName}
                      dedication={albumData.dedication ?? undefined}
                      dateRange={dateRange}
                    />
                  </div>
                ) : embedLink ? (
                  <iframe src={embedLink} className="absolute inset-0 w-full h-full border-0" allow="fullscreen; autoplay; clipboard-write;" allowFullScreen={true} />
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

  // ==== Desktop Ansicht — full-screen horizontal story ====
  return (
    <div className="fixed inset-0 z-0 flex flex-col">
      <audio ref={audioRef} src={musicSrc ?? ''} loop />

      {/* Viewer takes full screen */}
      <div className="flex-1 min-h-0">
        {isNativeAlbum ? (
          <AlbumViewerRouter
            albumLayout={albumData.album_layout ?? { pages: [] }}
            imageSources={albumData.image_sources}
            albumStyle={albumData.album_style || 'modern'}
            subjectName={subjectName}
            dedication={albumData.dedication ?? undefined}
          />
        ) : embedLink ? (
          <iframe loading="lazy" src={embedLink} className="w-full h-full border-0" allow="fullscreen; autoplay; clipboard-write;" allowFullScreen={true} />
        ) : (
          <ErrorDisplay message="Der Canva-Link ist ungültig." />
        )}
      </div>

      {/* Floating music button */}
      {musicSrc && (
        <div className="absolute top-5 right-5 z-30">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="icon"
            className="rounded-full h-11 w-11 bg-black/20 text-white border-white/30 backdrop-blur-sm"
            title={isPlaying ? sharedContent.albumPage.pauseButton : sharedContent.albumPage.playButton}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Album;