import { readFileSync } from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname||new URL('.',import.meta.url).pathname,'..');
const read=(f)=>JSON.parse(readFileSync(path.join(root,f),'utf8'));
const frontend=read('src/frontend/package.json'),workspace=read('package.json');
const releases=read('src/frontend/src/releases.json').releases;
const changelog=readFileSync(path.join(root,'CHANGELOG.md'),'utf8');
const semver=/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
if(!semver.test(frontend.version)||frontend.version!==workspace.version)throw Error('Workspace and frontend versions must match SemVer.');
if(!Array.isArray(releases)||!releases.length||releases[0].version!==frontend.version)throw Error('Top release record must match app version.');
const seen=new Set();
for(const release of releases){
 if(!semver.test(release.version)||seen.has(release.version))throw Error('Invalid/duplicate release: '+release.version);
 seen.add(release.version);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(release.date))throw Error('Invalid date');
 if(!changelog.includes('## ['+release.version+']'))throw Error('Missing CHANGELOG notes for '+release.version);
 for(const lang of ['it','en']){
  const notes=release[lang];
  if(!notes?.title||!notes.details||!Array.isArray(notes.highlights)||!notes.highlights.length)throw Error('Missing '+lang+' notes for '+release.version);
 }
}
console.log('Verified O app version v'+frontend.version+' with '+releases.length+' bilingual changelog entries.');
