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
          "Memora Moments\nBreitenmattstrasse\n8635 Dürnten\nE-Mail: info.memora.moments@gmail.com\nTelefon: +41 79 407 56 99\n\nWir sind verantwortlich für die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten im Sinne des Schweizer Datenschutzgesetzes (revDSG)."
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
            title: "1. Geltungsbereich",
            content:
              "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen und Vertragsabschlüsse zwischen Memora Moments (nachfolgend «wir») und Kund:innen (nachfolgend «Sie») im Zusammenhang mit dem Erwerb von NFC-Tags, Erinnerungs-Videos und damit verbundenen digitalen Inhalten."
          },
          contract: {
            title: "2. Vertragsabschluss",
            content:
              "Der Vertrag kommt zustande, sobald wir Ihre Bestellung ausdrücklich per E-Mail bestätigen. Wir können Bestellungen aus technischen oder rechtlichen Gründen ablehnen."
          },
          services: {
            title: "3. Leistungen",
            content:
              "Unsere Leistungen umfassen: Herstellung und Lieferung von NFC-Tags (physische Produkte); Erstellung und Bereitstellung von personalisierten Erinnerungs-Videos (digitale Inhalte); Zugang zu weiteren digitalen Inhalten im Zusammenhang mit dem Produkt."
          },
          prices: {
            title: "4. Preise und Zahlungsbedingungen",
            content:
              "Alle Preise verstehen sich in Schweizer Franken (CHF) inkl. gesetzlicher Mehrwertsteuer, sofern anwendbar. Akzeptierte Zahlungsarten: Kreditkarte, TWINT, Vorkasse. Die Zahlung ist vor Lieferung bzw. vor der Erstellung der digitalen Inhalte fällig."
          },
          delivery: {
            title: "5. Lieferung und Lieferfristen",
            content:
              "Die Lieferung der Produkte erfolgt in der Regel innerhalb von 30 Tagen nach Vertragsabschluss. Bei individuell angefertigten Produkten kann es zu Verzögerungen kommen; wir informieren Sie in einem solchen Fall umgehend."
          },
          cancellation: {
            title: "6. Widerruf und Rücktrittsrecht",
            content:
              "Für personalisierte Produkte und digitale Inhalte (z. B. individuell erstellte Erinnerungs-Videos) besteht kein Rückgaberecht. Für nicht personalisierte Produkte gelten die gesetzlichen Bestimmungen."
          },
          warranty: {
            title: "7. Gewährleistung",
            content:
              "Wir gewährleisten die vertragsgemässe Beschaffenheit unserer Produkte. Allfällige Mängel teilen Sie uns bitte innert 14 Tagen nach Erhalt mit, damit wir eine angemessene Lösung (Nachbesserung, Ersatz oder Rückerstattung) prüfen können."
          },
          liability: {
            title: "7a. Haftung",
            content:
              "Unsere Haftung ist auf Schäden beschränkt, die durch vorsätzliches oder grob fahrlässiges Verhalten verursacht wurden. Für technische Probleme auf Kundenseite (z. B. unzureichende Internetverbindung, inkompatible Endgeräte, Softwareeinstellungen) übernehmen wir keine Verantwortung."
          },
          ip: {
            title: "8. Urheberrechte und Nutzungsrechte",
            content:
              "Die von uns erstellten Inhalte (z. B. Erinnerungs-Videos) unterliegen dem Urheberrecht. Sie erhalten ein einfaches, nicht übertragbares Nutzungsrecht zur privaten Nutzung. Eine kommerzielle Nutzung oder Weitergabe an Dritte ist nicht erlaubt, ausser es wurde schriftlich etwas anderes vereinbart. Mit dem Hochladen von Fotos, Videos, Audio oder Texten bestätigen Sie, dass Sie über die notwendigen Rechte verfügen; Sie stellen uns insoweit von Ansprüchen Dritter frei."
          },
          privacy: {
            title: "9. Datenschutz",
            content:
              "Wir verarbeiten personenbezogene Daten ausschliesslich gemäss unserer Datenschutzerklärung. Dies umfasst die Speicherung und Verarbeitung Ihrer Daten zur Vertragserfüllung sowie die Weitergabe an notwendige Dritte (z. B. Zahlungsanbieter, Hosting/IT, Versand). Mit Nutzung unserer Dienstleistungen erklären Sie sich mit dieser Verarbeitung einverstanden."
          },
          special: {
            title: "10. Emotionale Produkte & besondere Hinweise",
            content:
              "Unsere Produkte haben einen hohen emotionalen Wert. Personalisierte Inhalte können nach der Fertigstellung nicht verändert oder zurückgegeben werden. Bei technischen Problemen unsererseits (z. B. Serverausfall) bemühen wir uns um eine schnellstmögliche Wiederherstellung des Zugangs; eine permanente Verfügbarkeit auf Kundenseite können wir nicht garantieren."
          },
          law: {
            title: "11. Gerichtsstand und anwendbares Recht",
            content:
              "Es gilt ausschliesslich schweizerisches Recht. Gerichtsstand ist der Sitz von Memora Moments."
          },
          final: {
            title: "12. Schlussbestimmungen",
            content:
              "Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Gültigkeit der übrigen Bestimmungen unberührt. Wir behalten uns vor, diese AGB jederzeit anzupassen. Es gilt die jeweils aktuelle Version, die mit Datum und Versionsnummer veröffentlicht wird."
          },
        }
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
              "E-Mail: info.memora.moments@gmail.com\nTelefon: +41 79 407 56 99"
          },
          responsible: {
            title: "Verantwortlichkeit",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
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
        "Aus Momenten wird ein stilles Denkmal – Memora Moments öffnet die Tür zu Geschichten, die bleiben. Bilder, Videos und Musik halten die Erinnerung lebendig, genau dort, wo sie hingehört: nah am Herzen",
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
      description: "10% jedes Kaufs eines Memora Moments Produkts spenden wir an eine wohltätige Stiftung, um Hoffnung und Freude zu schenken.",
      linkText: "Erfahre mehr über Make-A-Wish"
    },  

    howitworks: {
      title: "So einfach funktioniert es",
      subtitle: "In wenigen Schritten zur persönlichen Memora.",
      step1: { title: "Produkt auswählen", desc: "Wählen Sie zwischen Memora Tag, Frame oder Deluxe." },
      step2: { title: "Medien und Musik auswählen", desc: "Wählen Sie Ihre Lieblingsbilder und Lieblingsvideos oder auch Sprachnachrichten und fügen Sie passende Hintergrundmusik hinzu." },
      step3: { title: "Memora erhalten", desc: "Ihre Memora kommt zu Ihnen nach Hause." }
    },
    products: {
      title: "Unsere Memoras:",
      subtitle: "Die klassischen Memora-Produkte.",
      basic: { title: "Memora Tag", desc: "Ein schlichter Smart-Tag, die Erinnerungen per digitalem Fotoalbum zum Leben erweckt – dezent und unvergänglich.", price: "49 CHF" },
      premium: { title: "Memora Frame", desc: "Ein klassischer Bilderrahmen, verbunden mit moderner Technologie. So wird jedes Foto zum Tor zu bewegenden Erinnerungen.", price: "79 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Ein hochwertiges Kunstwerk, das die Vergangenheit lebendig hält und Zukunft berührt.", price: "129 CHF" },
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
        imagesLabel: "Bilder (mehrfach möglich)",
        videosLabel: "Videos (mehrfach möglich)",
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
        "Unsere Haustiere schenken uns Liebe, Treue und Freude. Mit Memora Moments bleibt ihre Erinnerung lebendig – im Herzen und an besonderen Orten.",
      startButton: "Wie funktionierts?",
      learnButton: "Mehr erfahren"
    },
    features: {
      title: "Unvergessliche Momente mit Ihrem Liebling",
      subtitle: "Digitale Erinnerungen für Haustiere.",
      unique: { title: "Liebevolle Erinnerung", desc: "Besondere Momente mit Ihrem Haustier." },
      multimedia: { title: "Multimedia Erlebnisse", desc: "Erhalten Sie Ihr digitales Fotoalbum. Fotos und Videos Ihres Lieblings." },
      music: { title: "Lieblingsgeräusche", desc: "Das vertraute Bellen, Miauen oder ein Lied, das verbindet." },
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
      step2: { title: "Medien und Musik oder Geräusche auswählen", desc: "Wählen Sie Ihre Lieblingsbilder und Lieblingsvideos oder auch Sprachnachrichten und fügen Sie passende Hintergrundmusik hinzu." },
      step3: { title: "Memora erhalten", desc: "Ihre Memora wird geliefert." }
    },
    products: {
      title: "Haustier-Produkte",
      subtitle: "Erinnerungen für treue Begleiter.",
      basic: { title: "Memora Pet Tag", desc: "Ein schlichter Smart-Tag, die mit einem digitalen Fotoalbum Erinnerungen an Ihr Haustier zum Leben erweckt", price: "ab 49 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Ein stilvoller Bilderrahmen, der Ihr Lieblingsfoto mit einem digitalen Fotoalbum verbindet – ideal für Zuhause.", price: "79 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Eine exklusive Plexiglasplatte mit Halterung – für ein bleibendes, würdiges Erinnerungsstück.", price: "129 CHF" },
      features: {
        tag1: "6×6 cm oder 2.5 cm ⌀ Smart-Tag",
        tag2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        tag3: "Minimales, zeitloses Design, fügt sich harmonisch ein",
        tag4: "Option: Standard schlicht, individuell gestaltet oder als Schlüsselanhänger",
        premium1: "3 cm ⌀ Plexiglasplatte – verbindet Bild & digitales Gedenken",
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
        imagesLabel: "Bilder (mehrfach möglich)",
        videosLabel: "Videos (mehrfach möglich)",
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
      title: "Ein Geschenk, das Herzen berührt – unvergessliche Überraschungen.",
      subtitle:
        "Ob Hochzeit, Geburtstag oder Jubiläum – mit Memora Moments machen Sie Erinnerungen greifbar. Fotos, Videos und Musik werden zu einem einzigartigen Geschenk, das bleibt.",
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
      step3: { title: "Surprise erhalten", desc: "Ihre Memora oder wird direkt zu Ihnen geliefert." }
    },
    products: {
      title: "Surprise-Produkte",
      subtitle: "Wählen Sie Ihren Stil.",
      basic: { title: "Memora Surprise Tag", desc: "Ein Smart-Tag, die ein digitales Fotoalbum verbindet – originell und einzigartig.", price: "49 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Ein stilvoller Bilderrahmen, der Ihr Lieblingsfoto mit einem digitalen Fotoalbum verbindet – ideal als Geschenk.", price: "79 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Eine exklusive Plexiglasplatte mit integrierter Technologie – das elegante Premium-Geschenk für bleibende Erinnerungen.", price: "129 CHF" },
      features: {
        tag1: "6×6 cm oder 3 cm ⌀ Smart-Tag",
        tag2: "Persönliches digitales Fotoalbum direkt per Tap durchblättern",
        tag3: "Minimales, zeitloses Design, fügt sich harmonisch ein",
        tag4: "Überraschung, die Emotionen weckt und lange in Erinnerung bleibt",
        premium1: "3 cm ⌀ Plexiglasplatte – verbindet Bild & digitales Gedenken",
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
        imagesLabel: "Bilder (mehrfach möglich)",
        videosLabel: "Videos (mehrfach möglich)",
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