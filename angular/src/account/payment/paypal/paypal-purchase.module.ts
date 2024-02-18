import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PaypalPurchaseRoutingModule } from './paypal-purchase-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { PayPalPurchaseComponent } from './paypal-purchase.component';

@NgModule({
    declarations: [PayPalPurchaseComponent],
    imports: [AppSharedModule, AccountSharedModule, PaypalPurchaseRoutingModule],
})
export class PaypalPurchaseModule {}
