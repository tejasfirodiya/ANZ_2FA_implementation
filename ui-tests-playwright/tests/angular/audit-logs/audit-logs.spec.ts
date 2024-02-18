import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { AuditLogsPage } from './audit-logs.page';

test.describe('AUDITLOGS', () => {

    let auditLogsPage: AuditLogsPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        auditLogsPage = new AuditLogsPage(page);

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
        const AUDITLOGS_PAGE_RENDER = 'auditlogs.code-flow.page-render.png';

        /* Step 1 */
        test('should render the page', async () => {
            await auditLogsPage.gotoPage();
            await auditLogsPage.waitForTableContent();
            await auditLogsPage.replaceWith('.tab-content', 'REPLACED_DUE_TO_DYNAMIC_DATA');

            await auditLogsPage.page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot(AUDITLOGS_PAGE_RENDER);
        });
    });
});