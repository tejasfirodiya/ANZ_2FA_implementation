import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { OrganizationUnitPage } from './organization-unit.page';

test.describe('ORGANIZATIONUNIT', () => {

    let organizationUnitPage: OrganizationUnitPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        organizationUnitPage = new OrganizationUnitPage(page);

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

    test.describe('CRUD', () => {
        const ORGANIZATIONUNIT_CRUD_LIST = 'organizationunit.crud.010-list.png';
        const ORGANIZATIONUNIT_CRUD_NEW_MODAL = 'organizationunit.crud.020-new-modal.png';
        const ORGANIZATIONUNIT_CRUD_VALIDATION_SHOW = 'organizationunit.crud.030-validation-show.png';
        const ORGANIZATIONUNIT_CRUD_VALIDATION_HIDE = 'organizationunit.crud.040-validation-hide.png';
        const ORGANIZATIONUNIT_CRUD_NEW_SAVE = 'organizationunit.crud.050-new-save.png';
        const ORGANIZATIONUNIT_CRUD_ALREADY_EXISTED = 'organizationunit.crud.060-already-existed.png';
        const ORGANIZATIONUNIT_CRUD_ACTIONS = 'organizationunit.crud.070-actions.png';
        const ORGANIZATIONUNIT_CRUD_EDIT_MODAL = 'organizationunit.crud.080-edit-modal.png';
        const ORGANIZATIONUNIT_CRUD_EDIT_SAVE = 'organizationunit.crud.090-edit-save.png';
        const ORGANIZATIONUNIT_CRUD_ADD_SUB_ORGANIZATION = 'organizationunit.crud.091-add-sub-organization.png';
        const ORGANIZATIONUNIT_CRUD_DELETE_WARNING = 'organizationunit.crud.100-delete-warning.png';
        const ORGANIZATIONUNIT_CRUD_DELETE_CANCEL = 'organizationunit.crud.110-delete-cancel.png';
        const ORGANIZATIONUNIT_CRUD_DELETE_CONFIRM = 'organizationunit.crud.120-delete-confirm.png';

        /* Step 1 */
        test('should render the initial list', async () => {
            await organizationUnitPage.gotoPage();
            await organizationUnitPage.page.waitForTimeout(1000);

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_LIST);
        });

        /* Step 2 */
        test('should display modal on click to "Add root unit" button', async () => {
            await organizationUnitPage.clickByTextExact('Add root unit');
            await organizationUnitPage.waitForModal('createOrEditModal');

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_NEW_MODAL);
        });

        /* Step 3 */
        test('should show error when form is saved before required inputs are filled', async () => {
            await triggerValidation();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_VALIDATION_SHOW);
        });

        /* Step 4 */
        test('should hide error when form is properly filled', async () => {
            await fillInputsWithValidValues();
            await organizationUnitPage.triggerValidation('#OrganizationUnitDisplayName');

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_VALIDATION_HIDE);
        });

        /* Step 5 */
        test('should save record when "Save" button is clicked', async () => {
            await organizationUnitPage.saveForm();
            await organizationUnitPage.waitForResponse();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_NEW_SAVE);
        });

        /* Step 6 */
        test('should give an error when trying to create an existing item', async () => {
            await organizationUnitPage.clickByTextExact('Add root unit');
            await organizationUnitPage.waitForModal('createOrEditModal');

            await fillInputsWithValidValues();

            await organizationUnitPage.saveForm();
            await organizationUnitPage.waitForResponse();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_ALREADY_EXISTED);
        });

        /* Step 7 */
        test('should display actions on click to "Actions" button', async () => {
            await organizationUnitPage.confirmConfirmation();
            await organizationUnitPage.clickButtonByText('Cancel');
            await openOUDropdown();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_ACTIONS);
        });

        /* Step 8 */
        test('should display modal on click to "Edit" button', async () => {
            await clickOUDropdown('Edit');
            await organizationUnitPage.waitForModal('createOrEditModal');

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_EDIT_MODAL);
        });

        /* Step 9 */
        test('should save changes to record when "Save" button is clicked', async () => {
            await organizationUnitPage.fillInputs({ '#OrganizationUnitDisplayName': 'changed_name' });
            await organizationUnitPage.saveForm();
            await organizationUnitPage.waitForResponse();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_EDIT_SAVE);
        });

        /* Step 10 */
        test('should add sub organization', async () => {
            await openOUDropdown();
            await organizationUnitPage.clickByText('Add sub-unit');
            await organizationUnitPage.fillInputs({ '#OrganizationUnitDisplayName': 'test-sub-unit' });
            await organizationUnitPage.saveForm();
            await organizationUnitPage.waitForResponse();
            await page.waitForSelector('.pi-chevron-right');
            await page.click('.pi-chevron-right')
            await organizationUnitPage.page.waitForTimeout(500);

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_ADD_SUB_ORGANIZATION);
        });

        /* Step 11 */
        test('should display warning on click to "Delete" button', async () => {
            await openOUDropdown();
            await organizationUnitPage.clickByTextWithin(".p-contextmenu", 'Delete');
            await organizationUnitPage.waitForConfirmationDialog();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_DELETE_WARNING);
        });

        /* Step 12 */
        test('should not delete record on click to "Cancel" button', async () => {
            await organizationUnitPage.cancelConfirmation();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_DELETE_CANCEL);
        });

        /* Step 13 */
        test('should delete record on click to "Yes" button', async () => {
            await openOUDropdown();
            await organizationUnitPage.clickByTextWithin(".p-contextmenu", 'Delete');

            await organizationUnitPage.waitForConfirmationDialog();
            await organizationUnitPage.confirmConfirmation();
            await organizationUnitPage.waitForResponse();

            await expect(page).toHaveScreenshot(ORGANIZATIONUNIT_CRUD_DELETE_CONFIRM);
        });

        async function triggerValidation() {
            await fillInputsWithValidValues();
            await organizationUnitPage.clearInputs('#OrganizationUnitDisplayName');
        }

        function fillInputsWithValidValues() {
            return organizationUnitPage.fillInputs({
                '#OrganizationUnitDisplayName': 'test'
            });
        }

        async function openOUDropdown() {
            await organizationUnitPage.page.click('ul[role=tree] div[role=treeitem]', { button: 'right' });
            await organizationUnitPage.page.waitForSelector('.p-contextmenu ', { state: 'visible' });
        }

        function clickOUDropdown(text: string) {
            return organizationUnitPage.page.click(`css=.p-menuitem-link >> text=/.*${text}.*/`);
        }
    });
});