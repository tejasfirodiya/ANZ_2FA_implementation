import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { HostDashboardRoutingModule } from './host-dashboard-routing.module';
import { HostDashboardComponent } from './host-dashboard.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [HostDashboardComponent],
    imports: [AppSharedModule, AdminSharedModule, HostDashboardRoutingModule, CustomizableDashboardModule],
})
export class HostDashboardModule {}
