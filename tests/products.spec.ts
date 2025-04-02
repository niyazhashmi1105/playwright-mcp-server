import { expect, test } from '../fixtures/myfixture';

test('should handle product listing and cart operations', async ({ page, loginPage, productsPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productCount = await productsPage.getProductCount();
    console.log(`Total number of products: ${productCount}`);
    
    await productsPage.sortByHighPrice();
    await productsPage.removeExistingItems();
    await productsPage.addTopNProducts(3);
    
    // Verify products were added to cart
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('3');
});