import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeEditionComponent } from './upgrade.component';

const routes: Routes = [
    {
        path: '',
        component: UpgradeEditionComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UpgradeRoutingModule {}
