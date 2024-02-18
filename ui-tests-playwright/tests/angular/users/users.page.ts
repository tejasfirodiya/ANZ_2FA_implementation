import { BaseAngularPage } from "../../shared/base-page";

export class UsersPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/users');
    }
}