import { NgModule } from '@angular/core';
import { RolesRoutingModule } from './roles-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RolesComponent } from './roles.component';
import { CreateOrEditRoleModalComponent } from './create-or-edit-role-modal.component';

@NgModule({
    declarations: [RolesComponent, CreateOrEditRoleModalComponent],
    imports: [AppSharedModule, AdminSharedModule, RolesRoutingModule],
})
export class RolesModule {}
