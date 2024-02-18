import { Login } from '../utils/login';
import { test, expect, Page } from '@playwright/test';
import { DynamicPropertiesPage } from './dynamic-properties.page';

test.describe('DYNAMICPROPERTIES', () => {

    let dynamicPropertiesPage: DynamicPropertiesPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        dynamicPropertiesPage = new DynamicPropertiesPage(page);

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

    test.describe('CRUD', async () => {
        const DYNAMICPROPERTIES_CRUD_LIST = 'dynamicProperties.crud.010-list.png';
        const DYNAMICPROPERTIES_CRUD_NEW_MODAL = 'dynamicProperties.crud.020-new-modal.png';
        const DYNAMICPROPERTIES_CRUD_NEW_SAVE = 'dynamicProperties.crud.050-new-save.png';
        const DYNAMICPROPERTIES_CRUD_ACTIONS = 'dynamicProperties.crud.070-actions.png';
        const DYNAMICPROPERTIES_CRUD_EDIT_MODAL = 'dynamicProperties.crud.080-edit-modal.png';
        const DYNAMICPROPERTIES_CRUD_EDIT_SAVE = 'dynamicProperties.crud.090-edit-save.png';
        const DYNAMICPROPERTIES_CRUD_DELETE_WARNING = 'dynamicProperties.crud.100-delete-warning.png';
        const DYNAMICPROPERTIES_CRUD_DELETE_CANCEL = 'dynamicProperties.crud.110-delete-cancel.png';
        const DYNAMICPROPERTIES_CRUD_DELETE_CONFIRM = 'dynamicProperties.crud.120-delete-confirm.png';

        /* Step 1 */
        test('should render the initial list', async () => {
            await dynamicPropertiesPage.gotoPage();
            await dynamicPropertiesPage.waitForTableContent();
            await expect(dynamicPropertiesPage.page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_LIST);
        });

        /* Step 2 */
        test('should display modal on click to "New" button', async () => {
            await dynamicPropertiesPage.openAddNewPropertyModal();
            await dynamicPropertiesPage.waitForCreateOrEditModal();

            await expect(dynamicPropertiesPage.page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_NEW_MODAL);
        });

        /* Step 3 */
        test('should save record when "Save" button is clicked', async () => {
            await dynamicPropertiesPage.fillInputs({ 'input[name=Name]': 'test' });
            await dynamicPropertiesPage.selectOptionByValue('.modal[aria-labelledby=createOrEditModal].show select', 'SINGLE_LINE_STRING');

            await dynamicPropertiesPage.saveForm();
            await dynamicPropertiesPage.waitForResponse();

            await expect(page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_NEW_SAVE);
        });

        /* Step 4 */
        test('should display actions on click to "Actions" button', async () => {
            await dynamicPropertiesPage.openActionsDropdown(1);
            await dynamicPropertiesPage.waitForDropdownMenu();

            await expect(page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_ACTIONS);
        });

        /* Step 5 */
        test('should display modal on click to "Edit" button', async () => {
            await dynamicPropertiesPage.triggerEditDropdown();
            await dynamicPropertiesPage.waitForCreateOrEditModal();

            await expect(page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_EDIT_MODAL);
        });

        /* Step 6 */
        test('should save changes to record when "Save" button is clicked', async () => {
            await dynamicPropertiesPage.fillInputs({ 'input[name=Name]': 'changed_name' });
            await dynamicPropertiesPage.saveForm();
            await dynamicPropertiesPage.waitForResponse();

            await expect(page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_EDIT_SAVE);
        });

        /* Step 7 */
        test('should display warning on click to "Delete" button', async () => {
            await dynamicPropertiesPage.openActionsDropdown(1);
            await dynamicPropertiesPage.waitForDropdownMenu();
            await dynamicPropertiesPage.triggerDeleteDropdown();
            await dynamicPropertiesPage.waitForConfirmationDialog();

            await expect(page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_DELETE_WARNING);
        });

        /* Step 8 */
        test('should not delete record on click to "Cancel" button', async () => {
            await dynamicPropertiesPage.cancelConfirmation();

            await expect(page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_DELETE_CANCEL);
        });

        /* Step 9 */
        test('should delete record on click to "Yes" button', async () => {
            await dynamicPropertiesPage.openActionsDropdown(1);
            await dynamicPropertiesPage.triggerDeleteDropdown();
            await dynamicPropertiesPage.waitForConfirmationDialog();
            await dynamicPropertiesPage.confirmConfirmation();
            await dynamicPropertiesPage.waitForResponse();

            await expect(page).toHaveScreenshot(DYNAMICPROPERTIES_CRUD_DELETE_CONFIRM);
        });
    });
});