import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectEditionComponent } from './select-edition.component';

const routes: Routes = [
    {
        path: '',
        component: SelectEditionComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SelectEditionRoutingModule {}
