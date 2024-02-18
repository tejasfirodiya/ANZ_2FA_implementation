import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebhookEventDetailComponent } from './webhook-event-detail.component';

const routes: Routes = [
    {
        path: '',
        component: WebhookEventDetailComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WebhookEventDetailRoutingModule {}
