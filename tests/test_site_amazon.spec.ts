import { test, expect} from '@playwright/test';
import { Home_Page } from '../POM/home_page'; 
import { Cart_Page } from '../POM/cart_page';
import { Register_Page } from '../POM/register_page';
import AxeBuilder from '@axe-core/playwright'; // 1

test.use({ browserName: 'firefox' });

test.describe('homepage', () => { // 2
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const home_page = new Home_Page(page);
    // Aller sur le site Amazon.fr
    await home_page.navigate();
    //await page.goto('https://your-site.com/'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
    console.log(accessibilityScanResults.violations);
    //expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});

test.beforeEach(async ({ page }) => {
  const home_page = new Home_Page(page);
  // Aller sur le site Amazon.fr
  await home_page.navigate();
  // Refuser les cookies')
  await home_page.accept_cookies();

});

test('Purchase order on Amazon website', async ({ page }) => {
  const homePage = new Home_Page(page);
  const cartPage = new Cart_Page(page);
  const registerPage = new Register_Page(page);

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
  // await homePage.navigate();
  // // Accept cookies
  // await homePage.accept_cookies();
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
  // await homePage.navigate();
  // await homePage.reject_cookies();
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
  // await homePage.navigate();
  // await homePage.accept_cookies();
  await homePage.add_desk_lamp_SKYLEO_to_cart();
  // Step 2: Go to the cart
  // Expected Result: Verify that the product is present in the cart
  await homePage.go_to_cart();
  // Step 3: Proceed to checkout
  // Expected Result: Verify that the checkout process is initiated (e.g., check for the presence of the checkout page)
  await cartPage.proceed_to_checkout();
  
});

test('Verify adding product to wishlist', async ({ page }) => {
  const homePage = new Home_Page(page);

  await homePage.adding_product_to_wishlist();

});

test('Verify search by category', async ({ page }) => {
  const homePage = new Home_Page(page);

  await homePage.search_by_category();
});



// Test case 5 : Verify product search with popular product query
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Search for "iPhone"
// Expected Result: Verify that relevant search results are displayed
 
// Test case 6 : Verify product search with nonexistent product query
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Search for "productthatdoesnotexist123"
// Expected Result: Verify that a "no results found" message is displayed
 
// Test case 7 : Verify search filters by brand and price
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Search for "laptop"
// Step 3: Apply filters for brand (e.g., HP) and price range (e.g., 500€-1000€)
// Expected Result: Verify that filtered results match the selected criteria
 
// Test case 8 : Verify cart total for multiple products
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Add multiple products to the cart
// Expected Result: Verify that the cart displays the correct total amount
 
// Test case 9 : Verify product removal from cart updates total
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Add products to the cart and remove one product
// Expected Result: Verify that the cart total updates correctly after removal
 
// Test case 10 : Verify product quantity update in cart
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Add a product to the cart and change its quantity
// Expected Result: Verify that the total updates correctly
 
// Test case 11 : Verify order history after login
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Login and navigate to "Your Orders"
// Expected Result: Verify that the order history is displayed correctly
 
// Test case 12 : Verify adding product to wishlist
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Add a product to the wishlist
// Expected Result: Verify that the product is added to the wishlist
 
// Test case 13 : Verify removing product from wishlist
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Remove a product from the wishlist
// Expected Result: Verify that the product is removed from the wishlist
 
// Test case 14 : Verify language change functionality
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Change the language from French to English
// Expected Result: Verify that the site is displayed in English
 
// Test case 15 : Verify product page information
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Open a product page
// Expected Result: Verify that price, description, reviews, and other key information are displayed
 
// Test case 16 : Verify related product suggestions
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Open a product page
// Expected Result: Verify that related product suggestions are displayed
 
// Test case 17 : Verify product sorting functionality
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Search for a product and apply sorting by price (low to high) or popularity
// Expected Result: Verify that products are sorted correctly

// Test case 18 : Verify complete order process
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Add products to cart, proceed to checkout, fill in delivery address and payment details
// Expected Result: Verify that the order is successfully placed
 
// Test case 19 : Verify error message for invalid delivery address
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Proceed to checkout with an invalid delivery address
// Expected Result: Verify that an error message is displayed
 
// Test case 20 : Verify user logout functionality
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Login and then log out
// Expected Result: Verify that the user is successfully logged out
 
// Test case 21 : Verify homepage redirect via logo click
// Step 1: Open the browser and navigate to any page on amazon.fr
// Step 2: Click on the Amazon logo
// Expected Result: Verify that the user is redirected to the homepage
 
// Test case 22 : Verify application of promotions and discounts
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Add a product with a promotion or discount to the cart
// Expected Result: Verify that the discounted price is correctly applied
 
// Test case 23 : Verify customer support contact via "Help" section
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Access the "Help" section and initiate contact with customer support
// Expected Result: Verify that the contact options are available and functional
 
// Test case 24 : Verify customer reviews display and pagination
// Step 1: Open the browser and navigate to a product page on amazon.fr
// Step 2: Scroll to the reviews section
// Expected Result: Verify that reviews are displayed and paginated correctly
 
// Test case 25 : Verify search bar autocomplete suggestions
// Step 1: Open the browser and navigate to amazon.fr
// Step 2: Start typing a product name in the search bar
// Expected Result: Verify that relevant suggestions are displayed

 
