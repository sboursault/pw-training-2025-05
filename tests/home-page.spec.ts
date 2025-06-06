import { test, expect } from '@playwright/test';

test('The home page title contains "Tous les produits"', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Tous les produits/);
});

