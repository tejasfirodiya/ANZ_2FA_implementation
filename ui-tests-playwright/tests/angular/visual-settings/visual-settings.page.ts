import { BaseAngularPage } from "../../shared/base-page";

export class VisualSettingsPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/ui-customization');
    }
}