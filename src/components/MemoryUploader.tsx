
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Image, Upload, Music, Film, Check } from "lucide-react";

const MemoryUploader = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [productType, setProductType] = useState<"basic" | "custom">("basic");
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [framePhoto, setFramePhoto] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [dates, setDates] = useState({ birth: "", death: "" });
  const [song, setSong] = useState("");
  const [message, setMessage] = useState("");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [framePhotoUrl, setFramePhotoUrl] = useState<string>("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotos([...photos, ...filesArray]);
      
      // Create preview URLs
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleFramePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFramePhoto(file);
      setFramePhotoUrl(URL.createObjectURL(file));
    }
  };

  const nextStep = () => {
    setActiveStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg">Produktkategorie wählen</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    productType === "basic" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setProductType("basic")}
                >
                  <h3 className="font-medium mb-2">Basis Version</h3>
                  <p className="text-sm text-muted-foreground mb-2">ab 60 CHF</p>
                  <p className="text-xs text-muted-foreground">Schlichte NFC-Platte für digitale Erinnerungen</p>
                </div>
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    productType === "custom" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setProductType("custom")}
                >
                  <h3 className="font-medium mb-2">Individuelle Gestaltung</h3>
                  <p className="text-sm text-muted-foreground mb-2">ab 120 CHF</p>
                  <p className="text-xs text-muted-foreground">Mit persönlichem Foto im Rahmen</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name des/der Verstorbenen</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Vollständiger Name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Geburtsdatum</Label>
                <Input 
                  id="birthDate" 
                  type="date" 
                  value={dates.birth} 
                  onChange={(e) => setDates({...dates, birth: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deathDate">Sterbedatum</Label>
                <Input 
                  id="deathDate" 
                  type="date" 
                  value={dates.death} 
                  onChange={(e) => setDates({...dates, death: e.target.value})}
                />
              </div>
            </div>

            {productType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="framePhoto">Foto für den Rahmen</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                  <Input 
                    id="framePhoto" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFramePhotoUpload} 
                    className="hidden"
                  />
                  <Label htmlFor="framePhoto" className="cursor-pointer w-full flex flex-col items-center">
                    <Image className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-muted-foreground text-sm">
                      {framePhoto ? framePhoto.name : "Foto für den Rahmen auswählen"}
                    </span>
                  </Label>
                </div>
                {framePhotoUrl && (
                  <div className="mt-2">
                    <img src={framePhotoUrl} alt="Rahmen Foto Vorschau" className="w-24 h-24 object-cover rounded-md border" />
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="message">Persönliche Botschaft</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Eine persönliche Nachricht oder ein Zitat..."
                rows={5}
              />
            </div>
          </CardContent>
        );
      case 2:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photos">Fotos hochladen</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                <Input 
                  id="photos" 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  className="hidden"
                />
                <Label htmlFor="photos" className="cursor-pointer w-full flex flex-col items-center">
                  <Image className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-muted-foreground">Klicken Sie hier, um Fotos auszuwählen</span>
                  <span className="text-xs text-muted-foreground/70 mt-1">JPG, PNG oder GIF (max. 10MB)</span>
                </Label>
              </div>
            </div>
            
            {previewUrls.length > 0 && (
              <div className="space-y-2">
                <Label>Vorschau der Fotos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-md border border-border">
                      <img src={url} alt={`Vorschau ${index + 1}`} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="video">Video hochladen (optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                <Input 
                  id="video" 
                  type="file" 
                  accept="video/*" 
                  onChange={handleVideoUpload} 
                  className="hidden"
                />
                <Label htmlFor="video" className="cursor-pointer w-full flex flex-col items-center">
                  <Film className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-muted-foreground">{video ? video.name : "Klicken Sie hier, um ein Video auszuwählen"}</span>
                  <span className="text-xs text-muted-foreground/70 mt-1">MP4, MOV oder AVI (max. 50MB)</span>
                </Label>
              </div>
            </div>
          </CardContent>
        );
      case 3:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="song">Lieblingslied</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                <Input 
                  id="song" 
                  type="file" 
                  accept="audio/*" 
                  className="hidden"
                />
                <Label htmlFor="song" className="cursor-pointer w-full flex flex-col items-center">
                  <Music className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-muted-foreground">Klicken Sie hier, um ein Lied hochzuladen</span>
                  <span className="text-xs text-muted-foreground/70 mt-1">MP3 oder WAV (max. 10MB)</span>
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="songLink">Oder Link zu Spotify/YouTube einfügen</Label>
              <Input 
                id="songLink" 
                value={song} 
                onChange={(e) => setSong(e.target.value)} 
                placeholder="z.B. https://open.spotify.com/track/..."
              />
            </div>
            
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">
                Die Musik wird beim Berühren der NFC-Platte mit dem Handy zusammen mit den Bildern und Videos abgespielt, 
                um ein ganzheitliches Erinnerungserlebnis zu schaffen.
              </p>
            </div>
          </CardContent>
        );
      case 4:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-4 bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-accent text-accent-foreground rounded-full p-3">
                  <Check className="h-8 w-8" />
                </div>
              </div>
              
              <h3 className="text-center text-xl font-serif">Ihre NFC-Glasplatte ist bereit für die Bestellung</h3>
              
              <div className="text-center text-muted-foreground">
                <p>Alle Medien wurden erfolgreich hochgeladen.</p>
                <p className="mt-2">
                  {productType === "basic" ? "Basis Version" : "Individuelle Gestaltung"}
                </p>
                <p className="mt-1">
                  Preis: <span className="font-bold">{productType === "basic" ? "60" : "120"} CHF</span>
                </p>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Nach Abschluss der Bestellung erhalten Sie eine Bestätigungs-E-Mail 
                  mit allen Details und dem Lieferzeitplan.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Lieferadresse</Label>
              <Textarea 
                id="address" 
                placeholder="Vollständige Lieferadresse"
                rows={3}
              />
            </div>
          </CardContent>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {activeStep < 4 ? "Gedenken erstellen" : "Bestellung abschließen"}
        </CardTitle>
        <CardDescription className="text-center">
          {activeStep < 4 ? 
            `Schritt ${activeStep} von 3: ${
              activeStep === 1 ? "Produkttyp und Informationen wählen" : 
              activeStep === 2 ? "Fotos und Videos hinzufügen" : 
              "Lieblingslied auswählen"
            }` : 
            "Überprüfen und bestätigen"
          }
        </CardDescription>
      </CardHeader>
      
      {renderStep()}
      
      <CardFooter className="flex justify-between pt-6">
        {activeStep > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Zurück
          </Button>
        ) : (
          <div></div> // Placeholder for flex alignment
        )}
        
        {activeStep < 4 ? (
          <Button onClick={nextStep}>
            Weiter
          </Button>
        ) : (
          <Button>
            Jetzt bestellen
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemoryUploader;
