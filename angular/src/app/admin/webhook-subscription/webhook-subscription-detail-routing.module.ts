import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebhookSubscriptionDetailComponent } from './webhook-subscription-detail.component';

const routes: Routes = [
    {
        path: '',
        component: WebhookSubscriptionDetailComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WebhookSubscriptionDetailRoutingModule {}
