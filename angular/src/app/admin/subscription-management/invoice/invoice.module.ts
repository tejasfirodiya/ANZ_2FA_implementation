import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { InvoiceComponent } from './invoice.component';

@NgModule({
    declarations: [InvoiceComponent],
    imports: [AppSharedModule, AdminSharedModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
