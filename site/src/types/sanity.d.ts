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
    slug: {
        _type: "slug";
        current: string;
    };
    favouriteArtist: string;
    image?: SanityImage;
    bio?: string;
    links?: Array<{
        platform: string;
        url: string;
    }>;
    _createdAt: string;
    _updatedAt?: string;
    _rev?: string;
}

export interface Category {
    _id: string;
    _type: "category";
    title: string;
    description?: string;
}

export interface Thought {
    _id: string;
    _type: "thought";
    title: string;
    slug: {
        _type: "slug";
        current: string;
    };
    author: Author;
    categories?: Category[];
    body: PortableTextBlock[];
    publishedAt: string;
}

export interface Review {
    _id: string;
    _type: "reviews";
    title: string;
    artist: string;
    genre: string;
    reviewType: "albums" | "tracks";
    isClassic?: boolean;
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
    rating: number;
    releaseDate: string;
}

export interface SanityDocument {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
}

// Extend the base types with SanityDocument fields
export type ThoughtWithMetadata = Thought & SanityDocument;
export type ReviewWithMetadata = Review & SanityDocument;
