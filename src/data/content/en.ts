import { ContentData } from './types';

export const enContent: ContentData = {
  shared: {
    navigation: {
      home: 'Home',
      gedenken: 'Create Tribute',
      about: 'About',
      contact: 'Contact',
      mode: {
        human: 'Humans',
        pet: 'Pets',
        surprise: 'Surprise'
      }
    },
    about: {
      title: 'About - Memora Moments',
      heading: 'About Memora Moments',
      description: 'Learn more about our mission to create dignified memories.'
    },
    contact: {
      title: 'Contact - Memora Moments',
      heading: 'Get in touch',
      description: 'Questions? We are here to help.'
    }
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
  }
};
