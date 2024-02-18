import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCompletedComponent } from './payment-completed.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentCompletedComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaymentCompletedRoutingModule {}
