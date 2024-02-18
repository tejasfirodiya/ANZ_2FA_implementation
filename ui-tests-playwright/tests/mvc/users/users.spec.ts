import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { UsersPage } from './users.page';

test.describe('USERS', () => {
    let usersPage: UsersPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        usersPage = new UsersPage(page);

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
        const USERS_CRUD_LIST = 'users.crud.010-list.png';
        const USERS_CRUD_NEW_MODAL = 'users.crud.020-new-modal.png';
        const USERS_CRUD_VALIDATION_SHOW = 'users.crud.030-validation-show.png';
        const USERS_CRUD_VALIDATION_HIDE = 'users.crud.040-validation-hide.png';
        const USERS_CRUD_NEW_SAVE = 'users.crud.050-new-save.png';
        const USERS_CRUD_ALREADY_EXISTED = 'users.crud.060-already-existed.png';
        const USERS_CRUD_ACTIONS = 'users.crud.070-actions.png';
        const USERS_CRUD_EDIT_MODAL = 'users.crud.080-edit-modal.png';
        const USERS_CRUD_EDIT_SAVE = 'users.crud.090-edit-save.png';
        const USERS_CRUD_DELETE_WARNING = 'users.crud.100-delete-warning.png';
        const USERS_CRUD_DELETE_CANCEL = 'users.crud.110-delete-cancel.png';
        const USERS_CRUD_DELETE_CONFIRM = 'users.crud.120-delete-confirm.png';

        /* Step 1 */
        test('should render the initial list', async () => {
            await usersPage.gotoPage();
            await usersPage.waitForTableContent();
            await usersPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(USERS_CRUD_LIST);
        });

        /* Step 2 */
        test('should display modal on click to "New" button', async () => {
            await usersPage.clickByTextExact('Create new user');
            await usersPage.waitForModal();

            await expect(page).toHaveScreenshot(USERS_CRUD_NEW_MODAL);
        });

        /* Step 3 */
        test('should show error when form is saved before required inputs are filled', async () => {
            await triggerValidation();

            await expect(page).toHaveScreenshot(USERS_CRUD_VALIDATION_SHOW);
        });

        /* Step 4 */
        test('should hide error when form is properly filled', async () => {
            await fillInputsWithValidValues();
            await usersPage.triggerValidation('#Name', '#Surname', '#EmailAddress', '#UserName');

            await expect(page).toHaveScreenshot(USERS_CRUD_VALIDATION_HIDE);
        });

        /* Step 5 */
        test('should save record when "Save" button is clicked', async () => {
            await usersPage.saveModal();
            await usersPage.waitForResponse();
            await usersPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(USERS_CRUD_NEW_SAVE);
        });

        /* Step 6 */
        test('should give an error when trying to create an existing item', async () => {
            await usersPage.clickByTextExact('Create new user');
            await usersPage.waitForModal();
            await fillInputsWithValidValues();
            await usersPage.wait(1000);
            await usersPage.saveModal();
            await usersPage.waitForResponse();

            await expect(page).toHaveScreenshot(USERS_CRUD_ALREADY_EXISTED);
        });

        /* Step 7 */
        test('should display actions on click to "Actions" button', async () => {
            await usersPage.confirmConfirmation();
            await usersPage.clickButtonByText('Cancel');
            await usersPage.openActionsDropdown(2);
            await usersPage.waitForDropdownMenu('#UsersTable');

            await expect(page).toHaveScreenshot(USERS_CRUD_ACTIONS);
        });

        /* Step 8 */
        test('should display modal on click to "Edit" button', async () => {
            await usersPage.triggerDropdownAction('Edit');
            await usersPage.waitForResponse('CreateOrEditModal');
            await usersPage.waitForModal();
            await usersPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(USERS_CRUD_EDIT_MODAL);
        });

        /* Step 9 */
        test('should save changes to record when "Save" button is clicked', async () => {
            await usersPage.fillInputs({ '#Name': 'changed_name' });
            await usersPage.saveModal();
            await usersPage.waitForResponse();
            await usersPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(USERS_CRUD_EDIT_SAVE);
        });

        /* Step 10 */
        test('should display warning on click to "Delete" button', async () => {
            await usersPage.openActionsDropdown(2);
            await usersPage.waitForDropdownMenu('#UsersTable');
            await usersPage.triggerDropdownAction('Delete');
            await usersPage.waitForConfirmationDialog();

            await expect(page).toHaveScreenshot(USERS_CRUD_DELETE_WARNING);
        });

        /* Step 11 */
        test('should not delete record on click to "Cancel" button', async () => {
            await usersPage.cancelConfirmation();
            
            await expect(page).toHaveScreenshot(USERS_CRUD_DELETE_CANCEL);
        });

        /* Step 12 */
        test('should delete record on click to "Yes" button', async () => {
            await usersPage.openActionsDropdown(2);
            await usersPage.waitForDropdownMenu('#UsersTable');
            await usersPage.triggerDropdownAction('Delete');
            await usersPage.waitForConfirmationDialog();
            await usersPage.confirmConfirmation();
            await usersPage.waitForResponse();
            await usersPage.replaceLastColoumnOfTable();

            await expect(page).toHaveScreenshot(USERS_CRUD_DELETE_CONFIRM);
        });

        async function triggerValidation() {
            await fillInputsWithValidValues();
            await usersPage.clearInputs('#Name', '#Surname', '#EmailAddress', '#UserName');
        }

        function fillInputsWithValidValues() {
            return usersPage.fillInputs({
                '#Name': 'test',
                '#Surname': 'test',
                '#EmailAddress': 'test@h.c',
                '#UserName': 'test',
            });
        }
    });
});