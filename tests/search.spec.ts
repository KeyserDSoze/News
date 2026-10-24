import { expect, test } from '@playwright/test';
test.beforeEach(async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('og-language','it');
    localStorage.setItem('og-theme','light');
  });
  await page.goto('/');
});
test('search opens from header, indexes last year in IndexedDB and survives reload',async({page})=>{
  await page.getByRole('link',{name:'Apri la ricerca'}).click();
  await expect(page.locator('.search-result')).toHaveCount(30,{timeout:20000});
  await expect(page.locator('.search-status')).toContainText('60');
  await page.reload();
  await expect(page.locator('.search-result')).toHaveCount(30,{timeout:20000});
  await expect(page.locator('.search-status')).toContainText('9 / 9');
});
test('date range and full text narrow results without a backend',async({page})=>{
  await page.getByRole('link',{name:'Apri la ricerca'}).click();
  await expect(page.locator('.search-result')).toHaveCount(30,{timeout:20000});
  await page.locator('input[type="date"]').first().fill('2026-10-23');
  await page.locator('input[type="date"]').nth(1).fill('2026-10-23');
  await page.getByRole('button',{name:'Cerca',exact:true}).click();
  await expect(page.locator('.search-result')).toHaveCount(10,{timeout:20000});
  await page.getByRole('button',{name:'Azzera filtri'}).last().click();
  await page.locator('.search-text-field input').fill('Oleshky');
  await page.getByRole('button',{name:'Cerca',exact:true}).click();
  await expect(page.locator('.search-result')).toHaveCount(1,{timeout:20000});
  await expect(page.locator('.search-result h2')).toContainText('Oleshky');
});
test('article tag opens an actual tag-filtered archive search',async({page})=>{
  await page.goto('/article/world/2026-10-24/oleshky-humanitarian-ceasefire/');
  await page.locator('.article-hero .story-tags').getByRole('link',{name:/ucraina/}).click();
  await expect(page).toHaveURL(/\/search\/tag\/ucraina/);
  await expect(page.locator('.tag-selected')).toContainText('ucraina');
  await expect(page.locator('.search-result').first()).toBeVisible({timeout:20000});
  for(const result of await page.locator('.search-result').all())
    await expect(result.locator('.story-tags')).toContainText('ucraina');
});
test('back from search article restores filters and scroll position',async({page})=>{
  await page.getByRole('link',{name:'Apri la ricerca'}).click();
  await expect(page.locator('.search-result')).toHaveCount(30,{timeout:20000});
  const article=page.locator('.search-result h2 a').nth(4);
  await article.evaluate(element=>element.scrollIntoView({block:'center',behavior:'instant'}));
  await expect(article).toBeInViewport();
  // Record the actual tap position: Playwright can auto-scroll the link immediately before pointerdown on mobile.
  await page.evaluate(()=>window.addEventListener('pointerdown',()=>{
    sessionStorage.setItem('o-test-tap-scroll',String(window.scrollY));
  },{once:true}));
  await article.click();
  const y=await page.evaluate(()=>Number(sessionStorage.getItem('o-test-tap-scroll')));
  await expect(page).toHaveURL(/\/article\//);
  await page.goBack();
  await expect(page.locator('.search-result')).toHaveCount(30);
  await expect.poll(async()=>Math.abs((await page.evaluate(()=>scrollY))-y)).toBeLessThan(50);
});
test('back from a previous World edition restores the exact list position',async({page})=>{
  await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
  await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
  const article=page.locator('.edition[data-date="2026-10-23"] article.story').first().locator('h3 a');
  await expect(article).toBeAttached();
  await article.scrollIntoViewIfNeeded();
  const y=await page.evaluate(()=>scrollY);
  await article.click();
  await expect(page).toHaveURL(/\/article\/world\/2026-10-23/);
  await page.goBack();
  await expect(page.locator('.edition[data-date="2026-10-23"] article')).toHaveCount(10);
  await expect.poll(async()=>Math.abs((await page.evaluate(()=>scrollY))-y)).toBeLessThan(50);
});
test('broken image is replaced by an original licensed-in-project editorial graphic',async({page})=>{
  await page.route('**/assets/oleshky-humanitarian-ceasefire.svg',route=>route.abort());
  await page.goto('/article/world/2026-10-24/oleshky-humanitarian-ceasefire/');
  await expect(page.locator('.article-main .news-picture img')).toHaveAttribute('src',/fallback\/world\.svg/,{timeout:20000});
  await expect(page.locator('.article-main .news-picture figcaption')).toContainText('Illustrazione editoriale');
});

test('22 October archive contains four complete bilingual desks and new article timelines',async({page})=>{
  await page.goto('/world/');
  await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(10);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await expect(page.locator('.edition[data-date="2026-10-23"] article.story')).toHaveCount(10);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await expect(page.locator('.edition[data-date="2026-10-22"] article.story')).toHaveCount(10);
  for(const desk of ['italy','technology','science']){
    await page.goto('/'+desk+'/');
    await expect(page.locator('.edition[data-date="2026-10-24"] article.story')).toHaveCount(5);
    await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
    await expect(page.locator('.edition[data-date="2026-10-22"] article.story')).toHaveCount(5);
  }
  await page.goto('/article/technology/2026-10-22/php2shell-attacchi-aggiornamenti/');
  await expect(page.locator('.related-story').getByText(/PHP/i).first()).toBeVisible();
});
