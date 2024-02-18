import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { WebhookSubscriptionRoutingModule } from './webhook-subscription-routing.module';
import { CreateOrEditWebhookSubscriptionModalComponent } from './create-or-edit-webhook-subscription-modal.component';
import { WebhookSubscriptionComponent } from './webhook-subscription.component';

@NgModule({
    declarations: [CreateOrEditWebhookSubscriptionModalComponent, WebhookSubscriptionComponent],
    imports: [AppSharedModule, AdminSharedModule, WebhookSubscriptionRoutingModule],
    exports: [CreateOrEditWebhookSubscriptionModalComponent],
})
export class WebhookSubscriptionModule {}
