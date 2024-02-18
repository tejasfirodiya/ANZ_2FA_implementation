import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [AppSharedModule, AccountSharedModule, ResetPasswordRoutingModule],
})
export class ResetPasswordModule {}
