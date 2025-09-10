import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Heart, User, Mail } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const Ueber = () => {
  const { t, sharedContent } = useContent();

  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Titel & Lead */}
              <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">
                {t("aboutPage.title")}
              </h1>

            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-center mb-12">
                {t("aboutPage.lead")}
              </p>

              {/* Story */}
              <div className="my-12 p-8 bg-secondary rounded-xl">
                <h2 className="text-2xl font-serif mb-4">
                  {t("aboutPage.story.title")}
                </h2>
                <p>{t("aboutPage.story.p1")}</p>
                <p className="mt-4">{t("aboutPage.story.p2")}</p>
                <p className="mt-4">{t("aboutPage.story.p3")}</p>
                <p className="mt-4">{t("aboutPage.story.p4")}</p>
                <p className="mt-4">{t("aboutPage.story.p5")}</p>
              </div>

              {/* Werte */}
              <h2 className="text-2xl font-serif mb-4">
                {t("aboutPage.values.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">
                    {t("aboutPage.values.compassion.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("aboutPage.values.compassion.desc")}
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <User className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">
                    {t("aboutPage.values.personality.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("aboutPage.values.personality.desc")}
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Mail className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">
                    {t("aboutPage.values.connection.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("aboutPage.values.connection.desc")}
                  </p>
                </div>
              </div>

              {/* Produkt/Warum Memora */}
              <div className="bg-card p-8 rounded-lg shadow-sm border border-border mb-12">
                <h2 className="text-2xl font-serif mb-4">
                  {t("aboutPage.product.title")}
                </h2>
                <p>{t("aboutPage.product.p1")}</p>
                <p className="mt-4">{t("aboutPage.product.p2")}</p>
              </div>

              {/* Optionales Zitat (falls vorhanden) */}
              {t("aboutPage.quote") !== "aboutPage.quote" && (
                <div className="text-center my-16">
                  <p className="italic font-serif text-xl">{t("aboutPage.quote")}</p>
                </div>
              )}
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
