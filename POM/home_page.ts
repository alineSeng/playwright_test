import type { Page } from 'playwright';
import { test, expect } from '@playwright/test';

export class Home_Page {
    readonly page: Page;
    readonly url: string = 'https://www.amazon.fr/';
    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(this.url); 
    }

    async reject_cookies() {
        const cookies = await this.page.getByRole('button', { name: 'Refuser' })
        
        if (await cookies.isVisible()){
            await cookies.click();
        } 
        else {
            console.log('Cookies already accepted');
        }
       
    }

    async add_desk_lamp_SKYLEO_to_cart() {
        const searchbox = await this.page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' });
        const button_GO = await this.page.getByRole('button', { name: 'Go', exact: true });
        const first_product_select = await this.page.getByRole('link', { name: 'Publicité sponsorisée - SKYLEO Lampe de bureau LED – Desk Lamp double tête –' });
        const add_to_cart = await this.page.getByTitle('Ajouter au panier');

        await searchbox.waitFor({ state: 'visible'});
        await searchbox.click();
        await searchbox.fill('SKYLEO Lampe de bureau LED – Desk Lamp double tête – 24W Protection yeux – Contrôle tactile – 5 modes de couleur x 11 niveaux de luminosité – 2400 lm – Fonction minuterie et mémoire – Noir [Classe énergétique D]');
        
        await button_GO.click();

        await first_product_select.first().click();
        await expect(this.page.getByText('€ 49,99€')).toContainText('€ 49,99€');

        await add_to_cart.click();
    }

    async go_to_cart() {
        const cart = await this.page.getByRole('link', { name: 'article dans le panier' });
        
        await cart.click();
        expect(cart).toBeTruthy();
    }

}