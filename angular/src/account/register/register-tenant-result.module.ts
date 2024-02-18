import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { RegisterTenantResultRoutingModule } from './register-tenant-result-routing.module';
import { RegisterTenantResultComponent } from './register-tenant-result.component';

@NgModule({
    imports: [AppSharedModule, AccountSharedModule, RegisterTenantResultRoutingModule],
    declarations: [RegisterTenantResultComponent],
})
export class RegisterTenantResultModule {}
