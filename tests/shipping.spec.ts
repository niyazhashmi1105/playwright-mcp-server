import { expect, test } from '../fixtures/myfixture';
import { faker } from '@faker-js/faker';

test('should complete order and verify confirmation', async ({ 
    page, 
    loginPage, 
    productsPage, 
    cartPage, 
    checkoutPage,
    shippingPage 
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
    
    const orderInfo = await shippingPage.getOrderInformation();
    console.log(`Payment Information: ${orderInfo.paymentInfo}`);
    console.log(`Shipping Information: ${orderInfo.shippingInfo}`);
    console.log(`Total: ${orderInfo.totalPrice}`);
    
    await shippingPage.completeOrder();
    
    const messages = await shippingPage.getConfirmationMessages();
    expect(messages.thankYouMessage).toBe('Thank you for your order!');
    expect(messages.confirmationMessage).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});