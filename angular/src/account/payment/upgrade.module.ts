import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { UpgradeRoutingModule } from './upgrade-routing.module';
import { UpgradeEditionComponent } from './upgrade.component';

@NgModule({
    declarations: [UpgradeEditionComponent],
    imports: [AppSharedModule, AccountSharedModule, UpgradeRoutingModule],
})
export class UpgradeModule {}
