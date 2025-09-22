import { ContentData } from './types';

export const frContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Créer un Mémorial",
      about: "À Propos",
      contact: "Contact",
      start: "Commencer un Mémorial",
      mode: { human: "Personnes", pet: "Animaux", surprise: "Surprise" }
    },
    about: {
      title: "À propos de Nous - Memora Moments",
      heading: "À propos de Memora Moments",
      description: "Apprenez-en plus sur notre mission de créer des souvenirs dignes."
    },
    contact: {
      title: "Contact - Memora Moments",
      heading: "Nous Contacter",
      description: "Avez-vous des questions ? Nous sommes là pour vous aider.",
      email: "E-mail",
      phone: "Téléphone",
      form: {
        title: "Envoyer un Message",
        submit: "Envoyer",
        success: "Merci ! Nous vous répondrons dès que possible.",
        name: {
          label: "Nom",
          placeholder: "Prénom et nom de famille"
        },
        email: {
          label: "E-mail",
          placeholder: "votre@exemple.fr"
        },
        subject: {
          label: "Sujet",
          placeholder: "Quel est l'objet de votre message ?"
        },
        message: {
          label: "Message",
          placeholder: "Votre message pour nous…"
        }
      }
    },
    aboutPage: {
      title: "À Propos de Nous",
      lead: "Nous lions les souvenirs à la technologie – avec empathie, personnalité et accessibilité.",
      story: {
        title: "Notre Histoire",
        p1: "Memora Moments est né du désir de préserver les souvenirs avec dignité.",
        p2: "Parfois, ce sont les moments les plus calmes qui changent nos vies pour toujours. Nous avons tous perdu des êtres chers ou des compagnons fidèles qui nous étaient proches – que ce soit un membre de la famille aimé ou un animal de compagnie qui a marqué notre cœur.",
        p3: "Dans ces moments de deuil, nous aspirons à la proximité, à un lieu où les souvenirs ne s'estompent pas mais continuent de vivre. L'idée de Memora Moments est née de cette expérience.",
        p4: "Ce projet est né de l'amour pour nos proches et du désir de préserver leurs histoires et leur singularité. Un petit cadeau, d'abord destiné à nos proches, nous a montré à quel point il est précieux de garder des souvenirs tangibles et vivants – à travers des images, des vidéos et de la musique qui peuvent ramener un sourire.",
        p5: "Aujourd'hui, nous souhaitons partager cette possibilité. Avec nos produits, nous créons des ponts entre le passé et le présent – avec dignité, personnalité et près du cœur. Nous croyons que les souvenirs ne doivent pas se terminer avec un adieu. Ils peuvent continuer à briller, nous consoler et nous donner de la force."
      },
      values: {
        title: "Nos Valeurs",
        compassion: {
          title: "Compassion",
          desc: "Nous travaillons avec respect et empathie – pour les personnes dans des situations de vie particulières."
        },
        personality: {
          title: "Personnalité",
          desc: "Chaque mémorial est unique – nous concevons le nécessaire, et le moins possible."
        },
        connection: {
          title: "Connexion",
          desc: "Les images, les vidéos et le son créent une proximité – à tout moment, sur le lieu du souvenir ou à la maison."
        }
      },
      product: {
        title: "Pourquoi Memora ?",
        p1: "Parce que les souvenirs sont plus que de simples pensées – ils méritent une place digne.",
        p2: "Nos produits Memora allient technologie et émotion – simples, beaux, durables."
      }
    },
    legal: {
      privacy: {
        title: "Politique de Confidentialité",
        sections: {
          responsible: {
            title: "1. Organisme Responsable",
            content: "Memora Moments\nBreitenmattstrasse\n8635 Dürnten\nE-mail : info.memora.moments@gmail.com\nTéléphone : +41 79 407 56 99\n\nNous sommes responsables de la collecte, du traitement et de l'utilisation de vos données personnelles conformément à la loi suisse sur la protection des données (nLPD)."
          },
          dataCollection: {
            title: "2. Collecte et Traitement des Données Personnelles",
            content: "Nous traitons les données personnelles que vous nous fournissez lors de l'utilisation de nos services ou qui sont générées lors de cette utilisation. Cela inclut notamment :",
            list: ["Coordonnées (nom, adresse, e-mail, numéro de téléphone)", "Informations de paiement (selon le mode de paiement choisi, par ex. carte de crédit, TWINT, prépaiement)", "Données de contenu (photos, vidéos, textes, musique/audio) que vous fournissez pour les mémoriaux vidéo personnalisés et les Memoras", "Données d'utilisation (par ex. heure de consultation d'une vidéo via Memora, métadonnées techniques telles que le navigateur/appareil)"]
          },
          purpose: {
            title: "3. Finalité du Traitement des Données",
            content: "Vos données sont utilisées exclusivement aux fins suivantes :",
            list: ["Traitement des commandes et exécution des contrats", "Création, édition et mise à disposition de vidéos commémoratives ainsi que la configuration des tags NFC", "Traitement des paiements et facturation", "Communication avec vous (par ex. confirmation de commande, questions, support)", "Fonctionnement, sécurité et amélioration de nos services"]
          },
          disclosure: {
            title: "4. Divulgation à des Tiers",
            content: "Nous ne vendons pas vos données et ne les transmettons pas à des tiers à des fins publicitaires. La divulgation se fait exclusivement dans la mesure nécessaire aux fins mentionnées ci-dessus, à des sous-traitants soigneusement sélectionnés :",
            list: ["Fournisseurs de services de paiement (par ex. Stripe, TWINT, institutions de cartes de crédit) pour le traitement des paiements", "Fournisseurs de services informatiques, cloud et d'hébergement (par ex. pour l'exploitation du site web, le stockage de données, la création/diffusion de vidéos)", "Fournisseurs de services de messagerie/communication (par ex. pour l'envoi d'e-mails système et de service)", "Partenaires logistiques/de livraison pour l'expédition de produits physiques"]
          },
          storage: {
            title: "5. Stockage et Suppression des Données",
            content: "Les contenus personnalisés (photos, vidéos, audio, textes) ne sont stockés que le temps nécessaire à l'exécution du contrat et à la fourniture des services. Les données des clients sont stockées conformément aux obligations légales de conservation. Sur demande, nous examinerons une suppression anticipée, à condition qu'aucune obligation légale ne s'y oppose."
          },
          security: {
            title: "6. Sécurité des Données",
            content: "Nous utilisons des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre la perte, la manipulation et l'accès non autorisé. Veuillez noter que la transmission de données sur Internet (par ex. par e-mail) peut présenter des failles de sécurité."
          },
          rights: {
            title: "7. Droits des Personnes Concernées",
            content: "Dans le cadre de la législation applicable sur la protection des données, vous disposez notamment des droits suivants. Pour exercer vos droits, veuillez nous contacter à l'adresse mentionnée ci-dessus :",
            list: ["Accès : Consultation des données stockées vous concernant", "Rectification : Correction des données inexactes ou incomplètes", "Suppression : Effacement de vos données, sauf obligation de conservation", "Limitation/Opposition (le cas échéant) : Limitation de certains traitements", "Portabilité des données : Fourniture de vos données dans un format électronique courant"]
          },
          cookies: {
            title: "8. Cookies et Suivi",
            content: "Notre site web utilise des cookies nécessaires pour fournir des fonctions de base. Nous n'utilisons d'autres cookies d'analyse ou de marketing (facultatifs) qu'avec votre consentement. Vous pouvez configurer votre navigateur pour accepter, bloquer ou supprimer les cookies."
          },
          changes: {
            title: "9. Modifications de cette Politique de Confidentialité",
            content: "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. La version actuelle publiée sur notre site web fait foi."
          }
        }
      },
      terms: {
        title: "Conditions Générales de Vente",
        sections: {
          scope: {
            title: "1. Champ d'Application",
            content: "Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les commandes et contrats conclus entre Memora Moments (ci-après « nous ») et les clients (ci-après « vous ») concernant l'achat de tags NFC, de vidéos commémoratives et de contenus numériques associés."
          },
          contract: {
            title: "2. Conclusion du Contrat",
            content: "Le contrat est conclu dès que nous confirmons expressément votre commande par e-mail. Nous pouvons refuser des commandes pour des raisons techniques ou juridiques."
          },
          services: {
            title: "3. Prestations",
            content: "Nos prestations comprennent : la production et la livraison de tags NFC (produits physiques) ; la création et la mise à disposition de vidéos commémoratives personnalisées (contenus numériques) ; l'accès à d'autres contenus numériques liés au produit."
          },
          prices: {
            title: "4. Prix et Conditions de Paiement",
            content: "Tous les prix sont en Francs Suisses (CHF), TVA légale incluse, le cas échéant. Moyens de paiement acceptés : carte de crédit, TWINT, paiement anticipé. Le paiement est dû avant la livraison ou la création des contenus numériques."
          },
          delivery: {
            title: "5. Livraison et Délais de Livraison",
            content: "La livraison des produits a lieu généralement dans les 30 jours suivant la conclusion du contrat. Pour les produits personnalisés, des retards peuvent survenir ; nous vous en informerons immédiatement le cas échéant."
          },
          cancellation: {
            title: "6. Droit de Rétractation et d'Annulation",
            content: "Pour les produits personnalisés et les contenus numériques (par ex. vidéos commémoratives créées individuellement), il n'y a pas de droit de retour. Les dispositions légales s'appliquent aux produits non personnalisés."
          },
          warranty: {
            title: "7. Garantie",
            content: "Nous garantissons que nos produits sont conformes au contrat. Veuillez nous informer de tout défaut dans les 14 jours suivant la réception afin que nous puissions examiner une solution appropriée (réparation, remplacement ou remboursement)."
          },
          liability: {
            title: "7a. Responsabilité",
            content: "Notre responsabilité est limitée aux dommages causés par une faute intentionnelle ou une négligence grave. Nous déclinons toute responsabilité pour les problèmes techniques du côté du client (par ex. connexion Internet insuffisante, appareils incompatibles, paramètres logiciels)."
          },
          ip: {
            title: "8. Droits d'Auteur et Droits d'Utilisation",
            content: "Les contenus que nous créons (par ex. vidéos commémoratives) sont protégés par le droit d'auteur. Vous recevez un droit d'utilisation simple et non transférable pour un usage privé. Toute utilisation commerciale ou divulgation à des tiers est interdite, sauf accord écrit contraire. En téléchargeant des photos, vidéos, audio ou textes, vous confirmez détenir les droits nécessaires ; vous nous garantissez contre toute réclamation de tiers à cet égard."
          },
          privacy: {
            title: "9. Protection des Données",
            content: "Nous traitons les données personnelles exclusivement conformément à notre politique de confidentialité. Cela inclut le stockage et le traitement de vos données pour l'exécution du contrat ainsi que leur transmission à des tiers nécessaires (par ex. prestataires de paiement, hébergement/informatique, expédition). En utilisant nos services, vous acceptez ce traitement."
          },
          special: {
            title: "10. Produits Émotionnels & Notes Spéciales",
            content: "Nos produits ont une grande valeur émotionnelle. Les contenus personnalisés ne peuvent être ni modifiés ni retournés après leur finalisation. En cas de problèmes techniques de notre part (par ex. panne de serveur), nous nous efforcerons de rétablir l'accès le plus rapidement possible ; nous ne pouvons garantir une disponibilité permanente du côté du client."
          },
          law: {
            title: "11. For Juridique et Droit Applicable",
            content: "Le droit suisse est exclusivement applicable. Le for juridique est le siège de Memora Moments."
          },
          final: {
            title: "12. Dispositions Finales",
            content: "Si certaines dispositions de ces CGV s'avéraient nulles, la validité des autres dispositions n'en serait pas affectée. Nous nous réservons le droit de modifier ces CGV à tout moment. La version en vigueur, publiée avec la date et le numéro de version, fait foi."
          },
        }
      },
      imprint: {
        title: "Mentions légales",
        sections: {
          info: {
            title: "Memora Moments",
            content: "Produits commémoratifs personnalisés"
          },
          contact: {
            title: "Contact",
            content:
              "E-mail : info.memora.moments@gmail.com\nTéléphone : +41 79 407 56 99"
          },
          responsible: {
            title: "Responsabilité",
            content: "Memora Moments\nE-mail : info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Clause de non-responsabilité",
            content: {
              title: "Responsabilité pour le contenu",
              content:
                "Le contenu de notre site a été rédigé avec le plus grand soin. Toutefois, nous ne pouvons garantir l’exactitude, l’exhaustivité ou l’actualité des informations. Nous nous réservons le droit de modifier, compléter ou supprimer le contenu à tout moment."
            },
            links: {
              title: "Responsabilité pour les liens",
              content:
                "Notre site contient des liens vers des sites web externes de tiers sur lesquels nous n’avons aucune influence. Par conséquent, nous déclinons toute responsabilité quant à ces contenus externes. Le fournisseur ou l’exploitant respectif des pages est toujours responsable du contenu des pages liées."
            },
            copyright: {
              title: "Droit d’auteur",
              content:
                "Le contenu et les œuvres de ce site sont soumis au droit d’auteur suisse. Toute reproduction, modification, distribution ou exploitation en dehors des limites de la loi sur le droit d’auteur nécessite l’accord écrit préalable de l’auteur ou du titulaire des droits. Les téléchargements et copies de ce site ne sont autorisés que pour un usage privé."
            }
          }
        }
      }

    },
    footer: {
      brand: {
        name: "Memora Moments",
        description: "Moments commémoratifs numériques – conçus avec dignité, résistants aux intempéries et faciles à partager."
      },
      contactTitle: "Contact",
      linksTitle: "Liens",
      legal: {
        privacy: "Confidentialité",
        terms: "CGV",
        imprint: "Mentions légales"
      },
      copyright: "Tous droits réservés."
    }
  },
  human: {
    hero: {
      title: "Des souvenirs qui perdurent – avec cœur et musique.",
      subtitle: "De moments naît un mémorial silencieux – Memora Moments ouvre la porte à des histoires qui restent. Images, vidéos et musique maintiennent le souvenir vivant, là où il doit être : près du cœur.",
      startButton: "Comment ça marche ?",
      learnButton: "En savoir plus"
    },
    features: {
      title: "Des moments inoubliables pour l'éternité",
      subtitle: "Nos Memora Moments allient technologie moderne et souvenir digne.",
      unique: { title: "Mémorial unique", desc: "Rendez hommage à la vie d'un être cher avec un souvenir impérissable." },
      multimedia: { title: "Souvenirs multimédias", desc: "Les photos et les vidéos permettent de revivre des moments spéciaux." },
      music: { title: "Intégrer une musique de fond", desc: "La musique crée une proximité et fait vivre les émotions." },
      quality: { title: "Conception digne", desc: "Des matériaux simples et de haute qualité qui s'intègrent harmonieusement dans n'importe quelle tombe ou maison." }
    },
    howitworks: {
      title: "C'est aussi simple que ça",
      subtitle: "Votre Memora personnel en quelques étapes.",
      step1: { title: "Choisir le produit", desc: "Choisissez entre Memora Tag, Frame ou Deluxe." },
      step2: { title: "Choisir les médias et la musique", desc: "Choisissez vos photos et vidéos préférées ou même des messages vocaux et ajoutez une musique de fond appropriée." },
      step3: { title: "Recevoir le Memora", desc: "Votre Memora vous est livré à domicile." }
    },
    products: {
      title: "Nos Memoras :",
      subtitle: "Les produits Memora classiques.",
      basic: { title: "Memora Tag", desc: "Une simple plaque en plexiglas qui donne vie aux souvenirs via un album photo numérique – discret et impérissable.", price: "49 CHF" },
      premium: { title: "Memora Frame", desc: "Un cadre photo classique, associé à la technologie moderne. Ainsi, chaque photo devient une porte vers des souvenirs émouvants.", price: "79 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Une œuvre d'art de haute qualité qui maintient le passé en vie et touche l'avenir.", price: "129 CHF" },
      features: {
        tag1: "Plaque en plexiglas de 6×6 cm ou 3 cm ⌀",
        tag2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        tag3: "Design minimaliste et intemporel, s'intègre harmonieusement",
        tag4: "Pour les pierres tombales, les urnes, les lieux de mémoire",
        premium1: "Plaque en plexiglas de 3 cm ⌀ – relie l'image et le mémorial numérique",
        premium2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        premium3: "Personnalisation avec votre propre photo",
        premium4: "Idéal pour la maison, les coins commémoratifs ou comme cadeau",
        deluxe1: "Plaque en plexiglas de haute qualité de 12×12 cm avec une finition noble",
        deluxe2: "Conception individuelle avec votre propre photo et texte",
        deluxe3: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        deluxe4: "Présentation avec un support élégant"
      }
    },
    cta: {
      title: "Honorez vos proches",
      subtitle: "Créez votre mémorial et préservez les souvenirs.",
      create: "Créer un mémorial",
      contact: "Nous contacter"
    },
    gedenken: {
      title: "Créer un mémorial - Memora Moments",
      heading: "Créez votre mémorial !",
      description: "Téléchargez des souvenirs et nous créerons un mémorial digne."
    },
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Choisir le produit:"},
        step1Subtitle: "Choisissez votre produit – vous téléchargerez les contenus à l'étape suivante.",
        step2ByMode: { human: "Informations sur la personne"},
        step2Subtitle: "Veuillez remplir les champs suivants. Les notes sont facultatives.",
        step3Title: "Télécharger des images et des vidéos",
        step3Subtitle: "Les fichiers sont enregistrés dans le formulaire et envoyés ultérieurement.",
        step4Title: "Coordonnées",
        step4Subtitle: "Nous utilisons ces données pour les questions et la confirmation de commande.",
        step5Title: "Informations de facturation et aperçu",
        step5Subtitle: "Veuillez vérifier l'adresse et le résumé. Avec 'Passer au paiement !', vous accéderez plus tard au paiement.",
        summary: "Résumé"
      },
      buttons: {
        back: "Retour",
        next: "Suivant",
        reset: "Réinitialiser",
        toPay: "Passer au paiement",
        addText: "Ajouter du texte",
        applyDesign: "Appliquer le design",
        remove: "Supprimer",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Concevoir le cadre",
        formatTitleDeluxe: "Concevoir le Deluxe",
        roundLabel: "Rond · Ø 3 cm",
        squareLabel: "Carré · 6×6 cm",
        petOptionsTitle: "Options pour le Memora Tag pour animaux",
        keychainLabel: "avec porte-clés (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Personnalisable (+10 CHF)",
        designCustomNote: "Remarque : le design personnalisé coûte +10 CHF supplémentaires.",
        frameTip:"Astuce : Déplacez l'image avec la souris/le toucher et ajoutez et positionnez librement les textes.",
        frameOrientationLabel: "Orientation",
        framePortrait: "Portrait",
        frameLandscape: "Paysage",
      },
      editor: {
        image: "Image",
        zoom: "Zoom",
        posX: "Position horizontale",
        posY: "Position verticale",
        emptyTitle: "Aucune image sélectionnée",
        emptySub: "Veuillez sélectionner une image ci-dessus",
        selectedText: "Texte sélectionné",
        content: "Contenu",
        font: "Police",
        size: "Taille",
        color: "Couleur",
        previewLabel: "Aperçu adopté",
        previewNote: "Cet aperçu sera enregistré avec la commande."
      },
      step2Fields: {
        human_lastName: "Nom de famille *",
        human_firstName: "Prénom *",
        human_deathDate: "Date de décès",
        notes_human: "Notes (facultatif)",
        human_notesPH: "Souhaits particuliers, citations, notes de musique…",
        pet_name: "Nom de l'animal *",
        pet_deathDate: "Date de décès *",
        pet_notesPH: "Souhaits particuliers, bruits préférés, notes…",
        surprise_name: "Nom (destinataire) *",
        surprise_notesPH: "Mariage, anniversaire, jubilé… souhaits particuliers"
      },
      step3Fields: {
        imagesLabel: "Images (plusieurs possibles)",
        videosLabel: "Vidéos (plusieurs possibles)",
        remove: "Supprimer",
        imageCaptionPlaceholder: "Court texte pour l'image (facultatif)",
        videoCaptionPlaceholder: "Court texte pour la vidéo (facultatif)",
        musicSelection: {
          title: "Choisir la musique",
          availableMusic: "Musique disponible",
          selected: "Sélectionné",
          select: "Sélectionner",
          moreMusic: "Plus de musique de Pixabay",
          pixabayPlaceholder: "Coller le lien de pixabay.com/music/...",
          pixabayButton: "Pixabay Music",
        },
      },
      contactFields: {
        firstName: "Prénom *",
        lastName: "Nom de famille *",
        email: "E-mail *",
        phoneOpt: "Téléphone (facultatif)"
      },
      invoiceFields: {
        sameAsContact: "Adresse de facturation identique à l'adresse de contact",
        companyOpt: "Entreprise (facultatif)",
        firstName: "Prénom *",
        lastName: "Nom de famille *",
        street: "Rue et n° *",
        zip: "Code postal *",
        city: "Ville *",
        country: "Pays *"
      },
      summary: {
        mode: "Mode",
        product: "Produit",
        format: "Format",
        formatRound: "Rond Ø 3 cm",
        formatSquare: "Carré 6×6 cm",
        options: "Options",
        person: "Personne",
        pet: "Animal",
        recipient: "Destinataire",
        notes: "Notes",
        counts: (imgs, vids) => `Images : ${imgs} • Vidéos : ${vids}`,
        previewTitle: "Aperçu personnalisé",
        total: "Total :",
        optionOrientation: "Orientation",
        optionPortrait: "Portrait",
        optionLandscape: "Paysage",
        modeHuman: "Personnes",
        modePet: "Animaux",
        modeSurprise: "Surprise",
      },
      privacyNotice: {
        text: "En téléchargeant des images, vous acceptez notre",
        privacyLink: "Politique de confidentialité",
        and: "et nos",
        termsLink: "Conditions d'utilisation",
        agreed: ".",
      }
    }
  },
  pet: {
    hero: {
      title: "Pour nos fidèles compagnons – des souvenirs avec cœur et son.",
      subtitle: "Nos animaux de compagnie nous donnent de l'amour, de la fidélité et de la joie. Avec Memora Moments, leur souvenir reste vivant – dans le cœur et dans des lieux spéciaux.",
      startButton: "Comment ça marche ?",
      learnButton: "En savoir plus"
    },
    features: {
      title: "Des moments inoubliables avec votre chéri",
      subtitle: "Souvenirs numériques pour animaux de compagnie.",
      unique: { title: "Souvenir affectueux", desc: "Moments spéciaux avec votre animal de compagnie." },
      multimedia: { title: "Expériences multimédias", desc: "Photos et vidéos de votre chéri." },
      music: { title: "Sons préférés", desc: "L'aboiement familier, le miaulement ou une chanson qui relie." },
      quality: { title: "Conception digne", desc: "Des matériaux simples et de haute qualité qui s'intègrent harmonieusement dans n'importe quelle maison, que ce soit à l'intérieur ou à l'extérieur." }
    },
    howitworks: {
      title: "C'est aussi simple que ça",
      subtitle: "Votre Memora en trois étapes.",
      step1: { title: "Choisir le produit", desc: "Choisissez entre Memora Tag, Frame ou Deluxe." },
      step2: { title: "Choisir les médias et la musique ou les sons", desc: "Choisissez vos photos et vidéos préférées ou même des messages vocaux et ajoutez une musique de fond appropriée." },
      step3: { title: "Recevoir le Memora", desc: "Votre Memora est livré." }
    },
    products: {
      title: "Produits pour animaux de compagnie",
      subtitle: "Souvenirs pour de fidèles compagnons.",
      basic: { title: "Memora Pet Tag", desc: "Une simple plaque en plexiglas qui donne vie aux souvenirs de votre animal de compagnie avec un album photo numérique", price: "dès 49 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Un cadre photo élégant qui relie votre photo préférée à un album photo numérique – idéal pour la maison.", price: "79 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Une plaque en plexiglas exclusive avec support – pour un souvenir durable et digne.", price: "129 CHF" },
      features: {
        tag1: "Plaque en plexiglas de 6×6 cm ou 3 cm ⌀",
        tag2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        tag3: "Design minimaliste et intemporel, s'intègre harmonieusement",
        tag4: "Option : standard simple, conçu individuellement ou en porte-clés",
        premium1: "Plaque en plexiglas de 3 cm ⌀ – relie l'image et le mémorial numérique",
        premium2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        premium3: "Personnalisation avec votre propre photo",
        premium4: "Idéal pour la maison ou comme cadeau",
        deluxe1: "Plaque en plexiglas de haute qualité de 12×12 cm avec une finition noble",
        deluxe2: "Conception individuelle avec votre propre photo et texte",
        deluxe3: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        deluxe4: "Présentation avec un support élégant"
      }
    },
    cta: {
      title: "Honorez votre chéri",
      subtitle: "Une maison dans le cœur – préservez le souvenir de votre fidèle compagnon.",
      create: "Créer un souvenir",
      contact: "Nous contacter"
    },
    gedenken: {
      title: "Créer un mémorial pour animaux de compagnie - Memora Moments",
      heading: "Mémorial pour votre animal de compagnie",
      description: "Téléchargez les souvenirs de votre chéri."
    },
    uploaderCopy: {
      headings: {
        pageTitleByMode: { pet: "Choisir le produit :" },
        step1Subtitle: "Choisissez votre produit – vous téléchargerez les contenus à l'étape suivante.",
        step2ByMode: { pet: "Informations sur l'animal"},
        step2Subtitle: "Veuillez remplir les champs suivants. Les notes sont facultatives.",
        step3Title: "Télécharger des images et des vidéos",
        step3Subtitle: "Les fichiers sont enregistrés dans le formulaire et envoyés ultérieurement.",
        step4Title: "Coordonnées",
        step4Subtitle: "Nous utilisons ces données pour les questions et la confirmation de commande.",
        step5Title: "Informations de facturation et aperçu",
        step5Subtitle: "Veuillez vérifier l'adresse et le résumé. Avec 'Passer au paiement !', vous accéderez plus tard au paiement.",
        summary: "Résumé"
      },
      buttons: {
        back: "Retour",
        next: "Suivant",
        reset: "Réinitialiser",
        toPay: "Passer au paiement",
        addText: "Ajouter du texte",
        applyDesign: "Appliquer le design",
        remove: "Supprimer",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Concevoir le cadre",
        formatTitleDeluxe: "Concevoir le Deluxe",
        roundLabel: "Rond · Ø 3 cm",
        squareLabel: "Carré · 6×6 cm",
        petOptionsTitle: "Options pour le Memora Tag pour animaux",
        keychainLabel: "avec porte-clés (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Personnalisable (+10 CHF)",
        designCustomNote: "Remarque : le design personnalisé coûte +10 CHF supplémentaires.",
        frameTip:"Astuce : Déplacez l'image avec la souris/le toucher et ajoutez et positionnez librement les textes.",
        frameOrientationLabel: "Orientation",
        framePortrait: "Portrait",
        frameLandscape: "Paysage",
      },
      editor: {
        image: "Image",
        zoom: "Zoom",
        posX: "Position horizontale",
        posY: "Position verticale",
        emptyTitle: "Aucune image sélectionnée",
        emptySub: "Veuillez sélectionner une image ci-dessus",
        selectedText: "Texte sélectionné",
        content: "Contenu",
        font: "Police",
        size: "Taille",
        color: "Couleur",
        previewLabel: "Aperçu adopté",
        previewNote: "Cet aperçu sera enregistré avec la commande."
      },
      step2Fields: {
        pet_name: "Nom de l'animal *",
        pet_deathDate: "Date de décès",
        notes_human: "Notes supplémentaires",
        pet_notesPH: "Souhaits particuliers, bruits préférés, notes…",
      },
      step3Fields: {
        imagesLabel: "Images (plusieurs possibles)",
        videosLabel: "Vidéos (plusieurs possibles)",
        remove: "Supprimer",
        imageCaptionPlaceholder: "Court texte pour l'image (facultatif)",
        videoCaptionPlaceholder: "Court texte pour la vidéo (facultatif)",
        musicSelection: {
          title: "Choisir la musique",
          availableMusic: "Musique disponible",
          selected: "Sélectionné",
          select: "Sélectionner",
          moreMusic: "Plus de musique de Pixabay",
          pixabayPlaceholder: "Coller le lien de pixabay.com/music/...",
          pixabayButton: "Pixabay Music",
        },
      },
      contactFields: {
        firstName: "Prénom *",
        lastName: "Nom de famille *",
        email: "E-mail *",
        phoneOpt: "Téléphone (facultatif)"
      },
      invoiceFields: {
        sameAsContact: "Adresse de facturation identique à l'adresse de contact",
        companyOpt: "Entreprise (facultatif)",
        firstName: "Prénom *",
        lastName: "Nom de famille *",
        street: "Rue et n° *",
        zip: "Code postal *",
        city: "Ville *",
        country: "Pays *"
      },
      summary: {
        mode: "Mode",
        product: "Produit",
        format: "Format",
        formatRound: "Rond Ø 3 cm",
        formatSquare: "Carré 6×6 cm",
        options: "Options",
        person: "Personne",
        pet: "Animal",
        recipient: "Destinataire",
        notes: "Notes",
        counts: (imgs, vids) => `Images : ${imgs} • Vidéos : ${vids}`,
        previewTitle: "Aperçu personnalisé",
        total: "Total :",
        optionOrientation: "Orientation",
        optionPortrait: "Portrait",
        optionLandscape: "Paysage",
        modeHuman: "Personnes",
        modePet: "Animaux",
        modeSurprise: "Surprise",
      },
      privacyNotice: {
        text: "En téléchargeant des images, vous acceptez notre",
        privacyLink: "Politique de confidentialité",
        and: "et nos",
        termsLink: "Conditions d'utilisation",
        agreed: ".",
      }
    }
  },
  surprise: {
    hero: {
      title: "Un cadeau qui touche les cœurs – des surprises inoubliables.",
      subtitle: "Que ce soit pour un mariage, un anniversaire ou un jubilé – avec Memora Moments, vous rendez les souvenirs tangibles. Photos, vidéos et musique deviennent un cadeau unique qui reste.",
      startButton: "Comment ça marche ?",
      learnButton: "En savoir plus"
    },
    features: {
      title: "Ce petit quelque chose en plus",
      subtitle: "Simple, digne et plein de sens.",
      unique: { title: "Surprise unique", desc: "Chaque Surprise raconte une petite histoire." },
      multimedia: { title: "Expériences multimédias", desc: "Photos, vidéos et musique rendent votre cadeau vivant et émotionnel." },
      music: { title: "Musique et messages", desc: "Ajoutez une musique de fond ou un message vocal personnel." },
      quality: { title: "Design élégant", desc: "Minimaliste et de haute qualité – adapté à chaque occasion et à chaque célébration." }
    },
    howitworks: {
      title: "Comment fonctionne Surprise",
      subtitle: "Trois étapes pour le moment de surprise.",
      step1: { title: "Choisir le produit", desc: "Choisissez entre Memora Tag, Frame ou Deluxe." },
      step2: { title: "Choisir les médias et la musique", desc: "Choisissez vos photos et vidéos préférées ou même des messages vocaux et ajoutez une musique de fond appropriée." },
      step3: { title: "Recevoir la Surprise", desc: "Votre Memora est livré directement chez vous." }
    },
    products: {
      title: "Produits Surprise",
      subtitle: "Choisissez votre style.",
      basic: { title: "Memora Surprise Tag", desc: "Une petite plaque en plexiglas qui relie un album photo numérique – original et unique.", price: "49 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Un cadre photo élégant qui relie votre photo préférée à un album photo numérique – idéal comme cadeau.", price: "79 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Une plaque en plexiglas exclusive avec technologie intégrée – le cadeau premium élégant pour des souvenirs durables.", price: "129 CHF" },
      features: {
        tag1: "Plaque en plexiglas de 6×6 cm ou 3 cm ⌀",
        tag2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        tag3: "Design minimaliste et intemporel, s'intègre harmonieusement",
        tag4: "Une surprise qui suscite des émotions et reste longtemps en mémoire",
        premium1: "Plaque en plexiglas de 3 cm ⌀ – relie l'image et le mémorial numérique",
        premium2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        premium3: "Personnalisation avec votre propre photo",
        premium4: "Le cadeau parfait pour les anniversaires, les mariages ou les jubilés",
        deluxe1: "Plaque en plexiglas de haute qualité de 12×12 cm avec une finition noble",
        deluxe2: "Conception individuelle avec votre propre photo et texte",
        deluxe3: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        deluxe4: "Présentation avec un support élégant"
      }
    },
    cta: {
      title: "Prêt pour votre moment de surprise ?",
      subtitle: "Surprise offre des moments uniques.",
      create: "Créer une surprise",
      contact: "Nous contacter"
    },
    gedenken: {
      title: "Créer une surprise - Memora Moments",
      heading: "Votre moment Surprise",
      description: "Téléchargez du contenu et nous concevrons votre expérience."
    },
    uploaderCopy: {
      headings: {
        pageTitleByMode: { surprise: "Choisir le produit (Surprise)" },
        step1Subtitle: "Choisissez votre produit – vous téléchargerez les contenus à l'étape suivante.",
        step2ByMode: { surprise: "Informations pour la Surprise" },
        step2Subtitle: "Veuillez remplir les champs suivants. Les notes sont facultatives.",
        step3Title: "Télécharger des images et des vidéos",
        step3Subtitle: "Les fichiers sont enregistrés dans le formulaire et envoyés ultérieurement.",
        step4Title: "Coordonnées",
        step4Subtitle: "Nous utilisons ces données pour les questions et la confirmation de commande.",
        step5Title: "Informations de facturation et aperçu",
        step5Subtitle: "Veuillez vérifier l'adresse et le résumé. Avec 'Passer au paiement !', vous accéderez plus tard au paiement.",
        summary: "Résumé"
      },
      buttons: {
        back: "Retour",
        next: "Suivant",
        reset: "Réinitialiser",
        toPay: "Passer au paiement",
        addText: "Ajouter du texte",
        applyDesign: "Appliquer le design",
        remove: "Supprimer",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Concevoir le cadre",
        formatTitleDeluxe: "Concevoir le Deluxe",
        roundLabel: "Rond · Ø 3 cm",
        squareLabel: "Carré · 6×6 cm",
        petOptionsTitle: "Options pour le Memora Tag pour animaux",
        frameTip:"Astuce : Déplacez l'image avec la souris/le toucher et ajoutez et positionnez librement les textes.",
        frameOrientationLabel: "Orientation",
        framePortrait: "Portrait",
        frameLandscape: "Paysage",
      },
      editor: {
        image: "Image",
        zoom: "Zoom",
        posX: "Position horizontale",
        posY: "Position verticale",
        emptyTitle: "Aucune image sélectionnée",
        emptySub: "Veuillez sélectionner une image ci-dessus",
        selectedText: "Texte sélectionné",
        content: "Contenu",
        font: "Police",
        size: "Taille",
        color: "Couleur",
        previewLabel: "Aperçu adopté",
        previewNote: "Cet aperçu sera enregistré avec la commande."
      },
      step2Fields: {
        surprise_name: "Nom (destinataire) *",
        notes_human: "Occasion / Notes",
        surprise_notesPH: "Mariage, anniversaire, jubilé… souhaits particuliers…"
      },
      step3Fields: {
        imagesLabel: "Images (plusieurs possibles)",
        videosLabel: "Vidéos (plusieurs possibles)",
        remove: "Supprimer",
        imageCaptionPlaceholder: "Court texte pour l'image (facultatif)",
        videoCaptionPlaceholder: "Court texte pour la vidéo (facultatif)",
        musicSelection: {
          title: "Choisir la musique",
          availableMusic: "Musique disponible",
          selected: "Sélectionné",
          select: "Sélectionner",
          moreMusic: "Plus de musique de Pixabay",
          pixabayPlaceholder: "Coller le lien de pixabay.com/music/...",
          pixabayButton: "Pixabay Music",
        },
      },
      contactFields: {
        firstName: "Prénom *",
        lastName: "Nom de famille *",
        email: "E-mail *",
        phoneOpt: "Téléphone (facultatif)"
      },
      invoiceFields: {
        sameAsContact: "Adresse de facturation identique à l'adresse de contact",
        companyOpt: "Entreprise (facultatif)",
        firstName: "Prénom *",
        lastName: "Nom de famille *",
        street: "Rue et n° *",
        zip: "Code postal *",
        city: "Ville *",
        country: "Pays *"
      },
      summary: {
        mode: "Mode",
        product: "Produit",
        format: "Format",
        formatRound: "Rond Ø 3 cm",
        formatSquare: "Carré 6×6 cm",
        options: "Options",
        person: "Personne",
        pet: "Animal",
        recipient: "Destinataire",
        notes: "Notes",
        counts: (imgs, vids) => `Images : ${imgs} • Vidéos : ${vids}`,
        previewTitle: "Aperçu personnalisé",
        total: "Total :",
        optionOrientation: "Orientation",
        optionPortrait: "Portrait",
        optionLandscape: "Paysage",
        modeHuman: "Personnes",
        modePet: "Animaux",
        modeSurprise: "Surprise",
      },
      privacyNotice: {
        text: "En téléchargeant des images, vous acceptez notre",
        privacyLink: "Politique de confidentialité",
        and: "et nos",
        termsLink: "Conditions d'utilisation",
        agreed: ".",
      }
    }
  }
};