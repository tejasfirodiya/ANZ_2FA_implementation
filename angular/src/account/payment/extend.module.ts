import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ExtendRoutingModule } from './extend-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { ExtendEditionComponent } from './extend.component';

@NgModule({
    declarations: [ExtendEditionComponent],
    imports: [AppSharedModule, AccountSharedModule, ExtendRoutingModule],
})
export class ExtendModule {}
