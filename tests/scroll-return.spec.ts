import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('og-language','it');
  localStorage.setItem('og-theme','dark');
 });
});

/** Save the actual screen position at tap time, including Playwright's mobile scrolling. */
async function tapPosition(page:import('@playwright/test').Page){
 await page.evaluate(()=>{
  window.addEventListener('pointerdown',()=>{
   sessionStorage.setItem('o-position-at-tap',String(window.scrollY));
  },{once:true});
 });
}
async function originY(page:import('@playwright/test').Page){
 return page.evaluate(()=>Number(sessionStorage.getItem('o-position-at-tap')));
}

test('bottom back-to-briefing returns precisely to first cover story after a long article',async({page})=>{
 await page.goto('/world/');
 await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
 const story=page.locator('.edition[data-date="2026-10-24"] article.story').first();
 await story.locator('h3 a').scrollIntoViewIfNeeded();
 await tapPosition(page);
 await story.getByRole('link',{name:'Leggi la notizia'}).click();
 const y=await originY(page);
 await expect(page).toHaveURL(/\/article\/world\/2026-10-24\//);
 await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
 // Make article position intentionally very different from the cover's position.
 await page.locator('.article-return').scrollIntoViewIfNeeded();
 const articleY=await page.evaluate(()=>window.scrollY);
 expect(articleY).toBeGreaterThan(y+800);
 await page.locator('.article-return').click();
 await expect(page).toHaveURL(/\/world\/$/);
 await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
 await expect.poll(async()=>Math.abs((await page.evaluate(()=>scrollY))-y),{timeout:6500}).toBeLessThan(50);
 await expect(story).toBeInViewport({ratio:0.05});
});

test('browser Back restores originating top-day card after scrolling article to end',async({page})=>{
 await page.goto('/world/');
 await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
 const story=page.locator('.edition[data-date="2026-10-24"] article.story').first();
 await story.locator('h3 a').scrollIntoViewIfNeeded();
 await tapPosition(page);
 await story.locator('h3 a').click();
 const y=await originY(page);
 await expect(page).toHaveURL(/\/article\//);
 await page.locator('.article-return').scrollIntoViewIfNeeded();
 await page.goBack();
 await expect(page).toHaveURL(/\/world\/$/);
 await expect.poll(async()=>Math.abs((await page.evaluate(()=>scrollY))-y),{timeout:6500}).toBeLessThan(50);
 await expect(story).toBeInViewport({ratio:0.05});
});

test('old archive edition returns to the same card, not to the current date',async({page})=>{
 await page.goto('/world/');
 await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
 await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
 const older=page.locator('.edition[data-date="2026-10-23"] article.story').first();
 await expect(older).toBeAttached({timeout:15000});
 await older.locator('h3 a').scrollIntoViewIfNeeded();
 await tapPosition(page);
 await older.locator('h3 a').click();
 const y=await originY(page);
 await expect(page).toHaveURL(/\/article\/world\/2026-10-23\//);
 await page.locator('.article-return').scrollIntoViewIfNeeded();
 await page.locator('.article-return').click();
 await expect(page).toHaveURL(/\/world\/$/);
 await expect.poll(async()=>Math.abs((await page.evaluate(()=>scrollY))-y),{timeout:6500}).toBeLessThan(50);
 await expect(older).toBeInViewport({ratio:0.05});
});

test('search result restores both its scroll position and the applied filters',async({page})=>{
 await page.goto('/search/');
 await expect(page.locator('.search-result')).toHaveCount(30,{timeout:20000});
 const result=page.locator('.search-result').nth(5);
 await result.locator('h2 a').scrollIntoViewIfNeeded();
 await tapPosition(page);
 await result.locator('h2 a').click();
 const y=await originY(page);
 await expect(page).toHaveURL(/\/article\//);
 await page.locator('.article-return').scrollIntoViewIfNeeded();
 await page.locator('.article-return').click();
 await expect(page).toHaveURL(/\/search\/$/);
 await expect(page.locator('.search-result')).toHaveCount(30);
 await expect.poll(async()=>Math.abs((await page.evaluate(()=>scrollY))-y),{timeout:6500}).toBeLessThan(50);
});
