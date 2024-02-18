import { BaseAngularPage } from "../../shared/base-page";

export class LanguagesPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/languages');
    }
}