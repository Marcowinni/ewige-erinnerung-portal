import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

// Legal text is binding in German for our Swiss entity, so the privacy policy
// is rendered in German regardless of the UI locale. Kept as structured JSX
// (not via the content schema) because it includes tables the schema can't hold.
const Datenschutz = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-4 text-foreground">
            Datenschutzerklärung
          </h1>
          <p className="text-center text-sm text-muted-foreground mb-12">Memora Moments</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">1. Verantwortlicher</h2>
              <p>
                Verantwortlicher im Sinne des Schweizer Datenschutzgesetzes (nDSG) sowie der
                EU-Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <p style={{ whiteSpace: "pre-line" }}>
                {"TW Projects GmbH (Marke: Memora Moments)\nBreitenmattstrasse 69\n8635 Dürnten\nSchweiz\n\nE-Mail: info@memora-moments.ch\nTelefon: +41 79 407 56 99"}
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                2. Geltungsbereich und Hinweis zum sensiblen Charakter unserer Dienstleistung
              </h2>
              <p>
                Diese Datenschutzerklärung gilt für die Webseite <strong>www.memora-moments.ch</strong> und die
                darüber angebotenen Produkte (personalisierte Smart Tags mit verknüpften digitalen
                Erinnerungsalben).
              </p>
              <p>
                Wir sind uns des sensiblen Charakters unserer Dienstleistung bewusst: Sie betrifft Trauernde und
                beinhaltet die Verarbeitung von Erinnerungen an verstorbene Personen sowie häufig auch Inhalte mit
                Bezug zu lebenden Angehörigen. Wir behandeln alle übermittelten Daten mit besonderer Sorgfalt und
                beschränken die Verarbeitung strikt auf das, was zur Erfüllung Ihrer Bestellung notwendig ist.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">3. Zweck der Datenverarbeitung</h2>
              <p>Memora Moments verarbeitet personenbezogene Daten zu folgenden Zwecken:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Abwicklung von Bestellungen einschliesslich Zahlungsabwicklung und Versand</li>
                <li>Erstellung, Layout und Veröffentlichung des personalisierten Erinnerungsalbums</li>
                <li>Bereitstellung des Erinnerungsalbums beim Aufruf der Smart-Tag- bzw. QR-Code-URL</li>
                <li>Versand der Auftragsbestätigung und transaktionaler E-Mails</li>
                <li>Kundenkommunikation, einschliesslich Beantwortung von Anfragen und Reklamationsbearbeitung</li>
                <li>Reichweitenmessung in pseudonymisierter Form</li>
                <li>Erfüllung gesetzlicher Aufbewahrungs- und Mitwirkungspflichten</li>
              </ul>
              <p>
                Eine Verarbeitung zu Werbezwecken Dritter, zur Profilbildung oder zur automatisierten
                Einzelfallentscheidung findet nicht statt. Wir verkaufen keine Daten und geben sie nicht zu
                Werbezwecken weiter.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">4. Welche Daten wir erheben</h2>

              <h3 className="text-xl font-serif mt-6 mb-3">4.1 Bestelldaten</h3>
              <p>Für die Abwicklung Ihrer Bestellung verarbeiten wir:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Anrede, Vor- und Nachname</li>
                <li>Lieferadresse und Rechnungsadresse</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer (optional, für Rückfragen)</li>
                <li>Zahlungsinformationen (verarbeitet direkt durch Stripe, siehe Ziff. 6)</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Rechtsgrundlage: Art. 31 Abs. 2 lit. a nDSG, Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>

              <h3 className="text-xl font-serif mt-6 mb-3">4.2 Album-Inhalte (hochgeladene Medien)</h3>
              <p>
                Im Rahmen der Personalisierung Ihres Erinnerungsalbums können Sie folgende Inhalte hochladen und
                festlegen:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Fotos und Videos</strong> (maximal 40 Dateien, maximal 200 MB pro Video)</li>
                <li><strong>Bildunterschriften</strong> und optionale Widmung</li>
                <li><strong>Name und Lebensdaten</strong> der verstorbenen Person</li>
                <li><strong>Musiktitel</strong> (Auswahl aus vordefinierten Optionen)</li>
                <li><strong>Editor-Einstellungen</strong>: Layout-Auswahl, Texte pro Seite, Bildausschnitt (Focal Point)</li>
              </ul>
              <p>
                Hochgeladene Fotos und Videos können neben Aufnahmen verstorbener Personen auch Aufnahmen lebender
                Personen (Angehörige, Freunde, Verwandte) enthalten und sind damit in Teilen{" "}
                <strong>besonders schützenswerte Personendaten</strong> im Sinne von Art. 5 lit. c nDSG bzw. besondere
                Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO.
              </p>
              <p>
                <strong>Speicherung:</strong> Album-Inhalte und Editor-Einstellungen werden bei <strong>Supabase</strong>{" "}
                (Datenbank und Storage, EU-Region Frankfurt) verschlüsselt gespeichert.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Ihre ausdrückliche Einwilligung im Bestellprozess (Art. 6 Abs. 6
                nDSG, Art. 9 Abs. 2 lit. a DSGVO) sowie die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Mit dem
                Hochladen bestätigen Sie:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>dass Sie zur Übermittlung der Inhalte berechtigt sind,</li>
                <li>
                  dass die Rechte aller darauf abgebildeten lebenden Personen (Bildrechte, Persönlichkeitsrechte)
                  geklärt sind, und
                </li>
                <li>
                  dass Sie der Verarbeitung zum Zweck der Personalisierung und Bereitstellung des Erinnerungsalbums
                  ausdrücklich zustimmen.
                </li>
              </ul>
              <p>
                <strong>Widerruf:</strong> Die erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
                widerrufen (info@memora-moments.ch). Bei Widerruf werden die Album-Inhalte innerhalb von 30 Tagen
                gelöscht; das damit verknüpfte Erinnerungsalbum kann danach nicht mehr abgerufen werden.
              </p>

              <h3 className="text-xl font-serif mt-6 mb-3">4.3 Smart-Tag-Slug und öffentliche Album-URL</h3>
              <p>
                Jedes Album erhält eine eindeutige URL nach dem Schema <strong>memora-moments.ch/album/[slug]</strong>{" "}
                (zum Beispiel <code>memora-moments.ch/album/marie-01</code>). Diese URL wird über den physischen Smart
                Tag (NFC) oder einen QR-Code aufgerufen.
              </p>
              <p>
                <strong>Wichtiger Hinweis zur Zugänglichkeit:</strong> Die Album-URLs sind{" "}
                <strong>öffentlich zugänglich</strong>, sobald jemand die URL kennt. Es gibt keinen Passwortschutz und
                keine Login-Pflicht für den Abruf. Jede Person, die im Besitz der URL ist (oder den NFC-Tag/QR-Code
                scannt), kann auf die Album-Inhalte zugreifen.
              </p>
              <p>
                Sie als Besteller bestimmen mit Ihrer Bestellung, dass die Inhalte in dieser Form bereitgestellt werden
                sollen, und tragen die Verantwortung für die Weitergabe des Smart Tags oder der URL an Dritte.
              </p>

              <h3 className="text-xl font-serif mt-6 mb-3">4.4 Technische Daten beim Abruf von Webseite und Album</h3>
              <p>
                Beim Aufruf unserer Webseite oder eines Albums werden durch unseren Hosting-Provider Vercel Inc., 340 S
                Lemon Ave #4133, Walnut, CA 91789, USA technisch notwendige Daten in Logfiles erfasst:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP-Adresse (gekürzt durch CDN-Anbieter)</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Aufgerufene URL und HTTP-Statuscode</li>
                <li>User-Agent (Browser- und Betriebssystem-Information)</li>
                <li>Referrer-URL</li>
              </ul>
              <p>
                Die Auslieferung erfolgt über das Edge-Netzwerk von Vercel; für Besucher aus Europa primär über Server
                in Frankfurt und Dublin. Rechtsgrundlage: Art. 31 Abs. 2 lit. d nDSG, Art. 6 Abs. 1 lit. f DSGVO
                (Sicherheit und Performance). Speicherdauer: 30 Tage.
              </p>

              <h3 className="text-xl font-serif mt-6 mb-3">4.5 Vercel Analytics (Reichweitenmessung)</h3>
              <p>
                Diese Webseite verwendet <strong>Vercel Analytics</strong> zur statistischen Auswertung des
                Besucherverhaltens. Vercel Analytics arbeitet <strong>cookie-frei</strong> und ohne geräteübergreifende
                Identifikatoren. Verarbeitet werden ausschliesslich aggregierte Daten (Seitenaufrufe, Referrer,
                ungefähre geografische Region, Gerätetyp). Eine Sitzungs-Wiedererkennung erfolgt über einen
                anonymisierten Hash, der nach 24 Stunden verfällt.
              </p>
              <p>
                Da keine personenbezogenen Daten im Sinne von Art. 4 Nr. 1 DSGVO verarbeitet werden, ist keine
                Einwilligung erforderlich. Rechtsgrundlage: Art. 31 Abs. 2 lit. d nDSG, Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p>
                Weitere Informationen:{" "}
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  https://vercel.com/docs/analytics/privacy-policy
                </a>
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">5. Cookies</h2>
              <p>
                Diese Webseite setzt ausschliesslich <strong>technisch notwendige Cookies</strong> zur
                Aufrechterhaltung der Sitzung und der Sprachauswahl während des Bestellvorgangs und der
                Album-Erstellung. Diese Cookies sind für die Funktion der Webseite zwingend erforderlich und
                unterliegen keiner Einwilligungspflicht (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <p>
                Es werden <strong>keine Marketing-, Analyse- oder Tracking-Cookies</strong> gesetzt. Insbesondere setzen
                wir <strong>kein Google Analytics</strong>, keinen Meta Pixel und keine sonstigen Marketing-Tags ein.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">6. Zahlungsabwicklung über Stripe</h2>
              <p>
                Die Zahlungsabwicklung erfolgt über <strong>Stripe Payments Europe Limited</strong> (1 Grand Canal
                Street Lower, Grand Canal Dock, Dublin, Irland; Konzernverbund mit Stripe Inc., USA).
              </p>
              <p>
                Bei Zahlung werden die zur Abwicklung erforderlichen Daten (Zahlungsmethode, Karteninformationen,
                Rechnungsadresse, IP-Adresse) direkt an Stripe übermittelt.{" "}
                <strong>Wir selbst erhalten keine vollständigen Kartendaten und speichern diese nicht.</strong>
              </p>
              <p>
                <strong>Doppelte Rolle von Stripe:</strong> Stripe verarbeitet die Zahlungsdaten teilweise im Auftrag
                der TW Projects GmbH (Auftragsbearbeitung im Sinne von Art. 28 DSGVO) und teilweise als{" "}
                <strong>eigenständiger Verantwortlicher</strong> für eigene Zwecke (insbesondere Betrugsprävention,
                Risikoanalysen und regulatorische Pflichten als Zahlungsdienstleister). Auf die Verarbeitung durch
                Stripe als eigenständiger Verantwortlicher haben wir keinen Einfluss; massgebend ist die
                Datenschutzerklärung von Stripe:{" "}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                  https://stripe.com/privacy
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Rechtsgrundlage: Art. 31 Abs. 2 lit. a nDSG, Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">7. Versand</h2>
              <p>
                Für den physischen Versand des Smart Tags übermitteln wir Ihre Lieferadresse und ggf. Ihre
                Telefonnummer an die <strong>Schweizerische Post AG</strong> (Wankdorfallee 4, 3030 Bern) bzw. einen
                alternativen Logistikpartner. Die Post AG bzw. der Logistikpartner verarbeitet diese Daten als
                eigenständige verantwortliche Stelle im Rahmen ihrer Beförderungspflicht.
              </p>
              <p className="text-sm text-muted-foreground">
                Rechtsgrundlage: Art. 31 Abs. 2 lit. a nDSG, Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">8. Kontaktaufnahme</h2>
              <p>
                Bei Kontaktaufnahme per E-Mail an info@memora-moments.ch oder telefonisch unter +41 79 407 56 99 werden
                die übermittelten Angaben zur Bearbeitung Ihrer Anfrage gespeichert. E-Mails werden über{" "}
                <strong>Google Workspace</strong> (Google Ireland Limited, Dublin, Irland) verarbeitet.
              </p>
              <p className="text-sm text-muted-foreground">
                Rechtsgrundlage: Art. 31 Abs. 2 lit. a nDSG, Art. 6 Abs. 1 lit. b und f DSGVO.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">9. Auftragsbearbeiter und Empfänger</h2>
              <p>
                Wir setzen für den Betrieb der Plattform folgende Auftragsbearbeiter ein, mit denen ein
                Auftragsbearbeitungsvertrag nach Art. 9 nDSG / Art. 28 DSGVO besteht:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-foreground/20 text-left">
                      <th className="py-2 pr-4 font-semibold">Anbieter</th>
                      <th className="py-2 pr-4 font-semibold">Zweck</th>
                      <th className="py-2 pr-4 font-semibold">Sitz</th>
                      <th className="py-2 font-semibold">Datenübermittlung</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Vercel Inc.</td>
                      <td className="py-2 pr-4">Webseiten-Hosting, Edge-CDN, Reichweitenmessung</td>
                      <td className="py-2 pr-4">USA, Auslieferung über EU-Server</td>
                      <td className="py-2">EU (Frankfurt, Dublin), bei Bedarf USA</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Supabase Inc.</td>
                      <td className="py-2 pr-4">Datenbank und Storage für Bestellungen, Album-Inhalte und Editor-Einstellungen</td>
                      <td className="py-2 pr-4">Singapur, Speicherung in EU-Region</td>
                      <td className="py-2">EU (Frankfurt)</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Stripe Payments Europe Limited</td>
                      <td className="py-2 pr-4">Zahlungsabwicklung</td>
                      <td className="py-2 pr-4">Irland (EU), Konzernverbund USA</td>
                      <td className="py-2">EU, bei Bedarf USA</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Google Ireland Limited</td>
                      <td className="py-2 pr-4">E-Mail und Office-Tools (Google Workspace)</td>
                      <td className="py-2 pr-4">Irland (EU)</td>
                      <td className="py-2">EU, bei Bedarf USA</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Schweizerische Post AG / Logistikpartner</td>
                      <td className="py-2 pr-4">Physischer Versand (eigenständig verantwortlich, kein AVV erforderlich)</td>
                      <td className="py-2 pr-4">Schweiz</td>
                      <td className="py-2">Schweiz</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">10. Auslandsübermittlung</h2>
              <p>
                Eine Übermittlung personenbezogener Daten in die USA findet im Rahmen der oben genannten
                Auftragsbearbeitungen statt. Die Rechtmässigkeit wird durch folgende Mechanismen gewährleistet:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>EU-Standardvertragsklauseln</strong> (SCC) mit allen US-basierten Dienstleistern</li>
                <li>
                  <strong>EU-U.S. Data Privacy Framework</strong> für zertifizierte US-Unternehmen (u.a. Vercel,
                  Google, Stripe)
                </li>
                <li>
                  Anerkennung der USA als Land mit angemessenem Datenschutzniveau für DPF-zertifizierte Unternehmen
                  durch die Schweiz
                </li>
              </ul>
              <p>
                <strong>Album-Inhalte (hochgeladene Medien) werden ausschliesslich in der EU (Frankfurt) gespeichert</strong>{" "}
                und nicht in Drittstaaten übermittelt.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">11. Speicherdauer</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-foreground/20 text-left">
                      <th className="py-2 pr-4 font-semibold">Datenkategorie</th>
                      <th className="py-2 font-semibold">Speicherdauer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Server-Logfiles</td>
                      <td className="py-2">30 Tage</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Vercel Analytics (aggregiert)</td>
                      <td className="py-2">12 Monate</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Bestelldaten und Rechnungsbelege</td>
                      <td className="py-2">10 Jahre (Art. 958f OR)</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Album-Inhalte (Fotos, Videos, Texte)</td>
                      <td className="py-2">
                        Mindestens 12 Monate ab Auslieferung des Smart Tags. Eine darüber hinausgehende Verfügbarkeit
                        ist nicht vertraglich zugesichert. Auf schriftliche Anfrage erfolgt frühere Löschung oder
                        Anonymisierung.
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-2 pr-4">Zahlungsdaten</td>
                      <td className="py-2">Gemäss gesetzlichen Aufbewahrungspflichten (10 Jahre für Buchhaltungsbelege)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Anfragen ohne Bestellbezug</td>
                      <td className="py-2">Bis zur Erledigung, max. 6 Monate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">12. Rechte der betroffenen Personen</h2>
              <p>
                Nach nDSG und DSGVO bestehen folgende Rechte. Anfragen senden Sie bitte an info@memora-moments.ch:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Auskunft</strong> über die zur Person gespeicherten Daten (Art. 25 nDSG, Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> unrichtiger oder unvollständiger Daten (Art. 32 Abs. 1 nDSG, Art. 16 DSGVO)</li>
                <li>
                  <strong>Löschung</strong> Ihrer Daten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen
                  (Art. 32 Abs. 2 nDSG, Art. 17 DSGVO)
                </li>
                <li>
                  <strong>Einschränkung oder Widerspruch</strong> gegen bestimmte Verarbeitungen (Art. 30 Abs. 2 lit. b
                  nDSG, Art. 18, 21 DSGVO)
                </li>
                <li><strong>Datenübertragbarkeit</strong> in einem strukturierten Format (Art. 28 nDSG, Art. 20 DSGVO)</li>
                <li>
                  <strong>Widerruf erteilter Einwilligungen</strong>, insbesondere zur Verarbeitung hochgeladener
                  Album-Inhalte, mit Wirkung für die Zukunft (Art. 6 Abs. 6 nDSG, Art. 7 Abs. 3 DSGVO)
                </li>
                <li>
                  <strong>Beschwerderecht</strong> beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten
                  (EDÖB, www.edoeb.admin.ch) bzw. bei der zuständigen EU-Aufsichtsbehörde
                </li>
              </ul>
              <p>
                Wir bearbeiten Anfragen innerhalb von 30 Tagen. Zur Identitätsprüfung können wir geeignete Nachweise
                verlangen.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">13. Datensicherheit</h2>
              <p>Wir schützen Ihre Daten mit aktuellen technischen und organisatorischen Massnahmen:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Übertragung ausschliesslich über HTTPS (TLS)</li>
                <li>Verschlüsselte Speicherung hochgeladener Medien (At-Rest-Encryption auf Supabase Storage)</li>
                <li>Zugriffskontrolle auf Datenbankebene (Row-Level-Security)</li>
                <li>Getrennte Service-Schlüssel für Edge-Funktionen und administrative Zugänge</li>
                <li>Multi-Faktor-Authentifizierung für administrative Zugänge</li>
                <li>Regelmässige Backups bei unseren Cloud-Anbietern</li>
              </ul>
              <p>
                Aufgrund der besonderen Sensibilität der über Memora Moments verarbeiteten Inhalte legen wir auf diese
                Massnahmen erhöhten Wert. Ein restloser Schutz bei Übertragungen über das öffentliche Internet (z.B.
                E-Mail) kann jedoch nicht garantiert werden.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">14. Kein EU-Vertreter</h2>
              <p>
                TW Projects GmbH hat aktuell keinen Vertreter in der EU im Sinne von Art. 27 DSGVO benannt, da die
                Verarbeitung personenbezogener Daten von EU-Bürgern nur gelegentlich erfolgt und kein hohes Risiko für
                die Rechte und Freiheiten der Betroffenen darstellt. Sollte sich der Geschäftsbetrieb auf den EU-Raum
                ausweiten, wird die Einschätzung neu vorgenommen.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-2xl font-serif mb-4">15. Änderungen dieser Datenschutzerklärung</h2>
              <p>
                TW Projects GmbH behält sich vor, diese Datenschutzerklärung anzupassen, wenn sich Funktionen, Anbieter
                oder die Rechtslage ändern. Wesentliche Änderungen werden auf der Webseite kommuniziert. Es gilt jeweils
                die zum Zeitpunkt des Besuchs der Webseite veröffentlichte Fassung.
              </p>
            </section>

            <hr className="border-foreground/15" />
            <p className="text-sm text-muted-foreground">
              <strong>Stand:</strong> 26. Mai 2026
              <br />
              TW Projects GmbH (Marke: Memora Moments) · Dürnten, Schweiz · info@memora-moments.ch · +41 79 407 56 99
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Datenschutz;
