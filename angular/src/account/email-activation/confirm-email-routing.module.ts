import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email.component';

const routes: Routes = [
    {
        path: '',
        component: ConfirmEmailComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConfirmEmailRoutingModule {}
