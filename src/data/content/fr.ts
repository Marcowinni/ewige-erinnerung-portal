import { ContentData } from './types';

export const frContent: ContentData = {
  shared: {
    navigation: {
      home: 'Accueil',
      gedenken: 'Créer un hommage',
      about: 'À propos',
      contact: 'Contact',
      start: 'Commencer le mémorial',
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
      description: 'Des questions ? Nous sommes là pour vous aider.',
      email: 'E-mail',
      phone: 'Téléphone',
      form: {
        title: 'Envoyer un message',
        submit: 'Envoyer le message',
        success: 'Merci ! Votre message a été envoyé avec succès.',
        name: {
          label: 'Nom',
          placeholder: 'Votre nom'
        },
        email: {
          label: 'E-mail',
          placeholder: 'votre.email@exemple.fr'
        },
        subject: {
          label: 'Sujet',
          placeholder: 'De quoi s\'agit-il ?'
        },
        message: {
          label: 'Message',
          placeholder: 'Dites-nous comment nous pouvons vous aider...'
        }
      }
    },
    
    // Content rendered on the About page
    aboutPage: {
      title: 'À propos de nous',
      lead: 'Nous connectons les souvenirs à la technologie – avec compassion, personnalisation et accessibilité.',
      story: {
        title: 'Notre histoire',
        p1: 'Memora Moments est née du désir de préserver les souvenirs avec soin et dignité.',
        p2: 'Avec la NFC et le multimédia, nous créons une façon moderne et accessible de se souvenir.',
        p3: 'Nous comprenons l\'importance des hommages significatifs.',
        p4: 'Notre technologie fait le pont entre les souvenirs physiques et numériques.',
        p5: 'Chaque produit est conçu avec respect et attention aux détails.',
      },
      values: {
        title: 'Nos valeurs',
        compassion: {
          title: 'Compassion',
          desc: 'Nous travaillons respectueusement et avec empathie — pour les personnes dans des moments de vie significatifs.'
        },
        personality: {
          title: 'Personnalité',
          desc: 'Chaque hommage est individuel — nous concevons autant que nécessaire, aussi peu que possible.'
        },
        connection: {
          title: 'Connexion',
          desc: 'Images, vidéos et son créent la proximité — à tout moment, sur le lieu du souvenir ou à la maison.'
        }
      },
      product: {
        title: 'Pourquoi Memora ?',
        p1: 'Matériaux de qualité, design résistant aux intempéries et un focus clair sur l\'essentiel.',
        p2: 'Créer facilement, recevoir quelque chose de durable, et partager à tout moment — avec un simple tap.'
      }
    },
    legal: {
      privacy: {
        title: "Politique de confidentialité",
        sections: {
          responsible: {
            title: "1. Responsable",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com\nTéléphone: +41 79 407 56 99"
          },
          dataCollection: {
            title: "2. Collecte et utilisation des données",
            content: "Nous collectons et traitons les données personnelles uniquement dans la mesure nécessaire pour fournir nos services. Cela comprend:",
            list: [
              "Données de contact pour le traitement des commandes",
              "Données de facturation pour le paiement",
              "Images et textes téléchargés par vous pour la personnalisation du produit"
            ]
          },
          imageProcessing: {
            title: "3. Traitement des images",
            content: "Les images que vous téléchargez sont utilisées exclusivement pour créer votre produit personnalisé. Vos images sont stockées en sécurité et supprimées après la finalisation de la commande ou après une période raisonnable.",
            list: []
          },
          rights: {
            title: "4. Vos droits",
            content: "Vous avez le droit d'accéder, de corriger, de supprimer et de limiter le traitement de vos données personnelles. Contactez-nous à info.memora.moments@gmail.com pour les demandes concernant vos données."
          },
          cookies: {
            title: "5. Cookies",
            content: "Notre site web utilise des cookies nécessaires pour la fonctionnalité. Nous n'utilisons des cookies de suivi supplémentaires qu'avec votre consentement."
          }
        }
      },
      terms: {
        title: "Conditions générales",
        sections: {
          scope: {
            title: "1. Champ d'application",
            content: "Ces conditions générales s'appliquent à toutes les commandes et contrats entre Memora Moments et nos clients."
          },
          contract: {
            title: "2. Formation du contrat",
            content: "Le contrat est formé par votre commande et notre confirmation. Nous nous réservons le droit de refuser les commandes en cas d'obstacles techniques ou juridiques."
          },
          prices: {
            title: "3. Prix et conditions de paiement",
            content: "Tous les prix incluent la TVA applicable. Le paiement est dû avant la production. Nous acceptons les moyens de paiement courants."
          },
          delivery: {
            title: "4. Livraison et temps de production",
            content: "Nos produits personnalisés sont fabriqués individuellement. Le temps de production est généralement de 7-14 jours ouvrables après paiement et approbation finale du design."
          },
          services: {
            title: "5. Droits d'auteur et droits d'image",
            content: "Vous confirmez disposer de tous les droits nécessaires sur les images et textes que vous fournissez. Vous nous dégagez des réclamations de tiers concernant les violations de droits d'auteur ou de personnalité."
          },
          cancellation: {
            title: "6. Droit de rétractation",
            content: "S'agissant de produits personnalisés, la rétractation est exclue selon § 312g para. 2 no. 1 BGB une fois la production commencée."
          },
          warranty: {
            title: "7. Garantie",
            content: "Nous garantissons la qualité de nos produits. Pour les défauts, veuillez nous contacter dans les 14 jours suivant la réception."
          },
          contact: {
            title: "8. Contact",
            content: "Pour les questions sur ces conditions générales, contactez-nous à:\nE-Mail: info.memora.moments@gmail.com\nTéléphone: +41 79 407 56 99"
          }
        }
      },
      imprint: {
        title: "Mentions légales",
        sections: {
          info: {
            title: "Informations selon § 5 TMG",
            content: "Memora Moments\nProduits de mémoire personnalisés"
          },
          contact: {
            title: "Contact",
            content: "E-Mail: info.memora.moments@gmail.com\nTéléphone: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsable du contenu selon § 55 para. 2 RStV",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Clause de non-responsabilité",
            content: {
              title: "Responsabilité pour le contenu",
              content: "En tant que prestataire de services, nous sommes responsables de notre propre contenu sur ces pages selon la loi générale selon § 7 para. 1 TMG. Cependant, selon §§ 8 à 10 TMG, nous ne sommes pas obligés de surveiller les informations tierces transmises ou stockées ou d'enquêter sur les circonstances indiquant une activité illégale."
            },
            links: {
              title: "Responsabilité pour les liens",
              content: "Notre site contient des liens vers des sites Web externes de tiers sur le contenu desquels nous n'avons aucune influence. Par conséquent, nous ne pouvons assumer aucune responsabilité pour ce contenu externe. Le fournisseur ou l'opérateur respectif des pages liées est toujours responsable de leur contenu."
            },
            copyright: {
              title: "Droit d'auteur",
              content: "Le contenu et les œuvres créés par les opérateurs du site sur ces pages sont soumis au droit d'auteur allemand. La reproduction, l'édition, la distribution et tout type d'exploitation en dehors des limites du droit d'auteur nécessitent le consentement écrit de l'auteur ou créateur respectif."
            }
          }
        }
      }
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
      title: 'Des instants inoubliables pour l\'éternité',
      subtitle: 'Nos plaques NFC allient technologie et dignité.',
      unique: { title: 'Hommage unique', desc: 'Préservez vos plus beaux souvenirs.' },
      multimedia: { title: 'Souvenirs multimédias', desc: 'Des photos et des vidéos qui racontent une vie.' },
      music: { title: 'Ajouter une chanson', desc: 'Enrichissez l\'instant avec une musique signifiante.' },
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
      subtitle: 'Créez votre hommage et préservez l\'essentiel.',
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
      quality: { title: 'Résistant', desc: 'Robuste pour l\'intérieur et l\'extérieur.' }
    },
    howitworks: {
      title: 'Comment ça marche',
      subtitle: 'Trois étapes pour l\'hommage.',
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
      subtitle: 'Trois étapes pour l\'instant.',
      step1: { title: 'Choisir le contenu', desc: 'Photos, clips et musique.' },
      step2: { title: 'Mettre en scène', desc: 'Nous créons une séquence élégante.' },
      step3: { title: 'Recevoir Surprise', desc: 'Touchez et profitez de l\'expérience.' }
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
      description: 'Téléchargez votre contenu, nous concevons l\'expérience.'
    }
  },
  legal: {
    privacy: {
      title: "Politique de confidentialité",
      sections: {
        responsible: {
          title: "1. Responsable",
          content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com\nTéléphone: +41 79 407 56 99"
        },
        dataCollection: {
          title: "2. Collecte et utilisation des données",
          content: "Nous collectons et traitons les données personnelles uniquement dans la mesure nécessaire pour fournir nos services. Cela comprend:",
          list: [
            "Données de contact pour le traitement des commandes",
            "Données de facturation pour le paiement",
            "Images et textes téléchargés par vous pour la personnalisation du produit"
          ]
        },
        imageProcessing: {
          title: "3. Traitement des images",
          content: "Les images que vous téléchargez sont utilisées exclusivement pour créer votre produit personnalisé. Vos images sont stockées en sécurité et supprimées après la finalisation de la commande ou après une période raisonnable."
        },
        rights: {
          title: "4. Vos droits",
          content: "Vous avez le droit d'accéder, de corriger, de supprimer et de limiter le traitement de vos données personnelles. Contactez-nous à info.memora.moments@gmail.com pour les demandes concernant vos données."
        },
        cookies: {
          title: "5. Cookies",
          content: "Notre site web utilise des cookies nécessaires pour la fonctionnalité. Nous n'utilisons des cookies de suivi supplémentaires qu'avec votre consentement."
        }
      }
    },
    terms: {
      title: "Conditions générales",
      sections: {
        scope: {
          title: "1. Champ d'application",
          content: "Ces conditions générales s'appliquent à toutes les commandes et contrats entre Memora Moments et nos clients."
        },
        contract: {
          title: "2. Formation du contrat",
          content: "Le contrat est formé par votre commande et notre confirmation. Nous nous réservons le droit de refuser les commandes en cas d'obstacles techniques ou juridiques."
        },
        prices: {
          title: "3. Prix et conditions de paiement",
          content: "Tous les prix incluent la TVA applicable. Le paiement est dû avant la production. Nous acceptons les moyens de paiement courants."
        },
        delivery: {
          title: "4. Livraison et temps de production",
          content: "Nos produits personnalisés sont fabriqués individuellement. Le temps de production est généralement de 7-14 jours ouvrables après paiement et approbation finale du design."
        },
        rights: {
          title: "5. Droits d'auteur et droits d'image",
          content: "Vous confirmez disposer de tous les droits nécessaires sur les images et textes que vous fournissez. Vous nous dégagez des réclamations de tiers concernant les violations de droits d'auteur ou de personnalité."
        },
        cancellation: {
          title: "6. Droit de rétractation",
          content: "S'agissant de produits personnalisés, la rétractation est exclue selon § 312g para. 2 no. 1 BGB une fois la production commencée."
        },
        warranty: {
          title: "7. Garantie",
          content: "Nous garantissons la qualité de nos produits. Pour les défauts, veuillez nous contacter dans les 14 jours suivant la réception."
        },
        contact: {
          title: "8. Contact",
          content: "Pour les questions sur ces conditions générales, contactez-nous à:\nE-Mail: info.memora.moments@gmail.com\nTéléphone: +41 79 407 56 99"
        }
      }
    },
    imprint: {
      title: "Mentions légales",
      sections: {
        info: {
          title: "Informations selon § 5 TMG",
          content: "Memora Moments\nProduits de mémoire personnalisés"
        },
        contact: {
          title: "Contact",
          content: "E-Mail: info.memora.moments@gmail.com\nTéléphone: +41 79 407 56 99"
        },
        responsible: {
          title: "Responsable du contenu selon § 55 para. 2 RStV",
          content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
        },
        disclaimer: {
          title: "Clause de non-responsabilité",
          content: {
            title: "Responsabilité pour le contenu",
            content: "En tant que prestataire de services, nous sommes responsables de notre propre contenu sur ces pages selon la loi générale selon § 7 para. 1 TMG. Cependant, selon §§ 8 à 10 TMG, nous ne sommes pas obligés de surveiller les informations tierces transmises ou stockées ou d'enquêter sur les circonstances indiquant une activité illégale."
          },
          links: {
            title: "Responsabilité pour les liens",
            content: "Notre site contient des liens vers des sites Web externes de tiers sur le contenu desquels nous n'avons aucune influence. Par conséquent, nous ne pouvons assumer aucune responsabilité pour ce contenu externe. Le fournisseur ou l'opérateur respectif des pages liées est toujours responsable de leur contenu."
          },
          copyright: {
            title: "Droit d'auteur",
            content: "Le contenu et les œuvres créés par les opérateurs du site sur ces pages sont soumis au droit d'auteur allemand. La reproduction, l'édition, la distribution et tout type d'exploitation en dehors des limites du droit d'auteur nécessitent le consentement écrit de l'auteur ou créateur respectif."
          }
        }
      }
    }
  }
};