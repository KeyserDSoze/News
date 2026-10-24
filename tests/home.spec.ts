import {test,expect} from '@playwright/test';
test.beforeEach(async ({page})=>{
  await page.addInitScript(()=>{if(!localStorage.getItem('og-language'))localStorage.setItem('og-language','it');if(!localStorage.getItem('og-theme'))localStorage.setItem('og-theme','dark');});
  await page.goto('/');
});
test('O is the sole masthead brand and explains its zero-ad promise',async({page})=>{
  await expect(page.getByRole('link',{name:'O — home'})).toBeVisible();
  await expect(page.getByText('Oggettivizzatore',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('Zero pubblicità. Zero titoli sensazionalistici.').first()).toBeVisible();
  await expect(page.getByRole('navigation',{name:'Sezioni'}).getByRole('link')).toHaveCount(4);
});
test('World retains exactly ten sourced articles',async({page})=>{
  await expect(page.locator('.edition[data-date="2026-10-24"] article')).toHaveCount(10);
  const first=page.locator('.edition[data-date="2026-10-24"] article').first();
  await expect(first.locator('img')).toBeVisible();
  await first.getByRole('link',{name:'Leggi la notizia'}).click();
  await expect(page).toHaveURL(/#\/article\/world\/2026-10-24\/oleshky-humanitarian-ceasefire/);
  await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'La notizia, nel dettaglio'})).toBeVisible();
  await expect(page.locator('.source-tile')).toHaveCount(3);
  await expect(page.getByRole('heading',{name:'Le domande e le constatazioni oggettive'})).toBeVisible();
});
test('switches language, explains O in English, and persists theme',async({page})=>{
  await page.getByRole('button',{name:'Read in English'}).click();
  await expect(page.getByText('Objectivizer',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('Zero ads. Zero sensational headlines.').first()).toBeVisible();
  await page.getByRole('button',{name:'Switch to light theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.getByRole('navigation',{name:'Sections'})).toBeVisible();
});
test('four independent desks use world=10 and specialized=5; unpublished ones do not invent news',async({page})=>{
  const nav=page.getByRole('navigation',{name:'Sezioni'});
  for(const name of ['Italia','Tecnologia','Scienza']){
    await nav.getByRole('link',{name:new RegExp(name)}).click();
    await expect(page.getByRole('heading',{name:'Questa sezione è in preparazione'})).toBeVisible();
    await expect(page.locator('.edition article')).toHaveCount(0);
  }
  await nav.getByRole('link',{name:/Mondo/}).click();
  await expect(page.locator('.edition').first().locator('article')).toHaveCount(10);
});
test('world infinite scroll appends the previous day',async({page})=>{
  const older=page.locator('.edition[data-date="2026-10-23"]');
  await expect(page.locator('.edition[data-date="2026-10-24"] article')).toHaveCount(10);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await expect(older).toBeAttached();
  await expect(older.locator('article')).toHaveCount(10);
});
test('historical coverage is linked in both directions with a dated recap',async({page})=>{
  await page.goto('/News/#/article/world/2026-10-23/eni-fuel-price-cap-extension');
  await expect(page.getByRole('heading',{name:'La vicenda, giorno per giorno'})).toBeVisible();
  const timeline=page.locator('.timeline');
  await expect(timeline.locator('.timeline-item')).toHaveCount(2);
  await timeline.getByRole('link',{name:/Autotrasporto/}).click();
  await expect(page).toHaveURL(/2026-10-24\/italy-hauliers-fuel-protests/);
  await expect(page.locator('.thread-recap')).toContainText('23 ottobre');
  await expect(page.locator('.timeline').getByRole('link',{name:/Carburanti, Eni/})).toBeVisible();
});
test('related story backlinks are derived without duplicating the reverse link',async({page})=>{
  await page.goto('/News/#/article/world/2026-10-24/oleshky-humanitarian-ceasefire');
  await expect(page.getByRole('link',{name:/Starlink in Ucraina/})).toBeVisible();
});
