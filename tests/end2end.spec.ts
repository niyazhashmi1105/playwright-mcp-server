import { expect,test } from '../fixtures/myfixture';
import { faker } from '@faker-js/faker';

test('complete purchase flow on sauce demo', async ({ 
    page,
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    shippingPage
}) => {
    await page.goto('https://www.saucedemo.com/');
    
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    const productCount = await productsPage.getProductCount();
    console.log(`Total number of products: ${productCount}`);
    
    await productsPage.sortByHighPrice();
    await productsPage.removeExistingItems();
    await productsPage.addTopNProducts(6);
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