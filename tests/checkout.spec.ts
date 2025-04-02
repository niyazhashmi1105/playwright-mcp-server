import { expect, test } from '../fixtures/myfixture';
import { faker } from '@faker-js/faker';

test('should complete checkout process', async ({ 
    page, 
    loginPage, 
    productsPage, 
    cartPage, 
    checkoutPage 
}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    await productsPage.addTopNProducts(1);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillInformation(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.location.zipCode()
    );
    
    // Verify navigation to checkout step two
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
});