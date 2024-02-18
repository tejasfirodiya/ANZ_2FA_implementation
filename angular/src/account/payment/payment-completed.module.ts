import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PaymentCompletedRoutingModule } from './payment-completed-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { PaymentCompletedComponent } from './payment-completed.component';

@NgModule({
    declarations: [PaymentCompletedComponent],
    imports: [AppSharedModule, AccountSharedModule, PaymentCompletedRoutingModule],
})
export class PaymentCompletedModule {}
