import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTenantComponent } from './register-tenant.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterTenantComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterTenantRoutingModule {}
