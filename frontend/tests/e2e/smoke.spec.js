import { test, expect } from '@playwright/test';

test('page loads with 200 status', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
});

test('page has body content', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});


test('page contains text', async ({ page }) => {
  await page.goto('/');
  const bodyText = await page.textContent('body');
  expect(bodyText?.length).toBeGreaterThan(0);
});

test('page has title', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title).toBeTruthy();
});

