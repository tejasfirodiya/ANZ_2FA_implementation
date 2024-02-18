import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallComponent } from './install.component';

const routes: Routes = [
    {
        path: '',
        component: InstallComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InstallRoutingModule {}
