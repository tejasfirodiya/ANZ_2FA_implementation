import { NgModule } from '@angular/core';
import { LanguagesRoutingModules } from './languages-routing-modules.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { LanguagesComponent } from './languages.component';
import { CreateOrEditLanguageModalComponent } from './create-or-edit-language-modal.component';

@NgModule({
    declarations: [LanguagesComponent, CreateOrEditLanguageModalComponent],
    imports: [AppSharedModule, AdminSharedModule, LanguagesRoutingModules],
})
export class LanguagesModule {}
