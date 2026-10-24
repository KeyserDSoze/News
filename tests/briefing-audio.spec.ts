import {expect,test} from '@playwright/test';

test.beforeEach(async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('og-language','it');
  localStorage.setItem('og-theme','dark');
  type Spoken={text:string;lang:string;onend?:(()=>void)|null;onerror?:((event:{error:string})=>void)|null};
  const audio=window as unknown as {
    spoken:{text:string;lang:string}[];
    speechPending:Spoken|null;
    speechCancels:number;
    nextSpeech:()=>boolean;
  };
  audio.spoken=[];
  audio.speechPending=null;
  audio.speechCancels=0;
  audio.nextSpeech=()=>{
    const utterance=audio.speechPending;
    if(!utterance)return false;
    audio.speechPending=null;
    utterance.onend?.();
    return true;
  };
  Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:class{
    text:string;lang='';rate=1;pitch=1;voice=null;
    onend:(()=>void)|null=null;
    onerror:((event:{error:string})=>void)|null=null;
    constructor(text:string){this.text=text;}
  }});
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
    getVoices(){return [];},
    speak(utterance:Spoken){
      audio.spoken.push({text:utterance.text,lang:utterance.lang});
      audio.speechPending=utterance;
    },
    pause(){},resume(){},
    cancel(){audio.speechCancels++;audio.speechPending=null;}
  }});
 });
});

test('four navigation tabs no longer show counts and lead briefing has no redundant number or blurb',async({page})=>{
 await page.goto('/');
 const nav=page.getByRole('navigation',{name:'Sezioni'});
 await expect(nav.getByRole('link')).toHaveCount(4);
 for(const link of await nav.getByRole('link').all()){
  await expect(link.locator('strong')).toHaveCount(1);
  await expect(link.locator('span')).toHaveCount(0);
 }
 const day=page.locator('[data-section-root="world"] .edition').first();
 await expect(day.locator('.edition-tag strong,.edition-heading p')).toHaveCount(0);
 await expect(day.getByRole('button',{name:'Ascolta la rassegna'})).toBeVisible();
 await expect(day.getByRole('heading',{name:'La rassegna del giorno'})).toBeVisible();
});

for(const [section,size] of [['world',10],['italy',5],['technology',5],['science',5]] as const){
 test(section+' plays all '+size+' of the latest edition in order using Italian device voice',async({page})=>{
  await page.goto('/'+(section==='world'?'':section+'/'));
  const day=page.locator('[data-section-root="'+section+'"] .edition').first();
  await expect(day.locator('article.story')).toHaveCount(size);
  const titles=await day.locator('article.story h3').allTextContents();
  await day.getByRole('button',{name:'Ascolta la rassegna'}).click();
  const controls=day.getByRole('group',{name:'Ascolto della rassegna del giorno'});
  await expect(controls.getByText('Notizia 1 / '+size)).toBeVisible();
  await controls.getByRole('button',{name:'Metti in pausa la rassegna'}).click();
  await expect(controls.getByRole('button',{name:'Riprendi la rassegna'})).toBeVisible();
  await controls.getByRole('button',{name:'Riprendi la rassegna'}).click();
  // Complete every utterance. The real Web Speech engine fires the same onend chain.
  const result=await page.evaluate(()=>{
   const audio=window as unknown as {
     spoken:{text:string;lang:string}[];
     nextSpeech:()=>boolean;
   };
   let steps=0;
   while(steps<500&&audio.nextSpeech())steps++;
   return {steps,spoken:audio.spoken};
  });
  expect(result.steps).toBeGreaterThanOrEqual(size);
  expect(result.steps).toBeLessThan(500);
  expect(result.spoken.every(chunk=>chunk.lang==='it-IT')).toBe(true);
  const narrated=result.spoken.map(x=>x.text).join(' ');
  for(const title of titles)expect(narrated).toContain(title.trim());
  await expect(controls.getByRole('button',{name:'Ascolta la rassegna'})).toBeVisible();
 });
}

test('English language selection changes the briefing voice and text',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Seleziona lingua'}).click();
 await page.getByRole('menuitemradio',{name:/English/}).click();
 const day=page.locator('[data-section-root="world"] .edition').first();
 await expect(day.locator('article.story')).toHaveCount(10);
 const title=await day.locator('article.story h3').first().innerText();
 await day.getByRole('button',{name:'Listen to briefing'}).click();
 await expect(day.getByText('Story 1 / 10')).toBeVisible();
 const result=await page.evaluate(()=>{
  const audio=window as unknown as {spoken:{text:string;lang:string}[]};
  return audio.spoken;
 });
 expect(result[0].lang).toBe('en-GB');
 expect(result[0].text).toContain('Today');
 expect(result[0].text).toContain(title);
});

