import { BaseAngularPage } from "../../shared/base-page";

export class DynamicPropertiesPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/dynamic-property');
    }

    async openAddNewPropertyModal() {
        let text = 'Add New Dynamic Property';
        this.page.click(`text=/.*${text}.*/`)
    }

    async waitForCreateOrEditModal(){
        await this.waitForModal('createOrEditModal');
    }

    async triggerEditDropdown(){
        await this.triggerDropdownAction('Edit');
    }

    async triggerDeleteDropdown(){
        await this.triggerDropdownAction('Delete');
    }
}