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
              "Memora Moments\n[Insert Address]\n[Postal Code, City]\n[Commercial Register No., if available]\nE-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99\n\nWe are responsible for the collection, processing, and use of your personal data in accordance with the Swiss Data Protection Act (revDSG)."
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
        title: "General Terms and Conditions",
        sections: {
          scope: {
            title: "1. Scope of Application",
            content:
              "These General Terms and Conditions (GTC) apply to all orders and contracts between Memora Moments (hereinafter 'we') and customers (hereinafter 'you') in connection with the purchase of NFC tags, memorial videos, and related digital content."
          },
          contract: {
            title: "2. Conclusion of Contract",
            content:
              "The contract is concluded as soon as we expressly confirm your order by e-mail. We may refuse orders for technical or legal reasons."
          },
          services: {
            title: "3. Services",
            content:
              "Our services include: Production and delivery of NFC tags (physical products); creation and provision of personalized memorial videos (digital content); access to other digital content related to the product."
          },
          prices: {
            title: "4. Prices and Payment Conditions",
            content:
              "All prices are in Swiss Francs (CHF) including statutory VAT, where applicable. Accepted payment methods: Credit card, TWINT, prepayment. Payment is due before delivery or before the creation of the digital content."
          },
          delivery: {
            title: "5. Delivery and Delivery Times",
            content:
              "The delivery of the products usually takes place within 30 days after the conclusion of the contract. For custom-made products, delays may occur; we will inform you immediately in such a case."
          },
          cancellation: {
            title: "6. Right of Revocation and Withdrawal",
            content:
              "There is no right of return for personalized products and digital content (e.g., individually created memorial videos). The statutory provisions apply to non-personalized products."
          },
          warranty: {
            title: "7. Warranty",
            content:
              "We guarantee the contractual quality of our products. Please inform us of any defects within 14 days of receipt so that we can examine an appropriate solution (rectification, replacement, or refund)."
          },
          liability: {
            title: "7a. Liability",
            content:
              "Our liability is limited to damages caused by intentional or grossly negligent conduct. We assume no responsibility for technical problems on the customer's side (e.g., insufficient internet connection, incompatible devices, software settings)."
          },
          ip: {
            title: "8. Copyright and Usage Rights",
            content:
              "The content created by us (e.g., memorial videos) is subject to copyright. You receive a simple, non-transferable right of use for private use. Commercial use or disclosure to third parties is not permitted unless otherwise agreed in writing. By uploading photos, videos, audio, or texts, you confirm that you have the necessary rights; you indemnify us from third-party claims in this regard."
          },
          privacy: {
            title: "9. Data Protection",
            content:
              "We process personal data exclusively in accordance with our privacy policy. This includes the storage and processing of your data for contract fulfillment as well as the disclosure to necessary third parties (e.g., payment providers, hosting/IT, shipping). By using our services, you agree to this processing."
          },
          special: {
            title: "10. Emotional Products & Special Notes",
            content:
              "Our products have a high emotional value. Personalized content cannot be changed or returned after completion. In case of technical problems on our part (e.g., server failure), we will endeavor to restore access as quickly as possible; we cannot guarantee permanent availability on the customer's side."
          },
          law: {
            title: "11. Place of Jurisdiction and Applicable Law",
            content:
              "Swiss law applies exclusively. The place of jurisdiction is the registered office of Memora Moments."
          },
          final: {
            title: "12. Final Provisions",
            content:
              "Should individual provisions of these GTC be ineffective, the validity of the remaining provisions shall not be affected. We reserve the right to adapt these GTC at any time. The current version, published with the date and version number, applies."
          },
        }
      },
      imprint: {
        title: "Imprint",
        sections: {
          info: {
            title: "Information according to § 5 TMG",
            content: "Memora Moments\nPersonalized Memory Products"
          },
          contact: {
            title: "Contact",
            content:
              "E-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsible for the content according to § 55 Abs. 2 RStV",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Disclaimer",
            content: {
              title: "Liability for Content",
              content:
                "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 (1) TMG. According to §§ 8 to 10 TMG, however, we as a service provider are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity."
            },
            links: {
              title: "Liability for Links",
              content:
                "Our offer contains links to external websites of third parties, on whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages."
            },
            copyright: {
              title: "Copyright",
              content:
                "The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, processing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator."
            }
          }
        }
      }
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
        "Moments become a silent memorial – Memora Moments opens the door to stories that remain. Pictures, videos, and music keep the memory alive, right where it belongs: close to the heart.",
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
    howitworks: {
      title: "How It Works",
      subtitle: "To a personal Memora in just a few steps.",
      step1: { title: "Select Product", desc: "Choose between Memora Tag, Frame, or Deluxe." },
      step2: { title: "Select Media and Music", desc: "Choose your favorite pictures and videos or even voice messages and add suitable background music." },
      step3: { title: "Receive Memora", desc: "Your Memora will be delivered to your home." }
    },
    products: {
      title: "Our Memoras:",
      subtitle: "The classic Memora products.",
      basic: { title: "Memora Tag", desc: "A simple plexiglass plate that brings memories to life via a digital photo album – discreet and everlasting.", price: "49 CHF" },
      premium: { title: "Memora Frame", desc: "A classic picture frame combined with modern technology. This turns every photo into a gateway to moving memories.", price: "79 CHF" },
      deluxe: { title: "Memora Deluxe", desc: "A high-quality work of art that keeps the past alive and touches the future.", price: "129 CHF" },
      features: {
        tag1: "6×6 cm or 3 cm ⌀ plexiglass plate",
        tag2: "Browse personal digital photo album directly via tap",
        tag3: "Minimalist, timeless design, blends in harmoniously",
        tag4: "For tombstones, urns, memorial sites",
        premium1: "3 cm ⌀ plexiglass plate – connects picture & digital memorial",
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
        pet_name: "Pet's Name *",
        pet_deathDate: "Date of Death *",
        pet_notesPH: "Special wishes, favorite sounds, notes…",
        surprise_name: "Name (Recipient) *",
        surprise_notesPH: "Wedding, birthday, anniversary… special wishes"
      },
      step3Fields: {
        imagesLabel: "Pictures (multiple possible)",
        videosLabel: "Videos (multiple possible)",
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
      }
    }
  },

  pet: {
    hero: {
      title: "For our loyal companions – memories with heart and sound.",
      subtitle:
        "Our pets give us love, loyalty, and joy. With Memora Moments, their memory stays alive – in the heart and in special places.",
      startButton: "How it works",
      learnButton: "Learn More"
    },
    features: {
      title: "Unforgettable moments with your darling",
      subtitle: "Digital memories for pets.",
      unique: { title: "Loving Memory", desc: "Special moments with your pet." },
      multimedia: { title: "Multimedia Experiences", desc: "Photos and videos of your darling." },
      music: { title: "Favorite Sounds", desc: "The familiar bark, meow, or a song that connects." },
      quality: { title: "Dignified Design", desc: "Simple, high-quality materials that blend harmoniously into any home, whether indoors or outdoors." }
    },
    howitworks: {
      title: "How It Works",
      subtitle: "To the Memora in three steps.",
      step1: { title: "Select Product", desc: "Choose between Memora Tag, Frame, or Deluxe." },
      step2: { title: "Select Media and Music or Sounds", desc: "Choose your favorite pictures and videos or even voice messages and add suitable background music." },
      step3: { title: "Receive Memora", desc: "Your Memora will be delivered." }
    },
    products: {
      title: "Pet Products",
      subtitle: "Memories for loyal companions.",
      basic: { title: "Memora Pet Tag", desc: "A simple plexiglass plate that brings memories of your pet to life with a digital photo album", price: "from 49 CHF" },
      premium: { title: "Memora Pet Frame", desc: "A stylish picture frame that connects your favorite photo with a digital photo album – ideal for home.", price: "89 CHF" },
      deluxe: { title: "Memora Pet Deluxe", desc: "An exclusive plexiglass plate with a holder – for a lasting, dignified memento.", price: "129 CHF" },
      features: {
        tag1: "6×6 cm or 3 cm ⌀ plexiglass plate",
        tag2: "Browse personal digital photo album directly via tap",
        tag3: "Minimalist, timeless design, blends in harmoniously",
        tag4: "Option: Standard simple, individually designed, or as a keychain",
        premium1: "3 cm ⌀ plexiglass plate – connects picture & digital memorial",
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
        pageTitleByMode: { pet: "Select Product:" },
        step2ByMode: { pet: "Information about the pet" }
      },
      products: {
        petOptionsTitle: "Options for Pet Memora Tag",
        keychainLabel: "with keychain (+7 CHF)",
        designLabel: "Design",
        designStandard: "Standard",
        designCustom: "Individually customizable",
        designCustomNote: "Note: Custom design costs +10 CHF."
      },
      step2Fields: {
        pet_name: "Pet's Name *",
        pet_deathDate: "Date of Death",
        pet_notesPH: "Special wishes, favorite sounds, notes…"
      }
    }
  },

  surprise: {
    hero: {
      title: "A gift that touches hearts – unforgettable surprises.",
      subtitle:
        "Whether for a wedding, birthday, or anniversary – with Memora Moments, you make memories tangible. Photos, videos, and music become a unique gift that lasts.",
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
    howitworks: {
      title: "How Surprise Works",
      subtitle: "Three steps to the surprise moment.",
      step1: { title: "Select Product", desc: "Choose between Memora Tag, Frame, or Deluxe." },
      step2: { title: "Select Media and Music", desc: "Choose your favorite pictures and videos or even voice messages and add suitable background music." },
      step3: { title: "Receive Surprise", desc: "Your Memora will be delivered directly to you." }
    },
    products: {
      title: "Surprise Products",
      subtitle: "Choose your style.",
      basic: { title: "Memora Surprise Tag", desc: "A small plexiglass plate that connects a digital photo album – original and unique.", price: "49 CHF" },
      premium: { title: "Memora Surprise Frame", desc: "A stylish picture frame that connects your favorite photo with a digital photo album – ideal as a gift.", price: "79 CHF" },
      deluxe: { title: "Memora Surprise Deluxe", desc: "An exclusive plexiglass plate with integrated technology – the elegant premium gift for lasting memories.", price: "129 CHF" },
      features: {
        tag1: "6×6 cm or 3 cm ⌀ plexiglass plate",
        tag2: "Browse personal digital photo album directly via tap",
        tag3: "Minimalist, timeless design, blends in harmoniously",
        tag4: "A surprise that evokes emotions and will be remembered for a long time",
        premium1: "3 cm ⌀ plexiglass plate – connects picture & digital memorial",
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
        pageTitleByMode: { surprise: "Select Product (Surprise)" },
        step2ByMode: { surprise: "Information for Surprise" }
      },
      step2Fields: {
        surprise_name: "Name (Recipient) *",
        surprise_notesPH: "Occasion, idea, or special wishes…"
      }
    }
  }
};