import { readFile, readdir, cp, mkdir, rm, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const news=path.join(root,'news'),output=path.join(root,'src/frontend/public/news');
const checkOnly=process.argv.includes('--check');
const sections=['world','italy','technology','science'];
const quotas={world:10,italy:5,technology:5,science:5};
const fail=message=>{throw new Error('NEWS VALIDATION: '+message);};
const requireText=(val,where)=>{if(typeof val!=='string'||val.trim().length<2)fail(where+' is required');};
const https=(val,where)=>{if(typeof val!=='string'||!val.startsWith('https://'))fail(where+' must be HTTPS');};
const dates=(await readdir(news,{withFileTypes:true})).filter(x=>x.isDirectory()&&/^\d{4}-\d{2}-\d{2}$/.test(x.name)&&!Number.isNaN(Date.parse(x.name+'T00:00:00Z'))).map(x=>x.name).sort().reverse();
if(!dates.length)fail('At least one edition is required');
const availability=Object.fromEntries(sections.map(s=>[s,[]]));
const storiesByLocale={it:[],en:[]},all=new Map(),localized=new Map();
const articleKey=(d,s,id)=>[d,s,id].join('/');
async function available(day,section,lang){
  const relative=section==='world'?day+'/'+lang+'.json':day+'/'+section+'/'+lang+'.json';
  try{await access(path.join(news,relative));return true;}catch{return false;}
}
for(const day of dates) {
 for(const section of sections) {
  const isItalian=await available(day,section,'it'),isEnglish=await available(day,section,'en');
  if(isItalian!==isEnglish)fail(day+'/'+section+' requires both language editions');
  if(!isItalian)continue;
  availability[section].push(day);
  const editions=[];
  for(const language of ['it','en']){
   const filename=section==='world'?path.join(news,day,language+'.json'):path.join(news,day,section,language+'.json');
   const edition=JSON.parse(await readFile(filename,'utf8'));
   if(edition.date!==day||edition.language!==language||!Array.isArray(edition.articles)||edition.articles.length!==quotas[section])fail(day+'/'+section+'/'+language+' must contain '+quotas[section]+' stories');
   if(edition.section && edition.section!==section)fail(filename+' section mismatch');
   requireText(edition.editorialNote,filename+' editorialNote');
   if(Number.isNaN(Date.parse(edition.publishedAt)))fail(filename+' invalid publishedAt');
   const ids=new Set(),ranks=new Set();
   for(const a of edition.articles) {
    const where=day+'/'+section+'/'+language+'/'+a.id;
    if(!/^[a-z0-9-]+$/.test(a.id)||ids.has(a.id))fail(where+' invalid or duplicate ID');
    ids.add(a.id);
    if(!Number.isInteger(a.rank)||a.rank<1||a.rank>quotas[section]||ranks.has(a.rank))fail(where+' invalid rank');
    ranks.add(a.rank);
    for(const k of ['title','dek','summary'])requireText(a[k],where+' '+k);
    if(!['world','politics','economy','technology','climate','society'].includes(a.category))fail(where+' invalid category');
    for(const k of ['facts','perspectives','unknowns']){
      if(!Array.isArray(a[k])||!a[k].length)fail(where+' '+k+' missing');
      a[k].forEach(v=>requireText(v,where+' '+k));
    }
    if(a.body && (!Array.isArray(a.body)||!a.body.length))fail(where+' body must be nonempty paragraphs');
    a.body?.forEach(v=>requireText(v,where+' body paragraph'));
    if(a.questions){
      if(!Array.isArray(a.questions)||!a.questions.length)fail(where+' questions must be nonempty');
      for(const q of a.questions){requireText(q.question,where+' question');requireText(q.answer,where+' answer');}
    }
    if(a.threadId && !/^[a-z0-9-]+$/.test(a.threadId))fail(where+' invalid threadId');
    if(a.threadRecap)requireText(a.threadRecap,where+' threadRecap');
    if(a.related && !Array.isArray(a.related))fail(where+' related must be an array');
    if(!Array.isArray(a.sources)||a.sources.length<2)fail(where+' needs at least two independent sources');
    const outlets=new Set();
    for(const src of a.sources){
      requireText(src.outlet,where+' outlet');requireText(src.title,where+' source title');
      https(src.url,where+' source');outlets.add(src.outlet.toLowerCase());
      if(Number.isNaN(Date.parse(src.publishedAt)))fail(where+' invalid source date');
      if(!['reporting','official','analysis'].includes(src.role))fail(where+' invalid source role');
    }
    if(outlets.size<2)fail(where+' needs sources from distinct publishers');
    if(!a.image)fail(where+' missing cover image');
    for(const k of ['src','alt','credit','license'])requireText(a.image[k],where+' image '+k);
    https(a.image.sourceUrl,where+' image provenance');
    if(!['photo','illustration'].includes(a.image.kind))fail(where+' invalid image kind');
    for(const image of [a.image.src,a.image.fallbackSrc].filter(Boolean)){
      if(image.startsWith('https://'))continue;
      if(image.startsWith('/')||image.includes('..')||!image.startsWith('news/'))fail(where+' unsafe image path');
      try{await access(path.join(news,image.slice(5)));}catch{fail(where+' image file not found: '+image);}
    }
    const key=articleKey(day,section,a.id);
    if(language==='it')all.set(key,a);
    const preview={date:day,section,id:a.id,title:a.title,dek:a.dek,summary:a.summary,category:a.category};
    if(a.threadId)preview.threadId=a.threadId;
    if(a.threadRecap)preview.threadRecap=a.threadRecap;\n    if(a.related)preview.related=a.related;
    storiesByLocale[language].push(preview);
   }
   editions.push(edition);
   localized.set(day+'/'+section+'/'+language,edition);
  }
  const shape=e=>e.articles.map(a=>[a.id,a.rank,a.category,a.threadId||'',JSON.stringify(a.related||[])].join(':')).join('|');
  if(shape(editions[0])!==shape(editions[1]))fail(day+'/'+section+' localized order, thread or related links mismatch');
 }
}
if(!availability.world.length)fail('At least one world edition required');
for(const [key,a] of all){
 for(const related of a.related||[]){
   if(!related||!dates.includes(related.date)||!sections.includes(related.section)||!all.has(articleKey(related.date,related.section,related.id)))fail(key+' references a missing related article');
   if(articleKey(related.date,related.section,related.id)===key)fail(key+' references itself');
 }
}
const index={version:2,dates:[...new Set(Object.values(availability).flat())].sort().reverse(),sections:availability};
if(!checkOnly){
 await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
 for(const day of dates)await cp(path.join(news,day),path.join(output,day),{recursive:true});
 await writeFile(path.join(output,'index.json'),JSON.stringify(index,null,2)+'\n');
 await mkdir(path.join(output,'story-index'),{recursive:true});
 for(const language of ['it','en'])
   await writeFile(path.join(output,'story-index',language+'.json'),JSON.stringify({version:1,language,stories:storiesByLocale[language]},null,2)+'\n');
}
console.log('Validated '+availability.world.length+' World editions, '+sections.slice(1).map(s=>s+'='+availability[s].length).join(', ')+'; '+all.size+' unique articles in two languages.'+(checkOnly?' Check only.':' Compiled static archive and bidirectional story metadata.'));
