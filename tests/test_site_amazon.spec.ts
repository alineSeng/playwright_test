import { test} from '@playwright/test';
import { Home_Page } from '../POM/home_page'; 
import { Cart_Page } from '../POM/cart_page';
import { Register_Page } from '../POM/register_page';

test.use({ browserName: 'firefox' });

test('Purchase order on Amazon website', async ({ page }) => {
  const homePage = new Home_Page(page);
  const cartPage = new Cart_Page(page);
  const registerPage = new Register_Page(page);

  // Aller sur le site Amazon.fr
  await homePage.navigate();

  // Refuser les cookies')
  await homePage.reject_cookies();

  // Ajouter une lampe de bureau au panier
  await homePage.add_desk_lamp_SKYLEO_to_cart();
  
  // Aller au panier
  await homePage.go_to_cart();

  // Passer à la commande
  await cartPage.proceed_to_checkout();


});

test('Create an account', async ({ page }) => {
  const homePage = new Home_Page(page);
  const cartPage = new Cart_Page(page);
  const registerPage = new Register_Page(page);

  await homePage.navigate();
  await homePage.reject_cookies();
  await homePage.add_desk_lamp_SKYLEO_to_cart();
  await homePage.go_to_cart();
  await cartPage.proceed_to_checkout();

  // create an account
  await registerPage.go_to_register_page();
  await registerPage.register_with_fake_email();

});






