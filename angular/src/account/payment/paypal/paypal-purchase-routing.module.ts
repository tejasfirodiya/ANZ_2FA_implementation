import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayPalPurchaseComponent } from './paypal-purchase.component';

const routes: Routes = [
    {
        path: '',
        component: PayPalPurchaseComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaypalPurchaseRoutingModule {}
