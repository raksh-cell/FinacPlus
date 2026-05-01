const { BasePage } = require('./BasePage');
class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput = page.getByRole('textbox', { name: 'UserName' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton   = page.getByRole('button',  { name: 'Login' });

    this.usernameDisplay = page.locator('#userName-value');

this.logoutButton = page.locator('//button[@id="submit" and text()="Logout"]');
  }
  async goToLogin() {
    await this.navigate('/login');
    await this.waitForPageLoad();
    await this.dismissAdsIfPresent();
  }



  async login(username, password) {
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();

  await this.page.waitForURL(/\/(profile|books)/, { timeout: 15000 });

  if (this.page.url().includes('books')) {
    await this.page.goto('https://demoqa.com/profile');
  }
}

  async getDisplayedUsername() {
    await this.usernameDisplay.waitFor({ state: 'visible', timeout: 10_000 });
    return (await this.usernameDisplay.textContent()).trim();
  }


async isLogoutButtonVisible() {
  await this.page.waitForLoadState('domcontentloaded');

  await this.page.mouse.wheel(0, 500);

  await this.logoutButton.waitFor({ state: 'visible', timeout: 15000 });
  return await this.logoutButton.isVisible();
}


async isLogoutButtonVisible() {
  await this.page.waitForLoadState('domcontentloaded');

  await this.logoutButton.waitFor({ state: 'visible', timeout: 15000 });
  return await this.logoutButton.isVisible();
}

  async logout() {
    await this.logoutButton.waitFor({ state: 'visible', timeout: 10_000 });
    await this.logoutButton.click();
    await this.page.waitForURL('**/login', { timeout: 15_000 });
  }
}

module.exports = { LoginPage };
