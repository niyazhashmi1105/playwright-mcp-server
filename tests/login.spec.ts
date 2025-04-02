import { expect, test } from '../fixtures/myfixture';

test('should login with valid credentials', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});