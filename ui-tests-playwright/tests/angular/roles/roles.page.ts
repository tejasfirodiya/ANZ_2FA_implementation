import { BaseAngularPage } from "../../shared/base-page";

export class RolesPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/roles');
    }
}