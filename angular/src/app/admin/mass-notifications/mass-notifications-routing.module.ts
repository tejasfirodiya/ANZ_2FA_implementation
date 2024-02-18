import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MassNotificationsComponent } from './mass-notifications.component';

const routes: Routes = [
    {
        path: '',
        component: MassNotificationsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MassNotificationsRoutingModule {}
