import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { DynamicPropertiesRoutingModule } from './dynamic-properties-routing.module';
import { DynamicPropertyComponent } from './dynamic-property.component';
import { DynamicPropertyValueModalComponent } from './dynamic-property-value/dynamic-property-value-modal.component';
import { CreateOrEditDynamicPropertyModalComponent } from './create-or-edit-dynamic-property-modal.component';
import { DynamicEntityPropertyListComponent } from './dynamic-entity-properties/dynamic-entity-property-list.component';
import { SelectAnEntityModalComponent } from './select-an-entity-modal.component';
import { DynamicEntityPropertiesModule } from './dynamic-entity-properties/dynamic-entity-properties.module';

@NgModule({
    declarations: [
        DynamicPropertyComponent,
        DynamicPropertyValueModalComponent,
        CreateOrEditDynamicPropertyModalComponent,
        DynamicEntityPropertyListComponent,
        SelectAnEntityModalComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule, DynamicPropertiesRoutingModule, DynamicEntityPropertiesModule],
})
export class DynamicPropertiesModule {}
