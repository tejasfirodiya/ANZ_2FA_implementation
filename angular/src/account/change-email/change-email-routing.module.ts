import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeEmailComponent } from './change-email.component';

const routes: Routes = [
    {
        path: '',
        component: ChangeEmailComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChangeEmailRoutingModule {}
