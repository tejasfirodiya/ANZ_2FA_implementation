import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAttemptsComponent } from './login-attempts.component';

const routes: Routes = [
    {
        path: '',
        component: LoginAttemptsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginAttemptsRoutingModule {}
