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
    {
      src: "/produktbilder/Pet Media/Pet Produktvideos/memora_pet_produktvideo.mp4",
      poster: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_4.png",
      alt: "Produktvideo für Memora Pet Produkte",
    },
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
        src: "https://images.unsplash.com/photo-1520697222860-7b53ab037854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Deluxe – Glasplatte",
      },
      {
        src: "https://images.unsplash.com/photo-1533139502658-0198f920d8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Deluxe – Gravur",
      },
      {
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Deluxe – Inszenierung",
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
    {
      src: "/produktbilder/Pet Media/Pet Produktvideos/memora_pet_produktvideo.mp4",
      poster: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_4.png",
      alt: "Produktvideo für Memora Pet Produkte",
    },
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

/** ---------------------- SURPRISE MEDIA ---------------------- **/
export const surpriseMedia: ProductMedia = {
  demoVideos:  [
    {
      src: "/produktbilder/Pet Media/Pet Produktvideos/memora_pet_produktvideo.mp4",
      poster: "/produktbilder/Pet Media/Pet Frame/memora_pet_frame_4.png",
      alt: "Produktvideo für Memora Pet Produkte",
    },
  ],
  basicProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
        alt: "Surprise Tag – Platte",
      },
      {
        src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Tag – Detail",
      },
      {
        src: "https://images.unsplash.com/photo-1517816428104-797678c7cf0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Tag – Anwendung",
      },
    ],
  },
  premiumProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Frame – Setup",
      },
      {
        src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Frame – Stimmung",
      },
      {
        src: "https://images.unsplash.com/photo-1545153997-203db7f40b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Frame – Detail",
      },
    ],
  },
  deluxeProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1551782450-17144c3a8f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Deluxe – Inszenierung",
      },
      {
        src: "https://images.unsplash.com/photo-1532960401447-7dd05bef20c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Deluxe – Gravur",
      },
      {
        src: "https://images.unsplash.com/photo-1520975867597-0f2a9c9d7f9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Surprise Deluxe – Detail",
      },
    ],
  },
  // Surprise kann auf die Human-Defaults zeigen – oder eigene bekommen
  tagDefaults: {
    round:  "/vorschaubilder/tag-default-round.png",
    square: "/vorschaubilder/tag-default-square.png",
  },
};

/** ---------------------- SELECTOR ---------------------- **/
export const getMediaForMode = (modeOrIsPet: Mode | boolean): ProductMedia => {
  if (typeof modeOrIsPet === "boolean") {
    // alte Aufrufe: true => pet, false => human
    return modeOrIsPet ? petMedia : humanMedia;
  }
  if (modeOrIsPet === "pet") return petMedia;
  if (modeOrIsPet === "surprise") return surpriseMedia;
  return humanMedia;
};
