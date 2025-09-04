import { ContentData } from './types';

export const frContent: ContentData = {
  shared: {
    navigation: {
      home: 'Accueil',
      gedenken: 'Créer un hommage',
      about: 'À propos',
      contact: 'Contact',
      mode: {
        human: 'Humains',
        pet: 'Animaux',
        surprise: 'Surprise'
      }
    },
    about: {
      title: 'À propos - Memora Moments',
      heading: 'À propos de Memora Moments',
      description: 'Découvrez notre mission : créer des souvenirs dignes.'
    },
    contact: {
      title: 'Contact - Memora Moments',
      heading: 'Nous contacter',
      description: 'Des questions ? Nous sommes là pour vous aider.'
    }
  },

  // --- HUMAN MODE ---
  human: {
    hero: {
      title: 'Des souvenirs qui perdurent — avec cœur et musique.',
      subtitle: 'Memora Moments transforme les souvenirs en un hommage discret, en image et en musique.',
      startButton: 'Commencer',
      learnButton: 'En savoir plus'
    },
    features: {
      title: 'Des instants inoubliables pour l’éternité',
      subtitle: 'Nos plaques NFC allient technologie et dignité.',
      unique: { title: 'Hommage unique', desc: 'Préservez vos plus beaux souvenirs.' },
      multimedia: { title: 'Souvenirs multimédias', desc: 'Des photos et des vidéos qui racontent une vie.' },
      music: { title: 'Ajouter une chanson', desc: 'Enrichissez l’instant avec une musique signifiante.' },
      quality: { title: 'Design digne', desc: 'Matériaux de qualité, résistants aux intempéries.' }
    },
    howitworks: {
      title: 'Comment ça marche',
      subtitle: 'Votre hommage en quelques étapes.',
      step1: { title: 'Télécharger des médias', desc: 'Choisissez photos et vidéos.' },
      step2: { title: 'Choisir une musique', desc: 'Ajoutez une chanson significative.' },
      step3: { title: 'Recevoir la plaque NFC', desc: 'Votre hommage est livré chez vous.' }
    },
    products: {
      title: 'Nos produits',
      subtitle: 'La gamme classique Memora.',
      basic: { title: 'Memora Tag', desc: 'Plaque NFC minimaliste pour souvenirs numériques.', price: 'dès 60 CHF' },
      premium: { title: 'Memora Frame', desc: 'Cadre photo avec NFC intégré.', price: 'dès 120 CHF' },
      deluxe: { title: 'Memora Deluxe', desc: 'Plaque en verre exclusive avec gravure et options avancées.', price: 'dès 200 CHF' },
      features: {
        glass: 'Plaque NFC 6×6 cm',
        nfc: 'Design élégant',
        format: 'Résistant aux intempéries',
        weather: 'Pour pierres tombales, urnes et lieux de mémoire',
        all: 'Cadre avec NFC',
        photo: 'Photo personnelle',
        engraving: 'Gravure en option',
        premium: 'Idéal pour la maison'
      }
    },
    cta: {
      title: 'Commencez votre hommage',
      subtitle: 'Créez votre hommage et préservez l’essentiel.',
      create: 'Créer un hommage',
      contact: 'Nous contacter'
    },
    gedenken: {
      title: 'Créer un hommage - Memora Moments',
      heading: 'Créer votre hommage',
      description: 'Téléchargez vos souvenirs — nous réalisons un hommage digne.'
    }
  },

  // --- PET MODE ---
  pet: {
    hero: {
      title: 'Pour nos fidèles compagnons — des souvenirs avec cœur et musique.',
      subtitle: 'Memora Moments pour animaux — préservez vos plus beaux moments partagés.',
      startButton: 'Commencer',
      learnButton: 'En savoir plus'
    },
    features: {
      title: 'Instants inoubliables avec votre compagnon',
      subtitle: 'Hommages numériques pour animaux.',
      unique: { title: 'Souvenir affectueux', desc: 'Célébrez votre lien avec votre animal.' },
      multimedia: { title: 'Souvenirs pour animaux', desc: 'Photos et vidéos de votre compagnon.' },
      music: { title: 'Sons favoris', desc: 'Ajoutez des sons familiers ou de la musique.' },
      quality: { title: 'Résistant', desc: 'Robuste pour l’intérieur et l’extérieur.' }
    },
    howitworks: {
      title: 'Comment ça marche',
      subtitle: 'Trois étapes pour l’hommage.',
      step1: { title: 'Télécharger des médias', desc: 'Choisissez photos et vidéos.' },
      step2: { title: 'Ajouter sons/musique', desc: 'Incluez un audio significatif.' },
      step3: { title: 'Recevoir la plaque NFC', desc: 'Votre plaque est livrée.' }
    },
    products: {
      title: 'Produits animaux',
      subtitle: 'Souvenirs pour fidèles compagnons.',
      basic: { title: 'Pet Memora Tag', desc: 'Plaque NFC simple pour animaux.', price: 'dès 55 CHF' },
      premium: { title: 'Pet Memora Frame', desc: 'Cadre avec NFC pour animaux.', price: 'dès 110 CHF' },
      deluxe: { title: 'Pet Memora Deluxe', desc: 'Version Deluxe avec gravure et options média étendues.', price: 'dès 180 CHF' },
      features: {
        glass: 'Plaque NFC 6×6 cm, résistante',
        nfc: 'Design affectueux',
        format: 'Formats adaptés aux animaux',
        weather: 'Pour intérieur et extérieur',
        all: 'Cadre avec NFC',
        photo: 'Photo dans le cadre',
        engraving: 'Gravure patte/nom en option',
        premium: 'Idéal pour la maison'
      }
    },
    cta: {
      title: 'Honorez votre compagnon',
      subtitle: 'Créez un souvenir affectueux.',
      create: 'Créer un hommage animal',
      contact: 'Conseil animaux'
    },
    gedenken: {
      title: 'Créer un hommage animal - Memora Moments',
      heading: 'Créer votre hommage animal',
      description: 'Téléchargez les souvenirs de votre compagnon.'
    }
  },

  // --- SURPRISE MODE ---
  surprise: {
    hero: {
      title: 'Des instants de surprise qui touchent.',
      subtitle: 'La collection Surprise allie design et expérience scénarisée.',
      startButton: 'Lancer Surprise',
      learnButton: 'En savoir plus'
    },
    features: {
      title: 'Ce petit quelque chose',
      subtitle: 'Ciselé, subtil et un peu magique.',
      unique: { title: 'Expérience curatoriale', desc: 'Chaque plaque Surprise raconte une petite histoire.' },
      multimedia: { title: 'Image • Vidéo • Son', desc: 'Tous les médias sur une même plaque.' },
      music: { title: 'Signature sonore', desc: 'Une ambiance sonore de bon goût.' },
      quality: { title: 'Matériaux premium', desc: 'Durables, résistants et élégants.' }
    },
    howitworks: {
      title: 'Fonctionnement',
      subtitle: 'Trois étapes pour l’instant.',
      step1: { title: 'Choisir le contenu', desc: 'Photos, clips et musique.' },
      step2: { title: 'Mettre en scène', desc: 'Nous créons une séquence élégante.' },
      step3: { title: 'Recevoir Surprise', desc: 'Touchez et profitez de l’expérience.' }
    },
    products: {
      title: 'Produits Surprise',
      subtitle: 'Choisissez votre style.',
      basic: { title: 'Surprise Tag', desc: 'Plaque NFC minimaliste pour instants surprise.', price: 'dès 70 CHF' },
      premium: { title: 'Surprise Frame', desc: 'Cadre élégant avec expérience intégrée.', price: 'dès 140 CHF' },
      deluxe: { title: 'Surprise Deluxe', desc: 'Version exclusive avec options étendues.', price: 'dès 220 CHF' },
      features: {
        glass: 'Finition robuste',
        nfc: 'Tag NFC intégré',
        format: 'Optimisé pour le multimédia',
        weather: 'Résistant aux intempéries',
        all: 'Cadre avec NFC caché',
        photo: 'Photo en option',
        engraving: 'Gravure en option',
        premium: 'Matériaux raffinés'
      }
    },
    cta: {
      title: 'Prêt pour la surprise ?',
      subtitle: 'Offrez des instants uniques qui durent.',
      create: 'Créer Surprise',
      contact: 'Demander conseil'
    },
    gedenken: {
      title: 'Créer Surprise - Memora Moments',
      heading: 'Votre moment Surprise',
      description: 'Téléchargez votre contenu, nous concevons l’expérience.'
    }
  }
};
