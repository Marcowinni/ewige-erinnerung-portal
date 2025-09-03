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
    title: "Ewige Erinnerungen schaffen",
    subtitle: "Bewahren Sie die kostbarsten Momente Ihrer Liebsten für die Ewigkeit mit unserem innovativen Memora System.",
    startButton: "Erinnerung erstellen",
    learnButton: "Mehr erfahren"
  },
  features: {
    title: "Warum Memora wählen?",
    subtitle: "Innovative Technologie trifft auf zeitloses Design",
    unique: {
      title: "Einzigartige Erinnerungen",
      desc: "Jedes Memora ist ein Unikat, das die Geschichte eines Menschen erzählt"
    },
    multimedia: {
      title: "Multimedia-Inhalte",
      desc: "Fotos, Videos und persönliche Nachrichten in einem System"
    },
    music: {
      title: "Lieblingsmusik",
      desc: "Verbinden Sie Erinnerungen mit den Lieblingsliedern Ihrer Familie"
    },
    quality: {
      title: "Premium Qualität",
      desc: "Hochwertige Materialien für dauerhafte Erinnerungen"
    }
  },
  howitworks: {
    title: "So funktioniert's",
    subtitle: "In nur drei einfachen Schritten zu Ihrer persönlichen Gedenkstätte",
    step1: {
      title: "Inhalte sammeln",
      desc: "Laden Sie Fotos, Videos und persönliche Nachrichten hoch"
    },
    step2: {
      title: "Personalisieren",
      desc: "Gestalten Sie Ihr Memora nach Ihren Wünschen"
    },
    step3: {
      title: "Für immer bewahren",
      desc: "Erhalten Sie Ihr fertiges Memora und teilen Sie Erinnerungen"
    }
  },
  products: {
    title: "Unsere Memora Produkte",
    subtitle: "Wählen Sie das perfekte Format für Ihre Erinnerungen",
    basic: {
      title: "Memora Tag",
      desc: "Elegante Grundausstattung für Ihre wertvollsten Erinnerungen",
      price: "ab 60 CHF"
    },
    premium: {
      title: "Memora Frame",
      desc: "Premium-Version mit individueller Gravur und erweiterten Funktionen",
      price: "ab 120 CHF"
    },
    features: {
      glass: "Sicherheitsglas",
      nfc: "NFC-Technologie",
      format: "Verschiedene Formate",
      weather: "Wetterfest",
      all: "Alle Grundfunktionen",
      photo: "Foto-Integration",
      engraving: "Individuelle Gravur",
      premium: "Premium-Materialien"
    }
  },
  cta: {
    title: "Beginnen Sie heute",
    subtitle: "Schaffen Sie bleibende Erinnerungen für Ihre Familie",
    create: "Jetzt erstellen",
    contact: "Kontakt aufnehmen"
  }
};

export const petContent: ProductContent = {
  hero: {
    title: "Ewige Erinnerungen an Ihre Fellfreunde",
    subtitle: "Bewahren Sie die kostbarsten Momente mit Ihren geliebten Haustieren für die Ewigkeit mit unserem innovativen Memora System.",
    startButton: "Haustier-Erinnerung erstellen",
    learnButton: "Mehr über Haustier-Memora"
  },
  features: {
    title: "Warum Memora für Haustiere?",
    subtitle: "Liebevolle Technologie für unsere treuen Begleiter",
    unique: {
      title: "Einzigartige Haustier-Erinnerungen",
      desc: "Jedes Memora erzählt die besondere Geschichte Ihres Lieblings"
    },
    multimedia: {
      title: "Multimedia-Inhalte",
      desc: "Süße Fotos, Videos und persönliche Botschaften an Ihren Vierbeiner"
    },
    music: {
      title: "Lieblingsgeräusche",
      desc: "Verbinden Sie Erinnerungen mit den Lieblingsgeräuschen Ihres Haustiers"
    },
    quality: {
      title: "Haustierfreundlich",
      desc: "Sichere, hochwertige Materialien für dauerhafte Erinnerungen"
    }
  },
  howitworks: {
    title: "So funktioniert's für Haustiere",
    subtitle: "In nur drei einfachen Schritten zu Ihrer persönlichen Haustier-Gedenkstätte",
    step1: {
      title: "Haustier-Inhalte sammeln",
      desc: "Laden Sie süße Fotos, Videos und persönliche Nachrichten an Ihren Liebling hoch"
    },
    step2: {
      title: "Personalisieren",
      desc: "Gestalten Sie Ihr Haustier-Memora mit Namen, Daten und besonderen Details"
    },
    step3: {
      title: "Für immer im Herzen",
      desc: "Erhalten Sie Ihr fertiges Haustier-Memora und bewahren Sie die Liebe"
    }
  },
  products: {
    title: "Unsere Haustier-Memora Produkte",
    subtitle: "Wählen Sie das perfekte Format für die Erinnerungen an Ihren Liebling",
    basic: {
      title: "Haustier-Memora Tag",
      desc: "Liebevolle Grundausstattung für Ihre wertvollsten Haustier-Erinnerungen",
      price: "ab 55 CHF"
    },
    premium: {
      title: "Haustier-Memora Frame",
      desc: "Premium-Version mit Pfoten-Gravur und speziellen Haustier-Funktionen",
      price: "ab 110 CHF"
    },
    features: {
      glass: "Bruchsicheres Glas",
      nfc: "NFC-Technologie",
      format: "Haustier-optimierte Formate",
      weather: "Wetter- und kratzfest",
      all: "Alle Haustier-Grundfunktionen",
      photo: "Mehrfach-Foto-Integration",
      engraving: "Pfoten- und Namen-Gravur",
      premium: "Haustierfreundliche Premium-Materialien"
    }
  },
  cta: {
    title: "Ehren Sie Ihren Liebling heute",
    subtitle: "Schaffen Sie bleibende Erinnerungen an Ihren treuen Begleiter",
    create: "Haustier-Memora erstellen",
    contact: "Beratung für Haustiere"
  }
};

export const getContentForMode = (isPetMode: boolean): ProductContent => {
  return isPetMode ? petContent : humanContent;
};