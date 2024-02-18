import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './login.page';

const LOGIN_CODE_FLOW_PASSWORD_INVALID = 'login.code-flow.password-invalid.png';
const LOGIN_CODE_FLOW_PASSWORD_VALID = 'login.code-flow.password-valid.png';

test.describe('LOGIN', () => {

  let loginPage: LoginPage;
  let page: Page;
  let login: Login;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    login = new Login(loginPage.page);

    await page.setViewportSize({
      width: 1920,
      height: 1080
    });
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.describe('CODE FLOW', () => {


    test('should not login when password is invalid', async () => {
      await login.attemptAuth({ pass: 'invalid' });
      await loginPage.page.waitForSelector('.swal2-html-container', { state: 'visible' });
      await loginPage.page.waitForTimeout(500);

      await expect(loginPage.page).toHaveScreenshot(LOGIN_CODE_FLOW_PASSWORD_INVALID);
    });

    test('should login when password is valid', async () => {
      await login.succeedAuth();
      await loginPage.replaceFooterWith();
      await loginPage.replaceWith('customizable-dashboard', 'dashboard-replaced');
      await loginPage.page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot(LOGIN_CODE_FLOW_PASSWORD_VALID);
    });
  });
});
