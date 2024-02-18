import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { WebhookEventDetailComponent } from './webhook-event-detail.component';
import { WebhookEventDetailRoutingModule } from './webhook-event-detail-routing.module';
import { WebhookSubscriptionModule } from './webhook-subscription.module';

@NgModule({
    declarations: [WebhookEventDetailComponent],
    imports: [AppSharedModule, AdminSharedModule, WebhookEventDetailRoutingModule, WebhookSubscriptionModule],
})
export class WebhookEventDetailModule {}
