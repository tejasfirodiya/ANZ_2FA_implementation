import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendTwoFactorCodeComponent } from './send-two-factor-code.component';

const routes: Routes = [
    {
        path: '',
        component: SendTwoFactorCodeComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SendTwoFactorCodeRoutingModule {}
