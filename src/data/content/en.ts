import type { ContentData } from './types';

export const enContent: ContentData = {
  shared: {
    navigation: {
      home: "Home",
      gedenken: "Memorial",
      about: "About",
      contact: "Contact", 
      start: "Create Now",
      mode: {
        human: "Human",
        pet: "Pet",
        surprise: "Surprise"
      }
    },
    about: {
      title: "About",
      heading: "Our Story",
      description: "Memora Moments helps preserve valuable memories."
    },
    contact: {
      title: "Contact",
      heading: "Get in Touch",
      description: "Questions? We're happy to help."
    },
    aboutPage: {
      title: "About Memora Moments",
      lead: "We preserve valuable memories.",
      story: {
        title: "Our Story", 
        p1: "Memora Moments was founded to help people preserve their most precious memories.",
        p2: "Our team works passionately to develop innovative solutions.",
        p3: "We believe every memory is valuable and should be preserved.",
        p4: "With cutting-edge technology, we make memories accessible and unforgettable.",
        p5: "Trust us with your most precious moments."
      },
      values: {
        title: "Our Values",
        compassion: {
          title: "Compassion",
          desc: "We understand the emotional significance of your memories."
        },
        personality: {
          title: "Personality",
          desc: "Every memory is unique and treated individually."
        },
        connection: {
          title: "Connection", 
          desc: "We help preserve emotional connections."
        }
      },
      product: {
        title: "Our Product",
        p1: "Memora Tags connect physical objects with digital memories.",
        p2: "With NFC technology, your memories come alive."
      }
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        sections: {
          responsible: {
            title: "Responsible Party",
            content: "Memora Moments is responsible for data processing. Contact: info.memora.moments@gmail.com"
          },
          dataCollection: {
            title: "Data Collection and Use",
            content: "We collect data for the following purposes:",
            list: [
              "Processing your order",
              "Communication with you",
              "Improving our services"
            ]
          },
          imageProcessing: {
            title: "Image Processing",
            content: "Your uploaded images are used exclusively for creating your product:",
            list: [
              "Secure encryption during transfer",
              "Deletion after product completion",
              "No sharing with third parties"
            ]
          },
          rights: {
            title: "Your Rights",
            content: "You have the following rights regarding your data:",
            list: [
              "Information about stored data",
              "Correction of incorrect data",
              "Deletion of your data"
            ]
          },
          cookies: {
            title: "Cookies",
            content: "We only use technically necessary cookies for website functionality."
          }
        }
      },
      terms: {
        title: "Terms of Service",
        sections: {
          scope: { title: "Scope", content: "These terms apply to all orders." },
          contract: { title: "Contract", content: "Contract is concluded with the order." },
          services: { title: "Services", content: "We create personalized Memora Tags." },
          prices: { title: "Prices", content: "All prices include VAT." },
          delivery: { title: "Delivery", content: "Delivery time is 7-14 business days." },
          liability: { title: "Liability", content: "Liability is limited to gross negligence." },
          ip: { title: "Intellectual Property", content: "You grant us rights to process your content." },
          privacy: { title: "Privacy", content: "See separate privacy policy." },
          special: { title: "Special Terms", content: "Additional conditions may apply." },
          law: { title: "Applicable Law", content: "Swiss law applies." },
          final: { title: "Final Provisions", content: "Changes require written form." },
          cancellation: { title: "Cancellation", content: "Right of withdrawal according to legal provisions." },
          warranty: { title: "Warranty", content: "Legal warranty." }
        }
      },
      imprint: {
        title: "Imprint",
        sections: {
          info: { title: "Information", content: "Memora Moments" },
          contact: { title: "Contact", content: "E-Mail: info.memora.moments@gmail.com" },
          responsible: { title: "Responsible for Content", content: "Memora Moments" },
          disclaimer: {
            title: "Disclaimer",
            p1: "Content created with care.",
            p2: "No guarantee for accuracy.",
            p3: "Responsible for own content.",
            p4: "Not responsible for external content.",
            p5: "Links checked regularly."
          }
        }
      }
    },
    footer: {
      brand: {
        name: "Memora Moments",
        description: "Memories that live on."
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
      subtitle: "Moments become silent monuments – Memora Moments opens the door to stories that remain.",
      startButton: "Create Now",
      learnButton: "Learn More"
    },
    features: {
      title: "Why Memora Moments?",
      subtitle: "Unique memories deserve a unique solution",
      unique: { title: "Unique", desc: "Each Memora is individually designed" },
      multimedia: { title: "Multimedia", desc: "Images, videos and music combined" },
      music: { title: "Music", desc: "Emotional connection through sound" },
      quality: { title: "Quality", desc: "High-quality materials and processing" }
    },
    howitworks: {
      title: "How it works",
      subtitle: "Personalized memory in a few steps",
      step1: { title: "Select", desc: "Choose your desired product" },
      step2: { title: "Design", desc: "Upload images, videos and music" },
      step3: { title: "Receive", desc: "Get your personalized Memora" }
    },
    products: {
      title: "Our Products",
      subtitle: "Different options for every need",
      basic: { title: "Basic", desc: "Simple Memora Tag", price: "29 CHF" },
      premium: { title: "Premium", desc: "Extended features", price: "49 CHF" },
      deluxe: { title: "Deluxe", desc: "Complete equipment", price: "79 CHF" },
      features: {
        tag1: "NFC Technology",
        tag2: "Waterproof",
        tag3: "Durable",
        tag4: "Easy to use",
        premium1: "More storage",
        premium2: "Custom Design",
        premium3: "QR Code",
        premium4: "Analytics",
        deluxe1: "Premium Materials",
        deluxe2: "Extended Features",
        deluxe3: "Priority Support",
        deluxe4: "Exclusive Design"
      }
    },
    cta: {
      title: "Preserve Your Memories",
      subtitle: "Create your personal Memora today",
      create: "Create Now",
      contact: "Get in Touch"
    },
    gedenken: {
      title: "Memorial",
      heading: "Preserve Memories",
      description: "Create a loving memorial for a beloved person."
    }
  },

  pet: {
    hero: {
      title: "For Your Faithful Companion",
      subtitle: "Preserve the most beautiful moments with your pet forever.",
      startButton: "Create Now",
      learnButton: "Learn More"
    },
    features: {
      title: "For Your Pet",
      subtitle: "Special memories of your four-legged friend",
      unique: { title: "Unique", desc: "Specially designed for pets" },
      multimedia: { title: "Multimedia", desc: "Images, videos and sounds" },
      music: { title: "Favorite Sounds", desc: "Familiar sounds and music" },
      quality: { title: "Quality", desc: "Robust materials" }
    },
    howitworks: {
      title: "How it works",
      subtitle: "Preserve memories of your beloved pet",
      step1: { title: "Select", desc: "Choose the right product" },
      step2: { title: "Personalize", desc: "Add images and memories" },
      step3: { title: "Preserve", desc: "Keep in memory forever" }
    },
    products: {
      title: "Pet Products",
      subtitle: "Specially for your four-legged friend",
      basic: { title: "Pet Basic", desc: "Simple Pet Tag", price: "29 CHF" },
      premium: { title: "Pet Premium", desc: "Extended Pet Features", price: "49 CHF" },
      deluxe: { title: "Pet Deluxe", desc: "Full equipment for pets", price: "79 CHF" },
      features: {
        tag1: "Pet Safe",
        tag2: "Waterproof",
        tag3: "Durable",
        tag4: "Easy to use",
        premium1: "More storage",
        premium2: "Custom Pet Design",
        premium3: "QR Code",
        premium4: "Activity Tracking",
        deluxe1: "Premium Pet Materials",
        deluxe2: "Extended Pet Features",
        deluxe3: "Veterinary Support",
        deluxe4: "Exclusive Pet Design"
      }
    },
    cta: {
      title: "For Your Faithful Friend",
      subtitle: "Preserve memories of your pet",
      create: "Create Pet Memora",
      contact: "Request Consultation"
    },
    gedenken: {
      title: "Pet Memorial",
      heading: "Farewell to Your Faithful Companion",
      description: "A loving memorial to your four-legged friend."
    }
  },

  surprise: {
    hero: {
      title: "Surprises That Touch",
      subtitle: "Create unforgettable moments for special people.",
      startButton: "Create Surprise",
      learnButton: "Find Inspiration"
    },
    features: {
      title: "Surprise Features",
      subtitle: "For special moments and occasions",
      unique: { title: "Surprising", desc: "Bring unexpected joy" },
      multimedia: { title: "Multimedia", desc: "Videos, images and messages" },
      music: { title: "Favorite Songs", desc: "Create personal playlist" },
      quality: { title: "Quality", desc: "High-quality gifts" }
    },
    howitworks: {
      title: "Plan Surprise",
      subtitle: "Perfect surprise in three steps",
      step1: { title: "Plan", desc: "Choose occasion and person" },
      step2: { title: "Design", desc: "Customize content and design" },
      step3: { title: "Gift", desc: "Bring joy" }
    },
    products: {
      title: "Surprise Packages",
      subtitle: "The right gift for every occasion",
      basic: { title: "Surprise Basic", desc: "Small attention", price: "29 CHF" },
      premium: { title: "Surprise Premium", desc: "Special surprise", price: "49 CHF" },
      deluxe: { title: "Surprise Deluxe", desc: "Unforgettable gift", price: "79 CHF" },
      features: {
        tag1: "Personalized",
        tag2: "Emotional",
        tag3: "Surprising",
        tag4: "Easy to gift",
        premium1: "More content",
        premium2: "Custom Design",
        premium3: "Gift wrapping",
        premium4: "Scheduled delivery",
        deluxe1: "Premium packaging",
        deluxe2: "Extended features",
        deluxe3: "Personal consultation",
        deluxe4: "Exclusive design"
      }
    },
    cta: {
      title: "Surprise Someone Special",
      subtitle: "Create unforgettable memories",
      create: "Create Surprise",
      contact: "Want Consultation"
    },
    gedenken: {
      title: "Special Surprise",
      heading: "Give Joy",
      description: "Create a very special surprise for a dear person."
    }
  }
};

export default enContent;