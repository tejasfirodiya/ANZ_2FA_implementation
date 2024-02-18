import { NgModule } from '@angular/core';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
    declarations: [MaintenanceComponent],
    imports: [AppSharedModule, AdminSharedModule, MaintenanceRoutingModule],
})
export class MaintenanceModule {}
