import { BaseAngularPage } from "../../shared/base-page";

export class EditionsPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/editions');
    }
}