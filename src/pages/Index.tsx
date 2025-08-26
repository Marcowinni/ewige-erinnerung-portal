import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Camera, Music, Sparkles, Diamond, Package, Star, Images } from "lucide-react";
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
          
          {/* Product Images Carousel */}
          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full" showControls={false}>
              <CarouselContent>
                {/* Standard Product */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                          alt="Standard Gedenkplatte" 
                          className="w-full h-48 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h3 className="text-xl font-bold text-center">Standard Aluminium</h3>
                        <p className="text-center text-muted-foreground mt-2">
                          Hochwertige NFC-Glasplatte für Ihre digitalen Erinnerungen.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <p className="font-bold">99 CHF</p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Premium Product */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full border-2 border-primary">
                      <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                        <div className="bg-primary text-primary-foreground text-center py-1">
                          Empfohlen
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                          alt="Premium Gedenkplatte" 
                          className="w-full h-48 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h3 className="text-xl font-bold text-center">Premium Kristallglas</h3>
                        <p className="text-center text-muted-foreground mt-2">
                          Hochwertige Kristallglas-Gedenkplatte mit erweitertem Speicherplatz.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <p className="font-bold">149 CHF</p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Luxury Product */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                          alt="Luxury Gedenkplatte" 
                          className="w-full h-48 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h3 className="text-xl font-bold text-center">Luxury Marmor</h3>
                        <p className="text-center text-muted-foreground mt-2">
                          Premium Marmor-Steinplatte mit lebenslangem Hosting-Service.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <p className="font-bold">199 CHF</p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Wählen Sie Ihre Gedenktafel</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wir bieten hochwertige NFC-Platten in verschiedenen Materialien an. 
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
                <CardTitle className="text-2xl font-serif text-center">Memoro Moments Standard</CardTitle>
                <CardDescription className="text-center text-muted-foreground">Aluminium</CardDescription>
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
                  <Star className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif text-center">Memoro Moments Premium</CardTitle>
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
                <CardTitle className="text-2xl font-serif text-center">Memoro Moments Luxury</CardTitle>
                <CardDescription className="text-center text-muted-foreground">Marmor-Steinplatte</CardDescription>
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
