import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { SelectEditionRoutingModule } from './select-edition-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { SelectEditionComponent } from './select-edition.component';

@NgModule({
    declarations: [SelectEditionComponent],
    imports: [AppSharedModule, AccountSharedModule, SelectEditionRoutingModule],
})
export class SelectEditionModule {}
