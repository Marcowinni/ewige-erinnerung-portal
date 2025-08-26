import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Camera, Music, Sparkles, Diamond, Package, Star, Images, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background image without parallax */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover -z-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            filter: "brightness(0.7)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background/90 -z-10" />
        
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="hero-content relative max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-shadow">
              Erinnerungen, die weiterleben – mit Herz und Klang.
            </h1>
            <p className="text-xl text-white/90 mb-8 text-shadow">
              Aus Erinnerungen wird ein stilles Denkmal – eine NFC-Platte öffnet die Tür zu bewegenden
              Momenten mit Bild und Musik.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/gedenken">Jetzt beginnen</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                <Link to="/ueber">Mehr erfahren</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Unvergessliche Momente für die Ewigkeit</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unsere Memoro Moments NFC-Platten vereinen moderne Technologie mit würdevoller Erinnerung. Sie ermöglichen, 
              das Leben eines geliebten Menschen durch Bilder, Videos und Musik lebendig zu halten – direkt am Grab.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <FeatureCard 
                icon={Sparkles}
                title="Einzigartiges Gedenken"
                description="Bewahren Sie besondere Erinnerungen mit einer personalisierten NFC-Platte, die Ihre schönsten Momente durch einfaches Berühren mit dem Handy zugänglich macht."
                iconColor="text-amber-500"
              />
            </div>
            
            <div>
              <FeatureCard 
                icon={Camera}
                title="Multimedia Erinnerungen"
                description="Laden Sie Fotos und Videos hoch, die die Persönlichkeit und das Leben des Verstorbenen zeigen."
                iconColor="text-blue-500"
              />
            </div>
            
            <div>
              <FeatureCard 
                icon={Music}
                title="Lieblingslied einbinden"
                description="Fügen Sie bedeutungsvolle Musik hinzu, die beim Betrachten der Erinnerungen abgespielt wird."
                iconColor="text-purple-500"
              />
            </div>
            
            <div>
              <FeatureCard 
                icon={Heart}
                title="Würdevoll gestaltet"
                description="Hochwertige Glasplatten, die sich harmonisch in den Grabstein einfügen und allen Wetterbedingungen standhalten."
                iconColor="text-red-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">So einfach funktioniert es</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In wenigen Schritten zur persönlichen Gedenkplatte: Laden Sie Fotos oder Videos hoch, 
              wählen Sie ein Lied, wir erstellen daraus ein liebevoll gestaltetes Video. Sie erhalten 
              eine NFC-Platte, die durch Berühren mit dem Handy direkt zu Ihrer Erinnerung führt.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">Medien hochladen</h3>
              <p className="text-muted-foreground text-center">
                Wählen Sie die schönsten Fotos und Videos aus, die die Erinnerung an Ihren 
                Liebsten festhalten.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">Musik auswählen</h3>
              <p className="text-muted-foreground text-center">
                Fügen Sie ein Lieblingslied hinzu, das besondere Bedeutung für den Verstorbenen hatte.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">NFC-Platte erhalten</h3>
              <p className="text-muted-foreground text-center">
                Ihre persönliche NFC-Glasplatte wird gefertigt und direkt zu Ihnen nach Hause geliefert.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/gedenken">Gedenken erstellen</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Demo Video and Products Showcase - Replaced Testimonial */}
      <section ref={productsRef} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Unsere Produkte und wie sie funktionieren
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Erleben Sie den Memoro Moments in Aktion und sehen Sie unsere Gedenkplatten aus verschiedenen Materialien.
            </p>
          </div>
          
          {/* Demo Video */}
          <div className="max-w-4xl mx-auto mb-16 rounded-lg overflow-hidden shadow-xl">
            <div className="aspect-w-16 aspect-h-9 relative">
              <video 
                className="w-full rounded-lg" 
                controls 
                poster="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Ihr Browser unterstützt keine Videos.
              </video>
            </div>
          </div>
          
          {/* Product Categories */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Version */}
              <Card className="h-full">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                    alt="Basis NFC-Platte" 
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-center">Basis Version</h3>
                  <ul className="space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Hochwertige Glasplatte
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      NFC-Technologie integriert
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Standardformat 15x10cm
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Witterungsbeständig
                    </li>
                  </ul>
                  <p className="text-center text-muted-foreground">
                    Schlichte, elegante NFC-Platte für Ihre digitalen Erinnerungen.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-3xl font-bold">ab 60 CHF</p>
                </CardFooter>
              </Card>

              {/* Customizable Version */}
              <Card className="h-full border-2 border-primary">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <div className="bg-primary text-primary-foreground text-center py-1">
                    Empfohlen
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                    alt="Individuelle NFC-Platte mit Fotorahmen" 
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-center">Individuelle Gestaltung</h3>
                  <ul className="space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Alle Basis-Features
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Persönliches Foto im Rahmen
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Individuelle Gravur möglich
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Premium Materialien verfügbar
                    </li>
                  </ul>
                  <p className="text-center text-muted-foreground">
                    Vollständig personalisierbare NFC-Platte mit Foto und individueller Gestaltung.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-3xl font-bold">ab 120 CHF</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Beginnen Sie Ihre Erinnerungsreise
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Werden Sie Teil einer Gemeinschaft, die das Leben wertschätzt. Erstellen Sie noch heute Ihr 
              einzigartiges Gedenken und bewahren Sie kostbare Erinnerungen für kommende Generationen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/gedenken">Gedenken erstellen</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Index;
