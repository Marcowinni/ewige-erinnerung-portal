
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Heart, User, Mail } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const Ueber = () => {
  const { t } = useContent();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">{t('about.title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-center mb-12">
                {t('about.lead')}
              </p>
              
              <div className="my-12 p-8 bg-secondary rounded-xl">
                <h2 className="text-2xl font-serif mb-4">{t('about.story.title')}</h2>
                <p>
                  {t('about.story.p1')}
                </p>
                <p className="mt-4">
                  {t('about.story.p2')}
                </p>
              </div>
              
              <h2 className="text-2xl font-serif mb-4">{t('about.values.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">{t('about.values.compassion.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.values.compassion.desc')}
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <User className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">{t('about.values.personality.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.values.personality.desc')}
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Mail className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">{t('about.values.connection.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.values.connection.desc')}
                  </p>
                </div>
              </div>
              
              <div className="bg-card p-8 rounded-lg shadow-sm border border-border mb-12">
                <h2 className="text-2xl font-serif mb-4">{t('about.product.title')}</h2>
                <p>
                  {t('about.product.p1')}
                </p>
                <p className="mt-4">
                  {t('about.product.p2')}
                </p>
              </div>
              
              <div className="text-center my-16">
                <p className="italic font-serif text-xl">{t('about.quote')}</p>
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
