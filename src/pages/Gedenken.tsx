
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import MemoryUploader from "@/components/MemoryUploader";
import { useLanguage } from "@/contexts/LanguageContext";

const Gedenken = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('gedenken.title')}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif mb-4">
                {t('gedenken.heading')}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('gedenken.description')}
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
