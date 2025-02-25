import { test, expect } from '@playwright/test';

test('aller sur la page web amazon', async ({ page }) => {
  await page.goto('https://www.amazon.fr/');
  // await page.getByRole('textbox', { name: 'Search For' }).click();
  // await page.getByRole('textbox', { name: 'Search For' }).fill('maison');
  // await page.getByRole('textbox', { name: 'Search For' }).press('Enter');
  // await page.getByRole('button', { name: 'Aller' }).click();
  // await page.getByRole('button', { name: 'Accepter' }).click();
});

test('refuser le cookies', async ({ page }) => {
  await page.goto('https://www.amazon.fr/');
  
  await page.getByRole('button', { name: 'Refuser' }).click();

});

test('ajout d\'une lampe de bureau SKYLEO au panier', async ({ page }) => {
  await page.goto('https://www.amazon.fr/');
  
  await page.getByRole('button', { name: 'Refuser' }).click();

  await page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' }).click();
  await page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' }).fill('SKYLEO Lampe de bureau LED – Desk Lamp double tête – 24W Protection yeux – Contrôle tactile – 5 modes de couleur x 11 niveaux de luminosité – 2400 lm – Fonction minuterie et mémoire – Noir [Classe énergétique D]');
  await page.getByRole('button', { name: 'Go', exact: true }).click();

  await page.getByRole('link', { name: 'Publicité sponsorisée - SKYLEO Lampe de bureau LED – Desk Lamp double tête –' }).first().click();
  await page.getByTitle('Ajouter au panier').click();

});

test('passer la commande', async ({ page }) => {
  await page.goto('https://www.amazon.fr/');
  
  await page.getByRole('button', { name: 'Refuser' }).click();

  await page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' }).click();
  await page.getByRole('searchbox', { name: 'Rechercher Amazon.fr' }).fill('SKYLEO Lampe de bureau LED – Desk Lamp double tête – 24W Protection yeux – Contrôle tactile – 5 modes de couleur x 11 niveaux de luminosité – 2400 lm – Fonction minuterie et mémoire – Noir [Classe énergétique D]');
  await page.getByRole('button', { name: 'Go', exact: true }).click();

  await page.getByRole('heading', { name: 'SKYLEO Lampe de bureau LED –' }).locator('#productTitle').isVisible();

  await page.getByRole('link', { name: 'Publicité sponsorisée - SKYLEO Lampe de bureau LED – Desk Lamp double tête –' }).first().click();
  await page.getByTitle('Ajouter au panier').click();

  const panier = await page.getByRole('link', { name: 'article dans le panier' }).isVisible();
  // expect(panier).toBeTruthy();

  
  //const contenuPanier = await page.locator('.sc-list-item-content').innerText();
  const contenuPanier = await page.getByRole('link', { name: 'article dans le panier' }).innerText();
  expect(contenuPanier).toContain('1');

  await page.getByRole('button', { name: 'Passer la commande' }).click();

});

