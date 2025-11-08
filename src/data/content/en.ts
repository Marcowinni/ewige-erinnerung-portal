import { ContentData } from './types';

export const enContent: ContentData = {
  shared: {
    navigation: {
      home: "Memora Moments",
      gedenken: "Create Memorial",
      about: "About Us",
      contact: "Contact",
      start: "Start Memorial",
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
      }
    },

    // Legal texts (for Privacy/Terms/Imprint pages)
    legal: {
      privacy: {
        title: "Privacy Policy",
        sections: {
          responsible: {
            title: "1. Responsible Body",
            content:
              "Memora Moments\nBreitenmattstrasse\n8635 Dürnten\nE-Mail: info@memora.moments.ch\nPhone: +41 79 407 56 99\n\nWe are responsible for the collection, processing, and use of your personal data in accordance with the Swiss Data Protection Act (revDSG)."
          },
          dataCollection: {
            title: "2. Collection and Processing of Personal Data",
            content:
              "We process personal data that you provide to us when using our services or that arises during use. This includes in particular:",
            list: [
              "Contact details (name, address, e-mail, phone number)",
              "Payment information (depending on the chosen payment method, e.g., credit card, TWINT, prepayment)",
              "Content data (photos, videos, texts, music/audio) that you provide for personalized memorial videos and Memoras",
              "Usage data (e.g., time of video retrieval via Memora, technical metadata such as browser/device)"
            ]
          },
          purpose: {
            title: "3. Purpose of Data Processing",
            content:
              "Your data is used exclusively for the following purposes:",
            list: [
              "Processing of orders and fulfillment of contracts",
              "Creation, editing, and provision of memorial videos as well as configuration of NFC tags",
              "Processing of payments and invoicing",
              "Communication with you (e.g., order confirmation, inquiries, support)",
              "Operation, security, and improvement of our services"
            ]
          },
          disclosure: {
            title: "4. Disclosure to Third Parties",
            content:
              "We do not sell your data or pass it on to third parties for advertising purposes. Disclosure is made exclusively to the extent necessary for the purposes mentioned above, to carefully selected processors:",
            list: [
              "Payment providers (e.g., Stripe, TWINT, credit card institutions) for payment processing",
              "IT, cloud, and hosting service providers (e.g., for website operation, data storage, video creation/delivery)",
              "E-mail/communication service providers (e.g., for sending system and service e-mails)",
              "Logistics/delivery partners for shipping physical products"
            ]
          },
          storage: {
            title: "5. Storage and Deletion of Data",
            content:
              "Personalized content (photos, videos, audio, texts) is only stored for as long as necessary for the fulfillment of the contract and service provision. Customer data is stored in accordance with legal retention obligations. At your request, we will examine an early deletion, provided no legal obligations prevent this."
          },
          security: {
            title: "6. Data Security",
            content:
              "We use appropriate technical and organizational security measures to protect your data against loss, manipulation, and unauthorized access. Please note that data transmission over the Internet (e.g., via e-mail) can have security gaps."
          },
          rights: {
            title: "7. Rights of the Data Subjects",
            content:
              "Under the applicable data protection law, you have the following rights in particular. To exercise your rights, please contact us at the address mentioned above:",
            list: [
              "Information: Access to the data stored about you",
              "Rectification: Correction of inaccurate or incomplete data",
              "Deletion: Removal of your data, provided there are no retention obligations",
              "Restriction/Objection (where applicable): Restriction of certain processing",
              "Data portability: Provision of your data in a common electronic format"
            ]
          },
          cookies: {
            title: "8. Cookies and Tracking",
            content:
              "Our website uses necessary cookies to provide basic functions. We only use other (optional) analysis or marketing cookies with your consent. You can set in your browser whether cookies are accepted, blocked, or deleted."
          },
          changes: {
            title: "9. Changes to this Privacy Policy",
            content:
              "We reserve the right to adapt this privacy policy at any time. The current version published on our website applies."
          }
        }
      },
      terms: {
        title: "Terms and Conditions (GTC)",
        sections: {
          scope: {
            title: "Preamble and Contact",
            content: "This website is operated by TW Projects GmbH. Throughout the site, the terms \"we\", \"us\" and \"our\" refer to TW Projects GmbH. TW Projects GmbH offers this website, including all information, tools and services available from this site, to you as the user, on the condition that you accept all terms, conditions, policies and notices stated here.\n\nYour satisfaction is our top priority. If you have any questions or feedback, please email us at info.memora.moments@gmail.ch or contact us via the contact form.\n\nTW Projects GmbH\nBreitenmattstrasse\n8635 Dürnten, Switzerland\nE-Mail: info.memora.moments@gmail.ch\nPhone: +41 79 407 56 99\n\nLanguage Notice: These Terms and Conditions are provided in multiple languages. In the event of discrepancies or interpretation conflicts, the German version shall be legally binding."
          },
          contract: {
            title: "1. Scope and Conclusion of Contract",
            content: "These GTC apply to all orders placed via our website and to the use of our services.\n\nA binding contract is concluded as soon as we expressly confirm the order by email."
          },
          services: {
            title: "2. Consent to the Processing of Your Data",
            content: "Your agreement to these General Terms and Conditions includes your consent to such processing of personal data. Your image/photo data will be used by us exclusively for the proper processing of your order."
          },
          prices: {
            title: "3. Assortment, Prices and Payment",
            content: "Our products consist in particular of personalized memorial plaques, NFC tags and associated digital content (e.g. digital photo album).\n\nPersonalized products and digital content are created individually according to customer specifications and are excluded from exchange or return.\n\nNon-personalized products can be returned in accordance with the statutory provisions.\n\nOur product range is constantly being adapted to technical developments. Our prices and the shipping costs charged to you may change from time to time.\n\nWe cover the delivery costs for orders within Switzerland. Delivery costs for shipments outside of Switzerland will be invoiced to the recipient subsequently.\n\nAll prices are in Swiss Francs (CHF), incl. statutory value-added tax (where applicable).\n\nPayment is made before delivery or before the creation of the digital content.\n\nFor online orders, you have the option of paying with the following payment methods: Credit card, TWINT, advance payment. These may change from time to time and may vary from country to country. Your choice of a payment method authorizes us to collect or receive payments in the corresponding way. In the event of chargebacks, we are entitled to reimbursement of the associated costs and bank processing fees."
          },
          delivery: {
            title: "4. Order, Delivery, Transfer of Risk and Retention of Title",
            content: "As soon as your digital images or films arrive, the order will be executed according to your specifications. We will confirm orders placed electronically by sending an e-mail to the address you have provided.\n\nAfter confirmation of the order, the product will be delivered within 30 days, unless otherwise stated for the product.\n\nPlease note that digital orders cannot be changed, deleted or merged after they have been received by us.\n\nIf image content that clearly violates legal prohibitions becomes apparent on your images during the execution of the order, we will not execute your order.\n\nThe deliveries are made to the address specified by the customer. The risk of accidental loss, accidental damage or accidental loss of the delivered goods passes to you upon handover to the transport company."
          },
          cancellation: {
            title: "5. Retention of Title",
            content: "The delivered products remain the property of TW Projects GmbH until full payment has been received (including shipping costs and any VAT) (retention of title, registration in the register reserved)."
          },
          warranty: {
            title: "6. Rights and Obligations for Personalized Content",
            content: "The customer supplies texts, images, videos or other content in suitable quality.\n\nThe customer warrants that he/she holds all necessary copyrights and personal rights or has obtained the consent of the authorized parties.\n\nThe customer grants TW Projects GmbH a non-exclusive, worldwide license to use the delivered content for the creation, storage and provision of the products.\n\nWe reserve the right to reject or subsequently remove content if it infringes the rights of third parties or is illegal."
          },
          liability: {
            title: "7. Notice-&-Takedown Procedure",
            content: "Authorized persons (e.g. relatives, heirs) can complain that content violates personal rights.\n\nAfter receipt of a justified notification, we will take the affected content offline in a timely manner. Please send notifications to: [info.memora.moments@gmail.ch]."
          },
          ip: {
            title: "8. Warranty and Liability",
            content: "The statutory warranty rights according to the Swiss Code of Obligations (OR) apply.\n\nWe will, at our discretion, provide subsequent improvement or a replacement delivery. Complaints can only be recognized if they relate to a material defect and are made within 21 days of receipt of the products.\n\nPlease note that typing errors entered by the customer, images of insufficient quality (for example due to insufficient resolution of digital images), design errors for which the customer is responsible, as well as incorrect product selection, incorrect order quantities or other defects caused by errors in the order entry are excluded from the complaint. This also applies to damage incurred during transport.\n\nIn particular, we assume no liability for:\n- the quality or legality of the content supplied by the customer,\n- color deviations due to material specifics or device settings,\n- temporary interruptions of our digital services.\n- for damages that are not typically to be expected given the nature of the respective order and the products and their normal use.\n\nOur liability is limited to intent and gross negligence, insofar as this is legally permissible. We are only liable for slight negligence in the event of personal injury."
          },
          privacy: {
            title: "9. Use of Digital Services",
            content: "We strive for high availability of our hosting and streaming services. However, short-term interruptions (maintenance, force majeure, technical faults) may occur.\n\nA specific service level is not guaranteed."
          },
          special: {
            title: "10. Third-party Rights",
            content: "You alone are responsible for ensuring that you have the necessary rights to the images you send in, including copyright, trademark and personal rights. Should third parties assert claims against us in connection with your order due to the infringement of such rights, you are obliged to defend against these claims or to bear the costs of defending against these claims. Claims for damages by us remain unaffected."
          },
          law: {
            title: "11. Data Protection",
            content: "The processing of personal data is governed by our privacy policy.\n\nThe customer acknowledges that third-party providers may be used for hosting, payment processing or other services."
          },
          final: {
            title: "12. Donation Policy",
            content: "We donate 10% of the net sales price of each product sold to charitable foundations (e.g. Make-A-Wish Switzerland).\n\nThe donations are paid out once a year, at the end of the year.\n\nTW Projects GmbH is responsible for selecting the foundation and processing the donations. The customer has no individual legal claim to the forwarding or earmarking of the donation."
          },
          contact: {
            title: "13. Prohibited Uses",
            content: "The website may not be used for illegal purposes, spam, malware or infringement of third-party rights.\n\nWe reserve the right to block access in the event of misuse."
          },
          availability: {
            title: "14. Availability of Digital Content",
            content: "Digital content (e.g. photo or video albums) accessible via NFC tags, QR codes or external links is provided through third-party platforms selected by us. TW Projects GmbH ensures that access to such digital content is guaranteed for a minimum period of 12 months from the date of delivery, unless otherwise stated for the specific product.\n\nAccess may continue beyond this period, but ongoing availability is not contractually guaranteed. Permanent or lifetime availability cannot be assured.\n\nWe are not liable for outages, changes or discontinuation of external services, nor for data loss or access issues beyond our control. We reserve the right to migrate content to alternative services or adjust access methods without creating any entitlement to a specific hosting system."
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
      description: "We donate 10% of every purchase of a Memora Moments product to Make-A-Wish to bring hope and joy.",
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
      description: "10% of every purchase of a Memora Pet product goes to the Animal Rescue Service Foundation to help animals in need.",
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
        "Whether it’s a wedding, birthday, or anniversary – with Memora Moments you make memories tangible. Tap the gift with your smartphone, and the digital memory album opens. A surprise that lasts.",
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
      description: "We donate 10% of every purchase of a Memora Surprise product to the Make-A-Wish Foundation to grant children their dearest wishes.",
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