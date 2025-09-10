import { useContent } from "@/contexts/ContentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

const AGB = () => {
  const { sharedContent } = useContent();
  const { terms } = sharedContent.legal;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-8 text-foreground">
            {terms.title}
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            {/* 1. Geltungsbereich */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.scope.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.scope.content}</p>
            </section>

            {/* 2. Vertragsabschluss */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.contract.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.contract.content}</p>
            </section>

            {/* 3. Leistungen */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.services.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.services.content}</p>
            </section>

            {/* 4. Preise und Zahlungsbedingungen */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.prices.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.prices.content}</p>
            </section>

            {/* 5. Lieferung und Lieferfristen */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.delivery.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.delivery.content}</p>
            </section>

            {/* 6. Widerruf und Rücktrittsrecht */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.cancellation.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.cancellation.content}</p>
            </section>

            {/* 7. Gewährleistung */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.warranty.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.warranty.content}</p>
            </section>

            {/* 7a. Haftung */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.liability.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.liability.content}</p>
            </section>

            {/* 8. Urheberrechte und Nutzungsrechte */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.ip.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.ip.content}</p>
            </section>

            {/* 9. Datenschutz */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.privacy.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.privacy.content}</p>
            </section>

            {/* 10. Emotionale Produkte & Hinweise */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.special.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.special.content}</p>
            </section>

            {/* 11. Gerichtsstand und anwendbares Recht */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.law.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.law.content}</p>
            </section>

            {/* 12. Schlussbestimmungen */}
            <section>
              <h2 className="text-2xl font-serif mb-4">{terms.sections.final.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{terms.sections.final.content}</p>
            </section>

            {/* Optional: Kontaktblock falls vorhanden */}
            {terms.sections.contact && (
              <section>
                <h2 className="text-2xl font-serif mb-4">{terms.sections.contact.title}</h2>
                <p style={{ whiteSpace: "pre-line" }}>{terms.sections.contact.content}</p>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default AGB;
