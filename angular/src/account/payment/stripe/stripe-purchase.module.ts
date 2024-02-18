import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { StripePurchaseRoutingModule } from './stripe-purchase-routing.module';
import { StripePurchaseComponent } from './stripe-purchase.component';

@NgModule({
    declarations: [StripePurchaseComponent],
    imports: [AppSharedModule, AccountSharedModule, StripePurchaseRoutingModule],
})
export class StripePurchaseModule {}
