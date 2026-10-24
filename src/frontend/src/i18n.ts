import type { Category, Locale } from './types';
export const messages = {
  it: {
    subtitle: 'Il mondo, senza il rumore.', strapline: 'LA RASSEGNA DEI FATTI', today: 'IN PRIMO PIANO',
    edition: 'EDIZIONE', issue: 'La rassegna di oggi', count: '10 fatti, molte prospettive. Una lettura più chiara.',
    sources: 'Fonti', facts: 'I fatti verificabili', perspectives: 'Prospettive e dichiarazioni', unknowns: 'Cosa resta da chiarire',
    examine: 'Leggi l’analisi', close: 'Chiudi l’analisi', image: 'Immagine',
    archive: 'DALL’ARCHIVIO', older: 'Proseguendo, scopri le edizioni precedenti.',
    loading: 'Caricamento delle edizioni…', more: 'Caricamento archivio…', end: 'Hai raggiunto l’inizio dell’archivio.',
    error: 'Non è stato possibile caricare le notizie.', retry: 'Riprova', all: 'Tutte',
    methodology: 'Il nostro metodo', about: 'Dieci notizie essenziali al giorno. Fatti distinti dalle interpretazioni, fonti multiple e dubbi dichiarati.',
    methodologyLink: 'Leggi le regole editoriali', openSource: 'Progetto open source',
    light: 'Attiva il tema chiaro', dark: 'Attiva il tema scuro', italian: 'Leggi in italiano', english: 'Read in English',
    originalIllustration: 'Illustrazione editoriale', primaryTitle: 'Il punto del giorno',
    sourcesLabel: 'Documenti e testate consultate', footnote: 'Una rassegna indipendente. Nessun titolo sostituisce la lettura delle fonti.',
    viewSource: 'Apri la fonte', mediaNotice: 'Le immagini illustrative non documentano direttamente gli eventi.',
    categories: { world: 'Mondo', politics: 'Politica', economy: 'Economia', technology: 'Tecnologia', climate: 'Clima', society: 'Società' }
  },
  en: {
    subtitle: 'The world, without the noise.', strapline: 'THE FACTS BRIEFING', today: 'TOP STORIES',
    edition: 'EDITION', issue: 'Today’s briefing', count: '10 stories, many perspectives. A clearer picture.',
    sources: 'Sources', facts: 'What we can establish', perspectives: 'Perspectives and claims', unknowns: 'What remains unclear',
    examine: 'Read the analysis', close: 'Close analysis', image: 'Image',
    archive: 'FROM THE ARCHIVE', older: 'Keep scrolling to explore past editions.',
    loading: 'Loading editions…', more: 'Loading archive…', end: 'You’ve reached the beginning of the archive.',
    error: 'Unable to load the news.', retry: 'Try again', all: 'All',
    methodology: 'Our method', about: 'Ten essential stories every day. Facts separated from interpretation, multiple sources, and openly stated uncertainty.',
    methodologyLink: 'Read our editorial policy', openSource: 'Open-source project',
    light: 'Switch to light theme', dark: 'Switch to dark theme', italian: 'Leggi in italiano', english: 'Read in English',
    originalIllustration: 'Editorial illustration', primaryTitle: 'The day in focus',
    sourcesLabel: 'Reporting and documents consulted', footnote: 'An independent press review. Our summaries are no substitute for original reporting.',
    viewSource: 'Open source', mediaNotice: 'Illustrative imagery does not directly document these events.',
    categories: { world: 'World', politics: 'Politics', economy: 'Economy', technology: 'Technology', climate: 'Climate', society: 'Society' }
  }
} as const;
export const categoryKeys: Category[] = ['world','politics','economy','technology','climate','society'];
export function formatDate(date: string, locale: Locale) {
 return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB',{day:'numeric',month:'long',year:'numeric', timeZone:'UTC'}).format(new Date(date + 'T12:00:00Z'));
}
