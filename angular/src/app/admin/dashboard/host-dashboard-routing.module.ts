import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostDashboardComponent } from './host-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: HostDashboardComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HostDashboardRoutingModule {}
