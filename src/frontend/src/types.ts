export type Locale = 'it' | 'en';
export type Category = 'world' | 'politics' | 'economy' | 'technology' | 'climate' | 'society';
export interface Source { outlet: string; title: string; url: string; publishedAt: string; role: 'reporting' | 'official' | 'analysis'; }
export interface Image { src: string; fallbackSrc?: string; alt: string; credit: string; sourceUrl: string; license: string; kind: 'photo' | 'illustration'; caption?: string; }
export interface Article { id: string; rank: number; category: Category; title: string; dek: string; summary: string; facts: string[]; perspectives: string[]; unknowns: string[]; sources: Source[]; image: Image; }
export interface Edition { date: string; language: Locale; publishedAt: string; editorialNote: string; articles: Article[]; }
export interface NewsIndex { version: number; dates: string[]; }
