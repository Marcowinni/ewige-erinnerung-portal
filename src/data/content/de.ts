import { ContentData } from './types';

export const deContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Gedenken erstellen",
      about: "Über uns",
      contact: "Kontakt",
      start: "Gedenken starten",
      mode: { human: "Menschen", pet: "Haustiere", surprise: "Surprise" }
    },

    banner: {
      text: "Kostenlose Lieferung in die ganze Schweiz"
    },

    albumPage: {
      title: (name) => `Erinnerungen an ${name}`,
      preTitle: "Ein digitales Album für: ",
      subtitle: "Eine Sammlung unvergesslicher Augenblicke.",
      defaultName: "diese besonderen Momente",
      playButton: "Musik abspielen",
      pauseButton: "Musik pausieren",
      playButtonHint: "Hier die Musik steuern",

      openAlbum: "Album öffnen"
    },

    // SEO/Meta für die About-Seite
    about: {
      title: "Über uns - Memora Moments",
      heading: "Über Memora Moments",
      description: "Erfahren Sie mehr über unsere Mission, würdevolle Erinnerungen zu schaffen."
    },

    // Kontaktseite (vollständig, ohne Fallbacks)
    contact: {
      title: "Kontakt - Memora Moments",
      heading: "Kontakt aufnehmen",
      description: "Haben Sie Fragen? Wir sind hier, um Ihnen zu helfen.",
      email: "E-Mail",
      phone: "Telefon",
      form: {
        title: "Nachricht senden",
        submit: "Absenden",
        success: "Danke! Wir melden uns so schnell wie möglich.",
        name: {
          label: "Name",
          placeholder: "Vor- und Nachname"
        },
        email: {
          label: "E-Mail",
          placeholder: "dein@beispiel.ch"
        },
        subject: {
          label: "Betreff",
          placeholder: "Worum geht’s?"
        },
        message: {
          label: "Nachricht",
          placeholder: "Deine Nachricht an uns…"
        }
      }
    },

    // About-Seite Content
    aboutPage: {
      title: "Über uns",
      lead: "Wir verbinden Erinnerungen mit Technologie – einfühlsam, persönlich, zugänglich.",
      story: {
        title: "Unsere Geschichte",
        p1: "Memora Moments ist aus dem Wunsch entstanden, Erinnerungen würdevoll zu bewahren.",
        p2: "Manchmal sind es die leisen Augenblicke, die unser Leben für immer verändern. Wir alle haben Menschen oder treue Wegbegleiter verloren, die uns besonders nahe standen – sei es ein geliebtes Familienmitglied oder ein Haustier, das unser Herz geprägt hat.",
        p3: "In diesen Momenten der Trauer sehnen wir uns nach Nähe, nach einem Ort, an dem Erinnerungen nicht verblassen, sondern weiterleben. Die Idee zu Memora Moments entstand genau aus dieser Erfahrung.",
        p4: "Aus der Liebe zu unseren engsten Vertrauten und aus dem Wunsch, ihre Geschichten und ihre Einzigartigkeit zu bewahren, ist dieses Projekt geboren. Ein kleines Geschenk, das zunächst nur für unsere Liebsten gedacht war, hat uns gezeigt, wie wertvoll es sein kann, Erinnerungen greifbar und lebendig zu halten – durch Bilder, Videos und Musik, die ein Lächeln zurückbringen können.",
        p5: "Heute möchten wir diese Möglichkeit mit anderen teilen. Mit unseren Produkten erschaffen wir Brücken zwischen Vergangenheit und Gegenwart – würdevoll, persönlich und nah am Herzen. Wir glauben daran, dass Erinnerungen nicht mit dem Abschied enden müssen. Sie können weiterleuchten, uns trösten und Kraft schenken."
      },
      values: {
        title: "Unsere Werte",
        compassion: {
          title: "Mitgefühl",
          desc: "Wir arbeiten respektvoll und einfühlsam – für Menschen in besonderen Lebenssituationen."
        },
        personality: {
          title: "Persönlichkeit",
          desc: "Jedes Gedenken ist individuell – wir gestalten so viel wie nötig, so wenig wie möglich."
        },
        connection: {
          title: "Verbundenheit",
          desc: "Bilder, Videos und Klang schaffen Nähe – jederzeit, am Erinnerungsort oder zuhause."
        }
      },
      product: {
        title: "Warum Memora?",
        p1: "Weil Erinnerungen mehr sind als nur Gedanken – sie verdienen einen würdigen Platz.",
        p2: "Unsere Memora Produkte verbinden Technik mit Emotion – einfach, schön, nachhaltig."
      }
    },

    // Rechtstexte (für Datenschutz/AGB/Impressum-Seiten)
    legal: {
      privacy: {
    title: "Datenschutzerklärung",
    sections: {
      responsible: {
        title: "1. Verantwortliche Stelle",
        content:
          "TW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten\nE-Mail: info@memora.moments.ch\nTelefon: +41 79 407 56 99\n\nWir sind verantwortlich für die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten im Sinne des Schweizer Datenschutzgesetzes (revDSG)."
      },

      dataCollection: {
        title: "2. Erhebung und Verarbeitung von personenbezogenen Daten",
        content:
          "Wir verarbeiten personenbezogene Daten, die Sie uns im Rahmen der Nutzung unserer Dienstleistungen zur Verfügung stellen oder die bei der Nutzung anfallen. Dazu gehören insbesondere:",
        list: [
          "Kontaktdaten (Name, Adresse, E-Mail, Telefonnummer)",
          "Zahlungsinformationen (abhängig von der gewählten Zahlungsart, z. B. Kreditkarte, TWINT, Vorkasse)",
          "Inhaltsdaten (Fotos, Videos, Texte, Musik/Audio), die Sie für personalisierte Erinnerungs-Videos und Memoras bereitstellen",
          "Nutzungsdaten (z. B. Zeitpunkt des Abrufs eines Videos via Memora, technische Metadaten wie Browser/Endgerät)"
        ]
      },

      purpose: {
        title: "3. Zweck der Datenverarbeitung",
        content:
          "Ihre Daten werden ausschliesslich zu folgenden Zwecken genutzt:",
        list: [
          "Abwicklung von Bestellungen und Vertragserfüllung",
          "Erstellung, Bearbeitung und Bereitstellung von Erinnerungs-Videos sowie Konfiguration von NFC-Tags",
          "Abwicklung von Zahlungen und Rechnungsstellung",
          "Kommunikation mit Ihnen (z. B. Auftragsbestätigung, Rückfragen, Support)",
          "Betrieb, Sicherheit und Verbesserung unserer Dienstleistungen"
        ]
      },

      disclosure: {
        title: "4. Weitergabe an Dritte",
        content:
          "Wir verkaufen Ihre Daten nicht und geben sie nicht zu Werbezwecken an Dritte weiter. Eine Weitergabe erfolgt ausschliesslich, soweit dies für die oben genannten Zwecke erforderlich ist, an sorgfältig ausgewählte Auftragsverarbeiter:",
        list: [
          "Zahlungsanbieter (z. B. Stripe, TWINT, Kreditkarteninstitute) zur Zahlungsabwicklung",
          "IT-, Cloud- und Hosting-Dienstleister (z. B. für Website-Betrieb, Datenspeicherung, Videoerstellung/-auslieferung)",
          "E-Mail-/Kommunikations-Dienstleister (z. B. Versand von System- und Service-E-Mails)",
          "Logistik-/Lieferpartner für den Versand physischer Produkte"
        ]
      },

      storage: {
        title: "5. Speicherung und Löschung von Daten",
        content:
          "Personalisierte Inhalte (Fotos, Videos, Audio, Texte) werden nur so lange gespeichert, wie dies für die Vertragserfüllung und Servicebereitstellung erforderlich ist. Kundendaten werden im Rahmen gesetzlicher Aufbewahrungspflichten gespeichert. Auf Ihren Wunsch prüfen wir eine vorzeitige Löschung, soweit keine gesetzlichen Pflichten entgegenstehen."
      },

      security: {
        title: "6. Datensicherheit",
        content:
          "Wir setzen angemessene technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Daten vor Verlust, Manipulation und unbefugtem Zugriff zu schützen. Bitte beachten Sie, dass die Datenübertragung über das Internet (z. B. per E-Mail) Sicherheitslücken aufweisen kann."
      },

      rights: {
        title: "7. Rechte der betroffenen Personen",
        content:
          "Sie haben im Rahmen des geltenden Datenschutzrechts insbesondere folgende Rechte. Zur Wahrnehmung Ihrer Rechte kontaktieren Sie uns bitte unter der oben genannten Adresse:",
        list: [
          "Auskunft: Einsicht in die über Sie gespeicherten Daten",
          "Berichtigung: Korrektur unrichtiger oder unvollständiger Daten",
          "Löschung: Entfernung Ihrer Daten, soweit keine Aufbewahrungspflichten bestehen",
          "Einschränkung/ Widerspruch (soweit anwendbar): Beschränkung gewisser Verarbeitungen",
          "Datenübertragbarkeit: Herausgabe in einem gängigen elektronischen Format"
        ]
      },

      cookies: {
        title: "8. Cookies und Tracking",
        content:
          "Unsere Website verwendet notwendige Cookies, um Grundfunktionen bereitzustellen. Weitere (optionale) Analyse- oder Marketing-Cookies setzen wir nur mit Ihrer Einwilligung ein. Sie können in Ihrem Browser festlegen, ob Cookies akzeptiert, blockiert oder gelöscht werden."
      },

      changes: {
        title: "9. Änderungen dieser Datenschutzerklärung",
        content:
          "Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Es gilt jeweils die aktuelle Version, die auf unserer Website veröffentlicht wird."
      }
        }
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        sections: {
          scope: {
            title: "Präambel und Kontakt",
            content: "Diese Website wird von TW Projects GmbH betrieben. Überall auf der Webseite beziehen sich die Begriffe \"wir\", \"uns\" und \"unsere/n\" auf TW Projects GmbH. TW Projects GmbH bietet diese Website, einschliesslich aller Informationen, Tools und Dienste, die auf dieser Website verfügbar sind, Ihnen, dem Benutzer, unter der Bedingung an, dass Sie alle hier angegebenen Bedingungen, Konditionen, Richtlinien und Hinweise akzeptieren.\n\nIhre Zufriedenheit ist unsere oberste Priorität. Sollten Sie Fragen oder Anregungen haben, so senden Sie eine E-Mail an info.memora.moments@gmail.ch oder schreiben Sie uns eine Nachricht über das Kontakt-Formular.\n\nTW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten CH\nE-Mail: info.memora.moments@gmail.ch\nTelefon: +41 79 407 56 99\n\nHinweis zur Sprachversion: Diese AGB stehen in mehreren Sprachen zur Verfügung. Bei Abweichungen oder Widersprüchen ist die deutschsprachige Fassung rechtlich verbindlich."
          },
          contract: {
            title: "1. Geltungsbereich und Vertragsabschluss",
            content: "Diese AGB gelten für alle Bestellungen über unsere Website sowie für die Nutzung unserer Dienste.\n\nEin verbindlicher Vertrag kommt zustande, sobald wir die Bestellung ausdrücklich per E-Mail bestätigen."
          },
          services: {
            title: "2. Einwilligung in die Bearbeitung Ihrer Daten",
            content: "Ihr Einverständnis mit diesen Allgemeinen Geschäftsbedingungen schliesst Ihr Einverständnis in solche Bearbeitung personenbezogener Daten ein. Ihre Bild-/Fotodaten werden von uns ausschliesslich zur einwandfreien Abwicklung Ihres Auftrags verwendet."
          },
          prices: {
            title: "3. Sortiment, Preise und Zahlung",
            content: "Unsere Produkte bestehen insbesondere aus personalisierten Gedenkplatten, NFC-Tags sowie damit verbundenen digitalen Inhalten (z. B. digitales Fotoalbum).\n\nPersonalisierte Produkte und digitale Inhalte werden individuell nach Kundenvorgaben erstellt und sind vom Umtausch oder der Rückgabe ausgeschlossen.\n\nNicht-personalisierte Produkte können gemäss den gesetzlichen Bestimmungen zurückgegeben werden.\n\nUnser Sortiment wird ständig der technischen Entwicklung angepasst. Unsere Preise sowie der Ihnen verrechnete Versandkostenanteil können sich von Zeit zu Zeit ändern.\n\nDie Lieferkosten für Bestellungen innerhalb der Schweiz übernehmen wir für Sie. Lieferkosten für Sendungen ausserhalb der Schweiz werden dem Empfänger nachträglich in Rechnung gestellt.\n\nAlle Preise verstehen sich in Schweizer Franken (CHF), inkl. gesetzlicher Mehrwertsteuer (sofern anwendbar).\n\nZahlung erfolgt vor Lieferung bzw. vor Erstellung der digitalen Inhalte.\n\nBei Online-Bestellungen haben Sie die Möglichkeit zur Zahlung mit den folgenden Zahlungsmitteln: Kreditkarte, TWINT, Vorkasse. Diese können von Zeit zu Zeit sowie landesspezifisch ändern. Mit Ihrer Wahl eines Zahlungsmittels ist die Ermächtigung an uns verbunden, Zahlungen im entsprechenden Wege einzunehmen bzw. einzuziehen. Falls es zu Rückbelastungen kommt, haben wir Anspruch auf Erstattung der damit verbundenen Kosten und Bankbearbeitungsgebühren."
          },
          delivery: {
            title: "4. Bestellung, Lieferung, Gefahrübergang und Eigentumsvorbehalt",
            content: "Sobald Ihre digitalen Bilder oder Filme bei uns eintreffen, wird der Auftrag gemäss Ihren Angaben ausgeführt. Bestellungen auf elektronischem Weg bestätigen wir durch eine E-Mail an die von Ihnen angegebene Adresse.\n\nNach Bestätigung der Bestellung erfolgt die Lieferung des Produkts innerhalb von 30 Tagen, sofern beim Produkt nichts anderes angegeben ist.\n\nBeachten Sie bitte, dass digitale Bestellungen, nachdem sie bei uns eingetroffen sind, weder geändert, gelöscht noch zusammengeführt werden können.\n\nSoweit Bildinhalte, welche erkennbar gegen gesetzliche Verbote verstossen, bei der Auftragsausführung auf Ihren Bildern offenbar werden, werden wir Ihren Auftrag nicht ausführen.\n\nDie Lieferungen erfolgen an die vom Kunden angegebene Adresse. Die Gefahr des zufälligen Untergangs, der zufälligen Beschädigung oder des zufälligen Verlusts der gelieferten Ware geht mit deren Aushändigung an das Transportunternehmen auf Sie über."
          },
          cancellation: {
            title: "5. Eigentumsvorbehalt",
            content: "Die gelieferten Produkte bleiben bis zur vollständigen Bezahlung (einschliesslich Versandkosten und etwaiger Mehrwertsteuer) Eigentum von TW Projects GmbH (Eigentumsvorbehalt, Registereintrag vorbehalten)."
          },
          warranty: {
            title: "6. Rechte und Pflichten bei personalisierten Inhalten",
            content: "Der Kunde liefert Texte, Bilder, Videos oder andere Inhalte in geeigneter Qualität.\n\nDer Kunde sichert zu, dass er alle erforderlichen Urheber- und Persönlichkeitsrechte besitzt bzw. die Einwilligung der Berechtigten eingeholt hat.\n\nDer Kunde räumt TW Projects GmbH eine nicht-exklusive, weltweite Lizenz ein, die gelieferten Inhalte für die Erstellung, Speicherung und Bereitstellung der Produkte zu nutzen.\n\nWir behalten uns vor, Inhalte abzulehnen oder nachträglich zu entfernen, wenn sie Rechte Dritter verletzen oder rechtswidrig sind."
          },
          liability: {
            title: "7. Notice-&-Takedown-Verfahren",
            content: "Berechtigte (z. B. Angehörige, Erben) können beanstanden, dass Inhalte Persönlichkeitsrechte verletzen.\n\nNach Erhalt einer begründeten Meldung nehmen wir betroffene Inhalte zeitnah offline. Meldungen richten Sie bitte an: [info@memora.moments.ch]."
          },
          ip: {
            title: "8. Gewährleistung und Haftung",
            content: "Es gelten die gesetzlichen Mängelrechte gemäss Schweizer Obligationenrecht (OR).\n\nWir leisten nach Wahl Nachbesserung oder Ersatzlieferung. Reklamationen können nur anerkannt werden, wenn sie sich auf Sachmangel beziehen und innerhalb von 21 Tagen nach Erhalt der Produkte geltend gemacht werden.\n\nBitte beachten Sie, dass vom Kunden eingegebene Schreibfehler, qualitativ unzureichende Bilder (zum Beispiel durch zu geringe Auflösung bei Digitalbildern), selbst verschuldete Gestaltungsfehler sowie falsche Produktauswahl, falsche Bestellmengen oder andere durch Fehler bei der Bestelleingabe entstandene Mängel von der Reklamation ausgeschlossen sind. Dies gilt ebenfalls für auf dem Transportweg entstandene Beschädigungen.\n\nKeine Haftung übernehmen wir insbesondere für:\n- die Qualität oder Rechtmässigkeit der vom Kunden gelieferten Inhalte,\n- Farbabweichungen infolge Materialspezifika oder Geräteeinstellungen,\n- vorübergehende Unterbrüche unserer digitalen Dienste.\n- Für Schäden, die nach Art des jeweiligen Auftrags und der Produkte und bei normaler Verwendung dieser Produkte typischerweise nicht zu erwarten sind.\n\nUnsere Haftung ist, soweit gesetzlich zulässig, auf Vorsatz und grobe Fahrlässigkeit beschränkt. Für leichte Fahrlässigkeit haften wir nur bei Personenschäden."
          },
          privacy: {
            title: "9. Nutzung digitaler Dienste",
            content: "Wir bemühen uns um eine hohe Verfügbarkeit unserer Hosting- und Streamingdienste. Kurzfristige Unterbrüche (Wartung, höhere Gewalt, technische Störungen) können jedoch auftreten.\n\nEin bestimmtes Service-Level wird nicht garantiert."
          },
          special: {
            title: "10. Rechte Dritter",
            content: "Sie allein sind dafür verantwortlich, dass Ihnen die erforderlichen Rechte an den von Ihnen eingesandten Bildern, einschliesslich Urheber-, Marken- und Persönlichkeitsrechte, zustehen. Sollten Dritte im Zusammenhang mit Ihrem Auftrag wegen Verletzung solcher Rechte Ansprüche gegen uns geltend machen, sind Sie verpflichtet, diese Ansprüche abzuwehren bzw. die Kosten der Abwehr dieser Ansprüche zu übernehmen. Schadensersatzansprüche von uns bleiben unberührt."
          },
          law: {
            title: "11. Datenschutz",
            content: "Die Verarbeitung personenbezogener Daten richtet sich nach unserer Datenschutzerklärung.\n\nDer Kunde nimmt zur Kenntnis, dass für Hosting, Zahlungsabwicklung oder andere Leistungen Drittanbieter eingesetzt werden können."
          },
          final: {
            title: "12. Spendenregelung",
            content: "Wir spenden 10% des Nettoverkaufspreises jedes verkauften Produkts an wohltätige Stiftungen (z. B. Make-A-Wish Schweiz).\n\nDie Auszahlung der Spenden erfolgt einmal jährlich, jeweils Ende Jahr.\n\nDie Auswahl der Stiftung und die Abwicklung der Spenden obliegt TW Projects GmbH. Ein individueller Rechtsanspruch des Kunden auf die Weiterleitung oder Zweckbindung besteht nicht."
          },
          contact: {
            title: "13. Verbotene Nutzungen",
            content: "Die Website darf nicht für rechtswidrige Zwecke, Spam, Malware oder Verstösse gegen Rechte Dritter genutzt werden.\n\nWir behalten uns vor, bei Missbrauch den Zugang zu sperren."
          },
          availability: {
            title: "14. Verfügbarkeit digitaler Inhalte",
            content: "Die Bereitstellung digitaler Inhalte (z. B. Foto- oder Videoalben), die über NFC-Tags, QR-Codes oder externe Links abrufbar sind, erfolgt über von uns ausgewählte Drittanbieter. TW Projects GmbH stellt sicher, dass der Zugriff auf diese digitalen Inhalte für einen Zeitraum von mindestens 12 Monaten ab Auslieferung gewährleistet ist, sofern beim Produkt nichts anderes angegeben ist.\n\nDarüber hinaus kann die weitere Abrufbarkeit fortbestehen, sie ist jedoch nicht vertraglich zugesichert. Eine zeitlich unbegrenzte oder lebenslange Verfügbarkeit kann nicht garantiert werden.\n\nWir haften nicht für Unterbrüche, Änderungen oder Einstellungen externer Dienste sowie für Datenverluste oder Zugriffsprobleme, die ausserhalb unseres Einflussbereichs liegen. Wir behalten uns vor, Inhalte auf andere Dienste zu übertragen oder die Zugriffsform anzupassen, ohne dass daraus ein Anspruch auf ein bestimmtes Hosting-System entsteht."
          },

        },
      },
      imprint: {
        title: "Impressum",
        sections: {
          info: {
            title: "Memora Moments",
            content: "Personalisierte Erinnerungsprodukte"
          },
          contact: {
            title: "Kontakt",
            content:
              "E-Mail: info@memora.moments.ch\nTelefon: +41 79 407 56 99"
          },
          responsible: {
            title: "Verantwortlichkeit",
            content: "Memora Moments\nE-Mail: info@memora.moments.ch"
          },
          disclaimer: {
            title: "Haftungsausschluss",
            content: {
              title: "Haftung für Inhalte",
              content:
                "Die Inhalte unserer Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Wir behalten uns vor, Inhalte jederzeit zu ändern, zu ergänzen oder zu entfernen."
            },
            links: {
              title: "Haftung für Links",
              content:
                "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich."
            },
            copyright: {
              title: "Urheberrecht",
              content:
                "Die Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Jede Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Verwertung ausserhalb der gesetzlichen Schranken des Urheberrechts bedarf der vorgängigen schriftlichen Zustimmung des jeweiligen Autors bzw. Rechteinhabers. Downloads und Kopien dieser Seite sind nur für den privaten Gebrauch gestattet."
            }
          }
        }
      }
    },

    orderSuccessPage: {
      title: "Bestellung erfolgreich - Memora Moments",
      heading: "Vielen Dank für Ihre Bestellung!",
      message1: "Wir haben Ihre Bestellung erhalten und werden sie so schnell wie möglich bearbeiten.",
      buttonHome: "Zur Startseite"
    },
    orderCancelPage: {
      title: "Bestellung abgebrochen - Memora Moments",
      heading: "Bestellung abgebrochen",
      message: "Der Bezahlvorgang wurde abgebrochen. Ihr Warenkorb wurde gespeichert.",
      buttonBack: "Zurück zum Warenkorb"
    },

    // Footer-Texte – gemäß deinem FooterContent-Typ
    footer: {
      brand: {
        name: "Memora Moments",
        description:
          "Digitale Gedenkmomente – würdevoll gestaltet, wetterfest und einfach zu teilen."
      },
      contactTitle: "Kontakt",
      linksTitle: "Links",
      legal: {
        privacy: "Datenschutz",
        terms: "AGB",
        imprint: "Impressum"
      },
      copyright: "Alle Rechte vorbehalten."
    }
  },

  // --- HUMAN MODE ---
  human: {
    hero: {
      title: "Erinnerungen, die weiterleben – mit Herz und Klang.",
      subtitle:
        "Ein Gedenkstück mit Smart-Tag – ein Tipp mit dem Smartphone, und das digitale Erinnerungsalbum zu Ihrem geliebten Menschen öffnet sich. So bleiben die schönsten Momente lebendig – im Herzen und an besonderen Orten.",
      startButton: "Wie funktionierts?",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Unvergessliche Momente für die Ewigkeit",
      subtitle:
        "Unsere Memora Moments vereinen moderne Technologie mit würdevoller Erinnerung.",
      unique: { title: "Einzigartiges Gedenken", desc: "Würdigen Sie das Leben eines geliebten Menschen mit einer bleibenden Erinnerung." },
      multimedia: { title: "Multimedia Erinnerungen", desc: "Erhalten Sie Ihr digitales Fotoalbum. Fotos und Videos machen besondere Augenblicke wieder erlebbar." },
      music: { title: "Hintergrundmusik einbinden", desc: "Musik schafft Nähe und lässt Emotionen lebendig werden." },
      quality: { title: "Würdevoll gestaltet", desc: "Schlichte, hochwertige Materialien, die sich harmonisch in jedes Grab oder Zuhause einfügen." }
    },

    donation: {
      title: "Gemeinsam Gutes tun",
      description: "10% jedes Kaufs eines Memora Moments Produkts spenden wir an die Stiftung Make-A-Wish, um Hoffnung und Freude zu schenken.",
      linkText: "Erfahre mehr über Make-A-Wish"
    },  

    howitworks: {
      title: "So einfach funktioniert es",
      subtitle: "In wenigen Schritten zur persönlichen Memora.",
      step1: { title: "Produkt auswählen", desc: "Wählen Sie zwischen Memora Tag, Frame oder Deluxe." },
      step2: { title: "Medien und Musik auswählen", desc: "Wählen Sie behutsam Fotos, Videos oder Sprachnachrichten Ihres geliebten Verewigten und ergänzen Sie eine stimmige musikalische Begleitung. " },
      step3: { title: "Memora erhalten", desc: "Das Gedenkstück mit Smart-Tag – bereits mit Ihrem digitalen Fotoalbum verknüpft – kommt zu Ihnen nach Hause." }
    },
    products: {
      title: "Unsere Memoras:",
      subtitle: "Die klassischen Memora-Produkte.",
      basic: { title: "Memora Tag", desc: "Ein schlichter Smart-Tag, der Erinnerungen per digitalem Fotoalbum zum Leben erweckt – dezent und unvergänglich.", price: "59 CHF" },
      premium: { title: "Memora Frame", desc: "Ein klassischer Bilderrahmen, verbunden mit moderner Technologie. So wird jedes Foto zum Tor zu bewegenden Erinnerungen.", price: "89 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Ein hochwertiges Kunstwerk, das die Vergangenheit lebendig hält und Zukunft berührt.", price: "149 CHF" },
      features: {
        tag1: "6×6 cm oder 3 cm ⌀ Smart-Tag",
        tag2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        tag3: "Minimales, zeitloses Design, fügt sich harmonisch ein",
        tag4: "Für Grabsteine, Urnen, Erinnerungsorte",
        premium1: "3 cm ⌀ Smart-Tag – verbindet Bild & digitales Gedenken",
        premium2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        premium3: "Persönliche Gestaltung mit eigenem Foto",
        premium4: "Ideal für Zuhause, Gedenkecken oder als Geschenk",
        deluxe1: "Hochwertige 12×12 cm Plexiglasplatte mit edlem Finish",
        deluxe2: "Individuelle Gestaltung mit eigenem Foto & Text",
        deluxe3: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        deluxe4: "Präsentation mit stilvoller Halterung"
      }
    },
    cta: {
      title: "Ehren Sie Ihre Liebsten",
      subtitle: "Erstellen Sie Ihr Gedenken und bewahren Sie Erinnerungen.",
      create: "Gedenken erstellen",
      contact: "Kontakt aufnehmen"
    },
    gedenken: {
      title: "Gedenken erstellen - Memora Moments",
      heading: "Ihr Gedenken erstellen!",
      description: "Laden Sie Erinnerungen hoch und wir erstellen ein würdevolles Gedenken."
    },

    // Uploader-Overrides
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Produkt wählen:" },
        step1Subtitle: "Wähle dein Produkt – die Inhalte lädst du im nächsten Schritt hoch.",
        step2ByMode: { human: "Angaben zur Person" },
        step2Subtitle: "Bitte die folgenden Felder ausfüllen. Notizen sind optional.",
        step3Title: "Bilder & Videos hochladen",
        step3Subtitle: "Dateien werden im Formular gespeichert und später mitgesendet.",
        step4Title: "Kontaktangaben",
        step4Subtitle: "Diese Daten verwenden wir für Rückfragen und die Auftragsbestätigung.",
        step5Title: "Rechnungsangaben & Übersicht",
        step5Subtitle: "Bitte prüfe die Adresse und die Zusammenfassung. Mit Weiter zur Zahlung! geht es später in den Checkout.",
        summary: "Zusammenfassung"
      },
      buttons: {
        back: "Zurück",
        next: "Weiter",
        reset: "Zurücksetzen",
        toPay: "Weiter zur Zahlung",
        addText: "Text hinzufügen",
        applyDesign: "Design übernehmen",
        remove: "Entfernen",
      },

      products: {
        formatTitle: "Format",
        frameTitle: "Frame gestalten",
        formatTitleDeluxe: "Deluxe gestalten",
        roundLabel: "Rund · Ø 3 cm",
        squareLabel: "Quadratisch · 6×6 cm",
        petOptionsTitle: "Optionen für Haustier–Memora Tag",
        frameTip:"Tipp: Bild mit der Maus/Touch verschieben und Texte hinzufügen & frei positionieren.",
        frameOrientationLabel: "Ausrichtung",
        framePortrait: "Hochformat",
        frameLandscape: "Querformat",
      },
      editor: {
        image: "Bild",
        zoom: "Zoom",
        posX: "Horizontale Position",
        posY: "Vertikale Position",
        emptyTitle: "Kein Bild ausgewählt",
        emptySub: "Bitte oben ein Bild wählen",
        selectedText: "Ausgewählter Text",
        content: "Inhalt",
        font: "Schriftart",
        size: "Grösse",
        color: "Farbe",
        previewLabel: "Übernommene Vorschau",
        previewNote: "Diese Vorschau wird mit der Bestellung gespeichert."
      },
      step2Fields: {
        human_lastName: "Nachname *",
        human_firstName: "Vorname *",
        human_deathDate: "Sterbedatum",
        notes_human: "Notizen (optional)",
        human_notesPH: "Besondere Wünsche, Zitate, Musik-Hinweise …",

      },
      step3Fields: {
        imagesLabel: "Bilder (max. 50MB pro Bild)",
        videosLabel: "Videos (max. 50MB pro Video)",
        remove: "Entfernen",
        imageCaptionPlaceholder: "Kurztext zum Bild (optional)",
        videoCaptionPlaceholder: "Kurztext zum Video (optional)",
        // Musik-Auswahl
        musicSelection: {
          title: "Musik auswählen",
          availableMusic: "Verfügbare Musik",
          selected: "Ausgewählt",
          select: "Auswählen",
          moreMusic: "Weitere Musik von Pixabay",
          pixabayPlaceholder: "Link von pixabay.com/music/ einfügen...",
          pixabayButton: "Pixabay Music",
        },
        calendarStyleSelection: {
          title: "Stil des Albums wählen",
          modern: "Modern",
          classic: "Klassisch",
        },
      },
      contactFields: {
        firstName: "Vorname *",
        lastName: "Nachname *",
        email: "E-Mail *",
        phoneOpt: "Telefon (optional)"
      },
      invoiceFields: {
        sameAsContact: "Rechnungsadresse gleich Kontaktadresse",
        companyOpt: "Firma (optional)",
        firstName: "Vorname *",
        lastName: "Nachname *",
        street: "Strasse & Nr. *",
        zip: "PLZ *",
        city: "Ort *",
        country: "Land *"
      },
      summary: {
        mode: "Modus",
        product: "Produkt",
        format: "Format",
        formatRound: "Rund Ø 3 cm",
        formatSquare: "Quadratisch 6×6 cm",
        options: "Optionen",
        person: "Person",
        pet: "Haustier",
        recipient: "Empfänger",
        notes: "Notizen",
        counts: (imgs, vids) => `Bilder: ${imgs} • Videos: ${vids}`,
        previewTitle: "Individuelle Vorschau",
        optionOrientation: "Ausrichtung",
        optionPortrait: "Hochformat",
        optionLandscape: "Querformat",
        modeHuman: "Human",
        modePet: "Pet",
        modeSurprise: "Surprise",
        total: "Gesamtpreis",
        calendarStyle: "Album-Stil"
      },

      orderConfirmation: {
        prefix: "Ich habe die",
        termsLinkText: "AGB",
        separator: "und die",
        privacyLinkText: "Datenschutzbestimmungen",
        suffix: "gelesen und akzeptiere sie."
      },
     privacyNotice: {
        text: "Mit dem Hochladen von Bildern erklären Sie sich mit unseren",
        privacyLink: "Datenschutzrichtlinien",
        and: "und",
        termsLink: "Nutzungsbedingungen",
        agreed: "einverstanden.",
      } 
  },

  },

  // --- PET MODE ---
  pet: {
    hero: {
      title: "Für unsere treuen Begleiter – Erinnerungen mit Herz und Klang.",
      subtitle:
        "Ein Erinnerungsstück mit Smart-Tag – ein Tipp mit dem Smartphone, und das digitale Fotoalbum zu Ihrem geliebten Tier öffnet sich. So bleiben die schönsten Momente lebendig – im Herzen und an besonderen Orten.",
      startButton: "Wie funktionierts?",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Unvergessliche Momente mit Ihrem Liebling",
      subtitle: "Digitale Erinnerungen für Haustiere.",
      unique: { title: "Liebevolle Erinnerung", desc: "Bewahren Sie die treue Begleitung Ihres Tieres in einer bleibenden Erinnerung." },
      multimedia: { title: "Multimedia Erlebnisse", desc: "Erhalten Sie Ihr digitales Fotoalbum – mit Fotos und Videos Ihres Lieblings, die Erinnerungen lebendig werden lassen" },
      music: { title: "Lieblingsgeräusche", desc: "Hinterlegen Sie Aufnahmen Ihres Tieres oder Musik im Album, damit die Erinnerung auch hörbar wird." },
      quality: { title: "Würdevolle Gestaltung", desc: "Schlichte, hochwertige Materialien, die sich harmonisch in jedes Zuhause einfügen, ob drinnen oder draussen." }
    },

    donation: {
      title: "Hilfe für Tiere in Not",
      description: "10% jedes Kaufs eines Memora Pet Produkts gehen an die Stiftung Tierrettungsdienst, um Tieren in Not zu helfen.",
      linkText: "Mehr über den Tierrettungsdienst"
    },

    howitworks: {
      title: "So einfach funktioniert es",
      subtitle: "In drei Schritten zur Memora.",
      step1: { title: "Produkt auswählen", desc: "Wählen Sie zwischen Memora Tag, Frame oder Deluxe." },
      step2: { title: "Medien und Musik oder Geräusche auswählen", desc: "Wählen Sie Ihre Lieblingsbilder und Lieblingsvideos oder auch Audiodateien und fügen Sie passende Hintergrundmusik hinzu." },
      step3: { title: "Memora erhalten", desc: "Ihre Memora mit Smart-Tag – bereits mit dem digitalen Fotoalbum verknüpft – kommt zu Ihnen nach Hause" }
    },
    products: {
      title: "Haustier-Produkte",
      subtitle: "Erinnerungen für treue Begleiter.",
      basic: { title: "Memora Pet Tag", desc: "Ein schlichter Smart-Tag, der mit einem digitalen Fotoalbum Erinnerungen an Ihr Haustier zum Leben erweckt", price: "ab 59 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Ein stilvoller Bilderrahmen, der Ihr Lieblingsfoto mit einem digitalen Fotoalbum verbindet – ideal für Zuhause.", price: "89 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Eine exklusive Plexiglasplatte mit Halterung – für ein bleibendes, würdiges Erinnerungsstück.", price: "149 CHF" },
      features: {
        tag1: "6×6 cm oder 2.5 cm ⌀ Smart-Tag",
        tag2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        tag3: "Minimales, zeitloses Design, fügt sich harmonisch ein",
        tag4: "Option: Standard schlicht, individuell gestaltet oder als Schlüsselanhänger",
        premium1: "3 cm ⌀ Smart-Tag – verbindet Bild & digitales Gedenken",
        premium2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        premium3: "Persönliche Gestaltung mit eigenem Foto",
        premium4: "Ideal für Zuhause oder als Geschenk",
        deluxe1: "Hochwertige 12×12 cm Plexiglasplatte mit edlem Finish",
        deluxe2: "Individuelle Gestaltung mit eigenem Foto & Text",
        deluxe3: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        deluxe4: "Präsentation mit stilvoller Halterung"
      }
    },
    cta: {
      title: "Ehren Sie Ihren Liebling",
      subtitle: "Ein Zuhause im Herzen – bewahren Sie die Erinnerung an Ihren treuen Begleiter.",
      create: "Erinnerung erstellen",
      contact: "Kontakt aufnehmen"
    },
    gedenken: {
      title: "Haustier-Gedenken erstellen - Memora Moments",
      heading: "Gedenken für Ihr Haustier!",
      description: "Laden Sie Erinnerungen Ihres Lieblings hoch."
    },

    // Uploader-Overrides
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Produkt wählen:", pet: "Produkt für dein Haustier wählen:", surprise: "Produkt für die Überraschung wählen:" },
        step1Subtitle: "Wähle dein Produkt – die Inhalte lädst du im nächsten Schritt hoch.",
        step2ByMode: { human: "Angaben zur Person", pet: "Angaben zum Haustier", surprise: "Angaben für die Überraschung" },
        step2Subtitle: "Bitte die folgenden Felder ausfüllen. Notizen sind optional.",
        step3Title: "Bilder & Videos hochladen",
        step3Subtitle: "Dateien werden im Formular gespeichert und später mitgesendet.",
        step4Title: "Kontaktangaben",
        step4Subtitle: "Diese Daten verwenden wir für Rückfragen und die Auftragsbestätigung.",
        step5Title: "Rechnungsangaben & Übersicht",
        step5Subtitle: "Bitte prüfe die Adresse und die Zusammenfassung. Mit Weiter zur Zahlung! geht es später in den Checkout.",
        summary: "Zusammenfassung"
      },
      buttons: {
        back: "Zurück",
        next: "Weiter",
        reset: "Zurücksetzen",
        toPay: "Weiter zur Zahlung",
        addText: "Text hinzufügen",
        applyDesign: "Design übernehmen",
        remove: "Entfernen",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Frame gestalten",
        formatTitleDeluxe: "Deluxe gestalten",
        roundLabel: "Rund · Ø 3 cm",
        squareLabel: "Quadratisch · 6×6 cm",
        petOptionsTitle: "Optionen für Haustier–Memora Tag",
        keychainLabel: "mit Schlüsselanhänger (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Individuell gestaltbar",
        designCustomNote: "Hinweis: Individuelles Design kostet +10 CHF.",
        frameTip:"Tipp: Bild mit der Maus/Touch verschieben und Texte hinzufügen & frei positionieren.",
        frameOrientationLabel: "Ausrichtung",
        framePortrait: "Hochformat",
        frameLandscape: "Querformat",
      },
      editor: {
        image: "Bild",
        zoom: "Zoom",
        posX: "Horizontale Position",
        posY: "Vertikale Position",
        emptyTitle: "Kein Bild ausgewählt",
        emptySub: "Bitte oben ein Bild wählen",
        selectedText: "Ausgewählter Text",
        content: "Inhalt",
        font: "Schriftart",
        size: "Grösse",
        color: "Farbe",
        previewLabel: "Übernommene Vorschau",
        previewNote: "Diese Vorschau wird mit der Bestellung gespeichert."
      },
      step2Fields: {
        notes_human: "Weitere Notizen",
        human_notesPH: "Besondere Wünsche, Zitate, Musik-Hinweise …",
        pet_name: "Name des Haustiers *",
        pet_deathDate: "Sterbedatum",
        pet_notesPH: "Besondere Wünsche, Lieblingsgeräusche, Hinweise …",
      },
      step3Fields: {
        imagesLabel: "Bilder (max. 50MB pro Bild)",
        videosLabel: "Videos (max. 50MB pro Video)",
        remove: "Entfernen",
        imageCaptionPlaceholder: "Kurztext zum Bild (optional)",
        videoCaptionPlaceholder: "Kurztext zum Video (optional)",
        musicSelection: {
          title: "Musik auswählen",
          availableMusic: "Verfügbare Musik",
          selected: "Ausgewählt",
          select: "Auswählen",
          moreMusic: "Weitere Musik von Pixabay",
          pixabayPlaceholder: "Link von pixabay.com/music/ einfügen...",
          pixabayButton: "Pixabay Music",
        },
      },
      contactFields: {
        firstName: "Vorname *",
        lastName: "Nachname *",
        email: "E-Mail *",
        phoneOpt: "Telefon (optional)"
      },
      invoiceFields: {
        sameAsContact: "Rechnungsadresse gleich Kontaktadresse",
        companyOpt: "Firma (optional)",
        firstName: "Vorname *",
        lastName: "Nachname *",
        street: "Strasse & Nr. *",
        zip: "PLZ *",
        city: "Ort *",
        country: "Land *"
      },
      summary: {
        mode: "Modus",
        product: "Produkt",
        format: "Format",
        formatRound: "Rund Ø 3 cm",
        formatSquare: "Quadratisch 6×6 cm",
        options: "Optionen",
        person: "Person",
        pet: "Haustier",
        recipient: "Empfänger",
        notes: "Notizen",
        counts: (imgs, vids) => `Bilder: ${imgs} • Videos: ${vids}`,
        previewTitle: "Individuelle Vorschau",
        optionOrientation: "Ausrichtung",
        optionPortrait: "Hochformat",
        optionLandscape: "Querformat",
        modeHuman: "Human",
        modePet: "Pet",
        modeSurprise: "Surprise",
        total: "Gesamtpreis"
      },

      orderConfirmation: {
        prefix: "Ich habe die",
        termsLinkText: "AGB",
        separator: "und die",
        privacyLinkText: "Datenschutzbestimmungen",
        suffix: "gelesen und akzeptiere sie."
      },
      privacyNotice: {
        text: "Mit dem Hochladen von Bildern erklären Sie sich mit unseren",
        privacyLink: "Datenschutzrichtlinien",
        and: "und",
        termsLink: "Nutzungsbedingungen",
        agreed: "einverstanden.",
      } 
    }
  },

  // --- SURPRISE MODE ---
  surprise: {
    hero: {
      title: "Ein Geschenk, das Herzen berührt",
      subtitle:
        "Ob Hochzeit, Geburtstag oder Jubiläum – mit Memora Moments machen Sie Erinnerungen greifbar. Ein Tipp mit dem Smartphone genügt, und das digitale Erinnerungsalbum öffnet sich – ein Geschenk, das Herzen berührt.",
      startButton: "Wie funktionierts?",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Das gewisse Etwas",
      subtitle: "Schlicht, würdevoll und voller Bedeutung.",
      unique: { title: "Einzigartige Überraschung", desc: "Jede Surprise erzählt eine kleine Geschichte." },
      multimedia: { title: "Multimedia-Erlebnisse", desc: "Erhalten Sie Ihr digitales Fotoalbum. Fotos, Videos und Musik machen Ihr Geschenk lebendig und emotional." },
      music: { title: "Musik & Botschaften", desc: "Fügen Sie Hintergrundmusik oder eine persönliche Sprachnachricht hinzu." },
      quality: { title: "Edles Design", desc: "Minimalistisch und hochwertig – passend zu jedem Anlass und jeder Feier." }
    },

    donation: {
      title: "Ein Lächeln schenken",
      description: "10% jedes Kaufs eines Memora Surprise Produkts spenden wir an die Stiftung Make-A-Wish, um Kindern ihre Herzenswünsche zu erfüllen.",
      linkText: "Erfahre mehr über Make-A-Wish"
    },

    howitworks: {
      title: "So funktioniert Surprise",
      subtitle: "Drei Schritte zum Überraschungsmoment.",
      step1: { title: "Produkt auswählen", desc: "Wählen Sie zwischen Memora Tag, Frame oder Deluxe." },
      step2: { title: "Medien und Musik auswählen", desc: "Wählen Sie Ihre Lieblingsbilder und Lieblingsvideos oder auch Sprachnachrichten und fügen Sie passende Hintergrundmusik hinzu." },
      step3: { title: "Surprise erhalten", desc: "Ihr Memora Geschenk mit Smart-Tag – bereits mit dem digitalen Fotoalbum verknüpft – kommt zu Ihnen nach Hause." }
    },
    products: {
      title: "Surprise-Produkte",
      subtitle: "Wählen Sie Ihren Stil.",
      basic: { title: "Memora Surprise Tag", desc: "Ein Smart-Tag, der ein digitales Fotoalbum verbindet – originell und einzigartig.", price: "59 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Ein stilvoller Bilderrahmen, der Ihr Lieblingsfoto mit einem digitalen Fotoalbum verbindet – ideal als Geschenk.", price: "89 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Eine exklusive Plexiglasplatte mit integrierter Technologie – das elegante Premium-Geschenk für bleibende Erinnerungen.", price: "149 CHF" },
      features: {
        tag1: "6×6 cm oder 3 cm ⌀ Smart-Tag",
        tag2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        tag3: "Minimales, zeitloses Design, fügt sich harmonisch ein",
        tag4: "Eine Überraschung, die Emotionen weckt und lange in Erinnerung bleibt",
        premium1: "3 cm ⌀ Smart-Tag – verbindet Bild & digitales Gedenken",
        premium2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        premium3: "Persönliche Gestaltung mit eigenem Foto",
        premium4: "Das perfekte Geschenk für Geburtstage, Hochzeiten oder Jubiläen",
        deluxe1: "Hochwertige 12×12 cm Plexiglasplatte mit edlem Finish",
        deluxe2: "Individuelle Gestaltung mit eigenem Foto & Text",
        deluxe3: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        deluxe4: "Präsentation mit stilvoller Halterung"
      }
    },
    cta: {
      title: "Bereit für Ihren Überraschungsmoment?",
      subtitle: "Surprise schenkt einzigartige Augenblicke.",
      create: "Überraschung erstellen",
      contact: "Kontakt aufnehmen"
    },
    gedenken: {
      title: "Surprise erstellen - Memora Moments",
      heading: "Ihr Surprise-Moment!",
      description: "Laden Sie Inhalte hoch und wir gestalten Ihr Erlebnis."
    },

    // Uploader-Overrides für den Surprise-Modus
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Produkt wählen:", pet: "Produkt für dein Haustier wählen:", surprise: "Produkt für die Überraschung wählen:" },
        step1Subtitle: "Wähle dein Produkt – die Inhalte lädst du im nächsten Schritt hoch.",
        step2ByMode: { human: "Angaben zur Person", pet: "Angaben zum Haustier", surprise: "Angaben für die Überraschung" },
        step2Subtitle: "Bitte die folgenden Felder ausfüllen. Notizen sind optional.",
        step3Title: "Bilder & Videos hochladen",
        step3Subtitle: "Dateien werden im Formular gespeichert und später mitgesendet.",
        step4Title: "Kontaktangaben",
        step4Subtitle: "Diese Daten verwenden wir für Rückfragen und die Auftragsbestätigung.",
        step5Title: "Rechnungsangaben & Übersicht",
        step5Subtitle: "Bitte prüfe die Adresse und die Zusammenfassung. Mit Weiter zur Zahlung! geht es später in den Checkout.",
        summary: "Zusammenfassung"
      },
      buttons: {
        back: "Zurück",
        next: "Weiter",
        reset: "Zurücksetzen",
        toPay: "Weiter zur Zahlung",
        addText: "Text hinzufügen",
        applyDesign: "Design übernehmen",
        remove: "Entfernen",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Frame gestalten",
        formatTitleDeluxe: "Deluxe gestalten",
        roundLabel: "Rund · Ø 3 cm",
        squareLabel: "Quadratisch · 6×6 cm",
        petOptionsTitle: "Optionen für Haustier–Memora Tag",
        frameTip:"Tipp: Bild mit der Maus/Touch verschieben und Texte hinzufügen & frei positionieren.",
        frameOrientationLabel: "Ausrichtung",
        framePortrait: "Hochformat",
        frameLandscape: "Querformat",
      },
      editor: {
        image: "Bild",
        zoom: "Zoom",
        posX: "Horizontale Position",
        posY: "Vertikale Position",
        emptyTitle: "Kein Bild ausgewählt",
        emptySub: "Bitte oben ein Bild wählen",
        selectedText: "Ausgewählter Text",
        content: "Inhalt",
        font: "Schriftart",
        size: "Grösse",
        color: "Farbe",
        previewLabel: "Übernommene Vorschau",
        previewNote: "Diese Vorschau wird mit der Bestellung gespeichert."
      },
      step2Fields: {
        notes_human: "Anlass / Notizen",
        human_notesPH: "Besondere Wünsche, Zitate, Musik-Hinweise …",
        pet_notesPH: "Besondere Wünsche, Lieblingsgeräusche, Hinweise …",
        surprise_name: "Name (Empfänger) *",
        surprise_notesPH: "Hochzeit, Geburtstag, Jubiläum … besondere Wünsche"
      },
      step3Fields: {
        imagesLabel: "Bilder (max. 50MB pro Bild)",
        videosLabel: "Videos (max. 50MB pro Video)",
        remove: "Entfernen",
        imageCaptionPlaceholder: "Kurztext zum Bild (optional)",
        videoCaptionPlaceholder: "Kurztext zum Video (optional)",
        musicSelection: {
          title: "Musik auswählen",
          availableMusic: "Verfügbare Musik",
          selected: "Ausgewählt",
          select: "Auswählen",
          moreMusic: "Weitere Musik von Pixabay",
          pixabayPlaceholder: "Link von pixabay.com/music/ einfügen...",
          pixabayButton: "Pixabay Music",
        },
      },
      contactFields: {
        firstName: "Vorname *",
        lastName: "Nachname *",
        email: "E-Mail *",
        phoneOpt: "Telefon (optional)"
      },
      invoiceFields: {
        sameAsContact: "Rechnungsadresse gleich Kontaktadresse",
        companyOpt: "Firma (optional)",
        firstName: "Vorname *",
        lastName: "Nachname *",
        street: "Strasse & Nr. *",
        zip: "PLZ *",
        city: "Ort *",
        country: "Land *"
      },
      summary: {
        mode: "Modus",
        product: "Produkt",
        format: "Format",
        formatRound: "Rund Ø 3 cm",
        formatSquare: "Quadratisch 6×6 cm",
        options: "Optionen",
        person: "Person",
        pet: "Haustier",
        recipient: "Empfänger",
        notes: "Notizen",
        counts: (imgs, vids) => `Bilder: ${imgs} • Videos: ${vids}`,
        previewTitle: "Individuelle Vorschau",
        optionOrientation: "Ausrichtung",
        optionPortrait: "Hochformat",
        optionLandscape: "Querformat",
        modeHuman: "Human",
        modePet: "Pet",
        modeSurprise: "Surprise",
        total: "Gesamtpreis"
      },

      orderConfirmation: {
        prefix: "Ich habe die",
        termsLinkText: "AGB",
        separator: "und die",
        privacyLinkText: "Datenschutzbestimmungen",
        suffix: "gelesen und akzeptiere sie."
      },
      privacyNotice: {
        text: "Mit dem Hochladen von Bildern erklären Sie sich mit unseren",
        privacyLink: "Datenschutzrichtlinien",
        and: "und",
        termsLink: "Nutzungsbedingungen",
        agreed: "einverstanden.",
      } 
    }
  }
};