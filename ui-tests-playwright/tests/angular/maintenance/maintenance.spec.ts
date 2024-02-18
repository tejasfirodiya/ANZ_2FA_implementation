import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { MaintenancePage } from './maintenance.page';

test.describe('MAINTENANCE', () => {

    let maintenancePage: MaintenancePage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        maintenancePage = new MaintenancePage(page);

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
        const MAINTENANCE_PAGE_RENDER = 'maintenance.code-flow.page-render.png';

        /* Step 1 */
        test('should render the page', async () => {
            await maintenancePage.gotoPage();
            await maintenancePage.page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot(MAINTENANCE_PAGE_RENDER);
        });
    });
});