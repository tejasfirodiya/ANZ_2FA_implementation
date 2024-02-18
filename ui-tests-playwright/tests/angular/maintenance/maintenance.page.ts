import { BaseAngularPage } from "../../shared/base-page";

export class MaintenancePage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/maintenance');
    }
}