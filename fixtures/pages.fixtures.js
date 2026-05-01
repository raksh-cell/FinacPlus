const { test: base } = require('@playwright/test');
const { HomePage }      = require('../pages/HomePage');
const { LoginPage }     = require('../pages/LoginPage');
const { BookStorePage } = require('../pages/BookStorePage');



const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  bookStorePage: async ({ page }, use) => {
    await use(new BookStorePage(page));
  },
});

const { expect } = base;

module.exports = { test, expect };