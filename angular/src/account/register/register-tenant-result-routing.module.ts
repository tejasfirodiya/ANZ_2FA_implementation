import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTenantResultComponent } from './register-tenant-result.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterTenantResultComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterTenantResultRoutingModule {}
