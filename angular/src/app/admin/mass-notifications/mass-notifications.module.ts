import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MassNotificationsComponent } from './mass-notifications.component';
import { MassNotificationsRoutingModule } from './mass-notifications-routing.module';
import { UserLookupTableModalComponent } from './user-lookup-table-modal.component';
import { OrganizationUnitLookupTableModalComponent } from './organization-unit-lookup-table-modal.component';
import { CreateMassNotificationModalComponent } from './create-mass-notification-modal.component';

@NgModule({
    declarations: [MassNotificationsComponent, UserLookupTableModalComponent, OrganizationUnitLookupTableModalComponent, CreateMassNotificationModalComponent],
    imports: [AppSharedModule, AdminSharedModule, MassNotificationsRoutingModule],
})
export class MassNotificationsModule {}
