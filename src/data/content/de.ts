import { ContentData } from './types';

export const deContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Gedenken erstellen",
      about: "Über uns",
      contact: "Kontakt",
      start: "Album erstellen",
      create: "Erstellen",
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
      },
      founders: {
        eyebrow: "Die Menschen dahinter",
        title: "Hinter Memora Moments stehen wir zwei",
        intro: "Zwei Freunde, eine Idee – und das gemeinsame Bedürfnis, Erinnerungen einen Ort zu geben, der bleibt. Wir sind keine grosse Firma, sondern zwei Macher, die jedes Album mit der gleichen Sorgfalt anschauen, mit der wir es für unsere eigenen Liebsten gestalten würden.",
        till: {
          name: "Till",
          role: "Mitgründer · Vision & Produkt",
          bio: "Till denkt in Geschichten. Wenn er nicht gerade Konzepte für Memora skizziert, ist er meistens draussen – mit Rucksack, Kamera oder Skiern. Was ihn antreibt: das Gefühl, dass jeder Mensch und jedes Tier eine Erzählung verdient, die nicht im Alltag verloren geht. Diese Haltung prägt jedes Detail unserer Alben.",
          quote: "Ein Tag, ein Bild, ein Lied – manchmal reicht das, um jemanden wieder ganz nah zu fühlen.",
          hobbies: ["Reisen", "Fotografie", "Berge"],
          photoCaptions: {
            main: "Till",
            one: "Australien – Rucksack, weite Strassen, viele Geschichten.",
            two: "Wintertage, an denen die Welt einen Moment lang stillsteht."
          }
        },
        wini: {
          name: "Marco \"Wini\" Winistörfer",
          role: "Mitgründer · Technik & Plattform",
          bio: "Wini baut. Tagsüber Code, abends manchmal noch ein bisschen mehr Code. Er ist der Pragmatiker im Team – findet Lösungen, wo andere noch über das Problem reden. Memora Moments ist für ihn der Ort, an dem Technologie endlich das tut, wofür sie gemacht sein sollte: Menschen näher zueinander bringen.",
          quote: "Gute Technik fällt nicht auf. Sie macht den Weg frei für das, worauf es ankommt.",
          hobbies: ["Kitesurfen", "Wandern", "Coden"],
          photoCaptions: {
            main: "Marco \"Wini\"",
            one: "Auf dem Wasser – wo der Kopf endlich leer wird.",
            two: "Berge, ein Lieblingsort zum Durchatmen."
          }
        }
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
          "TW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten\nE-Mail: info@memora-moments.ch\nTelefon: +41 79 407 56 99\n\nWir sind verantwortlich für die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten im Sinne des revidierten Schweizer Datenschutzgesetzes (revDSG) sowie — soweit anwendbar — der EU-Datenschutz-Grundverordnung (DSGVO)."
      },

      dataCollection: {
        title: "2. Welche Daten wir erheben",
        content:
          "Wir verarbeiten ausschliesslich Daten, die Sie uns im Rahmen einer Bestellung, der Album-Erstellung oder beim Abruf eines veröffentlichten Albums zur Verfügung stellen. Konkret:",
        list: [
          "Bestelldaten: Name, Lieferadresse, E-Mail, optional Telefon, Zahlungsinformationen (über Stripe)",
          "Album-Inhalte: Fotos und Videos (max. 40 Dateien, max. 200 MB pro Video), Bildunterschriften, optionale Widmung, Name und Lebensdaten des/der Verstorbenen sowie der gewählte Musiktitel",
          "Editor-Einstellungen: Layout-Auswahl, Texte pro Seite, Bildausschnitt (Focal Point) — diese Angaben werden in unserer Datenbank zum Album gespeichert",
          "Smart-Tag-Slug: jedes Album erhält eine eindeutige URL (z. B. memora-moments.ch/album/marie-01), die per NFC oder QR-Code aufgerufen wird",
          "Technische Daten beim Album-Abruf: IP-Adresse (gekürzt durch unsere CDN-Anbieter), Browser, Endgerät, Zeitpunkt — anonymisiert für Sicherheits- und Performance-Zwecke",
          "Cookie-Daten: ein Consent-Cookie und — nach Ihrer Einwilligung — Google Analytics zur Reichweitenmessung"
        ]
      },

      purpose: {
        title: "3. Zweck der Datenverarbeitung",
        content:
          "Wir verwenden Ihre Daten ausschliesslich für:",
        list: [
          "Abwicklung Ihrer Bestellung (physischer Smart Tag und digitales Album)",
          "Erstellung, Layout und Veröffentlichung Ihres personalisierten Albums",
          "Auslieferung der Album-Inhalte beim Aufruf der Smart-Tag- bzw. QR-Code-URL",
          "Zahlungsabwicklung über Stripe und Versand der Auftragsbestätigung per E-Mail",
          "Kontaktaufnahme bei Rückfragen, Korrekturen oder Support",
          "Betrieb, Sicherheit und Weiterentwicklung der Plattform"
        ]
      },

      disclosure: {
        title: "4. Weitergabe an Dritte / Auftragsverarbeiter",
        content:
          "Wir verkaufen keine Daten und geben sie nicht zu Werbezwecken weiter. Für den Betrieb der Plattform setzen wir folgende Dienstleister ein:",
        list: [
          "Supabase (Storage und Datenbank, EU-Region) — speichert Album-Inhalte, Bestelldaten und Editor-Einstellungen",
          "Vercel (Hosting und Edge-CDN) — liefert Website und Album-Seiten aus",
          "Stripe (Zahlungsabwicklung) — verarbeitet Karten- und TWINT-Zahlungen direkt; wir erhalten keine vollständigen Kartendaten",
          "Resend (transaktionale E-Mails) — versendet Bestellbestätigung und Album-Benachrichtigung",
          "Schweizerische Post bzw. Logistikpartner — Versand des physischen Smart Tags",
          "Google Analytics (nur mit Ihrer Cookie-Einwilligung) — anonymisierte Reichweitenmessung"
        ]
      },

      storage: {
        title: "5. Speicherung und Löschung",
        content:
          "Bestelldaten bewahren wir gemäss den schweizerischen Aufbewahrungspflichten (10 Jahre) auf. Album-Inhalte bleiben mindestens 12 Monate ab Auslieferung des Smart Tags abrufbar; eine darüber hinausgehende Verfügbarkeit ist nicht vertraglich zugesichert. Auf schriftliche Anfrage löschen oder anonymisieren wir Album-Inhalte vorzeitig, soweit keine gesetzlichen Pflichten entgegenstehen."
      },

      security: {
        title: "6. Datensicherheit",
        content:
          "Wir schützen Ihre Daten mit aktuellen technischen und organisatorischen Massnahmen: Übertragung ausschliesslich über TLS, Zugriffskontrolle auf Datenbankebene (Row-Level-Security), getrennte Service-Schlüssel für Edge-Funktionen und regelmässige Backups bei unseren Cloud-Anbietern. Ein restloser Schutz bei Übertragungen über das öffentliche Internet (z. B. E-Mail) kann jedoch nicht garantiert werden."
      },

      rights: {
        title: "7. Ihre Rechte",
        content:
          "Sie haben uns gegenüber folgende Rechte. Anfragen senden Sie bitte an info@memora-moments.ch:",
        list: [
          "Auskunft über die zu Ihrer Person gespeicherten Daten",
          "Berichtigung unrichtiger oder unvollständiger Daten",
          "Löschung Ihrer Daten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen",
          "Einschränkung oder Widerspruch gegen bestimmte Verarbeitungen",
          "Datenübertragbarkeit in einem gängigen elektronischen Format",
          "Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft"
        ]
      },

      cookies: {
        title: "8. Cookies und Tracking",
        content:
          "Wir verwenden technisch notwendige Cookies (z. B. Sprach- und Cookie-Consent-Cookie), die ohne Einwilligung gesetzt werden dürfen. Optionale Analyse-Cookies (Google Analytics) setzen wir nur, nachdem Sie im Banner zugestimmt haben. Sie können diese Einwilligung jederzeit widerrufen, indem Sie das Cookie 'memora-cookie-consent' in Ihrem Browser löschen."
      },

      changes: {
        title: "9. Änderungen dieser Datenschutzerklärung",
        content:
          "Wir können diese Erklärung anpassen, wenn sich Funktionen oder Anbieter ändern. Es gilt jeweils die auf dieser Seite veröffentlichte Version."
      }
        }
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        sections: {
          scope: {
            title: "Präambel und Kontakt",
            content: "Diese Website wird von der TW Projects GmbH unter der Marke Memora Moments betrieben. Begriffe wie \"wir\", \"uns\" und \"unsere\" beziehen sich auf TW Projects GmbH; \"Sie\" oder \"Kunde\" auf die nutzende Person.\n\nKontakt:\nTW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Schweiz\nE-Mail: info@memora-moments.ch\nTelefon: +41 79 407 56 99\n\nDiese AGB stehen in Deutsch, Englisch, Französisch und Italienisch zur Verfügung. Bei Abweichungen oder Widersprüchen ist die deutschsprachige Fassung rechtlich verbindlich."
          },
          contract: {
            title: "1. Geltungsbereich und Vertragsabschluss",
            content: "Diese AGB gelten für sämtliche Bestellungen über memora-moments.ch sowie für die Nutzung des Album-Editors und des veröffentlichten Albums.\n\nDie Darstellung der Produkte stellt kein bindendes Angebot dar, sondern eine Aufforderung zur Bestellung. Mit Abschluss des Bestellvorgangs (Zahlungsbestätigung über Stripe) geben Sie ein verbindliches Angebot ab. Der Vertrag kommt zustande, sobald wir Ihnen die Bestellbestätigung per E-Mail senden bzw. die Lieferung anstossen."
          },
          services: {
            title: "2. Leistungsbeschreibung",
            content: "Memora Moments umfasst zwei zusammengehörende Leistungen:\n\n1) Physisches Produkt: ein Smart Tag (NFC- bzw. QR-Plakette), der unauffällig auf Grabsteinen, Urnen oder Partner-Produkten (z. B. Zeichnungsverlag) angebracht werden kann.\n\n2) Digitales Album: ein über den Smart Tag aufrufbares Foto- und Video-Album, das Sie selbst über unseren Online-Editor gestalten. Sie wählen Stil (Modern, Klassisch, Zeitlos), Layout pro Seite, Bildausschnitt sowie optionale Texte und einen Musiktitel.\n\nDas Album wird unter einer eindeutigen URL (memora-moments.ch/album/<slug>) veröffentlicht und ist mit dem Smart Tag verknüpft."
          },
          prices: {
            title: "3. Preise, Versand und Zahlung",
            content: "Der Grundpreis pro Album beträgt CHF 80.– (inkl. allfälliger MwSt., Stand der jeweils auf der Website angegebenen Preise).\n\nVersand erfolgt mit der Schweizerischen Post (A-Post). Versandkosten nach Lieferzone:\n– Schweiz (CH): CHF 1.20\n– Europa (EU): CHF 1.90\n– Welt (WORLD): CHF 2.20\n\nAlle Preise verstehen sich in Schweizer Franken. Allfällige Einfuhrabgaben oder Zollgebühren bei Lieferungen ausserhalb der Schweiz trägt der Empfänger.\n\nZahlung erfolgt vor Auslieferung über Stripe (Kredit-/Debitkarte oder TWINT). Eine Test-Bestellung ohne Zahlung ist nur nach ausdrücklicher Freischaltung durch uns möglich.\n\nBei Rückbelastungen sind wir berechtigt, die damit verbundenen Bankgebühren weiterzuverrechnen."
          },
          delivery: {
            title: "4. Bestellprozess, Lieferung und Gefahrübergang",
            content: "Der Bestellprozess gliedert sich in 8 Schritte: Zielgruppe (Mensch/Tier), Stilwahl, Medien-Upload, Album-Editor, Musik, Vorschau, Daten zur Person und Zahlung.\n\nNach Eingang der Zahlung beginnen wir mit der Produktion des Smart Tags und der Veröffentlichung des Albums. Die Lieferung erfolgt innerhalb von 30 Tagen ab Vertragsschluss, sofern beim Produkt nichts anderes angegeben ist.\n\nDie Gefahr des zufälligen Untergangs oder der zufälligen Verschlechterung des physischen Produkts geht mit Übergabe an den Transportdienst auf Sie über. Bis zur vollständigen Bezahlung bleibt das Produkt unser Eigentum (Eigentumsvorbehalt nach Schweizer Recht)."
          },
          cancellation: {
            title: "5. Widerruf bei personalisierten Produkten",
            content: "Der Smart Tag und das digitale Album werden individuell nach Ihren Angaben hergestellt und veröffentlicht. Personalisierte Produkte sind vom gesetzlichen Widerrufs- bzw. Rückgaberecht ausgenommen.\n\nMängelrechte (Ziff. 8) bleiben unberührt. Wir empfehlen, Ihre Album-Inhalte vor Bestellung in der Vollbild-Vorschau sorgfältig zu prüfen."
          },
          warranty: {
            title: "6. Inhalte des Kunden — Rechte und Pflichten",
            content: "Sie laden im Editor maximal 40 Medien-Dateien hoch (Bilder bis ca. 1 MB pro Datei nach Kompression, Videos bis 200 MB). Sie sichern uns zu, dass Sie an allen hochgeladenen Inhalten — einschliesslich Bilder, Videos, Audio, Texte, Namen und Lebensdaten — die erforderlichen Urheber-, Persönlichkeits- und Datenschutzrechte besitzen oder die Einwilligung der berechtigten Personen bzw. ihrer Angehörigen eingeholt haben.\n\nFür die Erstellung, Speicherung, Auslieferung und Vorschau Ihres Albums räumen Sie uns eine nicht-exklusive, weltweite und auf den Vertragszweck beschränkte Lizenz an diesen Inhalten ein.\n\nWir behalten uns vor, Inhalte abzulehnen oder zu entfernen, wenn sie offensichtlich rechtswidrig sind, gegen die guten Sitten verstossen oder Rechte Dritter verletzen."
          },
          liability: {
            title: "7. Notice-&-Takedown-Verfahren",
            content: "Sind Sie Berechtigter (z. B. Angehörige, Erben, abgebildete Person) und sehen Sie Ihre Rechte durch ein veröffentlichtes Album verletzt, melden Sie uns dies an info@memora-moments.ch unter Angabe der Album-URL und der konkreten Rechtsverletzung.\n\nNach Eingang einer begründeten Meldung nehmen wir das betroffene Album bzw. den betroffenen Inhalt unverzüglich offline und kontaktieren den Auftraggeber zur Klärung."
          },
          ip: {
            title: "8. Gewährleistung und Haftung",
            content: "Es gelten die Mängelrechte des Schweizer Obligationenrechts. Reklamationen müssen schriftlich innerhalb von 21 Tagen nach Erhalt der Lieferung bei uns eingehen. Wir leisten nach unserer Wahl Nachbesserung oder Ersatzlieferung.\n\nVon der Gewährleistung ausgeschlossen sind insbesondere:\n– vom Kunden im Editor verursachte Tipp-, Layout- oder Auswahlfehler,\n– qualitativ unzureichende Bild- oder Videodateien (zu geringe Auflösung, starke Kompression),\n– Farbabweichungen aufgrund unterschiedlicher Bildschirme oder Druckprozesse,\n– Transportschäden, die nicht innert 7 Tagen ab Erhalt gemeldet werden.\n\nUnsere Haftung ist, soweit gesetzlich zulässig, auf Vorsatz und grobe Fahrlässigkeit beschränkt. Für leichte Fahrlässigkeit haften wir nur bei Personenschäden. Eine Haftung für Folgeschäden, entgangenen Gewinn oder Datenverlust ist ausgeschlossen, soweit gesetzlich zulässig."
          },
          privacy: {
            title: "9. Verfügbarkeit digitaler Dienste",
            content: "Wir betreiben Editor, Album-Auslieferung und Bestellprozess auf Cloud-Infrastruktur (insbesondere Vercel und Supabase, EU-Region). Wir bemühen uns um eine hohe Verfügbarkeit, garantieren jedoch kein bestimmtes Service-Level.\n\nKurzzeitige Unterbrüche durch Wartung, Sicherheits-Updates oder Störungen unserer Anbieter sind möglich. Ein Anspruch auf ein bestimmtes Hosting-System oder eine bestimmte Plattform besteht nicht."
          },
          special: {
            title: "10. Rechte Dritter",
            content: "Sie sind allein dafür verantwortlich, dass Sie über die Rechte an den hochgeladenen Inhalten verfügen. Sollten Dritte gegen uns Ansprüche wegen Verletzung von Urheber-, Marken- oder Persönlichkeitsrechten geltend machen, stellen Sie uns von solchen Ansprüchen frei und übernehmen die zur Abwehr notwendigen Kosten — eigene Schadensersatzansprüche unsererseits bleiben vorbehalten."
          },
          law: {
            title: "11. Datenschutz",
            content: "Die Erhebung und Verarbeitung personenbezogener Daten richtet sich nach unserer Datenschutzerklärung. Sie nehmen zur Kenntnis, dass wir Auftragsverarbeiter (insbesondere Supabase, Vercel, Stripe und Resend) einsetzen und Inhalte zur Auslieferung an Endgeräte über Content-Delivery-Networks ausgespielt werden."
          },
          final: {
            title: "12. Spendenregelung",
            content: "TW Projects GmbH spendet 10 % des Nettoverkaufspreises jedes über memora-moments.ch direkt verkauften Memora-Moments-Produkts an wohltätige Organisationen (z. B. Make-A-Wish Schweiz oder die Stiftung Tierrettungsdienst).\n\nKäufe über Partnerkanäle, Wiederverkäufer oder Kooperationen (z. B. Influencer-Links) sind von dieser Spendenregelung ausgenommen.\n\nDie Auszahlung erfolgt einmal jährlich am Jahresende. Die Auswahl der Empfängerorganisation und die Abwicklung obliegen ausschliesslich uns. Ein individueller Rechtsanspruch des Kunden auf Weiterleitung oder Zweckbindung der Spende besteht nicht."
          },

          contact: {
            title: "13. Verbotene Nutzungen",
            content: "Die Plattform darf nicht für rechtswidrige Zwecke, Spam, Schadsoftware, das Hochladen kinderpornografischer, gewaltverherrlichender oder hetzerischer Inhalte sowie für Verletzungen von Rechten Dritter genutzt werden.\n\nBei Verstoss behalten wir uns vor, das Album sofort offline zu nehmen, den Account zu sperren und — soweit erforderlich — Strafverfolgungsbehörden zu informieren. Bereits bezahlte Beträge werden in solchen Fällen nicht zurückerstattet."
          },
          availability: {
            title: "14. Verfügbarkeit digitaler Album-Inhalte",
            content: "Wir stellen sicher, dass das veröffentlichte Album über die Smart-Tag-URL für mindestens 12 Monate ab Auslieferung des Smart Tags abrufbar bleibt, sofern beim Produkt nichts anderes ausgewiesen ist. Eine darüber hinausgehende Verfügbarkeit ist nicht vertraglich zugesichert.\n\nFür Unterbrüche, Änderungen oder Einstellungen externer Dienste sowie für Datenverluste, die ausserhalb unseres Einflussbereichs liegen, übernehmen wir keine Haftung. Wir behalten uns vor, Album-Inhalte auf andere Dienste oder Hosting-Plattformen zu migrieren, ohne dass hieraus ein Anspruch des Kunden auf einen bestimmten Anbieter entsteht.\n\nAnwendbares Recht: schweizerisches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz der TW Projects GmbH (Dürnten ZH)."
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
    },

    landing: {
      hero: {
        eyebrow: "Memora Moments",
        titleLine1: "Erinnerungen",
        titleLine2: "die weiterleben",
        subtitle1: "Ein würdevoller Smart Tag, der die schönsten Momente mit deinen Liebsten in einem digitalen Erinnerungsalbum vereint.",
        subtitle2: "Für Menschen und Tiere, die generationenübergreifend in Erinnerung bleiben.",
        ctaCreate: "Album erstellen"
      },
      pathChoice: {
        eyebrow: "So funktionierts!",
        titleLine1: "Jeder Moment",
        titleLine2: "verdient seinen Platz.",
        ctaCreate: "Album erstellen"
      },
      audience: {
        eyebrow: "Für alle, die uns begleitet haben",
        titleLine1: "Für jeden",
        titleLine2: "geliebten Begleiter.",
        human: {
          eyebrow: "Für Menschen",
          headline: "Für die Menschen,\ndie uns begleitet haben.",
          body: ""
        },
        pet: {
          eyebrow: "Für Tiere",
          headline: "Für deinen\ntreuen Gefährten.",
          body: ""
        }
      },
      styleShowcase: {
        eyebrow: "Drei Stile",
        titleLine1: "Jede Geschichte",
        titleLine2: "verdient ihren Ton.",
        hint: "Durchstöbern Sie unsere Alben und finden Sie Ihren Stil.",
        ctaPickStyle: "Ihren Stil wählen",
        previewTitle: (style: string) => `${style} Album Vorschau`,
        navBack: "Zurück",
        navForward: "Weiter",
        themes: { modern: "Modern", classic: "Klassisch", timeless: "Zeitlos" }
      },
      partner: {
        eyebrow: "Im Verbund",
        titleLine1: "Gemeinsam mit",
        titleLine2: "Zeichnungsverlag",
        body: "Unser Tag lässt sich unauffällig auf Grabsteinen, Urnen sowie auf den Produkten des Zeichnungsverlag anbringen. So entstehen dezente Verbindungen zwischen physischen Erinnerungsorten und digitalen Inhalten.",
        cta: "Zeichnungsverlag besuchen"
      },
      productFeatures: {
        eyebrow: "Das Produkt",
        titleLine1: "Ein kleiner Tag,",
        titleLine2: "unendlich Erinnerungen.",
        intro: "Memora Moments verbindet einen robusten physischen Smart-Tag mit einem persönlich gestalteten digitalen Album. Eine Berührung mit dem Smartphone genügt — und Erinnerungen werden lebendig.",
        items: {
          waterproof: {
            title: "Wasser- und wetterfest",
            body: "Der Smart-Tag aus widerstandsfähigem Material trotzt Regen und Schnee."
          },
          adhesive: {
            title: "Hochwertiger 3M-Kleber",
            body: "Das Industrieklebeband von 3M sorgt für sichere Haftung auf glatten Oberflächen wie Glas, Metall, lackiertem Holz und poliertem Stein."
          },
          quality: {
            title: "Premium-Qualität",
            body: "Stabiler Smart-Tag mit langlebiger Beschichtung."
          },
          personal: {
            title: "Selbst gestaltet, persönlich",
            body: "Sie laden Ihre Bilder, Videos und Texte hoch — wir gestalten daraus ein würdevolles Album in Ihrem gewählten Stil. Selbstgemacht, einzigartig."
          },
          privateUrl: {
            title: "Eigene private URL",
            body: "Jedes Album erhält eine eigene, einzigartige Adresse. Nur wer den Tag kennt oder den Link erhält, sieht das Album."
          },
          versatile: {
            title: "Vielseitig einsetzbar",
            body: "Kleben Sie den Smart-Tag auf Grabsteine, Urnen, Bilderrahmen, Erinnerungsboxen oder sonstigen Schmuckstücken."
          }
        },
        price: {
          label: "Komplettpaket",
          amount: "CHF 80",
          note: "Smart Tag + persönliches Album · zzgl. Versand ab CHF 1.20",
          cta: "Jetzt Album erstellen"
        }
      },
      useCaseGallery: {
        eyebrow: "Anwendungsbeispiele",
        titleLine1: "So findet der Tag",
        titleLine2: "seinen Platz.",
        intro: "Inspiration für Orte, an denen ein Memora-Moments-Tag eine Brücke zwischen damals und heute schlägt.",
        cases: {
          gravestone: "Auf dem Grabstein",
          urn: "An der Urne",
          memorialWall: "An der Erinnerungswand",
          keepsake: "Auf einer Erinnerungsbox",
          petCorner: "An der Tier-Gedenkecke",
          photoFrame: "Am Bilderrahmen zuhause"
        }
      }
    },

    customerWizard: {
      stepLabels: ["Für wen", "Stil", "Fotos", "Bestellen"],
      progress: (current: number, total: number) => `Schritt ${current} von ${total}`,
      nav: { back: "Zurück", next: "Weiter", toStep4: "Weiter zur Bestellung" },
      step1: {
        title: "Für wen gestalten wir das Album?",
        subtitle: "Wählen Sie und füllen Sie die Details aus.",
        optionHuman: "Für einen Menschen",
        optionPet: "Für ein Tier",
        nameLabel: "Name *",
        namePlaceholderHuman: "Name der Person",
        namePlaceholderPet: "Name des Tieres",
        birthDate: "Geburtsdatum (optional)",
        deathDateHuman: "Sterbedatum (optional)",
        deathDatePet: "Sterbedatum (optional)",
        dedicationLabel: "Widmung (optional)",
        dedicationPlaceholder: "Eine kurze Nachricht, die das Album begleitet…"
      },
      step2: {
        title: "Welchen Stil soll Ihr Album haben?",
        subtitle: "Der Stil prägt das Erscheinungsbild aller Seiten.",
        modernLabel: "Modern",
        modernDesc: "Klar, zeitlos, minimalistisch",
        classicLabel: "Klassisch",
        classicDesc: "Warm, würdevoll, traditionell",
        timelessLabel: "Zeitlos",
        timelessDesc: "Klar, ruhig, grosse Bilder",
        selected: "Ausgewählt",
        previewIframeTitle: (style: string) => `${style} Vorschau`
      },
      step3: {
        title: "Ihre Fotos & Videos",
        countLabel: (count: number, max: number) => `${count} / ${max}`,
        intro: (min: number, max: number) => `Laden Sie mindestens ${min} Bilder hoch (max. ${max}). Wir gestalten Ihr Album daraus.`,
        moreNeeded: (n: number, min: number) => `Noch ${n} weitere Bilder nötig (Minimum: ${min}).`,
        dropZoneTitle: "Dateien hier ablegen",
        dropZoneOr: "oder",
        dropZoneSelect: "Dateien auswählen",
        dropZoneRange: (min: number, max: number) => `Bilder & Videos · min. ${min}, max. ${max} Dateien`,
        compressing: "Bilder werden komprimiert…",
        removeAria: "Entfernen",
        musicTitle: "Begleitende Musik (optional)",
        pause: "Pause",
        play: "Abspielen",
        selected: "Ausgewählt",
        select: "Auswählen",
        pixabayPlaceholder: "Pixabay-Link (optional)",
        pixabayLabel: "Pixabay-Link",
        pixabayOpen: "Öffnen",
        noSelection: "Keine Auswahl",
        captionPlaceholder: "Text zu diesem Bild (optional)",
        captionPlaceholderVideo: "Text zu diesem Video (optional)"
      },
      step4: {
        title: "Kontakt & Bezahlung",
        subtitle: "Fast geschafft — wir kümmern uns um den Rest.",
        contactSection: "Kontakt",
        nameLabel: "Ihr Name *",
        namePlaceholder: "Vor- und Nachname",
        emailLabel: "E-Mail *",
        emailPlaceholder: "ihre@email.ch",
        phoneLabel: "Telefon (optional)",
        phonePlaceholder: "+41 79 000 00 00",
        addressSection: "Lieferadresse (für Smart Tag)",
        shippingPrefix: "Versand:",
        streetLabel: "Strasse & Nr. *",
        streetPlaceholder: "Musterstrasse 12",
        postalLabel: "PLZ *",
        cityLabel: "Ort *",
        cityPlaceholder: "Zürich",
        countryLabel: "Land *",
        summaryTitle: "Zusammenfassung",
        summaryFor: "Für",
        summaryStyle: "Stil",
        summaryImagesLabel: "Bilder",
        summaryImages: (count: number) => `${count} Dateien`,
        summaryMusic: "Musik",
        summaryShipping: "Versand",
        summaryNoSelection: "Keine Auswahl",
        totalLabel: "Gesamtpreis",
        processing: "Wird verarbeitet…",
        payCta: (price: string) => `Zahlungspflichtig bestellen — ${price}`,
        testCta: "🧪 Test-Bestellung (ohne Zahlung)"
      },
      validation: {
        pickAudience: "Bitte Zielgruppe wählen und Namen eingeben.",
        pickStyle: "Bitte einen Stil wählen.",
        uploadMin: (min: number) => `Bitte mindestens ${min} Bilder hochladen.`,
        fillRequired: "Bitte alle Pflichtfelder ausfüllen.",
        emailRequired: "Bitte E-Mail-Adresse eingeben.",
        nameRequired: "Bitte Namen eingeben.",
        addressRequired: "Bitte Lieferadresse vollständig ausfüllen.",
        completeAllSteps: "Bitte alle Schritte abschliessen.",
        minMediaError: (min: number) => `Mindestens ${min} Bilder erforderlich.`
      },
      toasts: {
        uploading: (count: number) => `Lade ${count} Dateien hoch…`,
        errorGeneric: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        orderCreatedNoPayment: "Bestellung erstellt. Zahlung bitte per Rechnung.",
        filesAdded: (count: number) => `${count} Dateien hinzugefügt.`,
        maxReached: (max: number) => `Maximum ${max} Bilder erreicht.`,
        videoTooBig: (filename: string) => `${filename} zu groß (max 200 MB).`
      },
      shippingZones: { ch: "Schweiz", eu: "Europa", world: "Weltweit" },
      styleNames: { modern: "Modern", classic: "Klassisch", timeless: "Zeitlos" },
      success: {
        title: "Bestellung eingegangen",
        message: "Vielen Dank. Wir erstellen Ihr Album mit Sorgfalt innert 48 Stunden und senden Ihnen den Link per E-Mail."
      }
    },

    cookieBanner: {
      title: "Wir verwenden Cookies",
      text: "Wir setzen technisch notwendige Cookies und – nur mit Ihrer Zustimmung – Analyse-Cookies, um die Nutzung unserer Seite zu verstehen.",
      learnMore: "Mehr erfahren",
      accept: "Akzeptieren",
      decline: "Ablehnen"
    },

    navAria: {
      main: "Hauptnavigation",
      theme: "Theme",
      menu: "Menu",
      close: "Schliessen",
      closePreview: "Vorschau schliessen"
    },

    notFoundPage: {
      title: "Seite nicht gefunden",
      message: "Diese Seite existiert nicht.",
      ctaHome: "Zur Startseite"
    },

    meta: {
      landing: {
        title: "Memora Moments — Ein Moment. Für immer.",
        description: "Ein würdevoller Smart Tag und ein lebendiges digitales Fotoalbum. Für Menschen und Tiere, die in Erinnerung bleiben."
      },
      selfService: { title: "Bilder hochladen — Memora Moments" },
      partner: { title: "Partner Upload - Memora Moments" }
    },

    selfServicePage: {
      back: "Zurück",
      eyebrow: "Ihr Album beginnt hier",
      titleLine1: "Ihr Album beginnt",
      titleLine2: "hier.",
      subtitle: "Sie laden Ihre Fotos hoch — wir gestalten Ihr Album mit Sorgfalt."
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
      description: "Für jedes über unsere Website direkt gekaufte Memora Moments Produkt spenden wir 10 % des Kaufbetrags an die Stiftung Make-A-Wish, um Hoffnung und Freude zu schenken.",
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
      description: "Für jedes über unsere Website direkt gekaufte Memora Moments Produkt spenden wir 10 % des Kaufbetrags an die Stiftung Tierretungsdienst, um Tieren in Not zu helfen.",
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
      description: "Für jedes über unsere Website direkt gekaufte Memora Moments Produkt spenden wir 10 % des Kaufbetrags an die Stiftung Make-A-Wish, um Hoffnung und Freude zu schenken",
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