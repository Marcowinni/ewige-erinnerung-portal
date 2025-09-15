// Content type definitions for the application
export type Language = 'de' | 'en' | 'fr' | 'it';
export type Mode = 'human' | 'pet' | 'surprise';

/* =========================================================
   Uploader: zentrale Copy-Struktur
   ========================================================= */
export interface UploaderCopy {
  headings: {
    pageTitleByMode: { human: string; pet: string; surprise: string };
    step1Subtitle: string;
    step2ByMode: { human: string; pet: string; surprise: string };
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    step4Title: string;
    step4Subtitle: string;
    step5Title: string;
    step5Subtitle: string;
    summary: string;
  };
  buttons: {
    back: string;
    next: string;
    reset: string;
    toPay: string;
    addText: string;
    applyDesign: string;
    remove: string;
  };
  products: {
    formatTitle: string;
    formatTitleDeluxe: string;
    roundLabel: string;
    squareLabel: string;
    petOptionsTitle: string;
    keychainLabel: string;
    designLabel: string;
    designStandard: string;
    designCustom: string;
    designCustomNote: string;
    frameTitle: string;
    frameOrientationLabel: string;
    framePortrait: string;
    frameLandscape: string;
    frameTip: string;
  };
  editor: {
    image: string;
    zoom: string;
    posX: string;
    posY: string;
    emptyTitle: string;
    emptySub: string;
    selectedText: string;
    content: string;
    font: string;
    size: string;
    color: string;
    previewLabel: string;
    previewNote: string;
  };
  step2Fields: {
    human_lastName: string;
    human_firstName: string;
    human_deathDate: string;
    human_notesPH: string;
    pet_name: string;
    pet_deathDate: string;
    pet_notesPH: string;
    surprise_name: string;
    surprise_notesPH: string;
  };
  step3Fields: {
    imagesLabel: string;
    videosLabel: string;
    remove: string;
  };
  contactFields: {
    firstName: string;
    lastName: string;
    email: string;
    phoneOpt: string;
  };
  invoiceFields: {
    sameAsContact: string;
    companyOpt: string;
    firstName: string;
    lastName: string;
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  summary: {
    mode: string;
    product: string;
    format: string;
    formatRound: string;
    formatSquare: string;
    options: string;
    person: string;
    pet: string;
    recipient: string;
    notes: string;
    counts: (imgs: number, vids: number) => string;
    previewTitle: string;
  };
}

/* =========================================================
   DeepPartial für bequeme, tiefe Overrides in Sprachdateien
   ========================================================= */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepPartial<T[K]>
    : T[K];
};

/** Sprach-/Modus-Overrides: jetzt tief partiell */
export type UploaderCopyOverrides = DeepPartial<UploaderCopy>;

/* =========================
   Bestehende Content-Typen
   ========================= */
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
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
    premium1: string;
    premium2: string;
    premium3: string;
    premium4: string;
    deluxe1: string;
    deluxe2: string;
    deluxe3: string;
    deluxe4: string;
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
  start: string;
  mode: {
    human: string;
    pet: string;
    surprise: string;
  };
}

export interface AboutPageContent {
  title: string;
  lead: string;
  story: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  };
  values: {
    title: string;
    compassion: { title: string; desc: string };
    personality: { title: string; desc: string };
    connection: { title: string; desc: string };
  };
  product: {
    title: string;
    p1: string;
    p2: string;
  };
}

export interface LegalContent {
  privacy: {
    title: string;
    sections: {
      responsible: { title: string; content: string };
      dataCollection: { title: string; content: string; list: string[] };
      imageProcessing: { title: string; content: string; list: string[] };
      rights: { title: string; content: string; list: string[] };
      cookies: { title: string; content: string };
    };
  };
  terms: {
    title: string;
    sections: {
      scope: { title: string; content: string };
      contract: { title: string; content: string };
      services: { title: string; content: string };
      prices: { title: string; content: string };
      delivery: { title: string; content: string };
      liability: { title: string; content: string };
      ip: { title: string; content: string };
      privacy: { title: string; content: string };
      special: { title: string; content: string };
      law: { title: string; content: string };
      final: { title: string; content: string };
      cancellation: { title: string; content: string };
      warranty: { title: string; content: string };
      contact?: { title: string; content: string };
    };
  };
  imprint: {
    title: string;
    sections: {
      info: { title: string; content: string };
      contact: { title: string; content: string };
      responsible: { title: string; content: string };
      disclaimer: {
        title: string;
        p1: string;
        p2: string;
        p3: string;
        p4: string;
        p5: string;
      };
    };
  };
}

export interface FooterContent {
  brand: {
    name: string;
    description: string;
  };
  contactTitle: string;
  linksTitle: string;
  legal: {
    privacy: string;
    terms: string;
    imprint: string;
  };
  copyright: string;
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
    email?: string;
    phone?: string;
    form?: {
      title: string;
      submit: string;
      success: string;
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      subject: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
    };
  };
  aboutPage: AboutPageContent;
  legal: LegalContent;
  footer: FooterContent;
}

export interface ModeContent {
  hero: HeroContent;
  features: FeatureContent;
  howitworks: HowItWorksContent;
  products: ProductsContent;
  cta: CTAContent;
  gedenken: GedenkContent;
  uploaderCopy?: UploaderCopyOverrides;
}

export interface ContentData {
  shared: SharedContent;
  human: ModeContent;
  pet: ModeContent;
  surprise: ModeContent;
}