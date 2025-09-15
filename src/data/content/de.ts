import type { ContentData } from './types';

export const deContent: ContentData = {
  shared: {
    navigation: {
      home: "Home",
      gedenken: "Gedenken",
      about: "Über uns",
      contact: "Kontakt",
      start: "Jetzt erstellen",
      mode: {
        human: "Mensch",
        pet: "Haustier",
        surprise: "Überraschung"
      }
    },
    about: {
      title: "Über uns",
      heading: "Unsere Geschichte",
      description: "Memora Moments hilft dabei, wertvolle Erinnerungen zu bewahren."
    },
    contact: {
      title: "Kontakt",
      heading: "Kontaktieren Sie uns",
      description: "Haben Sie Fragen? Wir helfen gerne weiter."
    },
    aboutPage: {
      title: "Über Memora Moments",
      lead: "Wir bewahren wertvolle Erinnerungen.",
      story: {
        title: "Unsere Geschichte",
        p1: "Memora Moments wurde gegründet, um Menschen dabei zu helfen, ihre wertvollsten Erinnerungen zu bewahren.",
        p2: "Unser Team arbeitet mit Leidenschaft daran, innovative Lösungen zu entwickeln.",
        p3: "Wir glauben, dass jede Erinnerung wertvoll ist und bewahrt werden sollte.",
        p4: "Mit modernster Technologie machen wir Erinnerungen zugänglich und unvergesslich.",
        p5: "Vertrauen Sie uns Ihre kostbarsten Momente an."
      },
      values: {
        title: "Unsere Werte",
        compassion: {
          title: "Mitgefühl",
          desc: "Wir verstehen die emotionale Bedeutung Ihrer Erinnerungen."
        },
        personality: {
          title: "Persönlichkeit",
          desc: "Jede Erinnerung ist einzigartig und wird individuell behandelt."
        },
        connection: {
          title: "Verbindung",
          desc: "Wir helfen dabei, emotionale Verbindungen zu bewahren."
        }
      },
      product: {
        title: "Unser Produkt",
        p1: "Memora Tags verbinden physische Objekte mit digitalen Erinnerungen.",
        p2: "Mit NFC-Technologie werden Ihre Erinnerungen lebendig."
      }
    },
    legal: {
      privacy: {
        title: "Datenschutz-Bestimmungen",
        sections: {
          responsible: {
            title: "Verantwortliche Stelle",
            content: "Für die Datenverarbeitung verantwortlich ist Memora Moments. Kontakt: info.memora.moments@gmail.com"
          },
          dataCollection: {
            title: "Erhebung und Verwendung von Daten",
            content: "Wir erheben Daten zu folgenden Zwecken:",
            list: [
              "Bearbeitung Ihrer Bestellung",
              "Kommunikation mit Ihnen", 
              "Verbesserung unserer Dienstleistungen"
            ]
          },
          imageProcessing: {
            title: "Bildverarbeitung",
            content: "Ihre hochgeladenen Bilder werden ausschließlich zur Erstellung Ihres Produkts verwendet:",
            list: [
              "Sichere Verschlüsselung während der Übertragung",
              "Löschung nach Fertigstellung des Produkts",
              "Keine Weitergabe an Dritte"
            ]
          },
          rights: {
            title: "Ihre Rechte",
            content: "Sie haben folgende Rechte bezüglich Ihrer Daten:",
            list: [
              "Auskunft über gespeicherte Daten",
              "Berichtigung unrichtiger Daten",
              "Löschung Ihrer Daten"
            ]
          },
          cookies: {
            title: "Cookies",
            content: "Wir verwenden nur technisch notwendige Cookies für die Funktionalität der Website."
          }
        }
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        sections: {
          scope: { title: "Geltungsbereich", content: "Diese AGB gelten für alle Bestellungen." },
          contract: { title: "Vertragsschluss", content: "Der Vertrag kommt mit der Bestellung zustande." },
          services: { title: "Leistungen", content: "Wir erstellen personalisierte Memora Tags." },
          prices: { title: "Preise", content: "Alle Preise verstehen sich inklusive MwSt." },
          delivery: { title: "Lieferung", content: "Die Lieferzeit beträgt 7-14 Werktage." },
          liability: { title: "Haftung", content: "Die Haftung ist auf grobe Fahrlässigkeit beschränkt." },
          ip: { title: "Geistiges Eigentum", content: "Sie gewähren uns die Rechte zur Verarbeitung Ihrer Inhalte." },
          privacy: { title: "Datenschutz", content: "Siehe separate Datenschutzerklärung." },
          special: { title: "Sonderbestimmungen", content: "Zusätzliche Bedingungen können gelten." },
          law: { title: "Anwendbares Recht", content: "Es gilt Schweizer Recht." },
          final: { title: "Schlussbestimmungen", content: "Änderungen bedürfen der Schriftform." },
          cancellation: { title: "Widerruf", content: "Widerrufsrecht nach gesetzlichen Bestimmungen." },
          warranty: { title: "Gewährleistung", content: "Gesetzliche Gewährleistung." }
        }
      },
      imprint: {
        title: "Impressum",
        sections: {
          info: { title: "Angaben gemäß TMG", content: "Memora Moments" },
          contact: { title: "Kontakt", content: "E-Mail: info.memora.moments@gmail.com" },
          responsible: { title: "Verantwortlich für den Inhalt", content: "Memora Moments" },
          disclaimer: {
            title: "Haftungsausschluss",
            p1: "Die Inhalte wurden sorgfältig erstellt.",
            p2: "Für Richtigkeit können wir keine Gewähr übernehmen.",
            p3: "Wir sind für eigene Inhalte verantwortlich.",
            p4: "Für fremde Inhalte sind wir nicht verantwortlich.",
            p5: "Links werden regelmäßig überprüft."
          }
        }
      }
    },
    footer: {
      brand: {
        name: "Memora Moments",
        description: "Erinnerungen, die weiterleben."
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

  human: {
    hero: {
      title: "Erinnerungen, die weiterleben – mit Herz und Klang.",
      subtitle: "Aus Momenten wird ein stilles Denkmal – Memora Moments öffnet die Tür zu Geschichten, die bleiben.",
      startButton: "Jetzt erstellen",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Warum Memora Moments?",
      subtitle: "Einzigartige Erinnerungen verdienen eine einzigartige Lösung",
      unique: { title: "Einzigartig", desc: "Jedes Memora ist individuell gestaltet" },
      multimedia: { title: "Multimedia", desc: "Bilder, Videos und Musik kombiniert" },
      music: { title: "Musik", desc: "Emotionale Verbindung durch Klang" },
      quality: { title: "Qualität", desc: "Hochwertige Materialien und Verarbeitung" }
    },
    howitworks: {
      title: "So funktioniert es",
      subtitle: "In wenigen Schritten zur personalisierten Erinnerung",
      step1: { title: "Auswählen", desc: "Wählen Sie Ihr gewünschtes Produkt" },
      step2: { title: "Gestalten", desc: "Laden Sie Bilder, Videos und Musik hoch" },
      step3: { title: "Erhalten", desc: "Erhalten Sie Ihr personalisiertes Memora" }
    },
    products: {
      title: "Unsere Produkte",
      subtitle: "Verschiedene Optionen für jeden Bedarf",
      basic: { title: "Basic", desc: "Einfaches Memora Tag", price: "29 CHF" },
      premium: { title: "Premium", desc: "Erweiterte Funktionen", price: "49 CHF" },
      deluxe: { title: "Deluxe", desc: "Vollständige Ausstattung", price: "79 CHF" },
      features: {
        tag1: "NFC-Technologie",
        tag2: "Wasserfest",
        tag3: "Langlebig",
        tag4: "Einfache Bedienung",
        premium1: "Mehr Speicher",
        premium2: "Custom Design",
        premium3: "QR-Code",
        premium4: "Analytics",
        deluxe1: "Premium Materialien",
        deluxe2: "Erweiterte Features",
        deluxe3: "Priority Support",
        deluxe4: "Exklusives Design"
      }
    },
    cta: {
      title: "Bewahren Sie Ihre Erinnerungen",
      subtitle: "Erstellen Sie noch heute Ihr persönliches Memora",
      create: "Jetzt erstellen",
      contact: "Kontakt aufnehmen"
    },
    gedenken: {
      title: "Gedenken",
      heading: "Erinnerungen bewahren",
      description: "Erstellen Sie ein liebevolles Andenken für einen geliebten Menschen."
    }
  },

  pet: {
    hero: {
      title: "Für Ihren treuen Begleiter",
      subtitle: "Bewahren Sie die schönsten Momente mit Ihrem Haustier für immer.",
      startButton: "Jetzt erstellen", 
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Für Ihr Haustier",
      subtitle: "Besondere Erinnerungen an Ihren vierbeinigen Freund",
      unique: { title: "Einzigartig", desc: "Speziell für Haustiere gestaltet" },
      multimedia: { title: "Multimedia", desc: "Bilder, Videos und Geräusche" },
      music: { title: "Lieblingssounds", desc: "Vertraute Geräusche und Musik" },
      quality: { title: "Qualität", desc: "Robuste Materialien" }
    },
    howitworks: {
      title: "So funktioniert es",
      subtitle: "Erinnerungen an Ihren Liebling bewahren",
      step1: { title: "Auswählen", desc: "Wählen Sie das passende Produkt" },
      step2: { title: "Personalisieren", desc: "Fügen Sie Bilder und Erinnerungen hinzu" },
      step3: { title: "Bewahren", desc: "Für immer in Erinnerung behalten" }
    },
    products: {
      title: "Haustier-Produkte",
      subtitle: "Speziell für Ihren vierbeinigen Freund",
      basic: { title: "Pet Basic", desc: "Einfaches Pet-Tag", price: "29 CHF" },
      premium: { title: "Pet Premium", desc: "Erweiterte Pet-Features", price: "49 CHF" },
      deluxe: { title: "Pet Deluxe", desc: "Vollausstattung für Pets", price: "79 CHF" },
      features: {
        tag1: "Haustiersicher",
        tag2: "Wasserfest",
        tag3: "Langlebig",
        tag4: "Einfache Bedienung",
        premium1: "Mehr Speicher",
        premium2: "Custom Pet Design",
        premium3: "QR-Code",
        premium4: "Aktivitäts-Tracking",
        deluxe1: "Premium Pet-Materialien",
        deluxe2: "Erweiterte Pet-Features",
        deluxe3: "Veterinär-Support",
        deluxe4: "Exklusives Pet-Design"
      }
    },
    cta: {
      title: "Für Ihren treuen Freund", 
      subtitle: "Bewahren Sie die Erinnerungen an Ihr Haustier",
      create: "Pet-Memora erstellen",
      contact: "Beratung anfragen"
    },
    gedenken: {
      title: "Haustier-Gedenken",
      heading: "Abschied vom treuen Begleiter",
      description: "Ein liebevolles Andenken an Ihren vierbeinigen Freund."
    }
  },

  surprise: {
    hero: {
      title: "Überraschungen, die berühren",
      subtitle: "Schaffen Sie unvergessliche Momente für besondere Menschen.",
      startButton: "Überraschung erstellen",
      learnButton: "Inspiration finden"
    },
    features: {
      title: "Überraschungs-Features",
      subtitle: "Für besondere Momente und Anlässe",
      unique: { title: "Überraschend", desc: "Unerwartete Freude bereiten" },
      multimedia: { title: "Multimedia", desc: "Videos, Bilder und Nachrichten" },
      music: { title: "Lieblingssongs", desc: "Persönliche Playlist erstellen" },
      quality: { title: "Qualität", desc: "Hochwertige Geschenke" }
    },
    howitworks: {
      title: "Überraschung planen",
      subtitle: "In drei Schritten zur perfekten Überraschung",
      step1: { title: "Planen", desc: "Anlass und Person auswählen" },
      step2: { title: "Gestalten", desc: "Inhalte und Design anpassen" },
      step3: { title: "Verschenken", desc: "Freude bereiten" }
    },
    products: {
      title: "Überraschungs-Pakete",
      subtitle: "Für jeden Anlass das richtige Geschenk",
      basic: { title: "Surprise Basic", desc: "Kleine Aufmerksamkeit", price: "29 CHF" },
      premium: { title: "Surprise Premium", desc: "Besondere Überraschung", price: "49 CHF" },
      deluxe: { title: "Surprise Deluxe", desc: "Unvergessliches Geschenk", price: "79 CHF" },
      features: {
        tag1: "Personalisiert",
        tag2: "Emotional",
        tag3: "Überraschend", 
        tag4: "Einfach zu schenken",
        premium1: "Mehr Inhalte",
        premium2: "Custom Design",
        premium3: "Geschenkverpackung",
        premium4: "Terminversand",
        deluxe1: "Premium Verpackung",
        deluxe2: "Erweiterte Features",
        deluxe3: "Persönliche Beratung",
        deluxe4: "Exklusives Design"
      }
    },
    cta: {
      title: "Überraschen Sie jemand Besonderen",
      subtitle: "Schaffen Sie unvergessliche Erinnerungen",
      create: "Überraschung erstellen",
      contact: "Beratung gewünscht"
    },
    gedenken: {
      title: "Besondere Überraschung",
      heading: "Freude schenken",
      description: "Erstellen Sie eine ganz besondere Überraschung für einen lieben Menschen."
    }
  }
};

export default deContent;