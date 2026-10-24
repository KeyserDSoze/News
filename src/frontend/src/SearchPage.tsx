import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Check, Database, Search as SearchIcon, SlidersHorizontal, Tag, X } from 'lucide-react';
import { formatDate, messages, sectionName } from './i18n';
import { sections, storyHref } from './types';
import type { Locale, Section } from './types';
import { searchArchive } from './search';
import type { SearchFilters, SearchHit, SearchProgress } from './search';
export function tagHref(tag:string){return '#/search/tag/'+encodeURIComponent(tag);}
const empty:SearchFilters={text:'',tag:'',from:'',to:'',section:'all'};
export default function SearchPage({locale,presetTag}:{locale:Locale;presetTag:string}){
 const t=messages[locale], [draft,setDraft]=useState<SearchFilters>({...empty,tag:presetTag});
 const [applied,setApplied]=useState<SearchFilters>({...empty,tag:presetTag});
 const [hits,setHits]=useState<SearchHit[]>([]),[progress,setProgress]=useState<SearchProgress>({done:0,total:0,cached:0,failed:0});
 const [loading,setLoading]=useState(true),[limit,setLimit]=useState(30);
 useEffect(()=>{
  setDraft(old=>({...old,tag:presetTag}));
  setApplied(old=>({...old,tag:presetTag}));
  setLimit(30);
 },[presetTag]);
 useEffect(()=>{
  let active=true;
  setLoading(true);setProgress({done:0,total:0,cached:0,failed:0});
  searchArchive(locale,applied,p=>{if(active)setProgress(p)}).then(({hits,progress})=>{
    if(!active)return;setHits(hits);setProgress(progress);setLoading(false);
  }).catch(err=>{if(active){console.error('Archive search',err);setHits([]);setLoading(false);setProgress(old=>({...old,failed:old.failed+1}));}});
  return()=>{active=false;};
 },[locale,applied]);
 const results=useMemo(()=>hits.slice(0,limit),[hits,limit]);
 const change=<K extends keyof SearchFilters>(key:K,value:SearchFilters[K])=>setDraft(old=>({...old,[key]:value}));
 function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setApplied({...draft});setLimit(30);}
 function clear(){setDraft({...empty});setApplied({...empty});setLimit(30);}
 return <main className="container search-page" id="content">
  <div className="search-head"><div className="detail-kicker"><SearchIcon size={16}/>{t.searchOffline}</div><h1>{t.searchTitle}<span>.</span></h1><p>{t.searchHint}</p></div>
  <form className="search-form" role="search" onSubmit={submit}>
    <label className="search-text-field"><span className="sr-only">{t.searchPlaceholder}</span><SearchIcon size={20}/><input type="search" value={draft.text} onChange={e=>change('text',e.target.value)} placeholder={t.searchPlaceholder}/></label>
    <div className="search-filter-row">
      <label><SlidersHorizontal size={16}/>{t.searchAll}
        <select value={draft.section} onChange={e=>change('section',e.target.value as Section|'all')} aria-label={t.searchAll}>
          <option value="all">{t.searchAll}</option>{sections.map(s=><option key={s} value={s}>{sectionName(s,locale)}</option>)}
        </select>
      </label>
      <label><CalendarDays size={16}/>{t.searchFrom}<input aria-label={t.searchFrom} type="date" value={draft.from} onChange={e=>change('from',e.target.value)}/></label>
      <label><CalendarDays size={16}/>{t.searchTo}<input aria-label={t.searchTo} type="date" min={draft.from||undefined} value={draft.to} onChange={e=>change('to',e.target.value)}/></label>
    </div>
    <div className="search-action-row">
      {draft.tag&&<button type="button" className="tag-selected" onClick={()=>change('tag','')} aria-label={t.searchClear}><Tag size={14}/>{draft.tag}<X size={15}/></button>}
      <div className="search-action-spacer"/>
      <button type="button" className="clear-filters" onClick={clear}>{t.searchClear}</button>
      <button type="submit" className="search-submit"><SearchIcon size={16}/>{t.searchGo}</button>
    </div>
  </form>
  <div className="search-status" role="status" aria-live="polite">
    <div>{loading?<span className="search-status-progress"><span className="loader"/>{t.searchLoading}:<><strong>{hits.length}</strong> {t.searchResults}</>}</div>
    <span><Database size={14}/>{t.searchCache}: {progress.cached} / {progress.total} <span className="search-downloaded">· {progress.done}/{progress.total}</span></span>
  </div>
  {progress.failed>0&&<p className="search-warning" role="alert">{t.searchError}</p>}
  {!loading&&hits.length===0&&<div className="search-empty"><SearchIcon size={30}/>{t.searchNone}</div>}
  <div className="search-results" aria-label={t.searchResults}>{results.map(({article,date,section})=>
    <article key={section+'/'+date+'/'+article.id} className="search-result">
      <div className="search-result-label">{sectionName(section,locale)} <span>/</span> {formatDate(date,locale)} <span>/</span> {article.impact.toLocaleString(locale==='it'?'it-IT':'en-GB')} ★</div>
      <h2><a href={storyHref({section,date,id:article.id})}>{article.title}</a></h2>
      <p>{article.summary}</p>
      <div className="search-result-footer"><div className="story-tags">{article.tags.map(tag=><a key={tag} href={tagHref(tag)}><Tag size={12}/>{tag}</a>)}</div>
        <a className="read-story" href={storyHref({section,date,id:article.id})}>{t.examine}<ArrowRight size={15}/></a></div>
    </article>)}</div>
  {hits.length>limit&&<button className="more-results" onClick={()=>setLimit(n=>n+30)}>{locale==='it'?'Altri risultati':'More results'} <ArrowRight size={16}/></button>}
  {!loading&&progress.failed===0&&<div className="search-privacy"><Check size={16}/>{t.searchOffline}</div>}
 </main>;
}
