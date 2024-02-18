import { BaseMvcPage } from "../../shared/base-page";

export class AuditLogsPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/AuditLogs');
    }
}