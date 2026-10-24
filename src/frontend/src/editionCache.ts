import type { Edition, Locale, Section } from './types';

/**
 * One cache shared by the newspaper, article reader and search.
 * An edition is already the full set of articles, not merely preview cards.
 */
const DATABASE='o-local-edition-index', STORE='editions';
type StoredEdition={key:string;revision:string;data:Edition};
const memory=new Map<string,StoredEdition>();
const fetching=new Map<string,Promise<Edition>>();
let connection:Promise<IDBDatabase|null>|undefined;

function openDB():Promise<IDBDatabase|null>{
  if(typeof indexedDB==='undefined')return Promise.resolve(null);
  if(!connection)connection=new Promise(resolve=>{
    try {
      const request=indexedDB.open(DATABASE,1);
      request.onupgradeneeded=()=>{
        if(!request.result.objectStoreNames.contains(STORE))
          request.result.createObjectStore(STORE,{keyPath:'key'});
      };
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>resolve(null);
      request.onblocked=()=>resolve(null);
    }catch{resolve(null);}
  });
  return connection;
}
export function editionCacheKey(date:string,section:Section,locale:Locale){
  return locale+'/'+section+'/'+date;
}
export function warmEdition(date:string,section:Section,locale:Locale):Edition|null{
  return memory.get(editionCacheKey(date,section,locale))?.data??null;
}
async function stored(key:string):Promise<StoredEdition|null>{
  const warm=memory.get(key);
  if(warm)return warm;
  const database=await openDB();
  if(!database)return null;
  return new Promise(resolve=>{
    try{
      const req=database.transaction(STORE,'readonly').objectStore(STORE).get(key);
      req.onsuccess=()=>{
        const row=req.result as StoredEdition|undefined;
        if(row)memory.set(key,row);
        resolve(row||null);
      };
      req.onerror=()=>resolve(null);
    }catch{resolve(null);}
  });
}
async function persist(row:StoredEdition):Promise<void>{
  memory.set(row.key,row); // Immediately available to article clicks.
  const database=await openDB();
  if(!database)return;
  await new Promise<void>(resolve=>{
    try{
      const tx=database.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(row);
      tx.oncomplete=()=>resolve();tx.onerror=()=>resolve();tx.onabort=()=>resolve();
    }catch{resolve();}
  });
}
function path(date:string,section:Section,locale:Locale){
  return 'news/'+date+'/'+(section==='world'?'':section+'/')+locale+'.json';
}
export async function loadEdition(date:string,section:Section,locale:Locale,revision:string):
 Promise<{edition:Edition;cached:boolean}>{
  const key=editionCacheKey(date,section,locale);
  const cached=await stored(key);
  if(cached?.revision===revision)return {edition:cached.data,cached:true};
  const requestKey=key+'@'+revision;
  let pending=fetching.get(requestKey);
  if(!pending){
    pending=(async()=>{
      const response=await fetch(import.meta.env.BASE_URL+path(date,section,locale));
      if(!response.ok)throw new Error('HTTP '+response.status+': '+path(date,section,locale));
      const edition=await response.json() as Edition;
      await persist({key,revision,data:edition});
      return edition;
    })();
    fetching.set(requestKey,pending);
    void pending.finally(()=>fetching.delete(requestKey)).catch(()=>{});
  }
  try{return {edition:await pending,cached:false};}
  catch(err){
    // Offline fallback for previously visited stories even across deployments.
    if(cached)return {edition:cached.data,cached:true};
    throw err;
  }
}
/** Preload into memory + IndexedDB during cover rendering, not at article click. */
export async function prefetchEdition(date:string,section:Section,locale:Locale,revision:string):Promise<void>{
  await loadEdition(date,section,locale,revision);
}
