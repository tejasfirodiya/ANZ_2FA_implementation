import { NgModule } from '@angular/core';
import { OrganizationUnitsRoutingModule } from './organization-units-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AddMemberModalComponent } from './add-member-modal.component';
import { AddRoleModalComponent } from './add-role-modal.component';
import { CreateOrEditUnitModalComponent } from './create-or-edit-unit-modal.component';
import { OrganizationTreeComponent } from './organization-tree.component';
import { OrganizationUnitMembersComponent } from './organization-unit-members.component';
import { OrganizationUnitRolesComponent } from './organization-unit-roles.component';
import { OrganizationUnitsComponent } from './organization-units.component';

@NgModule({
    declarations: [
        AddMemberModalComponent,
        AddRoleModalComponent,
        CreateOrEditUnitModalComponent,
        OrganizationTreeComponent,
        OrganizationUnitMembersComponent,
        OrganizationUnitRolesComponent,
        OrganizationUnitsComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule, OrganizationUnitsRoutingModule],
    exports: [AddMemberModalComponent, AddRoleModalComponent, OrganizationTreeComponent],
})
export class OrganizationUnitsModule {}
