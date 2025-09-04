
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
import { useContent } from "@/contexts/ContentContext";

const MemoryUploader = () => {
  const { t } = useContent();
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
              <Label className="text-lg">{t('memoryUploader.selectCategory')}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    productType === "basic" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setProductType("basic")}
                >
                  <h3 className="font-medium mb-2">{t('memoryUploader.memoraTag')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">ab 60 CHF</p>
                  <p className="text-xs text-muted-foreground">{t('memoryUploader.memoraTagDescription')}</p>
                </div>
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    productType === "custom" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setProductType("custom")}
                >
                  <h3 className="font-medium mb-2">{t('memoryUploader.memoraFrame')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">ab 120 CHF</p>
                  <p className="text-xs text-muted-foreground">{t('memoryUploader.memoraFrameDescription')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{t('memoryUploader.deceasedName')}</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={t('memoryUploader.fullName')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">{t('memoryUploader.birthDate')}</Label>
                <Input 
                  id="birthDate" 
                  type="date" 
                  value={dates.birth} 
                  onChange={(e) => setDates({...dates, birth: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deathDate">{t('memoryUploader.deathDate')}</Label>
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
                <Label htmlFor="framePhoto">{t('memoryUploader.framePhoto')}</Label>
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
                      {framePhoto ? framePhoto.name : t('memoryUploader.selectFramePhoto')}
                    </span>
                  </Label>
                </div>
                {framePhotoUrl && (
                  <div className="mt-2">
                    <img src={framePhotoUrl} alt={t('memoryUploader.framePhotoPreview')} className="w-24 h-24 object-cover rounded-md border" />
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="message">{t('memoryUploader.personalMessage')}</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder={t('memoryUploader.personalMessagePlaceholder')}
                rows={5}
              />
            </div>
          </CardContent>
        );
      case 2:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photos">{t('memoryUploader.uploadPhotos')}</Label>
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
                  <span className="text-muted-foreground">{t('memoryUploader.clickToSelectPhotos')}</span>
                  <span className="text-xs text-muted-foreground/70 mt-1">{t('memoryUploader.photoFormats')}</span>
                </Label>
              </div>
            </div>
            
            {previewUrls.length > 0 && (
              <div className="space-y-2">
                <Label>{t('memoryUploader.photoPreview')}</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-md border border-border">
                      <img src={url} alt={`${t('memoryUploader.preview')} ${index + 1}`} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="video">{t('memoryUploader.uploadVideo')}</Label>
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
                  <span className="text-muted-foreground">{video ? video.name : t('memoryUploader.clickToSelectVideo')}</span>
                  <span className="text-xs text-muted-foreground/70 mt-1">{t('memoryUploader.videoFormats')}</span>
                </Label>
              </div>
            </div>
          </CardContent>
        );
      case 3:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="song">{t('memoryUploader.favoriteSong')}</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                <Input 
                  id="song" 
                  type="file" 
                  accept="audio/*" 
                  className="hidden"
                />
                <Label htmlFor="song" className="cursor-pointer w-full flex flex-col items-center">
                  <Music className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-muted-foreground">{t('memoryUploader.clickToUploadSong')}</span>
                  <span className="text-xs text-muted-foreground/70 mt-1">{t('memoryUploader.audioFormats')}</span>
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="songLink">{t('memoryUploader.orLinkSpotify')}</Label>
              <Input 
                id="songLink" 
                value={song} 
                onChange={(e) => setSong(e.target.value)} 
                placeholder={t('memoryUploader.linkPlaceholder')}
              />
            </div>
            
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">
                {t('memoryUploader.musicExplanation')}
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
              
              <h3 className="text-center text-xl font-serif">{t('memoryUploader.plateReady')}</h3>
              
              <div className="text-center text-muted-foreground">
                <p>{t('memoryUploader.mediaUploaded')}</p>
                <p className="mt-2">
                  {productType === "basic" ? t('memoryUploader.memoraTag') : t('memoryUploader.memoraFrame')}
                </p>
                <p className="mt-1">
                  {t('memoryUploader.price')} <span className="font-bold">{productType === "basic" ? "60" : "120"} CHF</span>
                </p>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground text-center">
                  {t('memoryUploader.orderConfirmation')}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">{t('memoryUploader.deliveryAddress')}</Label>
              <Textarea 
                id="address" 
                placeholder={t('memoryUploader.fullDeliveryAddress')}
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
          {activeStep < 4 ? t('memoryUploader.createMemory') : t('memoryUploader.completeOrder')}
        </CardTitle>
        <CardDescription className="text-center">
          {activeStep < 4 ? 
            `${t('memoryUploader.step')} ${activeStep} ${t('memoryUploader.of')} 3: ${
              activeStep === 1 ? t('memoryUploader.step1Title') : 
              activeStep === 2 ? t('memoryUploader.step2Title') : 
              t('memoryUploader.step3Title')
            }` : 
            t('memoryUploader.step4Title')
          }
        </CardDescription>
      </CardHeader>
      
      {renderStep()}
      
      <CardFooter className="flex justify-between pt-6">
        {activeStep > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            {t('memoryUploader.back')}
          </Button>
        ) : (
          <div></div> // Placeholder for flex alignment
        )}
        
        {activeStep < 4 ? (
          <Button onClick={nextStep}>
            {t('memoryUploader.next')}
          </Button>
        ) : (
          <Button>
            {t('memoryUploader.orderNow')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemoryUploader;
