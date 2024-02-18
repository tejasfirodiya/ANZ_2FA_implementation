import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { StripeCancelPaymentRoutingModule } from './stripe-cancel-payment-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { StripeCancelPaymentComponent } from './stripe-cancel-payment.component';

@NgModule({
    declarations: [StripeCancelPaymentComponent],
    imports: [AppSharedModule, AccountSharedModule, StripeCancelPaymentRoutingModule],
})
export class StripeCancelPaymentModule {}
