import { AccountSharedModule } from '@account/shared/account-shared.module';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';

@NgModule({
    declarations: [ConfirmEmailComponent],
    imports: [AppSharedModule, AccountSharedModule, ConfirmEmailRoutingModule],
})
export class EmailConfirmModule {}
