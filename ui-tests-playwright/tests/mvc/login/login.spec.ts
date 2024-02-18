import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './login.page';

const LOGIN_CODE_FLOW_PASSWORD_INVALID = 'login.code-flow.password-invalid.png';
const LOGIN_CODE_FLOW_PASSWORD_VALID = 'login.code-flow.password-valid.png';

test.describe('LOGIN', () => {

  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    await page.setViewportSize({
      width: 1920,
      height: 1080
    });
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.afterEach(async () => {
    await page.waitForTimeout(1000);
  });

  test.describe('CODE FLOW', () => {
    
    test('should not login when password is invalid', async () => {
      const login = new Login(loginPage.page);
      await login.attemptAuth({ pass: 'iNVaLiD' });
      await page.waitForSelector('.swal2-modal', { state: 'visible' });
      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot(LOGIN_CODE_FLOW_PASSWORD_INVALID);
    });

    test('should login when password is valid', async () => {
      const login = new Login(loginPage.page);
      await login.succeedAuth();
      await loginPage.page.waitForTimeout(1000);
      await loginPage.replaceFooterWith();
      await loginPage.replaceWith('#kt_app_main', 'dashboard-replaced');
      await loginPage.wait(1000);

      await expect(page).toHaveScreenshot(LOGIN_CODE_FLOW_PASSWORD_VALID);
    });
  });
});
