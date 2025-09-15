import { ContentData } from './types';

export const itContent: ContentData = {
  shared: {
    navigation: {
      home: 'Home',
      gedenken: 'Crea tributo',
      about: 'Chi siamo',
      contact: 'Contatti',
      start: 'Inizia memoriale',
      mode: {
        human: 'Persone',
        pet: 'Animali',
        surprise: 'Surprise'
      }
    },
    about: {
      title: 'Chi siamo - Memora Moments',
      heading: 'Su Memora Moments',
      description: 'Scopri la nostra missione: creare ricordi dignitosi.'
    },
    contact: {
      title: 'Contatti - Memora Moments',
      heading: 'Contattaci',
      description: 'Domande? Siamo qui per aiutarti.',
      email: 'Email',
      phone: 'Telefono',
      form: {
        title: 'Invia messaggio',
        submit: 'Invia messaggio',
        success: 'Grazie! Il tuo messaggio è stato inviato con successo.',
        name: {
          label: 'Nome',
          placeholder: 'Il tuo nome'
        },
        email: {
          label: 'Email',
          placeholder: 'la.tua.email@esempio.it'
        },
        subject: {
          label: 'Oggetto',
          placeholder: 'Di cosa si tratta?'
        },
        message: {
          label: 'Messaggio',
          placeholder: 'Facci sapere come possiamo aiutarti...'
        }
      }
    },
    
    // Content rendered on the About page
    aboutPage: {
      title: 'Chi siamo',
      lead: 'Colleghiamo i ricordi alla tecnologia – con compassione, personalizzazione e accessibilità.',
      story: {
        title: 'La nostra storia',
        p1: 'Memora Moments è nata dal desiderio di preservare i ricordi con cura e dignità.',
        p2: 'Con NFC e multimedia, creiamo un modo moderno e accessibile di ricordare.',
        p3: 'Comprendiamo l\'importanza dei tributi significativi.',
        p4: 'La nostra tecnologia fa da ponte tra ricordi fisici e digitali.',
        p5: 'Ogni prodotto è realizzato con rispetto e attenzione ai dettagli.',
      },
      values: {
        title: 'I nostri valori',
        compassion: {
          title: 'Compassione',
          desc: 'Lavoriamo rispettosamente e con empatia — per le persone in momenti di vita significativi.'
        },
        personality: {
          title: 'Personalità',
          desc: 'Ogni tributo è individuale — progettiamo quanto necessario, il meno possibile.'
        },
        connection: {
          title: 'Connessione',
          desc: 'Immagini, video e suono creano vicinanza — in qualsiasi momento, nel luogo del ricordo o a casa.'
        }
      },
      product: {
        title: 'Perché Memora?',
        p1: 'Materiali di qualità, design resistente agli agenti atmosferici e un focus chiaro sull\'essenziale.',
        p2: 'Creare facilmente, ricevere qualcosa di duraturo e condividere in qualsiasi momento — con un semplice tap.'
      }
    },
    legal: {
      privacy: {
        title: "Informativa sulla privacy",
        sections: {
          responsible: {
            title: "1. Responsabile",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
          },
          dataCollection: {
            title: "2. Raccolta e utilizzo dei dati",
            content: "Raccogliamo e trattiamo i dati personali solo nella misura necessaria per fornire i nostri servizi. Ciò include:",
            list: [
              "Dati di contatto per l'elaborazione degli ordini",
              "Dati di fatturazione per il pagamento",
              "Immagini e testi caricati da voi per la personalizzazione del prodotto"
            ]
          },
          imageProcessing: {
            title: "3. Elaborazione delle immagini",
            content: "Le immagini che caricate sono utilizzate esclusivamente per creare il vostro prodotto personalizzato. Le vostre immagini sono archiviate in sicurezza e cancellate dopo il completamento dell'ordine o dopo un periodo ragionevole.",
            list: []
          },
          rights: {
            title: "4. I vostri diritti",
            content: "Avete il diritto di accedere, correggere, cancellare e limitare il trattamento dei vostri dati personali. Contattateci a info.memora.moments@gmail.com per richieste sui vostri dati."
          },
          cookies: {
            title: "5. Cookie",
            content: "Il nostro sito web utilizza cookie necessari per la funzionalità. Utilizziamo cookie di tracciamento aggiuntivi solo con il vostro consenso."
          }
        }
      },
      terms: {
        title: "Termini e condizioni",
        sections: {
          scope: {
            title: "1. Ambito di applicazione",
            content: "Questi Termini e Condizioni si applicano a tutti gli ordini e contratti tra Memora Moments e i nostri clienti."
          },
          contract: {
            title: "2. Formazione del contratto",
            content: "Il contratto si forma attraverso il vostro ordine e la nostra conferma. Ci riserviamo il diritto di rifiutare ordini in caso di ostacoli tecnici o legali."
          },
          prices: {
            title: "3. Prezzi e condizioni di pagamento",
            content: "Tutti i prezzi includono l'IVA applicabile. Il pagamento è dovuto prima della produzione. Accettiamo i comuni metodi di pagamento."
          },
          delivery: {
            title: "4. Consegna e tempo di produzione",
            content: "I nostri prodotti personalizzati sono fabbricati individualmente. Il tempo di produzione è tipicamente di 7-14 giorni lavorativi dopo il pagamento e l'approvazione finale del design."
          },
          services: {
            title: "5. Diritti d'autore e diritti d'immagine",
            content: "Confermate di avere tutti i diritti necessari sulle immagini e testi che fornite. Ci sollevate dalle rivendicazioni di terzi riguardo a violazioni di diritti d'autore o della personalità."
          },
          cancellation: {
            title: "6. Diritto di recesso",
            content: "Trattandosi di prodotti personalizzati, il recesso è escluso secondo § 312g para. 2 no. 1 BGB una volta iniziata la produzione."
          },
          warranty: {
            title: "7. Garanzia",
            content: "Garantiamo la qualità dei nostri prodotti. Per difetti, contattateci entro 14 giorni dal ricevimento."
          },
          contact: {
            title: "8. Contatto",
            content: "Per domande su questi Termini e Condizioni, contattateci a:\nE-Mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
          }
        }
      },
      imprint: {
        title: "Colophon",
        sections: {
          info: {
            title: "Informazioni secondo § 5 TMG",
            content: "Memora Moments\nProdotti di memoria personalizzati"
          },
          contact: {
            title: "Contatto",
            content: "E-Mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsabile per il contenuto secondo § 55 para. 2 RStV",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Esclusione di responsabilità",
            content: {
              title: "Responsabilità per il contenuto",
              content: "Come fornitore di servizi, siamo responsabili del nostro contenuto su queste pagine secondo la legge generale secondo § 7 para. 1 TMG. Tuttavia, secondo §§ 8 a 10 TMG, non siamo obbligati a monitorare le informazioni di terzi trasmesse o archiviate o a indagare su circostanze che indicano attività illegali."
            },
            links: {
              title: "Responsabilità per i collegamenti",
              content: "Il nostro sito contiene collegamenti a siti web esterni di terzi sul cui contenuto non abbiamo alcuna influenza. Pertanto, non possiamo assumere alcuna responsabilità per questo contenuto esterno. Il rispettivo fornitore o operatore delle pagine collegate è sempre responsabile del loro contenuto."
            },
            copyright: {
              title: "Diritto d'autore",
              content: "Il contenuto e i lavori creati dagli operatori del sito su queste pagine sono soggetti al diritto d'autore tedesco. La riproduzione, l'editing, la distribuzione e qualsiasi tipo di sfruttamento al di fuori dei limiti del diritto d'autore richiedono il consenso scritto del rispettivo autore o creatore."
            }
          }
        }
      }
    }
  },

  // --- HUMAN MODE ---
  human: {
    hero: {
      title: 'Ricordi che vivono — con cuore e suono.',
      subtitle: 'Memora Moments trasforma i ricordi in un omaggio discreto con immagini e musica.',
      startButton: 'Inizia ora',
      learnButton: 'Scopri di più'
    },
    features: {
      title: 'Momenti indimenticabili per l\'eternità',
      subtitle: 'Le nostre piastre NFC uniscono tecnologia e dignità.',
      unique: { title: 'Omaggio unico', desc: 'Conserva i ricordi speciali con Memora Moments.' },
      multimedia: { title: 'Ricordi multimediali', desc: 'Foto e video che raccontano una vita.' },
      music: { title: 'Aggiungi una canzone', desc: 'Arricchisci il momento con musica significativa.' },
      quality: { title: 'Design elegante', desc: 'Materiali di qualità, resistenti agli agenti atmosferici.' }
    },
    howitworks: {
      title: 'Come funziona',
      subtitle: 'Crea il tuo omaggio in pochi passi.',
      step1: { title: 'Carica i media', desc: 'Seleziona foto e video.' },
      step2: { title: 'Scegli la musica', desc: 'Aggiungi una canzone significativa.' },
      step3: { title: 'Ricevi la piastra NFC', desc: 'Il tuo omaggio arriva a casa.' }
    },
    products: {
      title: 'I nostri prodotti',
      subtitle: 'La linea classica Memora.',
      basic: { title: 'Memora Tag', desc: 'Piastra NFC minimale per ricordi digitali.', price: 'da 60 CHF' },
      premium: { title: 'Memora Frame', desc: 'Cornice con NFC integrato.', price: 'da 120 CHF' },
      deluxe: { title: 'Memora Deluxe', desc: 'Piastra in vetro esclusiva con incisione e funzioni avanzate.', price: 'da 200 CHF' },
      features: {
        glass: 'Piastra NFC 6×6 cm',
        nfc: 'Design elegante',
        format: 'Resistente agli agenti atmosferici',
        weather: 'Per lapidi, urne, luoghi di memoria',
        all: 'Cornice con NFC',
        photo: 'Foto personale',
        engraving: 'Incisione opzionale',
        premium: 'Ideale per la casa'
      }
    },
    cta: {
      title: 'Inizia il tuo percorso di memoria',
      subtitle: 'Crea il tuo omaggio e conserva ciò che conta.',
      create: 'Crea tributo',
      contact: 'Contattaci'
    },
    gedenken: {
      title: 'Crea tributo - Memora Moments',
      heading: 'Crea il tuo tributo',
      description: 'Carica i tuoi ricordi — creiamo un omaggio dignitoso.'
    }
  },

  // --- PET MODE ---
  pet: {
    hero: {
      title: 'Per i nostri fedeli compagni — ricordi con cuore e suono.',
      subtitle: 'Memora Moments per animali — conserva i momenti più belli insieme.',
      startButton: 'Inizia ora',
      learnButton: 'Scopri di più'
    },
    features: {
      title: 'Momenti indimenticabili con il tuo compagno',
      subtitle: 'Omaggi digitali per animali.',
      unique: { title: 'Ricordo affettuoso', desc: 'Celebra il legame con il tuo animale.' },
      multimedia: { title: 'Ricordi per animali', desc: 'Foto e video del tuo amico.' },
      music: { title: 'Suoni preferiti', desc: 'Aggiungi suoni familiari o musica.' },
      quality: { title: 'Resistente', desc: 'Robusto per interno ed esterno.' }
    },
    howitworks: {
      title: 'Come funziona',
      subtitle: 'Tre passi per l\'omaggio.',
      step1: { title: 'Carica i media', desc: 'Scegli foto e video.' },
      step2: { title: 'Aggiungi suoni/musica', desc: 'Inserisci audio significativo.' },
      step3: { title: 'Ricevi la piastra NFC', desc: 'La piastra viene consegnata.' }
    },
    products: {
      title: 'Prodotti per animali',
      subtitle: 'Ricordi per compagni fedeli.',
      basic: { title: 'Pet Memora Tag', desc: 'Piastra NFC semplice per animali.', price: 'da 55 CHF' },
      premium: { title: 'Pet Memora Frame', desc: 'Cornice con NFC per animali.', price: 'da 110 CHF' },
      deluxe: { title: 'Pet Memora Deluxe', desc: 'Versione Deluxe con incisione e opzioni media estese.', price: 'da 180 CHF' },
      features: {
        glass: 'Piastra NFC 6×6 cm, resistente',
        nfc: 'Design affettuoso',
        format: 'Formati adatti agli animali',
        weather: 'Per interno ed esterno',
        all: 'Cornice con NFC',
        photo: 'Foto in cornice',
        engraving: 'Incisione zampa/nome opzionale',
        premium: 'Ideale per la casa'
      }
    },
    cta: {
      title: 'Onora il tuo compagno',
      subtitle: 'Crea un ricordo affettuoso.',
      create: 'Crea tributo per animali',
      contact: 'Consulenza animali'
    },
    gedenken: {
      title: 'Crea tributo per animali - Memora Moments',
      heading: 'Crea il tributo del tuo animale',
      description: 'Carica i ricordi del tuo compagno.'
    }
  },

  // --- SURPRISE MODE ---
  surprise: {
    hero: {
      title: 'Momenti di sorpresa che toccano.',
      subtitle: 'La collezione Surprise unisce design ed esperienza curata.',
      startButton: 'Avvia Surprise',
      learnButton: 'Scopri di più'
    },
    features: {
      title: 'Quel tocco speciale',
      subtitle: 'Curato, sobrio e un po\' magico.',
      unique: { title: 'Esperienza curata', desc: 'Ogni piastra Surprise racconta una piccola storia.' },
      multimedia: { title: 'Immagine • Video • Suono', desc: 'Tutti i media su un\'unica piastra.' },
      music: { title: 'Suono signature', desc: 'Un layer sonoro di buon gusto.' },
      quality: { title: 'Materiali premium', desc: 'Duraturi, resistenti ed eleganti.' }
    },
    howitworks: {
      title: 'Come funziona Surprise',
      subtitle: 'Tre passi al momento.',
      step1: { title: 'Scegli i contenuti', desc: 'Foto, clip e musica.' },
      step2: { title: 'Imposta la scena', desc: 'Creiamo una sequenza elegante.' },
      step3: { title: 'Ricevi Surprise', desc: 'Tocca e vivi l\'esperienza.' }
    },
    products: {
      title: 'Prodotti Surprise',
      subtitle: 'Scegli il tuo stile.',
      basic: { title: 'Surprise Tag', desc: 'Piastra NFC minimale per momenti sorpresa.', price: 'da 70 CHF' },
      premium: { title: 'Surprise Frame', desc: 'Cornice elegante con esperienza integrata.', price: 'da 140 CHF' },
      deluxe: { title: 'Surprise Deluxe', desc: 'Versione esclusiva con opzioni estese.', price: 'da 220 CHF' },
      features: {
        glass: 'Finitura robusta',
        nfc: 'Tag NFC integrato',
        format: 'Ottimizzata per multimedia',
        weather: 'Resistente agli agenti atmosferici',
        all: 'Cornice con NFC nascosto',
        photo: 'Foto opzionale',
        engraving: 'Incisione opzionale',
        premium: 'Materiali raffinati'
      }
    },
    cta: {
      title: 'Pronto per sorprendere?',
      subtitle: 'Regala momenti unici che durano.',
      create: 'Crea Surprise',
      contact: 'Richiedi consulenza'
    },
    gedenken: {
      title: 'Crea Surprise - Memora Moments',
      heading: 'Il tuo momento Surprise',
      description: 'Carica i contenuti e curiamo l\'esperienza.'
    }
  },
  legal: {
    privacy: {
      title: "Informativa sulla privacy",
      sections: {
        responsible: {
          title: "1. Responsabile",
          content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
        },
        dataCollection: {
          title: "2. Raccolta e utilizzo dei dati",
          content: "Raccogliamo e trattiamo i dati personali solo nella misura necessaria per fornire i nostri servizi. Ciò include:",
          list: [
            "Dati di contatto per l'elaborazione degli ordini",
            "Dati di fatturazione per il pagamento",
            "Immagini e testi caricati da voi per la personalizzazione del prodotto"
          ]
        },
        imageProcessing: {
          title: "3. Elaborazione delle immagini",
          content: "Le immagini che caricate sono utilizzate esclusivamente per creare il vostro prodotto personalizzato. Le vostre immagini sono archiviate in sicurezza e cancellate dopo il completamento dell'ordine o dopo un periodo ragionevole."
        },
        rights: {
          title: "4. I vostri diritti",
          content: "Avete il diritto di accedere, correggere, cancellare e limitare il trattamento dei vostri dati personali. Contattateci a info.memora.moments@gmail.com per richieste sui vostri dati."
        },
        cookies: {
          title: "5. Cookie",
          content: "Il nostro sito web utilizza cookie necessari per la funzionalità. Utilizziamo cookie di tracciamento aggiuntivi solo con il vostro consenso."
        }
      }
    },
    terms: {
      title: "Termini e condizioni",
      sections: {
        scope: {
          title: "1. Ambito di applicazione",
          content: "Questi Termini e Condizioni si applicano a tutti gli ordini e contratti tra Memora Moments e i nostri clienti."
        },
        contract: {
          title: "2. Formazione del contratto",
          content: "Il contratto si forma attraverso il vostro ordine e la nostra conferma. Ci riserviamo il diritto di rifiutare ordini in caso di ostacoli tecnici o legali."
        },
        prices: {
          title: "3. Prezzi e condizioni di pagamento",
          content: "Tutti i prezzi includono l'IVA applicabile. Il pagamento è dovuto prima della produzione. Accettiamo i comuni metodi di pagamento."
        },
        delivery: {
          title: "4. Consegna e tempo di produzione",
          content: "I nostri prodotti personalizzati sono fabbricati individualmente. Il tempo di produzione è tipicamente di 7-14 giorni lavorativi dopo il pagamento e l'approvazione finale del design."
        },
        rights: {
          title: "5. Diritti d'autore e diritti d'immagine",
          content: "Confermate di avere tutti i diritti necessari sulle immagini e testi che fornite. Ci sollevate dalle rivendicazioni di terzi riguardo a violazioni di diritti d'autore o della personalità."
        },
        cancellation: {
          title: "6. Diritto di recesso",
          content: "Trattandosi di prodotti personalizzati, il recesso è escluso secondo § 312g para. 2 no. 1 BGB una volta iniziata la produzione."
        },
        warranty: {
          title: "7. Garanzia",
          content: "Garantiamo la qualità dei nostri prodotti. Per difetti, contattateci entro 14 giorni dal ricevimento."
        },
        contact: {
          title: "8. Contatto",
          content: "Per domande su questi Termini e Condizioni, contattateci a:\nE-Mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
        }
      }
    },
    imprint: {
      title: "Colophon",
      sections: {
        info: {
          title: "Informazioni secondo § 5 TMG",
          content: "Memora Moments\nProdotti di memoria personalizzati"
        },
        contact: {
          title: "Contatto",
          content: "E-Mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
        },
        responsible: {
          title: "Responsabile per il contenuto secondo § 55 para. 2 RStV",
          content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
        },
        disclaimer: {
          title: "Esclusione di responsabilità",
          content: {
            title: "Responsabilità per il contenuto",
            content: "Come fornitore di servizi, siamo responsabili del nostro contenuto su queste pagine secondo la legge generale secondo § 7 para. 1 TMG. Tuttavia, secondo §§ 8 a 10 TMG, non siamo obbligati a monitorare le informazioni di terzi trasmesse o archiviate o a indagare su circostanze che indicano attività illegali."
          },
          links: {
            title: "Responsabilità per i collegamenti",
            content: "Il nostro sito contiene collegamenti a siti web esterni di terzi sul cui contenuto non abbiamo alcuna influenza. Pertanto, non possiamo assumere alcuna responsabilità per questo contenuto esterno. Il rispettivo fornitore o operatore delle pagine collegate è sempre responsabile del loro contenuto."
          },
          copyright: {
            title: "Diritto d'autore",
            content: "Il contenuto e i lavori creati dagli operatori del sito su queste pagine sono soggetti al diritto d'autore tedesco. La riproduzione, l'editing, la distribuzione e qualsiasi tipo di sfruttamento al di fuori dei limiti del diritto d'autore richiedono il consenso scritto del rispettivo autore o creatore."
          }
        }
      }
    }
  }
};