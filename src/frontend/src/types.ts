export type Locale = 'it' | 'en';
export type Section = 'world' | 'italy' | 'technology' | 'science';
export type Category = 'world' | 'politics' | 'economy' | 'technology' | 'climate' | 'society';
export const sections: Section[] = ['world','italy','technology','science'];
export const sectionSize: Record<Section,number> = { world:10, italy:5, technology:5, science:5 };
export interface Source { outlet: string; title: string; url: string; publishedAt: string; role: 'reporting' | 'official' | 'analysis'; }
export interface Image { src: string; fallbackSrc?: string; alt: string; credit: string; sourceUrl: string; license: string; kind: 'photo' | 'illustration'; caption?: string; }
export interface StoryRef { date: string; section: Section; id: string; }
export interface ObjectivePoint { question: string; answer: string; }
export interface Article {
  id: string; rank: number; category: Category; title: string; dek: string; summary: string;
  body?: string[]; questions?: ObjectivePoint[]; facts: string[]; perspectives: string[]; unknowns: string[];
  threadId?: string; threadRecap?: string; related?: StoryRef[];
  sources: Source[]; image: Image;
}
export interface Edition { date: string; language: Locale; section?: Section; publishedAt: string; editorialNote: string; articles: Article[]; }
export interface NewsIndex { version: number; dates: string[]; sections: Record<Section,string[]>; }
export interface StoryPreview extends StoryRef { title: string; dek: string; summary: string; category: Category; threadId?: string; threadRecap?: string; }
export interface StoryIndex { version: number; language: Locale; stories: StoryPreview[]; }
export function storyKey(ref: StoryRef) { return `${ref.date}/${ref.section}/${ref.id}`; }
export function storyHref(ref: StoryRef) { return `#/article/${ref.section}/${ref.date}/${encodeURIComponent(ref.id)}`; }
export function editionPath(date: string, section: Section) { return section==='world' ? `news/${date}/world` : `news/${date}/${section}`; }
