import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyEditionComponent } from './buy.component';

const routes: Routes = [
    {
        path: '',
        component: BuyEditionComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BuyRoutingModule {}
