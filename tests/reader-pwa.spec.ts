import { expect, test } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const article='/article/world/2026-10-24/oleshky-humanitarian-ceasefire/';
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('og-language','it');localStorage.setItem('og-theme','light');});
});

test('full Markdown includes headings, summary, original image provenance and cited sources',async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text:string)=>{
    (window as unknown as {mdCopy:string}).mdCopy=text;
  }}});
 });
 await page.goto(article);
 const all=page.getByRole('group',{name:'Strumenti per Articolo completo'});
 await all.getByRole('button',{name:'Copia in Markdown: Articolo completo'}).click();
 const copied=await page.evaluate(()=>(window as unknown as {mdCopy:string}).mdCopy);
 expect(copied).toContain('# ');
 expect(copied).toContain('## Il riassunto');
 expect(copied).toContain('## La notizia, nel dettaglio');
 expect(copied).toContain('## Fonti e documenti');
 expect(copied).toContain('## Le domande e le constatazioni oggettive');
 expect(copied).toContain('](https://');
 expect(copied).toContain('![',);
});

test('single section copies only its Markdown without leaking the entire article',async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text:string)=>{
    (window as unknown as {mdCopy:string}).mdCopy=text;
  }}});
 });
 await page.goto(article);
 await page.getByRole('group',{name:'Strumenti per Il riassunto'}).getByRole('button',{name:'Copia in Markdown: Il riassunto'}).click();
 const copied=await page.evaluate(()=>(window as unknown as {mdCopy:string}).mdCopy);
 expect(copied).toMatch(/^## Il riassunto\n/);
 expect(copied).not.toContain('## Fonti e documenti');
 expect(copied).not.toContain('## La notizia, nel dettaglio');
 await page.getByRole('group',{name:'Strumenti per Fonti e documenti'}).getByRole('button',{name:'Copia in Markdown: Fonti e documenti'}).click();
 const sources=await page.evaluate(()=>(window as unknown as {mdCopy:string}).mdCopy);
 expect(sources).toContain('## Fonti e documenti');
 expect(sources).toContain('](https://');
});

test('Italian and English speech actions support play, pause, resume and stop',async({page})=>{
 await page.addInitScript(()=>{
  const win=window as unknown as {speakingTexts:string[]};
  win.speakingTexts=[];
  Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:class{
    text:string;lang='';rate=1;pitch=1;voice=null;
    constructor(text:string){this.text=text;}
  }});
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
   cancel(){},pause(){},resume(){},getVoices(){return [];},speak(utterance:{text:string}){win.speakingTexts.push(utterance.text);}
  }});
 });
 await page.goto(article);
 const control=page.getByRole('group',{name:'Strumenti per Il riassunto'});
 await control.getByRole('button',{name:'Ascolta: Il riassunto'}).click();
 await expect(control.getByRole('button',{name:'Pausa: Il riassunto'})).toBeVisible();
 expect((await page.evaluate(()=>(window as unknown as {speakingTexts:string[]}).speakingTexts)).join(' ')).toContain('riassunto');
 await control.getByRole('button',{name:'Pausa: Il riassunto'}).click();
 await expect(control.getByRole('button',{name:'Riprendi: Il riassunto'})).toBeVisible();
 await control.getByRole('button',{name:'Riprendi: Il riassunto'}).click();
 await control.getByRole('button',{name:'Interrompi: Il riassunto'}).click();
 await expect(control.getByRole('button',{name:'Ascolta: Il riassunto'})).toBeVisible();
 await page.getByRole('button',{name:'Read in English'}).click();
 const en=page.getByRole('group',{name:'Tools for The summary'});
 await expect(en.getByRole('button',{name:'Listen: The summary'})).toBeVisible();
});

test('hamburger displays v0.0.2 and opens bilingual changelog',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Menu di O'}).click();
 await expect(page.getByRole('menuitem',{name:/Note di rilascio/})).toContainText('v0.0.2');
 await page.getByRole('menuitem',{name:/Note di rilascio/}).click();
 await expect(page).toHaveURL(/\/releases\/$/);
 await expect(page.getByRole('heading',{name:/Le novità di O/})).toBeVisible();
 await expect(page.locator('.release-entry')).toHaveCount(2);
 await page.reload();
 await expect(page.locator('.release-entry')).toHaveCount(2);
 await page.getByRole('button',{name:'Read in English'}).click();
 await expect(page.getByRole('heading',{name:/What’s new in O/})).toBeVisible();
});

test('installation information is available without depending on native prompt',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Menu di O'}).click();
 await page.getByRole('menuitem',{name:/Installa O/}).click();
 await expect(page.locator('.install-help')).toBeVisible();
 await expect(page.locator('.install-help')).toContainText('Aggiungi alla schermata Home');
});

test('build has versioned PWA manifest, PNG install icons, updated service worker and release history entry',async()=>{
 const dir=resolve('dist');
 const manifest=JSON.parse(readFileSync(resolve(dir,'manifest.webmanifest'),'utf8'));
 expect(manifest.scope).toBe('/');
 expect(manifest.start_url).toBe('/');
 expect(manifest.display).toBe('standalone');
 expect(manifest.icons.some((item:{sizes:string})=>item.sizes==='192x192')).toBe(true);
 expect(manifest.icons.some((item:{sizes:string})=>item.sizes==='512x512')).toBe(true);
 expect(existsSync(resolve(dir,'icons/icon-192.png'))).toBe(true);
 expect(existsSync(resolve(dir,'icons/icon-512.png'))).toBe(true);
 expect(existsSync(resolve(dir,'icons/icon-180.png'))).toBe(true);
 const sw=readFileSync(resolve(dir,'sw.js'),'utf8');
 expect(sw).toContain('o-shell-0.0.2');
 expect(sw).toContain('skipWaiting');
 expect(sw).toContain('clients.claim');
 expect(readFileSync(resolve(dir,'version.json'),'utf8')).toContain('"version": "0.0.2"');
 expect(existsSync(resolve(dir,'releases/index.html'))).toBe(true);
});

test('the service worker and manifest are accessible from the GitHub Pages project scope',async({request})=>{
 const manifest=await request.get('/manifest.webmanifest');
 expect(manifest.ok()).toBe(true);
 expect((await manifest.json()).scope).toBe('/');
 const worker=await request.get('/sw.js');
 expect(worker.ok()).toBe(true);
 expect(await worker.text()).toContain('o-shell-0.0.2');
});

test('a real Chromium browser can install and activate the scoped service worker',async({browser})=>{
 const context=await browser.newContext({serviceWorkers:'allow'});
 try{
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  const scriptUrl=await page.evaluate(async()=>{
   const registration=await navigator.serviceWorker.ready;
   return registration.active?.scriptURL||'';
  });
  expect(scriptUrl).toMatch(/\/sw\.js$/);
 }finally{await context.close();}
});
