import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionsComponent } from './editions.component';

const routes: Routes = [
    {
        path: '',
        component: EditionsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditionsRoutingModule {}
