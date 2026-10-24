import type { Article, Locale, NewsIndex, Section } from './types';
import { getJSON } from './data';
import { loadEdition } from './editionCache';

export type DeskFilter = Section | 'all';
export interface SearchFilters { text: string; tag: string; from: string; to: string; section: DeskFilter; }
export interface SearchHit { article: Article; date: string; section: Section; }
export interface SearchProgress { done: number; total: number; cached: number; failed: number; }
function normalize(s:string){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();}
function matches(a:Article,filters:SearchFilters):boolean{
 if(filters.tag && !a.tags.some(t=>normalize(t)===normalize(filters.tag)))return false;
 const terms=normalize(filters.text).split(/\s+/).filter(Boolean);
 if(!terms.length)return true;
 const haystack=normalize([a.title,a.dek,a.summary,...(a.body||[]),...a.facts,...a.perspectives,...a.unknowns,...a.tags,...a.sources.map(s=>s.outlet+' '+s.title)].join(' '));
 return terms.every(t=>haystack.includes(t));
}
function oneYearAgo(){
 const date=new Date();date.setUTCDate(date.getUTCDate()-365);return date.toISOString().slice(0,10);
}
export async function searchArchive(locale:Locale,filters:SearchFilters,onProgress:(p:SearchProgress)=>void):Promise<{hits:SearchHit[];progress:SearchProgress}>{
 const index=await getJSON<NewsIndex>('news/index.json');
 const today=new Date().toISOString().slice(0,10);
 const from=filters.from||(!filters.to?oneYearAgo():'0000-01-01');
 const to=filters.to||today;
 const selected=filters.section==='all'?(['world','italy','technology','science'] as Section[]):[filters.section];
 const jobs=selected.flatMap(section=>(index.sections?.[section]||[]).filter(d=>d>=from && d<=to).map(date=>({date,section})));
 const progress:SearchProgress={done:0,total:jobs.length,cached:0,failed:0},hits:SearchHit[]=[];
 const revision=index.revision||String(index.version);
 onProgress({...progress});
 let offset=0;
 async function worker(){
  while(offset<jobs.length){
   const job=jobs[offset++],key=locale+'/'+job.section+'/'+job.date;
   try{
    const {edition,cached}=await loadEdition(job.date,job.section,locale,revision);
    if(cached)progress.cached++;
    for(const article of edition.articles)if(matches(article,filters))hits.push({article,date:job.date,section:job.section});
   }catch(err){progress.failed++;console.error('Search edition error',key,err);}
   progress.done++;onProgress({...progress});
  }
 }
 await Promise.all(Array.from({length:Math.min(jobs.length,4)},()=>worker()));
 hits.sort((a,b)=>b.date.localeCompare(a.date)||a.article.rank-b.article.rank||a.section.localeCompare(b.section));
 return {hits,progress};
}
