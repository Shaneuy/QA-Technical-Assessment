import { test, expect } from '@playwright/test';

test('Add to Cart / Checkout', async ({ page }) => {

  // Go to page
  await page.goto('https://www.saucedemo.com/');

  // Login 
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory/);

  // Cart Add Item
  await page.click('text=Test.allTheThings() T-Shirt (Red)');
  await expect(page.locator('.inventory_details_name')).toHaveText('Test.allTheThings() T-Shirt (Red)');
  await page.click('button:has-text("Add to cart")');

  // Cart Navigation
  await page.click('.shopping_cart_link');
  await expect(page.locator('.inventory_item_name')).toHaveText('Test.allTheThings() T-Shirt (Red)');

  // Checkout
  await page.click('button:has-text("Checkout")');
  await page.fill('#first-name', 'George');
  await page.fill('#last-name', 'Washington');
  await page.fill('#postal-code', '1234');

  // Submit Checkout
  await page.click('input[type="submit"]');
  await expect(page.locator('.summary_info')).toBeVisible();
  await page.click('button:has-text("Finish")');

  
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

});     