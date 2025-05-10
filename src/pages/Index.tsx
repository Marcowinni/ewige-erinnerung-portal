
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Camera, Music, Sparkles, Diamond, Package, Cube } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
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
              Aus Erinnerungen wird ein stilles Denkmal – ein QR-Code öffnet die Tür zu bewegenden
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
              Unsere Glasplatte mit QR-Code vereint moderne Technologie mit würdevoller Erinnerung. Sie ermöglicht es, 
              das Leben eines geliebten Menschen durch Bilder, Videos und Musik lebendig zu halten – direkt am Grab.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <FeatureCard 
                icon={Sparkles}
                title="Einzigartiges Gedenken"
                description="Bewahren Sie besondere Erinnerungen mit einem personalisierten QR-Code, der Ihre schönsten Momente zugänglich macht."
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
              eine Glasplatte mit QR-Code, der direkt zu Ihrer Erinnerung führt.
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
              <h3 className="text-xl font-serif text-center mb-4">QR-Code erhalten</h3>
              <p className="text-muted-foreground text-center">
                Ihre persönliche Glasplatte mit QR-Code wird gefertigt und direkt zu Ihnen nach Hause geliefert.
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
      
      {/* Testimonial/Quote Section */}
      <section ref={testimonialRef} className="py-24 bg-primary text-primary-foreground dark-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              "Honoring lives, one memory at a time"
            </h2>
            <p className="text-xl mb-8">
              Erschaffen Sie eine herzliche Hommage mit unserem personalisierten Video-Service. 
              Teilen Sie kostbare Momente und Lieblingsmelodien, alles zugänglich über einen einzigartigen QR-Code.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Erinnerungs-Kuratorin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium">Anna Müller</p>
                <p className="text-sm text-primary-foreground/70">Erinnerungs-Kuratorin</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Wählen Sie Ihre Gedenktafel</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wir bieten hochwertige Glasplatten mit QR-Code in verschiedenen Materialien an. 
              Jede Platte ist ein würdiges Andenken, das die Erinnerung an einen geliebten Menschen bewahrt.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard Option */}
            <Card className="border border-border">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Package className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif text-center">Standard</CardTitle>
                <CardDescription className="text-center text-muted-foreground">Gehärtetes Glas</CardDescription>
                <div className="text-3xl font-bold text-center mt-4">99 CHF</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Hochwertiges gehärtetes Glas
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Persönlicher Erinnerungsfilm
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Integration von Fotos und Musik
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    5 Jahre Hosting-Service
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/gedenken?product=standard">Jetzt bestellen</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Option */}
            <Card className="border-2 border-primary relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm rounded-full">
                Empfohlen
              </div>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Cube className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif text-center">Premium</CardTitle>
                <CardDescription className="text-center text-muted-foreground">Kristallglas</CardDescription>
                <div className="text-3xl font-bold text-center mt-4">149 CHF</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Hochwertiges Kristallglas
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Erweiterter Erinnerungsfilm (bis zu 5 Min.)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Integration von Fotos, Videos und Musik
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    10 Jahre Hosting-Service
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Kostenlose Lieferung innerhalb der Schweiz
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-primary">
                  <Link to="/gedenken?product=premium">Jetzt bestellen</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Luxury Option */}
            <Card className="border border-border">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Diamond className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif text-center">Luxury</CardTitle>
                <CardDescription className="text-center text-muted-foreground">Optisches Kristallglas</CardDescription>
                <div className="text-3xl font-bold text-center mt-4">199 CHF</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Premium optisches Kristallglas
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unbegrenzter Erinnerungsfilm
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Vollständige Multimedia-Integration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Lebenslanger Hosting-Service
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Kostenlose Express-Lieferung
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/gedenken?product=luxury">Jetzt bestellen</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        />
        
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
