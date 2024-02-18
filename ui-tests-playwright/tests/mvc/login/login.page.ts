import { BaseMvcPage } from "../../shared/base-page";

export class LoginPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/Account/Login');
    }
}