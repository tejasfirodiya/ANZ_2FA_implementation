import { BaseAngularPage } from "../../shared/base-page";

export class OrganizationUnitPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/organization-units');
    }
}