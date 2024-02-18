import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostSettingsComponent } from '@app/admin/settings/host-settings.component';

const routes: Routes = [
    {
        path: '',
        component: HostSettingsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HostSettingsRoutingModule {}
