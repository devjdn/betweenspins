import { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    hotspot?: boolean;
}

export interface Author {
    _id: string;
    _type: "author";
    name: string;
    image?: SanityImage;
}

export interface Category {
    _id: string;
    _type: "category";
    title: string;
    description?: string;
}

export interface Post {
    _id: string;
    _type: "post";
    title: string;
    artist: string;
    genre: string;
    slug: {
        _type: "slug";
        current: string;
    };
    author: Author;
    description: string;
    mainImage?: SanityImage;
    categories?: Category[];
    publishedAt: string;
    body: PortableTextBlock[];
    rating?: number;
}

export interface SanityDocument {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
}

// Extend the base Post type with SanityDocument fields
export type PostWithMetadata = Post & SanityDocument;
