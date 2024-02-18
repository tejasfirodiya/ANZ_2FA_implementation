import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { SettingsPage } from './settings.page';

test.describe('SETTING', () => {

    let settingsPage: SettingsPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        settingsPage = new SettingsPage(page);

        await page.setViewportSize({
            width: 1920,
            height: 1080
        });

        const login = new Login(page);
        await login.login();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test.describe('CODE FLOW', () => {
        const SETTING_PAGE_RENDER = 'settings.code-flow.page-render.png';

        /* Step 1 */
        test('should render the page', async () => {
            await settingsPage.gotoPage();

            page.waitForSelector(`.app-container .card-body`, { state: 'visible' });
            await settingsPage.wait(2000);

            await expect(page).toHaveScreenshot(SETTING_PAGE_RENDER);
        });
    });
});