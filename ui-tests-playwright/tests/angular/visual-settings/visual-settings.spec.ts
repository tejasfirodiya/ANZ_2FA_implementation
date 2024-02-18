import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { VisualSettingsPage } from './visual-settings.page';

test.describe('VISUALSETTINGS', () => {

    let visualSettingsPage: VisualSettingsPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        visualSettingsPage = new VisualSettingsPage(page);

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
        const VISUALSETTING_PAGE_RENDER = 'visualsettings.code-flow.page-render.png';
        const VISUALSETTING_SET_DEFAULT_THEME = 'visualsettings.code-flow.theme-1.png';
        const VISUALSETTING_SET_THEME_2 = 'visualsettings.code-flow.theme-2.png';
        const VISUALSETTING_SET_THEME_3 = 'visualsettings.code-flow.theme-3.png';
        const VISUALSETTING_SET_THEME_4 = 'visualsettings.code-flow.theme-4.png';
        const VISUALSETTING_SET_THEME_5 = 'visualsettings.code-flow.theme-5.png';
        const VISUALSETTING_SET_THEME_6 = 'visualsettings.code-flow.theme-6.png';
        const VISUALSETTING_SET_THEME_7 = 'visualsettings.code-flow.theme-7.png';
        const VISUALSETTING_SET_THEME_8 = 'visualsettings.code-flow.theme-8.png';
        const VISUALSETTING_SET_THEME_9 = 'visualsettings.code-flow.theme-9.png';
        const VISUALSETTING_SET_THEME_10 = 'visualsettings.code-flow.theme-10.png';
        const VISUALSETTING_SET_THEME_11 = 'visualsettings.code-flow.theme-11.png';
        const VISUALSETTING_SET_THEME_12 = 'visualsettings.code-flow.theme-12.png';
        const VISUALSETTING_SET_THEME_13 = 'visualsettings.code-flow.theme-13.png';

        test('should render the page', async () => {
            await visualSettingsPage.gotoPage();
            await visualSettingsPage.wait(3000);
            await changeTheme(page, 'Default');

            await expect(page).toHaveScreenshot(VISUALSETTING_PAGE_RENDER);
        });

        test('should set defaut theme', async () => {
            await changeTheme(page, 'Default');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_DEFAULT_THEME);
        });

        test('should set theme 2', async () => {
            await changeTheme(page, 'Theme 2');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_2);
        });

        test('should set theme 3', async () => {
            await changeTheme(page, 'Theme 3');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_3);
        });

        test('should set theme 4', async () => {
            await changeTheme(page, 'Theme 4');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_4);
        });

        test('should set theme 5', async () => {
            await changeTheme(page, 'Theme 5');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_5);
        });

        test('should set theme 6', async () => {
            await changeTheme(page, 'Theme 6');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_6);
        });

        test('should set theme 7', async () => {
            await changeTheme(page, 'Theme 7');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_7);
        });

        test('should set theme 8', async () => {
            await changeTheme(page, 'Theme 8');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_8);
        });

        test('should set theme 9', async () => {
            await changeTheme(page, 'Theme 9');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_9);
        });

        test('should set theme 10', async () => {
            await changeTheme(page, 'Theme 10');

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_10);
        });

        test('should set theme 11', async () => {
            await changeTheme(page, 'Theme 11')

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_11);
        });

        test('should set theme 12', async () => {
            await changeTheme(page, 'Theme 12')

            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_12);
        });

        test('should set theme 13', async () => {
            await changeTheme(page, 'Theme 13')
            await expect(page).toHaveScreenshot(VISUALSETTING_SET_THEME_13);

            await changeTheme(page, 'Default');
        });

        async function changeTheme(page: Page, theme: string) {
            await visualSettingsPage.clickLinkByText(theme);
            await visualSettingsPage.wait(1000);
            await visualSettingsPage.clickButtonByTextWithin('tab.active', "Save as system default");
            await visualSettingsPage.waitForResponse();
            await visualSettingsPage.wait(1000);
            await visualSettingsPage.page.waitForSelector(`.theme-select-box`, { state: 'visible' });
            await visualSettingsPage.wait(2000);
            await visualSettingsPage.replaceFooterWith();
        }
    });
});