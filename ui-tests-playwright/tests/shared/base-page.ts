import { Page, Response } from '@playwright/test';

export class BasePage {
    constructor(public page: Page) {
    }

    protected goto(url: string) {
        return this.page.goto(url);
    }

    wait(timeout: number) {
        this.page.waitForTimeout(timeout);
    }

    clickByText(text: string) {
        return this.page.click(`text=/.*${text}.*/`);
    }

    clickByTextExact(text: string) {
        return this.page.click(`text=/\s*${text}\s*/`);
    }

    protected clickByPlainTextExact(text: string) {
        return this.page.click(`text=${text}`);
    }

    clickButtonByText(text: string) {
        return this.page.click(`css=button >> text=/.*${text}.*/`);
    }

    async clickLinkByText(text: string) {
        return this.page.click(`css=a >> text=/.*${text}.*/`);
    }

    protected clickSubmitButton() {
        return this.page.click('button[type="submit"]');
    }

    protected clickSubmitButtonWithin(selector: string) {
        return this.page.click(`css=${selector} >> css=button[type="submit"]`);
    }

    clickButtonByTextWithin(selector: string, text: string) {
        return this.page.click(`css=${selector} >> css=button >> text=/.*${text}.*/`);
    }

    clickLinkByTextWithin(selector: string, text: string) {
        return this.page.click(`css=${selector} >> css=a >> text=/.*${text}.*/`);
    }

    clickByTextWithin(selector: string, text: string) {
        return this.page.click(`css=${selector} >> text=/.*${text}.*/`);
    }

    async cancelForm() {
        await this.page.click('css=button >> text=Cancel');
    }

    public async saveForm() {
        await this.page.waitForSelector('text=/.*Save.*/');
        await this.page.click('text=/.*Save.*/');
    }

    async saveModal(selector = '.modal') {
        await this.clickButtonByTextWithin(selector, 'Save');
    }

    async saveFormWithin(selector: string) {
        await this.page.click(`css = ${selector} >> text=/.*Save.*/`);
    }

    async clickButtonAndWaitForNavigation(buttonText: string) {
        await Promise.all([this.clickButtonByText(buttonText), this.page.waitForNavigation()]);
    }

    protected generateUniqueNumber() {
        return Math.floor(Date.now() / 1000);
    }

    async clickLabel(id: string) {
        return this.page.click(`css = label[for="${id}"]`);
    }

    async disableTransitions() {
        await this.page.addStyleTag({
            content: `*, *::before, *::after { transition: none!important; animation: none !important; }`,
        });
    }

    async reload(page: Page) {
        await page.reload({
            waitUntil: 'domcontentloaded',
        });
        await this.disableTransitions();
        await this.replaceFooterWith();
    }

    async replaceFooterWith(placeholder = 'FOOTER-PLACEHOLDER') {
        return this.replaceWith('#kt_footer', placeholder);
    }

    async replaceWith(selector: string, innerHTML = 'REPLACED') {
        const content = `
        (function(){
          const item = document.querySelector('${selector}');
          if (item) {
            item.innerText = '${innerHTML}';
          }
        })()
        `;
        return this.page.addScriptTag({
            content,
            type: 'module',
        });
    }

    async clickWithQuerySelector(selector: string) {
        const content = `
        (function(){
          const item = document.querySelector('${selector}');
          if (item) {
            item.click();
          }
        })()
        `;
        return this.page.addScriptTag({
            content,
            type: 'module',
        });
    }

    async triggerValidation(firstSelector: string, ...selectors: string[]) {
        for (const selector of [firstSelector, ...selectors]) {
            /* eslint-disable no-await-in-loop */
            await this.page.press(selector, 'Tab');
            await this.page.focus(selector);
            /* eslint-enable no-await-in-loop */
        }
    }

    async openActionsDropdown(rowNumber = 1, tableCssSelector = '') {
        if (!tableCssSelector) {
            await this.page.click(`xpath=//tbody//tr[${rowNumber}] >> text=/.*Actions.*/`);
        } else {
            await this.page.click(`css=${tableCssSelector} >> xpath=//tbody//tr[${rowNumber}] >> text=/.*Actions.*/`);
        }
    }

    async replaceNthColoumnOfTable(coloumnNumber: number, placeholder = 'REPLACED') {
        const content = `
        (function(){
          var list = document.querySelectorAll("tr > td:nth-child(${coloumnNumber})");
          if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
              list[i].innerText = '${placeholder}';
            }
          }
        })()
        `;
        return this.page.addScriptTag({
            content,
            type: 'module',
        });
    }

    async replaceLastColoumnOfTable(placeholder = 'REPLACED') {
        const content = `
        (function(){
          var list = document.querySelectorAll("tr > td:last-of-type");
          if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
              list[i].innerText = '${placeholder}';
            }
          }
        })()
        `;
        return this.page.addScriptTag({
            content,
            type: 'module',
        });
    }

    async fillInputs(inputs: { [key: string]: string }) {
        for (let key in inputs) {
            await this.page.fill(key, inputs[key]);
            await this.page.waitForTimeout(500);
        }
    }

