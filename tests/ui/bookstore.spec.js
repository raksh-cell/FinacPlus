const { test, expect } = require(('../../fixtures/pages.fixtures'));
const { CREDENTIALS, BOOK, OUTPUT_FILES } = require('../../utils/constants');
const { writeBookDetails } = require('../../utils/fileHelper');

async function loginFlow(homePage, loginPage) {
  await homePage.goToHome();
  await homePage.clickBookStoreApplication();
  await homePage.clickLoginNav();
  await loginPage.login(CREDENTIALS.USERNAME, CREDENTIALS.PASSWORD);

  await loginPage.page.locator('#userName-value').waitFor({ state: 'visible' });
}

test.describe('FinacPlus', () => {

  test('TC-01: Nav to book store', async ({ homePage }) => {
    await homePage.goToHome();
    await homePage.clickBookStoreApplication();
    await expect(homePage.page).toHaveURL(/demoqa\.com\/(books|login|profile)/);
  });




  test('TC-02: Login', async ({ homePage, loginPage }) => {
    await loginFlow(homePage, loginPage);
    await expect(loginPage.page).toHaveURL(/\/profile/);
  });




  test('TC-03: Validate logout button and username', async ({
    homePage,
    loginPage,
  }) => {
    await loginFlow(homePage, loginPage);
    const displayedName = await loginPage.getDisplayedUsername();
    expect(displayedName).toBe(CREDENTIALS.USERNAME);
    await expect(loginPage.logoutButton).toBeVisible();
  });



test('TC-04: Validate book search', async ({
  homePage,
  loginPage,
  bookStorePage,
}) => {
  await loginFlow(homePage, loginPage);
  await bookStorePage.goToBookStore();
  await bookStorePage.searchBook(BOOK.SEARCH_TERM);
  await expect(
    bookStorePage.page.getByRole('link', { name: BOOK.TITLE })
  ).toBeVisible();
});





  test('TC-05: capture detail and write to file', async ({
  homePage,
  loginPage,
  bookStorePage,
}) => {
  await loginFlow(homePage, loginPage);
  await bookStorePage.goToBookStore();
  await expect(bookStorePage.page).toHaveURL(/\/books/);
  await bookStorePage.searchBook(BOOK.SEARCH_TERM);
  await bookStorePage.clickBook(BOOK.LINK_NAME);
  const details = await bookStorePage.getBookDetails();
  console.log(' Book details :', details);
  writeBookDetails(details, OUTPUT_FILES.BOOK_DETAILS);
  expect(details.title).toBeTruthy();
  expect(details.author).toBeTruthy();
  expect(details.publisher).toBeTruthy();
});




  test('TC-06: Logout', async ({ homePage, loginPage }) => {
    await loginFlow(homePage, loginPage);
    await loginPage.logout();
    await expect(loginPage.page).toHaveURL(/\/login/);
  });



test('TC-07: Full flow', async ({
  homePage,
  loginPage,
  bookStorePage,
}) => {

  await loginFlow(homePage, loginPage);


  const displayedName = await loginPage.getDisplayedUsername();
  expect(displayedName).toBe(CREDENTIALS.USERNAME);
  await expect(loginPage.logoutButton).toBeVisible();


  await bookStorePage.goToBookStore();
  await expect(bookStorePage.page).toHaveURL(/\/books/);


  await bookStorePage.searchBook(BOOK.SEARCH_TERM);


  await expect(
    bookStorePage.page.getByRole('link', { name: BOOK.TITLE })
  ).toBeVisible({ timeout: 15000 });


  await bookStorePage.page
    .getByRole('link', { name: BOOK.TITLE })
    .click();


  const details = await bookStorePage.getBookDetails();
  console.log('Book details:', details);
  writeBookDetails(details, OUTPUT_FILES.BOOK_DETAILS);


  expect(details.title).toBeTruthy();
  expect(details.author).toBeTruthy();
  expect(details.publisher).toBeTruthy();



  await loginPage.page.goto('/profile');
  await loginPage.logout();

  
  await expect(loginPage.page).toHaveURL(/\/login/);
});
});