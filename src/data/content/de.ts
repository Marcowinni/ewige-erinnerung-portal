import { ContentData } from './types';

export const deContent: ContentData = {
    shared: {
      navigation: {
        home: 'Memora Moments',
        gedenken: 'Gedenken erstellen',
        about: 'Über uns',
        contact: 'Kontakt',
        start: 'Gedenken starten',
        mode: { human: 'Menschen', pet: 'Haustiere', surprise: 'Surprise' }
      },
      // SEO/Meta für die About-Seite (kann bleiben wie gehabt)
      about: {
        title: 'Über uns - Memora Moments',
        heading: 'Über Memora Moments',
        description: 'Erfahren Sie mehr über unsere Mission, würdevolle Erinnerungen zu schaffen.'
      },
      contact: {
        title: 'Kontakt - Memora Moments',
        heading: 'Kontakt aufnehmen',
        description: 'Haben Sie Fragen? Wir sind hier, um Ihnen zu helfen.'
      },

      //About-Seite Content
      aboutPage: {
        lead: 'Wir verbinden Erinnerungen mit Technologie – einfühlsam, persönlich, zugänglich.',
        story: {
          title: 'Unsere Geschichte',
          p1: 'Memora Moments ist aus dem Wunsch entstanden, Erinnerungen würdevoll zu bewahren.',
          p2: 'Mit NFC und Multimedia schaffen wir eine neue Form des Gedenkens – nahbar und modern.'
        },
        values: {
          title: 'Unsere Werte',
          compassion: {
            title: 'Mitgefühl',
            desc: 'Wir arbeiten respektvoll und einfühlsam – für Menschen in besonderen Lebensmomenten.'
          },
          personality: {
            title: 'Persönlichkeit',
            desc: 'Jedes Gedenken ist individuell – wir gestalten so viel wie nötig, so wenig wie möglich.'
          },
          connection: {
            title: 'Verbundenheit',
            desc: 'Bilder, Videos und Klang schaffen Nähe – jederzeit, am Erinnerungsort oder zuhause.'
          }
        },
        product: {
          title: 'Warum Memora?',
          p1: 'Hochwertige Materialien, wetterfestes Design und ein klarer Fokus auf das Wesentliche.',
          p2: 'Einfach erstellen, wertig erhalten, jederzeit teilen – mit einem sanften Tap.'
        }
      }
    },


  // --- HUMAN MODE ---
  human: {
    hero: {
      title: "Erinnerungen, die weiterleben – mit Herz und Klang.",
      subtitle: "Aus Erinnerungen wird ein stilles Denkmal – Memora Moments öffnet die Tür zu bewegenden Momenten mit Bild und Musik.",
      startButton: "Jetzt beginnen",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Unvergessliche Momente für die Ewigkeit",
      subtitle: "Unsere Memora Moments NFC-Platten vereinen moderne Technologie mit würdevoller Erinnerung.",
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

    /** ---------- Uploader-Overrides (nur was von den Fallbacks abweichen soll) ---------- */
    uploaderCopy: {
      headings: {
        pageTitleByMode: {
          human: "Produkt wählen (Menschen)"
        },
        step1Subtitle: "Wähle dein Produkt – die Inhalte lädst du im nächsten Schritt hoch.",
        step2ByMode: { human: "Angaben zur Person" },
        step2Subtitle: "Bitte die folgenden Felder ausfüllen. Notizen sind optional.",
        step3Title: "Bilder & Videos hochladen",
        step3Subtitle: "Dateien werden im Formular gespeichert und später mitgesendet (nicht im LocalStorage).",
        step4Title: "Kontaktangaben",
        step4Subtitle: "Diese Daten verwenden wir für Rückfragen und die Auftragsbestätigung.",
        step5Title: "Rechnungsangaben & Übersicht",
        step5Subtitle: "Bitte prüfe die Adresse und die Zusammenfassung. Mit „Weiter zur Zahlung“ geht es später in den Checkout.",
        summary: "Zusammenfassung"
      },
      products: {
        formatTitle: "Format",
        roundLabel: "Rund · Ø 3 cm",
        squareLabel: "Quadratisch · 6×6 cm",
        petOptionsTitle: "Optionen für Haustier–Memora Tag" // bleibt, wird im Human-Modus nicht angezeigt
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
        pet_name: "Name des Haustiers *",           // irrelevant im Human-Modus
        pet_deathDate: "Sterbedatum *",             // irrelevant im Human-Modus
        pet_notesPH: "Besondere Wünsche, Lieblingsgeräusche, Hinweise …",
        surprise_name: "Name (Empfänger) *",
        surprise_notesPH: "Hochzeit, Geburtstag, Jubiläum … besondere Wünsche"
      },
      step3Fields: {
        imagesLabel: "Bilder (mehrfach möglich)",
        videosLabel: "Videos (mehrfach möglich)",
        remove: "Entfernen"
      },
      contactFields: { firstName: "Vorname *", lastName: "Nachname *", email: "E-Mail *", phoneOpt: "Telefon (optional)" },
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
      subtitle: "Memora Moments für Haustiere – bewahren Sie die schönsten Momente mit Ihrem Vierbeiner.",
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

    /** ---------- Uploader-Overrides für PET ---------- */
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
      subtitle: "Die Surprise-Kollektion verbindet Design mit einem besonderen Erlebnis.",
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

    /** ---------- Uploader-Overrides für SURPRISE ---------- */
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
