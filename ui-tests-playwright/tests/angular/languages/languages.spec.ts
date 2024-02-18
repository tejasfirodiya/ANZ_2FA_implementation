import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { LanguagesPage } from './languages.page';

test.describe('LANGUAGES', () => {

    let languagesPage: LanguagesPage;
    let page: Page;
    
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        languagesPage = new LanguagesPage(page);

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
        const LANGUAGES_PAGE_RENDER = 'languages.code-flow.page-render.png';

        /* Step 1 */
        test('should render the page', async () => {
            await languagesPage.gotoPage();
            await languagesPage.waitForTableContent();
            await languagesPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(LANGUAGES_PAGE_RENDER);
        });
    });
});