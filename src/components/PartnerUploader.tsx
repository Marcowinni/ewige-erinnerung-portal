import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Check, Play, Pause, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import imageCompression from 'browser-image-compression';

// Typen für Dateien
type MediaFile = {
  file: File;
  caption?: string;
  id: string;
};

// Hilfsfunktion zum Bereinigen von Dateinamen
function sanitizeFileName(filename: string): string {
  const germanUmlauts: { [key: string]: string } = {
    'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue', 'ß': 'ss',
  };
  let sanitized = filename;
  for (const key in germanUmlauts) {
    sanitized = sanitized.replace(new RegExp(key, 'g'), germanUmlauts[key]);
  }
  return sanitized.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/--+/g, '-');
}

export default function PartnerUploader() {
  // --- STATE ---
  const [name, setName] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<'modern' | 'classic'>('modern');
  const [notes, setNotes] = useState("");
  
  // Musik
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [pixabayLink, setPixabayLink] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Dateien
  const [images, setImages] = useState<MediaFile[]>([]);
  const [videos, setVideos] = useState<MediaFile[]>([]);
  
  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- MUSIK LISTE ---
  const musicTracks = [
    { src: "/music/ambient-piano-music.mp3", title: "Ambient Piano Music", id: "ambient-piano-music.mp3" },
    { src: "/music/inspiring-emotional-uplifting-piano.mp3", title: "Inspiring Piano Music", id: "inspiring-emotional-uplifting-piano.mp3" },
    { src: "/music/happy-music.mp3", title: "Happy Music", id: "happy-music.mp3" },
    { src: "/music/calm-classical-piano.mp3", title: "Modern Classical Music", id: "calm-classical-piano.mp3" },
    { src: "/music/relaxed-music.mp3", title: "Relaxed Music", id: "relaxed-music.mp3" },
    { src: "/music/soft-calm-music.mp3", title: "Soft Calm Music", id: "soft-calm-music.mp3" },
  ];

  // --- LOGIK: AUDIO PLAYER ---
  const handlePlayToggle = (trackSrc: string) => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (nowPlaying !== trackSrc) {
      setNowPlaying(trackSrc);
      audioEl.src = trackSrc;
      audioEl.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioEl.pause();
        setIsPlaying(false);
      } else {
        audioEl.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    const handleEnd = () => setIsPlaying(false);
    audioEl?.addEventListener('ended', handleEnd);
    return () => {
      audioEl?.removeEventListener('ended', handleEnd);
      audioEl?.pause();
    };
  }, []);

  // --- LOGIK: DATEI UPLOAD (PARALLEL) ---
  const addImages = async (files: FileList | null) => {
    if (!files) return;
    toast.info("Komprimiere Bilder...");
    
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };

    const processingPromises = Array.from(files).map(async (file) => {
      try {
        const compressed = await imageCompression(file, options);
        return { file: compressed, caption: "", id: crypto.randomUUID() };
      } catch (e) {
        return { file: file, caption: "", id: crypto.randomUUID() };
      }
    });

    const newFiles = await Promise.all(processingPromises);
    setImages(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} Bilder hinzugefügt!`);
  };

  const addVideos = (files: FileList | null) => {
    if (!files) return;
    const newFiles: MediaFile[] = [];
    const MAX_SIZE = 200 * 1024 * 1024; 

    Array.from(files).forEach(file => {
      if (file.size <= MAX_SIZE) {
        newFiles.push({ file, caption: "", id: crypto.randomUUID() });
      } else {
        toast.error(`Video ${file.name} ist zu gross (max 200MB).`);
      }
    });
    setVideos(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} Videos hinzugefügt!`);
  };

  // --- LOGIK: SUBMIT ---
  const handleUpload = async () => {
    if (!name) {
      toast.error("Bitte geben Sie einen Namen ein.");
      return;
    }
    if (images.length === 0 && videos.length === 0) {
      toast.error("Bitte laden Sie mindestens ein Bild oder Video hoch.");
      return;
    }

    setIsSubmitting(true);
    setUploadStatus("Bestellung wird angelegt...");

    try {
      const finalMusic = selectedMusic || pixabayLink || "Keine Auswahl";

      const { data, error } = await supabase.functions.invoke('create-partner-order', {
        body: { name, music: finalMusic, style: selectedStyle, notes }
      });

      if (error || !data.folderName) throw new Error("Fehler beim Erstellen der Bestellung.");
      const folderName = data.folderName;

      // Dateien vorbereiten
      const allFiles = [
        ...images.map(f => ({ ...f, type: 'Bild' })),
        ...videos.map(f => ({ ...f, type: 'Video' }))
      ];

      setUploadStatus(`Lade ${allFiles.length} Dateien hoch...`);

      // Paralleler Upload
      const uploadPromises = allFiles.map(async (item) => {
        const cleanName = sanitizeFileName(item.file.name);
        const fileName = `${folderName}/${crypto.randomUUID()}-${cleanName}`;
        
        const { error: upError } = await supabase.storage
          .from('flueckiger')
          .upload(fileName, item.file);

        if (upError) {
            console.error(`Fehler beim Upload von ${item.file.name}`, upError);
            throw upError;
        }
      });

      await Promise.all(uploadPromises);

      // Info JSON
      if (notes || allFiles.some(f => f.caption)) {
        const infoContent = JSON.stringify({
          name, music: finalMusic, style: selectedStyle, mainNotes: notes,
          fileCaptions: allFiles.map(f => ({ file: f.file.name, caption: f.caption }))
        }, null, 2);
        
        await supabase.storage.from('flueckiger').upload(`${folderName}/info.json`, new Blob([infoContent], {type: 'application/json'}));
      }

      setIsSuccess(true);
      toast.success("Alles erfolgreich hochgeladen!");

    } catch (err) {
      console.error(err);
      toast.error("Ein Fehler ist aufgetreten.");
    } finally {
      setIsSubmitting(false);
      setUploadStatus(null);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <div className="bg-green-100 p-6 rounded-full mb-6"><Check className="w-16 h-16 text-green-600" /></div>
        <h2 className="text-3xl font-serif mb-4">Vielen Dank!</h2>
        <p className="text-muted-foreground max-w-md">Die Daten wurden erfolgreich übertragen.</p>
        <Button className="mt-8" onClick={() => window.location.reload()}>Neue Erfassung</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 px-4">
      <audio ref={audioRef} />
      
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-serif">Media Upload</h1>
      </div>

      {/* 1. Name */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium font-serif border-b border-border/40 pb-2">Name</h3>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name der Person" className="max-w-md bg-background"/>
      </div>

      {/* 2. Musik */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium font-serif border-b border-border/40 pb-2">Musik auswählen</h3>
        
        <Label className="text-muted-foreground mb-3 block">Verfügbare Musik</Label>
        <div className="space-y-2 mb-6">
              {musicTracks.map((track) => {
                const isCurrentlyPlaying = nowPlaying === track.src && isPlaying;
                const isSelected = selectedMusic === track.id;
                return (
                  <div key={track.id} className="flex items-center justify-between p-3 rounded-md border border-input bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handlePlayToggle(track.src)}>
                            {isCurrentlyPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <span className="font-medium text-sm truncate">{track.title}</span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => { setSelectedMusic(track.id); setPixabayLink(""); }} 
                      variant={isSelected ? "secondary" : "outline"}
                      className={cn("ml-2 h-8", isSelected && "bg-white/20 text-white hover:bg-white/30")}
                    >
                      {isSelected ? "Ausgewählt" : "Auswählen"}
                    </Button>
                  </div>
                );
              })}
        </div>

        <Label className="text-muted-foreground mb-3 block">Weitere Musik von Pixabay</Label>
        <div className="flex gap-2">
            <Input 
                type="url" 
                placeholder="Link von pixabay.com/music/ einfügen..." 
                value={pixabayLink} 
                onChange={(e) => { setPixabayLink(e.target.value); setSelectedMusic(null); }} 
                className="flex-1 bg-background" 
            />
            <Button onClick={() => window.open("https://pixabay.com/music/", "_blank")} variant="secondary">Pixabay Music</Button>
        </div>
      </div>

      {/* 3. Stil */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium font-serif border-b border-border/40 pb-2">Stil des Albums wählen</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              {/* Modern */}
              <div onClick={() => setSelectedStyle('modern')} className={cn("border-2 rounded-lg cursor-pointer transition-all overflow-hidden group", selectedStyle === 'modern' ? "border-primary/70 ring-1 ring-primary/70" : "border-border hover:border-primary/40")}>
                <div className="bg-black/10 aspect-[3/4] flex justify-center items-center relative">
                   {/* Hier könnte ein Vorschaubild stehen, wir nutzen Video oder Platzhalter */}
                   <video src="/kalender_vorschau/fotoalbum_modern.mp4" autoPlay loop muted playsInline className="h-full w-full object-cover"></video>
                </div>
                <div className="p-3 text-center bg-card font-medium">Modern</div>
              </div>
              
              {/* Klassisch */}
              <div onClick={() => setSelectedStyle('classic')} className={cn("border-2 rounded-lg cursor-pointer transition-all overflow-hidden group", selectedStyle === 'classic' ? "border-primary/70 ring-1 ring-primary/70" : "border-border hover:border-primary/40")}>
                <div className="bg-black/10 aspect-[3/4] flex justify-center items-center relative">
                   <video src="/kalender_vorschau/fotoalbum_klassisch.mp4" autoPlay loop muted playsInline className="h-full w-full object-cover"></video>
                </div>
                <div className="p-3 text-center bg-card font-medium">Klassisch</div>
              </div>
        </div>
      </div>

      {/* 4. Uploads */}
      <div className="grid md:grid-cols-2 gap-8 pt-4">
          
          {/* Bilder Spalte */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Bilder (max. 50MB pro Bild)</Label>
            
            {/* Custom Input Trigger */}
            <div 
                onClick={() => document.getElementById('img-upload')?.click()}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer hover:bg-accent/50 transition-colors items-center"
            >
               <span className="font-bold mr-2">Dateien auswählen</span>
               <span className="text-muted-foreground truncate">{images.length > 0 ? images[0].file.name + (images.length > 1 ? ` (+${images.length -1})` : "") : "Keine ausgewählt"}</span>
               <input id="img-upload" type="file" accept="image/*" multiple onChange={e => addImages(e.target.files)} className="hidden" />
            </div>
            
            {/* Bild Liste Vorschau (Karten-Design) */}
            <div className="space-y-3 mt-4">
                {images.map(img => (
                    <div key={img.id} className="relative border border-border rounded-lg overflow-hidden bg-card shadow-sm group">
                        <div className="aspect-video w-full bg-muted relative">
                             <img 
                                src={URL.createObjectURL(img.file)} 
                                alt="Vorschau" 
                                className="w-full h-full object-cover"
                                onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)} 
                            />
                            {/* Entfernen Button Overlay */}
                            <Button 
                                size="sm" 
                                onClick={() => setImages(s => s.filter(i => i.id !== img.id))} 
                                className="absolute top-2 right-2 h-7 px-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-md transition-opacity"
                            >
                                Entfernen
                            </Button>
                        </div>
                        {/* Caption Field */}
                        <div className="p-3">
                            <Input 
                                placeholder="Kurztext (optional)" 
                                value={img.caption} 
                                onChange={e => setImages(s => s.map(i => i.id === img.id ? {...i, caption: e.target.value} : i))} 
                                className="h-8 text-sm bg-background"
                            />
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Video Spalte */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Videos (max. 50MB pro Video)</Label>
            
            {/* Custom Input Trigger */}
            <div 
                onClick={() => document.getElementById('vid-upload')?.click()}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer hover:bg-accent/50 transition-colors items-center"
            >
               <span className="font-bold mr-2">Dateien auswählen</span>
               <span className="text-muted-foreground truncate">{videos.length > 0 ? videos[0].file.name + (videos.length > 1 ? ` (+${videos.length -1})` : "") : "Keine ausgewählt"}</span>
               <input id="vid-upload" type="file" accept="video/*" multiple onChange={e => addVideos(e.target.files)} className="hidden" />
            </div>

             {/* Video Liste Vorschau */}
             <div className="space-y-3 mt-4">
                {videos.map(vid => (
                    <div key={vid.id} className="relative border border-border rounded-lg overflow-hidden bg-card shadow-sm group">
                        <div className="aspect-video w-full bg-muted relative flex items-center justify-center">
                             <video 
                                src={URL.createObjectURL(vid.file)} 
                                className="w-full h-full object-cover opacity-80"
                                onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.5; }} // Thumbnail Hack
                            />
                            <Play className="absolute w-8 h-8 text-white/80 drop-shadow-lg pointer-events-none"/>
                            
                            <Button 
                                size="sm" 
                                onClick={() => setVideos(s => s.filter(v => v.id !== vid.id))} 
                                className="absolute top-2 right-2 h-7 px-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-md"
                            >
                                Entfernen
                            </Button>
                        </div>
                        <div className="p-3">
                            <p className="text-xs text-muted-foreground mb-1 truncate">{vid.file.name}</p>
                            <Input 
                                placeholder="Kurztext (optional)" 
                                value={vid.caption} 
                                onChange={e => setVideos(s => s.map(v => v.id === vid.id ? {...v, caption: e.target.value} : v))} 
                                className="h-8 text-sm bg-background"
                            />
                        </div>
                    </div>
                ))}
            </div>
          </div>

      </div>

      {/* 5. Sonstiges & Submit */}
      <div className="space-y-4 pt-8 border-t border-border/40">
        <h3 className="text-xl font-medium font-serif">Sonstige Infos</h3>
        <Textarea 
            placeholder="Zusätzliche Informationen für die Erstellung..." 
            rows={4} 
            value={notes} 
            onChange={e => setNotes(e.target.value)}
            className="bg-background"
        />
        <div className="pt-4">
            <Button size="lg" className="w-full text-lg h-14" onClick={handleUpload} disabled={isSubmitting}>
                {isSubmitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {uploadStatus || "Wird hochgeladen..."}</>) : "Daten übermitteln"}
            </Button>
        </div>
      </div>
    </div>
  );
}