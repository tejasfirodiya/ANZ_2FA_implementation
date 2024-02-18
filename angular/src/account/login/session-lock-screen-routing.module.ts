import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionLockScreenComponent } from '@account/login/session-lock-screen.component';

const routes: Routes = [
    {
        path: '',
        component: SessionLockScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SessionLockScreenRoutingModule {}
