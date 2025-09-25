// src/data/productMedia.ts

import { Mode } from "./content/types";

/** ---------------------- Typen ---------------------- **/
export interface ProductMedia {
  demoVideos: {
    src: string;
    poster: string;
    alt: string;
  }[];
  basicProduct: {
    images: { src: string; alt: string }[];
  };
  premiumProduct: {
    images: { src: string; alt: string }[];
  };
  deluxeProduct: {
    images: { src: string; alt: string }[];
  };
  /** Standardbilder für den Memora Tag (werden für die Vorschau genutzt) */
  tagDefaults?: {
    round: string;   // Pfad zum runden Standard-Tag
    square: string;  // Pfad zum quadratischen Standard-Tag
  };
}

/** ---------------------- HUMAN MEDIA ---------------------- **/
export const humanMedia: ProductMedia = {
  demoVideos:  [
    
  ],
  basicProduct: {
    images: [ 
      {
        src: "/produktbilder/Human Media/Memora Tag/memora_tag_1.png",
        alt: "Runder Memora Tag auf hellem Hintergrund",
      },
      {
        src: "/produktbilder/Human Media/Memora Tag/memora_tag_2.png",
        alt: "Quadratischer Memora Tag auf hellem Hintergrund",
      },
      {
        src: "/produktbilder/Human Media/Memora Tag/memora_tag_3.png",
        alt: "Quadratischer Memora Tag in der Hand gehalten",
      },
      {
        src: "/produktbilder/Human Media/Memora Tag/memora_tag_4.png",
        alt: "Quadratischer Memora Tag an einem Grabstein befestigt",
      },
      {
        src: "/produktbilder/Human Media/Memora Tag/memora_tag_5.png",
        alt: "Nahaufnahme des Memora Tags auf einem Grabstein mit roten Blumen",
      },
      {
        src: "/produktbilder/Human Media/Memora Tag/memora_tag_6.png",
        alt: "Memora Tag auf einem Grabstein aus der Ferne",
      },
      {
        src: "/produktbilder/Human Media/Memora Tag/memora_tag_7.png",
        alt: "Runder Memora Tag neben einer schwarzen Urne",
      },
    ],
  },
  premiumProduct: {
  images: [
    {
      src: "/produktbilder/Human Media/Memora Frame/memora_frame_1.png",
      alt: "Eleganter Memora Frame in einem Wohnzimmer",
    },
    {
      src: "/produktbilder/Human Media/Memora Frame/memora_frame_2.png",
      alt: "Memora Frame auf einem Beistelltisch neben einer Pflanze",
    },
    {
      src: "/produktbilder/Human Media/Memora Frame/memora_frame_3.png",
      alt: "Nahaufnahme eines personalisierten Memora Frame",
    },
    {
      src: "/produktbilder/Human Media/Memora Frame/memora_frame_4.png",
      alt: "Memora Frame auf einer Kommode in einem hellen Raum",
    },
  ],
},
  deluxeProduct: {
    images: [
      {
      src: "/produktbilder/Human Media/Memora Deluxe/memora_coming_soon.jpg",
      alt: "Coming Soon: Memora Deluxe Produkt",
    },
    ],
  },
  tagDefaults: {
    round:  "/vorschaubilder/tag-default-round.png",
    square: "/vorschaubilder/tag-default-square.png",
  },
};

