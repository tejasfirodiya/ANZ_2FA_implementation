import { BaseMvcPage } from "../../shared/base-page";

export class VisualSettingsPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/UiCustomization');
    }
}