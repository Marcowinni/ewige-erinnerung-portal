import { ContentData } from './types';

export const itContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Crea memoriale",
      about: "Chi siamo",
      contact: "Contatti",
      start: "Inizia memoriale",
      mode: { human: "Persone", pet: "Animali", surprise: "Sorpresa" }
    },

    about: {
      title: "Chi siamo - Memora Moments",
      heading: "Informazioni su Memora Moments",
      description: "Scopri di più sulla nostra missione di creare ricordi dignitosi."
    },

    contact: {
      title: "Contatti - Memora Moments",
      heading: "Contattaci",
      description: "Hai domande? Siamo qui per aiutarti.",
      email: "E-mail",
      phone: "Telefono",
      form: {
        title: "Invia un messaggio",
        submit: "Invia",
        success: "Grazie! Ti risponderemo il prima possibile.",
        name: {
          label: "Nome",
          placeholder: "Nome e cognome"
        },
        email: {
          label: "E-mail",
          placeholder: "tuo@esempio.it"
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

    aboutPage: {
      title: "Chi siamo",
      lead: "Connettiamo i ricordi con la tecnologia – in modo empatico, personale, accessibile.",
      story: {
        title: "La nostra storia",
        p1: "Memora Moments è nato dal desiderio di conservare i ricordi con dignità.",
        p2: "A volte sono i momenti silenziosi a cambiare la nostra vita per sempre. Tutti noi abbiamo perso persone o compagni fedeli che ci erano particolarmente cari, che si trattasse di un amato membro della famiglia o di un animale domestico che ha segnato il nostro cuore.",
        p3: "In questi momenti di lutto, desideriamo la vicinanza, un luogo dove i ricordi non svaniscono ma continuano a vivere. L'idea di Memora Moments è nata proprio da questa esperienza.",
        p4: "Questo progetto è nato dall'amore per i nostri confidenti più stretti e dal desiderio di preservare le loro storie e la loro unicità. Un piccolo regalo, inizialmente destinato solo ai nostri cari, ci ha mostrato quanto possa essere prezioso mantenere i ricordi tangibili e vivi – attraverso immagini, video e musica che possono riportare un sorriso.",
        p5: "Oggi vogliamo condividere questa opportunità con altri. Con i nostri prodotti, creiamo ponti tra passato e presente – dignitosi, personali e vicini al cuore. Crediamo che i ricordi non debbano finire con l'addio. Possono continuare a brillare, confortarci e darci forza."
      },
      values: {
        title: "I nostri valori",
        compassion: {
          title: "Compassione",
          desc: "Lavoriamo con rispetto ed empatia – per le persone in situazioni di vita speciali."
        },
        personality: {
          title: "Personalità",
          desc: "Ogni memoriale è individuale – progettiamo quanto necessario e il meno possibile."
        },
        connection: {
          title: "Connessione",
          desc: "Immagini, video e suoni creano vicinanza – in qualsiasi momento, nel luogo della memoria o a casa."
        }
      },
      product: {
        title: "Perché Memora?",
        p1: "Perché i ricordi sono più di semplici pensieri – meritano un posto degno.",
        p2: "I nostri prodotti Memora combinano tecnologia ed emozione – semplici, belli, sostenibili."
      }
    },

    legal: {
      privacy: {
        title: "Informativa sulla privacy",
        sections: {
          responsible: {
            title: "1. Titolare del trattamento",
            content: "Memora Moments\n[Inserire indirizzo]\n[CAP, Città]\n[N. registro di commercio, se disponibile]\nE-mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99\n\nSiamo responsabili della raccolta, del trattamento e dell'uso dei vostri dati personali ai sensi della legge svizzera sulla protezione dei dati (nLPD)."
          },
          dataCollection: {
            title: "2. Raccolta e trattamento dei dati personali",
            content: "Trattiamo i dati personali che ci fornite nell'ambito dell'utilizzo dei nostri servizi o che vengono generati durante l'utilizzo. Questi includono in particolare:",
            list: [
              "Dati di contatto (nome, indirizzo, e-mail, numero di telefono)",
              "Informazioni di pagamento (a seconda del metodo di pagamento scelto, ad es. carta di credito, TWINT, pagamento anticipato)",
              "Dati di contenuto (foto, video, testi, musica/audio) forniti per video commemorativi personalizzati e Memoras",
              "Dati di utilizzo (ad es. ora di accesso a un video tramite Memora, metadati tecnici come browser/dispositivo)"
            ]
          },
          purpose: {
            title: "3. Finalità del trattamento dei dati",
            content: "I vostri dati vengono utilizzati esclusivamente per le seguenti finalità:",
            list: [
              "Evasione degli ordini ed esecuzione del contratto",
              "Creazione, modifica e fornitura di video commemorativi e configurazione di tag NFC",
              "Gestione dei pagamenti e fatturazione",
              "Comunicazione con voi (ad es. conferma d'ordine, richieste, supporto)",
              "Funzionamento, sicurezza e miglioramento dei nostri servizi"
            ]
          },
          disclosure: {
            title: "4. Comunicazione a terzi",
            content: "Non vendiamo i vostri dati né li comunichiamo a terzi per scopi pubblicitari. La comunicazione avviene esclusivamente nella misura necessaria per le finalità sopra menzionate, a responsabili del trattamento accuratamente selezionati:",
            list: [
              "Fornitori di servizi di pagamento (ad es. Stripe, TWINT, istituti di carte di credito) per l'elaborazione dei pagamenti",
              "Fornitori di servizi IT, cloud e hosting (ad es. per il funzionamento del sito web, l'archiviazione dei dati, la creazione/distribuzione di video)",
              "Fornitori di servizi di e-mail/comunicazione (ad es. per l'invio di e-mail di sistema e di servizio)",
              "Partner logistici/di consegna per la spedizione di prodotti fisici"
            ]
          },
          storage: {
            title: "5. Conservazione e cancellazione dei dati",
            content: "I contenuti personalizzati (foto, video, audio, testi) vengono conservati solo per il tempo necessario all'esecuzione del contratto e alla fornitura del servizio. I dati dei clienti vengono conservati nel rispetto degli obblighi di legge. Su vostra richiesta, verificheremo la possibilità di una cancellazione anticipata, a condizione che non vi siano obblighi di legge contrari."
          },
          security: {
            title: "6. Sicurezza dei dati",
            content: "Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i vostri dati da perdita, manipolazione e accesso non autorizzato. Si prega di notare che la trasmissione di dati su Internet (ad es. via e-mail) può presentare lacune di sicurezza."
          },
          rights: {
            title: "7. Diritti degli interessati",
            content: "Nell'ambito della normativa vigente sulla protezione dei dati, avete in particolare i seguenti diritti. Per esercitare i vostri diritti, vi preghiamo di contattarci all'indirizzo sopra indicato:",
            list: [
              "Informazione: Accesso ai dati memorizzati che vi riguardano",
              "Rettifica: Correzione di dati inesatti o incompleti",
              "Cancellazione: Rimozione dei vostri dati, a condizione che non sussistano obblighi di conservazione",
              "Limitazione/Opposizione (se applicabile): Limitazione di determinati trattamenti",
              "Portabilità dei dati: Consegna dei vostri dati in un formato elettronico comune"
            ]
          },
          cookies: {
            title: "8. Cookie e tracciamento",
            content: "Il nostro sito web utilizza i cookie necessari per fornire le funzioni di base. Utilizziamo altri cookie (facoltativi) di analisi o di marketing solo con il vostro consenso. Potete impostare nel vostro browser se i cookie devono essere accettati, bloccati o cancellati."
          },
          changes: {
            title: "9. Modifiche alla presente informativa sulla privacy",
            content: "Ci riserviamo il diritto di modificare la presente informativa sulla privacy in qualsiasi momento. Si applica la versione attuale pubblicata sul nostro sito web."
          }
        }
      },
      terms: {
        title: "Termini e condizioni generali",
        sections: {
          scope: {
            title: "1. Ambito di applicazione",
            content: "Le presenti Condizioni Generali di Contratto (CGC) si applicano a tutti gli ordini e i contratti conclusi tra Memora Moments (di seguito «noi») e i clienti (di seguito «voi») in relazione all'acquisto di tag NFC, video commemorativi e contenuti digitali correlati."
          },
          contract: {
            title: "2. Conclusione del contratto",
            content: "Il contratto si considera concluso non appena confermiamo espressamente il vostro ordine via e-mail. Possiamo rifiutare ordini per motivi tecnici o legali."
          },
          services: {
            title: "3. Prestazioni",
            content: "Le nostre prestazioni comprendono: produzione e consegna di tag NFC (prodotti fisici); creazione e fornitura di video commemorativi personalizzati (contenuti digitali); accesso ad altri contenuti digitali relativi al prodotto."
          },
          prices: {
            title: "4. Prezzi e condizioni di pagamento",
            content: "Tutti i prezzi sono espressi in franchi svizzeri (CHF), IVA inclusa, se applicabile. Metodi di pagamento accettati: carta di credito, TWINT, pagamento anticipato. Il pagamento è dovuto prima della consegna o della creazione dei contenuti digitali."
          },
          delivery: {
            title: "5. Consegna e tempi di consegna",
            content: "La consegna dei prodotti avviene di norma entro 30 giorni dalla conclusione del contratto. Per i prodotti realizzati su misura possono verificarsi ritardi; in tal caso vi informeremo tempestivamente."
          },
          cancellation: {
            title: "6. Diritto di recesso e di ripensamento",
            content: "Per i prodotti personalizzati e i contenuti digitali (ad es. video commemorativi creati individualmente) non è previsto il diritto di recesso. Per i prodotti non personalizzati si applicano le disposizioni di legge."
          },
          warranty: {
            title: "7. Garanzia",
            content: "Garantiamo la conformità dei nostri prodotti al contratto. Vi preghiamo di comunicarci eventuali difetti entro 14 giorni dal ricevimento, in modo da poter esaminare una soluzione adeguata (riparazione, sostituzione o rimborso)."
          },
          liability: {
            title: "7a. Responsabilità",
            content: "La nostra responsabilità è limitata ai danni causati da dolo o colpa grave. Non ci assumiamo alcuna responsabilità per problemi tecnici da parte del cliente (ad es. connessione internet insufficiente, dispositivi incompatibili, impostazioni del software)."
          },
          ip: {
            title: "8. Diritti d'autore e diritti d'uso",
            content: "I contenuti da noi creati (ad es. video commemorativi) sono protetti da copyright. Ricevete un diritto d'uso semplice e non trasferibile per uso privato. L'uso commerciale o la cessione a terzi non è consentita, salvo diverso accordo scritto. Caricando foto, video, audio o testi, confermate di disporre dei diritti necessari; a tal fine ci manlevate da qualsiasi pretesa di terzi."
          },
          privacy: {
            title: "9. Protezione dei dati",
            content: "Trattiamo i dati personali esclusivamente in conformità con la nostra informativa sulla privacy. Ciò include la memorizzazione e il trattamento dei vostri dati per l'esecuzione del contratto, nonché la loro trasmissione a terzi necessari (ad es. fornitori di servizi di pagamento, hosting/IT, spedizione). Utilizzando i nostri servizi, acconsentite a tale trattamento."
          },
          special: {
            title: "10. Prodotti emotivi e avvertenze speciali",
            content: "I nostri prodotti hanno un alto valore emotivo. I contenuti personalizzati non possono essere modificati o restituiti dopo il completamento. In caso di problemi tecnici da parte nostra (ad es. guasto del server), ci impegneremo a ripristinare l'accesso il più rapidamente possibile; non possiamo garantire una disponibilità permanente da parte del cliente."
          },
          law: {
            title: "11. Foro competente e diritto applicabile",
            content: "Si applica esclusivamente il diritto svizzero. Il foro competente è la sede di Memora Moments."
          },
          final: {
            title: "12. Disposizioni finali",
            content: "Qualora singole disposizioni di queste CGC fossero inefficaci, la validità delle restanti disposizioni rimane impregiudicata. Ci riserviamo il diritto di modificare queste CGC in qualsiasi momento. Si applica la versione attuale pubblicata con data e numero di versione."
          },
        }
      },
      imprint: {
        title: "Colophon",
        sections: {
          info: {
            title: "Informazioni ai sensi del § 5 TMG",
            content: "Memora Moments\nProdotti commemorativi personalizzati"
          },
          contact: {
            title: "Contatto",
            content: "E-mail: info.memora.moments@gmail.com\nTelefono: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsabile del contenuto ai sensi del § 55 Abs. 2 RStV",
            content: "Memora Moments\nE-mail: info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Esclusione di responsabilità",
            content: {
              title: "Responsabilità per i contenuti",
              content: "In qualità di fornitori di servizi, siamo responsabili per i nostri contenuti su queste pagine secondo le leggi generali ai sensi del § 7 comma 1 TMG. Tuttavia, secondo i §§ da 8 a 10 TMG, in qualità di fornitori di servizi non siamo obbligati a monitorare le informazioni di terzi trasmesse o memorizzate o a indagare su circostanze che indicano un'attività illegale."
            },
            links: {
              title: "Responsabilità per i link",
              content: "La nostra offerta contiene link a siti web esterni di terzi, sui cui contenuti non abbiamo alcuna influenza. Pertanto, non possiamo assumerci alcuna responsabilità per questi contenuti esterni. Per i contenuti delle pagine collegate è sempre responsabile il rispettivo fornitore o gestore delle pagine."
            },
            copyright: {
              title: "Diritto d'autore",
              content: "I contenuti e le opere creati dai gestori del sito su queste pagine sono soggetti al diritto d'autore tedesco. La riproduzione, l'elaborazione, la distribuzione e qualsiasi tipo di sfruttamento al di fuori dei limiti del diritto d'autore richiedono il consenso scritto del rispettivo autore o creatore."
            }
          }
        }
      }
    },

    footer: {
      brand: {
        name: "Memora Moments",
        description: "Momenti commemorativi digitali – realizzati con dignità, resistenti alle intemperie e facili da condividere."
      },
      contactTitle: "Contatti",
      linksTitle: "Link",
      legal: {
        privacy: "Privacy",
        terms: "Termini",
        imprint: "Colophon"
      },
      copyright: "Tutti i diritti riservati."
    }
  },

  human: {
    hero: {
      title: "Ricordi che vivono – con cuore e suono.",
      subtitle: "I momenti diventano un memoriale silenzioso – Memora Moments apre la porta a storie che rimangono. Immagini, video e musica mantengono vivo il ricordo, proprio dove appartiene: vicino al cuore.",
      startButton: "Come funziona?",
      learnButton: "Scopri di più"
    },
    features: {
      title: "Momenti indimenticabili per l'eternità",
      subtitle: "I nostri Memora Moments uniscono la tecnologia moderna a un ricordo dignitoso.",
      unique: { title: "Memoriale unico", desc: "Onora la vita di una persona cara con un ricordo duraturo." },
      multimedia: { title: "Ricordi multimediali", desc: "Foto e video fanno rivivere momenti speciali." },
      music: { title: "Integra musica di sottofondo", desc: "La musica crea vicinanza e fa vivere le emozioni." },
      quality: { title: "Design dignitoso", desc: "Materiali semplici e di alta qualità che si integrano armoniosamente in qualsiasi tomba o casa." }
    },
    howitworks: {
      title: "Come funziona",
      subtitle: "In pochi passi al tuo Memora personale.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica", desc: "Scegli le tue foto e i tuoi video preferiti o anche messaggi vocali e aggiungi una musica di sottofondo adatta." },
      step3: { title: "Ricevi Memora", desc: "Il tuo Memora arriva a casa tua." }
    },
    products: {
      title: "I nostri Memoras:",
      subtitle: "I classici prodotti Memora.",
      basic: { title: "Memora Tag", desc: "Una semplice lastra di plexiglas che dà vita ai ricordi tramite un album fotografico digitale – discreto e intramontabile.", price: "49 CHF" },
      premium: { title: "Memora Frame", desc: "Una classica cornice per foto, combinata con la tecnologia moderna. Così ogni foto diventa una porta verso ricordi commoventi.", price: "79 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Un'opera d'arte di alta qualità che mantiene vivo il passato e tocca il futuro.", price: "129 CHF" },
      features: {
        tag1: "Lastra di plexiglas 6×6 cm o 3 cm ⌀",
        tag2: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        tag3: "Design minimalista e senza tempo, si integra armoniosamente",
        tag4: "Per lapidi, urne, luoghi della memoria",
        premium1: "Lastra di plexiglas da 3 cm ⌀ – collega immagine e memoriale digitale",
        premium2: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        premium3: "Design personale con la tua foto",
        premium4: "Ideale per la casa, angoli commemorativi o come regalo",
        deluxe1: "Lastra di plexiglas di alta qualità 12×12 cm con finitura nobile",
        deluxe2: "Design individuale con la tua foto e il tuo testo",
        deluxe3: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        deluxe4: "Presentazione con un elegante supporto"
      }
    },
    cta: {
      title: "Onora i tuoi cari",
      subtitle: "Crea il tuo memoriale e conserva i ricordi.",
      create: "Crea memoriale",
      contact: "Contattaci"
    },
    gedenken: {
      title: "Crea memoriale - Memora Moments",
      heading: "Crea il tuo memoriale!",
      description: "Carica i ricordi e creeremo un memoriale dignitoso."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Seleziona il prodotto:" },
        step1Subtitle: "Scegli il tuo prodotto – caricherai i contenuti nel passaggio successivo.",
        step2ByMode: { human: "Informazioni sulla persona" },
        step2Subtitle: "Si prega di compilare i seguenti campi. Le note sono facoltative.",
        step3Title: "Carica immagini e video",
        step3Subtitle: "I file vengono salvati nel modulo e inviati in seguito.",
        step4Title: "Informazioni di contatto",
        step4Subtitle: "Utilizziamo questi dati per domande e conferme d'ordine.",
        step5Title: "Informazioni di fatturazione e riepilogo",
        step5Subtitle: "Si prega di controllare l'indirizzo e il riepilogo. Con 'Procedi al pagamento!' si passerà in seguito al checkout.",
        summary: "Riepilogo"
      },
      products: {
        formatTitle: "Formato",
        frameTitle: "Progetta cornice",
        formatTitleDeluxe: "Progetta Deluxe",
        roundLabel: "Rotondo · Ø 3 cm",
        squareLabel: "Quadrato · 6×6 cm",
        petOptionsTitle: "Opzioni per Memora Tag per animali",
        frameTip:"Suggerimento: sposta l'immagine con il mouse/tocco e aggiungi e posiziona liberamente i testi.",
      },
      editor: {
        image: "Immagine",
        zoom: "Zoom",
        posX: "Posizione orizzontale",
        posY: "Posizione verticale",
        emptyTitle: "Nessuna immagine selezionata",
        emptySub: "Seleziona un'immagine sopra",
        selectedText: "Testo selezionato",
        content: "Contenuto",
        font: "Carattere",
        size: "Dimensione",
        color: "Colore",
        previewLabel: "Anteprima adottata",
        previewNote: "Questa anteprima verrà salvata con l'ordine."
      },
      step2Fields: {
        human_lastName: "Cognome *",
        human_firstName: "Nome *",
        human_deathDate: "Data di morte",
        human_notesPH: "Desideri speciali, citazioni, note musicali…",
        pet_name: "Nome dell'animale *",
        pet_deathDate: "Data di morte *",
        pet_notesPH: "Desideri speciali, suoni preferiti, note…",
        surprise_name: "Nome (destinatario) *",
        surprise_notesPH: "Matrimonio, compleanno, anniversario… desideri speciali"
      },
      step3Fields: {
        imagesLabel: "Immagini (più possibili)",
        videosLabel: "Video (più possibili)",
        remove: "Rimuovi",
        imageCaptionPlaceholder: "Breve testo per l'immagine (opzionale)",
        videoCaptionPlaceholder: "Breve testo per il video (opzionale)",
      },
      contactFields: {
        firstName: "Nome *",
        lastName: "Cognome *",
        email: "E-mail *",
        phoneOpt: "Telefono (opzionale)"
      },
      invoiceFields: {
        sameAsContact: "Indirizzo di fatturazione uguale all'indirizzo di contatto",
        companyOpt: "Azienda (opzionale)",
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
        previewTitle: "Anteprima personalizzata"
      }
    }
  },

  pet: {
    hero: {
      title: "Per i nostri fedeli compagni – ricordi con cuore e suono.",
      subtitle: "I nostri animali domestici ci donano amore, lealtà e gioia. Con Memora Moments, il loro ricordo rimane vivo – nel cuore e in luoghi speciali.",
      startButton: "Come funziona?",
      learnButton: "Scopri di più"
    },
    features: {
      title: "Momenti indimenticabili con il tuo tesoro",
      subtitle: "Ricordi digitali per animali domestici.",
      unique: { title: "Ricordo affettuoso", desc: "Momenti speciali con il tuo animale domestico." },
      multimedia: { title: "Esperienze multimediali", desc: "Foto e video del tuo tesoro." },
      music: { title: "Suoni preferiti", desc: "Il familiare abbaiare, miagolare o una canzone che unisce." },
      quality: { title: "Design dignitoso", desc: "Materiali semplici e di alta qualità che si integrano armoniosamente in ogni casa, sia all'interno che all'esterno." }
    },
    howitworks: {
      title: "Come funziona",
      subtitle: "Al Memora in tre passi.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica o suoni", desc: "Scegli le tue foto e i tuoi video preferiti o anche messaggi vocali e aggiungi una musica di sottofondo adatta." },
      step3: { title: "Ricevi Memora", desc: "Il tuo Memora viene consegnato." }
    },
    products: {
      title: "Prodotti per animali domestici",
      subtitle: "Ricordi per compagni fedeli.",
      basic: { title: "Memora Pet Tag", desc: "Una semplice lastra di plexiglas che dà vita ai ricordi del tuo animale domestico con un album fotografico digitale", price: "da 49 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Una cornice elegante che collega la tua foto preferita a un album fotografico digitale – ideale per la casa.", price: "89 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Un'esclusiva lastra di plexiglas con supporto – per un ricordo duraturo e dignitoso.", price: "129 CHF" },
      features: {
        tag1: "Lastra di plexiglas 6×6 cm o 3 cm ⌀",
        tag2: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        tag3: "Design minimalista e senza tempo, si integra armoniosamente",
        tag4: "Opzione: standard semplice, design personalizzato o come portachiavi",
        premium1: "Lastra di plexiglas da 3 cm ⌀ – collega immagine e memoriale digitale",
        premium2: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        premium3: "Design personale con la tua foto",
        premium4: "Ideale per la casa o come regalo",
        deluxe1: "Lastra di plexiglas di alta qualità 12×12 cm con finitura nobile",
        deluxe2: "Design individuale con la tua foto e il tuo testo",
        deluxe3: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        deluxe4: "Presentazione con un elegante supporto"
      }
    },
    cta: {
      title: "Onora il tuo tesoro",
      subtitle: "Una casa nel cuore – conserva il ricordo del tuo fedele compagno.",
      create: "Crea ricordo",
      contact: "Contattaci"
    },
    gedenken: {
      title: "Crea memoriale per animali domestici - Memora Moments",
      heading: "Memoriale per il tuo animale domestico",
      description: "Carica i ricordi del tuo tesoro."
    },
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Seleziona il prodotto:" },
        step1Subtitle: "Scegli il tuo prodotto – caricherai i contenuti nel passaggio successivo.",
        step2ByMode: { human: "Informazioni sulla persona" },
        step2Subtitle: "Si prega di compilare i seguenti campi. Le note sono facoltative.",
        step3Title: "Carica immagini e video",
        step3Subtitle: "I file vengono salvati nel modulo e inviati in seguito.",
        step4Title: "Informazioni di contatto",
        step4Subtitle: "Utilizziamo questi dati per domande e conferme d'ordine.",
        step5Title: "Informazioni di fatturazione e riepilogo",
        step5Subtitle: "Si prega di controllare l'indirizzo e il riepilogo. Con 'Procedi al pagamento!' si passerà in seguito al checkout.",
        summary: "Riepilogo"
      },
      products: {
        formatTitle: "Formato",
        frameTitle: "Progetta cornice",
        formatTitleDeluxe: "Progetta Deluxe",
        roundLabel: "Rotondo · Ø 3 cm",
        squareLabel: "Quadrato · 6×6 cm",
        petOptionsTitle: "Opzioni per Memora Tag per animali",
        frameTip:"Suggerimento: sposta l'immagine con il mouse/tocco e aggiungi e posiziona liberamente i testi.",
        petOptionsTitle: "Opzioni per Memora Tag per animali",
        keychainLabel: "con portachiavi (+7 CHF)",
      },
      editor: {
        image: "Immagine",
        zoom: "Zoom",
        posX: "Posizione orizzontale",
        posY: "Posizione verticale",
        emptyTitle: "Nessuna immagine selezionata",
        emptySub: "Seleziona un'immagine sopra",
        selectedText: "Testo selezionato",
        content: "Contenuto",
        font: "Carattere",
        size: "Dimensione",
        color: "Colore",
        previewLabel: "Anteprima adottata",
        previewNote: "Questa anteprima verrà salvata con l'ordine."
      },
      step2Fields: {
        human_lastName: "Cognome *",
        human_firstName: "Nome *",
        human_deathDate: "Data di morte",
        human_notesPH: "Desideri speciali, citazioni, note musicali…",
        pet_name: "Nome dell'animale *",
        pet_deathDate: "Data di morte *",
        pet_notesPH: "Desideri speciali, suoni preferiti, note…",
        surprise_name: "Nome (destinatario) *",
        surprise_notesPH: "Matrimonio, compleanno, anniversario… desideri speciali"
      },
      step3Fields: {
        imagesLabel: "Immagini (più possibili)",
        videosLabel: "Video (più possibili)",
        remove: "Rimuovi",
        imageCaptionPlaceholder: "Breve testo per l'immagine (opzionale)",
        videoCaptionPlaceholder: "Breve testo per il video (opzionale)",
      },
      contactFields: {
        firstName: "Nome *",
        lastName: "Cognome *",
        email: "E-mail *",
        phoneOpt: "Telefono (opzionale)"
      },
      invoiceFields: {
        sameAsContact: "Indirizzo di fatturazione uguale all'indirizzo di contatto",
        companyOpt: "Azienda (opzionale)",
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
        previewTitle: "Anteprima personalizzata"
      }
    }
    
  },

  surprise: {
    hero: {
      title: "Un regalo che tocca i cuori – sorprese indimenticabili.",
      subtitle: "Che si tratti di un matrimonio, un compleanno o un anniversario – con Memora Moments rendi i ricordi tangibili. Foto, video e musica diventano un regalo unico che dura.",
      startButton: "Come funziona?",
      learnButton: "Scopri di più"
    },
    features: {
      title: "Quel qualcosa in più",
      subtitle: "Semplice, dignitoso e pieno di significato.",
      unique: { title: "Sorpresa unica", desc: "Ogni Sorpresa racconta una piccola storia." },
      multimedia: { title: "Esperienze multimediali", desc: "Foto, video e musica rendono il tuo regalo vivace ed emozionante." },
      music: { title: "Musica e messaggi", desc: "Aggiungi una musica di sottofondo o un messaggio vocale personale." },
      quality: { title: "Design elegante", desc: "Minimalista e di alta qualità – adatto a ogni occasione e celebrazione." }
    },
    howitworks: {
      title: "Come funziona la Sorpresa",
      subtitle: "Tre passi per il momento della sorpresa.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica", desc: "Scegli le tue foto e i tuoi video preferiti o anche messaggi vocali e aggiungi una musica di sottofondo adatta." },
      step3: { title: "Ricevi la Sorpresa", desc: "Il tuo Memora viene consegnato direttamente a te." }
    },
    products: {
      title: "Prodotti Sorpresa",
      subtitle: "Scegli il tuo stile.",
      basic: { title: "Memora Surprise Tag", desc: "Una piccola lastra di plexiglas che collega un album fotografico digitale – originale e unico.", price: "49 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Una cornice elegante che collega la tua foto preferita a un album fotografico digitale – ideale come regalo.", price: "79 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Un'esclusiva lastra di plexiglas con tecnologia integrata – il regalo premium elegante per ricordi duraturi.", price: "129 CHF" },
      features: {
        tag1: "Lastra di plexiglas 6×6 cm o 3 cm ⌀",
        tag2: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        tag3: "Design minimalista e senza tempo, si integra armoniosamente",
        tag4: "Una sorpresa che evoca emozioni e che sarà ricordata a lungo",
        premium1: "Lastra di plexiglas da 3 cm ⌀ – collega immagine e memoriale digitale",
        premium2: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        premium3: "Design personale con la tua foto",
        premium4: "Il regalo perfetto per compleanni, matrimoni o anniversari",
        deluxe1: "Lastra di plexiglas di alta qualità 12×12 cm con finitura nobile",
        deluxe2: "Design individuale con la tua foto e il tuo testo",
        deluxe3: "Sfoglia l'album fotografico digitale personale direttamente con un tocco",
        deluxe4: "Presentazione con un elegante supporto"
      }
    },
    cta: {
      title: "Pronto per il tuo momento di sorpresa?",
      subtitle: "Sorpresa regala momenti unici.",
      create: "Crea sorpresa",
      contact: "Contattaci"
    },
    gedenken: {
      title: "Crea sorpresa - Memora Moments",
      heading: "Il tuo momento Sorpresa",
      description: "Carica i contenuti e progetteremo la tua esperienza."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Seleziona il prodotto:" },
        step1Subtitle: "Scegli il tuo prodotto – caricherai i contenuti nel passaggio successivo.",
        step2ByMode: { human: "Informazioni sulla persona" },
        step2Subtitle: "Si prega di compilare i seguenti campi. Le note sono facoltative.",
        step3Title: "Carica immagini e video",
        step3Subtitle: "I file vengono salvati nel modulo e inviati in seguito.",
        step4Title: "Informazioni di contatto",
        step4Subtitle: "Utilizziamo questi dati per domande e conferme d'ordine.",
        step5Title: "Informazioni di fatturazione e riepilogo",
        step5Subtitle: "Si prega di controllare l'indirizzo e il riepilogo. Con 'Procedi al pagamento!' si passerà in seguito al checkout.",
        summary: "Riepilogo"
      },
      products: {
        formatTitle: "Formato",
        frameTitle: "Progetta cornice",
        formatTitleDeluxe: "Progetta Deluxe",
        roundLabel: "Rotondo · Ø 3 cm",
        squareLabel: "Quadrato · 6×6 cm",
        petOptionsTitle: "Opzioni per Memora Tag per animali",
        frameTip:"Suggerimento: sposta l'immagine con il mouse/tocco e aggiungi e posiziona liberamente i testi.",
      },
      editor: {
        image: "Immagine",
        zoom: "Zoom",
        posX: "Posizione orizzontale",
        posY: "Posizione verticale",
        emptyTitle: "Nessuna immagine selezionata",
        emptySub: "Seleziona un'immagine sopra",
        selectedText: "Testo selezionato",
        content: "Contenuto",
        font: "Carattere",
        size: "Dimensione",
        color: "Colore",
        previewLabel: "Anteprima adottata",
        previewNote: "Questa anteprima verrà salvata con l'ordine."
      },
      step2Fields: {
        human_lastName: "Cognome *",
        human_firstName: "Nome *",
        human_deathDate: "Data di morte",
        human_notesPH: "Desideri speciali, citazioni, note musicali…",
        pet_name: "Nome dell'animale *",
        pet_deathDate: "Data di morte *",
        pet_notesPH: "Desideri speciali, suoni preferiti, note…",
        surprise_name: "Nome (destinatario) *",
        surprise_notesPH: "Matrimonio, compleanno, anniversario… desideri speciali"
      },
      step3Fields: {
        imagesLabel: "Immagini (più possibili)",
        videosLabel: "Video (più possibili)",
        remove: "Rimuovi",
        imageCaptionPlaceholder: "Breve testo per l'immagine (opzionale)",
        videoCaptionPlaceholder: "Breve testo per il video (opzionale)",
      },
      contactFields: {
        firstName: "Nome *",
        lastName: "Cognome *",
        email: "E-mail *",
        phoneOpt: "Telefono (opzionale)"
      },
      invoiceFields: {
        sameAsContact: "Indirizzo di fatturazione uguale all'indirizzo di contatto",
        companyOpt: "Azienda (opzionale)",
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
        previewTitle: "Anteprima personalizzata"
      }
    }
  }
};