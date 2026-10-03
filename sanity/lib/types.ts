import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  _type: "image";
  alt?: string;
  caption?: string;
  asset: {
    _type?: "sanity.imageAsset";
    _id: string;
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type ArticleCallout = {
  _key: string;
  _type: "callout";
  text: string;
};

export type ArticleAccordion = {
  _key: string;
  _type: "accordion";
  title: string;
  content?: PortableTextBlock[];
};

export type ArticleSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  coverImage?: SanityImage;
};

export type Article = ArticleSummary & {
  body: Array<
    PortableTextBlock | SanityImage | ArticleCallout | ArticleAccordion
  >;
};

export type Kajian = {
  _id: string;
  title: string;
  schedule?: string;
  time?: string;
  scheduleAt?: string;
  location: string;
  speaker: string;
  poster: SanityImage;
};

export type StudentLifeGallery = {
  slides?: Array<{
    _key: string;
    mediaType?: "image" | "video";
    image?: SanityImage;
    imageAlt?: string;
    youtubeUrl?: string;
    videoTitle?: string;
  }>;
};
