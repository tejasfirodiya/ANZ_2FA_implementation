import { NgModule } from '@angular/core';
import { HostSettingsRoutingModule } from './host-settings-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { HostSettingsComponent } from './host-settings.component';

@NgModule({
    declarations: [HostSettingsComponent],
    imports: [AppSharedModule, AdminSharedModule, HostSettingsRoutingModule],
})
export class HostSettingsModule {}