test('briefing keeps speaking across desks with a global now-playing bar',async({page})=>{
 await page.goto('/');
 const world=page.locator('[data-section-root="world"] .edition').first();
 await expect(world.locator('article.story')).toHaveCount(10);
 await world.getByRole('button',{name:'Ascolta la rassegna'}).click();
 await expect(world.getByText('Notizia 1 / 10')).toBeVisible();
 const cancelsBefore=await page.evaluate(()=>(window as unknown as {speechCancels:number}).speechCancels);
 await page.getByRole('navigation',{name:'Sezioni'}).getByRole('link',{name:/Italia/}).click();
 const italy=page.locator('[data-section-root="italy"] .edition').first();
 await expect(italy.locator('article.story')).toHaveCount(5);
 await expect(italy.getByRole('button',{name:'Ascolta la rassegna'})).toBeVisible();
 const dock=page.getByRole('region',{name:'Lettore audio attivo'});
 await expect(dock).toBeVisible();
 await expect(dock).toContainText('Rassegna Mondo');
 await expect(dock).toContainText('Notizia 1/10');
 const status=await page.evaluate(()=>{
   const audio=window as unknown as {speechPending:unknown;speechCancels:number};
   return {pending:audio.speechPending,cancels:audio.speechCancels};
 });
 expect(status.pending).not.toBeNull();
 expect(status.cancels).toBe(cancelsBefore);
 await dock.getByRole('button',{name:'Metti in pausa audio'}).click();
 await expect(dock.getByRole('button',{name:'Riprendi audio'})).toBeVisible();
 await dock.getByRole('button',{name:'Riprendi audio'}).click();
 await dock.getByRole('button',{name:'Interrompi audio'}).click();
 await expect(dock).toHaveCount(0);
});

test('stop resets the controls without switching desks or changing archive scroll',async({page})=>{
 await page.goto('/');
 const day=page.locator('[data-section-root="world"] .edition').first();
 await expect(day.locator('article.story')).toHaveCount(10);
 await day.getByRole('button',{name:'Ascolta la rassegna'}).click();
 const reader=day.getByRole('group',{name:'Ascolto della rassegna del giorno'});
 await reader.getByRole('button',{name:'Interrompi la rassegna'}).click();
 await expect(reader.getByRole('button',{name:'Ascolta la rassegna'})).toBeVisible();
 await expect(page).toHaveURL(/\/$/);
 await expect(day.locator('article.story')).toHaveCount(10);
});

test('opening a story does not stop a briefing, but selecting another narration replaces it',async({page})=>{
 await page.goto('/');
 const world=page.locator('[data-section-root="world"] .edition').first();
 await expect(world.locator('article.story')).toHaveCount(10);
 await world.getByRole('button',{name:'Ascolta la rassegna'}).click();
 const dock=page.getByRole('region',{name:'Lettore audio attivo'});
 await expect(dock).toContainText('Rassegna Mondo');
 await page.evaluate(()=>{
  const win=window as unknown as {speechPending:unknown;obsoleteSpeech:unknown};
  win.obsoleteSpeech=win.speechPending;
 });
 const cancelsBefore=await page.evaluate(()=>(window as unknown as {speechCancels:number}).speechCancels);
 await world.locator('article.story h3 a').first().click();
 await expect(page).toHaveURL(/\/article\/world\//);
 await expect(dock).toContainText('Rassegna Mondo');
 expect(await page.evaluate(()=>(window as unknown as {speechCancels:number}).speechCancels)).toBe(cancelsBefore);
 // Starting body-only narration cancels the ongoing daily edition exactly once.
 await page.getByRole('group',{name:'Strumenti per La notizia, nel dettaglio'})
  .getByRole('button',{name:'Ascolta: La notizia, nel dettaglio'}).click();
 await expect(dock).toContainText('Testo della notizia');
 await expect(dock).not.toContainText('Rassegna Mondo');
 expect(await page.evaluate(()=>(window as unknown as {speechCancels:number}).speechCancels)).toBe(cancelsBefore+1);
 // A delayed event from the cancelled utterance must not resurrect the previous edition.
 await page.evaluate(()=>{
  (window as unknown as {obsoleteSpeech?:{onend?:()=>void}}).obsoleteSpeech?.onend?.();
 });
 await expect(dock).toContainText('Testo della notizia');
 await page.getByRole('navigation',{name:'Sezioni'}).getByRole('link',{name:/Italia/}).click();
 await expect(dock).toContainText('Testo della notizia');
 const italy=page.locator('[data-section-root="italy"] .edition').first();
 await expect(italy.locator('article.story')).toHaveCount(5);
 await italy.getByRole('button',{name:'Ascolta la rassegna'}).click();
 await expect(dock).toContainText('Rassegna Italia');
 await expect(dock).toContainText('Notizia 1/5');
 await dock.getByRole('button',{name:'Interrompi audio'}).click();
 await expect(dock).toHaveCount(0);
});

test('the same narrated article remains active when changing language or opening search',async({page})=>{
 await page.goto('/article/world/2026-10-24/oleshky-humanitarian-ceasefire/');
 const actions=page.getByRole('group',{name:'Strumenti per Articolo completo'});
 await actions.getByRole('button',{name:'Ascolta: Articolo completo'}).click();
 const dock=page.getByRole('region',{name:'Lettore audio attivo'});
 await expect(dock).toContainText('Articolo completo');
 const cancelsBefore=await page.evaluate(()=>(window as unknown as {speechCancels:number}).speechCancels);
 await page.getByRole('button',{name:'Seleziona lingua'}).click();
 await page.getByRole('menuitemradio',{name:/English/}).click();
 const dockEN=page.getByRole('region',{name:'Active audio player'});
 await expect(dockEN).toContainText('Full article');
 expect(await page.evaluate(()=>(window as unknown as {speechCancels:number}).speechCancels)).toBe(cancelsBefore);
 // Playback retains the language of the text that was originally selected.
 expect((await page.evaluate(()=>(window as unknown as {spoken:{lang:string}[]}).spoken)).at(-1)?.lang).toBe('it-IT');
 await page.getByRole('link',{name:'Open search'}).click();
 await expect(dockEN).toBeVisible();
 await dockEN.getByRole('button',{name:'Stop audio'}).click();
 await expect(dockEN).toHaveCount(0);
});
