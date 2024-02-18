import { NgModule } from '@angular/core';
import { LoginAttemptsRoutingModule } from './login-attempts-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { LoginAttemptsComponent } from './login-attempts.component';
import { LoginResultTypeComboComponent } from './login-result-type.combo';

@NgModule({
    declarations: [LoginAttemptsComponent, LoginResultTypeComboComponent],
    imports: [AppSharedModule, AdminSharedModule, LoginAttemptsRoutingModule],
})
export class LoginAttemptsModule {}
