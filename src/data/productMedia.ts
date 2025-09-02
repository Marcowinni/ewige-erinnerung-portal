// Product media configuration for human and pet modes
export interface ProductMedia {
  demoVideos: {
    src: string;
    poster: string;
    alt: string;
  }[];
  basicProduct: {
    images: {
      src: string;
      alt: string;
    }[];
  };
  premiumProduct: {
    images: {
      src: string;
      alt: string;
    }[];
  };
}

export const humanMedia: ProductMedia = {
  demoVideos: [
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Tag Demo für Menschen"
    },
    {
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Frame Demo für Menschen"
    }
  ],
  basicProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag für Menschen"
      },
      {
        src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Detail - Menschen"
      },
      {
        src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Verwendung - Menschen"
      }
    ]
  },
  premiumProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame für Menschen"
      },
      {
        src: "https://images.unsplash.com/photo-1605693803834-d6b0cd20ecbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Gravur - Menschen"
      },
      {
        src: "https://images.unsplash.com/photo-1560472354-4cb83edd6080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Personalisierung - Menschen"
      },
      {
        src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Qualität - Menschen"
      }
    ]
  }
};

export const petMedia: ProductMedia = {
  demoVideos: [
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Tag Demo für Haustiere"
    },
    {
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      alt: "Memora Frame Demo für Haustiere"
    }
  ],
  basicProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag für Haustiere"
      },
      {
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Detail - Haustiere"
      },
      {
        src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Tag Verwendung - Haustiere"
      }
    ]
  },
  premiumProduct: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame für Haustiere"
      },
      {
        src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Gravur - Haustiere"
      },
      {
        src: "https://images.unsplash.com/photo-1601758228466-ce2e95424623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Personalisierung - Haustiere"
      },
      {
        src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        alt: "Memora Frame Qualität - Haustiere"
      }
    ]
  }
};

export const getMediaForMode = (isPetMode: boolean): ProductMedia => {
  return isPetMode ? petMedia : humanMedia;
};