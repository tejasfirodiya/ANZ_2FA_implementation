import { BaseMvcPage } from "../../shared/base-page";

export class TenantsPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/Tenants');
    }
}