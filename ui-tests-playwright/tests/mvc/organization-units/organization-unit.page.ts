import { BaseMvcPage } from "../../shared/base-page";

export class OrganizationUnitPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/OrganizationUnits');
    }
}