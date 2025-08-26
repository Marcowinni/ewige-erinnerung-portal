
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import MemoryUploader from "@/components/MemoryUploader";

const Gedenken = () => {
  return (
    <>
      <Helmet>
        <title>Gedenken erstellen | Ewige Erinnerung</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif mb-4">
                Ein bleibendes Gedenken erschaffen
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Erstellen Sie eine persönliche Erinnerung mit Bildern, Videos und der Lieblingsmusik Ihres Verstorbenen, 
                zugänglich durch Berühren einer hochwertigen NFC-Glasplatte mit dem Handy.
              </p>
            </div>
            
            <MemoryUploader />
          </div>
        </main>
        
        <Footer />
        <DarkModeToggle />
      </div>
    </>
  );
};

export default Gedenken;
