import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTwoFactorCodeComponent } from './validate-two-factor-code.component';

const routes: Routes = [
    {
        path: '',
        component: ValidateTwoFactorCodeComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ValidateTwoFactorCodeRoutingModule {}
