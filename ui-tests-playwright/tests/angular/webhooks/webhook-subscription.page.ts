import { BaseAngularPage } from "../../shared/base-page";

export class WebhookSubscriptionPage extends BaseAngularPage {

    async gotoPage() {
        await this.gotoUrl('/app/admin/webhook-subscriptions');
    }
}