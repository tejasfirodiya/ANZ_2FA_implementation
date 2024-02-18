import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripePaymentResultComponent } from './stripe-payment-result.component';

const routes: Routes = [
    {
        path: '',
        component: StripePaymentResultComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StripePaymentResultRoutingModule {}
