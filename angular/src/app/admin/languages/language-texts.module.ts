import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { LanguageTextsComponent } from './language-texts.component';
import { EditTextModalComponent } from './edit-text-modal.component';
import { LanguageTextsRoutingModules } from './language-texts-routing-modules.module';

@NgModule({
    declarations: [LanguageTextsComponent, EditTextModalComponent],
    imports: [AppSharedModule, AdminSharedModule, LanguageTextsRoutingModules],
})
export class LanguageTextsModule {}
