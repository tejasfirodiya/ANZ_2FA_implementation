import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { BuyRoutingModule } from './buy-routing.module';
import { BuyEditionComponent } from './buy.component';

@NgModule({
    declarations: [BuyEditionComponent],
    imports: [AppSharedModule, AccountSharedModule, BuyRoutingModule],
})
export class BuyModule {}
