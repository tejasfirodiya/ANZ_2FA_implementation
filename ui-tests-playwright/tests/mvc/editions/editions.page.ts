import { BaseMvcPage } from "../../shared/base-page";

export class EditionsPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/Editions');
    }
}