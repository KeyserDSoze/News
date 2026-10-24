import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const articleUrl='/article/world/2026-10-24/oleshky-humanitarian-ceasefire/';

test.beforeEach(async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('og-language','it'));
});

test('shared article URL loads directly, refreshes and has a clean slash path',async({page})=>{
  await page.goto(articleUrl);
  await expect(page).toHaveURL(/\/article\/world\/2026-10-24\/oleshky-humanitarian-ceasefire\/$/);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href','https://onews.app'+articleUrl);
});

test('old # article links migrate to the new canonical slash route without losing article',async({page})=>{
  await page.goto('/News/#/article/world/2026-10-24/oleshky-humanitarian-ceasefire');
  await expect(page).toHaveURL(new RegExp(articleUrl.replaceAll('/','\\/')+'$'));
  await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
});

test('custom domain Pages build has statically served article pages, social previews and a 404 fallback',()=>{
  const articleHtml=resolve('dist','article','world','2026-10-24','oleshky-humanitarian-ceasefire','index.html');
  const legacyHtml=resolve('dist','News','article','world','2026-10-24','oleshky-humanitarian-ceasefire','index.html');
  const fallbackHtml=resolve('dist','404.html');
  expect(existsSync(articleHtml)).toBe(true);
  expect(existsSync(fallbackHtml)).toBe(true);
  expect(existsSync(legacyHtml)).toBe(true);
  expect(readFileSync(legacyHtml,'utf8')).toContain('location.replace');
  expect(readFileSync(resolve('dist','CNAME'),'utf8').trim()).toBe('onews.app');
  const html=readFileSync(articleHtml,'utf8');
  expect(html).toContain('property="og:title"');
  expect(html).toContain('property="og:description"');
  expect(html).toContain('property="og:image"');
  expect(html).toContain('rel="canonical"');
  expect(html).toContain('src="/assets/');
  expect(readFileSync(fallbackHtml,'utf8')).toContain('src="/assets/');
  expect(html).toContain('https://onews.app/article/world/2026-10-24/oleshky-humanitarian-ceasefire/');
});

test('share control passes canonical title, summary and clean URL to native mobile share sheet',async({page})=>{
  await page.addInitScript(()=>{
    Object.defineProperty(navigator,'share',{configurable:true,value:async(data:unknown)=>{
      (window as unknown as {sharedData:unknown}).sharedData=data;
    }});
  });
  await page.goto(articleUrl);
  await page.getByRole('button',{name:'Condividi'}).click();
  const payload=await page.evaluate(()=> (window as unknown as {sharedData:{title:string;text:string;url:string}}).sharedData);
  expect(payload.title).toMatch(/Oleshky/);
  expect(payload.text.length).toBeGreaterThan(10);
  expect(payload.url).toBe('http://127.0.0.1:4173'+articleUrl);
  expect(payload.url).not.toContain('#');
});

test('when native share is unavailable, share and copy produce the article permalink',async({page})=>{
  await page.addInitScript(()=>{
    Object.defineProperty(navigator,'share',{configurable:true,value:undefined});
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text:string)=>{
      (window as unknown as {copiedUrl:string}).copiedUrl=text;
    }}});
  });
  await page.goto(articleUrl);
  await page.getByRole('button',{name:'Condividi'}).click();
  await expect(page.getByRole('button',{name:'Link copiato'})).toBeVisible();
  expect(await page.evaluate(()=> (window as unknown as {copiedUrl:string}).copiedUrl)).toBe('http://127.0.0.1:4173'+articleUrl);
});

test('old Pages article paths redirect to custom-domain root with history intact',async({page})=>{
    await page.goto('/News/article/world/2026-10-24/oleshky-humanitarian-ceasefire/');
    await expect.poll(()=>new URL(page.url()).pathname).toBe(articleUrl);
    await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
  });
  
  test('search and specialist sections use normal URLs and preserve navigation on phone back',async({page})=>{
  await page.goto('/world/');
  await page.getByRole('navigation',{name:'Sezioni'}).getByRole('link',{name:/Italia/}).click();
  await expect(page).toHaveURL(/\/italy\/$/);
  await expect(page.locator('[data-section-root="italy"] .edition article.story')).toHaveCount(5);
  await page.goBack();
  await expect(page).toHaveURL(/\/world\/$/);
  await page.getByRole('link',{name:'Apri la ricerca'}).click();
  await expect(page).toHaveURL(/\/search\/$/);
  await expect(page.locator('.search-result').first()).toBeVisible({timeout:20000});
});
