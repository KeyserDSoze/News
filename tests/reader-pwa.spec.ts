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

test('summary and context no longer have repeated Markdown or speech controls',async({page})=>{
 await page.goto(article);
 await expect(page.getByRole('group',{name:'Strumenti per Il riassunto'})).toHaveCount(0);
 await expect(page.getByRole('group',{name:'Strumenti per Fatti verificabili'})).toHaveCount(0);
 await expect(page.getByRole('group',{name:'Strumenti per Fonti e documenti'})).toHaveCount(0);
 await expect(page.getByRole('group',{name:'Strumenti per Articolo completo'})).toHaveCount(1);
 const body=page.getByRole('group',{name:'Strumenti per La notizia, nel dettaglio'});
 await expect(body.getByRole('button',{name:'Ascolta: La notizia, nel dettaglio'})).toBeVisible();
 await expect(body.getByRole('button',{name:/Markdown/})).toHaveCount(0);
});

test('speech follows the selected language and supports full or body-only playback',async({page})=>{
 await page.addInitScript(()=>{
  const win=window as unknown as {spokenLanguages:string[];speakingTexts:string[]};
  win.spokenLanguages=[];win.speakingTexts=[];
  Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:class {
   text:string;lang='';rate=1;pitch=1;voice=null;
   constructor(text:string){this.text=text;}
  }});
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
   cancel(){},pause(){},resume(){},getVoices(){return [];},
   speak(utterance:{lang:string;text:string}){
    win.spokenLanguages.push(utterance.lang);win.speakingTexts.push(utterance.text);
   }
  }});
 });
 await page.goto(article);
 const full=page.getByRole('group',{name:'Strumenti per Articolo completo'});
 await full.getByRole('button',{name:'Ascolta: Articolo completo'}).click();
 await expect(full.getByRole('button',{name:'Pausa: Articolo completo'})).toBeVisible();
 expect((await page.evaluate(()=>(window as unknown as {spokenLanguages:string[]}).spokenLanguages)).at(-1)).toBe('it-IT');
 await full.getByRole('button',{name:'Pausa: Articolo completo'}).click();
 await expect(full.getByRole('button',{name:'Riprendi: Articolo completo'})).toBeVisible();
 await full.getByRole('button',{name:'Riprendi: Articolo completo'}).click();
 await full.getByRole('button',{name:'Interrompi: Articolo completo'}).click();
 const body=page.getByRole('group',{name:'Strumenti per La notizia, nel dettaglio'});
 await body.getByRole('button',{name:'Ascolta: La notizia, nel dettaglio'}).click();
 expect((await page.evaluate(()=>(window as unknown as {spokenLanguages:string[]}).spokenLanguages)).at(-1)).toBe('it-IT');
 await page.getByRole('button',{name:'Seleziona lingua'}).click();
 await page.getByRole('menuitemradio',{name:/English/}).click();
 const en=page.getByRole('group',{name:'Tools for The full story'});
 await en.getByRole('button',{name:'Listen: The full story'}).click();
 expect((await page.evaluate(()=>(window as unknown as {spokenLanguages:string[]}).spokenLanguages)).at(-1)).toBe('en-GB');
});
test('hamburger displays v0.0.5 and opens bilingual changelog',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Menu di O'}).click();
 await expect(page.getByRole('menuitem',{name:/Note di rilascio/})).toContainText('v0.0.5');
 await page.getByRole('menuitem',{name:/Note di rilascio/}).click();
 await expect(page).toHaveURL(/\/releases\/$/);
 await expect(page.getByRole('heading',{name:/Le novità di O/})).toBeVisible();
 await expect(page.locator('.release-entry')).toHaveCount(5);
 await page.reload();
 await expect(page.locator('.release-entry')).toHaveCount(5);
 await page.getByRole('button',{name:'Seleziona lingua'}).click();
 await page.getByRole('menuitemradio',{name:/English/}).click();
 await expect(page.getByRole('heading',{name:/What’s new in O/})).toBeVisible();
});

test('copy Markdown resets to the available state after 2.5 seconds',async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(_text:string)=>{}}});
 });
 await page.goto(article);
 const actions=page.getByRole('group',{name:'Strumenti per Articolo completo'});
 const button=actions.getByRole('button',{name:'Copia in Markdown: Articolo completo'});
 await button.click();
 await expect(button).toContainText('Copiato');
 await expect(button).toContainText('Markdown',{timeout:5000});
 await button.click();
 await expect(button).toContainText('Copiato');
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
 expect(sw).toContain('o-shell-0.0.5');
 expect(sw).toContain('skipWaiting');
 expect(sw).toContain('clients.claim');
 expect(readFileSync(resolve(dir,'version.json'),'utf8')).toContain('"version": "0.0.5"');
 expect(existsSync(resolve(dir,'releases/index.html'))).toBe(true);
});

test('the service worker and manifest are accessible from the GitHub Pages project scope',async({request})=>{
 const manifest=await request.get('/manifest.webmanifest');
 expect(manifest.ok()).toBe(true);
 expect((await manifest.json()).scope).toBe('/');
 const worker=await request.get('/sw.js');
 expect(worker.ok()).toBe(true);
 expect(await worker.text()).toContain('o-shell-0.0.5');
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
