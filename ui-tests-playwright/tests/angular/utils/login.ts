import { Page } from '@playwright/test';

export class Login {

  // TODO@Playwright: Get config from environment
  config: any = {
    auth: {
      user: process.env.ANGULAR_APP_USERNAME,
      pass: process.env.ANGULAR_APP_PASSWORD
    }
  };

  constructor(private page: Page) { }

  async login() {
    return this.succeedAuth();
  }

  async succeedAuth() {
    await this.attemptAuth();
    await this.page.waitForTimeout(1000);
  }

  async attemptAuth({ pass = this.config.auth.pass, user = this.config.auth.user } = {}) {
    let BASE_URL = process.env.ANGULAR_APP_URL as string;
    await this.page.goto(BASE_URL);
    await this.page.waitForTimeout(500);

    await this.submitLoginForm(user, pass);
  }

  async submitLoginForm(user: string, pass: string) {
    await this.page.click('input[name="userNameOrEmailAddress"]');
    await this.page.fill('input[name="userNameOrEmailAddress"]', user);
    await this.page.press('input[name="password"]', 'Tab');
    await this.page.fill('input[name="password"]', pass);

    await this.clickLoginButton()
  }

  async clickLoginButton() {
    return this.page.click(`css=.login-form >> css=button[type="submit"]`);
  }
}
