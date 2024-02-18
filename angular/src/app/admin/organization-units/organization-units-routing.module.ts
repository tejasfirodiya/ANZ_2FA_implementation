import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationUnitsComponent } from '@app/admin/organization-units/organization-units.component';

const routes: Routes = [
    {
        path: '',
        component: OrganizationUnitsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationUnitsRoutingModule {}
