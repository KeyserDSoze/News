import { readFile, readdir, cp, mkdir, rm, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root,'news');
const target = path.join(root,'src/frontend/public/news');
const checkOnly = process.argv.includes('--check');
const fail = message => { throw new Error('NEWS VALIDATION: ' + message); };
const isDate = text => /^\d{4}-\d{2}-\d{2}$/.test(text) && !Number.isNaN(Date.parse(text+'T00:00:00Z'));
const requireText = (value,where) => { if(typeof value !== 'string' || value.trim().length < 2) fail(where+' missing'); };
const checkHttp = (value,where) => { if(typeof value !== 'string' || !/^https:\/\//.test(value)) fail(where+' must be an HTTPS URL'); };
const folders = (await readdir(source,{withFileTypes:true})).filter(x=>x.isDirectory()&&isDate(x.name)).map(x=>x.name).sort().reverse();
if(!folders.length) fail('At least one dated edition required');
for(const day of folders) {
  const editions=[];
  for(const language of ['it','en']) {
    const p = path.join(source,day,language+'.json');
    const json = JSON.parse(await readFile(p,'utf8'));
    if(json.date!==day || json.language!==language || !Array.isArray(json.articles) || json.articles.length!==10) fail(day+'/'+language+' must contain exactly 10 localized stories');
    requireText(json.editorialNote,day+' editorialNote');
    if(Number.isNaN(Date.parse(json.publishedAt))) fail(day+' publishedAt invalid');
    const ids = new Set();
    const ranks = new Set();
    for(const story of json.articles) {
      const where=day+'/'+language+'/'+story.id;
      if(!/^[a-z0-9-]+$/.test(story.id)) fail(where+' invalid ID');
      if(ids.has(story.id) || ranks.has(story.rank) || story.rank<1 || story.rank>10) fail(where+' duplicate or out-of-range rank/ID');
      ids.add(story.id);ranks.add(story.rank);
      for(const name of ['title','dek','summary']) requireText(story[name],where+' '+name);
      for(const name of ['facts','perspectives','unknowns']) {
        if(!Array.isArray(story[name]) || story[name].length===0) fail(where+' '+name+' must be a nonempty array');
        story[name].forEach(text=>requireText(text,where+' '+name));
      }
      if(!['world','politics','economy','technology','climate','society'].includes(story.category)) fail(where+' invalid category');
      if(!Array.isArray(story.sources)||story.sources.length<2) fail(where+' needs >=2 sources');
      const outlets=new Set();
      for(const s of story.sources) {
        requireText(s.outlet,where+' outlet');requireText(s.title,where+' source title');
        checkHttp(s.url,where+' source');outlets.add(s.outlet.toLowerCase());
        if(Number.isNaN(Date.parse(s.publishedAt))) fail(where+' invalid source date');
        if(!['reporting','official','analysis'].includes(s.role)) fail(where+' invalid source role');
      }
      if(outlets.size<2) fail(where+' needs >=2 distinct newsrooms / source owners');
      const im=story.image;
      if(!im) fail(where+' missing cover image');
      for(const name of ['src','alt','credit','license']) requireText(im[name],where+' image '+name);
      checkHttp(im.sourceUrl,where+' image.sourceUrl');
      if(!['photo','illustration'].includes(im.kind)) fail(where+' invalid image kind');
      if(!/^https:\/\//.test(im.src)) {
        if(im.src.includes('..')||im.src.startsWith('/')) fail(where+' image src must be safe relative path');
        try { await access(path.join(source,im.src.replace(/^news\//,''))); } catch { fail(where+' missing image file: '+im.src); }
      }
    }
    editions.push(json);
  }
  const idsIt=editions[0].articles.map(a=>a.id+'|'+a.rank+'|'+a.category).join(',');
  const idsEn=editions[1].articles.map(a=>a.id+'|'+a.rank+'|'+a.category).join(',');
  if(idsIt!==idsEn) fail(day+' localized articles must have matching order/rank/category');
}
if(!checkOnly) {
  await rm(target,{recursive:true,force:true});
  await mkdir(target,{recursive:true});
  for(const day of folders) await cp(path.join(source,day),path.join(target,day),{recursive:true});
  await writeFile(path.join(target,'index.json'),JSON.stringify({version:1,dates:folders},null,2)+'\n');
}
console.log('Validated '+folders.length+' editions, '+folders.length*10+' stories, two languages. '+(checkOnly?'Check only.':'Generated static archive.'));
