import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { EditionsRoutingModule } from './editions-routing.module';
import { EditionsComponent } from './editions.component';
import { EditEditionModalComponent } from './edit-edition-modal.component';
import { CreateEditionModalComponent } from './create-edition-modal.component';
import { MoveTenantsToAnotherEditionModalComponent } from './move-tenants-to-another-edition-modal.component';

@NgModule({
    declarations: [
        EditionsComponent,
        EditEditionModalComponent,
        CreateEditionModalComponent,
        MoveTenantsToAnotherEditionModalComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule, EditionsRoutingModule],
})
export class EditionsModule {}
