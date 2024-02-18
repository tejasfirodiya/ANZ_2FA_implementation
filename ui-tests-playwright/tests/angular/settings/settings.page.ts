import { BaseAngularPage } from "../../shared/base-page";

export class SettingsPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/hostSettings');
    }
}