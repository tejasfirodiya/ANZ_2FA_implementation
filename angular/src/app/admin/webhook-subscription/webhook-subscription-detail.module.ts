import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { WebhookSubscriptionModule } from './webhook-subscription.module';
import { WebhookSubscriptionDetailRoutingModule } from './webhook-subscription-detail-routing.module';
import { WebhookSubscriptionDetailComponent } from './webhook-subscription-detail.component';

@NgModule({
    declarations: [WebhookSubscriptionDetailComponent],
    imports: [AppSharedModule, AdminSharedModule, WebhookSubscriptionDetailRoutingModule, WebhookSubscriptionModule],
})
export class WebhookSubscriptionDetailModule {}
