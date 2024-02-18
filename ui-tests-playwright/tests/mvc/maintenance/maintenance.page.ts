import { BaseMvcPage } from "../../shared/base-page";

export class MaintenancePage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/Maintenance');
    }
}