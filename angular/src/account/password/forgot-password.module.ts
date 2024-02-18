import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [AppSharedModule, AdminSharedModule, ForgotPasswordRoutingModule],
})
export class ForgotPasswordModule {}
