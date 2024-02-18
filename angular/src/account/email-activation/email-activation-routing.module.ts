import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailActivationComponent } from './email-activation.component';

const routes: Routes = [
    {
        path: '',
        component: EmailActivationComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmailActivationRoutingModule {}
