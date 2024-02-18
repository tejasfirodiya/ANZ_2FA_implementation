import { Injector, ElementRef, Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { DOCUMENT } from '@angular/common';
import { AppConsts } from '@shared/AppConsts';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './theme2-layout.component.html',
    selector: 'theme2-layout',
    animations: [appModuleAnimation()],
})
export class Theme2LayoutComponent extends ThemesLayoutBaseComponent implements OnInit, AfterViewInit {
    @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(
        injector: Injector,
        @Inject(DOCUMENT) private document: Document,
        _dateTimeService: DateTimeService
    ) {
        super(injector, _dateTimeService);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
    }

    ngAfterViewInit(): void {

    }

    toggleLeftAside(): void {
        this.document.body.classList.toggle('header-menu-wrapper-on');
        this.document.getElementById('kt_header_menu_wrapper').classList.toggle('header-menu-wrapper-on');
    }
}
