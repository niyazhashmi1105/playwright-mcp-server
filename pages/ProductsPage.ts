
import { Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    async getProductCount(): Promise<number> {
        return await this.page.locator('.inventory_item').count();
    }

    async sortByHighPrice() {
        await this.page.selectOption('.product_sort_container', 'hilo');
    }

    async removeExistingItems() {
        const removeButtons = await this.page.locator('button:has-text("Remove")').all();
        for (const button of removeButtons) {
            await button.click();
        }
    }

    async addTopNProducts(count: number) {
        const addButtons = await this.page.locator('button:has-text("Add to cart")').all();
        for (let i = 0; i < count; i++) {
            await addButtons[i].click();
        }
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }
}