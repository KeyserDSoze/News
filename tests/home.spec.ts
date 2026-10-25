import {test,expect} from '@playwright/test';
import {COVER_DATE,COVER_WORLD,PREVIOUS_DATE} from './latest-edition-fixture';
test.beforeEach(async ({page})=>{
  await page.addInitScript(()=>{if(!localStorage.getItem('og-language'))localStorage.setItem('og-language','it');if(!localStorage.getItem('og-theme'))localStorage.setItem('og-theme','dark');});
  await page.goto('/');
});
test('O identity, zero ads and four independent desks are visible',async({page})=>{
  await expect(page.getByRole('link',{name:'O — home'})).toBeVisible();
  await expect(page.getByText('Oggettivizzatore',{exact:true}).first()).toBeVisible();
  await expect(page.locator('.brand-definition')).toContainText('0 pubblicità');
  await expect(page.getByRole('navigation',{name:'Sezioni'}).getByRole('link')).toHaveCount(4);
});
test('World displays 10 stories and every impact rating has five half-step meter segments',async({page})=>{
  await expect(page.locator('.edition[data-date="'+COVER_DATE+'"] article.story')).toHaveCount(10);
  const cards=page.locator('.edition[data-date="'+COVER_DATE+'"] article.story');
  await expect(cards.first().locator('.impact-pips > span')).toHaveCount(5);
  await expect(cards.first().locator('.impact-score')).toContainText('/5');
  await cards.first().getByRole('link',{name:'Leggi la notizia'}).click();
  await expect(page).toHaveURL(new RegExp('/article/world/'+COVER_DATE+'/'+COVER_WORLD.id+'/'));
  await expect(page.getByRole('heading',{name:'Il riassunto'})).toBeVisible();
  await expect(page.locator('.article-hero .impact-explanation')).toBeVisible();
  await expect(page.getByRole('heading',{name:'La notizia, nel dettaglio'})).toBeVisible();
  await expect(page.locator('.source-tile')).toHaveCount(COVER_WORLD.sources.length);
  await expect(page.getByRole('heading',{name:'Le domande e le constatazioni oggettive'})).toBeVisible();
});
test('language and theme persist on reload',async({page})=>{
  await page.getByRole('button',{name:'Seleziona lingua'}).click();
  await page.getByRole('menuitemradio',{name:/English/}).click();
  await expect(page.getByText('Objectivizer',{exact:true}).first()).toBeVisible();
  await page.getByRole('button',{name:'Switch to light theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  expect(await page.evaluate(()=>localStorage.getItem('og-language'))).toBe('en');
  await expect(page.getByRole('navigation',{name:'Sections'})).toBeVisible();
});
test('each specialist desk has exactly five sourced stories, ratings and article routes',async({page})=>{
  const nav=page.getByRole('navigation',{name:'Sezioni'});
  for(const [name,slug] of [['Italia','italy'],['Tecnologia','technology'],['Scienza','science']] as const){
    await nav.getByRole('link',{name:new RegExp(name)}).click();
    await expect(page.locator('[data-section-root="'+slug+'"] .edition[data-date="'+COVER_DATE+'"] article.story')).toHaveCount(5);
    await expect(page.locator('[data-section-root="'+slug+'"] .edition').first().locator('.impact-compact')).toHaveCount(5);
    await page.locator('[data-section-root="'+slug+'"] .edition article').first().getByRole('link',{name:'Leggi la notizia'}).click();
    await expect(page).toHaveURL(new RegExp('/article/'+slug+'/'+COVER_DATE+'/'));
    await expect(page.locator('.article-hero .impact-explanation')).toBeVisible();
    await expect(page.locator('.source-tile').first()).toBeVisible();
  }
});
test('world archive adds older day on scrolling',async({page})=>{
  await expect(page.locator('.edition[data-date="'+COVER_DATE+'"] article')).toHaveCount(10);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await expect(page.locator('.edition[data-date="'+PREVIOUS_DATE+'"] article')).toHaveCount(10);
});
test('old and new fuel-price articles link through a shared chronology',async({page})=>{
  await page.goto('/article/world/2026-10-23/eni-fuel-price-cap-extension/');
  await expect(page.getByRole('heading',{name:'La vicenda, giorno per giorno'})).toBeVisible();
  const timeline=page.locator('.timeline');
  await expect(timeline.locator('.timeline-item')).toHaveCount(3);
  await timeline.getByRole('link',{name:/Autotrasporto, ripartono le consegne/}).click();
  await expect(page).toHaveURL(/article\/italy\/2026-10-24\/sud-rientro-merci-carburante/);
  await expect(page.locator('.timeline').getByRole('link',{name:/Carburanti, Eni/})).toBeVisible();
});
test('Starlink cross-section continuation also links back to the old World article',async({page})=>{
  await page.goto('/article/world/2026-10-23/ukraine-starlink-restrictions/');
  await expect(page.locator('.timeline').getByRole('link',{name:/Ucraina, Kiev riferisce/})).toBeVisible();
  await page.locator('.timeline').getByRole('link',{name:/Ucraina, Kiev riferisce/}).click();
  await expect(page).toHaveURL(/article\/technology\/2026-10-24\/starlink-ucraina-ripristino-connessioni/);
  await expect(page.locator('.timeline').getByRole('link',{name:/Starlink in Ucraina/})).toBeVisible();
});
test('explicit related links yield automatic reverse links',async({page})=>{
  await page.goto('/article/world/2026-10-24/oleshky-humanitarian-ceasefire/');
  await expect(page.getByRole('link',{name:/Starlink in Ucraina/})).toBeVisible();
});
