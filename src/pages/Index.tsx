import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Camera, Music, Sparkles, Check, PawPrint } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useContent } from "@/contexts/ContentContext";
import { getMediaForMode } from "@/data/productMedia";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Neu: wir holen auch das mode (human | pet | surprise)
  const { mode, isPetMode, modeContent } = useContent();
  const content = modeContent;

  // Produktmedien basierend auf dem Modus
  const media = getMediaForMode(mode);

  // Hintergrundbild je Modus
  const heroBg = mode === "pet"
    ? "url('/lovable-uploads/background_pet.png')"
    : mode === "surprise"
      ? "url('/lovable-uploads/background_surprise.png ')"
      : "url('/lovable-uploads/background_human.png')";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover -z-10"
          style={{
            backgroundImage: heroBg,
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background/90 -z-10" />

        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="hero-content relative max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-shadow">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 text-shadow">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/gedenken">{content.hero.startButton}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <Link to="/ueber">{content.hero.learnButton}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{content.features.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={isPetMode ? PawPrint : Sparkles} // Surprise nutzt Sparkles
              title={content.features.unique.title}
              description={content.features.unique.desc}
              iconColor={isPetMode ? "text-orange-500" : "text-amber-500"}
            />
            <FeatureCard
              icon={Camera}
              title={content.features.multimedia.title}
              description={content.features.multimedia.desc}
              iconColor="text-blue-500"
            />
            <FeatureCard
              icon={Music}
              title={content.features.music.title}
              description={content.features.music.desc}
              iconColor="text-purple-500"
            />
            <FeatureCard
              icon={Heart}
              title={content.features.quality.title}
              description={content.features.quality.desc}
              iconColor="text-red-500"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{content.howitworks.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.howitworks.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">{content.howitworks.step1.title}</h3>
              <p className="text-muted-foreground text-center">{content.howitworks.step1.desc}</p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">{content.howitworks.step2.title}</h3>
              <p className="text-muted-foreground text-center">{content.howitworks.step2.desc}</p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-serif text-center mb-4">{content.howitworks.step3.title}</h3>
              <p className="text-muted-foreground text-center">{content.howitworks.step3.desc}</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/gedenken">{content.cta.create}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section ref={productsRef} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{content.products.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.products.subtitle}</p>
          </div>

          {/* Demo Videos Carousel */}
          <div className="max-w-4xl mx-auto mb-16">
            <Carousel className="w-full">
              <CarouselContent>
                {media.demoVideos.map((video, index) => (
                  <CarouselItem key={index}>
                    <div className="rounded-lg overflow-hidden shadow-xl">
                      <div className="aspect-w-16 aspect-h-9 relative">
                        <video className="w-full rounded-lg" controls poster={video.poster}>
                          <source src={video.src} type="video/mp4" />
                          Ihr Browser unterstützt keine Videos.
                        </video>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Product Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic */}
              <Card className="h-full border-2 border-border">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {(media.basicProduct?.images ?? []).map((image, index) => (
                        <CarouselItem key={index}>
                          <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </CardHeader>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-center">{content.products.basic.title}</h3>
                  <ul className="space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.tag1}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.tag2}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.tag3}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.tag4}</li>
                  </ul>
                  <p className="text-center text-muted-foreground">{content.products.basic.desc}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-3xl font-bold">{content.products.basic.price}</p>
                </CardFooter>
              </Card>

              {/* Premium */}
              <Card className="h-full border-2 border-border">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {(media.premiumProduct?.images ?? []).map((image, index) => (
                        <CarouselItem key={index}>
                          <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </CardHeader>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-center">{content.products.premium.title}</h3>
                  <ul className="space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.premium1}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.premium2}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.premium3}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.premium4}</li>
                  </ul>
                  <p className="text-center text-muted-foreground">{content.products.premium.desc}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-3xl font-bold">{content.products.premium.price}</p>
                </CardFooter>
              </Card>

              {/* Deluxe (NEU) */}
              <Card className="h-full border-2 border-border">
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {(media.deluxeProduct?.images ?? media.premiumProduct?.images ?? []).map((image, index) => (
                        <CarouselItem key={index}>
                          <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </CardHeader>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-center">{content.products.deluxe.title}</h3>
                  <ul className="space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.deluxe1}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.deluxe2}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.deluxe3}</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />{content.products.features.deluxe4}</li>
                  </ul>
                  <p className="text-center text-muted-foreground">{content.products.deluxe.desc}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-3xl font-bold">{content.products.deluxe.price}</p>
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
            <h2 className="text-3xl md:text-4xl font-serif mb-6">{content.cta.title}</h2>
            <p className="text-xl text-muted-foreground mb-8">{content.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/gedenken">{content.cta.create}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/kontakt">{content.cta.contact}</Link>
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
