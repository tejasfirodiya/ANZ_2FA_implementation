import { NgModule } from '@angular/core';
import { RoleComboComponent } from '@app/admin/shared/role-combo.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PermissionTreeComponent } from '@app/admin/shared/permission-tree.component';
import { PermissionTreeModalComponent } from '@app/admin/shared/permission-tree-modal.component';
import { PermissionComboComponent } from '@app/admin/shared/permission-combo.component';
import { OrganizationUnitsTreeComponent } from '@app/admin/shared/organization-unit-tree.component';
import { FeatureTreeComponent } from '@app/admin/shared/feature-tree.component';
import { EditionComboComponent } from '@app/admin/shared/edition-combo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PerfectScrollbarModule } from '@craftsjs/perfect-scrollbar';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@shared/utils/utils.module';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { TableModule } from 'primeng/table';
import { DragDropModule } from 'primeng/dragdrop';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
 import { Angular2CountoModule } from '@awaismirza/angular2-counto';
import { IMaskModule } from 'angular-imask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DropdownModule } from 'primeng/dropdown';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadModule as PrimeNgFileUploadModule } from 'primeng/fileupload';
import { SubheaderModule } from '@app/shared/common/sub-header/subheader.module';

@NgModule({
    declarations: [
        RoleComboComponent,
        PermissionTreeComponent,
        PermissionTreeModalComponent,
        PermissionComboComponent,
        OrganizationUnitsTreeComponent,
        FeatureTreeComponent,
        EditionComboComponent,
    ],
    imports: [
        AppSharedModule,
        ReactiveFormsModule,
        TreeModule,
        TooltipModule,
        FormsModule,
        CommonModule,
        UtilsModule,
        AppCommonModule,
        TableModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        Angular2CountoModule,
        IMaskModule,
        ImageCropperModule,
        PerfectScrollbarModule,
        DropdownModule,
        AppBsModalModule,
        FileUploadModule,
        PrimeNgFileUploadModule,
        SubheaderModule,
    ],
    exports: [
        RoleComboComponent,
        PermissionTreeComponent,
        PermissionTreeModalComponent,
        PermissionComboComponent,
        OrganizationUnitsTreeComponent,
        FeatureTreeComponent,
        EditionComboComponent,
        UtilsModule,
        AppCommonModule,
        TableModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        Angular2CountoModule,
        IMaskModule, 
        ImageCropperModule,
        PerfectScrollbarModule,
        DropdownModule,
        AppBsModalModule,
        AppSharedModule,
        ReactiveFormsModule,
        TreeModule,
        TooltipModule,
        FormsModule,
        CommonModule,
        FileUploadModule,
        PrimeNgFileUploadModule,
        SubheaderModule,
    ],
})
export class AdminSharedModule {}
