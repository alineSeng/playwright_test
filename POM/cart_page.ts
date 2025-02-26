import type { Page } from 'playwright';
import { test, expect } from '@playwright/test';

export class Cart_Page {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    
    async proceed_to_checkout() {
        //const contenuPanier = await page.locator('.sc-list-item-content').innerText();
        const cart_qty = await this.page.getByRole('link', { name: 'article dans le panier' }).innerText();
        const proceed_to_checkout = await this.page.getByRole('button', { name: 'Passer la commande' });

        expect(cart_qty).toContain('1');
    
        await proceed_to_checkout.click();
    
    }
}