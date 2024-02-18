import { BaseAngularPage } from "../../shared/base-page";

export class AuditLogsPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/auditLogs');
    }
}