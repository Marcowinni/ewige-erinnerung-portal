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

    banner: {
      text: "Livraison gratuite dans toute la Suisse"
    },

    albumPage: {
      title: (name) => `Souvenirs de ${name}`,
      preTitle: "Un album numérique pour : ",
      subtitle: "Une collection de moments inoubliables.",
      defaultName: "ces moments spéciaux",
      playButton: "Jouer la musique",
      pauseButton: "Mettre la musique en pause",
      playButtonHint: "Contrôlez la musique ici",
      openAlbum: "Ouvrir l'album"
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
        title: "Conditions générales de vente (CGV)",
        sections: {
          scope: {
            title: "Préambule et Contact",
            content: "Ce site web est exploité par TW Projects GmbH. Sur l’ensemble du site, les termes « nous », « notre » et « nos » désignent TW Projects GmbH. TW Projects GmbH met ce site web à votre disposition, y compris toutes les informations, outils et services disponibles, à condition que vous acceptiez l’ensemble des conditions, politiques et avis indiqués ici.\n\nVotre satisfaction est notre priorité absolue. Pour toute question ou suggestion, veuillez nous écrire à info.memora.moments@gmail.ch ou utiliser le formulaire de contact.\n\nTW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Suisse\nE-Mail : info.memora.moments@gmail.ch\nTéléphone : +41 79 407 56 99\n\nAvis linguistique : Ces CGV sont disponibles en plusieurs langues. En cas de divergence ou de contradiction, la version allemande fait foi juridiquement."
          },
          contract: {
            title: "1. Champ d'application et conclusion du contrat",
            content: "Les présentes CGV s'appliquent à toutes les commandes passées sur notre site web ainsi qu'à l'utilisation de nos services.\n\nUn contrat ferme est conclu dès que nous confirmons expressément la commande par e-mail."
          },
          services: {
            title: "2. Consentement au traitement de vos données",
            content: "Votre accord avec les présentes conditions générales de vente inclut votre consentement à un tel traitement des données personnelles. Vos données d'images/photos sont utilisées par nous exclusivement pour le traitement impeccable de votre commande."
          },
          prices: {
            title: "3. Assortiment, prix et paiement",
            content: "Nos produits se composent notamment de plaques commémoratives personnalisées, de tags NFC ainsi que de contenus numériques associés (par ex. album photo numérique).\n\nLes produits personnalisés et les contenus numériques sont créés individuellement selon les spécifications du client et sont exclus de l'échange ou du retour.\n\nLes produits non personnalisés peuvent être retournés conformément aux dispositions légales.\n\nNotre assortiment est constamment adapté à l'évolution technique. Nos prix ainsi que la part des frais d'envoi qui vous est facturée peuvent changer de temps à autre.\n\nNous prenons en charge les frais de livraison pour les commandes en Suisse. Les frais de livraison pour les envois hors de Suisse seront facturés ultérieurement au destinataire.\n\nTous les prix s'entendent en francs suisses (CHF), TVA légale comprise (le cas échéant).\n\nLe paiement s'effectue avant la livraison ou avant la création des contenus numériques.\n\nPour les commandes en ligne, vous avez la possibilité de payer avec les moyens de paiement suivants : Carte de crédit, TWINT, paiement anticipé. Ceux-ci peuvent changer de temps à autre et selon le pays. Votre choix d'un moyen de paiement nous autorise à encaisser ou à percevoir les paiements par la voie correspondante. En cas de rétrofacturation, nous avons droit au remboursement des frais et des frais de traitement bancaire qui y sont liés."
          },
          delivery: {
            title: "4. Commande, livraison, transfert des risques et réserve de propriété",
            content: "Dès que vos images ou films numériques nous parviennent, la commande est exécutée conformément à vos indications. Nous confirmons les commandes passées par voie électronique par un e-mail à l'adresse que vous avez indiquée.\n\nAprès confirmation de la commande, la livraison du produit a lieu dans les 30 jours, sauf indication contraire sur le produit.\n\nVeuillez noter que les commandes numériques, une fois qu'elles nous sont parvenues, ne peuvent être ni modifiées, ni supprimées, ni regroupées.\n\nSi des contenus d'images manifestement contraires à des interdictions légales apparaissent sur vos images lors de l'exécution de la commande, nous n'exécuterons pas votre commande.\n\nLes livraisons sont effectuées à l'adresse indiquée par le client. Le risque de perte fortuite, de dommage fortuit ou de perte fortuite de la marchandise livrée vous est transféré au moment de sa remise à l'entreprise de transport."
          },
          cancellation: {
            title: "5. Réserve de propriété",
            content: "Les produits livrés restent la propriété de TW Projects GmbH jusqu'à leur paiement intégral (y compris les frais de port et la TVA éventuelle) (réserve de propriété, inscription au registre réservée)."
          },
          warranty: {
            title: "6. Droits et obligations pour les contenus personnalisés",
            content: "Le client fournit des textes, des images, des vidéos ou d'autres contenus d'une qualité appropriée.\n\nLe client assure qu'il détient tous les droits d'auteur et droits de la personnalité nécessaires ou qu'il a obtenu le consentement des ayants droit.\n\nLe client accorde à TW Projects GmbH une licence non exclusive et mondiale pour l'utilisation des contenus fournis pour la création, le stockage et la mise à disposition des produits.\n\nNous nous réservons le droit de refuser des contenus ou de les supprimer ultérieurement s'ils portent atteinte aux droits de tiers ou sont illégaux."
          },
          liability: {
            title: "7. Procédure de notification et de retrait (Notice-&-Takedown)",
            content: "Les ayants droit (p. ex. proches, héritiers) peuvent contester le fait que des contenus portent atteinte aux droits de la personnalité.\n\nDès réception d'une notification motivée, nous mettons hors ligne les contenus concernés dans les plus brefs délais. Veuillez adresser vos notifications à : [info.memora.moments@gmail.ch]."
          },
          ip: {
            title: "8. Garantie et responsabilité",
            content: "Les droits légaux en matière de vices sont applicables conformément au Code suisse des obligations (CO).\n\nNous procédons, à notre choix, à une réparation ou à une livraison de remplacement. Les réclamations ne peuvent être reconnues que si elles se rapportent à un défaut matériel et si elles sont faites valoir dans les 21 jours suivant la réception des produits.\n\nVeuillez noter que les fautes de frappe saisies par le client, les images de qualité insuffisante (par exemple en raison d'une résolution trop faible pour les images numériques), les erreurs de conception commises par le client lui-même ainsi que le mauvais choix de produit, les quantités de commande erronées ou d'autres défauts résultant d'erreurs lors de la saisie de la commande sont exclus de la réclamation. Il en va de même pour les dommages survenus pendant le transport.\n\nNous n'assumons notamment aucune responsabilité pour :\n- la qualité ou la légalité des contenus fournis par le client,\n- les différences de couleur dues aux spécificités des matériaux ou aux réglages de l'appareil,\n- les interruptions temporaires de nos services numériques.\n- pour les dommages qui ne sont généralement pas prévisibles compte tenu de la nature de la commande et des produits concernés et de leur utilisation normale.\n\nNotre responsabilité est, dans la mesure où la loi le permet, limitée à l'intention et à la négligence grave. En cas de négligence légère, nous ne sommes responsables qu'en cas de dommages corporels."
          },
          privacy: {
            title: "9. Utilisation des services numériques",
            content: "Nous nous efforçons d'assurer une grande disponibilité de nos services d'hébergement et de streaming. Des interruptions de courte durée (maintenance, force majeure, pannes techniques) peuvent toutefois survenir.\n\nAucun niveau de service spécifique n'est garanti."
          },
          special: {
            title: "10. Droits de tiers",
            content: "Vous êtes seul responsable de vous assurer que vous disposez des droits nécessaires sur les images que vous envoyez, y compris les droits d'auteur, les droits de marque et les droits de la personnalité. Si des tiers devaient faire valoir des droits à notre encontre en relation avec votre commande pour violation de tels droits, vous êtes tenu de repousser ces droits ou de prendre en charge les frais de défense de ces droits. Les droits à des dommages et intérêts de notre part ne sont pas affectés."
          },
          law: {
            title: "11. Protection des données",
            content: "Le traitement des données personnelles est régi par notre déclaration de protection des données.\n\nLe client prend note que des prestataires tiers peuvent être utilisés pour l'hébergement, le traitement des paiements ou d'autres prestations."
          },
          final: {
            title: "12. Réglementation des dons",
            content: "Nous faisons don de 10% du prix de vente net de chaque produit vendu à des fondations caritatives (p. ex. Make-A-Wish Suisse).\n\nLe versement des dons a lieu une fois par an, à la fin de l'année.\n\nLe choix de la fondation et le traitement des dons incombent à TW Projects GmbH. Le client n'a aucun droit individuel à la transmission ou à l'affectation des dons."
          },
          contact: {
            title: "13. Utilisations interdites",
            content: "Le site web ne doit pas être utilisé à des fins illégales, pour du spam, des logiciels malveillants ou des violations des droits de tiers.\n\nNous nous réservons le droit de bloquer l'accès en cas d'abus."
          },
          availability: {
            title: "14. Disponibilité du contenu numérique",
            content: "Les contenus numériques (par ex. albums photo ou vidéo) accessibles via tags NFC, codes QR ou liens externes sont hébergés par des prestataires tiers sélectionnés par nos soins. TW Projects GmbH garantit l’accès à ces contenus numériques pendant une période minimale de 12 mois à compter de la livraison, sauf indication contraire pour le produit concerné.\n\nL’accès peut se poursuivre au-delà de cette période, mais il n’est pas contractuellement garanti. Une disponibilité illimitée ou à vie ne peut pas être assurée.\n\nNous déclinons toute responsabilité en cas d’interruptions, de modifications ou d’arrêt de services tiers, ainsi qu’en cas de perte de données ou de problèmes d’accès indépendants de notre volonté. Nous nous réservons le droit de migrer les contenus vers d’autres services ou de modifier les modalités d’accès, sans qu’il en résulte un droit à un système d’hébergement spécifique."
          },
        },
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
      subtitle: "Un objet commémoratif avec Smart Tag – un simple geste avec votre smartphone, et l’album numérique de votre être cher s’ouvre. Les plus beaux moments restent vivants – dans le cœur et dans des lieux spéciaux.",
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

    donation: {
      title: "Faire le bien ensemble",
      description: "Nous reversons 10% de chaque achat d'un produit Memora Moments à Make-A-Wish pour apporter espoir et joie.",
      linkText: "En savoir plus sur Make-A-Wish"
    },

    howitworks: {
      title: "C'est aussi simple que ça",
      subtitle: "Votre Memora personnel en quelques étapes.",
      step1: { title: "Choisir le produit", desc: "Choisissez entre Memora Tag, Frame ou Deluxe." },
      step2: { title: "Choisir les médias et la musique", desc: "Choisissez avec soin des photos, vidéos ou messages vocaux de votre proche et ajoutez un accompagnement musical harmonieux." },
      step3: { title: "Recevoir le Memora", desc: "Le souvenir avec Smart-Tag – déjà relié à votre album photo numérique – vous sera livré à domicile." }
    },
    products: {
      title: "Nos Memoras :",
      subtitle: "Les produits Memora classiques.",
      basic: { title: "Memora Tag", desc: "Une simple Smart-Tag qui donne vie aux souvenirs via un album photo numérique – discret et impérissable.", price: "59 CHF" },
      premium: { title: "Memora Frame", desc: "Un cadre photo classique, associé à la technologie moderne. Ainsi, chaque photo devient une porte vers des souvenirs émouvants.", price: "89 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "Une œuvre d'art de haute qualité qui maintient le passé en vie et touche l'avenir.", price: "149 CHF" },
      features: {
        tag1: "Smart-Tag de 6×6 cm ou 3 cm ⌀",
        tag2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        tag3: "Design minimaliste et intemporel, s'intègre harmonieusement",
        tag4: "Pour les pierres tombales, les urnes, les lieux de mémoire",
        premium1: "Smart-Tag de 3 cm ⌀ – relie l'image et le mémorial numérique",
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
        calendarStyleSelection: {
          title: "Choisir le style de l'album",
          modern: "Moderne",
          classic: "Classique",
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
        calendarStyle: "Style de l'album"
      },

      orderConfirmation: {
        prefix: "J'ai lu et j'accepte les",
        termsLinkText: "CGV",
        separator: "et la",
        privacyLinkText: "Politique de confidentialité",
        suffix: "."
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
      subtitle: "Un souvenir avec Smart Tag – un simple geste avec votre smartphone, et l’album photo numérique de votre animal bien-aimé s’ouvre. Les plus beaux moments restent vivants – dans le cœur et dans des lieux spéciaux.",
      startButton: "Comment ça marche ?",
      learnButton: "En savoir plus"
    },
    features: {
      title: "Des moments inoubliables avec votre chéri",
      subtitle: "Souvenirs numériques pour animaux de compagnie.",
      unique: { title: "Souvenir affectueux", desc: "Préservez la fidèle compagnie de votre animal dans un souvenir durable." },
      multimedia: { title: "Expériences multimédias", desc: "Recevez votre album photo numérique – avec des photos et vidéos de votre compagnon qui font revivre les souvenirs." },
      music: { title: "Sons préférés", desc: "Déposez des enregistrements de votre animal ou de la musique dans l’album pour rendre le souvenir audible." },
      quality: { title: "Conception digne", desc: "Des matériaux simples et de haute qualité qui s'intègrent harmonieusement dans n'importe quelle maison, que ce soit à l'intérieur ou à l'extérieur." }
    },

    donation: {
      title: "Aide pour les animaux en détresse",
      description: "10% de chaque achat d'un produit Memora Pet sont reversés à la fondation Tierrettungsdienst pour aider les animaux dans le besoin.",
      linkText: "En savoir plus sur le Tierrettungsdienst"
    },

    howitworks: {
      title: "C'est aussi simple que ça",
      subtitle: "Votre Memora en trois étapes.",
      step1: { title: "Choisir le produit", desc: "Choisissez entre Memora Tag, Frame ou Deluxe." },
      step2: { title: "Choisir les médias et la musique ou les sons", desc: "Choisissez vos photos et vidéos préférées ou même des Fichiers audio et ajoutez une musique de fond appropriée." },
      step3: { title: "Recevoir le Memora", desc: "Votre Memora avec Smart-Tag – déjà reliée à l’album photo numérique – vous sera livrée à domicile." }
    },
    products: {
      title: "Produits pour animaux de compagnie",
      subtitle: "Souvenirs pour de fidèles compagnons.",
      basic: { title: "Memora Pet Tag", desc: "Une simple Smart-Tag qui donne vie aux souvenirs de votre animal de compagnie avec un album photo numérique", price: "dès 59 CHF" },
      premium: { title: "Memora Pet Frame", desc: "Un cadre photo élégant qui relie votre photo préférée à un album photo numérique – idéal pour la maison.", price: "89 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "Une plaque en plexiglas exclusive avec support – pour un souvenir durable et digne.", price: "149 CHF" },
      features: {
        tag1: "Smart-Tag de 6×6 cm ou 2.5 cm ⌀",
        tag2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        tag3: "Design minimaliste et intemporel, s'intègre harmonieusement",
        tag4: "Option : standard simple, conçu individuellement ou en porte-clés",
        premium1: "Smart-Tag de 3 cm ⌀ – relie l'image et le mémorial numérique",
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

      orderConfirmation: {
        prefix: "J'ai lu et j'accepte les",
        termsLinkText: "CGV",
        separator: "et la",
        privacyLinkText: "Politique de confidentialité",
        suffix: "."
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
      subtitle: "Mariage, anniversaire ou jubilé – avec Memora Moments, vous rendez les souvenirs tangibles. Touchez le cadeau avec votre smartphone, et l’album numérique s’ouvre. Une surprise qui demeure.",
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

    donation: {
      title: "Offrir un sourire",
      description: "Nous reversons 10% de chaque achat d'un produit Memora Surprise à la fondation Make-A-Wish pour réaliser les vœux les plus chers des enfants.",
      linkText: "En savoir plus sur Make-A-Wish"
    },

    howitworks: {
      title: "Comment fonctionne Surprise",
      subtitle: "Trois étapes pour le moment de surprise.",
      step1: { title: "Choisir le produit", desc: "Choisissez entre Memora Tag, Frame ou Deluxe." },
      step2: { title: "Choisir les médias et la musique", desc: "Choisissez vos photos et vidéos préférées ou même des messages vocaux et ajoutez une musique de fond appropriée." },
      step3: { title: "Recevoir la Surprise", desc: "Votre cadeau Memora avec Smart-Tag – déjà relié à l’album photo numérique – vous sera livré à domicile." }
    },
    products: {
      title: "Produits Surprise",
      subtitle: "Choisissez votre style.",
      basic: { title: "Memora Surprise Tag", desc: "Une Smart-Tag qui relie un album photo numérique – original et unique.", price: "59 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "Un cadre photo élégant qui relie votre photo préférée à un album photo numérique – idéal comme cadeau.", price: "89 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "Une plaque en plexiglas exclusive avec technologie intégrée – le cadeau premium élégant pour des souvenirs durables.", price: "149 CHF" },
      features: {
        tag1: "Smart-Tag de 6×6 cm ou 3 cm ⌀",
        tag2: "Parcourez l'album photo numérique personnel directement d'un simple toucher",
        tag3: "Design minimaliste et intemporel, s'intègre harmonieusement",
        tag4: "Une surprise qui suscite des émotions et reste longtemps en mémoire",
        premium1: "Smart-Tag de 3 cm ⌀ – relie l'image et le mémorial numérique",
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

      orderConfirmation: {
        prefix: "J'ai lu et j'accepte les",
        termsLinkText: "CGV",
        separator: "et la",
        privacyLinkText: "Politique de confidentialité",
        suffix: "."
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