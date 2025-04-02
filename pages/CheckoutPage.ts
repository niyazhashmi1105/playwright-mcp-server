import { Page } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async fillInformation(firstName: string, lastName: string, zipCode: string) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', zipCode);
        await this.page.click('#continue');
    }
}