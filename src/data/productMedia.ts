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
  demoVideos: [
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Tag Demo für Menschen",
    },
    {
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Frame Demo für Menschen",
    },
  ],
  basicProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag für Menschen",
      },
      {
        src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Detail - Menschen",
      },
      {
        src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Verwendung - Menschen",
      },
    ],
  },
  premiumProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame für Menschen",
      },
      {
        src: "https://images.unsplash.com/photo-1605693803834-d6b0cd20ecbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Gravur - Menschen",
      },
      {
        src: "https://images.unsplash.com/photo-1560472354-4cb83edd6080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Personalisierung - Menschen",
      },
      {
        src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Qualität - Menschen",
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
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Tag Demo für Haustiere",
    },
    {
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Frame Demo für Haustiere",
    },
  ],
  basicProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag für Haustiere",
      },
      {
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Detail - Haustiere",
      },
      {
        src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Verwendung - Haustiere",
      },
    ],
  },
  premiumProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame für Haustiere",
      },
      {
        src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Gravur - Haustiere",
      },
      {
        src: "https://images.unsplash.com/photo-1601758228466-ce2e95424623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Personalisierung - Haustiere",
      },
      {
        src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Qualität - Haustiere",
      },
    ],
  },
  deluxeProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Haustier-Memora Deluxe – Portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1546421845-6471bdcf3f72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Haustier-Memora Deluxe – Gravur",
      },
      {
        src: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Haustier-Memora Deluxe – Detail",
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
  demoVideos: [
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster:
        "https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      alt: "Surprise Tag Demo",
    },
    {
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      alt: "Surprise Frame Demo",
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
