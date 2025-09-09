import { ContentData } from './types';

export const enContent: ContentData = {
  shared: {
    navigation: {
      home: 'Memora Moments',
      gedenken: 'Create memorial',
      about: 'About',
      contact: 'Contact',
      start: 'Start memorial',
      mode: { human: 'People', pet: 'Pets', surprise: 'Surprise' },
    },

    // SEO/meta for the About page
    about: {
      title: 'About — Memora Moments',
      heading: 'About Memora Moments',
      description: 'Learn more about our mission to preserve memories with dignity.',
    },

    contact: {
      title: 'Contact — Memora Moments',
      heading: 'Get in touch',
      description: 'Have questions? We\'re here to help.',
      email: 'Email',
      phone: 'Phone',
      form: {
        title: 'Send Message',
        submit: 'Send Message',
        success: 'Thank you! Your message has been sent successfully.',
        name: {
          label: 'Name',
          placeholder: 'Your Name'
        },
        email: {
          label: 'Email',
          placeholder: 'your.email@example.com'
        },
        subject: {
          label: 'Subject',
          placeholder: 'What is this about?'
        },
        message: {
          label: 'Message',
          placeholder: 'Let us know how we can help you...'
      }
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        sections: {
          responsible: {
            title: "1. Data Controller",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99"
          },
          dataCollection: {
            title: "2. Data Collection and Use",
            content: "We collect and process personal data only to the extent necessary to provide our services. This includes:",
            list: [
              "Contact information for order processing",
              "Billing information for payment",
              "Images and texts uploaded by you for product customization"
            ]
          },
          imageProcessing: {
            title: "3. Image Processing",
            content: "Images uploaded by you are used exclusively for creating your personalized product. Your images are stored securely and deleted after order completion or after a reasonable period."
          },
          rights: {
            title: "4. Your Rights",
            content: "You have the right to access, correct, delete and restrict the processing of your personal data. Contact us at info.memora.moments@gmail.com for data inquiries."
          },
          cookies: {
            title: "5. Cookies",
            content: "Our website uses necessary cookies for functionality. We only use additional tracking cookies with your consent."
          }
        }
      },
      terms: {
        title: "Terms of Service",
        sections: {
          scope: {
            title: "1. Scope",
            content: "These Terms of Service apply to all orders and contracts between Memora Moments and our customers."
          },
          contract: {
            title: "2. Contract Formation",
            content: "The contract is formed through your order and our confirmation. We reserve the right to decline orders if technical or legal obstacles exist."
          },
          prices: {
            title: "3. Prices and Payment Terms",
            content: "All prices include applicable VAT. Payment is due before production. We accept common payment methods."
          },
          delivery: {
            title: "4. Delivery and Production Time",
            content: "Our personalized products are individually manufactured. Production time is typically 7-14 business days after payment and final design approval."
          },
          rights: {
            title: "5. Copyright and Image Rights",
            content: "You confirm that you have all necessary rights to the images and texts you provide. You indemnify us against third-party claims regarding copyright or personality rights violations."
          },
          cancellation: {
            title: "6. Right of Withdrawal",
            content: "As these are personalized products, withdrawal is excluded under § 312g para. 2 no. 1 BGB once production has begun."
          },
          warranty: {
            title: "7. Warranty",
            content: "We guarantee the quality of our products. For defects, please contact us within 14 days of receipt."
          },
          contact: {
            title: "8. Contact",
            content: "For questions about these Terms of Service, contact us at:\nE-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99"
          }
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
            content: "E-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99"
          },
          responsible: {
            title: "Responsible for content according to § 55 para. 2 RStV",
            content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
          },
          disclaimer: {
            title: "Disclaimer",
            content: {
              title: "Liability for Content",
              content: "As a service provider, we are responsible for our own content on these pages under general law according to § 7 para. 1 TMG. However, according to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or investigate circumstances indicating illegal activity."
            },
            links: {
              title: "Liability for Links",
              content: "Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content."
            },
            copyright: {
              title: "Copyright",
              content: "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require written consent from the respective author or creator."
            }
          }
        }
      }
    }
  },

    // Content rendered on the About page
    aboutPage: {
      title: 'About us',
      lead: 'We connect memories with technology—empathetic, personal, accessible.',
      story: {
        title: 'Our story',
        p1: 'Memora Moments was born from the wish to preserve memories with care and dignity.',
        p2: 'With NFC and multimedia, we create a modern, approachable way to remember.',
      },
      values: {
        title: 'Our values',
        compassion: {
          title: 'Compassion',
          desc: 'We work respectfully and empathetically—for people in significant life moments.',
        },
        personality: {
          title: 'Personality',
          desc: 'Every tribute is individual—we design as much as needed, as little as possible.',
        },
        connection: {
          title: 'Connection',
          desc: 'Images, videos, and sound create closeness—anytime, at the memorial site or at home.',
        },
      },
      product: {
        title: 'Why Memora?',
        p1: 'Premium materials, weather-resistant design, and a clear focus on what matters.',
        p2: 'Create easily, receive something of lasting value, and share anytime—with a gentle tap.',
      },
    },
  },


  // --- HUMAN MODE ---
  human: {
    hero: {
      title: 'Memories that live on — with heart and sound.',
      subtitle: 'Memora Moments turns memories into a quiet monument with image and music.',
      startButton: 'Start now',
      learnButton: 'Learn more'
    },
    features: {
      title: 'Unforgettable moments for eternity',
      subtitle: 'Our NFC plates combine modern technology with dignified remembrance.',
      unique: { title: 'Unique tribute', desc: 'Preserve special memories with Memora Moments.' },
      multimedia: { title: 'Multimedia memories', desc: 'Photos and videos that tell a life.' },
      music: { title: 'Add a favorite song', desc: 'Enrich the moment with meaningful music.' },
      quality: { title: 'Dignified design', desc: 'High-quality, weather-resistant plates with an elegant finish.' }
    },
    howitworks: {
      title: 'How it works',
      subtitle: 'Create your personal tribute in a few steps.',
      step1: { title: 'Upload media', desc: 'Select photos and videos.' },
      step2: { title: 'Select music', desc: 'Add a meaningful song.' },
      step3: { title: 'Receive NFC plate', desc: 'Your tribute arrives at your home.' }
    },
    products: {
      title: 'Our products',
      subtitle: 'The classic Memora range.',
      basic: { title: 'Memora Tag', desc: 'Minimal NFC plate for digital memories.', price: 'from 60 CHF' },
      premium: { title: 'Memora Frame', desc: 'Picture frame with integrated NFC.', price: 'from 120 CHF' },
      deluxe: { title: 'Memora Deluxe', desc: 'Exclusive glass plate with engraving and extended features.', price: 'from 200 CHF' },
      features: {
        glass: '6×6 cm NFC plate',
        nfc: 'Elegant design',
        format: 'Weather-resistant',
        weather: 'For headstones, urns, memorial spots',
        all: 'Frame with NFC',
        photo: 'Personal photo',
        engraving: 'Optional engraving',
        premium: 'Ideal for home display'
      }
    },
    cta: {
      title: 'Begin your journey of remembrance',
      subtitle: 'Create your tribute and preserve what matters.',
      create: 'Create tribute',
      contact: 'Contact us'
    },
    gedenken: {
      title: 'Create Tribute - Memora Moments',
      heading: 'Create your tribute',
      description: 'Upload your memories and we craft a dignified tribute.'
    }
  },

  // --- PET MODE ---
  pet: {
    hero: {
      title: 'For our loyal companions — memories with heart and sound.',
      subtitle: 'Memora Moments for pets — preserve the most beautiful shared moments.',
      startButton: 'Start now',
      learnButton: 'Learn more'
    },
    features: {
      title: 'Unforgettable moments with your companion',
      subtitle: 'Digital tributes for pets.',
      unique: { title: 'Loving remembrance', desc: 'Celebrate the bond with your pet.' },
      multimedia: { title: 'Pet memories', desc: 'Photos and videos of your beloved friend.' },
      music: { title: 'Favorite sounds', desc: 'Add familiar sounds or music.' },
      quality: { title: 'Weather-proof', desc: 'Robust for indoors and outdoors.' }
    },
    howitworks: {
      title: 'How it works',
      subtitle: 'Three steps to your pet tribute.',
      step1: { title: 'Upload media', desc: 'Choose photos and videos.' },
      step2: { title: 'Add sounds/music', desc: 'Include meaningful audio.' },
      step3: { title: 'Receive NFC plate', desc: 'Your pet plate is delivered.' }
    },
    products: {
      title: 'Pet products',
      subtitle: 'Remembrance for loyal companions.',
      basic: { title: 'Pet Memora Tag', desc: 'Simple NFC plate for pets.', price: 'from 55 CHF' },
      premium: { title: 'Pet Memora Frame', desc: 'Frame with NFC for pets.', price: 'from 110 CHF' },
      deluxe: { title: 'Pet Memora Deluxe', desc: 'Deluxe version with engraving and extended media options.', price: 'from 180 CHF' },
      features: {
        glass: '6×6 cm NFC plate, weather-proof',
        nfc: 'Loving design',
        format: 'Pet-friendly formats',
        weather: 'For indoor and outdoor use',
        all: 'Frame with NFC',
        photo: 'Photo in frame',
        engraving: 'Optional paw/name engraving',
        premium: 'Ideal for home'
      }
    },
    cta: {
      title: 'Honor your companion',
      subtitle: 'Create a loving tribute.',
      create: 'Create pet tribute',
      contact: 'Pet advice'
    },
    gedenken: {
      title: 'Create Pet Tribute - Memora Moments',
      heading: 'Create your pet tribute',
      description: 'Upload memories of your beloved companion.'
    }
  },

  // --- SURPRISE MODE ---
  surprise: {
    hero: {
      title: 'Moments of surprise that touch the heart.',
      subtitle: 'The Surprise collection blends design with a curated experience.',
      startButton: 'Start Surprise',
      learnButton: 'Learn more'
    },
    features: {
      title: 'That special touch',
      subtitle: 'Curated, subtle and a little magical.',
      unique: { title: 'Curated experience', desc: 'Each Surprise plate tells a small story.' },
      multimedia: { title: 'Image • Video • Sound', desc: 'All media on one plate.' },
      music: { title: 'Signature sound', desc: 'A tasteful sound layer for special moments.' },
      quality: { title: 'Premium materials', desc: 'Durable, weather-resistant and elegant.' }
    },
    howitworks: {
      title: 'How Surprise works',
      subtitle: 'Three steps to the moment.',
      step1: { title: 'Choose content', desc: 'Pick photos, clips and music.' },
      step2: { title: 'Set the scene', desc: 'We craft a tasteful sequence.' },
      step3: { title: 'Receive Surprise', desc: 'Tap and enjoy the experience.' }
    },
    products: {
      title: 'Surprise products',
      subtitle: 'Choose your style.',
      basic: { title: 'Surprise Tag', desc: 'Minimal NFC plate for surprise moments.', price: 'from 70 CHF' },
      premium: { title: 'Surprise Frame', desc: 'Elegant frame with integrated experience.', price: 'from 140 CHF' },
      deluxe: { title: 'Surprise Deluxe', desc: 'Exclusive Surprise with extended options.', price: 'from 220 CHF' },
      features: {
        glass: 'Robust finish',
        nfc: 'Integrated NFC tag',
        format: 'Optimized for multimedia',
        weather: 'Weather-resistant',
        all: 'Frame with hidden NFC',
        photo: 'Optional photo',
        engraving: 'Optional engraving',
        premium: 'Refined materials'
      }
    },
    cta: {
      title: 'Ready to surprise?',
      subtitle: 'Gift unique moments that last.',
      create: 'Create Surprise',
      contact: 'Request advice'
    },
    gedenken: {
      title: 'Create Surprise - Memora Moments',
      heading: 'Your Surprise moment',
      description: 'Upload content and we craft the experience.'
    }
  },
  legal: {
    privacy: {
      title: "Privacy Policy",
      sections: {
        responsible: {
          title: "1. Data Controller",
          content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99"
        },
        dataCollection: {
          title: "2. Data Collection and Use",
          content: "We collect and process personal data only to the extent necessary to provide our services. This includes:",
          list: [
            "Contact information for order processing",
            "Billing information for payment",
            "Images and texts uploaded by you for product customization"
          ]
        },
        imageProcessing: {
          title: "3. Image Processing",
          content: "Images uploaded by you are used exclusively for creating your personalized product. Your images are stored securely and deleted after order completion or after a reasonable period."
        },
        rights: {
          title: "4. Your Rights",
          content: "You have the right to access, correct, delete and restrict the processing of your personal data. Contact us at info.memora.moments@gmail.com for data inquiries."
        },
        cookies: {
          title: "5. Cookies",
          content: "Our website uses necessary cookies for functionality. We only use additional tracking cookies with your consent."
        }
      }
    },
    terms: {
      title: "Terms of Service",
      sections: {
        scope: {
          title: "1. Scope",
          content: "These Terms of Service apply to all orders and contracts between Memora Moments and our customers."
        },
        contract: {
          title: "2. Contract Formation",
          content: "The contract is formed through your order and our confirmation. We reserve the right to decline orders if technical or legal obstacles exist."
        },
        prices: {
          title: "3. Prices and Payment Terms",
          content: "All prices include applicable VAT. Payment is due before production. We accept common payment methods."
        },
        delivery: {
          title: "4. Delivery and Production Time",
          content: "Our personalized products are individually manufactured. Production time is typically 7-14 business days after payment and final design approval."
        },
        rights: {
          title: "5. Copyright and Image Rights",
          content: "You confirm that you have all necessary rights to the images and texts you provide. You indemnify us against third-party claims regarding copyright or personality rights violations."
        },
        cancellation: {
          title: "6. Right of Withdrawal",
          content: "As these are personalized products, withdrawal is excluded under § 312g para. 2 no. 1 BGB once production has begun."
        },
        warranty: {
          title: "7. Warranty",
          content: "We guarantee the quality of our products. For defects, please contact us within 14 days of receipt."
        },
        contact: {
          title: "8. Contact",
          content: "For questions about these Terms of Service, contact us at:\nE-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99"
        }
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
          content: "E-Mail: info.memora.moments@gmail.com\nPhone: +41 79 407 56 99"
        },
        responsible: {
          title: "Responsible for content according to § 55 para. 2 RStV",
          content: "Memora Moments\nE-Mail: info.memora.moments@gmail.com"
        },
        disclaimer: {
          title: "Disclaimer",
          content: {
            title: "Liability for Content",
            content: "As a service provider, we are responsible for our own content on these pages under general law according to § 7 para. 1 TMG. However, according to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or investigate circumstances indicating illegal activity."
          },
          links: {
            title: "Liability for Links",
            content: "Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content."
          },
          copyright: {
            title: "Copyright",
            content: "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require written consent from the respective author or creator."
          }
        }
      }
    }
  }
};