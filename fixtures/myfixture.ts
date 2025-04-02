import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ShippingPage } from '../pages/ShippingPage';

// Define the fixture types interface
interface pageObjectFixtures {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    shippingPage: ShippingPage;
}

// Use the interface in the extend method
export const test = base.extend<pageObjectFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    shippingPage: async ({ page }, use) => {
        await use(new ShippingPage(page));
    },
});

export { expect } from '@playwright/test';