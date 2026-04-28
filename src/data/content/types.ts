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
    notes_human: string;
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
    imageCaptionPlaceholder: string;
    videoCaptionPlaceholder: string;
    //music selection part
    musicSelection?: {
      title: string;
      availableMusic: string;
      selected: string;
      select: string;
      moreMusic: string;
      pixabayPlaceholder: string;
      pixabayButton: string;
    };
    calendarStyleSelection?: {
        title: string;
        modern: string;
        classic: string;
    };
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
    total: string;
    optionOrientation: string;
    optionPortrait: string;
    optionLandscape: string;
    modeHuman: string;
    modePet: string;
    modeSurprise: string;
    calendarStyle: string;
  };

  orderConfirmation: {
    prefix: string;
    termsLinkText: string;
    separator: string;
    privacyLinkText: string;
    suffix: string;
  };

  privacyNotice: {
    text: string;
    privacyLink: string;
    and: string;
    termsLink: string;
    agreed: string;
  }
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

export interface DonationContent {
  title: string;
  description: string;
  linkText: string;
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
  create: string;
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
      purpose: { title: string; content: string; list: string[] };
      disclosure: { title: string; content: string; list: string[] };
      storage: { title: string; content: string };
      security: { title: string; content: string };
      rights: { title: string; content: string; list: string[] };
      cookies: { title: string; content: string };
      changes: { title: string; content: string };
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
      cancellation: { title: string; content: string };
      warranty: { title: string; content: string };
      liability: { title: string; content: string };
      ip: { title: string; content: string };
      privacy: { title: string; content: string };
      special: { title: string; content: string };
      law: { title: string; content: string };
      final: { title: string; content: string };
      contact: { title: string; content: string };
      availability: { title: string; content: string };
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
        content: { title: string; content: string };
        links: { title: string; content: string };
        copyright: { title: string; content: string };
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

export interface AlbumPageContent {
  title: (name: string) => string;
  preTitle?: string;
  subtitle: string;
  defaultName: string;
  playButton: string;
  pauseButton: string;
  playButtonHint: string;
  openAlbum?: string; 
}

export interface SharedContent {
  navigation: NavigationContent;
  banner?: {
    text: string;
  };
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
  albumPage: AlbumPageContent;

  orderSuccessPage: {
    title: string; // Für SEO/Browser-Tab
    heading: string;
    message1: string;
    buttonHome: string;
  };
  orderCancelPage: {
    title: string;
    heading: string;
    message: string;
    buttonBack: string;
  };

  /* New i18n slices for the redesigned landing page + customer wizard */
  landing: {
    hero: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      subtitle1: string;
      subtitle2: string;
      ctaCreate: string;
    };
    pathChoice: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      ctaCreate: string;
    };
    audience: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      human: { eyebrow: string; headline: string; body: string };
      pet: { eyebrow: string; headline: string; body: string };
    };
    styleShowcase: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      hint: string;
      ctaPickStyle: string;
      previewTitle: (style: string) => string;
      navBack: string;
      navForward: string;
      themes: { modern: string; classic: string; timeless: string };
    };
    partner: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      body: string;
      cta: string;
    };
  };

  customerWizard: {
    stepLabels: [string, string, string, string];
    progress: (current: number, total: number) => string;
    nav: { back: string; next: string; toStep4: string };
    step1: {
      title: string;
      subtitle: string;
      optionHuman: string;
      optionPet: string;
      nameLabel: string;
      namePlaceholderHuman: string;
      namePlaceholderPet: string;
      birthDate: string;
      deathDateHuman: string;
      deathDatePet: string;
      dedicationLabel: string;
      dedicationPlaceholder: string;
    };
    step2: {
      title: string;
      subtitle: string;
      modernLabel: string;
      modernDesc: string;
      classicLabel: string;
      classicDesc: string;
      timelessLabel: string;
      timelessDesc: string;
      selected: string;
      previewIframeTitle: (style: string) => string;
    };
    step3: {
      title: string;
      countLabel: (count: number, max: number) => string;
      intro: (min: number, max: number) => string;
      moreNeeded: (n: number, min: number) => string;
      dropZoneTitle: string;
      dropZoneOr: string;
      dropZoneSelect: string;
      dropZoneRange: (min: number, max: number) => string;
      compressing: string;
      removeAria: string;
      musicTitle: string;
      pause: string;
      play: string;
      selected: string;
      select: string;
      pixabayPlaceholder: string;
      pixabayLabel: string;
      pixabayOpen: string;
      noSelection: string;
    };
    step4: {
      title: string;
      subtitle: string;
      contactSection: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      addressSection: string;
      shippingPrefix: string;
      streetLabel: string;
      streetPlaceholder: string;
      postalLabel: string;
      cityLabel: string;
      cityPlaceholder: string;
      countryLabel: string;
      summaryTitle: string;
      summaryFor: string;
      summaryStyle: string;
      summaryImagesLabel: string;
      summaryImages: (count: number) => string;
      summaryMusic: string;
      summaryShipping: string;
      summaryNoSelection: string;
      totalLabel: string;
      processing: string;
      payCta: (price: string) => string;
      testCta: string;
    };
    validation: {
      pickAudience: string;
      pickStyle: string;
      uploadMin: (min: number) => string;
      fillRequired: string;
      emailRequired: string;
      nameRequired: string;
      addressRequired: string;
      completeAllSteps: string;
      minMediaError: (min: number) => string;
    };
    toasts: {
      uploading: (count: number) => string;
      errorGeneric: string;
      orderCreatedNoPayment: string;
      filesAdded: (count: number) => string;
      maxReached: (max: number) => string;
      videoTooBig: (filename: string) => string;
    };
    shippingZones: { ch: string; eu: string; world: string };
    styleNames: { modern: string; classic: string; timeless: string };
    success: { title: string; message: string };
  };

  cookieBanner: {
    text: string;
    learnMore: string;
    accept: string;
    decline: string;
  };

  navAria: {
    main: string;
    theme: string;
    menu: string;
    close: string;
    closePreview: string;
  };

  notFoundPage: {
    title: string;
    message: string;
    ctaHome: string;
  };

  meta: {
    landing: { title: string; description: string };
    selfService: { title: string };
    partner: { title: string };
  };

  selfServicePage: {
    back: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
  };
}



/* ==========================================
   ModeContent: mit optionalem uploaderCopy-Override
   ========================================== */
export interface ModeContent {
  hero: HeroContent;
  features: FeatureContent;
  donation: DonationContent;
  howitworks: HowItWorksContent;
  products: ProductsContent;
  cta: CTAContent;
  gedenken: GedenkContent;

  /** Optionale Überschreibungen für den MemoryUploader (Texte) */
  uploaderCopy?: UploaderCopyOverrides;
}

export interface ContentData {
  shared: SharedContent;
  human: ModeContent;
  pet: ModeContent;
  surprise: ModeContent;
}