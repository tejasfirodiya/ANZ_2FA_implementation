import { BaseMvcPage } from "../../shared/base-page";

export class UsersPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/Users');
    }
}