import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('og-language','it'));
  await page.goto('/');
});
test('renders a sourced edition of exactly ten stories', async ({ page }) => {
  await expect(page.getByRole('heading',{name:'La rassegna di oggi'})).toBeVisible();
  await expect(page.locator('.edition').first().locator('article')).toHaveCount(10);
  const first=page.locator('article.story').first();
  await expect(first.locator('img')).toBeVisible();
  await first.getByText('Leggi l’analisi').click();
  await expect(first.locator('.source-list a')).toHaveCount(3);
});
test('switches language and theme without a server', async ({ page }) => {
  await page.getByRole('button',{name:'Read in English'}).click();
  await expect(page.getByRole('heading',{name:'Today’s briefing'})).toBeVisible();
  await page.getByRole('button',{name:'Switch to light theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.getByRole('heading',{name:'Today’s briefing'})).toBeVisible();
});
test('category filters retain the source attribution', async ({ page }) => {
  await page.getByRole('button',{name:'Economia',exact:true}).click();
  const stories=page.locator('.edition').first().locator('article');
  await expect(stories.first()).toBeVisible();
  expect(await stories.count()).toBeLessThan(10);
  await stories.first().getByText('Leggi l’analisi').click();
  await expect(stories.first().locator('.source-list a').first()).toHaveAttribute('href',/^https:\/\//);
});
