import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

// Legal text — rendered in German (binding for the Swiss entity) regardless
// of the UI locale. Kept as structured JSX, not via the content schema.
const Impressum = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-4 text-foreground">
            Impressum
          </h1>
          <p className="text-center text-sm text-muted-foreground mb-12">Memora Moments</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <p>
                <strong>Memora Moments</strong> ist eine Marke der
              </p>
              <p style={{ whiteSpace: "pre-line" }}>
                {"TW Projects GmbH\nBreitenmattstrasse 69\n8635 Dürnten\nSchweiz"}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Angaben zur Gesellschaft</h2>
              <p><strong>Rechtsform:</strong> Gesellschaft mit beschränkter Haftung (GmbH)</p>
              <p><strong>UID-Nummer:</strong> CHE-440.628.856</p>
              <p>
                <strong>Handelsregister:</strong> Eintrag im Handelsregister des Kantons Zürich (Firmen-Nr.
                CHE-440.628.856), eingetragen am 28.10.2025
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Vertretungsberechtigte Geschäftsführer</h2>
              <p style={{ whiteSpace: "pre-line" }}>{"Marco Winistörfer\nTill Schubiger"}</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Kontakt</h2>
              <p><strong>E-Mail:</strong> info@memora-moments.ch</p>
              <p><strong>Telefon:</strong> +41 79 407 56 99</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Haftung für Inhalte</h2>
              <p>
                Die Inhalte dieser Webseite werden mit grösstmöglicher Sorgfalt erstellt. TW Projects GmbH übernimmt
                jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte.
                Die Nutzung der abrufbaren Inhalte erfolgt auf eigene Gefahr des Nutzers.
              </p>
              <p>
                Alle Angebote sind unverbindlich. TW Projects GmbH behält sich ausdrücklich vor, Teile der Seiten oder
                das gesamte Angebot ohne besondere Ankündigung zu verändern, zu ergänzen, zu löschen oder die
                Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Haftung für Links und nutzergenerierte Inhalte</h2>
              <p>
                Diese Webseite enthält Links zu externen Webseiten Dritter. Auf den Inhalt dieser Webseiten hat TW
                Projects GmbH keinen Einfluss. Für die Inhalte der verlinkten Seiten ist ausschliesslich deren
                Betreiber verantwortlich.
              </p>
              <p>
                Über die Webseite können Bestellerinnen und Besteller eigene Inhalte hochladen (Fotos, Videos, Texte).
                Für die Rechtmässigkeit dieser Inhalte sowie für die Einhaltung der Rechte abgebildeter Personen
                (Bildrechte, Persönlichkeitsrechte) ist ausschliesslich die jeweilige Bestellerin bzw. der jeweilige
                Besteller verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Urheberrecht</h2>
              <p>
                Sämtliche von uns auf dieser Webseite veröffentlichten Inhalte (Texte, Bilder, Grafiken, Logos,
                Quellcode, Produktdesign) sind urheberrechtlich geschützt. Jede Verwendung, Vervielfältigung,
                Bearbeitung oder Verbreitung — auch auszugsweise — bedarf der vorgängigen schriftlichen Zustimmung von
                TW Projects GmbH. Downloads und Kopien dieser Seite sind nur für den privaten Gebrauch gestattet.
              </p>
              <p>
                Von Bestellerinnen und Bestellern hochgeladene Inhalte (Album-Inhalte) bleiben Eigentum der jeweiligen
                Rechteinhaber. TW Projects GmbH nutzt diese Inhalte ausschliesslich zum Zweck der Vertragserfüllung
                gemäss den geltenden Allgemeinen Geschäftsbedingungen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Datenschutz</h2>
              <p>
                Informationen zur Verarbeitung personenbezogener Daten, insbesondere zu hochgeladenen Album-Inhalten,
                finden sich in der separaten{" "}
                <Link to="/datenschutz" className="underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </section>

            <hr className="border-foreground/15" />
            <p className="text-sm text-muted-foreground">
              TW Projects GmbH (Marke: Memora Moments) · Dürnten, Schweiz · info@memora-moments.ch
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Impressum;
