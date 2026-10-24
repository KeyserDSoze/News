import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(repo,'src/frontend/dist');
const news=path.join(repo,'news');
const base=(process.env.VITE_BASE_PATH||'/News/').replace(/\/?$/,'/');
const origin=(process.env.PUBLIC_SITE_ORIGIN||'https://keyserdsoze.github.io').replace(/\/$/,'');
const html=await readFile(path.join(dist,'index.html'),'utf8');
const sections=['world','italy','technology','science'];
const escapeHtml=(value)=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeSegment=(value)=>/^[a-z0-9-]+$/.test(value);
const absolute=(pathPart)=>origin+base+pathPart;

async function page(subpath,rendered){
  const folder=path.join(dist,subpath);
  await mkdir(folder,{recursive:true});
  await writeFile(path.join(folder,'index.html'),rendered);
}
function withMetadata(title,description,relativeUrl,imageRelative,type='website'){
  const safeTitle=escapeHtml(title);
  const safeDesc=escapeHtml(description);
  const fullUrl=absolute(relativeUrl);
  const imageUrl=absolute(imageRelative);
  const rendered=html.replace(/<title>[\s\S]*?<\/title>/,'<title>'+safeTitle+'</title>')
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/,'$1'+safeDesc+'$2');
  const meta=`
    <link rel="canonical" href="${escapeHtml(fullUrl)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="O — Oggettivizzatore / Objectivizer" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${escapeHtml(fullUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:locale:alternate" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  `;
  return rendered.replace('</head>',meta+'\n  </head>');
}
let count=0;
const tagSet=new Set();
const folders=(await readdir(news,{withFileTypes:true}))
  .filter(d=>d.isDirectory()&&/^\d{4}-\d{2}-\d{2}$/.test(d.name))
  .map(d=>d.name);
for(const day of folders)for(const section of sections){
  const source=path.join(news,day,...(section==='world'?[]:[section]),'it.json');
  let issue;
  try{issue=JSON.parse(await readFile(source,'utf8'));}catch(e){
    if(e?.code==='ENOENT')continue;
    throw e;
  }
  for(const article of issue.articles){
    if(!safeSegment(article.id))throw new Error('Unsafe article ID: '+article.id);
    const destination=`article/${section}/${day}/${article.id}/`;
    const cover=(article.image.src?.startsWith('news/'))?article.image.src:`fallback/${section}.svg`;
    await page(destination,withMetadata(article.title+' — O',article.summary,destination,cover,'article'));
    count++;
    for(const tag of article.tags)tagSet.add(tag);
  }
  const english=path.join(news,day,...(section==='world'?[]:[section]),'en.json');
  const translated=JSON.parse(await readFile(english,'utf8'));
  for(const article of translated.articles)for(const tag of article.tags)tagSet.add(tag);
}
for(const section of sections){
  await page(section+'/',withMetadata(section[0].toUpperCase()+section.slice(1)+' — O',
    'Oggettivizzatore — zero pubblicità e zero sensazionalismi.',
    section+'/',`fallback/${section}.svg`));
}
await page('releases/',withMetadata('Note di rilascio — O','Cronologia delle versioni di O.',
  'releases/','favicon.svg'));
await page('search/',withMetadata('Ricerca — O','Cerca negli articoli di O, per parole, argomenti e data.',
  'search/','fallback/world.svg'));
for(const tag of tagSet){
  await page('search/tag/'+encodeURIComponent(tag)+'/',withMetadata('O — #'+tag,
    'Le notizie di O sul tema '+tag,'search/tag/'+encodeURIComponent(tag)+'/',
    'fallback/world.svg'));
}
// GitHub Pages does not rewrite unknown routes to index.html.
// A copy of the compiled shell handles non-prerendered future paths without a server.
await copyFile(path.join(dist,'index.html'),path.join(dist,'404.html'));
console.log('Generated '+count+' shareable article URLs, '+tagSet.size+' tag routes, four desks, search and Pages fallback.');
