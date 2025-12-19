import { test, expect } from '@playwright/test';

test('basic page load', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vite \+ React/);
});

test('page has React logo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByAltText('React logo')).toBeVisible();
});

test('page has counter button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /count is/i })).toBeVisible();
});

test('counter increments', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: /count is/i });
  await button.click();
  await expect(button).toContainText('count is 1');
});

test('page has learn React link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /learn react/i })).toBeVisible();
});
