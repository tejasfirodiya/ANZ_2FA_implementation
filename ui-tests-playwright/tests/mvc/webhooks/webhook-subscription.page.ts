import { BaseMvcPage } from "../../shared/base-page";

export class WebhookSubscriptionPage extends BaseMvcPage {

    async gotoPage() {
        await this.gotoUrl('/App/WebhookSubscription');
    }
}