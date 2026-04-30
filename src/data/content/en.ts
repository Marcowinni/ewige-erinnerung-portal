import { ContentData } from './types';

export const enContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Create Memorial",
      about: "About Us",
      contact: "Contact",
      start: "Create album",
      create: "Create",
      mode: { human: "Human", pet: "Pets", surprise: "Surprise" }
    },

    banner: {
      text: "Free delivery throughout Switzerland"
    },

    albumPage: {
      title: (name) => `Memories of ${name}`,
      preTitle: "A digital album for: ",
      subtitle: "A collection of unforgettable moments.",
      defaultName: "these special moments",
      playButton: "Play Music",
      pauseButton: "Pause Music",
      playButtonHint: "Control the music here",
      openAlbum: "Open Album"
    },

    // SEO/Meta for the About page
    about: {
      title: "About Us - Memora Moments",
      heading: "About Memora Moments",
      description: "Learn more about our mission to create dignified memories."
    },

    // Contact page (complete, without fallbacks)
    contact: {
      title: "Contact - Memora Moments",
      heading: "Get in Touch",
      description: "Do you have questions? We are here to help you.",
      email: "E-Mail",
      phone: "Phone",
      form: {
        title: "Send a Message",
        submit: "Submit",
        success: "Thank you! We will get back to you as soon as possible.",
        name: {
          label: "Name",
          placeholder: "First and last name"
        },
        email: {
          label: "E-Mail",
          placeholder: "your@example.com"
        },
        subject: {
          label: "Subject",
          placeholder: "What is it about?"
        },
        message: {
          label: "Message",
          placeholder: "Your message to us…"
        }
      }
    },

    // About page Content
    aboutPage: {
      title: "About Us",
      lead: "We connect memories with technology – empathetic, personal, accessible.",
      story: {
        title: "Our Story",
        p1: "Memora Moments was born from the desire to preserve memories with dignity.",
        p2: "Sometimes it's the quiet moments that change our lives forever. We have all lost people or loyal companions who were particularly close to us – whether it was a beloved family member or a pet that has left a mark on our hearts.",
        p3: "In these moments of grief, we long for closeness, for a place where memories do not fade but live on. The idea for Memora Moments originated precisely from this experience.",
        p4: "This project was born out of love for our closest confidants and the desire to preserve their stories and uniqueness. A small gift, initially intended only for our loved ones, has shown us how valuable it can be to keep memories tangible and alive – through pictures, videos, and music that can bring back a smile.",
        p5: "Today, we want to share this opportunity with others. With our products, we create bridges between the past and the present – dignified, personal, and close to the heart. We believe that memories do not have to end with farewell. They can continue to shine, comfort us, and give us strength."
      },
      values: {
        title: "Our Values",
        compassion: {
          title: "Compassion",
          desc: "We work respectfully and empathetically – for people in special life situations."
        },
        personality: {
          title: "Personality",
          desc: "Every memorial is individual – we design as much as necessary, and as little as possible."
        },
        connection: {
          title: "Connection",
          desc: "Pictures, videos, and sound create closeness – anytime, at the memorial site or at home."
        }
      },
      product: {
        title: "Why Memora?",
        p1: "Because memories are more than just thoughts – they deserve a dignified place.",
        p2: "Our Memora products combine technology with emotion – simple, beautiful, sustainable."
      },
      founders: {
        eyebrow: "The people behind it",
        title: "Memora Moments is built by the two of us",
        intro: "Two friends, one idea – and a shared need to give memories a place that lasts. We are not a big company, but two makers who look at every album with the same care we'd put into one for our own loved ones.",
        till: {
          name: "Till",
          role: "Co-founder · Vision & Product",
          bio: "Till thinks in stories. When he's not sketching concepts for Memora, he's usually outside – with a backpack, a camera, or skis. What drives him: the feeling that every person and every animal deserves a story that doesn't get lost in the everyday. This attitude shapes every detail of our albums.",
          quote: "A day, an image, a song – sometimes that's all it takes to feel someone close again.",
          hobbies: ["Travel", "Photography", "Mountains"],
          photoCaptions: {
            main: "Till",
            one: "Australia – backpack, open roads, a lot of stories.",
            two: "Winter days when the world stands still for a moment."
          }
        },
        wini: {
          name: "Marco \"Wini\" Winistörfer",
          role: "Co-founder · Tech & Platform",
          bio: "Wini builds. Code by day, sometimes a bit more code by night. He's the pragmatist on the team – finding solutions while others are still talking about the problem. For him, Memora Moments is the place where technology finally does what it's meant to do: bring people closer to one another.",
          quote: "Good tech doesn't draw attention to itself. It clears the way for what really matters.",
          hobbies: ["Kitesurfing", "Hiking", "Coding"],
          photoCaptions: {
            main: "Marco \"Wini\"",
            one: "On the water – where the head finally clears.",
            two: "Mountains, a favourite place to breathe."
          }
        }
      }
    },

    // Legal texts (for Privacy/Terms/Imprint pages)
    legal: {
      privacy: {
        title: "Privacy Policy",
        sections: {
          responsible: {
            title: "1. Data Controller",
            content:
              "TW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Switzerland\nE-Mail: info@memora-moments.ch\nPhone: +41 79 407 56 99\n\nWe are the controller for the collection, processing and use of your personal data within the meaning of the revised Swiss Federal Act on Data Protection (revFADP) and — where applicable — the EU General Data Protection Regulation (GDPR)."
          },
          dataCollection: {
            title: "2. Data we collect",
            content:
              "We only process data you provide while placing an order, building an album or accessing a published album. Specifically:",
            list: [
              "Order data: name, shipping address, e-mail, optionally phone, payment information (handled via Stripe)",
              "Album content: photos and videos (max. 40 files, max. 200 MB per video), captions, optional dedication, name and life dates of the person remembered, and the chosen music track",
              "Editor settings: layout choices, per-page text, image focal point — saved alongside the album in our database",
              "Smart Tag slug: every album receives a unique URL (e.g. memora-moments.ch/album/marie-01) which is opened via NFC or QR code",
              "Technical data on album access: IP (truncated by our CDN providers), browser, device and timestamp — anonymised and used for security and performance",
              "Cookie data: a consent cookie and — only after your opt-in — Google Analytics for reach measurement"
            ]
          },
          purpose: {
            title: "3. Purpose of processing",
            content:
              "We use your data exclusively to:",
            list: [
              "Fulfil your order (physical Smart Tag and digital album)",
              "Build, lay out and publish your personalised album",
              "Deliver the album content when the Smart Tag or QR code URL is opened",
              "Process payment via Stripe and send order confirmation by e-mail",
              "Reach out for clarifications, corrections or support",
              "Operate, secure and improve the platform"
            ]
          },
          disclosure: {
            title: "4. Sharing with third parties / processors",
            content:
              "We do not sell data and do not share it for advertising. To run the platform we rely on the following processors:",
            list: [
              "Supabase (storage and database, EU region) — stores album content, order data and editor settings",
              "Vercel (hosting and edge CDN) — serves the website and album pages",
              "Stripe (payment processing) — handles card and TWINT payments directly; we never receive full card data",
              "Resend (transactional e-mail) — sends order confirmations and album notifications",
              "Swiss Post and logistics partners — ship the physical Smart Tag",
              "Google Analytics (only with cookie consent) — anonymised reach measurement"
            ]
          },
          storage: {
            title: "5. Storage and deletion",
            content:
              "Order data is retained in line with Swiss bookkeeping obligations (10 years). Album content remains accessible for at least 12 months from delivery of the Smart Tag; availability beyond that is not contractually guaranteed. On written request we delete or anonymise album content earlier, provided no legal retention obligation applies."
          },
          security: {
            title: "6. Data security",
            content:
              "We protect your data with state-of-the-art technical and organisational measures: TLS-only transport, database access control (Row-Level Security), separate service keys for edge functions and regular backups at our cloud providers. Complete protection of internet transmissions (e.g. e-mail) cannot be guaranteed."
          },
          rights: {
            title: "7. Your rights",
            content:
              "You have the following rights against us. Please direct requests to info@memora-moments.ch:",
            list: [
              "Access to the data we hold about you",
              "Rectification of inaccurate or incomplete data",
              "Erasure, unless legal retention obligations apply",
              "Restriction of or objection to certain processing activities",
              "Data portability in a common electronic format",
              "Withdrawal of any consent given, with effect for the future"
            ]
          },
          cookies: {
            title: "8. Cookies and tracking",
            content:
              "We use strictly necessary cookies (e.g. language and consent cookie) which may be set without consent. Optional analytics cookies (Google Analytics) are only set after you accept in the consent banner. You can withdraw consent at any time by deleting the 'memora-cookie-consent' cookie in your browser."
          },
          changes: {
            title: "9. Changes to this policy",
            content:
              "We may amend this policy when features or processors change. The version published on this page applies."
          }
        }
      },
      terms: {
        title: "Terms and Conditions",
        sections: {
          scope: {
            title: "Preamble and Contact",
            content: "This website is operated by TW Projects GmbH under the brand Memora Moments. \"We\", \"us\" and \"our\" refer to TW Projects GmbH; \"you\" or \"customer\" refers to the user.\n\nContact:\nTW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Switzerland\nE-Mail: info@memora-moments.ch\nPhone: +41 79 407 56 99\n\nThese terms are available in German, English, French and Italian. In case of discrepancies the German version is legally binding."
          },
          contract: {
            title: "1. Scope and conclusion of contract",
            content: "These terms apply to every order placed via memora-moments.ch and to use of the album editor and published album.\n\nThe presentation of products on the site is not a binding offer but an invitation to order. By completing the checkout flow (payment confirmation via Stripe) you submit a binding offer. The contract is concluded once we send the order confirmation by e-mail or trigger delivery."
          },
          services: {
            title: "2. Description of services",
            content: "Memora Moments combines two services:\n\n1) Physical product: a Smart Tag (NFC / QR plaque) that can be discreetly attached to gravestones, urns or partner products (e.g. Zeichnungsverlag).\n\n2) Digital album: a photo and video album accessible via the Smart Tag, designed by you in our online editor. You choose the style (Modern, Classic, Timeless), the layout per page, the focal point of each image, optional captions and a music track.\n\nThe album is published at a unique URL (memora-moments.ch/album/<slug>) and linked to the Smart Tag."
          },
          prices: {
            title: "3. Prices, shipping and payment",
            content: "The base price per album is CHF 80.– (incl. any applicable VAT, current website prices apply).\n\nShipping is handled by Swiss Post (A Mail). Shipping costs by zone:\n– Switzerland (CH): CHF 1.20\n– Europe (EU): CHF 1.90\n– World (WORLD): CHF 2.20\n\nAll prices are in Swiss Francs. Any import duties or customs fees on shipments outside Switzerland are borne by the recipient.\n\nPayment is made before delivery via Stripe (credit/debit card or TWINT). Test orders without payment are only available after explicit activation by us.\n\nIn case of chargebacks we are entitled to invoice the related bank fees."
          },
          delivery: {
            title: "4. Order flow, delivery and transfer of risk",
            content: "The checkout flow consists of 8 steps: audience (human/pet), style choice, media upload, album editor, music, preview, personal details and payment.\n\nOnce payment is received we begin production of the Smart Tag and publication of the album. Delivery follows within 30 days from contract conclusion unless otherwise stated.\n\nThe risk of accidental loss or damage to the physical product passes to you on handover to the carrier. Until full payment the product remains our property (retention of title under Swiss law)."
          },
          cancellation: {
            title: "5. Withdrawal for personalised products",
            content: "The Smart Tag and digital album are produced and published individually to your specifications. Personalised products are excluded from the statutory right of withdrawal or return.\n\nWarranty rights (clause 8) are unaffected. Please review your album content carefully in the full-screen preview before placing your order."
          },
          warranty: {
            title: "6. Customer content — rights and duties",
            content: "You upload up to 40 media files in the editor (images compressed to roughly 1 MB each, videos up to 200 MB). You confirm that you hold the necessary copyright, personal-image and data-protection rights to all uploaded content — including images, videos, audio, text, names and life dates — or that you have obtained consent from the rights-holders or relatives.\n\nFor the creation, storage, delivery and preview of your album you grant us a non-exclusive, worldwide licence limited to the contractual purpose.\n\nWe reserve the right to reject or remove content that is obviously unlawful, contrary to public morals or infringes third-party rights."
          },
          liability: {
            title: "7. Notice-and-takedown procedure",
            content: "If you are an authorised person (e.g. relative, heir, depicted person) and consider your rights infringed by a published album, please contact us at info@memora-moments.ch with the album URL and a description of the infringement.\n\nUpon receipt of a substantiated notice we take the album or content offline without undue delay and contact the original customer for clarification."
          },
          ip: {
            title: "8. Warranty and liability",
            content: "The statutory defect warranty under the Swiss Code of Obligations applies. Complaints must be raised in writing within 21 days of receipt of the delivery. We will, at our discretion, repair or replace the product.\n\nExcluded from warranty are in particular:\n– typos, layout or selection mistakes made by the customer in the editor,\n– low-quality images or videos (low resolution, heavy compression),\n– colour deviations caused by different displays or printing,\n– transport damage not reported within 7 days of receipt.\n\nOur liability is limited, to the extent legally permitted, to intent and gross negligence. We are only liable for slight negligence in case of personal injury. Liability for consequential damages, loss of profit or data loss is excluded to the extent legally permitted."
          },
          privacy: {
            title: "9. Availability of digital services",
            content: "Editor, album delivery and checkout run on cloud infrastructure (notably Vercel and Supabase, EU region). We aim for high availability but do not guarantee any specific service level.\n\nShort interruptions due to maintenance, security updates or provider incidents are possible. There is no entitlement to a specific hosting platform."
          },
          special: {
            title: "10. Third-party rights",
            content: "You alone are responsible for holding the rights to the content you upload. Should third parties bring claims against us for infringement of copyright, trademark or personal rights, you indemnify us against such claims and bear the cost of defence — without prejudice to any damages claims of our own."
          },
          law: {
            title: "11. Data protection",
            content: "Collection and processing of personal data is governed by our privacy policy. You acknowledge that we engage processors (notably Supabase, Vercel, Stripe and Resend) and that content is delivered to end devices via content-delivery networks."
          },
          final: {
            title: "12. Donation policy",
            content: "TW Projects GmbH donates 10 % of the net sales price of each Memora Moments product sold directly via memora-moments.ch to charitable organisations (e.g. Make-A-Wish Switzerland or the Animal Rescue Foundation).\n\nPurchases made through partner channels, resellers or co-operations (e.g. influencer links) are excluded.\n\nDonations are paid out once a year at year-end. The choice of the beneficiary and the handling are at our sole discretion. Customers have no individual legal claim to forwarding or earmarking of the donation."
          },

          contact: {
            title: "13. Prohibited uses",
            content: "The platform may not be used for unlawful purposes, spam, malware, the upload of child-pornographic, violence-glorifying or hateful content, or any infringement of third-party rights.\n\nIn case of breach we are entitled to take the album offline immediately, suspend the account and — if necessary — inform law-enforcement authorities. Amounts already paid are not refunded in such cases."
          },
          availability: {
            title: "14. Availability of digital album content",
            content: "We ensure that a published album remains accessible via the Smart Tag URL for at least 12 months from delivery of the Smart Tag, unless otherwise stated. Availability beyond that is not contractually guaranteed.\n\nWe are not liable for outages, changes or shutdowns of external services or for data losses outside our control. We reserve the right to migrate album content to other services or hosting platforms without giving rise to any claim by the customer to a specific provider.\n\nGoverning law: Swiss law, excluding the United Nations Convention on Contracts for the International Sale of Goods. To the extent legally permitted, the place of jurisdiction is the registered seat of TW Projects GmbH (Dürnten ZH)."
          },
        },
      },
      imprint: {
        title: "Imprint",
        sections: {
          info: {
            title: "Memora Moments",
            content: "Personalized memorial products"
          },
          contact: {
            title: "Contact",
            content:
              "E-mail: info@memora.moments.ch\nPhone: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsibility",
            content: "Memora Moments\nE-mail: info@memora.moments.ch"
          },
          disclaimer: {
            title: "Disclaimer",
            content: {
              title: "Liability for Content",
              content:
                "The contents of our website have been created with the greatest care. However, we cannot guarantee the accuracy, completeness or timeliness of the content. We reserve the right to change, supplement or remove content at any time."
            },
            links: {
              title: "Liability for Links",
              content:
                "Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages."
            },
            copyright: {
              title: "Copyright",
              content:
                "The content and works on this website are subject to Swiss copyright law. Any reproduction, editing, distribution or any kind of exploitation outside the limits of copyright law requires the prior written consent of the respective author or rights holder. Downloads and copies of this site are permitted only for private use."
            }
          }
        }
      }

    },

    orderSuccessPage: {
      title: "Order Successful - Memora Moments",
      heading: "Thank you for your order!",
      message1: "We have received your order and will process it as soon as possible.",
      buttonHome: "Back to Homepage"
    },
    orderCancelPage: {
      title: "Order Canceled - Memora Moments",
      heading: "Order Canceled",
      message: "The payment process was canceled. Your cart has been saved.",
      buttonBack: "Back to Cart"
    },

    footer: {
      brand: {
        name: "Memora Moments",
        description:
          "Digital memorial moments – dignified, weatherproof, and easy to share."
      },
      contactTitle: "Contact",
      linksTitle: "Links",
      legal: {
        privacy: "Privacy",
        terms: "Terms",
        imprint: "Imprint"
      },
      copyright: "All rights reserved."
    },

    landing: {
      hero: {
        eyebrow: "Memora Moments",
        titleLine1: "Memories",
        titleLine2: "that live on",
        subtitle1: "A dignified Smart Tag that brings the most precious moments with your loved ones together in a digital memory album.",
        subtitle2: "For people and animals who stay in memory across generations.",
        ctaCreate: "Create your album"
      },
      pathChoice: {
        eyebrow: "How it works",
        titleLine1: "Every moment",
        titleLine2: "deserves its place.",
        ctaCreate: "Create album"
      },
      audience: {
        eyebrow: "For all who walked beside us",
        titleLine1: "For every",
        titleLine2: "beloved companion.",
        human: {
          eyebrow: "For people",
          headline: "For the people\nwho walked beside us.",
          body: ""
        },
        pet: {
          eyebrow: "For animals",
          headline: "For your\nfaithful companion.",
          body: ""
        }
      },
      styleShowcase: {
        eyebrow: "Three styles",
        titleLine1: "Every story",
        titleLine2: "deserves its tone.",
        hint: "Browse our albums and find your style.",
        ctaPickStyle: "Choose your style",
        previewTitle: (style: string) => `${style} Album Preview`,
        navBack: "Back",
        navForward: "Next",
        themes: { modern: "Modern", classic: "Classic", timeless: "Timeless" }
      },
      partner: {
        eyebrow: "Together",
        titleLine1: "In partnership with",
        titleLine2: "Zeichnungsverlag",
        body: "Our tag fits discreetly onto gravestones, urns, and the products of Zeichnungsverlag — creating subtle bridges between physical places of remembrance and digital memories.",
        cta: "Visit Zeichnungsverlag"
      },
      productFeatures: {
        eyebrow: "The product",
        titleLine1: "A small Tag,",
        titleLine2: "endless memories.",
        intro: "Memora Moments combines a robust physical Smart Tag with a personally designed digital album. A single touch with your smartphone — and memories come alive.",
        items: {
          waterproof: {
            title: "Waterproof and weatherproof",
            body: "Made from durable material, the Smart Tag withstands rain and snow."
          },
          adhesive: {
            title: "High-quality 3M adhesive",
            body: "The industrial 3M adhesive bonds securely to smooth surfaces such as glass, metal, lacquered wood, and polished stone."
          },
          quality: {
            title: "Premium quality",
            body: "A sturdy Smart Tag with a long-lasting finish."
          },
          personal: {
            title: "Personally designed",
            body: "You upload your photos, videos, and texts — we shape them into a dignified album in the style you choose. Self-made, one of a kind."
          },
          privateUrl: {
            title: "Your own private URL",
            body: "Each album receives its own unique address. Only those who know the tag or receive the link can see the album."
          },
          versatile: {
            title: "Versatile in use",
            body: "Place the Smart Tag on gravestones, urns, picture frames, keepsake boxes, or other meaningful objects."
          }
        },
        price: {
          label: "Complete package",
          amount: "CHF 80",
          note: "Smart Tag + personal album · plus shipping from CHF 1.20",
          cta: "Create album now"
        }
      },
      useCaseGallery: {
        eyebrow: "Where it belongs",
        titleLine1: "Where the tag",
        titleLine2: "finds its place.",
        intro: "Inspiration for places where a Memora Moments tag becomes a quiet bridge between then and now.",
        cases: {
          gravestone: "On the gravestone",
          urn: "On the urn",
          memorialWall: "On the memorial wall",
          keepsake: "On a keepsake box",
          petCorner: "At the pet remembrance corner",
          photoFrame: "On the picture frame at home"
        }
      }
    },

    customerWizard: {
      stepLabels: ["For whom", "Style", "Photos", "Order"],
      progress: (current: number, total: number) => `Step ${current} of ${total}`,
      nav: { back: "Back", next: "Next", toStep4: "Continue to order" },
      step1: {
        title: "Who are we creating this album for?",
        subtitle: "Select an option and fill in the details.",
        optionHuman: "For a person",
        optionPet: "For an animal",
        nameLabel: "Name *",
        namePlaceholderHuman: "Name of the person",
        namePlaceholderPet: "Name of the animal",
        birthDate: "Date of birth (optional)",
        deathDateHuman: "Date of passing (optional)",
        deathDatePet: "Date of passing (optional)",
        dedicationLabel: "Dedication (optional)",
        dedicationPlaceholder: "A short message to accompany the album…"
      },
      step2: {
        title: "Which style would you like for your album?",
        subtitle: "The style shapes the look and feel of every page.",
        modernLabel: "Modern",
        modernDesc: "Clean, timeless, minimalist",
        classicLabel: "Classic",
        classicDesc: "Warm, dignified, traditional",
        timelessLabel: "Timeless",
        timelessDesc: "Clean, calm, large images",
        selected: "Selected",
        previewIframeTitle: (style: string) => `${style} preview`
      },
      step3: {
        title: "Your photos & videos",
        countLabel: (count: number, max: number) => `${count} / ${max}`,
        intro: (min: number, max: number) => `Upload at least ${min} images (max. ${max}). We will craft your album from them.`,
        moreNeeded: (n: number, min: number) => `${n} more images needed (minimum: ${min}).`,
        dropZoneTitle: "Drop files here",
        dropZoneOr: "or",
        dropZoneSelect: "Select files",
        dropZoneRange: (min: number, max: number) => `Images & videos · min. ${min}, max. ${max} files`,
        compressing: "Compressing images…",
        removeAria: "Remove",
        musicTitle: "Accompanying music (optional)",
        pause: "Pause",
        play: "Play",
        selected: "Selected",
        select: "Select",
        pixabayPlaceholder: "Pixabay link (optional)",
        pixabayLabel: "Pixabay link",
        pixabayOpen: "Open",
        noSelection: "None selected",
        captionPlaceholder: "Caption for this picture (optional)",
        captionPlaceholderVideo: "Caption for this video (optional)"
      },
      step4: {
        title: "Contact & payment",
        subtitle: "Almost done — we will take care of the rest.",
        contactSection: "Contact",
        nameLabel: "Your name *",
        namePlaceholder: "First and last name",
        emailLabel: "Email *",
        emailPlaceholder: "your@email.com",
        phoneLabel: "Phone (optional)",
        phonePlaceholder: "+41 79 000 00 00",
        addressSection: "Shipping address (for Smart Tag)",
        shippingPrefix: "Shipping:",
        streetLabel: "Street & no. *",
        streetPlaceholder: "Sample Street 12",
        postalLabel: "Postal code *",
        cityLabel: "City *",
        cityPlaceholder: "Zürich",
        countryLabel: "Country *",
        summaryTitle: "Summary",
        summaryFor: "For",
        summaryStyle: "Style",
        summaryImagesLabel: "Images",
        summaryImages: (count: number) => `${count} files`,
        summaryMusic: "Music",
        summaryShipping: "Shipping",
        summaryNoSelection: "None selected",
        totalLabel: "Total price",
        processing: "Processing…",
        payCta: (price: string) => `Place order — ${price}`,
        testCta: "🧪 Test order (no payment)"
      },
      validation: {
        pickAudience: "Please choose a recipient and enter a name.",
        pickStyle: "Please choose a style.",
        uploadMin: (min: number) => `Please upload at least ${min} images.`,
        fillRequired: "Please fill in all required fields.",
        emailRequired: "Please enter an email address.",
        nameRequired: "Please enter a name.",
        addressRequired: "Please complete the shipping address.",
        completeAllSteps: "Please complete all steps.",
        minMediaError: (min: number) => `At least ${min} images are required.`
      },
      toasts: {
        uploading: (count: number) => `Uploading ${count} files…`,
        errorGeneric: "An error occurred. Please try again.",
        orderCreatedNoPayment: "Order created. Payment will follow by invoice.",
        filesAdded: (count: number) => `${count} files added.`,
        maxReached: (max: number) => `Maximum of ${max} images reached.`,
        videoTooBig: (filename: string) => `${filename} is too large (max 200 MB).`
      },
      shippingZones: { ch: "Switzerland", eu: "Europe", world: "Worldwide" },
      styleNames: { modern: "Modern", classic: "Classic", timeless: "Timeless" },
      success: {
        title: "Order received",
        message: "Thank you. We will craft your album with care within 48 hours and send you the link by email."
      }
    },

    cookieBanner: {
      title: "We use cookies",
      text: "We set strictly necessary cookies and — only with your consent — analytics cookies to understand how the site is used.",
      learnMore: "Learn more",
      accept: "Accept",
      decline: "Decline"
    },

    navAria: {
      main: "Main navigation",
      theme: "Theme",
      menu: "Menu",
      close: "Close",
      closePreview: "Close preview"
    },

    notFoundPage: {
      title: "Page not found",
      message: "This page does not exist.",
      ctaHome: "Back to home"
    },

    meta: {
      landing: {
        title: "Memora Moments — A moment. Forever.",
        description: "A dignified Smart Tag and a living digital photo album. For people and animals who remain in our memory."
      },
      selfService: { title: "Upload photos — Memora Moments" },
      partner: { title: "Partner Upload - Memora Moments" }
    },

    selfServicePage: {
      back: "Back",
      eyebrow: "Your album begins here",
      titleLine1: "Your album begins",
      titleLine2: "here.",
      subtitle: "You upload your photos — we craft your album with care."
    }
  },

  human: {
    hero: {
      title: "Memories that live on – with heart and sound.",
      subtitle:
        "A memorial piece with a Smart Tag – just a tap with your smartphone, and the digital memory album of your loved one opens. The most beautiful moments stay alive – in your heart and in special places.",
      startButton: "How it works",
      learnButton: "Learn More"
    },
    features: {
      title: "Unforgettable moments for eternity",
      subtitle:
        "Our Memora Moments combine modern technology with dignified remembrance.",
      unique: { title: "Unique Memorial", desc: "Honor the life of a loved one with a lasting memory." },
      multimedia: { title: "Multimedia Memories", desc: "Photos and videos bring special moments back to life." },
      music: { title: "Integrate Background Music", desc: "Music creates closeness and brings emotions to life." },
      quality: { title: "Dignified Design", desc: "Simple, high-quality materials that blend harmoniously into any grave or home." }
    },

    donation: {
      title: "Doing Good Together",
      description: "For direct purchases made through our website, we donate 10% of the purchase amount of each Memora Moments product to the Make-A-Wish Foundation to bring hope and joy.",
      linkText: "Learn more about Make-A-Wish"
    },

    howitworks: {
      title: "How It Works",
      subtitle: "To a personal Memora in just a few steps.",
      step1: { title: "Select Product", desc: "Choose between Memora Tag, Frame, or Deluxe." },
      step2: { title: "Select Media and Music", desc: "Carefully select photos, videos, or voice messages of your loved one and add a fitting musical background." },
      step3: { title: "Receive Memora", desc: "The Memora with Smart-Tag – already linked to your digital photo album – will be delivered to your home." }
    },
    products: {
      title: "Our Memoras:",
      subtitle: "The classic Memora products.",
      basic: { title: "Memora Tag", desc: "A simple Smart-Tag that brings memories to life via a digital photo album – discreet and everlasting.", price: "59 CHF" },
      premium: { title: "Memora Frame", desc: "A classic picture frame combined with modern technology. This turns every photo into a gateway to moving memories.", price: "89 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "A high-quality work of art that keeps the past alive and touches the future.", price: "149 CHF" },
      features: {
        tag1: "6×6 cm or 3 cm ⌀ Smart-Tag",
        tag2: "Browse personal digital photo album directly via tap",
        tag3: "Minimalist, timeless design, blends in harmoniously",
        tag4: "For tombstones, urns, memorial sites",
        premium1: "3 cm ⌀ Smart-Tag – connects picture & digital memorial",
        premium2: "Browse personal digital photo album directly via tap",
        premium3: "Personal design with your own photo",
        premium4: "Ideal for home, memorial corners, or as a gift",
        deluxe1: "High-quality 12×12 cm plexiglass plate with a noble finish",
        deluxe2: "Individual design with your own photo & text",
        deluxe3: "Browse personal digital photo album directly via tap",
        deluxe4: "Presentation with a stylish holder"
      }
    },
    cta: {
      title: "Honor Your Loved Ones",
      subtitle: "Create your memorial and preserve memories.",
      create: "Create Memorial",
      contact: "Contact Us"
    },
    gedenken: {
      title: "Create Memorial - Memora Moments",
      heading: "Create Your Memorial!",
      description: "Upload memories and we will create a dignified memorial."
    },
    // Uploader-Overrides
    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Select Product:" },
        step1Subtitle: "Choose your product – you will upload the content in the next step.",
        step2ByMode: { human: "Information about the person" },
        step2Subtitle: "Please fill out the following fields. Notes are optional.",
        step3Title: "Upload Pictures & Videos",
        step3Subtitle: "Files are saved in the form and sent later.",
        step4Title: "Contact Information",
        step4Subtitle: "We use this data for inquiries and order confirmation.",
        step5Title: "Billing Information & Overview",
        step5Subtitle: "Please check the address and the summary. With 'Proceed to Payment!' you will go to the checkout later.",
        summary: "Summary"
      },

      buttons: {
        back: "Back",
        next: "Next",
        reset: "Reset",
        toPay: "Proceed to Payment",
        addText: "Add Text",
        applyDesign: "Apply Design",
        remove: "Remove",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Design Frame",
        formatTitleDeluxe: "Design Deluxe",
        roundLabel: "Round · Ø 3 cm",
        squareLabel: "Square · 6×6 cm",
        petOptionsTitle: "Options for Pet Memora Tag",
        frameTip:"Tip: Move the picture with the mouse/touch and add & position texts freely.",
        frameOrientationLabel: "Orientation",
        framePortrait: "Portrait",
        frameLandscape: "Landscape",
      },
      editor: {
        image: "Picture",
        zoom: "Zoom",
        posX: "Horizontal Position",
        posY: "Vertical Position",
        emptyTitle: "No picture selected",
        emptySub: "Please select a picture above",
        selectedText: "Selected Text",
        content: "Content",
        font: "Font",
        size: "Size",
        color: "Color",
        previewLabel: "Adopted Preview",
        previewNote: "This preview will be saved with the order."
      },
      step2Fields: {
        human_lastName: "Last Name *",
        human_firstName: "First Name *",
        human_deathDate: "Date of Death",
        notes_human: "Notes (optional)",
        human_notesPH: "Special wishes, quotes, music notes…",
      },
      step3Fields: {
        imagesLabel: "Pictures (max. 50MB each)",
        videosLabel: "Videos (max. 50MB each)",
        remove: "Remove",
        imageCaptionPlaceholder: "Short text for the picture (optional)",
        videoCaptionPlaceholder: "Short text for the video (optional)",
        // Music Selection
        musicSelection: {
          title: "Select Music",
          availableMusic: "Available Music",
          selected: "Selected",
          select: "Select",
          moreMusic: "More Music from Pixabay",
          pixabayPlaceholder: "Paste link from pixabay.com/music/...",
          pixabayButton: "Pixabay Music",
        },
        calendarStyleSelection: {
          title: "Choose Album Style",
          modern: "Modern",
          classic: "Classic",
        },
      },
      contactFields: {
        firstName: "First Name *",
        lastName: "Last Name *",
        email: "E-Mail *",
        phoneOpt: "Phone (optional)"
      },
      invoiceFields: {
        sameAsContact: "Billing address same as contact address",
        companyOpt: "Company (optional)",
        firstName: "First Name *",
        lastName: "Last Name *",
        street: "Street & No. *",
        zip: "ZIP Code *",
        city: "City *",
        country: "Country *"
      },
      summary: {
        mode: "Mode",
        product: "Product",
        format: "Format",
        formatRound: "Round Ø 3 cm",
        formatSquare: "Square 6×6 cm",
        options: "Options",
        person: "Person",
        pet: "Pet",
        recipient: "Recipient",
        notes: "Notes",
        counts: (imgs, vids) => `Pictures: ${imgs} • Videos: ${vids}`,
        previewTitle: "Custom Preview",
        total: "Total: ",
        optionOrientation: "Orientation",
        optionPortrait: "Portrait",
        optionLandscape: "Landscape",
        modeHuman: "Human",
        modePet: "Pets",
        modeSurprise: "Surprise",
        calendarStyle: "Album-Style"
      },

      orderConfirmation: {
        prefix: "I have read and accept the",
        termsLinkText: "Terms and Conditions",
        separator: "and the",
        privacyLinkText: "Privacy Policy",
        suffix: "."
      },
      privacyNotice: {
      text: "By uploading pictures, you agree to our",
      privacyLink: "Privacy Policy",
      and: "and",
      termsLink: "Terms of Use",
      agreed: ".",
    },
    }
  },

  pet: {
    hero: {
      title: "For our loyal companions – memories with heart and sound.",
      subtitle:
        "A keepsake with a Smart Tag – just a tap with your smartphone, and the digital photo album of your beloved pet opens. The most beautiful moments stay alive – in your heart and in special places.",
      startButton: "How it works",
      learnButton: "Learn More"
    },
    features: {
      title: "Unforgettable moments with your darling",
      subtitle: "Digital memories for pets.",
      unique: { title: "Loving Memory", desc: "Preserve your pet’s loyal companionship in a lasting memory." },
      multimedia: { title: "Multimedia Experiences", desc: "Receive your digital photo album – with photos and videos of your pet that bring memories to life." },
      music: { title: "Favorite Sounds", desc: "Upload recordings of your pet or music in the album to make the memory audible." },
      quality: { title: "Dignified Design", desc: "Simple, high-quality materials that blend harmoniously into any home, whether indoors or outdoors." }
    },

    donation: {
      title: "Help for Animals in Need",
      description: "For every Memora Moments product purchased directly through our website, we donate 10% of the purchase amount to the Animal Rescue Service Foundation to help animals in need.",
      linkText: "More about the Animal Rescue Service"
    },

    howitworks: {
      title: "How It Works",
      subtitle: "To the Memora in three steps.",
      step1: { title: "Select Product", desc: "Choose between Memora Tag, Frame, or Deluxe." },
      step2: { title: "Select Media and Music or Sounds", desc: "Choose your favorite pictures and videos or even audio files and add suitable background music." },
      step3: { title: "Receive Memora", desc: "Your Memora with Smart-Tag – already linked to the digital photo album – will be delivered to your home" }
    },
    products: {
      title: "Pet Products",
      subtitle: "Memories for loyal companions.",
      basic: { title: "Memora Pet Tag", desc: "A simple Smart-Tag that brings memories of your pet to life with a digital photo album", price: "from 59 CHF" },
      premium: { title: "Memora Pet Frame", desc: "A stylish picture frame that connects your favorite photo with a digital photo album – ideal for home.", price: "89 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "An exclusive plexiglass plate with a holder – for a lasting, dignified memento.", price: "149 CHF" },
      features: {
        tag1: "6×6 cm or 2.5 cm ⌀ Smart-Tag",
        tag2: "Browse personal digital photo album directly via tap",
        tag3: "Minimalist, timeless design, blends in harmoniously",
        tag4: "Option: Standard simple, individually designed, or as a keychain",
        premium1: "3 cm ⌀ Smart-Tag – connects picture & digital memorial",
        premium2: "Browse personal digital photo album directly via tap",
        premium3: "Personal design with your own photo",
        premium4: "Ideal for home or as a gift",
        deluxe1: "High-quality 12×12 cm plexiglass plate with a noble finish",
        deluxe2: "Individual design with your own photo & text",
        deluxe3: "Browse personal digital photo album directly via tap",
        deluxe4: "Presentation with a stylish holder"
      }
    },
    cta: {
      title: "Honor Your Darling",
      subtitle: "A home in the heart – preserve the memory of your loyal companion.",
      create: "Create Memory",
      contact: "Contact Us"
    },
    gedenken: {
      title: "Create Pet Memorial - Memora Moments",
      heading: "Memorial for Your Pet",
      description: "Upload memories of your darling."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Select Product:", pet: "Select Product:", surprise: "Select Product (Surprise)" },
        step1Subtitle: "Choose your product – you will upload the content in the next step.",
        step2ByMode: { human: "Information about the person", pet: "Information about the pet", surprise: "Information for Surprise" },
        step2Subtitle: "Please fill out the following fields. Notes are optional.",
        step3Title: "Upload Pictures & Videos",
        step3Subtitle: "Files are saved in the form and sent later.",
        step4Title: "Contact Information",
        step4Subtitle: "We use this data for inquiries and order confirmation.",
        step5Title: "Billing Information & Overview",
        step5Subtitle: "Please check the address and the summary. With 'Proceed to Payment!' you will go to the checkout later.",
        summary: "Summary"
      },
      buttons: {
        back: "Back",
        next: "Next",
        reset: "Reset",
        toPay: "Proceed to Payment",
        addText: "Add Text",
        applyDesign: "Apply Design",
        remove: "Remove",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Design Frame",
        formatTitleDeluxe: "Design Deluxe",
        roundLabel: "Round · Ø 3 cm",
        squareLabel: "Square · 6×6 cm",
        petOptionsTitle: "Options for Pet Memora Tag",
        keychainLabel: "with keychain (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Individually customizable (+10 CHF)",
        designCustomNote: "Note: Custom design costs an additional +10 CHF.",
        frameTip:"Tip: Move the picture with the mouse/touch and add & position texts freely.",
        frameOrientationLabel: "Orientation",
        framePortrait: "Portrait",
        frameLandscape: "Landscape",
      },
      editor: {
        image: "Picture",
        zoom: "Zoom",
        posX: "Horizontal Position",
        posY: "Vertical Position",
        emptyTitle: "No picture selected",
        emptySub: "Please select a picture above",
        selectedText: "Selected Text",
        content: "Content",
        font: "Font",
        size: "Size",
        color: "Color",
        previewLabel: "Adopted Preview",
        previewNote: "This preview will be saved with the order."
      },
      step2Fields: {
        pet_name: "Pet's Name *",
        pet_deathDate: "Date of Death",
        notes_human: "Additional Notes",
        pet_notesPH: "Special wishes, favorite sounds, notes…",
      },
      step3Fields: {
        imagesLabel: "Pictures (max. 50MB each)",
        videosLabel: "Videos (max. 50MB each)",
        remove: "Remove",
        imageCaptionPlaceholder: "Short text for the picture (optional)",
        videoCaptionPlaceholder: "Short text for the video (optional)",
        musicSelection: {
          title: "Select Music",
          availableMusic: "Available Music",
          selected: "Selected",
          select: "Select",
          moreMusic: "More Music from Pixabay",
          pixabayPlaceholder: "Paste link from pixabay.com/music/...",
          pixabayButton: "Pixabay Music",
        },
      },
      contactFields: {
        firstName: "First Name *",
        lastName: "Last Name *",
        email: "E-Mail *",
        phoneOpt: "Phone (optional)"
      },
      invoiceFields: {
        sameAsContact: "Billing address same as contact address",
        companyOpt: "Company (optional)",
        firstName: "First Name *",
        lastName: "Last Name *",
        street: "Street & No. *",
        zip: "ZIP Code *",
        city: "City *",
        country: "Country *"
      },
      summary: {
        mode: "Mode",
        product: "Product",
        format: "Format",
        formatRound: "Round Ø 3 cm",
        formatSquare: "Square 6×6 cm",
        options: "Options",
        person: "Person",
        pet: "Pet",
        recipient: "Recipient",
        notes: "Notes",
        counts: (imgs, vids) => `Pictures: ${imgs} • Videos: ${vids}`,
        previewTitle: "Custom Preview",
        total: "Total: ",
        optionOrientation: "Orientation",
        optionPortrait: "Portrait",
        optionLandscape: "Landscape",
        modeHuman: "Human",
        modePet: "Pets",
        modeSurprise: "Surprise",
      },

      orderConfirmation: {
        prefix: "I have read and accept the",
        termsLinkText: "Terms and Conditions",
        separator: "and the",
        privacyLinkText: "Privacy Policy",
        suffix: "."
      },
      privacyNotice: {
        text: "By uploading pictures, you agree to our",
        privacyLink: "Privacy Policy",
        and: "and",
        termsLink: "Terms of Use",
        agreed: ".",
      }
    }
  },

  surprise: {
    hero: {
      title: "A gift that touches hearts – unforgettable surprises.",
      subtitle:
        "Whether it’s a wedding, birthday, or anniversary – with Memora Moments you make memories tangible. A simple tap with your smartphone, and the digital memory album opens – a gift that touches the heart.",
      startButton: "How it works",
      learnButton: "Learn More"
    },
    features: {
      title: "That certain something",
      subtitle: "Simple, dignified, and full of meaning.",
      unique: { title: "Unique Surprise", desc: "Every Surprise tells a little story." },
      multimedia: { title: "Multimedia Experiences", desc: "Photos, videos, and music make your gift lively and emotional." },
      music: { title: "Music & Messages", desc: "Add background music or a personal voice message." },
      quality: { title: "Elegant Design", desc: "Minimalist and high-quality – suitable for any occasion and celebration." }
    },

    donation: {
      title: "Giving a Smile",
      description: "For direct purchases made through our website, we donate 10% of the purchase amount of each Memora Moments product to the Make-A-Wish Foundation to bring hope and joy.",
      linkText: "Learn more about Make-A-Wish"
    },

    howitworks: {
      title: "How Surprise Works",
      subtitle: "Three steps to the surprise moment.",
      step1: { title: "Select Product", desc: "Choose between Memora Tag, Frame, or Deluxe." },
      step2: { title: "Select Media and Music", desc: "Choose your favorite pictures and videos or even voice messages and add suitable background music." },
      step3: { title: "Receive Surprise", desc: "Your Memora gift with Smart-Tag – already linked to the digital photo album – will be delivered to your home." }
    },
    products: {
      title: "Surprise Products",
      subtitle: "Choose your style.",
      basic: { title: "Memora Surprise Tag", desc: "A small Smart-Tag that connects a digital photo album – original and unique.", price: "59 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "A stylish picture frame that connects your favorite photo with a digital photo album – ideal as a gift.", price: "89 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "An exclusive plexiglass plate with integrated technology – the elegant premium gift for lasting memories.", price: "149 CHF" },
      features: {
        tag1: "6×6 cm or 3 cm ⌀ Smart-Tag",
        tag2: "Browse personal digital photo album directly via tap",
        tag3: "Minimalist, timeless design, blends in harmoniously",
        tag4: "A surprise that evokes emotions and will be remembered for a long time",
        premium1: "3 cm ⌀ Smart-Tag – connects picture & digital memorial",
        premium2: "Browse personal digital photo album directly via tap",
        premium3: "Personal design with your own photo",
        premium4: "The perfect gift for birthdays, weddings, or anniversaries",
        deluxe1: "High-quality 12×12 cm plexiglass plate with a noble finish",
        deluxe2: "Individual design with your own photo & text",
        deluxe3: "Browse personal digital photo album directly via tap",
        deluxe4: "Presentation with a stylish holder"
      }
    },
    cta: {
      title: "Ready for your surprise moment?",
      subtitle: "Surprise offers unique moments.",
      create: "Create Surprise",
      contact: "Contact Us"
    },
    gedenken: {
      title: "Create Surprise - Memora Moments",
      heading: "Your Surprise Moment",
      description: "Upload content and we will design your experience."
    },

    uploaderCopy: {
      headings: {
        pageTitleByMode: { human: "Select Product:", pet: "Select Product:", surprise: "Select Product (Surprise)" },
        step1Subtitle: "Choose your product – you will upload the content in the next step.",
        step2ByMode: { human: "Information about the person", pet: "Information about the pet", surprise: "Information for Surprise" },
        step2Subtitle: "Please fill out the following fields. Notes are optional.",
        step3Title: "Upload Pictures & Videos",
        step3Subtitle: "Files are saved in the form and sent later.",
        step4Title: "Contact Information",
        step4Subtitle: "We use this data for inquiries and order confirmation.",
        step5Title: "Billing Information & Overview",
        step5Subtitle: "Please check the address and the summary. With 'Proceed to Payment!' you will go to the checkout later.",
        summary: "Summary"
      },
      buttons: {
        back: "Back",
        next: "Next",
        reset: "Reset",
        toPay: "Proceed to Payment",
        addText: "Add Text",
        applyDesign: "Apply Design",
        remove: "Remove",
      },
      products: {
        formatTitle: "Format",
        frameTitle: "Design Frame",
        formatTitleDeluxe: "Design Deluxe",
        roundLabel: "Round · Ø 3 cm",
        squareLabel: "Square · 6×6 cm",
        petOptionsTitle: "Options for Pet Memora Tag",
        frameTip:"Tip: Move the picture with the mouse/touch and add & position texts freely.",
        frameOrientationLabel: "Orientation",
        framePortrait: "Portrait",
        frameLandscape: "Landscape",
      },
      editor: {
        image: "Picture",
        zoom: "Zoom",
        posX: "Horizontal Position",
        posY: "Vertical Position",
        emptyTitle: "No picture selected",
        emptySub: "Please select a picture above",
        selectedText: "Selected Text",
        content: "Content",
        font: "Font",
        size: "Size",
        color: "Color",
        previewLabel: "Adopted Preview",
        previewNote: "This preview will be saved with the order."
      },
      step2Fields: {
        surprise_name: "Name (Recipient) *",
        notes_human: "Occasion / Notes",
        surprise_notesPH: "Wedding, birthday, anniversary… special wishes…"
      },
      step3Fields: {
        imagesLabel: "Pictures (max. 50MB each)",
        videosLabel: "Videos (max. 50MB each)",
        remove: "Remove",
        imageCaptionPlaceholder: "Short text for the picture (optional)",
        videoCaptionPlaceholder: "Short text for the video (optional)",
        musicSelection: {
          title: "Select Music",
          availableMusic: "Available Music",
          selected: "Selected",
          select: "Select",
          moreMusic: "More Music from Pixabay",
          pixabayPlaceholder: "Paste link from pixabay.com/music/...",
          pixabayButton: "Pixabay Music",
        },
      },
      contactFields: {
        firstName: "First Name *",
        lastName: "Last Name *",
        email: "E-Mail *",
        phoneOpt: "Phone (optional)"
      },
      invoiceFields: {
        sameAsContact: "Billing address same as contact address",
        companyOpt: "Company (optional)",
        firstName: "First Name *",
        lastName: "Last Name *",
        street: "Street & No. *",
        zip: "ZIP Code *",
        city: "City *",
        country: "Country *"
      },
      summary: {
        mode: "Mode",
        product: "Product",
        format: "Format",
        formatRound: "Round Ø 3 cm",
        formatSquare: "Square 6×6 cm",
        options: "Options",
        person: "Person",
        pet: "Pet",
        recipient: "Recipient",
        notes: "Notes",
        counts: (imgs, vids) => `Pictures: ${imgs} • Videos: ${vids}`,
        previewTitle: "Custom Preview",
        total: "Total: ",
        optionOrientation: "Orientation",
        optionPortrait: "Portrait",
        optionLandscape: "Landscape",
        modeHuman: "Human",
        modePet: "Pets",
        modeSurprise: "Surprise",
      },

      orderConfirmation: {
        prefix: "I have read and accept the",
        termsLinkText: "Terms and Conditions",
        separator: "and the",
        privacyLinkText: "Privacy Policy",
        suffix: "."
      },
      privacyNotice: {
        text: "By uploading pictures, you agree to our",
        privacyLink: "Privacy Policy",
        and: "and",
        termsLink: "Terms of Use",
        agreed: ".",
      }
    }
  }
};