import { useContent } from "@/contexts/ContentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

const Datenschutz = () => {
  const { sharedContent } = useContent();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-8 text-foreground">
            Datenschutzerklärung
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-serif mb-4">1. Verantwortlicher</h2>
              <p>
                Memora Moments<br />
                E-Mail: info.memora.moments@gmail.com<br />
                Telefon: +41 79 407 56 99
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">2. Datenerhebung und -verwendung</h2>
              <p>
                Wir erheben und verarbeiten personenbezogene Daten nur in dem Umfang, wie es für die 
                Bereitstellung unserer Dienstleistungen erforderlich ist. Dies umfasst:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kontaktdaten für die Bestellabwicklung</li>
                <li>Rechnungsdaten für die Bezahlung</li>
                <li>Von Ihnen hochgeladene Bilder und Texte für die Produktgestaltung</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">3. Bildverarbeitung</h2>
              <p>
                Die von Ihnen hochgeladenen Bilder werden ausschließlich für die Erstellung Ihres 
                personalisierten Produkts verwendet. Ihre Bilder werden sicher gespeichert und nach 
                Abschluss der Bestellung bzw. nach angemessener Zeit gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">4. Ihre Rechte</h2>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der 
                Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter 
                info.memora.moments@gmail.com für Anfragen zu Ihren Daten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">5. Cookies</h2>
              <p>
                Unsere Website verwendet notwendige Cookies für die Funktionalität. Weitere 
                Tracking-Cookies verwenden wir nur mit Ihrer Einwilligung.
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

export default Datenschutz;