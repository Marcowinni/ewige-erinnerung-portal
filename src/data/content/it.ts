import { ContentData } from './types';

export const itContent: ContentData = {
  shared: {
    navigation: {
      home: 'Home',
      gedenken: 'Crea tributo',
      about: 'Chi siamo',
      contact: 'Contatti',
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
      description: 'Domande? Siamo qui per aiutarti.'
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
      title: 'Momenti indimenticabili per l’eternità',
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
      subtitle: 'Tre passi per l’omaggio.',
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
      subtitle: 'Curato, sobrio e un po’ magico.',
      unique: { title: 'Esperienza curata', desc: 'Ogni piastra Surprise racconta una piccola storia.' },
      multimedia: { title: 'Immagine • Video • Suono', desc: 'Tutti i media su un’unica piastra.' },
      music: { title: 'Suono signature', desc: 'Un layer sonoro di buon gusto.' },
      quality: { title: 'Materiali premium', desc: 'Duraturi, resistenti ed eleganti.' }
    },
    howitworks: {
      title: 'Come funziona Surprise',
      subtitle: 'Tre passi al momento.',
      step1: { title: 'Scegli i contenuti', desc: 'Foto, clip e musica.' },
      step2: { title: 'Imposta la scena', desc: 'Creiamo una sequenza elegante.' },
      step3: { title: 'Ricevi Surprise', desc: 'Tocca e vivi l’esperienza.' }
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
      description: 'Carica i contenuti e curiamo l’esperienza.'
    }
  }
};
