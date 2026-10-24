import { useCallback, useEffect, useRef, useState } from 'react';
import type { Edition, Locale, NewsIndex, Section, StoryIndex } from './types';
const BASE = import.meta.env.BASE_URL;
export async function getJSON<T>(path: string): Promise<T> {
  const response = await fetch(BASE + path);
  if (!response.ok) throw new Error('HTTP '+response.status+': '+path);
  return response.json() as Promise<T>;
}
export function mediaUrl(src: string) {
  if (/^https?:\/\//i.test(src)) return src;
  return BASE + src.replace(/^\//,'');
}
export function editionUrl(date:string,section:Section,locale:Locale) {
  // Legacy editions from before the four-section schema remain readable as World.
  return section==='world' ? `news/${date}/${locale}.json` : `news/${date}/${section}/${locale}.json`;
}
export function useStoryIndex(locale:Locale) {
  const [index,setIndex]=useState<StoryIndex|null>(null);
  useEffect(()=>{
    let live=true;
    setIndex(null);
    getJSON<StoryIndex>(`news/story-index/${locale}.json`).then(data=>{if(live)setIndex(data);}).catch(console.error);
    return()=>{live=false;};
  },[locale]);
  return index;
}
export function useArchive(locale: Locale, section: Section) {
  const [dates, setDates] = useState<string[]>([]);
  const [editions, setEditions] = useState<Record<string, Edition>>({});
  const [visible, setVisible] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const requested = useRef(new Set<string>());
  const generation = useRef(0);
  useEffect(() => {
    let alive=true;
    const current=++generation.current;
    requested.current.clear();setDates([]);setEditions({});setVisible(1);setError(false);setLoading(true);
    getJSON<NewsIndex>('news/index.json').then(async index=>{
      if (!alive) return;
      const ordered=(index.sections?.[section] || (section==='world'?index.dates:[]) || []).slice().sort((a,b)=>b.localeCompare(a));
      setDates(ordered);
      await Promise.all(ordered.slice(0,7).map(async date=>{
        requested.current.add(date);
        try {
          const edition=await getJSON<Edition>(editionUrl(date,section,locale));
          if (alive&&generation.current===current) setEditions(old=>({...old,[date]:edition}));
        } catch(reason) {console.error('Failed edition',date,reason);if(alive)setError(true);}
      }));
      if (alive&&generation.current===current)setLoading(false);
    }).catch(()=>{if(alive){setLoading(false);setError(true);}});
    return()=>{alive=false;};
  },[locale,section]);
  useEffect(()=>{
    const date=dates[visible+6];
    if (!date || requested.current.has(date))return;
    requested.current.add(date);
    const current=generation.current;
    getJSON<Edition>(editionUrl(date,section,locale)).then(data=>{
      if(current===generation.current)setEditions(old=>({...old,[date]:data}));
    }).catch(()=>{if(current===generation.current)setError(true);});
  },[dates,visible,locale,section]);
  const showNext=useCallback(()=>setVisible(old=>Math.min(dates.length,old+1)),[dates.length]);
  const active=dates.slice(0,visible).map(date=>editions[date]).filter((x):x is Edition=>Boolean(x));
  return {active,dates,visible,loading,error,showNext,nextReady:!dates[visible]||Boolean(editions[dates[visible]]),hasMore:visible<dates.length};
}
