import { Page } from '@playwright/test';

export class ShippingPage {
    constructor(private page: Page) {}

    async getOrderInformation() {
        const paymentInfo = await this.page.locator('.summary_info .summary_value_label').first().textContent();
        const shippingInfo = await this.page.locator('.summary_info .summary_value_label').nth(1).textContent();
        const totalPrice = await this.page.locator('.summary_total_label').textContent();
        return { paymentInfo, shippingInfo, totalPrice };
    }

    async completeOrder() {
        await this.page.click('#finish');
    }

    async getConfirmationMessages() {
        const thankYouMessage = await this.page.locator('.complete-header').textContent();
        const confirmationMessage = await this.page.locator('.complete-text').textContent();
        return { thankYouMessage, confirmationMessage };
    }
}