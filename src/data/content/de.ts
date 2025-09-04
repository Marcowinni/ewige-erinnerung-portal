import { ContentData } from './types';

export const deContent: ContentData = {
  shared: {
    navigation: {
      home: 'Startseite',
      gedenken: 'Gedenken erstellen',
      about: 'Über uns',
      contact: 'Kontakt',
      mode: {
        human: 'Menschen',
        pet: 'Haustiere',
        surprise: 'Surprise'
      }
    },
    about: {
      title: 'Über uns - Memora Moments',
      heading: 'Über Memora Moments',
      description: 'Erfahren Sie mehr über unsere Mission, würdevolle Erinnerungen zu schaffen.'
    },
    contact: {
      title: 'Kontakt - Memora Moments',
      heading: 'Kontakt aufnehmen',
      description: 'Haben Sie Fragen? Wir sind hier, um Ihnen zu helfen.'
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
      heading: "Ihr Gedenken erstellen",
      description: "Laden Sie Erinnerungen hoch und wir erstellen ein würdevolles Gedenken."
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
      basic: { title: "Haustier-Memora Tag", desc: "Einfache NFC-Platte für Haustiere.", price: "ab 55 CHF" },
      premium: { title: "Haustier-Memora Frame", desc: "Rahmen mit NFC für Haustiere.", price: "ab 110 CHF" },
      deluxe: { title: "Haustier-Memora Deluxe", desc: "Deluxe-Version mit Gravur und erweiterten Medienoptionen.", price: "ab 180 CHF" },
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
      basic: { title: "Surprise Tag", desc: "Minimalistische NFC-Platte für Überraschungsmomente.", price: "ab 70 CHF" },
      premium: { title: "Surprise Frame", desc: "Eleganter Rahmen mit Surprise-Inszenierung.", price: "ab 140 CHF" },
      deluxe: { title: "Surprise Deluxe", desc: "Exklusive Surprise-Inszenierung mit erweiterten Optionen.", price: "ab 220 CHF" },
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
    }
  }
};
