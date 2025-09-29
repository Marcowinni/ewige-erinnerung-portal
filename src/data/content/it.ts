import { ContentData } from './types';

export const itContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Crea Memoriale",
      about: "Chi Siamo",
      contact: "Contatto",
      start: "Inizia Memoriale",
      mode: { human: "Persona", pet: "Animali", surprise: "Sorpresa" }
    },

    albumPage: {
      title: (name) => `Ricordi di ${name}`,
      subtitle: "Una raccolta di momenti indimenticabili.",
      defaultName: "questi momenti speciali",
      playButton: "Riproduci musica",
      pauseButton: "Metti in pausa la musica",
      playButtonHint: "Controlla la musica qui",
      openInNewTab: "Apri a schermo intero"
    },

    // SEO/Meta per la pagina Chi Siamo
    about: {
      title: "Chi Siamo - Memora Moments",
      heading: "Chi è Memora Moments",
      description: "Scopri di più sulla nostra missione di creare ricordi dignitosi."
    },

    // Pagina Contatto (completa, senza fallback)
    contact: {
      title: "Contatto - Memora Moments",
      heading: "Mettiti in contatto",
      description: "Hai domande? Siamo qui per aiutarti.",
      email: "E-Mail",
      phone: "Telefono",
      form: {
        title: "Invia un messaggio",
        submit: "Invia",
        success: "Grazie! Ti ricontatteremo il prima possibile.",
        name: {
          label: "Nome",
          placeholder: "Nome e cognome"
        },
        email: {
          label: "E-Mail",
          placeholder: "tuo@example.com"
        },
        subject: {
          label: "Oggetto",
          placeholder: "Di cosa si tratta?"
        },
        message: {
          label: "Messaggio",
          placeholder: "Il tuo messaggio per noi…"
        }
      }
    },

    // Contenuto della pagina Chi Siamo
    aboutPage: {
      title: "Chi Siamo",
      lead: "Connettiamo i ricordi con la tecnologia – empatici, personali, accessibili.",
      story: {
        title: "La Nostra Storia",
        p1: "Memora Moments è nata dal desiderio di preservare i ricordi con dignità.",
        p2: "A volte sono i momenti più silenziosi a cambiare la nostra vita per sempre. Tutti noi abbiamo perso persone o compagni fedeli particolarmente cari – che si tratti di un familiare amato o di un animale che ha lasciato un segno nei nostri cuori.",
        p3: "In questi momenti di dolore, desideriamo vicinanza, un luogo dove i ricordi non svaniscano ma vivano. L’idea di Memora Moments nasce proprio da questa esperienza.",
        p4: "Questo progetto è nato dall’amore per i nostri confidenti più cari e dal desiderio di conservare le loro storie e unicità. Un piccolo dono, inizialmente pensato solo per i nostri cari, ci ha mostrato quanto possa essere prezioso mantenere i ricordi tangibili e vivi – attraverso immagini, video e musica che possono riportare un sorriso.",
        p5: "Oggi vogliamo condividere questa possibilità con gli altri. Con i nostri prodotti creiamo ponti tra passato e presente – dignitosi, personali e vicini al cuore. Crediamo che i ricordi non debbano finire con l’addio. Possono continuare a brillare, consolarci e darci forza."
      },
      values: {
        title: "I Nostri Valori",
        compassion: {
          title: "Compassione",
          desc: "Lavoriamo con rispetto ed empatia – per persone in situazioni di vita particolari."
        },
        personality: {
          title: "Personalità",
          desc: "Ogni memoriale è individuale – progettiamo quanto necessario, e il minimo indispensabile."
        },
        connection: {
          title: "Connessione",
          desc: "Immagini, video e suoni creano vicinanza – in qualsiasi momento, sul luogo del memoriale o a casa."
        }
      },
      product: {
        title: "Perché Memora?",
        p1: "Perché i ricordi sono più che semplici pensieri – meritano un luogo dignitoso.",
        p2: "I nostri prodotti Memora combinano tecnologia ed emozione – semplici, belli, sostenibili."
      }
    },

    // Testi legali (per Privacy/Termini/Impressum)
    legal: {
      privacy: {
        title: "Informativa sulla Privacy",
        sections: {
          responsible: {
            title: "1. Titolare del trattamento",
            content:
              "Memora Moments\nBreitenmattstrasse\n8635 Dürnten\nE-Mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99\n\nSiamo responsabili della raccolta, elaborazione e utilizzo dei tuoi dati personali secondo la Legge Svizzera sulla Protezione dei Dati (revDSG)."
          },
          dataCollection: {
            title: "2. Raccolta ed elaborazione dei dati personali",
            content:
              "Trattiamo i dati personali che ci fornisci durante l’uso dei nostri servizi o che sorgono durante l’utilizzo. Ciò include in particolare:",
            list: [
              "Dati di contatto (nome, indirizzo, e-mail, numero di telefono)",
              "Informazioni di pagamento (a seconda del metodo scelto, ad es. carta di credito, TWINT, pagamento anticipato)",
              "Dati di contenuto (foto, video, testi, musica/audio) che fornisci per i video commemorativi personalizzati e le Memora",
              "Dati di utilizzo (ad es. orario di accesso al video tramite Memora, metadati tecnici come browser/dispositivo)"
            ]
          },
          purpose: {
            title: "3. Finalità del trattamento",
            content:
              "I tuoi dati vengono utilizzati esclusivamente per le seguenti finalità:",
            list: [
              "Elaborazione degli ordini e adempimento dei contratti",
              "Creazione, modifica e fornitura di video commemorativi nonché configurazione di tag NFC",
              "Elaborazione dei pagamenti e fatturazione",
              "Comunicazione con te (ad es. conferma ordine, richieste, supporto)",
              "Gestione, sicurezza e miglioramento dei nostri servizi"
            ]
          },
          disclosure: {
            title: "4. Comunicazione a terzi",
            content:
              "Non vendiamo i tuoi dati né li cediamo a terzi per scopi pubblicitari. La comunicazione avviene esclusivamente nella misura necessaria per le finalità sopra indicate, a responsabili accuratamente selezionati:",
            list: [
              "Fornitori di pagamento (ad es. Stripe, TWINT, istituti di carte di credito) per l’elaborazione dei pagamenti",
              "Fornitori di servizi IT, cloud e hosting (ad es. per la gestione del sito, l’archiviazione dei dati, la creazione/consegna dei video)",
              "Fornitori di servizi e-mail/comunicazione (ad es. per l’invio di e-mail di sistema e di servizio)",
              "Partner di logistica/consegna per la spedizione di prodotti fisici"
            ]
          },
          storage: {
            title: "5. Conservazione e cancellazione dei dati",
            content:
              "I contenuti personalizzati (foto, video, audio, testi) vengono conservati solo per il tempo necessario all’adempimento del contratto e alla fornitura del servizio. I dati dei clienti vengono conservati secondo gli obblighi legali di conservazione. Su tua richiesta, valuteremo una cancellazione anticipata, a condizione che non vi siano obblighi legali contrari."
          },
          security: {
            title: "6. Sicurezza dei dati",
            content:
              "Utilizziamo misure tecniche e organizzative adeguate per proteggere i tuoi dati da perdita, manipolazione e accessi non autorizzati. Si prega di notare che la trasmissione dei dati tramite Internet (ad es. e-mail) può presentare lacune di sicurezza."
          },
          rights: {
            title: "7. Diritti dell’interessato",
            content:
              "Ai sensi della legge sulla protezione dei dati applicabile, hai in particolare i seguenti diritti. Per esercitare i tuoi diritti, contattaci all’indirizzo sopra indicato:",
            list: [
              "Informazione: accesso ai dati memorizzati su di te",
              "Rettifica: correzione di dati inesatti o incompleti",
              "Cancellazione: rimozione dei tuoi dati, salvo obblighi di conservazione",
              "Limitazione/Opposizione (ove applicabile): limitazione di determinati trattamenti",
              "Portabilità dei dati: fornitura dei tuoi dati in formato elettronico comune"
            ]
          },
          cookies: {
            title: "8. Cookie e tracciamento",
            content:
              "Il nostro sito utilizza cookie necessari per fornire funzioni di base. Utilizziamo altri cookie (facoltativi) di analisi o marketing solo con il tuo consenso. Puoi impostare nel tuo browser se i cookie vengono accettati, bloccati o cancellati."
          },
          changes: {
            title: "9. Modifiche a questa informativa",
            content:
              "Ci riserviamo il diritto di adattare questa informativa in qualsiasi momento. Si applica la versione attuale pubblicata sul nostro sito."
          }
        }
      },
      terms: {
        title: "Condizioni Generali di Contratto",
        sections: {
          scope: {
            title: "1. Ambito di applicazione",
            content:
              "Le presenti Condizioni Generali (CG) si applicano a tutti gli ordini e contratti tra Memora Moments (di seguito 'noi') e i clienti (di seguito 'tu') in relazione all’acquisto di tag NFC, video commemorativi e contenuti digitali correlati."
          },
          contract: {
            title: "2. Conclusione del contratto",
            content:
              "Il contratto si conclude non appena confermiamo espressamente il tuo ordine tramite e-mail. Possiamo rifiutare ordini per motivi tecnici o legali."
          },
          services: {
            title: "3. Servizi",
            content:
              "I nostri servizi comprendono: produzione e consegna di tag NFC (prodotti fisici); creazione e fornitura di video commemorativi personalizzati (contenuti digitali); accesso ad altri contenuti digitali correlati al prodotto."
          },
          prices: {
            title: "4. Prezzi e condizioni di pagamento",
            content:
              "Tutti i prezzi sono in Franchi Svizzeri (CHF) inclusa IVA ove applicabile. Metodi di pagamento accettati: carta di credito, TWINT, pagamento anticipato. Il pagamento è dovuto prima della consegna o della creazione del contenuto digitale."
          },
          delivery: {
            title: "5. Consegna e tempi di consegna",
            content:
              "La consegna dei prodotti avviene di solito entro 30 giorni dalla conclusione del contratto. Per i prodotti personalizzati possono verificarsi ritardi; in tal caso ti informeremo immediatamente."
          },
          cancellation: {
            title: "6. Diritto di recesso e annullamento",
            content:
              "Non esiste diritto di reso per prodotti personalizzati e contenuti digitali (ad es. video commemorativi individuali). Le disposizioni di legge si applicano ai prodotti non personalizzati."
          },
          warranty: {
            title: "7. Garanzia",
            content:
              "Garantiamo la qualità contrattuale dei nostri prodotti. Ti preghiamo di segnalarci eventuali difetti entro 14 giorni dal ricevimento affinché possiamo valutare una soluzione appropriata (riparazione, sostituzione o rimborso)."
          },
          liability: {
            title: "7a. Responsabilità",
            content:
              "La nostra responsabilità è limitata ai danni causati da comportamento doloso o colpa grave. Non ci assumiamo responsabilità per problemi tecnici lato cliente (ad es. connessione Internet insufficiente, dispositivi incompatibili, impostazioni software)."
          },
          ip: {
            title: "8. Copyright e diritti d’uso",
            content:
              "I contenuti creati da noi (ad es. video commemorativi) sono soggetti a copyright. Ricevi un diritto d’uso semplice e non trasferibile per uso privato. L’uso commerciale o la cessione a terzi non è consentita salvo diverso accordo scritto. Caricando foto, video, audio o testi, confermi di avere i diritti necessari; ci esoneri da eventuali rivendicazioni di terzi."
          },
          privacy: {
            title: "9. Protezione dei dati",
            content:
              "Trattiamo i dati personali esclusivamente in conformità con la nostra informativa sulla privacy. Ciò include la conservazione e il trattamento dei tuoi dati per l’adempimento del contratto nonché la comunicazione a terzi necessari (ad es. fornitori di pagamento, hosting/IT, spedizione). Utilizzando i nostri servizi acconsenti a tale trattamento."
          },
          special: {
            title: "10. Prodotti emozionali & Note speciali",
            content:
              "I nostri prodotti hanno un alto valore emozionale. I contenuti personalizzati non possono essere modificati o restituiti dopo il completamento. In caso di problemi tecnici da parte nostra (ad es. guasto del server), ci impegneremo a ripristinare l’accesso il più rapidamente possibile; non possiamo garantire la disponibilità permanente lato cliente."
          },
          law: {
            title: "11. Foro competente e legge applicabile",
            content:
              "Si applica esclusivamente la legge svizzera. Il foro competente è la sede legale di Memora Moments."
          },
          final: {
            title: "12. Disposizioni finali",
            content:
              "Se singole disposizioni di queste CG fossero inefficaci, la validità delle restanti non sarà compromessa. Ci riserviamo il diritto di adattare queste CG in qualsiasi momento. Si applica la versione attuale pubblicata con data e numero di versione."
          },
        }
      },
      imprint: {
        title: "Note legali",
        sections: {
          info: {
            title: "Memora Moments",
            content: "Prodotti commemorativi personalizzati"
          },
          contact: {
            title: "Contatto",
            content:
              "E-mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsabilità",
            content: "Memora Moments\nE-mail: info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Esclusione di responsabilità",
            content: {
              title: "Responsabilità per i contenuti",
              content:
                "I contenuti del nostro sito web sono stati redatti con la massima cura. Tuttavia, non possiamo garantire la correttezza, completezza o attualità delle informazioni. Ci riserviamo il diritto di modificare, integrare o rimuovere i contenuti in qualsiasi momento."
            },
            links: {
              title: "Responsabilità per i link",
              content:
                "Il nostro sito contiene collegamenti a siti web esterni di terzi, sui cui contenuti non abbiamo alcuna influenza. Pertanto, non possiamo assumerci alcuna responsabilità per tali contenuti esterni. Il responsabile dei contenuti delle pagine collegate è sempre il rispettivo fornitore o gestore."
            },
            copyright: {
              title: "Diritto d’autore",
              content:
                "I contenuti e le opere presenti su questo sito sono soggetti al diritto d’autore svizzero. Qualsiasi riproduzione, modifica, distribuzione o altra forma di utilizzo al di fuori dei limiti previsti dalla legge sul diritto d’autore richiede il previo consenso scritto dell’autore o del titolare dei diritti. I download e le copie di questo sito sono consentiti solo per uso privato."
            }
          }
        }
      }

    },

    footer: {
      brand: {
        name: "Memora Moments",
        description:
          "Momenti commemorativi digitali – dignitosi, resistenti alle intemperie e facili da condividere."
      },
      contactTitle: "Contatto",
      linksTitle: "Link",
      legal: {
        privacy: "Privacy",
        terms: "Condizioni",
        imprint: "Impressum"
      },
      copyright: "Tutti i diritti riservati."
    }
  },
  
    human: {
    hero: {
      title: "Ricordi che continuano a vivere – con cuore e suono.",
      subtitle:
        "I momenti diventano un memoriale silenzioso – Memora Moments apre la porta a storie che restano. Immagini, video e musica mantengono vivo il ricordo, proprio dove deve stare: vicino al cuore.",
      startButton: "Come funziona",
      learnButton: "Scopri di più"
    },
    features: {
      title: "Momenti indimenticabili per l’eternità",
      subtitle:
        "I nostri Memora Moments uniscono tecnologia moderna e commemorazione dignitosa.",
      unique: { title: "Memoriale unico", desc: "Rendi onore alla vita di una persona cara con un ricordo duraturo." },
      multimedia: { title: "Ricordi multimediali", desc: "Foto e video riportano in vita momenti speciali." },
      music: { title: "Integra musica di sottofondo", desc: "La musica crea vicinanza e rende vive le emozioni." },
      quality: { title: "Design dignitoso", desc: "Materiali semplici e di alta qualità che si integrano armoniosamente in ogni tomba o casa." }
    },
    howitworks: {
      title: "Come funziona",
      subtitle: "Il tuo Memora personale in pochi passaggi.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica", desc: "Scegli le tue foto e i tuoi video preferiti o anche messaggi vocali e aggiungi una musica di sottofondo adatta." },
      step3: { title: "Ricevi il tuo Memora", desc: "Il tuo Memora verrà consegnato a casa tua." }
    },
    products: {
      title: "I nostri Memora:",
      subtitle: "I classici prodotti Memora.",
      basic: { title: "Memora Tag", desc: "Una semplice Smart-Tag che dà vita ai ricordi tramite un album fotografico digitale – discreto e senza tempo.", price: "49 CHF" },
      premium: { title: "Memora Frame", desc: "Una cornice classica unita alla tecnologia moderna. Ogni foto diventa una porta verso ricordi commoventi.", price: "79 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Un’opera di alta qualità che mantiene vivo il passato e tocca il futuro.", price: "129 CHF" },
      features: {
        tag1: "Smart-Tag 6×6 cm o ⌀ 3 cm",
        tag2: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        tag3: "Design minimalista e senza tempo, si integra armoniosamente",
        tag4: "Per lapidi, urne, luoghi commemorativi",
        premium1: "Smart-Tag ⌀ 3 cm – collega foto e memoriale digitale",
        premium2: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        premium3: "Design personale con la tua foto",
        premium4: "Ideale per casa, angoli commemorativi o come regalo",
        deluxe1: "Piastra in plexiglass 12×12 cm di alta qualità con finitura elegante",
        deluxe2: "Design individuale con la tua foto e il tuo testo",
        deluxe3: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        deluxe4: "Presentazione con supporto raffinato"
      }
    },
    cta: {
      title: "Onora i tuoi cari",
      subtitle: "Crea il tuo memoriale e conserva i ricordi.",
      create: "Crea Memoriale",
      contact: "Contattaci"
    },
    gedenken: {
      title: "Crea Memoriale - Memora Moments",
      heading: "Crea il tuo memoriale!",
      description: "Carica i ricordi e noi creeremo un memoriale dignitoso."
    },
    // Override dell'Uploader
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Seleziona il prodotto:" },
        step1Subtitle: "Scegli il prodotto – caricherai i contenuti nel passaggio successivo.",
        step2ByMode: { human: "Informazioni sulla persona" },
        step2Subtitle: "Compila i seguenti campi. Le note sono facoltative.",
        step3Title: "Carica foto e video",
        step3Subtitle: "I file vengono salvati nel modulo e inviati in seguito.",
        step4Title: "Dati di contatto",
        step4Subtitle: "Utilizziamo questi dati per domande e conferme d’ordine.",
        step5Title: "Dati di fatturazione & riepilogo",
        step5Subtitle: "Controlla l’indirizzo e il riepilogo. Con 'Procedi al pagamento!' andrai poi alla cassa.",
        summary: "Riepilogo"
      },

      buttons: {
        back: "Indietro",
        next: "Avanti",
        reset: "Reimposta",
        toPay: "Procedi al pagamento",
        addText: "Aggiungi testo",
        applyDesign: "Applica design",
        remove: "Rimuovi",
      },
      products: {
        formatTitle: "Formato",
        frameTitle: "Design Frame",
        formatTitleDeluxe: "Design Deluxe",
        roundLabel: "Rotondo · Ø 3 cm",
        squareLabel: "Quadrato · 6×6 cm",
        petOptionsTitle: "Opzioni per Memora Tag Animali",
        frameTip:"Suggerimento: muovi l’immagine con mouse/touch e aggiungi/posiziona liberamente i testi.",
        frameOrientationLabel: "Orientamento",
        framePortrait: "Verticale",
        frameLandscape: "Orizzontale",
      },
      editor: {
        image: "Immagine",
        zoom: "Zoom",
        posX: "Posizione orizzontale",
        posY: "Posizione verticale",
        emptyTitle: "Nessuna immagine selezionata",
        emptySub: "Seleziona un’immagine qui sopra",
        selectedText: "Testo selezionato",
        content: "Contenuto",
        font: "Carattere",
        size: "Dimensione",
        color: "Colore",
        previewLabel: "Anteprima adottata",
        previewNote: "Questa anteprima verrà salvata con l’ordine."
      },
      step2Fields: {
        human_lastName: "Cognome *",
        human_firstName: "Nome *",
        human_deathDate: "Data del decesso",
        notes_human: "Note (facoltativo)",
        human_notesPH: "Desideri speciali, citazioni, appunti sulla musica…",
      },
      step3Fields: {
        imagesLabel: "Immagini (possibili multiple)",
        videosLabel: "Video (possibili multiple)",
        remove: "Rimuovi",
        imageCaptionPlaceholder: "Breve testo per l’immagine (facoltativo)",
        videoCaptionPlaceholder: "Breve testo per il video (facoltativo)",
        // Selezione Musica
        musicSelection: {
          title: "Seleziona musica",
          availableMusic: "Musica disponibile",
          selected: "Selezionata",
          select: "Seleziona",
          moreMusic: "Altra musica da Pixabay",
          pixabayPlaceholder: "Incolla link da pixabay.com/music/...",
          pixabayButton: "Musica Pixabay",
        },
      },
      contactFields: {
        firstName: "Nome *",
        lastName: "Cognome *",
        email: "E-Mail *",
        phoneOpt: "Telefono (facoltativo)"
      },
      invoiceFields: {
        sameAsContact: "Indirizzo di fatturazione uguale a quello di contatto",
        companyOpt: "Azienda (facoltativo)",
        firstName: "Nome *",
        lastName: "Cognome *",
        street: "Via e n. *",
        zip: "CAP *",
        city: "Città *",
        country: "Paese *"
      },
      summary: {
        mode: "Modalità",
        product: "Prodotto",
        format: "Formato",
        formatRound: "Rotondo Ø 3 cm",
        formatSquare: "Quadrato 6×6 cm",
        options: "Opzioni",
        person: "Persona",
        pet: "Animale",
        recipient: "Destinatario",
        notes: "Note",
        counts: (imgs, vids) => `Immagini: ${imgs} • Video: ${vids}`,
        previewTitle: "Anteprima personalizzata",
        total: "Totale: ",
        optionOrientation: "Orientamento",
        optionPortrait: "Verticale",
        optionLandscape: "Orizzontale",
        modeHuman: "Persona",
        modePet: "Animali",
        modeSurprise: "Sorpresa",
      },
      privacyNotice: {
        text: "Caricando immagini, accetti la nostra",
        privacyLink: "Informativa sulla privacy",
        and: "e",
        termsLink: "Termini d’uso",
        agreed: ".",
      },
    }
  },

  pet: {
    hero: {
      title: "Per i nostri compagni fedeli – ricordi con cuore e suono.",
      subtitle:
        "I nostri animali ci donano amore, lealtà e gioia. Con Memora Moments, il loro ricordo resta vivo – nel cuore e in luoghi speciali.",
      startButton: "Come funziona",
      learnButton: "Scopri di più"
    },
    features: {
      title: "Momenti indimenticabili con il tuo amico",
      subtitle: "Ricordi digitali per animali.",
      unique: { title: "Ricordo affettuoso", desc: "Momenti speciali con il tuo animale." },
      multimedia: { title: "Esperienze multimediali", desc: "Foto e video del tuo amico a quattro zampe." },
      music: { title: "Suoni preferiti", desc: "Il latrato, il miagolio o una canzone che vi unisce." },
      quality: { title: "Design dignitoso", desc: "Materiali semplici e di qualità che si integrano in ogni casa, dentro o fuori." }
    },
    howitworks: {
      title: "Come funziona",
      subtitle: "Verso il tuo Memora in tre passaggi.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica o suoni", desc: "Scegli foto e video preferiti o anche messaggi vocali e aggiungi musica di sottofondo adatta." },
      step3: { title: "Ricevi il tuo Memora", desc: "Il tuo Memora verrà consegnato." }
    },
    products: {
      title: "Prodotti per animali",
      subtitle: "Ricordi per compagni fedeli.",
      basic: { title: "Memora Pet Tag", desc: "Una semplice Smart-Tag che dà vita ai ricordi del tuo animale con un album fotografico digitale", price: "da 49 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Una cornice elegante che collega la tua foto preferita a un album fotografico digitale – ideale per casa.", price: "79 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Una piastra in plexiglass esclusiva con supporto – per un ricordo duraturo e dignitoso.", price: "129 CHF" },
      features: {
        tag1: "Smart-Tag 6×6 cm o ⌀ 2.5 cm",
        tag2: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        tag3: "Design minimalista e senza tempo, si integra armoniosamente",
        tag4: "Opzione: standard semplice, personalizzato o come portachiavi",
        premium1: "Smart-Tag ⌀ 3 cm – collega foto & memoriale digitale",
        premium2: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        premium3: "Design personale con la tua foto",
        premium4: "Ideale per casa o come regalo",
        deluxe1: "Piastra in plexiglass 12×12 cm di alta qualità con finitura elegante",
        deluxe2: "Design individuale con la tua foto e il tuo testo",
        deluxe3: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        deluxe4: "Presentazione con supporto raffinato"
      }
    },
    cta: {
      title: "Onora il tuo amico",
      subtitle: "Una casa nel cuore – conserva il ricordo del tuo compagno fedele.",
      create: "Crea ricordo",
      contact: "Contattaci"
    },
    gedenken: {
      title: "Crea memoriale per animali - Memora Moments",
      heading: "Memoriale per il tuo animale",
      description: "Carica i ricordi del tuo amico."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Seleziona il prodotto:", pet: "Seleziona il prodotto:", surprise: "Seleziona il prodotto (Sorpresa)" },
        step1Subtitle: "Scegli il prodotto – caricherai i contenuti nel passaggio successivo.",
        step2ByMode: { human: "Informazioni sulla persona", pet: "Informazioni sull’animale", surprise: "Informazioni per Sorpresa" },
        step2Subtitle: "Compila i campi seguenti. Le note sono facoltative.",
        step3Title: "Carica foto e video",
        step3Subtitle: "I file vengono salvati nel modulo e inviati in seguito.",
        step4Title: "Dati di contatto",
        step4Subtitle: "Utilizziamo questi dati per domande e conferme d’ordine.",
        step5Title: "Dati di fatturazione & riepilogo",
        step5Subtitle: "Controlla l’indirizzo e il riepilogo. Con 'Procedi al pagamento!' andrai poi alla cassa.",
        summary: "Riepilogo"
      },
      buttons: {
        back: "Indietro",
        next: "Avanti",
        reset: "Reimposta",
        toPay: "Procedi al pagamento",
        addText: "Aggiungi testo",
        applyDesign: "Applica design",
        remove: "Rimuovi",
      },
      products: {
        formatTitle: "Formato",
        frameTitle: "Design Frame",
        formatTitleDeluxe: "Design Deluxe",
        roundLabel: "Rotondo · Ø 3 cm",
        squareLabel: "Quadrato · 6×6 cm",
        petOptionsTitle: "Opzioni per Memora Tag Animali",
        keychainLabel: "con portachiavi (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Personalizzabile (+10 CHF)",
        designCustomNote: "Nota: il design personalizzato costa +10 CHF addizionali.",
        frameTip:"Suggerimento: muovi l’immagine con mouse/touch e aggiungi/posiziona liberamente i testi.",
        frameOrientationLabel: "Orientamento",
        framePortrait: "Verticale",
        frameLandscape: "Orizzontale",
      },
      editor: {
        image: "Immagine",
        zoom: "Zoom",
        posX: "Posizione orizzontale",
        posY: "Posizione verticale",
        emptyTitle: "Nessuna immagine selezionata",
        emptySub: "Seleziona un’immagine qui sopra",
        selectedText: "Testo selezionato",
        content: "Contenuto",
        font: "Carattere",
        size: "Dimensione",
        color: "Colore",
        previewLabel: "Anteprima adottata",
        previewNote: "Questa anteprima verrà salvata con l’ordine."
      },
      step2Fields: {
        pet_name: "Nome dell’animale *",
        pet_deathDate: "Data del decesso",
        notes_human: "Note aggiuntive",
        pet_notesPH: "Desideri speciali, suoni preferiti, appunti…",
      },
      step3Fields: {
        imagesLabel: "Immagini (possibili multiple)",
        videosLabel: "Video (possibili multiple)",
        remove: "Rimuovi",
        imageCaptionPlaceholder: "Breve testo per l’immagine (facoltativo)",
        videoCaptionPlaceholder: "Breve testo per il video (facoltativo)",
        musicSelection: {
          title: "Seleziona musica",
          availableMusic: "Musica disponibile",
          selected: "Selezionata",
          select: "Seleziona",
          moreMusic: "Altra musica da Pixabay",
          pixabayPlaceholder: "Incolla link da pixabay.com/music/...",
          pixabayButton: "Musica Pixabay",
        },
      },
      contactFields: {
        firstName: "Nome *",
        lastName: "Cognome *",
        email: "E-Mail *",
        phoneOpt: "Telefono (facoltativo)"
      },
      invoiceFields: {
        sameAsContact: "Indirizzo di fatturazione uguale a quello di contatto",
        companyOpt: "Azienda (facoltativo)",
        firstName: "Nome *",
        lastName: "Cognome *",
        street: "Via e n. *",
        zip: "CAP *",
        city: "Città *",
        country: "Paese *"
      },
      summary: {
        mode: "Modalità",
        product: "Prodotto",
        format: "Formato",
        formatRound: "Rotondo Ø 3 cm",
        formatSquare: "Quadrato 6×6 cm",
        options: "Opzioni",
        person: "Persona",
        pet: "Animale",
        recipient: "Destinatario",
        notes: "Note",
        counts: (imgs, vids) => `Immagini: ${imgs} • Video: ${vids}`,
        previewTitle: "Anteprima personalizzata",
        total: "Totale: ",
        optionOrientation: "Orientamento",
        optionPortrait: "Verticale",
        optionLandscape: "Orizzontale",
        modeHuman: "Persona",
        modePet: "Animali",
        modeSurprise: "Sorpresa",
      },
      privacyNotice: {
        text: "Caricando immagini, accetti la nostra",
        privacyLink: "Informativa sulla privacy",
        and: "e",
        termsLink: "Termini d’uso",
        agreed: ".",
      }
    }
  },

  surprise: {
    hero: {
      title: "Un regalo che tocca il cuore – sorprese indimenticabili.",
      subtitle:
        "Che sia per un matrimonio, compleanno o anniversario – con Memora Moments rendi i ricordi tangibili. Foto, video e musica diventano un dono unico che dura.",
      startButton: "Come funziona",
      learnButton: "Scopri di più"
    },
    features: {
      title: "Quel tocco in più",
      subtitle: "Semplice, dignitoso e pieno di significato.",
      unique: { title: "Sorpresa unica", desc: "Ogni Sorpresa racconta una piccola storia." },
      multimedia: { title: "Esperienze multimediali", desc: "Foto, video e musica rendono il tuo regalo vivo ed emozionante." },
      music: { title: "Musica & messaggi", desc: "Aggiungi musica di sottofondo o un messaggio vocale personale." },
      quality: { title: "Design elegante", desc: "Minimalista e di alta qualità – adatto a ogni occasione e celebrazione." }
    },
    howitworks: {
      title: "Come funziona Sorpresa",
      subtitle: "Tre passaggi fino al momento sorpresa.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica", desc: "Scegli foto e video preferiti o anche messaggi vocali e aggiungi musica di sottofondo adatta." },
      step3: { title: "Ricevi la Sorpresa", desc: "Il tuo Memora verrà consegnato direttamente a te." }
    },
    products: {
      title: "Prodotti Sorpresa",
      subtitle: "Scegli il tuo stile.",
      basic: { title: "Memora Surprise Tag", desc: "Una Smart-Tag che collega un album fotografico digitale – originale e unica.", price: "49 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Una cornice elegante che collega la tua foto preferita a un album fotografico digitale – ideale come regalo.", price: "79 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Una piastra in plexiglass esclusiva con tecnologia integrata – il regalo premium elegante per ricordi duraturi.", price: "129 CHF" },
      features: {
        tag1: "Smart-Tag 6×6 cm o ⌀ 3 cm",
        tag2: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        tag3: "Design minimalista e senza tempo, si integra armoniosamente",
        tag4: "Una sorpresa che suscita emozioni e resta nella memoria a lungo",
        premium1: "Smart-Tag ⌀ 3 cm – collega foto & memoriale digitale",
        premium2: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        premium3: "Design personale con la tua foto",
        premium4: "Il regalo perfetto per compleanni, matrimoni o anniversari",
        deluxe1: "Piastra in plexiglass 12×12 cm di alta qualità con finitura elegante",
        deluxe2: "Design individuale con la tua foto e il tuo testo",
        deluxe3: "Sfoglia l’album fotografico digitale personale direttamente con un tap",
        deluxe4: "Presentazione con supporto raffinato"
      }
    },
    cta: {
      title: "Pronto per il tuo momento sorpresa?",
      subtitle: "Sorpresa offre momenti unici.",
      create: "Crea Sorpresa",
      contact: "Contattaci"
    },
    gedenken: {
      title: "Crea Sorpresa - Memora Moments",
      heading: "Il tuo momento sorpresa",
      description: "Carica i contenuti e progetteremo la tua esperienza."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Seleziona il prodotto:", pet: "Seleziona il prodotto:", surprise: "Seleziona il prodotto (Sorpresa)" },
        step1Subtitle: "Scegli il prodotto – caricherai i contenuti nel passaggio successivo.",
        step2ByMode: { human: "Informazioni sulla persona", pet: "Informazioni sull’animale", surprise: "Informazioni per Sorpresa" },
        step2Subtitle: "Compila i campi seguenti. Le note sono facoltative.",
        step3Title: "Carica foto e video",
        step3Subtitle: "I file vengono salvati nel modulo e inviati in seguito.",
        step4Title: "Dati di contatto",
        step4Subtitle: "Utilizziamo questi dati per domande e conferme d’ordine.",
        step5Title: "Dati di fatturazione & riepilogo",
        step5Subtitle: "Controlla l’indirizzo e il riepilogo. Con 'Procedi al pagamento!' andrai poi alla cassa.",
        summary: "Riepilogo"
      },
      buttons: {
        back: "Indietro",
        next: "Avanti",
        reset: "Reimposta",
        toPay: "Procedi al pagamento",
        addText: "Aggiungi testo",
        applyDesign: "Applica design",
        remove: "Rimuovi",
      },
      products: {
        formatTitle: "Formato",
        frameTitle: "Design Frame",
        formatTitleDeluxe: "Design Deluxe",
        roundLabel: "Rotondo · Ø 3 cm",
        squareLabel: "Quadrato · 6×6 cm",
        petOptionsTitle: "Opzioni per Memora Tag Animali",
        frameTip:"Suggerimento: muovi l’immagine con mouse/touch e aggiungi/posiziona liberamente i testi.",
        frameOrientationLabel: "Orientamento",
        framePortrait: "Verticale",
        frameLandscape: "Orizzontale",
      },
      editor: {
        image: "Immagine",
        zoom: "Zoom",
        posX: "Posizione orizzontale",
        posY: "Posizione verticale",
        emptyTitle: "Nessuna immagine selezionata",
        emptySub: "Seleziona un’immagine qui sopra",
        selectedText: "Testo selezionato",
        content: "Contenuto",
        font: "Carattere",
        size: "Dimensione",
        color: "Colore",
        previewLabel: "Anteprima adottata",
        previewNote: "Questa anteprima verrà salvata con l’ordine."
      },
      step2Fields: {
        surprise_name: "Nome (destinatario) *",
        notes_human: "Occasione / Note",
        surprise_notesPH: "Matrimonio, compleanno, anniversario… desideri speciali…"
      },
      step3Fields: {
        imagesLabel: "Immagini (possibili multiple)",
        videosLabel: "Video (possibili multiple)",
        remove: "Rimuovi",
        imageCaptionPlaceholder: "Breve testo per l’immagine (facoltativo)",
        videoCaptionPlaceholder: "Breve testo per il video (facoltativo)",
        musicSelection: {
          title: "Seleziona musica",
          availableMusic: "Musica disponibile",
          selected: "Selezionata",
          select: "Seleziona",
          moreMusic: "Altra musica da Pixabay",
          pixabayPlaceholder: "Incolla link da pixabay.com/music/...",
          pixabayButton: "Musica Pixabay",
        },
      },
      contactFields: {
        firstName: "Nome *",
        lastName: "Cognome *",
        email: "E-Mail *",
        phoneOpt: "Telefono (facoltativo)"
      },
      invoiceFields: {
        sameAsContact: "Indirizzo di fatturazione uguale a quello di contatto",
        companyOpt: "Azienda (facoltativo)",
        firstName: "Nome *",
        lastName: "Cognome *",
        street: "Via e n. *",
        zip: "CAP *",
        city: "Città *",
        country: "Paese *"
      },
      summary: {
        mode: "Modalità",
        product: "Prodotto",
        format: "Formato",
        formatRound: "Rotondo Ø 3 cm",
        formatSquare: "Quadrato 6×6 cm",
        options: "Opzioni",
        person: "Persona",
        pet: "Animale",
        recipient: "Destinatario",
        notes: "Note",
        counts: (imgs, vids) => `Immagini: ${imgs} • Video: ${vids}`,
        previewTitle: "Anteprima personalizzata",
        total: "Totale: ",
        optionOrientation: "Orientamento",
        optionPortrait: "Verticale",
        optionLandscape: "Orizzontale",
        modeHuman: "Persona",
        modePet: "Animali",
        modeSurprise: "Sorpresa",
      },
      privacyNotice: {
        text: "Caricando immagini, accetti la nostra",
        privacyLink: "Informativa sulla privacy",
        and: "e",
        termsLink: "Termini d’uso",
        agreed: ".",
      }
    }
  }

};
