/** Latest archive fixtures: prevent daily releases from breaking date-specific E2E tests. */
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
const root=[resolve(process.cwd(),'news'),resolve(process.cwd(),'../../news'),resolve(process.cwd(),'../news')].find(existsSync);
if(!root)throw new Error('News repository folder was not found for archive fixtures');
const dates=readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory()&&/^\d{4}-\d{2}-\d{2}$/.test(x.name)).map(x=>x.name).sort().reverse();
function read(day:string,desk:string){return JSON.parse(readFileSync(join(root,day,desk==='world'?'it.json':desk+'/it.json'),'utf8'));}
export const COVER_DATE=dates[0];
export const PREVIOUS_DATE=dates[1];
export const COVER_WORLD=read(COVER_DATE,'world').articles[0] as {id:string;sources:{url:string}[]};
export const TOTAL_STORIES=dates.reduce((sum,day)=>sum+['world','italy','technology','science'].reduce((n,desk)=>{try{return n+read(day,desk).articles.length;}catch(e:any){if(e.code==='ENOENT')return n;throw e;}},0),0);
export const TOTAL_EDITION_FILES=dates.reduce((sum,day)=>sum+['world','italy','technology','science'].reduce((n,desk)=>{try{read(day,desk);return n+1;}catch(e:any){if(e.code==='ENOENT')return n;throw e;}},0),0);
