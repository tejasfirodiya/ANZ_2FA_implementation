import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { WebhookSubscriptionPage } from './webhook-subscription.page';

test.describe('WEBHOOKSUBSCRIPTION', () => {
    let webhookSubscriptionPage: WebhookSubscriptionPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        webhookSubscriptionPage = new WebhookSubscriptionPage(page);

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

    test.afterEach(async () => {
        await page.waitForTimeout(1000);
    });

    test.describe('CRUD', () => {
        const WEBHOOKSUBSCRIPTION_CRUD_LIST = 'webhookSubscription.crud.010-list.png';
        const WEBHOOKSUBSCRIPTION_CRUD_NEW_MODAL = 'webhookSubscription.crud.020-new-modal.png';
        const WEBHOOKSUBSCRIPTION_CRUD_NEW_SAVE = 'webhookSubscription.crud.050-new-save.png';
        const WEBHOOKSUBSCRIPTION_CRUD_DETAIL = 'webhookSubscription.crud.070-detail.png';
        const WEBHOOKSUBSCRIPTION_CRUD_EDIT_MODAL = 'webhookSubscription.crud.080-edit-modal.png';
        const WEBHOOKSUBSCRIPTION_CRUD_EDIT_SAVE = 'webhookSubscription.crud.090-edit-save.png';
        const WEBHOOKSUBSCRIPTION_CRUD_DELETE_WARNING = 'webhookSubscription.crud.100-delete-warning.png';
        const WEBHOOKSUBSCRIPTION_CRUD_DELETE_CANCEL = 'webhookSubscription.crud.110-delete-cancel.png';
        const WEBHOOKSUBSCRIPTION_CRUD_DELETE_CONFIRM = 'webhookSubscription.crud.120-delete-confirm.png';

        /* Step 1 */
        test('should render the initial list', async () => {
            await webhookSubscriptionPage.gotoPage();
            await webhookSubscriptionPage.waitForTableContent();

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_LIST);
        });

        /* Step 2 */
        test('should display modal on click to "New" button', async () => {
            await webhookSubscriptionPage.clickByTextExact('Add New Webhook Subscription');
            await webhookSubscriptionPage.waitForModal();

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_NEW_MODAL);
        });

        /* Step 5 */
        test('should save record when "Save" button is clicked', async () => {
            await fillInputsWithValidValues();
            await webhookSubscriptionPage.saveForm();
            await webhookSubscriptionPage.waitForResponse();

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_NEW_SAVE);
        });

        /* Step 6 */
        test('should go details page', async () => {
            await webhookSubscriptionPage.clickButtonByTextWithin('#SubscriptionTable', 'Details');
            await webhookSubscriptionPage.waitForResponse();
            await webhookSubscriptionPage.wait(2000);

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_DETAIL);
        });

        /* Step 7 */
        test('should display modal on click to "Edit" button', async () => {
            await clickDropdownBtn('Edit Webhook Subscription');

            await webhookSubscriptionPage.waitForResponse('EditModal');
            await webhookSubscriptionPage.wait(2000);

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_EDIT_MODAL);
        });

        /* Step 8 */
        test('should save changes to record when "Save" button is clicked', async () => {
            await webhookSubscriptionPage.fillInputs({ '#webhookEndpointURL': 'https://www.changedurl.com/' });
            await webhookSubscriptionPage.saveForm();
            await webhookSubscriptionPage.waitForResponse();

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_EDIT_SAVE);
        });

        /* Step 9 */
        test('should display warning on click to "Deactivate" button', async () => {
            await clickDropdownBtn('Deactivate');
            await webhookSubscriptionPage.waitForConfirmationDialog();

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_DELETE_WARNING);
        });

        /* Step 10 */
        test('should not disable record on click to "Cancel" button', async () => {
            await webhookSubscriptionPage.cancelConfirmation();

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_DELETE_CANCEL);
        });

        /* Step 11 */
        test('should disable record on click to "Yes" button', async () => {
            await clickDropdownBtn('Deactivate');
            await webhookSubscriptionPage.waitForConfirmationDialog();
            await webhookSubscriptionPage.confirmConfirmation();
            await webhookSubscriptionPage.waitForResponse();

            await expect(page).toHaveScreenshot(WEBHOOKSUBSCRIPTION_CRUD_DELETE_CONFIRM);
        });

        async function fillInputsWithValidValues() {
            await webhookSubscriptionPage.fillInputs({
                '#webhookEndpointURL': 'https://www.google.com/',
                '.select2-search__field': 'App.TestWebhook',
            });

            await page.click('.select2-results__option');
        }

        async function clickDropdownBtn(text: string) {
            await page.click('abp-page-subheader .dropdown a[data-bs-toggle=dropdown]');
            await webhookSubscriptionPage.wait(500);
            await page.click(`css=abp-page-subheader .dropdown >> css=a >> text=/.*${text}.*/`)
        }
    });
});