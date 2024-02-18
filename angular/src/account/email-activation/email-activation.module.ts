import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { EmailActivationRoutingModule } from './email-activation-routing.module';
import { EmailActivationComponent } from './email-activation.component';
import { AccountSharedModule } from '@account/shared/account-shared.module';

@NgModule({
    declarations: [EmailActivationComponent],
    imports: [AppSharedModule, AccountSharedModule, EmailActivationRoutingModule],
})
export class EmailActivationModule {}
