import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {questionQualityIssues} from './editorial-questions.mjs';
export const DESKS={world:10,italy:5,technology:5,science:5};
export const CATEGORIES=['world','politics','economy','technology','climate','society'];
const GROUPS=[
 [['reuters.com','reutersconnect.com','thomsonreuters.com'],'reuters'],
 [['apnews.com','ap.org'],'ap'],
 [['theguardian.com'],'guardian'],
 [['bbc.com','bbc.co.uk'],'bbc'],
 [['ansa.it'],'ansa'],[['rainews.it'],'rai'],
 [['repubblica.it','lastampa.it'],'gedi'],
 [['euronews.com'],'euronews'],[['corriere.it'],'rscorriere'],
 [['nature.com','scientificamerican.com'],'springernature']
];
export function romeDate(d=new Date()){
 return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);
}
export function safeUrl(raw){
 try {
  const u=new URL(raw);
  if(u.protocol!=='https:'||u.username||u.password||(u.port&&u.port!=='443'))return null;
  const h=u.hostname.toLowerCase();
  if(h==='localhost'||h.endsWith('.local')||h.endsWith('.internal')||/^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.|\[)/.test(h))return null;
  u.hash='';return u;
 }catch{return null;}
}
export function canonical(raw){
 const u=safeUrl(raw);if(!u)return '';
 return u.hostname.replace(/^www\./,'').toLowerCase()+decodeURIComponent(u.pathname).replace(/\/$/,'').toLowerCase();
}
export function publisherKey(source){
 const u=safeUrl(source.url);if(!u)return null;
 const host=u.hostname.replace(/^www\./,'').toLowerCase();
 for(const [domains,group] of GROUPS)if(domains.some(d=>host===d||host.endsWith('.'+d)))return group;
 const parts=host.split('.');const suffix=parts.slice(-2).join('.');
 if(['co.jp','co.uk','org.uk','com.au','com.br','com.cn','com.tr','com.ar','co.nz'].includes(suffix))return parts.slice(-3).join('.');
 return parts.slice(Math.max(0,parts.length-2)).join('.');
}
export function validateSources(sources,observedUrls=[],earliest,latest){
 if(!Array.isArray(sources))return {ok:false,reasons:['not an array'],sources:[]};
 const seen=new Set(),owners=new Set(),out=[];
 for(const x of sources){
  if(!x||!['reporting','official','analysis'].includes(x.role)||!x.outlet||!x.title||!safeUrl(x.url)||!/^20\d\d-\d\d-\d\d/.test(x.publishedAt||''))continue;
  const t=Date.parse(x.publishedAt);if(!Number.isFinite(t)||t<earliest||t>latest)continue;
  const key=canonical(x.url);if(!key||seen.has(key))continue;
  if(observedUrls.length&&!observedUrls.some(url=>canonical(url)===key))continue;
  const owner=publisherKey(x);if(!owner)continue;
  seen.add(key);if(x.role==='reporting')owners.add(owner);out.push({...x,url:safeUrl(x.url).href});
 }
 const reasons=owners.size<2?['fewer than two independently owned reporting sources observed during web search']:[];
 return {ok:reasons.length===0,reasons,sources:out,publishers:[...owners]};
}
export function fullArticleCheck(a,lang){
 const bad=[],text=x=>typeof x==='string'&&x.trim().length>15;
 for(const key of ['title','dek','summary','impactReason'])if(!text(a?.[key]))bad.push(key);
 if(!CATEGORIES.includes(a?.category))bad.push('category');
 if(!Array.isArray(a?.tags)||a.tags.length!==3||a.tags.some(x=>!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9-]{2,30}$/.test(x)))bad.push('three tags');
 if(!Array.isArray(a?.body)||a.body.length<4||a.body.some(p=>typeof p!=='string'||p.trim().split(/\s+/).length<45))bad.push('four substantive paragraphs');
 for(const key of ['facts','perspectives','unknowns'])if(!Array.isArray(a?.[key])||!a[key].length||a[key].some(v=>!text(v)))bad.push(key);
 if(!Array.isArray(a?.questions)||!a.questions.length||a.questions.some(q=>!text(q?.question)||!text(q?.answer)))bad.push('Q&A');
 if(Array.isArray(a?.questions))bad.push(...questionQualityIssues(a).map(x=>'editorial Q&A '+x));
 if(typeof a?.impact!=='number'||a.impact<0.5||a.impact>5||!Number.isInteger(a.impact*2))bad.push('impact');
 if(lang==='it'&&/\b(star|stelle)\b/i.test(a?.impactReason||''))bad.push('stars forbidden');
 return bad;
}
export function validatePair(pair,sources,id,rank){
 const errors=[];
 for(const lang of ['it','en'])errors.push(...fullArticleCheck(pair?.[lang],lang).map(x=>lang+':'+x));
 const a=pair?.it,b=pair?.en;
 if(a&&b){
  if(a.category!==b.category||a.impact!==b.impact)errors.push('localized metadata mismatch');
  for(const key of ['facts','perspectives','unknowns','questions','body'])if(a[key]?.length!==b[key]?.length)errors.push('localized '+key+' count mismatch');
 }
 if(!/^[a-z0-9-]{6,100}$/.test(id)||!Number.isInteger(rank)||rank<1)errors.push('id/rank');
 if(!sources||sources.length<2)errors.push('source count');
 return errors;
}
export async function archivedNews(root,days=21){
 const dates=(await readdir(root,{withFileTypes:true})).filter(e=>e.isDirectory()&&/^\d{4}-\d{2}-\d{2}$/.test(e.name)).map(e=>e.name).sort().reverse().slice(0,days);
 const all=[];
 for(const day of dates)for(const desk of Object.keys(DESKS)){
  try{
   const f=path.join(root,day,desk==='world'?'it.json':desk+'/it.json');
   const {articles}=JSON.parse(await readFile(f,'utf8'));
   for(const a of articles)all.push({day,desk,id:a.id,title:a.title,urls:(a.sources||[]).map(s=>canonical(s.url)),threadId:a.threadId||null});
  }catch(e){if(e.code!=='ENOENT')throw e;}
 }
 return all;
}
export function duplicate(candidate,history,chosen){
 const words=s=>new Set(String(s||'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').split(' ').filter(w=>w.length>4));
 for(const prior of [...history,...chosen]){
  if(prior.id===candidate.id)return true;
  if((candidate.sources||[]).some(s=>prior.urls?.includes(canonical(s.url))))return true;
  const a=words(candidate.title),b=words(prior.title),n=[...a].filter(w=>b.has(w)).length;
  if(n>=5&&n/Math.max(1,Math.min(a.size,b.size))>=.75)return true;
 }
 return false;
}
export function assembleEdition(date,desk,locale,articles){
 if(articles.length!==DESKS[desk])throw new Error(desk+': need '+DESKS[desk]+' validated articles, have '+articles.length);
 return {
  date,language:locale,...(desk==='world'?{}:{section:desk}),
  publishedAt:new Date().toISOString(),
  editorialNote:locale==='it'?'Edizione automatizzata del '+date+': cronologia e fonti attribuite, novità e sviluppi precedenti datati con precisione.':'Automated edition dated '+date+': attributed sources, correctly dated current and earlier developments.',
  articles
 };
}
