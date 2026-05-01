const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class BookStorePage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput     = page.getByRole('textbox', { name: 'Type to search' });
    this.detailTitle     = page.locator('#title-wrapper #userName-value');
    this.detailAuthor    = page.locator('#author-wrapper #userName-value');
    this.detailPublisher = page.locator('#publisher-wrapper #userName-value');
  }

  async goToBookStore() {
    await this.page.goto('https://demoqa.com/books');
    await this.searchInput.waitFor({ state: 'visible', timeout: 15_000 });
    await this.dismissAdsIfPresent();
  }

async searchBook(term) {
  await this.searchInput.fill(term);
  await this.searchInput.press('Enter');

  await expect(
    this.page.getByRole('link', { name: term })
  ).toBeVisible({ timeout: 15000 });
}

async getVisibleBookTitles() {
  const rows = await this.page.locator('.rt-tr-group').allTextContents();

  return rows
    .map(r => r.trim())
    .filter(r =>
      r.length > 0 &&
      !r.toLowerCase().includes('no rows found')
    );
}

  async clickBook(name) {
    await this.page.getByRole('link', { name }).click();
    await this.waitForPageLoad();
    await this.dismissAdsIfPresent();
  }

  async getBookDetails() {
    await this.detailTitle.waitFor({ state: 'visible', timeout: 10_000 });
    return {
      title:     (await this.detailTitle.textContent()).trim(),
      author:    (await this.detailAuthor.textContent()).trim(),
      publisher: (await this.detailPublisher.textContent()).trim(),
    };
  }
}

module.exports = { BookStorePage };
