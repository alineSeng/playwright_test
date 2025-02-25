import type { Page } from 'playwright';

export class HomePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.amazon.fr/'); 
    }

    async refuser_cookies() {
        await this.page.getByRole('button', { name: 'Refuser' }).click();
    }

    async ajout_lampe_de_bureau_SKYLEO_au_panier() {
        await this.page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' }).click();
        await this.page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' }).fill('SKYLEO Lampe de bureau LED – Desk Lamp double tête – 24W Protection yeux – Contrôle tactile – 5 modes de couleur x 11 niveaux de luminosité – 2400 lm – Fonction minuterie et mémoire – Noir [Classe énergétique D]');
        await this.page.getByRole('button', { name: 'Go', exact: true }).click();
      
        await this.page.getByRole('link', { name: 'Publicité sponsorisée - SKYLEO Lampe de bureau LED – Desk Lamp double tête –' }).first().click();
        await this.page.getByTitle('Ajouter au panier').click();
    }


}