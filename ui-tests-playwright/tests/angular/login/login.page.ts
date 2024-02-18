import { BaseAngularPage } from "../../shared/base-page";

export class LoginPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/account/login');
    }
}