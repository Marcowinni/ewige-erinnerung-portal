
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Heart, User, Mail } from "lucide-react";

const Ueber = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Über Memora Moments</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-center mb-12">
                Wir verbinden moderne Technologie mit traditioneller Erinnerungskultur, 
                um Ihnen zu helfen, das Andenken an Ihre Liebsten lebendig zu halten.
              </p>
              
              <div className="my-12 p-8 bg-secondary rounded-xl">
                <h2 className="text-2xl font-serif mb-4">Unsere Geschichte</h2>
                <p>
                  Die Idee zu Memora Moments entstand aus einer persönlichen Erfahrung. Nach dem frühen Verlust meines Grossvaters 
                   verging Zeit und die Erinnerungen an die Person wurden schwächer und schwächer..
                </p>
                <p className="mt-4">
                  Wir entdeckten, dass traditionelle Gedenkformen oft statisch sind und nur begrenzte Möglichkeiten bieten, 
                  die Persönlichkeit und die besonderen Momente des Verstorbenen zu vermitteln. So entwickelten wir eine Lösung, 
                  die Technologie nutzt, um Erinnerungen in einer respektvollen und dennoch lebendigen Weise zu bewahren.
                </p>
              </div>
              
              <h2 className="text-2xl font-serif mb-4">Was uns antreibt</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">Mitgefühl</h3>
                  <p className="text-muted-foreground">
                    Wir verstehen den Schmerz des Verlusts und schaffen einfühlsame Wege, 
                    Erinnerungen zu bewahren und zu würdigen.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <User className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">Persönlichkeit</h3>
                  <p className="text-muted-foreground">
                    Jeder Mensch ist einzigartig. Unsere Gedenkplatten spiegeln die Individualität 
                    und die besonderen Momente Ihrer Liebsten wider.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Mail className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">Verbindung</h3>
                  <p className="text-muted-foreground">
                    Wir schaffen eine Brücke zwischen Vergangenheit und Gegenwart, 
                    die Generationen verbindet und Geschichten weiterträgt.
                  </p>
                </div>
              </div>
              
              <div className="bg-card p-8 rounded-lg shadow-sm border border-border mb-12">
                <h2 className="text-2xl font-serif mb-4">Unsere Memora Moments</h2>
                <p>
                  Jede Memora Moments Platte besteht aus hochwertigem, 
                  witterungsbeständigem Material, das speziell für den Ausseneinsatz entwickelt wurde. Die eingebettete 
                  NFC-Technologie ist UV-beständig und funktioniert über Jahre hinweg zuverlässig.
                </p>
                <p className="mt-4">
                  Die Platten sind dezent gestaltet und fügen sich 
                  harmonisch in die Gedenkstätte ein.
                </p>
              </div>
              
              <div className="text-center my-16">
                <p className="italic font-serif text-xl">"Memora - Erinnerungen die weiterleben."</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Ueber;
