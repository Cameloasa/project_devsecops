import { test, expect } from '@playwright/test';

test('page loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('http://localhost:5173/');
});

test('page contains React text', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('React')).toBeVisible();
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