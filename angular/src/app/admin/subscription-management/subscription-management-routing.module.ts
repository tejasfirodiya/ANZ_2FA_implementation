import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionManagementComponent } from './subscription-management.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionManagementComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubscriptionManagementRoutingModule {}
