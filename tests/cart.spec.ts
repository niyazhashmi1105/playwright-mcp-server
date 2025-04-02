import { expect, test } from '../fixtures/myfixture';

test('should handle cart operations', async ({ page, loginPage, productsPage, cartPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    await productsPage.addTopNProducts(1);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Verify navigation to checkout
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
});