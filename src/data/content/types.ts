// Content type definitions for the application
export type Language = 'de' | 'en' | 'fr' | 'it';
export type Mode = 'human' | 'pet' | 'surprise';

export interface HeroContent {
  title: string;
  subtitle: string;
  startButton: string;
  learnButton: string;
}

export interface FeatureContent {
  title: string;
  subtitle: string;
  unique: { title: string; desc: string };
  multimedia: { title: string; desc: string };
  music: { title: string; desc: string };
  quality: { title: string; desc: string };
}

export interface HowItWorksContent {
  title: string;
  subtitle: string;
  step1: { title: string; desc: string };
  step2: { title: string; desc: string };
  step3: { title: string; desc: string };
}

export interface ProductsContent {
  title: string;
  subtitle: string;
  basic: {
    title: string;
    desc: string;
    price: string;
  };
  premium: {
    title: string;
    desc: string;
    price: string;
  };
  deluxe: {                 
    title: string;
    desc: string;
    price: string;
  };
  features: {
    glass: string;
    nfc: string;
    format: string;
    weather: string;
    all: string;
    photo: string;
    engraving: string;
    premium: string;
  };
}


export interface CTAContent {
  title: string;
  subtitle: string;
  create: string;
  contact: string;
}

export interface GedenkContent {
  title: string;
  heading: string;
  description: string;
}

export interface NavigationContent {
  home: string;
  gedenken: string;
  about: string;
  contact: string;
  mode: {
    human: string;
    pet: string;
    surprise: string; // neu
  };
}

export interface SharedContent {
  navigation: NavigationContent;
  about: {
    title: string;
    heading: string;
    description: string;
  };
  contact: {
    title: string;
    heading: string;
    description: string;
  };
}

export interface ModeContent {
  hero: HeroContent;
  features: FeatureContent;
  howitworks: HowItWorksContent;
  products: ProductsContent;
  cta: CTAContent;
  gedenken: GedenkContent;
}

export interface ContentData {
  shared: SharedContent;
  human: ModeContent;
  pet: ModeContent;
  surprise: ModeContent;
}
