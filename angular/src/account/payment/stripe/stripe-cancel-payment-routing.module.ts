import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripeCancelPaymentComponent } from './stripe-cancel-payment.component';

const routes: Routes = [
    {
        path: '',
        component: StripeCancelPaymentComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StripeCancelPaymentRoutingModule {}
