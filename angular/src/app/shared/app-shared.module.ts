import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { IMaskModule } from 'angular-imask';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PerfectScrollbarModule } from '@craftsjs/perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from './common/app-common.module';
import { ThemesLayoutBaseComponent } from './layout/themes/themes-layout-base.component';

const imports = [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule,
    TabsModule,
    BsDropdownModule,
    PopoverModule,
    BsDatepickerModule,
    AppCommonModule,
    FileUploadModule,
    AppRoutingModule,
    UtilsModule,
    ServiceProxyModule,
    TableModule,
    PaginatorModule,
    ProgressBarModule,
    PerfectScrollbarModule ,
    IMaskModule,
    ImageCropperModule,
    AutoCompleteModule,
    NgxSpinnerModule,
    AppBsModalModule,
];

@NgModule({
    imports: [...imports],
    exports: [...imports],
    declarations: [ThemesLayoutBaseComponent],
})
export class AppSharedModule {}
