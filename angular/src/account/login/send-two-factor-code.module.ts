import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { SendTwoFactorCodeRoutingModule } from './send-two-factor-code-routing.module';
import { SendTwoFactorCodeComponent } from './send-two-factor-code.component';

@NgModule({
    declarations: [SendTwoFactorCodeComponent],
    imports: [AppSharedModule, AccountSharedModule, SendTwoFactorCodeRoutingModule],
})
export class SendTwoFactorCodeModule {}
