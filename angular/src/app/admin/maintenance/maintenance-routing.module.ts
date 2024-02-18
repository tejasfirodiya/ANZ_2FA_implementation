import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from '@app/admin/maintenance/maintenance.component';

const routes: Routes = [
    {
        path: '',
        component: MaintenanceComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
