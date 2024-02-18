import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebhookSubscriptionComponent } from './webhook-subscription.component';

const routes: Routes = [
    {
        path: '',
        component: WebhookSubscriptionComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WebhookSubscriptionRoutingModule {}