/** ---------------------- PET MEDIA ---------------------- **/
export const petMedia: ProductMedia = {
  demoVideos: [
    
  ],
  basicProduct: {
    images: [
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_keyholder_1.png",
        alt: "Memora Pet Tag als Schlüsselanhänger mit Licht und Schatten",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_keyholder_2.png",
        alt: "Nahaufnahme des Memora Pet Tag Schlüsselanhängers",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_keyholder_3.png",
        alt: "Memora Pet Tag Schlüsselanhänger auf einem Holztisch",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_rund_1.png",
        alt: "Runder Memora Pet Tag an einer weissen Wand",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_rund_2.png",
        alt: "Runder Memora Pet Tag in einem hellen Raum",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_rund_3.png",
        alt: "Runder Memora Pet Tag neben einer kleinen Urne",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_square_1.png",
        alt: "Quadratischer Memora Pet Tag an einer Wand",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_square_2.png",
        alt: "Schräger Blick auf den quadratischen Memora Pet Tag",
      },
      {
        src: "/produktbilder/Pet Media/Pet Tag/memora_pet_tag_square_3.png",
        alt: "Quadratischer Memora Pet Tag neben einer Urne",
      },
    ],
  },
  premiumProduct: {
    images: [
      {
        src: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_1.png",
        alt: "Personalisierter Memora Pet Frame mit Hundefoto",
      },
      {
        src: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_2.png",
        alt: "Schräge Ansicht des Memora Pet Frame",
      },
      {
        src: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_3.png",
        alt: "Memora Pet Frame auf einem Beistelltisch",
      },
      {
        src: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_4.png",
        alt: "Memora Pet Frame in einem Wohnzimmer auf einem Tisch",
      },
      {
        src: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_5.png",
        alt: "Memora Pet Frame an einer Wand in einem Raum",
      },
    ],
  },
  deluxeProduct: {
    images: [
      {
        src: "/produktbilder/Pet Media/Pet Deluxe/memora_pet_deluxe_1.png",
        alt: "Memora Pet Deluxe Platte mit Halterung in einem hellen Raum",
      },
      {
        src: "/produktbilder/Pet Media/Pet Deluxe/memora_pet_deluxe_2.png",
        alt: "Memora Pet Deluxe auf einem Tisch neben einer Kerze",
      },
      {
        src: "/produktbilder/Pet Media/Pet Deluxe/memora_pet_deluxe_3.png",
        alt: "Memora Pet Deluxe auf einem dunklen Tisch mit einer Orchidee",
      },
    ],
  },
  tagDefaults: {
    round:  "/vorschaubilder/pet-tag-default-round.png",
    square: "/vorschaubilder/pet-tag-default-square.png",
  },
};

//** ---------------------- SURPRISE MEDIA ---------------------- **/
export const surpriseMedia: ProductMedia = {
  demoVideos: [], // Vorerst leer, da kein Surprise-Video vorhanden ist
  basicProduct: {
    images: [
      {
        src: "/produktbilder/Surprise Media/Surprise Tag/memora_surprise_tag_1.png",
        alt: "Runder Memora Surprise Tag auf weissem Hintergrund",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Tag/memora_surprise_tag_2.png",
        alt: "Runder Memora Surprise Tag von vorne",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Tag/memora_surprise_tag_3.png",
        alt: "Runder Memora Surprise Tag in einer Geschenkbox",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Tag/memora_surprise_tag_4.png",
        alt: "Memora Surprise Tag als Geschenk",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Tag/memora_surprise_tag_5.png",
        alt: "Memora Surprise Tag in einem Notizbuch",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Tag/memora_surprise_tag_6.png",
        alt: "Memora Surprise Tag als Weihnachtsgeschenk",
      },
    ],
  },
  premiumProduct: {
    images: [
      {
        src: "/produktbilder/Surprise Media/Surprise Frame/memora_surprise_frame_1.png",
        alt: "Memora Surprise Frame auf einem Tisch",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Frame/memora_surprise_frame_2.png",
        alt: "Memora Surprise Frame in einem hellen Raum",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Frame/memora_surprise_frame_3.png",
        alt: "Memora Surprise Frame in einem modernen Wohnzimmer",
      },
      {
        src: "/produktbilder/Surprise Media/Surprise Frame/memora_surprise_frame_4.png",
        alt: "Nahaufnahme des Memora Surprise Frame",
      },
    ],
  },
  deluxeProduct: {
    images: [
      {
        src: "/produktbilder/Surprise Media/Surprise Deluxe/surprise_coming_soon.jpg",
        alt: "Memora Surprise Deluxe - Coming Soon",
      },
    ],
  },
  tagDefaults: {
    round:  "/vorschaubilder/suprise-tag-default.png",
    square: "/vorschaubilder/surprise-tag-default.png",
  },
};

/** ---------------------- SELECTOR ---------------------- **/
export const getMediaForMode = (modeOrIsPet: Mode | boolean): ProductMedia => {
  if (typeof modeOrIsPet === "boolean") {

    return modeOrIsPet ? petMedia : humanMedia;
  }
  if (modeOrIsPet === "pet") return petMedia;
  if (modeOrIsPet === "surprise") return surpriseMedia;
  return humanMedia;
};
