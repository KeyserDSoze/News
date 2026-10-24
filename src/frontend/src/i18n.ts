import type { Locale, Section } from './types';
export const messages = {
  it: {
    name:'Oggettivizzatore', definition:'O come Oggettivizzatore. O come zero.',
    impactLabel:'Impatto', impactScope:{world:'globale',italy:'nazionale',technology:'tecnologico',science:'scientifico'},
    tagline:'Zero pubblicità. Zero titoli sensazionalistici.', subtitle:'Una rassegna dei fatti, senza rumore.',
    strapline:'IL GIORNALE DEI FATTI', today:'IN PRIMO PIANO', edition:'EDIZIONE',
    issue:'La rassegna del giorno', sources:'Fonti', facts:'Fatti verificabili', perspectives:'Dichiarazioni e punti di vista', unknowns:'Cosa non sappiamo',
    examine:'Leggi la notizia', archive:'DALL’ARCHIVIO', older:'Scorri per le edizioni precedenti.',
    loading:'Caricamento delle edizioni…', more:'Caricamento archivio…', end:'Hai raggiunto l’inizio dell’archivio.',
    error:'Non è stato possibile caricare le notizie.', retry:'Riprova', methodology:'Il nostro metodo',
    about:'Una rassegna indipendente con fonti citate, fatti separati dalle opinioni e incertezze dichiarate.',
    methodologyLink:'Leggi le regole editoriali', openSource:'Progetto open source', light:'Attiva il tema chiaro', dark:'Attiva il tema scuro',
    italian:'Leggi in italiano', english:'Read in English', sourcesLabel:'Fonti e documenti', footnote:'O non ospita pubblicità e non usa titoli sensazionalistici. Le fonti originali restano il riferimento.',
    mediaNotice:'Le illustrazioni non documentano direttamente gli eventi.', back:'Torna alla rassegna', briefing:'Rassegna', summary:'Il riassunto',
    fullStory:'La notizia, nel dettaglio', assessment:'Le domande e le constatazioni oggettive', historical:'La vicenda, giorno per giorno',
    updated:'Ci sono aggiornamenti', earlier:'Prima di questa notizia', later:'Gli sviluppi successivi', connected:'Notizie collegate',
    noUpdates:'Non sono ancora presenti altri aggiornamenti per questa vicenda.', current:'Stai leggendo', share:'Copia il link',
    copied:'Link copiato', viewSource:'Apri la fonte', pendingTitle:'Questa sezione è in preparazione',
    pendingText:'Le rassegne specializzate saranno pubblicate soltanto quando avremo cinque notizie verificate, con fonti indipendenti. Le edizioni già pubblicate restano consultabili in Mondo.',
    pendingTag:'IN ARRIVO', archiveLabel:'Edizioni precedenti', sectionLabel:'QUATTRO RASSEGNE, UN SOLO METODO',
    zero1:'0 PUBBLICITÀ',zero2:'0 TITOLI ESAGERATI',
    sectionNames:{world:'Mondo',italy:'Italia',technology:'Tecnologia',science:'Scienza'},
    sectionDescriptions:{world:'I dieci fatti più rilevanti dal mondo.',italy:'Cinque fatti importanti per l’Italia.',technology:'Cinque sviluppi nel mondo tecnologico.',science:'Cinque notizie dalla ricerca e dalla scienza.'},
    categories:{world:'Mondo',politics:'Politica',economy:'Economia',technology:'Tecnologia',climate:'Clima',society:'Società'}
  },
  en: {
    name:'Objectivizer', definition:'O for Objectivizer. O for zero.',
    impactLabel:'Impact', impactScope:{world:'global',italy:'national',technology:'technology sector',science:'scientific research'},
    tagline:'Zero ads. Zero sensational headlines.', subtitle:'The facts, without the noise.',
    strapline:'THE FACTS JOURNAL', today:'TOP STORIES', edition:'EDITION',
    issue:'The daily briefing', sources:'Sources', facts:'Established facts', perspectives:'Statements and perspectives', unknowns:'What remains unknown',
    examine:'Read the story', archive:'FROM THE ARCHIVE', older:'Scroll for previous editions.',
    loading:'Loading editions…', more:'Loading the archive…', end:"You've reached the start of the archive.",
    error:'Unable to load the news.', retry:'Try again',methodology:'Our method',
    about:'An independent briefing: cited sources, facts distinct from interpretations, uncertainty made explicit.',
    methodologyLink:'Read the editorial guidelines',openSource:'Open-source project',light:'Switch to light theme',dark:'Switch to dark theme',
    italian:'Leggi in italiano',english:'Read in English',sourcesLabel:'Sources and documents',footnote:'O carries no advertisements and avoids sensational headlines. Original reporting remains the primary reference.',
    mediaNotice:'Illustrations do not directly document the events.',back:'Back to the briefing',briefing:'Briefing',summary:'The summary',
    fullStory:'The full story',assessment:'Objective questions and observations',historical:'The developing story, day by day',
    updated:'Updates available',earlier:'Earlier coverage',later:'Subsequent developments',connected:'Related reporting',
    noUpdates:'There are no other updates to this developing story yet.',current:'You are reading',share:'Copy link',
    copied:'Link copied',viewSource:'Open source',pendingTitle:'This section is being prepared',
    pendingText:'Specialist briefings will appear once five stories have been independently checked and sourced. Published editions remain available under World.',
    pendingTag:'COMING SOON',archiveLabel:'Previous editions',sectionLabel:'FOUR BRIEFINGS, ONE STANDARD',
    zero1:'0 ADVERTISEMENTS',zero2:'0 CLICKBAIT HEADLINES',
    sectionNames:{world:'World',italy:'Italy',technology:'Technology',science:'Science'},
    sectionDescriptions:{world:'Ten stories that matter around the world.',italy:'Five essential stories from Italy.',technology:'Five developments in technology.',science:'Five stories from science and research.'},
    categories:{world:'World',politics:'Politics',economy:'Economy',technology:'Technology',climate:'Climate',society:'Society'}
  }
} as const;
export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale==='it'?'it-IT':'en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
}
export function sectionName(section: Section, locale: Locale) { return messages[locale].sectionNames[section]; }
