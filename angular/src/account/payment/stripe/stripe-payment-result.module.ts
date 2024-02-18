import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { StripePaymentResultRoutingModule } from './stripe-payment-result-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { StripePaymentResultComponent } from './stripe-payment-result.component';

@NgModule({
    declarations: [StripePaymentResultComponent],
    imports: [AppSharedModule, AccountSharedModule, StripePaymentResultRoutingModule],
})
export class StripePaymentResultModule {}
