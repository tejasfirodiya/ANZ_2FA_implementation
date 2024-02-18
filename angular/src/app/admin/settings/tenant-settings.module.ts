import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { TenantSettingsRoutingModule } from './tenant-settings-routing.module';
import { TenantSettingsComponent } from '@app/admin/settings/tenant-settings.component';

@NgModule({
    declarations: [TenantSettingsComponent],
    imports: [AppSharedModule, AdminSharedModule, TenantSettingsRoutingModule],
})
export class TenantSettingsModule {}
