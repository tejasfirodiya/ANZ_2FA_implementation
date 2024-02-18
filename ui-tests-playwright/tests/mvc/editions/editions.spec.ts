import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { EditionsPage } from './editions.page';

test.describe('EDITIONS', () => {
    let editionsPage: EditionsPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        editionsPage = new EditionsPage(page);

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
        const EDITIONS_CRUD_LIST = 'editions.crud.010-list.png';
        const EDITIONS_CRUD_NEW_MODAL = 'editions.crud.020-new-modal.png';
        const EDITIONS_CRUD_VALIDATION_SHOW = 'editions.crud.030-validation-show.png';
        const EDITIONS_CRUD_VALIDATION_HIDE = 'editions.crud.040-validation-hide.png';
        const EDITIONS_CRUD_NEW_SAVE = 'editions.crud.050-new-save.png';
        const EDITIONS_CRUD_ACTIONS = 'editions.crud.070-actions.png';
        const EDITIONS_CRUD_EDIT_MODAL = 'editions.crud.080-edit-modal.png';
        const EDITIONS_CRUD_EDIT_SAVE = 'editions.crud.090-edit-save.png';
        const EDITIONS_CRUD_DELETE_WARNING = 'editions.crud.100-delete-warning.png';
        const EDITIONS_CRUD_DELETE_CANCEL = 'editions.crud.110-delete-cancel.png';
        const EDITIONS_CRUD_DELETE_CONFIRM = 'editions.crud.120-delete-confirm.png';

        /* Step  */
        test('should render the initial list', async () => {
            await editionsPage.gotoPage();
            await editionsPage.waitForTableContent();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_LIST);
        });

        /* Step 2 */
        test('should display modal on click to "New" button', async () => {
            await editionsPage.clickByTextExact('Create new edition');
            await editionsPage.waitForModal();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_NEW_MODAL);
        });

        /* Step 3 */
        test('should show error when form is saved before required inputs are filled', async () => {
            await triggerValidation();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_VALIDATION_SHOW);
        });

        /* Step 4 */
        test('should hide error when form is properly filled', async () => {
            await fillInputsWithValidValues();
            await editionsPage.triggerValidation('#DisplayName', '#DailyPrice', '#WeeklyPrice', '#MonthlyPrice', '#AnnualPrice');

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_VALIDATION_HIDE);
        });

        /* Step 5 */
        test('should save record when "Save" button is clicked', async () => {
            await editionsPage.saveForm();
            await editionsPage.waitForResponse();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_NEW_SAVE);
        });

        /* Step 7 */
        test('should display actions on click to "Actions" button', async () => {
            await editionsPage.openActionsDropdown(2);
            await editionsPage.waitForDropdownMenu();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_ACTIONS);
        });

        /* Step 8 */
        test('should display modal on click to "Edit" button', async () => {
            await editionsPage.triggerDropdownAction('Edit');
            await editionsPage.waitForResponse('EditModal');
            await editionsPage.waitForModal();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_EDIT_MODAL);
        });

        /* Step 9 */
        test('should save changes to record when "Save" button is clicked', async () => {
            await editionsPage.fillInputs({ '#DisplayName': 'changed_name' });
            await editionsPage.saveForm();
            await editionsPage.waitForResponse();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_EDIT_SAVE);
        });

        /* Step 10 */
        test('should display warning on click to "Delete" button', async () => {
            await editionsPage.openActionsDropdown(2);
            await editionsPage.waitForDropdownMenu();
            await editionsPage.triggerDropdownAction('Delete');
            await editionsPage.waitForConfirmationDialog();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_DELETE_WARNING);
        });

        /* Step 11 */
        test('should not delete record on click to "Cancel" button', async () => {
            await editionsPage.cancelConfirmation();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_DELETE_CANCEL);
        });

        /* Step 12 */
        test('should delete record on click to "Yes" button', async () => {
            await editionsPage.openActionsDropdown(2);
            await editionsPage.waitForDropdownMenu();
            await editionsPage.triggerDropdownAction('Delete');
            await editionsPage.waitForConfirmationDialog();
            await editionsPage.confirmConfirmation();
            await editionsPage.waitForResponse();

            await expect(page).toHaveScreenshot(EDITIONS_CRUD_DELETE_CONFIRM);
        });

        async function triggerValidation() {
            await fillInputsWithValidValues();
            await editionsPage.clearInputs('#DisplayName', '#DailyPrice', '#WeeklyPrice', '#MonthlyPrice', '#AnnualPrice');
        }

        async function fillInputsWithValidValues() {
            await editionsPage.clickLabel('EditEdition_IsPaid');
            await editionsPage.wait(500);

            await editionsPage.fillInputs({
                '#DisplayName': 'test',
                '#DailyPrice': '1',
                '#WeeklyPrice': '2',
                '#MonthlyPrice': '3',
                '#AnnualPrice': '4',
            });
        }
    });
});