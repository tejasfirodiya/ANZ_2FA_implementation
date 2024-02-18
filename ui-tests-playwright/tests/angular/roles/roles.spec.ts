import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { RolesPage } from './roles.page';

test.describe('ROLES', () => {

    let rolesPage: RolesPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        rolesPage = new RolesPage(page);

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
        const ROLES_CRUD_LIST = 'roles.crud.010-list.png';
        const ROLES_CRUD_NEW_MODAL = 'roles.crud.020-new-modal.png';
        const ROLES_CRUD_VALIDATION_SHOW = 'roles.crud.030-validation-show.png';
        const ROLES_CRUD_VALIDATION_HIDE = 'roles.crud.040-validation-hide.png';
        const ROLES_CRUD_NEW_SAVE = 'roles.crud.050-new-save.png';
        const ROLES_CRUD_ALREADY_EXISTED = 'roles.crud.060-already-existed.png';
        const ROLES_CRUD_ACTIONS = 'roles.crud.070-actions.png';
        const ROLES_CRUD_EDIT_MODAL = 'roles.crud.080-edit-modal.png';
        const ROLES_CRUD_EDIT_SAVE = 'roles.crud.090-edit-save.png';
        const ROLES_CRUD_DELETE_WARNING = 'roles.crud.100-delete-warning.png';
        const ROLES_CRUD_DELETE_CANCEL = 'roles.crud.110-delete-cancel.png';
        const ROLES_CRUD_DELETE_CONFIRM = 'roles.crud.120-delete-confirm.png';

        /* Step  */
        test('should render the initial list', async () => {
            await rolesPage.gotoPage();
            await rolesPage.waitForTableContent();
            await rolesPage.replaceLastColoumnOfTable();

            await rolesPage.wait(1000);

            await expect(page).toHaveScreenshot(ROLES_CRUD_LIST);
        });

        /* Step 2 */
        test('should display modal on click to "New" button', async () => {
            await rolesPage.clickByTextExact('Create new role');
            await rolesPage.waitForModal('createOrEditModal');

            await expect(page).toHaveScreenshot(ROLES_CRUD_NEW_MODAL);
        });

        /* Step 3 */
        test('should show error when form is saved before required inputs are filled', async () => {
            await triggerValidation();

            await expect(page).toHaveScreenshot(ROLES_CRUD_VALIDATION_SHOW);
        });

        /* Step 4 */
        test('should hide error when form is properly filled', async () => {
            await fillInputsWithValidValues();
            await rolesPage.triggerValidation('#RoleDisplayName');

            await expect(page).toHaveScreenshot(ROLES_CRUD_VALIDATION_HIDE);
        });

        /* Step 5 */
        test('should save record when "Save" button is clicked', async () => {
            await rolesPage.saveForm();
            await rolesPage.waitForResponse();
            await rolesPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(ROLES_CRUD_NEW_SAVE);
        });

        /* Step 6 */
        test('should give an error when trying to create an existing item', async () => {
            await rolesPage.clickByTextExact('Create new role');
            await rolesPage.waitForModal('createOrEditModal');
            await fillInputsWithValidValues();
            await rolesPage.saveForm();
            await rolesPage.waitForResponse();

            await expect(page).toHaveScreenshot(ROLES_CRUD_ALREADY_EXISTED);
        });

        /* Step 7 */
        test('should display actions on click to "Actions" button', async () => {
            await rolesPage.confirmConfirmation();
            await rolesPage.clickButtonByText('Cancel');
            await rolesPage.openActionsDropdown(2);
            await rolesPage.waitForDropdownMenu();

            await expect(page).toHaveScreenshot(ROLES_CRUD_ACTIONS);
        });

        /* Step 8 */
        test('should display modal on click to "Edit" button', async () => {
            await rolesPage.triggerDropdownAction('Edit');
            await rolesPage.waitForModal('createOrEditModal');
            await rolesPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(ROLES_CRUD_EDIT_MODAL);
        });

        /* Step 9 */
        test('should save changes to record when "Save" button is clicked', async () => {
            await rolesPage.fillInputs({ '#RoleDisplayName': 'changed_name' });
            await rolesPage.saveForm();
            await rolesPage.waitForResponse();
            await rolesPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(ROLES_CRUD_EDIT_SAVE);
        });

        /* Step 10 */
        test('should display warning on click to "Delete" button', async () => {
            await rolesPage.openActionsDropdown(2);
            await rolesPage.waitForDropdownMenu();
            await rolesPage.triggerDropdownAction('Delete');
            await rolesPage.waitForConfirmationDialog();

            await expect(page).toHaveScreenshot(ROLES_CRUD_DELETE_WARNING);
        });

        /* Step 11 */
        test('should not delete record on click to "Cancel" button', async () => {
            await rolesPage.cancelConfirmation();

            await expect(page).toHaveScreenshot(ROLES_CRUD_DELETE_CANCEL);
        });

        /* Step 12 */
        test('should delete record on click to "Yes" button', async () => {
            await rolesPage.openActionsDropdown(2);
            await rolesPage.waitForDropdownMenu();
            await rolesPage.triggerDropdownAction('Delete');
            await rolesPage.waitForConfirmationDialog();
            await rolesPage.confirmConfirmation();
            await rolesPage.waitForResponse();
            await rolesPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(ROLES_CRUD_DELETE_CONFIRM);
        });

        async function triggerValidation() {
            await fillInputsWithValidValues();
            await rolesPage.clearInputs('#RoleDisplayName');
        }

        function fillInputsWithValidValues() {
            return rolesPage.fillInputs({
                '#RoleDisplayName': 'test'
            });
        }
    });
});