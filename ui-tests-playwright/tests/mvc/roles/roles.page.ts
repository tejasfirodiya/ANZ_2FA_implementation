import { BaseMvcPage } from "../../shared/base-page";

export class RolesPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/Roles');
    }
}