import type { Page } from 'playwright';
import { test, expect } from '@playwright/test';

export class Register_Page {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async go_to_register_page() {
        const register_button = await this.page.getByRole('link', { name: 'Créer votre compte Amazon' });

        await register_button.waitFor({ state: 'visible' });
        await register_button.click();
    
    }

    async register_with_fake_email() {
        const register_name = await this.page.getByRole('textbox', { name: 'Votre nom' })
        const register_email = await this.page.getByRole('textbox', { name: 'Numéro de téléphone portable' })
        const register_password = await this.page.getByRole('textbox', { name: 'Mot de passe', exact: true })
        const refill_password = await this.page.getByRole('textbox', { name: 'Entrez le mot de passe à' })
        const continue_button = await this.page.getByRole('button', { name: 'Continuer Vérifier le numéro' })
        const error_message = await this.page.getByRole('heading', { name: 'Un problème est survenu' })
        const error_message_detail = await this.page.getByText('Veuillez saisir un numéro de')

        await register_name.waitFor({ state: 'visible' });
        await register_name.fill('test');
        await register_email.fill('1223456789');
        
        await error_message.isVisible();
        
        await register_password.fill('test1234');
        await refill_password.fill('test1234');
        await continue_button.click();

        await expect(error_message).toContainText('Un problème est survenu');
        await expect(error_message_detail).toContainText('Veuillez saisir un numéro de');

    
    }

    
}