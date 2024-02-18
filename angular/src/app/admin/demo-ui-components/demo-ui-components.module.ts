import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { DemoUIComponentsRoutingModule } from './demo-ui-components-routing.module';
import { DemoUiComponentsComponent } from './demo-ui-components.component';
import { DemoUiSelectionComponent } from './demo-ui-selection.component';
import { DemoUiInputMaskComponent } from './demo-ui-input-mask.component';
import { DemoUiFileUploadComponent } from './demo-ui-file-upload.component';
import { DemoUiEditorComponent } from './demo-ui-editor.component';
import { DemoUiDateTimeComponent } from './demo-ui-date-time.component';

@NgModule({
    declarations: [
        DemoUiComponentsComponent,
        DemoUiSelectionComponent,
        DemoUiInputMaskComponent,
        DemoUiFileUploadComponent,
        DemoUiEditorComponent,
        DemoUiDateTimeComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule, DemoUIComponentsRoutingModule],
})
export class DemoUIComponentsModule {}
