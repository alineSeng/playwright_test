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

    async accept_cookies() {
        const cookies = await this.page.getByRole('button', { name: 'Accepter' })

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

    async adding_product_to_wishlist() {
        const searchbox = await this.page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' });
        const button_GO = await this.page.getByRole('button', { name: 'Go', exact: true });
        const first_product_select = await this.page.getByRole('link', { name: /laptop/i }).first();
        const add_to_wishlist = await this.page.getByRole('link', { name: 'Ajouter à votre liste' });
        // const wishlist_confirmation = await this.page.getByText('Ajouté à votre liste');

        await searchbox.waitFor({ state: 'visible'});
        await searchbox.fill('laptop');
        await button_GO.click();
    
        
        await first_product_select.click();
       
        await add_to_wishlist.click();
       
        // expect(await wishlist_confirmation.isVisible()).toBeTruthy();
    }

    async search_by_category() {
        const categoryDropdown = await this.page.getByLabel('Sélectionnez la section dans')
        const searchbox = await this.page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' });
        const button_GO = await this.page.getByRole('button', { name: 'Go', exact: true });
        const search_results = await this.page.locator('#search div')
        
        const search_results_title = await this.page.getByRole('heading', { name: '1-24 sur plus de 1 000 résultats pour "headphones"' });

        await categoryDropdown.selectOption('High-Tech');
        await searchbox.fill('headphones');     
        await button_GO.click();
        expect(await search_results.first().isVisible());
        await expect(search_results.first()).toContainText('résultats pour "headphones"');
        

    }


}


