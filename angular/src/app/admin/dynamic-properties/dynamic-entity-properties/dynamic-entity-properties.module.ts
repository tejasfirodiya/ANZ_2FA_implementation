import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { DynamicEntityPropertiesRoutingModule } from './dynamic-entity-properties-routing.module';
import { ManageDynamicEntityPropertyModalComponent } from './manage-dynamic-entity-property-modal.component';
import { CreateDynamicEntityPropertyModalComponent } from './create-dynamic-entity-property-modal.component';

@NgModule({
    declarations: [ManageDynamicEntityPropertyModalComponent, CreateDynamicEntityPropertyModalComponent],
    exports: [ManageDynamicEntityPropertyModalComponent],
    imports: [AppSharedModule, AdminSharedModule, DynamicEntityPropertiesRoutingModule],
})
export class DynamicEntityPropertiesModule {}
