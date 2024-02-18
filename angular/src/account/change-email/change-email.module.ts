import { AccountSharedModule } from '@account/shared/account-shared.module';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ChangeEmailRoutingModule } from './change-email-routing.module';
import { ChangeEmailComponent } from './change-email.component';

@NgModule({
    declarations: [ChangeEmailComponent],
    imports: [AppSharedModule, AccountSharedModule, ChangeEmailRoutingModule],
})
export class ChangeEmailModule {}
