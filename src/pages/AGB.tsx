import { useContent } from "@/contexts/ContentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

const AGB = () => {
  const { sharedContent } = useContent();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-8 text-foreground">
            Allgemeine Geschäftsbedingungen
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-serif mb-4">1. Geltungsbereich</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen und 
                Verträge zwischen Memora Moments und unseren Kunden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">2. Vertragsschluss</h2>
              <p>
                Der Vertrag kommt durch Ihre Bestellung und unsere Bestätigung zustande. 
                Wir behalten uns vor, Bestellungen abzulehnen, falls technische oder 
                rechtliche Hindernisse bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">3. Preise und Zahlungsbedingungen</h2>
              <p>
                Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. 
                Die Zahlung erfolgt vor der Produktion. Wir akzeptieren gängige Zahlungsmittel.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">4. Lieferung und Produktionszeit</h2>
              <p>
                Unsere personalisierten Produkte werden individuell gefertigt. Die 
                Produktionszeit beträgt in der Regel 7-14 Werktage nach Zahlungseingang 
                und finaler Freigabe des Designs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">5. Urheberrechte und Bildrechte</h2>
              <p>
                Sie bestätigen, dass Sie über alle notwendigen Rechte an den von Ihnen 
                bereitgestellten Bildern und Texten verfügen. Sie stellen uns von 
                Ansprüchen Dritter bezüglich Urheberrechts- oder Persönlichkeitsrechtsverletzungen frei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">6. Widerrufsrecht</h2>
              <p>
                Da es sich um personalisierte Produkte handelt, ist ein Widerruf nach 
                § 312g Abs. 2 Nr. 1 BGB ausgeschlossen, sobald mit der Herstellung 
                begonnen wurde.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">7. Gewährleistung</h2>
              <p>
                Wir gewährleisten die Qualität unserer Produkte. Bei Mängeln kontaktieren 
                Sie uns bitte innerhalb von 14 Tagen nach Erhalt der Ware.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">8. Kontakt</h2>
              <p>
                Bei Fragen zu diesen AGB kontaktieren Sie uns unter:<br />
                E-Mail: info.memora.moments@gmail.com<br />
                Telefon: +41 79 407 56 99
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

export default AGB;