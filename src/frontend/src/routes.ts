import { sections } from './types';
import type { Section, StoryRef } from './types';

/** Canonical routes for the static GitHub Pages project site. */
export const APP_BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL : import.meta.env.BASE_URL+'/';

export type Route =
  | { kind:'section'; section:Section }
  | { kind:'search'; tag:string }
  | { kind:'releases' }
  | { kind:'article'; section:Section; date:string; id:string };

export function sectionHref(section:Section) { return APP_BASE+section+'/'; }
export function searchHref(tag?:string) { return APP_BASE+'search/'+(tag?'tag/'+encodeURIComponent(tag)+'/':''); }
export function articleHref(ref:StoryRef) {
  return APP_BASE+'article/'+ref.section+'/'+ref.date+'/'+encodeURIComponent(ref.id)+'/';
}
export function releasesHref(){return APP_BASE+'releases/';}
export function currentPath() { return window.location.pathname+window.location.search; }

export function routeFromPath(pathname:string=window.location.pathname):Route {
  if (!pathname.startsWith(APP_BASE)) return {kind:'section',section:'world'};
  const parts=pathname.slice(APP_BASE.length).split('/').filter(Boolean);
  const section=sections.find(s=>s===parts[0]);
  if (section && parts.length===1) return {kind:'section',section};
  if(parts[0]==='releases'&&parts.length===1)return {kind:'releases'};
  if (parts[0]==='search') return {
    kind:'search',
    tag:parts.length===3 && parts[1]==='tag' ? safeDecode(parts[2]) : ''
  };
  if (parts[0]==='article' && parts.length===4
    && sections.includes(parts[1] as Section)
    && /^\d{4}-\d{2}-\d{2}$/.test(parts[2])
    && /^[a-z0-9-]+$/.test(parts[3])) {
      return {kind:'article',section:parts[1] as Section,date:parts[2],id:parts[3]};
  }
  return {kind:'section',section:'world'};
}
function safeDecode(encoded:string) {
  try { return decodeURIComponent(encoded); } catch { return ''; }
}
export function isAppRoute(pathname:string) {
  if (!pathname.startsWith(APP_BASE)) return false;
  const relative=pathname.slice(APP_BASE.length);
  return relative==='' || relative==='index.html' || relative==='releases' || relative==='releases/'
    || sections.some(s=>relative===s || relative===s+'/')
    || /^article\/(world|italy|technology|science)\/\d{4}-\d{2}-\d{2}\/[a-z0-9-]+\/?$/.test(relative)
    || relative==='search' || relative==='search/' || relative.startsWith('search/tag/');
}
/** Preserve links published with the old hash router, without a page refresh. */
export function normalizeLegacyRoute() {
  const legacyPath=window.location.pathname.startsWith('/News/')
    ? window.location.pathname.slice('/News/'.length) : null;
  const hashRoute=window.location.hash.startsWith('#/')
    ? window.location.hash.slice(2) : null;
  if(legacyPath!==null || hashRoute!==null){
    const suffix=(hashRoute??legacyPath??'').split('/').filter(Boolean).join('/');
    const canonical=APP_BASE+suffix+(suffix?'/':'');
    if(isAppRoute(new URL(canonical,window.location.origin).pathname)){
      history.replaceState(history.state,'',canonical+window.location.search);
    }
  } else if(window.location.pathname===APP_BASE.slice(0,-1)&&APP_BASE!=='/'){
    history.replaceState(history.state,'',APP_BASE+window.location.search);
  }
}
