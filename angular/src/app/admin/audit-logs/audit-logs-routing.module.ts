import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogsComponent } from './audit-logs.component';

const routes: Routes = [
    {
        path: '',
        component: AuditLogsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuditLogsRoutingModule {}
