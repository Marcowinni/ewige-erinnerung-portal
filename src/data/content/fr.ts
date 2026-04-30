import { ContentData } from './types';

export const frContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Créer un Mémorial",
      about: "À Propos",
      contact: "Contact",
      start: "Créer l'album",
      create: "Créer",
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
      },
      founders: {
        eyebrow: "Les personnes derrière",
        title: "Memora Moments, c'est nous deux",
        intro: "Deux amis, une idée – et le même besoin de donner aux souvenirs une place qui dure. Nous ne sommes pas une grande entreprise, mais deux artisans qui regardent chaque album avec le même soin que s'il s'agissait du nôtre.",
        till: {
          name: "Till",
          role: "Cofondateur · Vision & Produit",
          bio: "Till pense en histoires. Quand il ne dessine pas de concepts pour Memora, il est le plus souvent dehors – sac à dos, appareil photo ou skis. Ce qui le motive : l'idée que chaque personne et chaque animal mérite un récit qui ne se perde pas dans le quotidien. Cette conviction façonne chaque détail de nos albums.",
          quote: "Un jour, une image, une chanson – parfois cela suffit pour ressentir à nouveau quelqu'un tout près.",
          hobbies: ["Voyage", "Photographie", "Montagne"],
          photoCaptions: {
            main: "Till",
            one: "Australie – sac à dos, routes ouvertes, beaucoup d'histoires.",
            two: "Journées d'hiver où le monde s'arrête un instant."
          }
        },
        wini: {
          name: "Marco « Wini » Winistörfer",
          role: "Cofondateur · Technique & Plateforme",
          bio: "Wini construit. Du code le jour, parfois encore un peu de code le soir. Il est le pragmatique de l'équipe – il trouve des solutions pendant que d'autres parlent encore du problème. Pour lui, Memora Moments est l'endroit où la technologie fait enfin ce pour quoi elle est faite : rapprocher les gens.",
          quote: "La bonne technique ne se voit pas. Elle ouvre simplement la voie à ce qui compte.",
          hobbies: ["Kitesurf", "Randonnée", "Code"],
          photoCaptions: {
            main: "Marco « Wini »",
            one: "Sur l'eau – là où la tête se libère enfin.",
            two: "Montagnes, un endroit favori pour respirer."
          }
        }
      }
    },
    legal: {
      privacy: {
        title: "Politique de confidentialité",
        sections: {
          responsible: {
            title: "1. Responsable du traitement",
            content: "TW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Suisse\nE-mail : info@memora-moments.ch\nTéléphone : +41 79 407 56 99\n\nNous sommes responsables de la collecte, du traitement et de l'utilisation de vos données personnelles au sens de la loi fédérale révisée sur la protection des données (nLPD) et — le cas échéant — du règlement général sur la protection des données de l'UE (RGPD)."
          },
          dataCollection: {
            title: "2. Données collectées",
            content: "Nous traitons uniquement les données que vous nous fournissez lors d'une commande, de la création d'un album ou de la consultation d'un album publié, à savoir :",
            list: [
              "Données de commande : nom, adresse de livraison, e-mail, téléphone (facultatif), informations de paiement (gérées via Stripe)",
              "Contenu de l'album : photos et vidéos (max. 40 fichiers, max. 200 Mo par vidéo), légendes, dédicace facultative, nom et dates du défunt, ainsi que la musique choisie",
              "Paramètres d'éditeur : choix de mise en page, textes par page, point focal d'image — enregistrés dans notre base de données avec l'album",
              "Slug du Smart Tag : chaque album reçoit une URL unique (p. ex. memora-moments.ch/album/marie-01) ouverte via NFC ou QR code",
              "Données techniques lors de la consultation : adresse IP (tronquée par notre CDN), navigateur, appareil, horodatage — anonymisées pour la sécurité et la performance",
              "Données de cookies : un cookie de consentement et — uniquement après votre accord — Google Analytics pour la mesure d'audience"
            ]
          },
          purpose: {
            title: "3. Finalité du traitement",
            content: "Nous utilisons vos données exclusivement pour :",
            list: [
              "Exécuter votre commande (Smart Tag physique et album numérique)",
              "Créer, mettre en page et publier votre album personnalisé",
              "Diffuser le contenu de l'album lors de l'ouverture de l'URL Smart Tag ou QR",
              "Traiter le paiement via Stripe et envoyer la confirmation de commande par e-mail",
              "Vous contacter pour des précisions, corrections ou un support",
              "Exploiter, sécuriser et améliorer la plateforme"
            ]
          },
          disclosure: {
            title: "4. Partage avec des tiers / sous-traitants",
            content: "Nous ne vendons pas de données et ne les partageons jamais à des fins publicitaires. Pour exploiter la plateforme nous recourons aux sous-traitants suivants :",
            list: [
              "Supabase (stockage et base de données, région UE) — héberge le contenu des albums, les données de commande et les paramètres d'éditeur",
              "Vercel (hébergement et CDN) — diffuse le site web et les pages d'album",
              "Stripe (traitement des paiements) — gère les paiements par carte et TWINT directement ; nous ne recevons jamais les données de carte complètes",
              "Resend (e-mails transactionnels) — envoie les confirmations de commande et les notifications d'album",
              "La Poste suisse et partenaires logistiques — expédient le Smart Tag physique",
              "Google Analytics (uniquement avec votre consentement) — mesure d'audience anonymisée"
            ]
          },
          storage: {
            title: "5. Conservation et suppression",
            content: "Les données de commande sont conservées conformément aux obligations comptables suisses (10 ans). Le contenu de l'album reste accessible pendant au moins 12 mois à compter de la livraison du Smart Tag ; une disponibilité au-delà n'est pas garantie contractuellement. Sur demande écrite, nous supprimons ou anonymisons le contenu plus tôt, sauf obligation légale contraire."
          },
          security: {
            title: "6. Sécurité des données",
            content: "Nous protégeons vos données par des mesures techniques et organisationnelles à jour : transport exclusivement en TLS, contrôle d'accès au niveau de la base (Row-Level Security), clés de service séparées pour les fonctions edge et sauvegardes régulières chez nos hébergeurs cloud. Une protection totale lors de transmissions Internet (p. ex. e-mail) ne peut être garantie."
          },
          rights: {
            title: "7. Vos droits",
            content: "Vous disposez des droits suivants. Adressez vos demandes à info@memora-moments.ch :",
            list: [
              "Accès aux données vous concernant",
              "Rectification de données inexactes ou incomplètes",
              "Effacement, sauf obligations légales de conservation",
              "Limitation ou opposition à certains traitements",
              "Portabilité dans un format électronique courant",
              "Retrait à tout moment du consentement, avec effet pour le futur"
            ]
          },
          cookies: {
            title: "8. Cookies et suivi",
            content: "Nous utilisons des cookies strictement nécessaires (p. ex. cookie de langue et de consentement) qui peuvent être posés sans accord. Les cookies analytiques optionnels (Google Analytics) ne sont activés qu'après acceptation dans la bannière. Vous pouvez retirer votre consentement à tout moment en supprimant le cookie « memora-cookie-consent » dans votre navigateur."
          },
          changes: {
            title: "9. Modifications de cette politique",
            content: "Nous pouvons adapter cette politique en cas de changement de fonctionnalités ou de sous-traitants. La version publiée sur cette page fait foi."
          }
        }
      },
      terms: {
        title: "Conditions générales de vente",
        sections: {
          scope: {
            title: "Préambule et contact",
            content: "Ce site est exploité par TW Projects GmbH sous la marque Memora Moments. Les termes « nous », « notre » et « nos » désignent TW Projects GmbH ; « vous » ou « client » désigne l'utilisateur.\n\nContact :\nTW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Suisse\nE-mail : info@memora-moments.ch\nTéléphone : +41 79 407 56 99\n\nLes présentes CGV sont disponibles en allemand, anglais, français et italien. En cas de divergence, la version allemande fait foi."
          },
          contract: {
            title: "1. Champ d'application et conclusion du contrat",
            content: "Les présentes CGV s'appliquent à toutes les commandes passées sur memora-moments.ch ainsi qu'à l'utilisation de l'éditeur d'album et de l'album publié.\n\nLa présentation des produits ne constitue pas une offre contraignante mais une invitation à commander. En complétant le processus de commande (confirmation de paiement via Stripe), vous formulez une offre ferme. Le contrat est conclu dès que nous vous adressons la confirmation par e-mail ou que nous lançons la livraison."
          },
          services: {
            title: "2. Description des prestations",
            content: "Memora Moments combine deux prestations :\n\n1) Produit physique : un Smart Tag (plaque NFC / QR) qui peut être posé discrètement sur des pierres tombales, des urnes ou des produits partenaires (p. ex. Zeichnungsverlag).\n\n2) Album numérique : un album photo et vidéo accessible via le Smart Tag, conçu par vos soins dans notre éditeur en ligne. Vous choisissez le style (Modern, Classique, Intemporel), la mise en page de chaque page, le point focal des images, des textes facultatifs et un titre musical.\n\nL'album est publié à une URL unique (memora-moments.ch/album/<slug>) et lié au Smart Tag."
          },
          prices: {
            title: "3. Prix, livraison et paiement",
            content: "Le prix de base par album est de CHF 80.– (TVA éventuelle incluse, prix actuels du site web faisant foi).\n\nLa livraison est assurée par la Poste Suisse (Courrier A). Frais de livraison par zone :\n– Suisse (CH) : CHF 1.20\n– Europe (UE) : CHF 1.90\n– Monde (WORLD) : CHF 2.20\n\nTous les prix sont en francs suisses. Les éventuels droits de douane ou taxes d'importation hors de Suisse sont à la charge du destinataire.\n\nLe paiement s'effectue avant livraison via Stripe (carte de crédit/débit ou TWINT). Une commande de test sans paiement n'est possible qu'après activation expresse de notre part.\n\nEn cas de rétrofacturation, nous sommes en droit de refacturer les frais bancaires correspondants."
          },
          delivery: {
            title: "4. Processus de commande, livraison et transfert des risques",
            content: "Le processus comprend 8 étapes : public cible (humain/animal), choix du style, téléversement des médias, éditeur d'album, musique, prévisualisation, données personnelles et paiement.\n\nDès réception du paiement, nous démarrons la production du Smart Tag et la publication de l'album. La livraison intervient dans les 30 jours suivant la conclusion du contrat, sauf indication contraire.\n\nLe risque de perte ou détérioration accidentelle du produit physique vous est transféré à la remise au transporteur. Jusqu'au paiement intégral, le produit reste notre propriété (réserve de propriété selon le droit suisse)."
          },
          cancellation: {
            title: "5. Rétractation pour produits personnalisés",
            content: "Le Smart Tag et l'album numérique sont produits et publiés individuellement selon vos indications. Les produits personnalisés sont exclus du droit légal de rétractation ou de retour.\n\nLes droits liés aux défauts (clause 8) ne sont pas affectés. Vérifiez attentivement le contenu de votre album dans la prévisualisation plein écran avant de passer commande."
          },
          warranty: {
            title: "6. Contenus du client — droits et obligations",
            content: "Vous téléversez au maximum 40 fichiers médias dans l'éditeur (images compressées à env. 1 Mo, vidéos jusqu'à 200 Mo). Vous garantissez détenir, pour tous les contenus téléversés (images, vidéos, audio, textes, noms et dates), les droits d'auteur, droits à l'image et de protection des données nécessaires, ou avoir obtenu l'accord des ayants droit ou des proches.\n\nVous nous concédez, pour la création, le stockage, la diffusion et la prévisualisation de l'album, une licence non exclusive, mondiale, limitée à la finalité contractuelle.\n\nNous nous réservons le droit de refuser ou de retirer un contenu manifestement illicite, contraire aux bonnes mœurs ou portant atteinte à des droits de tiers."
          },
          liability: {
            title: "7. Procédure de notification et de retrait",
            content: "Si vous êtes ayant droit (p. ex. proche, héritier, personne représentée) et estimez vos droits violés par un album publié, contactez-nous à info@memora-moments.ch en indiquant l'URL de l'album et la nature de la violation.\n\nÀ réception d'une notification motivée, nous retirons sans délai l'album ou le contenu concerné et contactons le client à l'origine de la commande pour clarification."
          },
          ip: {
            title: "8. Garantie et responsabilité",
            content: "La garantie légale du Code suisse des obligations s'applique. Les réclamations doivent nous parvenir par écrit dans les 21 jours suivant la réception. Nous procédons, à notre choix, à la réparation ou au remplacement.\n\nSont exclus de la garantie notamment :\n– les fautes de frappe, de mise en page ou de sélection commises par le client dans l'éditeur,\n– les images ou vidéos de qualité insuffisante (résolution faible, forte compression),\n– les écarts de couleur dus à des différences d'écran ou d'impression,\n– les dommages de transport non signalés dans les 7 jours suivant réception.\n\nNotre responsabilité est limitée, dans la mesure légale, à l'intention et à la négligence grave. La négligence légère n'engage notre responsabilité qu'en cas de dommages corporels. Toute responsabilité pour dommages indirects, perte de bénéfice ou perte de données est exclue dans la mesure permise par la loi."
          },
          privacy: {
            title: "9. Disponibilité des services numériques",
            content: "L'éditeur, la diffusion de l'album et le paiement reposent sur des infrastructures cloud (notamment Vercel et Supabase, région UE). Nous visons une haute disponibilité mais ne garantissons aucun niveau de service précis.\n\nDes interruptions courtes pour maintenance, mises à jour de sécurité ou incidents de fournisseurs sont possibles. Aucun droit à une plateforme d'hébergement spécifique n'est conféré."
          },
          special: {
            title: "10. Droits de tiers",
            content: "Vous êtes seul responsable de la détention des droits sur les contenus téléversés. Si des tiers font valoir contre nous des prétentions pour atteinte à leurs droits d'auteur, droits de marque ou droits de la personnalité, vous nous indemnisez et prenez en charge les frais de défense — sans préjudice de nos propres droits à dommages et intérêts."
          },
          law: {
            title: "11. Protection des données",
            content: "La collecte et le traitement des données personnelles sont régis par notre politique de confidentialité. Vous reconnaissez que nous recourons à des sous-traitants (notamment Supabase, Vercel, Stripe et Resend) et que les contenus sont diffusés vers les terminaux via des CDN."
          },
          final: {
            title: "12. Règlement des dons",
            content: "TW Projects GmbH reverse 10 % du prix de vente net de chaque produit Memora Moments vendu directement sur memora-moments.ch à des organisations caritatives (p. ex. Make-A-Wish Suisse ou la Fondation Service de Sauvetage des Animaux).\n\nLes achats effectués via des canaux partenaires, des revendeurs ou des coopérations (p. ex. liens d'influenceurs) sont exclus.\n\nLes dons sont versés une fois par an en fin d'année. Le choix de l'organisation bénéficiaire et la gestion relèvent de notre seule décision. Le client ne dispose d'aucun droit individuel au reversement ou à l'affectation du don."
          },

          contact: {
            title: "13. Utilisations interdites",
            content: "La plateforme ne doit pas être utilisée à des fins illicites, pour du spam, des logiciels malveillants, le téléversement de contenus pédopornographiques, glorifiant la violence ou haineux, ni pour porter atteinte aux droits de tiers.\n\nEn cas d'infraction, nous nous réservons le droit de retirer immédiatement l'album, de bloquer le compte et — si nécessaire — d'informer les autorités. Les montants déjà versés ne sont pas remboursés dans ces cas."
          },
          availability: {
            title: "14. Disponibilité des albums numériques",
            content: "Nous garantissons que l'album publié reste accessible via l'URL Smart Tag pendant au moins 12 mois à compter de la livraison du Smart Tag, sauf indication contraire. Une disponibilité au-delà n'est pas contractuellement garantie.\n\nNous déclinons toute responsabilité pour les interruptions, modifications ou arrêts de services externes, ainsi que pour les pertes de données indépendantes de notre volonté. Nous nous réservons le droit de migrer le contenu vers d'autres services ou hébergeurs sans qu'aucun droit du client à un fournisseur précis n'en résulte.\n\nDroit applicable : droit suisse, à l'exclusion de la Convention des Nations Unies sur les contrats de vente internationale de marchandises. Dans la mesure légale, le for compétent est le siège de TW Projects GmbH (Dürnten ZH)."
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
              "E-mail : info@memora.moments.ch\nTéléphone : +41 79 407 56 99"
          },
          responsible: {
            title: "Responsabilité",
            content: "Memora Moments\nE-mail : info@memora.moments.ch"
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

    orderSuccessPage: {
      title: "Commande réussie - Memora Moments",
      heading: "Merci pour votre commande !",
      message1: "Nous avons bien reçu votre commande et la traiterons dans les plus brefs délais.",
      buttonHome: "Retour à l'accueil"
    },
    orderCancelPage: {
      title: "Commande annulée - Memora Moments",
      heading: "Commande annulée",
      message: "Le processus de paiement a été annulé. Votre panier a été sauvegardé.",
      buttonBack: "Retour au panier"
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
    },

    landing: {
      hero: {
        eyebrow: "Memora Moments",
        titleLine1: "Souvenirs",
        titleLine2: "qui perdurent",
        subtitle1: "Un Smart Tag plein de dignité, qui réunit les plus beaux instants avec vos proches dans un album souvenir numérique.",
        subtitle2: "Pour les humains et les animaux qui restent en mémoire à travers les générations.",
        ctaCreate: "Créer l'album"
      },
      pathChoice: {
        eyebrow: "Voici comment ça marche !",
        titleLine1: "Chaque instant",
        titleLine2: "mérite sa place.",
        ctaCreate: "Créer l'album"
      },
      audience: {
        eyebrow: "Pour tous ceux qui nous ont accompagnés",
        titleLine1: "Pour chaque",
        titleLine2: "compagnon aimé.",
        human: {
          eyebrow: "Pour les humains",
          headline: "Pour les êtres\nqui nous ont accompagnés.",
          body: ""
        },
        pet: {
          eyebrow: "Pour les animaux",
          headline: "Pour ton\nfidèle compagnon.",
          body: ""
        }
      },
      styleShowcase: {
        eyebrow: "Trois styles",
        titleLine1: "Chaque histoire",
        titleLine2: "mérite son ton.",
        hint: "Parcourez nos albums et trouvez votre style.",
        ctaPickStyle: "Choisir votre style",
        previewTitle: (style: string) => `Aperçu de l'album ${style}`,
        navBack: "Retour",
        navForward: "Suivant",
        themes: { modern: "Moderne", classic: "Classique", timeless: "Intemporel" }
      },
      partner: {
        eyebrow: "En partenariat",
        titleLine1: "Ensemble avec",
        titleLine2: "Zeichnungsverlag",
        body: "Notre Tag se pose discrètement sur les pierres tombales, les urnes et sur les produits du Zeichnungsverlag — créant des liens subtils entre les lieux physiques du souvenir et les contenus numériques.",
        cta: "Visiter Zeichnungsverlag"
      },
      productFeatures: {
        eyebrow: "Le produit",
        titleLine1: "Un petit Tag,",
        titleLine2: "une infinité de souvenirs.",
        intro: "Memora Moments associe un Smart Tag physique robuste à un album numérique conçu personnellement. Un simple geste ou un scan — et les souvenirs s'animent.",
        items: {
          waterproof: {
            title: "Résistant à l'eau et aux intempéries",
            body: "Fabriqué dans un matériau durable, le Smart Tag résiste à la pluie, à la neige et aux rayons UV. Sûr en extérieur, sur une pierre tombale, une urne ou au jardin."
          },
          adhesive: {
            title: "Adhésif 3M de haute qualité",
            body: "L'adhésif industriel 3M assure une fixation sûre sur la pierre, le verre, le métal, le bois et le plastique — et se retire sans laisser de traces si besoin."
          },
          quality: {
            title: "Qualité premium",
            body: "Un Smart Tag solide avec une finition durable. Bords soigneusement travaillés, discret en noir ou en version dédiée au souvenir des animaux."
          },
          personal: {
            title: "Conçu par vos soins, personnel",
            body: "Vous téléchargez vos images, vidéos et textes — nous en composons un album digne dans le style que vous avez choisi. Fait par vous, unique."
          },
          privateUrl: {
            title: "Votre URL privée",
            body: "Chaque album reçoit sa propre adresse unique. Seules les personnes qui connaissent le Tag ou reçoivent le lien y ont accès. Non référencé publiquement."
          },
          versatile: {
            title: "Polyvalent",
            body: "Posez le Smart Tag sur des pierres tombales, des urnes, des cadres photo, des boîtes à souvenirs ou des colliers. Un geste — de nombreux usages."
          }
        },
        price: {
          label: "Pack complet",
          amount: "CHF 80",
          note: "Smart Tag + album personnel · livraison dès CHF 1.20",
          cta: "Créer l'album maintenant"
        }
      },
      useCaseGallery: {
        eyebrow: "Exemples d'utilisation",
        titleLine1: "Là où le Tag",
        titleLine2: "trouve sa place.",
        intro: "Des inspirations pour les lieux où un tag Memora Moments tisse un pont discret entre l'avant et l'aujourd'hui.",
        cases: {
          gravestone: "Sur la pierre tombale",
          urn: "Sur l'urne",
          memorialWall: "Sur le mur du souvenir",
          keepsake: "Sur une boîte à souvenirs",
          petCorner: "Dans le coin dédié à l'animal",
          photoFrame: "Sur le cadre photo à la maison"
        }
      }
    },

    customerWizard: {
      stepLabels: ["Pour qui", "Style", "Photos", "Commander"],
      progress: (current: number, total: number) => `Étape ${current} sur ${total}`,
      nav: { back: "Retour", next: "Suivant", toStep4: "Passer à la commande" },
      step1: {
        title: "Pour qui créons-nous l'album ?",
        subtitle: "Choisissez et complétez les détails.",
        optionHuman: "Pour une personne",
        optionPet: "Pour un animal",
        nameLabel: "Nom *",
        namePlaceholderHuman: "Nom de la personne",
        namePlaceholderPet: "Nom de l'animal",
        birthDate: "Date de naissance (facultatif)",
        deathDateHuman: "Date du décès (facultatif)",
        deathDatePet: "Date du décès (facultatif)",
        dedicationLabel: "Dédicace (facultatif)",
        dedicationPlaceholder: "Un court message qui accompagne l'album…"
      },
      step2: {
        title: "Quel style pour votre album ?",
        subtitle: "Le style donne le ton de toutes les pages.",
        modernLabel: "Moderne",
        modernDesc: "Épuré, intemporel, minimaliste",
        classicLabel: "Classique",
        classicDesc: "Chaleureux, digne, traditionnel",
        timelessLabel: "Intemporel",
        timelessDesc: "Épuré, paisible, grandes images",
        selected: "Sélectionné",
        previewIframeTitle: (style: string) => `Aperçu ${style}`
      },
      step3: {
        title: "Vos photos & vidéos",
        countLabel: (count: number, max: number) => `${count} / ${max}`,
        intro: (min: number, max: number) => `Téléchargez au moins ${min} images (max. ${max}). Nous créons votre album à partir de celles-ci.`,
        moreNeeded: (n: number, min: number) => `Encore ${n} images supplémentaires nécessaires (minimum : ${min}).`,
        dropZoneTitle: "Déposez les fichiers ici",
        dropZoneOr: "ou",
        dropZoneSelect: "Choisir des fichiers",
        dropZoneRange: (min: number, max: number) => `Images & vidéos · min. ${min}, max. ${max} fichiers`,
        compressing: "Compression des images en cours…",
        removeAria: "Supprimer",
        musicTitle: "Musique d'accompagnement (facultatif)",
        pause: "Pause",
        play: "Lire",
        selected: "Sélectionné",
        select: "Choisir",
        pixabayPlaceholder: "Lien Pixabay (facultatif)",
        pixabayLabel: "Lien Pixabay",
        pixabayOpen: "Ouvrir",
        noSelection: "Aucune sélection",
        captionPlaceholder: "Légende pour cette image (facultatif)",
        captionPlaceholderVideo: "Légende pour cette vidéo (facultatif)"
      },
      step4: {
        title: "Contact & paiement",
        subtitle: "Presque terminé — nous nous occupons du reste.",
        contactSection: "Contact",
        nameLabel: "Votre nom *",
        namePlaceholder: "Prénom et nom",
        emailLabel: "E-mail *",
        emailPlaceholder: "votre@email.ch",
        phoneLabel: "Téléphone (facultatif)",
        phonePlaceholder: "+41 79 000 00 00",
        addressSection: "Adresse de livraison (pour le Smart Tag)",
        shippingPrefix: "Livraison :",
        streetLabel: "Rue & n° *",
        streetPlaceholder: "Rue de l'Exemple 12",
        postalLabel: "NPA *",
        cityLabel: "Localité *",
        cityPlaceholder: "Zurich",
        countryLabel: "Pays *",
        summaryTitle: "Récapitulatif",
        summaryFor: "Pour",
        summaryStyle: "Style",
        summaryImagesLabel: "Images",
        summaryImages: (count: number) => `${count} fichiers`,
        summaryMusic: "Musique",
        summaryShipping: "Livraison",
        summaryNoSelection: "Aucune sélection",
        totalLabel: "Prix total",
        processing: "Traitement en cours…",
        payCta: (price: string) => `Commander avec paiement — ${price}`,
        testCta: "🧪 Commande test (sans paiement)"
      },
      validation: {
        pickAudience: "Veuillez choisir le destinataire et saisir un nom.",
        pickStyle: "Veuillez choisir un style.",
        uploadMin: (min: number) => `Veuillez télécharger au moins ${min} images.`,
        fillRequired: "Veuillez remplir tous les champs obligatoires.",
        emailRequired: "Veuillez saisir une adresse e-mail.",
        nameRequired: "Veuillez saisir un nom.",
        addressRequired: "Veuillez compléter intégralement l'adresse de livraison.",
        completeAllSteps: "Veuillez terminer toutes les étapes.",
        minMediaError: (min: number) => `Au moins ${min} images sont requises.`
      },
      toasts: {
        uploading: (count: number) => `Téléchargement de ${count} fichiers…`,
        errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
        orderCreatedNoPayment: "Commande créée. Paiement à régler par facture.",
        filesAdded: (count: number) => `${count} fichiers ajoutés.`,
        maxReached: (max: number) => `Maximum de ${max} images atteint.`,
        videoTooBig: (filename: string) => `${filename} trop volumineux (max 200 Mo).`
      },
      shippingZones: { ch: "Suisse", eu: "Europe", world: "Mondial" },
      styleNames: { modern: "Moderne", classic: "Classique", timeless: "Intemporel" },
      success: {
        title: "Commande reçue",
        message: "Merci. Nous créons votre album avec soin sous 48 heures et vous envoyons le lien par e-mail."
      }
    },

    cookieBanner: {
      title: "Nous utilisons des cookies",
      text: "Nous utilisons des cookies strictement nécessaires et — uniquement avec votre accord — des cookies d'analyse pour comprendre l'usage du site.",
      learnMore: "En savoir plus",
      accept: "Accepter",
      decline: "Refuser"
    },

    navAria: {
      main: "Navigation principale",
      theme: "Thème",
      menu: "Menu",
      close: "Fermer",
      closePreview: "Fermer l'aperçu"
    },

    notFoundPage: {
      title: "Page introuvable",
      message: "Cette page n'existe pas.",
      ctaHome: "Retour à l'accueil"
    },

    meta: {
      landing: {
        title: "Memora Moments — Un instant. Pour toujours.",
        description: "Un Smart Tag empreint de dignité et un album photo numérique vivant. Pour les êtres et les animaux qui restent dans nos mémoires."
      },
      selfService: { title: "Télécharger des images — Memora Moments" },
      partner: { title: "Téléchargement partenaire - Memora Moments" }
    },

    selfServicePage: {
      back: "Retour",
      eyebrow: "Votre album commence ici",
      titleLine1: "Votre album commence",
      titleLine2: "ici.",
      subtitle: "Vous téléchargez vos photos — nous créons votre album avec soin."
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
      description: "Pour tout achat effectué directement sur notre site web, nous versons 10 % du montant d’achat de chaque produit Memora Moments à la Fondation Make-A-Wish, afin d’apporter espoir et joie.",
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
        imagesLabel: "Images (max. 50MB pour image)",
        videosLabel: "Vidéos (max. 50MB pour vidéo)",
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
      description: "Pour chaque produit Memora Moments acheté directement sur notre site web, nous versons 10 % du montant d’achat à la Fondation Service de Sauvetage des Animaux, afin d’aider les animaux dans le besoin.",
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
        imagesLabel: "Images (max. 50MB pour image)",
        videosLabel: "Vidéos (max. 50MB pour vidéo)",
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
      subtitle: "Mariage, anniversaire ou jubilé – avec Memora Moments, vous rendez les souvenirs tangibles. Un simple geste avec votre smartphone, et l’album souvenir numérique s’ouvre – un cadeau qui touche le cœur.",
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
      description: "Pour tout achat effectué directement sur notre site web, nous versons 10 % du montant d’achat de chaque produit Memora Moments à la Fondation Make-A-Wish, afin d’apporter espoir et joie.",
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
        imagesLabel: "Images (max. 50MB pour image)",
        videosLabel: "Vidéos (max. 50MB pour vidéo)",
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