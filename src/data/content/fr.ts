import { ContentData } from './types';

export const frContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Créer un mémorial",
      about: "À propos de nous",
      contact: "Contact",
      start: "Commencer le mémorial",
      mode: { human: "Personnes", pet: "Animaux", surprise: "Surprise" }
    },

    about: {
      title: "À propos de nous - Memora Moments",
      heading: "À propos de Memora Moments",
      description: "Apprenez-en plus sur notre mission de créer des souvenirs dignes."
    },

    contact: {
      title: "Contact - Memora Moments",
      heading: "Nous contacter",
      description: "Avez-vous des questions? Nous sommes là pour vous aider.",
      email: "E-mail",
      phone: "Téléphone",
      form: {
        title: "Envoyer un message",
        submit: "Envoyer",
        success: "Merci ! Nous vous répondrons dès que possible.",
        name: {
          label: "Nom",
          placeholder: "Prénom et nom"
        },
        email: {
          label: "E-mail",
          placeholder: "votre@exemple.fr"
        },
        subject: {
          label: "Sujet",
          placeholder: "De quoi s'agit-il ?"
        },
        message: {
          label: "Message",
          placeholder: "Votre message pour nous…"
        }
      }
    },

    aboutPage: {
      title: "À propos de nous",
      lead: "Nous connectons les souvenirs à la technologie – avec empathie, personnalité et accessibilité.",
      story: {
        title: "Notre histoire",
        p1: "Memora Moments est né du désir de préserver les souvenirs avec dignité.",
        p2: "Parfois, ce sont les moments silencieux qui changent nos vies pour toujours. Nous avons tous perdu des personnes ou des compagnons fidèles qui nous étaient particulièrement chers – que ce soit un membre de la famille bien-aimé ou un animal de compagnie qui a marqué notre cœur.",
        p3: "Dans ces moments de deuil, nous aspirons à la proximité, à un lieu où les souvenirs ne s'effacent pas mais continuent de vivre. L'idée de Memora Moments est née précisément de cette expérience.",
        p4: "Ce projet est né de l'amour pour nos proches et du désir de préserver leurs histoires et leur unicité. Un petit cadeau, initialement destiné uniquement à nos proches, nous a montré à quel point il peut être précieux de garder les souvenirs tangibles et vivants – à travers des images, des vidéos et de la musique qui peuvent ramener un sourire.",
        p5: "Aujourd'hui, nous souhaitons partager cette opportunité avec d'autres. Avec nos produits, nous créons des ponts entre le passé et le présent – dignes, personnels et proches du cœur. Nous croyons que les souvenirs ne doivent pas se terminer avec l'adieu. Ils peuvent continuer à briller, nous réconforter et nous donner de la force."
      },
      values: {
        title: "Nos valeurs",
        compassion: {
          title: "Compassion",
          desc: "Nous travaillons avec respect et empathie – pour les personnes dans des situations de vie particulières."
        },
        personality: {
          title: "Personnalité",
          desc: "Chaque mémorial est individuel – nous concevons autant que nécessaire, et le moins possible."
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
        title: "Déclaration de confidentialité",
        sections: {
          responsible: {
            title: "1. Organisme responsable",
            content: "Memora Moments\n[Insérer l'adresse]\n[Code postal, Ville]\n[N° de registre du commerce, si applicable]\nE-mail : info.memora.moments@gmail.com\nTéléphone : +41 79 407 56 99\n\nNous sommes responsables de la collecte, du traitement et de l'utilisation de vos données personnelles conformément à la loi suisse sur la protection des données (nLPD)."
          },
          dataCollection: {
            title: "2. Collecte et traitement des données personnelles",
            content: "Nous traitons les données personnelles que vous nous fournissez dans le cadre de l'utilisation de nos services ou qui sont générées lors de leur utilisation. Celles-ci comprennent notamment :",
            list: [
              "Coordonnées (nom, adresse, e-mail, numéro de téléphone)",
              "Informations de paiement (selon le mode de paiement choisi, par ex. carte de crédit, TWINT, paiement anticipé)",
              "Données de contenu (photos, vidéos, textes, musique/audio) que vous fournissez pour des vidéos commémoratives personnalisées et des Memoras",
              "Données d'utilisation (par ex. heure de consultation d'une vidéo via Memora, métadonnées techniques telles que navigateur/appareil)"
            ]
          },
          purpose: {
            title: "3. Finalité du traitement des données",
            content: "Vos données sont utilisées exclusivement aux fins suivantes :",
            list: [
              "Traitement des commandes et exécution du contrat",
              "Création, édition et mise à disposition de vidéos commémoratives ainsi que configuration des balises NFC",
              "Traitement des paiements et facturation",
              "Communication avec vous (par ex. confirmation de commande, questions, support)",
              "Exploitation, sécurité et amélioration de nos services"
            ]
          },
          disclosure: {
            title: "4. Transmission à des tiers",
            content: "Nous ne vendons pas vos données et ne les transmettons pas à des tiers à des fins publicitaires. Une transmission n'a lieu que si cela est nécessaire aux fins susmentionnées, à des sous-traitants soigneusement sélectionnés :",
            list: [
              "Prestataires de services de paiement (par ex. Stripe, TWINT, instituts de cartes de crédit) pour le traitement des paiements",
              "Prestataires de services informatiques, cloud et d'hébergement (par ex. pour l'exploitation du site web, le stockage de données, la création/diffusion de vidéos)",
              "Prestataires de services de messagerie/communication (par ex. envoi d'e-mails système et de service)",
              "Partenaires logistiques/de livraison pour l'expédition de produits physiques"
            ]
          },
          storage: {
            title: "5. Stockage et suppression des données",
            content: "Les contenus personnalisés (photos, vidéos, audio, textes) ne sont conservés que le temps nécessaire à l'exécution du contrat et à la fourniture du service. Les données des clients sont conservées conformément aux obligations légales de conservation. Sur votre demande, nous examinerons une suppression anticipée, dans la mesure où aucune obligation légale ne s'y oppose."
          },
          security: {
            title: "6. Sécurité des données",
            content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre la perte, la manipulation et l'accès non autorisé. Veuillez noter que la transmission de données sur Internet (par ex. par e-mail) peut présenter des failles de sécurité."
          },
          rights: {
            title: "7. Droits des personnes concernées",
            content: "Dans le cadre du droit de la protection des données applicable, vous disposez notamment des droits suivants. Pour exercer vos droits, veuillez nous contacter à l'adresse mentionnée ci-dessus :",
            list: [
              "Information : Consultation des données stockées vous concernant",
              "Rectification : Correction des données inexactes ou incomplètes",
              "Suppression : Suppression de vos données, dans la mesure où il n'existe aucune obligation de conservation",
              "Limitation/Opposition (le cas échéant) : Limitation de certains traitements",
              "Portabilité des données : Remise de vos données dans un format électronique courant"
            ]
          },
          cookies: {
            title: "8. Cookies et suivi",
            content: "Notre site web utilise des cookies nécessaires pour fournir des fonctions de base. Nous n'utilisons d'autres cookies d'analyse ou de marketing (facultatifs) qu'avec votre consentement. Vous pouvez définir dans votre navigateur si les cookies doivent être acceptés, bloqués ou supprimés."
          },
          changes: {
            title: "9. Modifications de cette déclaration de confidentialité",
            content: "Nous nous réservons le droit d'adapter cette déclaration de confidentialité à tout moment. La version actuelle publiée sur notre site web fait foi."
          }
        }
      },
      terms: {
        title: "Conditions générales de vente",
        sections: {
          scope: {
            title: "1. Champ d'application",
            content: "Les présentes conditions générales de vente (CGV) s'appliquent à toutes les commandes et à tous les contrats conclus entre Memora Moments (ci-après « nous ») et les clients (ci-après « vous ») dans le cadre de l'achat de balises NFC, de vidéos commémoratives et de contenus numériques associés."
          },
          contract: {
            title: "2. Conclusion du contrat",
            content: "Le contrat est conclu dès que nous confirmons expressément votre commande par e-mail. Nous pouvons refuser des commandes pour des raisons techniques ou juridiques."
          },
          services: {
            title: "3. Prestations",
            content: "Nos prestations comprennent : la fabrication et la livraison de balises NFC (produits physiques) ; la création et la mise à disposition de vidéos commémoratives personnalisées (contenus numériques) ; l'accès à d'autres contenus numériques liés au produit."
          },
          prices: {
            title: "4. Prix et conditions de paiement",
            content: "Tous les prix s'entendent en francs suisses (CHF), TVA légale incluse, le cas échéant. Modes de paiement acceptés : carte de crédit, TWINT, paiement anticipé. Le paiement est dû avant la livraison ou avant la création des contenus numériques."
          },
          delivery: {
            title: "5. Livraison et délais de livraison",
            content: "La livraison des produits a lieu généralement dans les 30 jours suivant la conclusion du contrat. Pour les produits fabriqués sur mesure, des retards peuvent survenir ; nous vous en informerons immédiatement dans un tel cas."
          },
          cancellation: {
            title: "6. Droit de rétractation et de résiliation",
            content: "Pour les produits personnalisés et les contenus numériques (par ex. vidéos commémoratives créées individuellement), il n'y a pas de droit de retour. Pour les produits non personnalisés, les dispositions légales s'appliquent."
          },
          warranty: {
            title: "7. Garantie",
            content: "Nous garantissons la conformité de nos produits au contrat. Veuillez nous signaler tout défaut dans les 14 jours suivant la réception afin que nous puissions examiner une solution appropriée (réparation, remplacement ou remboursement)."
          },
          liability: {
            title: "7a. Responsabilité",
            content: "Notre responsabilité est limitée aux dommages causés par un comportement intentionnel ou une négligence grave. Nous n'assumons aucune responsabilité pour les problèmes techniques du côté du client (par ex. connexion Internet insuffisante, appareils incompatibles, paramètres logiciels)."
          },
          ip: {
            title: "8. Droits d'auteur et droits d'utilisation",
            content: "Les contenus que nous créons (par ex. les vidéos commémoratives) sont protégés par le droit d'auteur. Vous recevez un droit d'utilisation simple et non transférable pour un usage privé. Une utilisation commerciale ou une transmission à des tiers n'est pas autorisée, sauf accord écrit contraire. En téléchargeant des photos, des vidéos, de l'audio ou des textes, vous confirmez que vous disposez des droits nécessaires ; vous nous garantissez contre toute réclamation de tiers à cet égard."
          },
          privacy: {
            title: "9. Protection des données",
            content: "Nous traitons les données personnelles exclusivement conformément à notre déclaration de confidentialité. Cela comprend le stockage et le traitement de vos données pour l'exécution du contrat ainsi que la transmission aux tiers nécessaires (par ex. prestataires de services de paiement, hébergement/informatique, expédition). En utilisant nos services, vous consentez à ce traitement."
          },
          special: {
            title: "10. Produits émotionnels et remarques particulières",
            content: "Nos produits ont une grande valeur émotionnelle. Les contenus personnalisés ne peuvent être ni modifiés ni retournés après leur finalisation. En cas de problèmes techniques de notre part (par ex. panne de serveur), nous nous efforçons de rétablir l'accès le plus rapidement possible ; nous ne pouvons garantir une disponibilité permanente du côté du client."
          },
          law: {
            title: "11. For et droit applicable",
            content: "Le droit suisse est exclusivement applicable. Le for est le siège de Memora Moments."
          },
          final: {
            title: "12. Dispositions finales",
            content: "Si certaines dispositions de ces CGV s'avéraient nulles, la validité des autres dispositions n'en serait pas affectée. Nous nous réservons le droit d'adapter ces CGV à tout moment. La version en vigueur, publiée avec la date et le numéro de version, fait foi."
          },
        }
      },
      imprint: {
        title: "Mentions légales",
        sections: {
          info: {
            title: "Informations selon § 5 TMG",
            content: "Memora Moments\nProduits commémoratifs personnalisés"
          },
          contact: {
            title: "Contact",
            content: "E-mail : info.memora.moments@gmail.com\nTéléphone : +41 79 407 56 99"
          },
          responsible: {
            title: "Responsable du contenu selon § 55 Abs. 2 RStV",
            content: "Memora Moments\nE-mail : info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Exclusion de responsabilité",
            content: {
              title: "Responsabilité pour le contenu",
              content: "En tant que prestataire de services, nous sommes responsables de nos propres contenus sur ces pages conformément aux lois générales selon le § 7 al. 1 TMG. Selon les §§ 8 à 10 TMG, nous ne sommes cependant pas tenus, en tant que prestataire de services, de surveiller les informations tierces transmises ou stockées ou de rechercher des circonstances indiquant une activité illégale."
            },
            links: {
              title: "Responsabilité pour les liens",
              content: "Notre offre contient des liens vers des sites web externes de tiers, sur le contenu desquels nous n'avons aucune influence. C'est pourquoi nous ne pouvons assumer aucune garantie pour ces contenus externes. Le fournisseur ou l'exploitant respectif des pages est toujours responsable du contenu des pages liées."
            },
            copyright: {
              title: "Droit d'auteur",
              content: "Les contenus et œuvres créés par les exploitants de ces pages sont soumis au droit d'auteur allemand. La reproduction, le traitement, la diffusion et toute forme d'exploitation en dehors des limites du droit d'auteur nécessitent l'accord écrit de l'auteur ou du créateur respectif."
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
      title: "Des souvenirs qui perdurent – avec cœur et son.",
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
        pageTitleByMode: { human: "Choisir le produit :" },
        step1Subtitle: "Choisissez votre produit – vous téléchargerez les contenus à l'étape suivante.",
        step2ByMode: { human: "Informations sur la personne" },
        step2Subtitle: "Veuillez remplir les champs suivants. Les notes sont facultatives.",
        step3Title: "Télécharger des images et des vidéos",
        step3Subtitle: "Les fichiers sont enregistrés dans le formulaire et envoyés ultérieurement.",
        step4Title: "Coordonnées",
        step4Subtitle: "Nous utilisons ces données pour les questions et la confirmation de commande.",
        step5Title: "Informations de facturation et aperçu",
        step5Subtitle: "Veuillez vérifier l'adresse et le résumé. Avec 'Passer au paiement !', vous accéderez plus tard au paiement.",
        summary: "Résumé"
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Concevoir le cadre",
        formatTitleDeluxe: "Concevoir le Deluxe",
        roundLabel: "Rond · Ø 3 cm",
        squareLabel: "Carré · 6×6 cm",
        petOptionsTitle: "Options pour le Memora Tag pour animaux",
        frameTip:"Astuce : Déplacez l'image avec la souris/le toucher et ajoutez et positionnez librement les textes.",
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
        previewTitle: "Aperçu personnalisé"
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
      premium: { title: "Memora Pet Frame", desc: "Un cadre photo élégant qui relie votre photo préférée à un album photo numérique – idéal pour la maison.", price: "89 CHF" },
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
        step2ByMode: { pet: "Informations sur l'animal de compagnie" }
      },
      products: {
        petOptionsTitle: "Options pour le Memora Tag pour animaux",
        keychainLabel: "avec porte-clés (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Personnalisable individuellement",
        designCustomNote: "Remarque : le design personnalisé coûte +10 CHF."
      },
      step2Fields: {
        pet_name: "Nom de l'animal *",
        pet_deathDate: "Date de décès",
        pet_notesPH: "Souhaits particuliers, bruits préférés, notes…"
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
        step2ByMode: { surprise: "Informations pour la Surprise" }
      },
      step2Fields: {
        surprise_name: "Nom (destinataire) *",
        surprise_notesPH: "Occasion, idée ou souhaits particuliers…"
      }
    }
  }
};