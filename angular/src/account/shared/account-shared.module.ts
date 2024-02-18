import { NgModule } from '@angular/core';
import { TenantChangeComponent } from '@account/shared/tenant-change.component';
import { TenantChangeModalComponent } from '@account/shared/tenant-change-modal.component';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
    imports: [AppSharedModule],
    declarations: [TenantChangeComponent, TenantChangeModalComponent],
    exports: [TenantChangeComponent, TenantChangeModalComponent],
})
export class AccountSharedModule {}
