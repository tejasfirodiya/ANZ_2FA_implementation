import { NgModule } from '@angular/core';
import { DynamicEntityPropertyValueModule } from '@app/admin/dynamic-properties/dynamic-entity-properties/value/dynamic-entity-property-value.module';
import { DynamicEntityPropertyManagerComponent } from './dynamic-entity-property-manager.component';

@NgModule({
    declarations: [DynamicEntityPropertyManagerComponent],
    imports: [DynamicEntityPropertyValueModule],
    exports: [DynamicEntityPropertyValueModule, DynamicEntityPropertyManagerComponent],
})
export class DynamicEntityPropertyManagerModule {}
