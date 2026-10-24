import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'src/frontend/dist');
const frontend=JSON.parse(await readFile(path.join(root,'src/frontend/package.json'),'utf8'));
const version=frontend.version;
const revision=process.env.GITHUB_SHA||version;
const base=(process.env.VITE_BASE_PATH||'/News/').replace(/\/?$/,'/');
const manifest={
 id:base,name:'O — Oggettivizzatore / Objectivizer',short_name:'O',description:'I fatti, senza pubblicità e senza titoli sensazionalistici.',
 start_url:base,scope:base,display:'standalone',display_override:['standalone','minimal-ui'],
 background_color:'#101317',theme_color:'#101317',
 icons:[
 {src:base+'icons/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},
 {src:base+'icons/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}
 ],
 shortcuts:[
 {name:'Mondo',short_name:'Mondo',url:base+'world/'},
 {name:'Italia',short_name:'Italia',url:base+'italy/'},
 {name:'Cerca',short_name:'Cerca',url:base+'search/'}
 ]
};
await writeFile(path.join(dist,'manifest.webmanifest'),JSON.stringify(manifest,null,2)+'\n');
await writeFile(path.join(dist,'version.json'),JSON.stringify({version,revision},null,2)+'\n');
const html=await readFile(path.join(dist,'index.html'),'utf8');
const assets=[...html.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g)].map(m=>m[1]);
const precache=[base,base+'index.html',base+'manifest.webmanifest',base+'favicon.svg',
 ...['180','192','512'].map(n=>base+'icons/icon-'+n+'.png'),
 ...['world','italy','technology','science'].map(s=>base+'fallback/'+s+'.svg'),
 ...assets];
const worker=`
/* O v${version} — generated service worker, revision ${revision}. */
const PREFIX='o-';
const SHELL='o-shell-${version}-${revision.slice(0,12)}';
const CONTENT='o-content-v1';
const BASE=${JSON.stringify(base)};
const PRECACHE=${JSON.stringify([...new Set(precache)])};
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(SHELL);
  await cache.addAll(PRECACHE);
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==SHELL&&key!==CONTENT).map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||!url.pathname.startsWith(BASE))return;
 if(url.pathname===BASE+'sw.js'||url.pathname===BASE+'version.json')return;
 const nav=req.mode==='navigate';
 const hashed=url.pathname.includes('/assets/');
 const content=url.pathname.includes('/news/')||nav;
 event.respondWith((async()=>{
  const cache=await caches.open(content?CONTENT:SHELL);
  if(hashed){
   const cached=await caches.match(req);
   if(cached)return cached;
  }
  try{
   const response=await fetch(req);
   if(response.ok&&response.type!=='opaque')await cache.put(req,response.clone());
   return response;
  }catch{
   const cached=await caches.match(req);
   if(cached)return cached;
   if(nav){
    const shell=await caches.match(BASE+'index.html');
    if(shell)return shell;
   }
   return new Response('Offline',{status:503,statusText:'Offline'});
  }
 })());
});
`;
await writeFile(path.join(dist,'sw.js'),worker);
console.log('Generated PWA '+version+' (build '+revision.slice(0,12)+'), manifest, and service worker with '+precache.length+' precache URLs.');
