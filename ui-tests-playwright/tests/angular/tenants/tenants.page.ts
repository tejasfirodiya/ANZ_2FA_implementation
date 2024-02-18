import { BaseAngularPage } from "../../shared/base-page";

export class TenantsPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/tenants');
    }
}