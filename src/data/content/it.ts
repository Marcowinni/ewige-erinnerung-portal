import { ContentData } from './types';

export const itContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Crea Memoriale",
      about: "Chi Siamo",
      contact: "Contatto",
      start: "Inizia Memoriale",
      create: "Crea",
      mode: { human: "Persona", pet: "Animali", surprise: "Sorpresa" }
    },

    banner: {
      text: "Spedizione gratuita in tutta la Svizzera"
    },

    albumPage: {
      title: (name) => `Ricordi di ${name}`,
      preTitle: "Un album digitale per: ",
      subtitle: "Una raccolta di momenti indimenticabili.",
      defaultName: "questi momenti speciali",
      playButton: "Riproduci musica",
      pauseButton: "Metti in pausa la musica",
      playButtonHint: "Controlla la musica qui",
      openAlbum: "Apri Album"
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
        title: "Informativa sulla privacy",
        sections: {
          responsible: {
            title: "1. Titolare del trattamento",
            content:
              "TW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Svizzera\nE-mail: info@memora-moments.ch\nTelefono: +41 79 407 56 99\n\nSiamo titolari del trattamento ai sensi della Legge svizzera sulla protezione dei dati riveduta (nLPD) e — ove applicabile — del Regolamento generale sulla protezione dei dati dell'UE (GDPR)."
          },
          dataCollection: {
            title: "2. Dati raccolti",
            content:
              "Trattiamo solo i dati che ci fornisci durante un ordine, la creazione di un album o la consultazione di un album pubblicato, ovvero:",
            list: [
              "Dati dell'ordine: nome, indirizzo di consegna, e-mail, telefono (facoltativo), informazioni di pagamento (gestite tramite Stripe)",
              "Contenuto dell'album: foto e video (max. 40 file, max. 200 MB per video), didascalie, dedica facoltativa, nome e date della persona ricordata e brano musicale scelto",
              "Impostazioni dell'editor: layout, testi per pagina, punto focale dell'immagine — salvati nel nostro database insieme all'album",
              "Slug dello Smart Tag: ogni album riceve un URL univoco (p. es. memora-moments.ch/album/marie-01) aperto tramite NFC o codice QR",
              "Dati tecnici alla consultazione: indirizzo IP (troncato dai nostri CDN), browser, dispositivo e timestamp — anonimizzati per sicurezza e prestazioni",
              "Dati dei cookie: un cookie di consenso e — solo dopo il tuo consenso — Google Analytics per la misurazione dell'audience"
            ]
          },
          purpose: {
            title: "3. Finalità del trattamento",
            content:
              "Utilizziamo i tuoi dati esclusivamente per:",
            list: [
              "Evadere il tuo ordine (Smart Tag fisico e album digitale)",
              "Creare, impaginare e pubblicare il tuo album personalizzato",
              "Diffondere i contenuti dell'album all'apertura dell'URL Smart Tag o QR",
              "Elaborare il pagamento tramite Stripe e inviare la conferma d'ordine via e-mail",
              "Contattarti per chiarimenti, correzioni o supporto",
              "Gestire, mettere in sicurezza e migliorare la piattaforma"
            ]
          },
          disclosure: {
            title: "4. Condivisione con terzi / responsabili del trattamento",
            content:
              "Non vendiamo dati e non li cediamo per finalità pubblicitarie. Per gestire la piattaforma ci avvaliamo dei seguenti responsabili:",
            list: [
              "Supabase (storage e database, regione UE) — conserva il contenuto dell'album, i dati dell'ordine e le impostazioni dell'editor",
              "Vercel (hosting e edge CDN) — distribuisce il sito e le pagine dell'album",
              "Stripe (elaborazione pagamenti) — gestisce direttamente carte e TWINT; non riceviamo mai dati di carta completi",
              "Resend (e-mail transazionali) — invia conferme d'ordine e notifiche dell'album",
              "Posta svizzera e partner logistici — spediscono lo Smart Tag fisico",
              "Google Analytics (solo con consenso ai cookie) — misurazione anonimizzata dell'audience"
            ]
          },
          storage: {
            title: "5. Conservazione e cancellazione",
            content:
              "I dati di ordine sono conservati secondo gli obblighi contabili svizzeri (10 anni). I contenuti dell'album restano accessibili per almeno 12 mesi dalla consegna dello Smart Tag; una disponibilità oltre tale periodo non è contrattualmente garantita. Su richiesta scritta cancelliamo o anonimizziamo prima il contenuto, salvo obblighi legali contrari."
          },
          security: {
            title: "6. Sicurezza dei dati",
            content:
              "Proteggiamo i tuoi dati con misure tecniche e organizzative aggiornate: trasporto esclusivamente in TLS, controllo accessi a livello di database (Row-Level Security), chiavi di servizio separate per le edge function e backup regolari presso i nostri provider cloud. Una protezione completa nelle trasmissioni Internet (es. e-mail) non può essere garantita."
          },
          rights: {
            title: "7. I tuoi diritti",
            content:
              "Hai i seguenti diritti nei nostri confronti. Le richieste vanno inviate a info@memora-moments.ch:",
            list: [
              "Accesso ai dati che ti riguardano",
              "Rettifica di dati inesatti o incompleti",
              "Cancellazione, salvo obblighi legali di conservazione",
              "Limitazione od opposizione a determinati trattamenti",
              "Portabilità in un formato elettronico comune",
              "Revoca del consenso prestato, con effetto per il futuro"
            ]
          },
          cookies: {
            title: "8. Cookie e tracciamento",
            content:
              "Utilizziamo cookie strettamente necessari (es. cookie di lingua e di consenso) impostabili senza consenso. I cookie analitici opzionali (Google Analytics) vengono attivati solo dopo l'accettazione nel banner. Puoi revocare il consenso in qualsiasi momento eliminando il cookie 'memora-cookie-consent' dal browser."
          },
          changes: {
            title: "9. Modifiche all'informativa",
            content:
              "Possiamo modificare l'informativa al variare di funzionalità o responsabili. Si applica la versione pubblicata su questa pagina."
          }
        }
      },
      terms: {
        title: "Condizioni generali di contratto",
        sections: {
          scope: {
            title: "Premessa e contatto",
            content: "Questo sito è gestito da TW Projects GmbH con il marchio Memora Moments. I termini «noi», «ci» e «nostro» si riferiscono a TW Projects GmbH; «tu» o «cliente» indica l'utente.\n\nContatto:\nTW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Svizzera\nE-mail: info@memora-moments.ch\nTelefono: +41 79 407 56 99\n\nLe presenti CGC sono disponibili in tedesco, inglese, francese e italiano. In caso di discrepanze fa fede la versione tedesca."
          },
          contract: {
            title: "1. Ambito e conclusione del contratto",
            content: "Le presenti CGC si applicano a ogni ordine effettuato tramite memora-moments.ch nonché all'utilizzo dell'editor di album e dell'album pubblicato.\n\nLa presentazione dei prodotti non costituisce un'offerta vincolante ma un invito a ordinare. Completando il processo di ordine (conferma di pagamento via Stripe) presenti un'offerta vincolante. Il contratto si perfeziona non appena ti inviamo la conferma d'ordine via e-mail o avviamo la spedizione."
          },
          services: {
            title: "2. Descrizione delle prestazioni",
            content: "Memora Moments combina due prestazioni:\n\n1) Prodotto fisico: uno Smart Tag (placca NFC / QR) applicabile in modo discreto su lapidi, urne o prodotti partner (es. Zeichnungsverlag).\n\n2) Album digitale: un album foto e video accessibile tramite lo Smart Tag, progettato da te nel nostro editor online. Scegli stile (Modern, Classico, Senza Tempo), layout per pagina, punto focale delle immagini, testi opzionali e un brano musicale.\n\nL'album viene pubblicato a un URL univoco (memora-moments.ch/album/<slug>) e collegato allo Smart Tag."
          },
          prices: {
            title: "3. Prezzi, spedizione e pagamento",
            content: "Il prezzo base per album è di CHF 89.– (IVA eventuale inclusa, valgono i prezzi attuali del sito).\n\nSpese di spedizione per zona:\n– Svizzera (CH): CHF 9.–\n– Europa (UE): CHF 19.–\n– Mondo (WORLD): CHF 29.–\n\nTutti i prezzi sono in franchi svizzeri. Eventuali dazi o tasse d'importazione fuori dalla Svizzera sono a carico del destinatario.\n\nIl pagamento avviene prima della consegna tramite Stripe (carta di credito/debito o TWINT). Ordini di test senza pagamento sono disponibili solo previa attivazione esplicita da parte nostra.\n\nIn caso di storno abbiamo diritto a fatturare le relative spese bancarie."
          },
          delivery: {
            title: "4. Processo d'ordine, consegna e trasferimento del rischio",
            content: "Il processo d'ordine si articola in 8 fasi: pubblico (umano/animale), scelta dello stile, caricamento dei media, editor dell'album, musica, anteprima, dati personali e pagamento.\n\nDopo la ricezione del pagamento avviamo la produzione dello Smart Tag e la pubblicazione dell'album. La consegna avviene entro 30 giorni dalla conclusione del contratto, salvo diversa indicazione.\n\nIl rischio di perdita o danneggiamento accidentale del prodotto fisico passa a te al momento della consegna al corriere. Fino al pagamento integrale il prodotto resta di nostra proprietà (riserva di proprietà secondo il diritto svizzero)."
          },
          cancellation: {
            title: "5. Recesso per prodotti personalizzati",
            content: "Lo Smart Tag e l'album digitale sono prodotti e pubblicati individualmente secondo le tue indicazioni. I prodotti personalizzati sono esclusi dal diritto legale di recesso o restituzione.\n\nI diritti di garanzia (clausola 8) restano impregiudicati. Verifica con cura i contenuti dell'album nell'anteprima a tutto schermo prima di ordinare."
          },
          warranty: {
            title: "6. Contenuti del cliente — diritti e obblighi",
            content: "Carichi nell'editor al massimo 40 file media (immagini compresse a circa 1 MB ciascuna, video fino a 200 MB). Confermi di possedere, per tutti i contenuti caricati (immagini, video, audio, testi, nomi e date), i necessari diritti d'autore, all'immagine e di protezione dei dati, oppure di aver ottenuto il consenso degli aventi diritto o dei familiari.\n\nPer la creazione, l'archiviazione, la diffusione e l'anteprima dell'album ci concedi una licenza non esclusiva, mondiale, limitata allo scopo contrattuale.\n\nCi riserviamo di rifiutare o rimuovere contenuti manifestamente illeciti, contrari al buon costume o lesivi di diritti di terzi."
          },
          liability: {
            title: "7. Procedura di notifica e rimozione",
            content: "Se sei un avente diritto (es. parente, erede, persona ritratta) e ritieni i tuoi diritti violati da un album pubblicato, contattaci a info@memora-moments.ch indicando l'URL dell'album e la natura della violazione.\n\nAl ricevimento di una segnalazione motivata rimuoviamo senza ritardo l'album o il contenuto interessato e contattiamo il cliente originario per chiarimenti."
          },
          ip: {
            title: "8. Garanzia e responsabilità",
            content: "Si applicano i diritti legali sui vizi secondo il Codice svizzero delle obbligazioni. I reclami devono pervenire per iscritto entro 21 giorni dal ricevimento. A nostra scelta provvediamo a riparazione o sostituzione.\n\nSono esclusi dalla garanzia in particolare:\n– refusi, errori di layout o di selezione commessi dal cliente nell'editor,\n– immagini o video di qualità insufficiente (bassa risoluzione, forte compressione),\n– deviazioni di colore dovute a schermi o stampe diversi,\n– danni di trasporto non segnalati entro 7 giorni dal ricevimento.\n\nLa nostra responsabilità è limitata, nei limiti di legge, a dolo e colpa grave. Per colpa lieve rispondiamo solo in caso di lesioni personali. Sono escluse, nei limiti di legge, le responsabilità per danni indiretti, mancato profitto o perdita di dati."
          },
          privacy: {
            title: "9. Disponibilità dei servizi digitali",
            content: "Editor, distribuzione dell'album e checkout sono ospitati su infrastruttura cloud (in particolare Vercel e Supabase, regione UE). Puntiamo a un'elevata disponibilità ma non garantiamo alcun service level specifico.\n\nBrevi interruzioni per manutenzione, aggiornamenti di sicurezza o incidenti dei provider sono possibili. Non è dato alcun diritto a una piattaforma di hosting specifica."
          },
          special: {
            title: "10. Diritti di terzi",
            content: "Sei l'unico responsabile della titolarità dei diritti sui contenuti caricati. Qualora terzi facciano valere nei nostri confronti pretese per violazione di diritti d'autore, di marchio o della personalità, ci tieni indenni e ti fai carico delle spese di difesa — fatti salvi eventuali nostri diritti di risarcimento."
          },
          law: {
            title: "11. Protezione dei dati",
            content: "La raccolta e il trattamento dei dati personali sono disciplinati dalla nostra informativa sulla privacy. Prendi atto che ci avvaliamo di responsabili del trattamento (in particolare Supabase, Vercel, Stripe e Resend) e che i contenuti vengono distribuiti ai dispositivi tramite content-delivery network."
          },
          final: {
            title: "12. Regolamento delle donazioni",
            content: "TW Projects GmbH dona il 10 % del prezzo di vendita netto di ogni prodotto Memora Moments venduto direttamente tramite memora-moments.ch a organizzazioni benefiche (es. Make-A-Wish Svizzera o la Fondazione Servizio di Soccorso Animali).\n\nGli acquisti effettuati tramite canali partner, rivenditori o cooperazioni (es. link di influencer) sono esclusi.\n\nLe donazioni vengono erogate una volta all'anno a fine anno. La scelta dell'organizzazione beneficiaria e la gestione sono di nostra esclusiva competenza. Il cliente non ha diritto individuale al trasferimento o alla destinazione della donazione."
          },
          contact: {
            title: "13. Usi vietati",
            content: "La piattaforma non può essere utilizzata per scopi illeciti, spam, malware, caricamento di contenuti pedopornografici, inneggianti alla violenza o all'odio, né per violare diritti di terzi.\n\nIn caso di violazione ci riserviamo di mettere immediatamente l'album offline, sospendere l'account e — se necessario — informare le autorità. Importi già pagati non vengono rimborsati in tali casi."
          },
          availability: {
            title: "14. Disponibilità degli album digitali",
            content: "Garantiamo che l'album pubblicato resti accessibile tramite l'URL Smart Tag per almeno 12 mesi dalla consegna dello Smart Tag, salvo diversa indicazione. Una disponibilità superiore non è contrattualmente garantita.\n\nNon siamo responsabili per interruzioni, modifiche o cessazioni di servizi esterni, né per perdite di dati al di fuori del nostro controllo. Ci riserviamo di migrare i contenuti dell'album verso altri servizi o piattaforme di hosting senza che ne derivino diritti del cliente verso un fornitore specifico.\n\nDiritto applicabile: diritto svizzero, con esclusione della Convenzione delle Nazioni Unite sui contratti di compravendita internazionale di merci. Nei limiti di legge, il foro competente è la sede di TW Projects GmbH (Dürnten ZH)."
          },
        },
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
              "E-mail: info@memora.moments.ch\nTelefono: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsabilità",
            content: "Memora Moments\nE-mail: info@memora.moments.ch"
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

    orderSuccessPage: {
      title: "Ordine riuscito - Memora Moments",
      heading: "Grazie per il tuo ordine!",
      message1: "Abbiamo ricevuto il tuo ordine e lo elaboreremo il prima possibile.",
      buttonHome: "Torna alla homepage"
    },
    orderCancelPage: {
      title: "Ordine annullato - Memora Moments",
      heading: "Ordine annullato",
      message: "Il processo di pagamento è stato annullato. Il tuo carrello è stato salvato.",
      buttonBack: "Torna al carrello"
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
    },

    landing: {
      hero: {
        eyebrow: "Memora Moments",
        titleLine1: "Ricordi",
        titleLine2: "che vivono",
        subtitle1: "Uno Smart Tag dignitoso che riunisce i momenti più preziosi con i vostri cari in un album digitale dei ricordi.",
        subtitle2: "Per persone e animali che restano nei nostri ricordi.",
        ctaCreate: "Crea l'album"
      },
      pathChoice: {
        eyebrow: "Ecco come funziona!",
        titleLine1: "Ogni momento",
        titleLine2: "merita il suo posto.",
        ctaCreate: "Crea l'album"
      },
      audience: {
        eyebrow: "Per tutti coloro che ci hanno accompagnato",
        titleLine1: "Per ogni",
        titleLine2: "compagno amato.",
        human: {
          eyebrow: "Per le persone",
          headline: "Per le persone\nche ci hanno accompagnato.",
          body: ""
        },
        pet: {
          eyebrow: "Per gli animali",
          headline: "Per il tuo\nfedele compagno.",
          body: ""
        }
      },
      styleShowcase: {
        eyebrow: "Tre stili",
        titleLine1: "Ogni storia",
        titleLine2: "merita il suo tono.",
        hint: "Sfoglia i nostri album e trova il tuo stile.",
        ctaPickStyle: "Scegli il tuo stile",
        previewTitle: (style: string) => `Anteprima album ${style}`,
        navBack: "Indietro",
        navForward: "Avanti",
        themes: { modern: "Moderno", classic: "Classico", timeless: "Senza tempo" }
      },
      partner: {
        eyebrow: "In collaborazione",
        titleLine1: "Insieme a",
        titleLine2: "Zeichnungsverlag",
        body: "Il nostro tag si applica discretamente su lapidi, urne e sui prodotti di Zeichnungsverlag — creando connessioni sottili tra i luoghi fisici del ricordo e i contenuti digitali.",
        cta: "Visita Zeichnungsverlag"
      }
    },

    customerWizard: {
      stepLabels: ["Per chi", "Stile", "Foto", "Ordina"],
      progress: (current: number, total: number) => `Passo ${current} di ${total}`,
      nav: { back: "Indietro", next: "Avanti", toStep4: "Procedi all'ordine" },
      step1: {
        title: "Per chi creiamo l'album?",
        subtitle: "Scegli e compila i dettagli.",
        optionHuman: "Per una persona",
        optionPet: "Per un animale",
        nameLabel: "Nome *",
        namePlaceholderHuman: "Nome della persona",
        namePlaceholderPet: "Nome dell'animale",
        birthDate: "Data di nascita (facoltativo)",
        deathDateHuman: "Data di morte (facoltativo)",
        deathDatePet: "Data di morte (facoltativo)",
        dedicationLabel: "Dedica (facoltativo)",
        dedicationPlaceholder: "Un breve messaggio che accompagni l'album…"
      },
      step2: {
        title: "Quale stile per il tuo album?",
        subtitle: "Lo stile dà carattere a tutte le pagine.",
        modernLabel: "Moderno",
        modernDesc: "Pulito, senza tempo, minimalista",
        classicLabel: "Classico",
        classicDesc: "Caldo, dignitoso, tradizionale",
        timelessLabel: "Senza tempo",
        timelessDesc: "Pulito, calmo, immagini grandi",
        selected: "Selezionato",
        previewIframeTitle: (style: string) => `Anteprima ${style}`
      },
      step3: {
        title: "Le tue foto e i tuoi video",
        countLabel: (count: number, max: number) => `${count} / ${max}`,
        intro: (min: number, max: number) => `Carica almeno ${min} immagini (max. ${max}). Creeremo il tuo album.`,
        moreNeeded: (n: number, min: number) => `Ancora ${n} immagini necessarie (minimo: ${min}).`,
        dropZoneTitle: "Trascina i file qui",
        dropZoneOr: "oppure",
        dropZoneSelect: "Seleziona i file",
        dropZoneRange: (min: number, max: number) => `Immagini e video · min. ${min}, max. ${max} file`,
        compressing: "Compressione delle immagini in corso…",
        removeAria: "Rimuovi",
        musicTitle: "Musica di accompagnamento (facoltativo)",
        pause: "Pausa",
        play: "Riproduci",
        selected: "Selezionato",
        select: "Seleziona",
        pixabayPlaceholder: "Link Pixabay (facoltativo)",
        pixabayLabel: "Link Pixabay",
        pixabayOpen: "Apri",
        noSelection: "Nessuna selezione"
      },
      step4: {
        title: "Contatto e pagamento",
        subtitle: "Ci siamo quasi — pensiamo noi al resto.",
        contactSection: "Contatto",
        nameLabel: "Il tuo nome *",
        namePlaceholder: "Nome e cognome",
        emailLabel: "E-mail *",
        emailPlaceholder: "vostra@email.ch",
        phoneLabel: "Telefono (facoltativo)",
        phonePlaceholder: "+41 79 000 00 00",
        addressSection: "Indirizzo di consegna (per Smart Tag)",
        shippingPrefix: "Spedizione:",
        streetLabel: "Via e numero *",
        streetPlaceholder: "Via Esempio 12",
        postalLabel: "CAP *",
        cityLabel: "Città *",
        cityPlaceholder: "Zurigo",
        countryLabel: "Paese *",
        summaryTitle: "Riepilogo",
        summaryFor: "Per",
        summaryStyle: "Stile",
        summaryImagesLabel: "Immagini",
        summaryImages: (count: number) => `${count} file`,
        summaryMusic: "Musica",
        summaryShipping: "Spedizione",
        summaryNoSelection: "Nessuna selezione",
        totalLabel: "Prezzo totale",
        processing: "Elaborazione in corso…",
        payCta: (price: string) => `Ordina con obbligo di pagamento — ${price}`,
        testCta: "🧪 Ordine di prova (senza pagamento)"
      },
      validation: {
        pickAudience: "Seleziona il destinatario e inserisci il nome.",
        pickStyle: "Seleziona uno stile.",
        uploadMin: (min: number) => `Carica almeno ${min} immagini.`,
        fillRequired: "Compila tutti i campi obbligatori.",
        emailRequired: "Inserisci l'indirizzo e-mail.",
        nameRequired: "Inserisci il nome.",
        addressRequired: "Compila completamente l'indirizzo di consegna.",
        completeAllSteps: "Completa tutti i passaggi.",
        minMediaError: (min: number) => `Sono richieste almeno ${min} immagini.`
      },
      toasts: {
        uploading: (count: number) => `Caricamento di ${count} file in corso…`,
        errorGeneric: "Si è verificato un errore. Per favore riprova.",
        orderCreatedNoPayment: "Ordine creato. Pagamento tramite fattura.",
        filesAdded: (count: number) => `${count} file aggiunti.`,
        maxReached: (max: number) => `Massimo ${max} immagini raggiunto.`,
        videoTooBig: (filename: string) => `${filename} troppo grande (max 200 MB).`
      },
      shippingZones: { ch: "Svizzera", eu: "Europa", world: "Mondiale" },
      styleNames: { modern: "Moderno", classic: "Classico", timeless: "Senza tempo" },
      success: {
        title: "Ordine ricevuto",
        message: "Grazie. Creeremo il tuo album con cura entro 48 ore e ti invieremo il link via e-mail."
      }
    },

    cookieBanner: {
      text: "Questo sito utilizza i cookie per migliorare l'esperienza utente.",
      learnMore: "Scopri di più",
      accept: "Accetta",
      decline: "Rifiuta"
    },

    navAria: {
      main: "Navigazione principale",
      theme: "Tema",
      menu: "Menu",
      close: "Chiudi",
      closePreview: "Chiudi anteprima"
    },

    notFoundPage: {
      title: "Pagina non trovata",
      message: "Questa pagina non esiste.",
      ctaHome: "Vai alla homepage"
    },

    meta: {
      landing: {
        title: "Memora Moments — Un momento. Per sempre.",
        description: "Uno Smart Tag dignitoso e un album fotografico digitale vivo. Per le persone e gli animali che restano nel ricordo."
      },
      selfService: { title: "Carica le immagini — Memora Moments" },
      partner: { title: "Caricamento partner - Memora Moments" }
    },

    selfServicePage: {
      back: "Indietro",
      eyebrow: "Il tuo album inizia qui",
      titleLine1: "Il tuo album inizia",
      titleLine2: "qui.",
      subtitle: "Carichi le tue foto — noi creiamo il tuo album con cura."
    }
  },
  
    human: {
    hero: {
      title: "Ricordi che continuano a vivere – con cuore e suono.",
      subtitle:
        "Un ricordo commemorativo con Smart Tag – basta un tocco con lo smartphone, e si apre l’album digitale della persona amata. I momenti più belli rimangono vivi – nel cuore e in luoghi speciali.",
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

    donation: {
      title: "Fare del bene insieme",
      description: "Per ogni acquisto effettuato direttamente sul nostro sito web, doniamo il 10 % dell’importo dell’acquisto di ogni prodotto Memora Moments alla Fondazione Make-A-Wish, per portare speranza e gioia.",
      linkText: "Scopri di più su Make-A-Wish"
    },

    howitworks: {
      title: "Come funziona",
      subtitle: "Il tuo Memora personale in pochi passaggi.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica", desc: "Selezionate con cura foto, video o messaggi vocali della persona cara e aggiungete un accompagnamento musicale adatto." },
      step3: { title: "Ricevi il tuo Memora", desc: "Il ricordo con Smart-Tag – già collegato al vostro album fotografico digitale – arriverà a casa vostra." }
    },
    products: {
      title: "I nostri Memora:",
      subtitle: "I classici prodotti Memora.",
      basic: { title: "Memora Tag", desc: "Una semplice Smart-Tag che dà vita ai ricordi tramite un album fotografico digitale – discreto e senza tempo.", price: "59 CHF" },
      premium: { title: "Memora Frame", desc: "Una cornice classica unita alla tecnologia moderna. Ogni foto diventa una porta verso ricordi commoventi.", price: "89 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Un’opera di alta qualità che mantiene vivo il passato e tocca il futuro.", price: "149 CHF" },
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
        imagesLabel: "Immagini (max. 50MB per immagine)",
        videosLabel: "Video (max. 50MB per video)",
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
        calendarStyleSelection: {
          title: "Scegli lo stile dell'album",
          modern: "Moderno",
          classic: "Classico",
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
        calendarStyle: "Stile dell'album"
      },

      orderConfirmation: {
        prefix: "Ho letto e accetto i",
        termsLinkText: "Termini e Condizioni",
        separator: "e la",
        privacyLinkText: "Politica sulla privacy",
        suffix: "."
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
        "Un ricordo con Smart Tag – basta un tocco con lo smartphone, e si apre l’album digitale del tuo animale amato. I momenti più belli rimangono vivi – nel cuore e in luoghi speciali.",
      startButton: "Come funziona",
      learnButton: "Scopri di più"
    },
    features: {
      title: "Momenti indimenticabili con il tuo amico",
      subtitle: "Ricordi digitali per animali.",
      unique: { title: "Ricordo affettuoso", desc: "Conservate la fedele compagnia del vostro animale in un ricordo duraturo." },
      multimedia: { title: "Esperienze multimediali", desc: "Ricevete il vostro album fotografico digitale – con foto e video del vostro animale che rendono i ricordi vivi." },
      music: { title: "Suoni preferiti", desc: "Caricate registrazioni del vostro animale o musica nell’album per rendere il ricordo udibile." },
      quality: { title: "Design dignitoso", desc: "Materiali semplici e di qualità che si integrano in ogni casa, dentro o fuori." }
    },

    donation: {
      title: "Aiuto per gli animali in difficoltà",
      description: "Per ogni prodotto Memora Moments acquistato direttamente sul nostro sito web, doniamo il 10 % dell’importo dell’acquisto alla Fondazione Servizio di Soccorso Animali, per aiutare gli animali in difficoltà.",
      linkText: "Maggiori informazioni sul Tierrettungsdienst"
    },

    howitworks: {
      title: "Come funziona",
      subtitle: "Verso il tuo Memora in tre passaggi.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica o suoni", desc: "Scegli foto e video preferiti o anche File audio e aggiungi musica di sottofondo adatta." },
      step3: { title: "Ricevi il tuo Memora", desc: "La vostra Memora con Smart-Tag – già collegata all’album fotografico digitale – arriverà a casa vostra." }
    },
    products: {
      title: "Prodotti per animali",
      subtitle: "Ricordi per compagni fedeli.",
      basic: { title: "Memora Pet Tag", desc: "Una semplice Smart-Tag che dà vita ai ricordi del tuo animale con un album fotografico digitale", price: "da 59 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Una cornice elegante che collega la tua foto preferita a un album fotografico digitale – ideale per casa.", price: "89 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Una piastra in plexiglass esclusiva con supporto – per un ricordo duraturo e dignitoso.", price: "149 CHF" },
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
        imagesLabel: "Immagini (max. 50MB per immagine)",
        videosLabel: "Video (max. 50MB per video)",
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

      orderConfirmation: {
        prefix: "Ho letto e accetto i",
        termsLinkText: "Termini e Condizioni",
        separator: "e la",
        privacyLinkText: "Politica sulla privacy",
        suffix: "."
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
        "Che sia un matrimonio, un compleanno o un anniversario – con Memora Moments rendi i ricordi tangibili. Un semplice tocco con lo smartphone, e l’album dei ricordi digitali si apre – un regalo che tocca il cuore.",
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

    donation: {
      title: "Regalare un sorriso",
      description: "Per ogni acquisto effettuato direttamente sul nostro sito web, doniamo il 10 % dell’importo dell’acquisto di ogni prodotto Memora Moments alla Fondazione Make-A-Wish, per portare speranza e gioia.",
      linkText: "Scopri di più su Make-A-Wish"
    },

    howitworks: {
      title: "Come funziona Sorpresa",
      subtitle: "Tre passaggi fino al momento sorpresa.",
      step1: { title: "Seleziona il prodotto", desc: "Scegli tra Memora Tag, Frame o Deluxe." },
      step2: { title: "Seleziona media e musica", desc: "Scegli foto e video preferiti o anche messaggi vocali e aggiungi musica di sottofondo adatta." },
      step3: { title: "Ricevi la Sorpresa", desc: "Il vostro regalo Memora con Smart-Tag – già collegato all’album fotografico digitale – arriverà a casa vostra." }
    },
    products: {
      title: "Prodotti Sorpresa",
      subtitle: "Scegli il tuo stile.",
      basic: { title: "Memora Surprise Tag", desc: "Una Smart-Tag che collega un album fotografico digitale – originale e unica.", price: "59 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Una cornice elegante che collega la tua foto preferita a un album fotografico digitale – ideale come regalo.", price: "89 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Una piastra in plexiglass esclusiva con tecnologia integrata – il regalo premium elegante per ricordi duraturi.", price: "149 CHF" },
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
        imagesLabel: "Immagini (max. 50MB per immagine)",
        videosLabel: "Video (max. 50MB per video)",
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

      orderConfirmation: {
        prefix: "Ho letto e accetto i",
        termsLinkText: "Termini e Condizioni",
        separator: "e la",
        privacyLinkText: "Politica sulla privacy",
        suffix: "."
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
