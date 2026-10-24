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

test('changing sections stops the previously speaking briefing',async({page})=>{
 await page.goto('/');
 const world=page.locator('[data-section-root="world"] .edition').first();
 await expect(world.locator('article.story')).toHaveCount(10);
 await world.getByRole('button',{name:'Ascolta la rassegna'}).click();
 await expect(world.getByText('Notizia 1 / 10')).toBeVisible();
 await page.getByRole('navigation',{name:'Sezioni'}).getByRole('link',{name:/Italia/}).click();
 const italy=page.locator('[data-section-root="italy"] .edition').first();
 await expect(italy.locator('article.story')).toHaveCount(5);
 await expect(italy.getByRole('button',{name:'Ascolta la rassegna'})).toBeVisible();
 const status=await page.evaluate(()=>{
   const audio=window as unknown as {speechPending:unknown;speechCancels:number};
   return {pending:audio.speechPending,cancels:audio.speechCancels};
 });
 expect(status.pending).toBeNull();
 expect(status.cancels).toBeGreaterThan(0);
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
