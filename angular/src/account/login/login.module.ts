import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AccountSharedModule } from '@account/shared/account-shared.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [AppSharedModule, AccountSharedModule, LoginRoutingModule],
})
export class LoginModule {}