    async clearInputs(...selectors: string[]) {
        for (let key of selectors) {
            await this.page.click(key);
            await this.page.keyboard.down('Control');
            await this.page.keyboard.press('A');
            await this.page.keyboard.up('Control');
            await this.page.press(key, 'Backspace');

            await this.page.waitForTimeout(500);
        }
    }

    async selectOptionByLabel(key: string, label: string) {
        await this.page.selectOption(key, { label });
    }

    async selectOptionByValue(key: string, value: any) {
        await this.page.selectOption(key, { value });
    }

    async replaceCellsWithinTable(...columnIndexesToReplace: number[]) {
        const content = `
    (function(){
      document.querySelectorAll('datatable-body-row').forEach(item => {
        [${columnIndexesToReplace}].forEach(columnIndex => {
          item.querySelectorAll('datatable-body-cell')[columnIndex].innerHTML = 'REPLACED'
        })
        })
    })()
    `;

        return this.page.addScriptTag({
            content,
            type: 'module',
        });
    }

    async hideTableRowsExcept(count = 1) {
        const content = `
    (function(){
      const rows = Array.from(document.querySelectorAll('datatable-row-wrapper'));
      rows.slice(${count}, rows.length).forEach(row => {
        row.parentElement.removeChild(row);
      })
  
      document.querySelector('datatable-footer').style.display = 'none'
    })()
    `;

        return this.page.addScriptTag({
            content,
            type: 'module',
        });
    }

    async triggerDropdownAction(actionText: string) {
        await this.page.click(`css=.dropdown-menu.show >> text=/.*${actionText}.*/`);
    }

    confirmConfirmation() {
        return this.page.click('.swal2-confirm');
    }

    cancelConfirmation() {
        return this.page.click('.swal2-cancel');
    }

    async clickMenu(...menuItems: string[]) {
        const { width } = this.page.viewportSize() as { width: number };
        // mobile or tablet
        if (width < 992) {
            await this.page.click('css=button#kt_aside_mobile_toggle');
        }
        await this.disableTransitions();
        const menuClicks = menuItems.map(menuItem => this.page.click(`css=.menu-title  >> text="${menuItem}"`));
        await Promise.all([this.page.waitForNavigation(), menuClicks]);
        await this.disableTransitions();
        await this.replaceFooterWith();
    }

    async waitForResponse(apiName = '/api/') {
        const response = await this.page.waitForResponse((resp: Response) => resp.url().includes(apiName));
        await this.page.waitForTimeout(500);
        return response;
    }
}

export class BaseAngularPage extends BasePage {

    BASE_URL = process.env.ANGULAR_APP_URL;

    constructor(public page: Page) {
        super(page);
    }

    async gotoUrl(url: string) {
        await this.page.goto(this.BASE_URL + url);
    }

    async waitForConfirmationDialog(state: Visibility = 'visible') {
        await this.page.waitForSelector('.swal2-confirm', { state });
    }

    async waitForDropdownMenu(state: Visibility = 'visible') {
        await this.page.waitForSelector('.dropdown-menu.show', { state });
        await this.page.waitForTimeout(500);
    }

    async waitForModal(modalId: string, state: Visibility = 'visible') {
        await this.page.waitForSelector(`.modal[aria-labelledby=${modalId}].show`, { state });
        await this.page.waitForTimeout(1000);
    }

    async waitForTableContent(tableSelector = '.primeng-datatable-container', state: Visibility = 'visible') {
        await Promise.race([
            this.page.waitForSelector(`${tableSelector} .p-datatable-scrollable-body .p-datatable-tbody:first-of-type`, { state }),
            this.page.waitForSelector(`${tableSelector} .p-datatable-tbody:first-of-type`, { state }),
            this.page.waitForSelector(`${tableSelector} .primeng-no-data`, { state }),
        ]);
        await this.page.waitForTimeout(500);
    }
}

export class BaseMvcPage extends BasePage {

    BASE_URL = process.env.MVC_APP_URL;

    constructor(public page: Page) {
        super(page);
    }

    async gotoUrl(url: string) {
        await this.page.goto(this.BASE_URL + url);
    }

    async waitForConfirmationDialog(state: Visibility = 'visible') {
        // SWAL does not disappear
        await this.page.waitForSelector('.swal2-confirm', { state });
        await this.page.waitForTimeout(500);
    }

    async waitForDropdownMenu(tableCssSelector = '', state: Visibility = 'visible') {
        if (!tableCssSelector) {
            await this.page.waitForSelector('.dropdown-menu.show', { state });
            await this.page.waitForTimeout(500);
        } else {
            await this.page.waitForSelector(`css=${tableCssSelector} >> css=.dropdown-menu.show`, { state });
            await this.page.waitForTimeout(500);
        }
    }

    async waitForModal(state: Visibility = 'visible') {
        await this.page.waitForSelector('.modal', { state });
        await this.page.waitForTimeout(500);
    }

    async waitForModalContent(state: Visibility = 'visible') {
        await this.page.waitForSelector('.modal-content', { state });
        await this.page.waitForTimeout(500);
    }

    async waitForTableContent(tableCSSSelector = 'table', state: Visibility = 'visible') {
        await this.page.waitForSelector(`css=${tableCSSSelector} tbody >> xpath=//tr[1]`, { state });
        await this.page.waitForTimeout(500);
    }
}

type Visibility = 'hidden' | 'visible';