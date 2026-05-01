const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.bookStoreCard = page.getByRole('link', { name: 'Book Store Application' });


    this.loginNavItem     = page.getByRole('listitem').filter({ hasText: 'Login' });
    this.bookStoreNavItem = page.getByRole('link', { name: 'Book Store', exact: true });
  }


  async goToHome() {
    await this.navigate('/');
    await this.waitForPageLoad();
    await this.dismissAdsIfPresent();
  }


  async clickBookStoreApplication() {
    await this.bookStoreCard.click();
    await this.waitForPageLoad();
  }


  async clickLoginNav() {
    await this.loginNavItem.click();
    await this.waitForPageLoad();
  }


  async clickBookStoreNav() {
    await this.bookStoreNavItem.click();
    await this.waitForPageLoad();
  }
}

module.exports = { HomePage };
