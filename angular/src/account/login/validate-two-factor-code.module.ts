import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ValidateTwoFactorCodeRoutingModule } from './validate-two-factor-code-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { ValidateTwoFactorCodeComponent } from './validate-two-factor-code.component';

@NgModule({
    declarations: [ValidateTwoFactorCodeComponent],
    imports: [AppSharedModule, AccountSharedModule, ValidateTwoFactorCodeRoutingModule],
})
export class ValidateTwoFactorCodeModule {}
