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
  await homePage.accept_cookies();

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

test('Verify the search functionality and adding product to cart', async ({ page }) => {
  const homePage = new Home_Page(page);
  
  // Step 1: Navigate to amazon.fr, perform the search
  await homePage.navigate();
  // Accept cookies
  await homePage.accept_cookies();
  // Step 2: Select the first product
  // Expected Result: Verify that the product page is displayed (e.g., check the product title element)
  // Step 2: Add to cart
  // Expected Result: Verify that the product is added to the cart (e.g., check for a confirmation message)
  await homePage.add_desk_lamp_SKYLEO_to_cart();
});


// Test case 6 : Verify accessing the cart
test('Verify accessing the cart', async ({ page }) => {
  const homePage = new Home_Page(page);
  const cartPage = new Cart_Page(page);
  // Step 1: Navigate to amazon.fr, perform the search and add the product to the cart
  await homePage.navigate();
  await homePage.reject_cookies();
  await homePage.add_desk_lamp_SKYLEO_to_cart();
  // Step 2: Go to the cart
  // Expected Result: Verify that the product is present in the cart
  await homePage.go_to_cart();

});


// Test case 7 : Verify the checkout process
test('Verify the checkout process', async ({ page }) => {
  const homePage = new Home_Page(page);
  const cartPage = new Cart_Page(page);
  // Step 1: Navigate to amazon.fr, perform the search and add the product to the cart
  await homePage.navigate();
  await homePage.accept_cookies();
  await homePage.add_desk_lamp_SKYLEO_to_cart();
  // Step 2: Go to the cart
  // Expected Result: Verify that the product is present in the cart
  await homePage.go_to_cart();
  // Step 3: Proceed to checkout
  // Expected Result: Verify that the checkout process is initiated (e.g., check for the presence of the checkout page)
  await cartPage.proceed_to_checkout();
  
});

