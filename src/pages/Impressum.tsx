import { useContent } from "@/contexts/ContentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

const Impressum = () => {
  const { sharedContent } = useContent();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-8 text-foreground">
            Impressum
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-serif mb-4">Angaben gemäß § 5 TMG</h2>
              <p>
                <strong>Memora Moments</strong><br />
                Personalisierte Erinnerungsprodukte
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Kontakt</h2>
              <p>
                E-Mail: info.memora.moments@gmail.com<br />
                Telefon: +41 79 407 56 99
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>
                Memora Moments<br />
                E-Mail: info.memora.moments@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Haftungsausschluss</h2>
              
              <h3 className="text-xl font-serif mb-3">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf 
                diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG 
                sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte 
                oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu 
                forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>

              <h3 className="text-xl font-serif mb-3">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte 
                wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch 
                keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der 
                jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>

              <h3 className="text-xl font-serif mb-3">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Impressum;