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
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background image without parallax */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover -z-10"
          style={{ 
            backgroundImage: "url('/lovable-uploads/0e24d567-3609-48ba-8ce7-b60cb92a6e22.png')",
            filter: "brightness(0.7)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background/90 -z-10" />
        
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="hero-content relative max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-shadow">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90 mb-8 text-shadow">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/gedenken">{t('hero.start')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                <Link to="/ueber">{t('hero.learn')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('features.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <FeatureCard 
                icon={Sparkles}
                title={t('features.unique.title')}
                description={t('features.unique.desc')}
                iconColor="text-amber-500"
              />
            </div>
            
            <div>
              <FeatureCard 
                icon={Camera}
                title={t('features.multimedia.title')}
                description={t('features.multimedia.desc')}
                iconColor="text-blue-500"
              />
            </div>
            
            <div>
              <FeatureCard 
                icon={Music}
                title={t('features.music.title')}
                description={t('features.music.desc')}
                iconColor="text-purple-500"
              />
            </div>
            
            <div>
              <FeatureCard 
                icon={Heart}
                title={t('features.quality.title')}
                description={t('features.quality.desc')}
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
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('howitworks.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('howitworks.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">{t('howitworks.step1.title')}</h3>
              <p className="text-muted-foreground text-center">
                {t('howitworks.step1.desc')}
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">{t('howitworks.step2.title')}</h3>
              <p className="text-muted-foreground text-center">
                {t('howitworks.step2.desc')}
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">{t('howitworks.step3.title')}</h3>
              <p className="text-muted-foreground text-center">
                {t('howitworks.step3.desc')}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/gedenken">{t('nav.create')}</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Demo Video and Products Showcase - Replaced Testimonial */}
      <section ref={productsRef} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              {t('products.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('products.subtitle')}
            </p>
          </div>
          
          {/* Demo Videos Carousel */}
          <div className="max-w-4xl mx-auto mb-16">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="rounded-lg overflow-hidden shadow-xl">
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
                </CarouselItem>
                <CarouselItem>
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <video 
                        className="w-full rounded-lg" 
                        controls 
                        poster="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                      >
                        <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                        Ihr Browser unterstützt keine Videos.
                      </video>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          
          {/* Product Categories */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Version */}
              <Card className="h-full border-2 border-border">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                    alt={t('products.basic.title')} 
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-center">{t('products.basic.title')}</h3>
                  <ul className="space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.glass')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.nfc')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.format')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.weather')}
                    </li>
                  </ul>
                  <p className="text-center text-muted-foreground">
                    {t('products.basic.desc')}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-3xl font-bold">ab 60 CHF</p>
                </CardFooter>
              </Card>

              {/* Customizable Version */}
              <Card className="h-full border-2 border-border">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                    alt={t('products.premium.title')} 
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-center">{t('products.premium.title')}</h3>
                  <ul className="space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.all')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.photo')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.engraving')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {t('products.features.premium')}
                    </li>
                  </ul>
                  <p className="text-center text-muted-foreground">
                    {t('products.premium.desc')}
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
              {t('cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/gedenken">{t('cta.create')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/kontakt">{t('cta.contact')}</Link>
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
