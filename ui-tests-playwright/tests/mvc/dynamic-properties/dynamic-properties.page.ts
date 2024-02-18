import { BaseMvcPage } from "../../shared/base-page";

export class DynamicPropertiesPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/DynamicProperty');
    }
}