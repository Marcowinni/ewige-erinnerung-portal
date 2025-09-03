// Product content configuration for human and pet modes
export interface ProductContent {
  hero: {
    title: string;
    subtitle: string;
    startButton: string;
    learnButton: string;
  };
  features: {
    title: string;
    subtitle: string;
    unique: { title: string; desc: string };
    multimedia: { title: string; desc: string };
    music: { title: string; desc: string };
    quality: { title: string; desc: string };
  };
  howitworks: {
    title: string;
    subtitle: string;
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
  };
  products: {
    title: string;
    subtitle: string;
    basic: {
      title: string;
      desc: string;
      price: string;
    };
    premium: {
      title: string;
      desc: string;
      price: string;
    };
    features: {
      glass: string;
      nfc: string;
      format: string;
      weather: string;
      all: string;
      photo: string;
      engraving: string;
      premium: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
    create: string;
    contact: string;
  };
}

export const humanContent: ProductContent = {
  hero: {
    title: "Erinnerungen, die weiterleben – mit Herz und Klang.",
    subtitle:
      "Aus Erinnerungen wird ein stilles Denkmal – Memora Moments öffnet die Tür zu bewegenden Momenten mit Bild und Musik.",
    startButton: "Jetzt beginnen",
    learnButton: "Mehr erfahren",
  },
  features: {
    title: "Unvergessliche Momente für die Ewigkeit",
    subtitle:
      "Unsere Memora Moments NFC-Platten vereinen moderne Technologie mit würdevoller Erinnerung. Sie ermöglichen, das Leben eines geliebten Menschen durch Bilder, Videos und Musik lebendig zu halten – direkt am Grab.",
    unique: {
      title: "Einzigartiges Gedenken",
      desc:
        "Bewahren Sie besondere Erinnerungen mit Memora Moments, die Ihre schönsten Momente durch einfaches Berühren mit dem Handy zugänglich macht.",
    },
    multimedia: {
      title: "Multimedia Erinnerungen",
      desc:
        "Laden Sie Fotos und Videos hoch, die die Persönlichkeit und das Leben des Verstorbenen zeigen.",
    },
    music: {
      title: "Lieblingslied einbinden",
      desc:
        "Fügen Sie bedeutungsvolle Musik hinzu, die beim Betrachten der Erinnerungen abgespielt wird.",
    },
    quality: {
      title: "Würdevoll gestaltet",
      desc:
        "Hochwertige Glasplatten, die sich harmonisch in den Grabstein einfügen und allen Wetterbedingungen standhalten.",
    },
  },
  howitworks: {
    title: "So einfach funktioniert es",
    subtitle:
      "In wenigen Schritten zur persönlichen Gedenkplatte: Laden Sie Fotos oder Videos hoch, wählen Sie ein Lied, wir erstellen daraus ein liebevoll gestaltetes Video. Sie erhalten eine NFC-Platte, die durch Berühren mit dem Handy direkt zu Ihrer Erinnerung führt.",
    step1: {
      title: "Medien hochladen",
      desc:
        "Wählen Sie die schönsten Fotos und Videos aus, die die Erinnerung an Ihren Liebsten festhalten.",
    },
    step2: {
      title: "Musik auswählen",
      desc:
        "Fügen Sie ein Lieblingslied hinzu, das besondere Bedeutung für den Verstorbenen hatte.",
    },
    step3: {
      title: "NFC-Platte erhalten",
      desc:
        "Ihre persönliche NFC-Platte wird gefertigt und direkt zu Ihnen nach Hause geliefert.",
    },
  },
  products: {
    title: "Unsere Produkte und wie sie funktionieren",
    subtitle:
      "Erleben Sie den Memora Moments in Aktion und sehen Sie unsere Gedenkplatten.",
    basic: {
      title: "Memora Tag",
      desc: "Schlichte, elegante NFC-Platte für Ihre digitalen Erinnerungen.",
      price: "ab 60 CHF",
    },
    premium: {
      title: "Memora Frame",
      desc:
        "Die stilvolle Verbindung von klassischem Bilderrahmen und moderner NFC-Technologie – für persönliche Erinnerungen, die bleiben.",
      price: "ab 120 CHF",
    },
    features: {
      glass: "6×6 cm NFC-Platte aus hochwertigem Kunststoff",
      nfc: "Minimalistische, elegante Gestaltung",
      format: "Witterungsbeständig & langlebig",
      weather: "Einfaches Aufbringen an Grabsteinen, Urnen oder Erinnerungsorten",
      all: "Hochwertiger Bilderrahmen mit integriertem NFC-Tag",
      photo: "Persönliches Foto im Rahmen",
      engraving: "Kleinere, dezente NFC-Einheit für unauffällige Nutzung",
      premium: "Ideal für Wohnzimmer, Gedenkecken oder private Erinnerungsorte",
    },
  },
  cta: {
    title: "Beginnen Sie Ihre Erinnerungsreise",
    subtitle:
      "Werden Sie Teil einer Gemeinschaft, die das Leben wertschätzt. Erstellen Sie noch heute Ihr einzigartiges Gedenken und bewahren Sie kostbare Erinnerungen für kommende Generationen.",
    create: "Gedenken erstellen",
    contact: "Kontakt aufnehmen",
  },
};


export const petContent: ProductContent = {
  hero: {
    title: "Für unsere treuen Begleiter – Erinnerungen mit Herz und Klang.",
    subtitle:
      "Memora Moments für Haustiere – bewahren Sie die schönsten Momente mit Ihrem geliebten Vierbeiner durch Bilder, Videos und Musik.",
    startButton: "Jetzt beginnen",
    learnButton: "Mehr erfahren",
  },
  features: {
    title: "Unvergessliche Momente mit Ihrem Liebling",
    subtitle:
      "Unsere Memora Moments für Haustiere bewahren die schönsten Erinnerungen an Ihren treuen Begleiter. Durch NFC-Technologie können Sie Bilder, Videos und Lieblingsgeräusche dauerhaft zugänglich machen.",
    unique: {
      title: "Liebevolle Erinnerung",
      desc:
        "Bewahren Sie die besonderen Momente mit Ihrem Haustier – von den ersten Tagen bis zu den schönsten gemeinsamen Erlebnissen.",
    },
    multimedia: {
      title: "Tierische Erinnerungen",
      desc:
        "Sammeln Sie Fotos und Videos, die die einzigartige Persönlichkeit und die schönsten Momente Ihres Lieblings zeigen.",
    },
    music: {
      title: "Lieblingsgeräusche",
      desc:
        "Fügen Sie vertraute Geräusche oder Musik hinzu, die Ihr Haustier geliebt hat oder die Sie an gemeinsame Momente erinnern.",
    },
    quality: {
      title: "Wetterbeständig",
      desc:
        "Robust und wetterbeständig – perfekt für Gärten, Tierfriedhöfe oder besondere Erinnerungsorte im Freien.",
    },
  },
  howitworks: {
    title: "So einfach funktioniert es",
    subtitle:
      "In wenigen Schritten zur persönlichen Haustier-Gedenkplatte: Laden Sie Fotos oder Videos hoch, wählen Sie ein Lied oder vertraute Geräusche – wir erstellen ein liebevoll gestaltetes Video. Ihre NFC-Platte führt per Berührung direkt zur Erinnerung.",
    step1: {
      title: "Medien hochladen",
      desc:
        "Wählen Sie die schönsten Fotos und Videos aus, die das Wesen Ihres Lieblings festhalten.",
    },
    step2: {
      title: "Musik/Geräusch auswählen",
      desc:
        "Fügen Sie ein Lieblingslied oder vertraute Geräusche hinzu, die besondere Bedeutung haben.",
    },
    step3: {
      title: "NFC-Platte erhalten",
      desc:
        "Ihre Haustier-NFC-Platte wird gefertigt und bequem zu Ihnen nach Hause geliefert.",
    },
  },
  products: {
    title: "Unsere Produkte und wie sie funktionieren",
    subtitle:
      "Erleben Sie Memora Moments für Haustiere in Aktion und entdecken Sie unsere liebevoll gestalteten Lösungen.",
    basic: {
      title: "Haustier-Memora Tag",
      desc:
        "Schlichte, liebevolle NFC-Platte für Ihre digitalen Erinnerungen an Ihren Liebling.",
      price: "ab 55 CHF",
    },
    premium: {
      title: "Haustier-Memora Frame",
      desc:
        "Ein stilvoller Bilderrahmen mit integriertem NFC – ideal für bleibende Erinnerungen an Ihren Begleiter.",
      price: "ab 110 CHF",
    },
    features: {
      glass: "6×6 cm NFC-Platte, kratz- und wetterfest",
      nfc: "Minimalistische, liebevolle Gestaltung",
      format: "Haustier-optimierte Formate",
      weather: "Wetter- und alltagsbeständig – für drinnen & draussen",
      all: "Hochwertiger Bilderrahmen mit integriertem NFC-Tag",
      photo: "Persönliches Foto im Rahmen",
      engraving: "Optional: Pfoten- und Namensgravur",
      premium: "Ideal für Zuhause, Gedenkecken oder besondere Erinnerungsorte",
    },
  },
  cta: {
    title: "Ehren Sie Ihren Liebling heute",
    subtitle:
      "Schaffen Sie eine würdige Erinnerung an Ihren treuen Begleiter – liebevoll, persönlich und jederzeit zugänglich.",
    create: "Haustier-Gedenken erstellen",
    contact: "Beratung für Haustiere",
  },
};


export const getContentForMode = (isPetMode: boolean): ProductContent => {
  return isPetMode ? petContent : humanContent;
};