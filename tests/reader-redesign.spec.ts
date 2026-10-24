import { expect, test } from '@playwright/test';

test.beforeEach(async({page})=>{
 await page.addInitScript(()=>{
  if(!localStorage.getItem('og-language'))localStorage.setItem('og-language','it');
  if(!localStorage.getItem('og-theme'))localStorage.setItem('og-theme','dark');
 });
});

test('compact headline replaces promotional slogan and language changes only after choosing an option',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.hero.hero-compact')).toBeVisible();
 await expect(page.locator('.hero-emblem')).toHaveCount(0);
 await expect(page.getByText('Più fatti.')).toHaveCount(0);
 await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
 const language=page.getByRole('button',{name:'Seleziona lingua'});
 await language.click();
 await expect(language).toHaveAttribute('aria-expanded','true');
 await expect(page.locator('html')).toHaveAttribute('lang','it');
 await expect(page.getByRole('menuitemradio',{name:/Italiano/})).toHaveAttribute('aria-checked','true');
 await page.keyboard.press('Escape');
 await expect(page.getByRole('menuitemradio',{name:/English/})).toHaveCount(0);
 await language.click();
 await page.getByRole('menuitemradio',{name:/English/}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('.hero h1')).toContainText('World, in context.');
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
});

test('cover edition is persisted with full body in IndexedDB before an article opens',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
 await expect.poll(async()=>page.evaluate(async()=>{
  const db=await new Promise<IDBDatabase>((resolve,reject)=>{
   const request=indexedDB.open('o-local-edition-index',1);
   request.onsuccess=()=>resolve(request.result);
   request.onerror=()=>reject(request.error);
  });
  try{return await new Promise<boolean>(resolve=>{
   const request=db.transaction('editions','readonly').objectStore('editions').get('it/world/2026-10-24');
   request.onsuccess=()=>resolve(Boolean(request.result?.data?.articles?.[0]?.body?.length));
   request.onerror=()=>resolve(false);
  });}finally{db.close();}
 })).toBe(true);
 await page.route('**/news/2026-10-24/it.json',route=>route.abort());
 await page.locator('.edition[data-date="2026-10-24"] article.story').first()
  .getByRole('link',{name:'Leggi la notizia'}).click();
 await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'La notizia, nel dettaglio'})).toBeVisible();
 await expect(page.locator('.article-loading')).toHaveCount(0);
});

test('cached full article remains readable when the already-open app loses connectivity',async({page,context})=>{
 await page.goto('/');
 await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
 await expect.poll(async()=>page.evaluate(async()=>{
  const r=indexedDB.open('o-local-edition-index');
  return new Promise<boolean>(resolve=>{
   r.onsuccess=()=>{
    const db=r.result,req=db.transaction('editions').objectStore('editions').get('it/world/2026-10-24');
    req.onsuccess=()=>{resolve(Boolean(req.result?.data?.articles?.[0]?.body?.length));db.close();};
    req.onerror=()=>{resolve(false);db.close();};
   };
   r.onerror=()=>resolve(false);
  });
 })).toBe(true);
 await context.setOffline(true);
 // Client-side routing works even though fresh HTTP requests cannot succeed.
 await page.locator('.edition[data-date="2026-10-24"] article.story').first()
  .getByRole('link',{name:'Leggi la notizia'}).click();
 await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'La notizia, nel dettaglio'})).toBeVisible();
 await context.setOffline(false);
});

test('article tools are sticky on desktop and do not repeat controls in summary or fact panels',async({page,isMobile})=>{
 await page.goto('/article/world/2026-10-24/oleshky-humanitarian-ceasefire/');
 await expect(page.getByRole('group',{name:'Strumenti per Articolo completo'})).toHaveCount(1);
 await expect(page.locator('.article-summary .reader-actions')).toHaveCount(0);
 await expect(page.locator('.context-panel .reader-actions')).toHaveCount(0);
 await expect(page.locator('.article-body .body-listen .reader-actions')).toHaveCount(1);
 if(!isMobile){
  const rail=page.locator('.article-aside');
  await expect(rail).toBeVisible();
  expect(await rail.evaluate(el=>getComputedStyle(el).position)).toBe('sticky');
  await page.evaluate(()=>window.scrollTo(0,800));
  await expect(rail.getByRole('button',{name:'Condividi'})).toBeVisible();
 }else{
  await expect(page.locator('.article-mobile-controls')).toBeVisible();
  await expect(page.locator('.article-aside')).toBeHidden();
 }
});

test('theme-aware scrollbar and graduated impact meter preserve half-step data',async({page})=>{
 await page.goto('/');
 const track=page.locator('.edition[data-date="2026-10-24"] article.story').first().locator('.impact-pips');
 await expect(track.locator('span')).toHaveCount(5);
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 expect(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollbarWidth)).toBe('thin');
 await page.getByRole('button',{name:'Attiva il tema chiaro'}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 expect(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollbarWidth)).toBe('thin');
});
