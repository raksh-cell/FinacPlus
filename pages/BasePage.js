class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }



/** 
    *@param {string} path
    **/
  async navigate(path) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  


/**
   *@param {import('@playwright/test').Locator} locator
 **/  
  async scrollAndClick(locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async dismissAdsIfPresent() {
    try {
      
      const adClose = this.page.locator('#close-fixedban');
      if (await adClose.isVisible({ timeout: 3000 })) {
        await adClose.click();
      }
    } catch {

    }
  }
}

module.exports = { BasePage };
