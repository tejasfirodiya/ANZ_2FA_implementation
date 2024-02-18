import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtendEditionComponent } from './extend.component';

const routes: Routes = [
    {
        path: '',
        component: ExtendEditionComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExtendRoutingModule {}
