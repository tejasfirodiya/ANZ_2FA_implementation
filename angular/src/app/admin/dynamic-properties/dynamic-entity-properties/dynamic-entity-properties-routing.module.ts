import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDynamicEntityPropertyModalComponent } from './manage-dynamic-entity-property-modal.component';

const routes: Routes = [
    {
        path: '',
        component: ManageDynamicEntityPropertyModalComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DynamicEntityPropertiesRoutingModule {}
