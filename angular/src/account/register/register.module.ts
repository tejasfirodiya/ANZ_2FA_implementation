import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { RegisterComponent } from './register.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
    imports: [AppSharedModule, AccountSharedModule, RegisterRoutingModule, PasswordModule],
    declarations: [RegisterComponent],
})
export class RegisterModule {}
