import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { TenantsPage } from './tenants.page';

test.describe('TENANTS', () => {
    let tenantsPage: TenantsPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        tenantsPage = new TenantsPage(page);

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
        const TENANTS_CRUD_LIST = 'tenants.crud.010-list.png';
        const TENANTS_CRUD_NEW_MODAL = 'tenants.crud.020-new-modal.png';
        const TENANTS_CRUD_VALIDATION_SHOW = 'tenants.crud.030-validation-show.png';
        const TENANTS_CRUD_VALIDATION_HIDE = 'tenants.crud.040-validation-hide.png';
        const TENANTS_CRUD_NEW_SAVE = 'tenants.crud.050-new-save.png';
        const TENANTS_CRUD_ALREADY_EXISTED = 'tenants.crud.060-already-existed.png';
        const TENANTS_CRUD_ACTIONS = 'tenants.crud.070-actions.png';
        const TENANTS_CRUD_EDIT_MODAL = 'tenants.crud.080-edit-modal.png';
        const TENANTS_CRUD_EDIT_SAVE = 'tenants.crud.090-edit-save.png';
        const TENANTS_CRUD_DELETE_WARNING = 'tenants.crud.100-delete-warning.png';
        const TENANTS_CRUD_DELETE_CANCEL = 'tenants.crud.110-delete-cancel.png';
        const TENANTS_CRUD_DELETE_CONFIRM = 'tenants.crud.120-delete-confirm.png';

        /* Step  */
        test('should render the initial list', async () => {
            await tenantsPage.gotoPage();
            await tenantsPage.replaceWith('.card-body form', 'FORM_REPLACED_DUE_TO_DATES')
            await tenantsPage.waitForTableContent();
            await tenantsPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_LIST);
        });

        /* Step 2 */
        test('should display modal on click to "New" button', async () => {
            await tenantsPage.clickByTextExact('Create new tenant');
            await tenantsPage.waitForModal();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_NEW_MODAL);
        });

        /* Step 3 */
        test('should show error when form is saved before required inputs are filled', async () => {
            await tenantsPage.clickWithQuerySelector('#CreateTenant_SetRandomPassword');
            await triggerValidation();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_VALIDATION_SHOW);
        });

        /* Step 4 */
        test('should hide error when form is properly filled', async () => {
            await fillInputsWithValidValues();

            await tenantsPage.triggerValidation('#TenancyName', '#Name', '#AdminEmailAddress', '#CreateTenant_AdminPassword', '#AdminPasswordRepeat');

            await expect(page).toHaveScreenshot(TENANTS_CRUD_VALIDATION_HIDE);
        });

        /* Step 5 */
        test('should save record when "Save" button is clicked', async () => {
            await tenantsPage.saveForm();
            await tenantsPage.waitForResponse();
            await tenantsPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_NEW_SAVE);
        });

        /* Step 6 */
        test('should give an error when trying to create an existing item', async () => {
            await tenantsPage.clickByTextExact('Create new tenant');
            await tenantsPage.waitForModal();
            await tenantsPage.clickWithQuerySelector('#CreateTenant_SetRandomPassword');
            await fillInputsWithValidValues();
            await page.waitForTimeout(5000);
            await tenantsPage.saveForm();
            await tenantsPage.waitForResponse();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_ALREADY_EXISTED);
        });

        /* Step 7 */
        test('should display actions on click to "Actions" button', async () => {
            await tenantsPage.confirmConfirmation();
            await page.waitForTimeout(5000);
            await clickWithJavascript("close-button");
            await tenantsPage.openActionsDropdown(2);
            await tenantsPage.waitForDropdownMenu();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_ACTIONS);
        });

        // /* Step 8 */
        test('should display modal on click to "Edit" button', async () => {
            await tenantsPage.triggerDropdownAction('Edit');
            await tenantsPage.waitForResponse('EditModal');
            await tenantsPage.waitForModal();
            await tenantsPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_EDIT_MODAL);
        });

        /* Step 9 */
        test('should save changes to record when "Save" button is clicked', async () => {
            await tenantsPage.fillInputs({ '#Name': 'changed_name' });
            await tenantsPage.saveForm();
            await tenantsPage.waitForResponse();
            await tenantsPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_EDIT_SAVE);
        });

        /* Step 10 */
        test('should display warning on click to "Delete" button', async () => {
            await tenantsPage.openActionsDropdown(2);
            await tenantsPage.waitForDropdownMenu();
            await tenantsPage.triggerDropdownAction('Delete');
            await tenantsPage.waitForConfirmationDialog();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_DELETE_WARNING);
        });

        /* Step 11 */
        test('should not delete record on click to "Cancel" button', async () => {
            await tenantsPage.cancelConfirmation();
            
            await expect(page).toHaveScreenshot(TENANTS_CRUD_DELETE_CANCEL);
        });

        /* Step 12 */
        test('should delete record on click to "Yes" button', async () => {
            await tenantsPage.openActionsDropdown(2);
            await tenantsPage.waitForDropdownMenu();
            await tenantsPage.triggerDropdownAction('Delete');
            await tenantsPage.waitForConfirmationDialog();
            await tenantsPage.confirmConfirmation();
            await tenantsPage.waitForResponse();
            await tenantsPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(TENANTS_CRUD_DELETE_CONFIRM);
        });

        async function triggerValidation() {
            await fillInputsWithValidValues();
            await tenantsPage.clearInputs('#TenancyName', '#Name', '#AdminEmailAddress', '#CreateTenant_AdminPassword', '#AdminPasswordRepeat');
        }

        function fillInputsWithValidValues() {
            return tenantsPage.fillInputs({
                '#TenancyName': 'test',
                '#Name': 'test',
                '#AdminEmailAddress': 'test@test.com',
                '#CreateTenant_AdminPassword': '123qwe',
                '#AdminPasswordRepeat': '123qwe',
                '#AdminName': 'admin',
                '#AdminSurname': 'admin'
            });
        }

        function clickWithJavascript(className: string) {
            const content = `
            (function(){
                document.getElementsByClassName("${className}")[0].click();
            })()
            `;

            return page.addScriptTag({
                content,
                type: 'module',
            });
        }
    });
});