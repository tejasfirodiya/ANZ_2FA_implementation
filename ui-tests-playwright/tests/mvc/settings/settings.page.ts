import { BaseMvcPage } from "../../shared/base-page";

export class SettingsPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/HostSettings');
    }
}