// tests/e2e/basic.spec.js
import { test, expect } from '@playwright/test';

test('home page loads with welcome message', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Verify main elements
  await expect(page.getByText('📚 Welcome to Quiz App')).toBeVisible();
  await expect(page.getByText('Test your knowledge or manage questions')).toBeVisible();
});

test('user can start quiz from home page', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  await page.getByText('Start Quiz as User').click();
  
  // Use first matching element to verify quiz started
  await expect(page.getByText(/Question|Score|Quiz Challenge/i).first()).toBeVisible({ timeout: 5000 });
  
  // or check if any quiz-related element is present
  const hasAnyQuizElement = await page.getByText(/Question|Score|Quiz Challenge/i).count() > 0;
  expect(hasAnyQuizElement).toBeTruthy();
});

test('admin login with correct password', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  await expect(page.getByText('Admin Panel')).toBeVisible();
  await expect(page.getByPlaceholder('Enter admin password')).toBeVisible();
  
  await page.getByPlaceholder('Enter admin password').fill('123');
  await page.getByText('Login as Admin').click();
  
  // Use .first() to get only the first matching element
  await expect(page.getByText(/Admin Panel|Existing Questions/i).first()).toBeVisible({ timeout: 5000 });
});

test('admin login fails with wrong password', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Enter wrong password
  await page.getByPlaceholder('Enter admin password').fill('wrongpassword');
  await page.getByText('Login as Admin').click();
  
  // Should show error message
  await expect(page.getByText('Incorrect admin password')).toBeVisible({ timeout: 3000 });
});

test('password hint is visible', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Check password hint exists
  await expect(page.getByText('Hint: Admin password is')).toBeVisible();
  await expect(page.getByText('123')).toBeVisible();
});

test('quiz functionality - answer questions', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Start quiz
  await page.getByText('Start Quiz as User').click();
  
  // Wait for quiz to load
  await page.waitForTimeout(1000);
  
  // Answer first question (click first option button that's not navigation)
  const firstOption = page.getByRole('button').filter({ hasNotText: /Quiz|Home|Back/i }).first();
  await firstOption.click();
  
  // Should show feedback or move to next question
  await page.waitForTimeout(1500);
  
  // Check if we're still in quiz (either next question or results)
  const pageContent = await page.textContent('body');
  const isQuizPage = pageContent.includes('Question') || pageContent.includes('Score') || pageContent.includes('Quiz Completed');
  expect(isQuizPage).toBeTruthy();
});

test('navigation from admin back to home', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Login as admin
  await page.getByPlaceholder('Enter admin password').fill('123');
  await page.getByText('Login as Admin').click();
  
  // Wait for admin panel
  await page.waitForTimeout(1000);
  
  // Use the "Back to Home" button in header
  await page.getByText('↩️ Back to Home').click();
  
  // Should be back on home page
  await expect(page.getByText('📚 Welcome to Quiz App')).toBeVisible({ timeout: 3000 });
});