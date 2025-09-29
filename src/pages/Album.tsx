import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, X } from "lucide-react";

/** Lade-Spinner */
const Spinner = () => (
  <div className="flex justify-center items-center h-screen bg-background">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  </div>
);

/** Fehler-Komponente */
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center text-center text-red-500 bg-background p-4">
    <div>
      <h1 className="text-2xl font-bold">Fehler</h1>
      <p className="mt-2">{message}</p>
    </div>
  </div>
);

/** Canva-Links robust in gültige Embed-Links umwandeln */
function toCanvaEmbed(raw?: string | null): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw.trim());

    // Bereits Embed?
    if (u.pathname.includes("/embed")) return u.toString();

    // Häufige Ansichts-Varianten -> ?embed anhängen
    if (/(\/view|\/watch|\/present)/.test(u.pathname)) {
      const base = `${u.origin}${u.pathname}`;
      const sep = u.search ? `${u.search}&` : "?";
      return `${base}${sep}embed`;
    }

    // Reiner Design-/Editor-Link -> /design/<ID>/view?embed
    const m = u.pathname.match(/^\/design\/([^/]+)/);
    if (m) return `${u.origin}/design/${m[1]}/view?embed`;

    // Fallback: Original zurückgeben
    return raw.trim();
  } catch {
    return null;
  }
}

type OrderRow = {
  canva_link: string | null;
  subject_details?: unknown;
  music_choice?: string | null;
};

const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { sharedContent } = useContent();

  const [albumData, setAlbumData] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Audio-Player
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Hinweis-Bubble sichtbar?
  const [showPlayButtonHint, setShowPlayButtonHint] = useState(true);

  // iFrame Ladezustand / Mobile-Fallback
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [frameTimeout, setFrameTimeout] = useState(false);

  useEffect(() => {
    if (!albumId) {
      setError("Keine Album-ID in der URL gefunden.");
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      const { data, error: dbError } = await supabase
        .from("orders")
        .select("canva_link, subject_details, music_choice")
        .eq("id", albumId)
        .maybeSingle();

      if (dbError) {
        console.error("Supabase-Fehler:", dbError);
        setError("Dieses Album konnte nicht geladen werden.");
      } else if (!data) {
        setError("Kein Album für diesen Link gefunden.");
      } else if (!data.canva_link) {
        setError("Für diese Bestellung wurde noch kein Album erstellt.");
      } else {
        setAlbumData(data as OrderRow);
      }
      setLoading(false);
    })();
  }, [albumId]);

  // Autoplay versuchen; wenn geblockt -> Button-Hinweis lassen
  useEffect(() => {
    if (albumData && audioRef.current) {
      const audio = audioRef.current;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPlayButtonHint(false);
        })
        .catch(() => {
          setIsPlaying(false);
          // Autoplay blockiert -> Nutzer muss klicken
        });
    }
  }, [albumData]);

  // First-Tap-Start (hilft auf Mobile)
  useEffect(() => {
    const handler = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setShowPlayButtonHint(false);
          })
          .catch(() => {});
      }
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("touchstart", handler, { once: true });
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPlayButtonHint(false);
        })
        .catch(() => {});
    }
  };

  // iFrame Timeout – falls Privacy-Protections/ETP blocken
  useEffect(() => {
    if (!albumData) return;
    setFrameLoaded(false);
    setFrameTimeout(false);
    const t = setTimeout(() => {
      if (!frameLoaded) setFrameTimeout(true);
    }, 7000); // 7s ohne onLoad -> zeige Fallback-Hinweis/Link
    return () => clearTimeout(t);
  }, [albumData, frameLoaded]);

  if (loading) return <Spinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!albumData) return <ErrorDisplay message="Keine Album-Daten zum Anzeigen vorhanden." />;

  // Embed-Link
  const embedLink = useMemo(() => toCanvaEmbed(albumData.canva_link), [albumData?.canva_link]);
  if (!embedLink) {
    return (
      <ErrorDisplay message="Der gespeicherte Canva-Link ist ungültig oder nicht einbettbar. Bitte in Canva: 'Teilen' → 'Jeder mit dem Link kann ansehen' und die Ansichts-/Embed-URL verwenden." />
    );
  }

  // Musik-Quelle
  const getMusicSrc = (musicChoice?: string | null) => {
    if (!musicChoice || musicChoice === "Keine Auswahl") return null;
    if (musicChoice.startsWith("http")) return musicChoice;
    return `/music/${musicChoice}`;
  };
  const musicSrc = getMusicSrc(albumData.music_choice || undefined);

  // Name/Titel
  const subjectName =
    typeof albumData.subject_details === "string"
      ? albumData.subject_details
      : (albumData.subject_details as any)?.name ??
        (albumData.subject_details as any)?.title ??
        sharedContent.albumPage.defaultName;

  return (
    <div className="min-h-screen flex flex-col bg-background p-4 pt-8 md:p-8 relative">
      {/* Audio-Player + Button */}
      {musicSrc && (
        <>
          <audio ref={audioRef} src={musicSrc} loop preload="auto" />
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              title={
                isPlaying ? sharedContent.albumPage.pauseButton : sharedContent.albumPage.playButton
              }
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>

          {/* Hinweis-Bubble – Pfeil oben rechts (zeigt Richtung Button) */}
          {showPlayButtonHint && (
            <div className="absolute top-20 right-4 md:top-24 md:right-8 z-10 animate-in fade-in duration-500">
              <div className="relative bg-primary text-primary-foreground rounded-lg p-3 pr-8 shadow-lg max-w-[190px] text-center">
                <p className="text-sm font-medium">{sharedContent.albumPage.playButtonHint}</p>

                {/* Schliessen-Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground"
                  onClick={() => setShowPlayButtonHint(false)}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Pfeil am oberen rechten Rand (zeigt nach oben zum Button) */}
                <div className="absolute -top-2 right-3 w-0 h-0 border-l-8 border-l-transparent border-r-0 border-b-8 border-b-primary"></div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Inhalt */}
      <main className="w-full flex-grow text-center flex flex-col">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2 sm:mb-4">
          {sharedContent.albumPage.title(subjectName)}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
          {sharedContent.albumPage.subtitle}
        </p>

        {/* Canva-Embed */}
        <div className="flex-grow w-full max-w-5xl mx-auto aspect-video border rounded-lg overflow-hidden shadow-xl">
          {embedLink && (
            <iframe
              loading="lazy"
              src={embedLink}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; clipboard-write"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setFrameLoaded(true)}
              // Falls du eine strikte CSP nutzt, denk an: frame-src https://www.canva.com https://*.canva.com
            />
          )}
        </div>

        {/* Mobile-Fallback / Privacy-Protections Hinweis */}
        {frameTimeout && (
          <div className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
            <p className="mb-2">
              Auf einigen Handys blockieren erweiterte Datenschutzfunktionen das Einbetten von
              externen Inhalten. Wenn die Seite nicht korrekt angezeigt wird, öffne das Album
              direkt:
            </p>
            <a
              href={embedLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block underline"
            >
              Album in neuem Tab öffnen
            </a>
            <p className="mt-2">
              Tipp: In Browsern wie Firefox/Brave kann das Reduzieren der{" "}
              <span className="italic">Advanced Privacy Protections</span> für diese Seite helfen.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Album;
