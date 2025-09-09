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
        p2: "Mit NFC und Multimedia schaffen wir eine neue Form des Gedenkens – nahbar und modern."
      },
      values: {
        title: "Unsere Werte",
        compassion: {
          title: "Mitgefühl",
          desc: "Wir arbeiten respektvoll und einfühlsam – für Menschen in besonderen Lebensmomenten."
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
        p1: "Hochwertige Materialien, wetterfestes Design und ein klarer Fokus auf das Wesentliche.",
        p2: "Einfach erstellen, wertig erhalten, jederzeit teilen – mit einem sanften Tap."
      }
    },

    // Rechtstexte (für Datenschutz/AGB/Impressum-Seiten)
    legal: {
      privacy: {
        title: "Datenschutzerklärung",
        sections: {
          responsible: {
            title: "1. Verantwortlicher",
            content:
              "Memora Moments\nE-Mail: info.memora.moments@gmail.com\nTelefon: +41 79 407 56 99"
          },
          dataCollection: {
            title: "2. Datenerhebung und -verwendung",
            content:
              "Wir erheben und verarbeiten personenbezogene Daten nur in dem Umfang, wie es für die Bereitstellung unserer Dienstleistungen erforderlich ist. Dies umfasst:",
            list: [
              "Kontaktdaten für die Bestellabwicklung",
              "Rechnungsdaten für die Bezahlung",
              "Von Ihnen hochgeladene Bilder und Texte für die Produktgestaltung"
            ]
          },
          imageProcessing: {
            title: "3. Bildverarbeitung",
            content:
              "Die von Ihnen hochgeladenen Bilder werden ausschließlich für die Erstellung Ihres personalisierten Produkts verwendet. Ihre Bilder werden sicher gespeichert und nach Abschluss der Bestellung bzw. nach angemessener Zeit gelöscht."
          },
          rights: {
            title: "4. Ihre Rechte",
            content:
              "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter info.memora.moments@gmail.com für Anfragen zu Ihren Daten."
          },
          cookies: {
            title: "5. Cookies",
            content:
              "Unsere Website verwendet notwendige Cookies für die Funktionalität. Weitere Tracking-Cookies verwenden wir nur mit Ihrer Einwilligung."
          }
        }
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        sections: {
          scope: {
            title: "1. Geltungsbereich",
            content:
              "Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen und Verträge zwischen Memora Moments und unseren Kunden."
          },
          contract: {
            title: "2. Vertragsschluss",
            content:
              "Der Vertrag kommt durch Ihre Bestellung und unsere Bestätigung zustande. Wir behalten uns vor, Bestellungen abzulehnen, falls technische oder rechtliche Hindernisse bestehen."
          },
          prices: {
            title: "3. Preise und Zahlungsbedingungen",
            content:
              "Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt vor der Produktion. Wir akzeptieren gängige Zahlungsmittel."
          },
          delivery: {
            title: "4. Lieferung und Produktionszeit",
            content:
              "Unsere personalisierten Produkte werden individuell gefertigt. Die Produktionszeit beträgt in der Regel 7–14 Werktage nach Zahlungseingang und finaler Freigabe des Designs."
          },
          rights: {
            title: "5. Urheberrechte und Bildrechte",
            content:
              "Sie bestätigen, dass Sie über alle notwendigen Rechte an den von Ihnen bereitgestellten Bildern und Texten verfügen. Sie stellen uns von Ansprüchen Dritter bezüglich Urheberrechts- oder Persönlichkeitsrechtsverletzungen frei."
          },
          cancellation: {
            title: "6. Widerrufsrecht",
            content:
              "Da es sich um personalisierte Produkte handelt, ist ein Widerruf nach § 312g Abs. 2 Nr. 1 BGB ausgeschlossen, sobald mit der Herstellung begonnen wurde."
          },
          warranty: {
            title: "7. Gewährleistung",
            content:
              "Wir gewährleisten die Qualität unserer Produkte. Bei Mängeln kontaktieren Sie uns bitte innerhalb von 14 Tagen nach Erhalt der Ware."
          },
          contact: {
            title: "8. Kontakt",
            content:
              "Bei Fragen zu diesen AGB kontaktieren Sie uns unter:\nE-Mail: info.memora.moments@gmail.com\nTelefon: +41 79 407 56 99"
          }
        }
      },
      imprint: {
        title: "Impressum",
        sections: {
          info: {
            title: "Angaben gemäß § 5 TMG",
            content: "Memora Moments\nPersonalisierte Erinnerungsprodukte"
          },
          contact: {
            title: "Kontakt",
            content:
              "E-Mail: info.memora.moments@gmail.com\nTelefon: +41 79 407 56 99"
          },
          responsible: {
            title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Haftungsausschluss",
            content: {
              title: "Haftung für Inhalte",
              content:
                "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."
            },
            links: {
              title: "Haftung für Links",
              content:
                "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich."
            },
            copyright: {
              title: "Urheberrecht",
              content:
                "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."
            }
          }
        }
      }
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
        "Aus Erinnerungen wird ein stilles Denkmal – Memora Moments öffnet die Tür zu bewegenden Momenten mit Bild und Musik.",
      startButton: "Jetzt beginnen",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Unvergessliche Momente für die Ewigkeit",
      subtitle:
        "Unsere Memora Moments NFC-Platten vereinen moderne Technologie mit würdevoller Erinnerung.",
      unique: { title: "Einzigartiges Gedenken", desc: "Bewahren Sie besondere Erinnerungen mit Memora Moments." },
      multimedia: { title: "Multimedia Erinnerungen", desc: "Fotos und Videos, die das Leben zeigen." },
      music: { title: "Lieblingslied einbinden", desc: "Fügen Sie bedeutungsvolle Musik hinzu." },
      quality: { title: "Würdevoll gestaltet", desc: "Hochwertige Glasplatten, wetterfest und elegant." }
    },
    howitworks: {
      title: "So einfach funktioniert es",
      subtitle: "In wenigen Schritten zur persönlichen Gedenkplatte.",
      step1: { title: "Medien hochladen", desc: "Wählen Sie Fotos und Videos aus." },
      step2: { title: "Musik auswählen", desc: "Fügen Sie ein Lieblingslied hinzu." },
      step3: { title: "NFC-Platte erhalten", desc: "Ihre Gedenkplatte kommt zu Ihnen nach Hause." }
    },
    products: {
      title: "Unsere Produkte",
      subtitle: "Die klassischen Memora-Produkte.",
      basic: { title: "Memora Tag", desc: "Schlichte NFC-Platte für digitale Erinnerungen.", price: "ab 60 CHF" },
      premium: { title: "Memora Frame", desc: "Bilderrahmen mit NFC-Technologie.", price: "ab 120 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Exklusive Glasplatte mit Gravur und erweiterten Funktionen.", price: "ab 200 CHF" },
      features: {
        glass: "6×6 cm NFC-Platte",
        nfc: "Elegantes Design",
        format: "Witterungsbeständig",
        weather: "Für Grabsteine, Urnen, Erinnerungsorte",
        all: "Bilderrahmen mit NFC",
        photo: "Persönliches Foto",
        engraving: "Dezente Gravur optional",
        premium: "Ideal für Zuhause"
      }
    },
    cta: {
      title: "Beginnen Sie Ihre Erinnerungsreise",
      subtitle: "Erstellen Sie Ihr Gedenken und bewahren Sie Erinnerungen.",
      create: "Gedenken erstellen",
      contact: "Kontakt aufnehmen"
    },
    gedenken: {
      title: "Gedenken erstellen - Memora Moments",
      heading: "Ihr Gedenken erstellen!",
      description: "Laden Sie Erinnerungen hoch und wir erstellen ein würdevolles Gedenken."
    },

    // Uploader-Overrides (nur abweichende Texte)
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Produkt wählen (Menschen)" },
        step1Subtitle: "Wähle dein Produkt – die Inhalte lädst du im nächsten Schritt hoch.",
        step2ByMode: { human: "Angaben zur Person" },
        step2Subtitle: "Bitte die folgenden Felder ausfüllen. Notizen sind optional.",
        step3Title: "Bilder & Videos hochladen",
        step3Subtitle: "Dateien werden im Formular gespeichert und später mitgesendet (nicht im LocalStorage).",
        step4Title: "Kontaktangaben",
        step4Subtitle: "Diese Daten verwenden wir für Rückfragen und die Auftragsbestätigung.",
        step5Title: "Rechnungsangaben & Übersicht",
        step5Subtitle: "Bitte prüfe die Adresse und die Zusammenfassung. Mit Weiter zur Zahlung! geht es später in den Checkout.",
        summary: "Zusammenfassung"
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Frame gestalten",
        roundLabel: "Rund · Ø 3 cm",
        squareLabel: "Quadratisch · 6×6 cm",
        petOptionsTitle: "Optionen für Haustier–Memora Tag"
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
        human_notesPH: "Besondere Wünsche, Zitate, Musik-Hinweise …",
        pet_name: "Name des Haustiers *",
        pet_deathDate: "Sterbedatum *",
        pet_notesPH: "Besondere Wünsche, Lieblingsgeräusche, Hinweise …",
        surprise_name: "Name (Empfänger) *",
        surprise_notesPH: "Hochzeit, Geburtstag, Jubiläum … besondere Wünsche"
      },
      step3Fields: {
        imagesLabel: "Bilder (mehrfach möglich)",
        videosLabel: "Videos (mehrfach möglich)",
        remove: "Entfernen"
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
        previewTitle: "Individuelle Vorschau"
      }
    }
  },

  // --- PET MODE ---
  pet: {
    hero: {
      title: "Für unsere treuen Begleiter – Erinnerungen mit Herz und Klang.",
      subtitle:
        "Memora Moments für Haustiere – bewahren Sie die schönsten Momente mit Ihrem Vierbeiner.",
      startButton: "Jetzt beginnen",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Unvergessliche Momente mit Ihrem Liebling",
      subtitle: "Digitale Erinnerungen für Haustiere.",
      unique: { title: "Liebevolle Erinnerung", desc: "Besondere Momente mit Ihrem Haustier." },
      multimedia: { title: "Tierische Erinnerungen", desc: "Fotos und Videos Ihres Lieblings." },
      music: { title: "Lieblingsgeräusche", desc: "Musik oder vertraute Geräusche hinzufügen." },
      quality: { title: "Wetterbeständig", desc: "Robust für drinnen und draussen." }
    },
    howitworks: {
      title: "So einfach funktioniert es",
      subtitle: "In drei Schritten zur Haustier-Gedenkplatte.",
      step1: { title: "Medien hochladen", desc: "Fotos und Videos auswählen." },
      step2: { title: "Musik/Geräusche auswählen", desc: "Passende Sounds hinzufügen." },
      step3: { title: "NFC-Platte erhalten", desc: "Die Haustier-Platte wird geliefert." }
    },
    products: {
      title: "Haustier-Produkte",
      subtitle: "Erinnerungen für treue Begleiter.",
      basic: { title: "Memora Pet Tag", desc: "Einfache NFC-Platte für Haustiere.", price: "ab 55 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Rahmen mit NFC für Haustiere.", price: "ab 110 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Deluxe-Version mit Gravur und erweiterten Medienoptionen.", price: "ab 180 CHF" },
      features: {
        glass: "6×6 cm NFC-Platte, wetterfest",
        nfc: "Liebevolles Design",
        format: "Haustier-optimierte Formate",
        weather: "Für drinnen und draussen",
        all: "Rahmen mit NFC",
        photo: "Foto im Rahmen",
        engraving: "Pfoten-/Namensgravur optional",
        premium: "Ideal für Zuhause"
      }
    },
    cta: {
      title: "Ehren Sie Ihren Liebling",
      subtitle: "Schaffen Sie eine liebevolle Erinnerung.",
      create: "Haustier-Gedenken erstellen",
      contact: "Beratung für Haustiere"
    },
    gedenken: {
      title: "Haustier-Gedenken erstellen - Memora Moments",
      heading: "Gedenken für Ihr Haustier",
      description: "Laden Sie Erinnerungen Ihres Lieblings hoch."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { pet: "Produkt wählen (Haustiere)" },
        step2ByMode: { pet: "Angaben zum Haustier" }
      },
      products: {
        petOptionsTitle: "Optionen für Haustier–Memora Tag",
        keychainLabel: "mit Schlüsselanhänger (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Individuell gestaltbar",
        designCustomNote: "Hinweis: Individuelles Design kostet +10 CHF."
      },
      step2Fields: {
        pet_name: "Name des Haustiers *",
        pet_deathDate: "Sterbedatum",
        pet_notesPH: "Besondere Wünsche, Lieblingsgeräusche, Hinweise …"
      }
    }
  },

  // --- SURPRISE MODE ---
  surprise: {
    hero: {
      title: "Überraschungsmomente, die berühren.",
      subtitle:
        "Die Surprise-Kollektion verbindet Design mit einem besonderen Erlebnis.",
      startButton: "Surprise starten",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Das gewisse Etwas",
      subtitle: "Kuratiert, dezent und mit einem Hauch Magie.",
      unique: { title: "Kuratiertes Erlebnis", desc: "Jede Surprise-Platte erzählt eine kleine Geschichte." },
      multimedia: { title: "Bild • Video • Klang", desc: "Alle Medien auf einer Platte." },
      music: { title: "Signature-Sound", desc: "Ein Soundteppich für besondere Momente." },
      quality: { title: "Premium-Materialien", desc: "Langlebig, wetterfest und elegant." }
    },
    howitworks: {
      title: "So funktioniert Surprise",
      subtitle: "Drei Schritte zum Überraschungsmoment.",
      step1: { title: "Inhalte wählen", desc: "Fotos, Clips und Musik aussuchen." },
      step2: { title: "Inszenierung festlegen", desc: "Wir gestalten eine Sequenz." },
      step3: { title: "Surprise erhalten", desc: "Ihre Surprise-Platte erleben." }
    },
    products: {
      title: "Surprise-Produkte",
      subtitle: "Wählen Sie Ihren Stil.",
      basic: { title: "Memora Surprise Tag", desc: "Minimalistische NFC-Platte für Überraschungsmomente.", price: "ab 70 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Eleganter Rahmen mit Surprise-Inszenierung.", price: "ab 140 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Exklusive Surprise-Inszenierung mit erweiterten Optionen.", price: "ab 220 CHF" },
      features: {
        glass: "Robustes Finish",
        nfc: "Integrierter NFC-Tag",
        format: "Optimiert für Multimedia",
        weather: "Witterungsbeständig",
        all: "Rahmen mit NFC",
        photo: "Foto optional",
        engraving: "Gravur optional",
        premium: "Hochwertige Materialien"
      }
    },
    cta: {
      title: "Bereit für Ihren Überraschungsmoment?",
      subtitle: "Surprise schenkt einzigartige Augenblicke.",
      create: "Surprise erstellen",
      contact: "Beratung anfragen"
    },
    gedenken: {
      title: "Surprise erstellen - Memora Moments",
      heading: "Ihr Surprise-Moment",
      description: "Laden Sie Inhalte hoch und wir gestalten Ihr Erlebnis."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { surprise: "Produkt wählen (Surprise)" },
        step2ByMode: { surprise: "Angaben für Surprise" }
      },
      step2Fields: {
        surprise_name: "Name (Empfänger) *",
        surprise_notesPH: "Anlass, Idee oder besondere Wünsche …"
      }
    }
  }
};
