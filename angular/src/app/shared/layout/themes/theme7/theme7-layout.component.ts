import { Injector, Component, OnInit, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@shared/AppConsts';
import { DOCUMENT } from '@angular/common';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './theme7-layout.component.html',
    selector: 'theme7-layout',
    animations: [appModuleAnimation()],
})
export class Theme7LayoutComponent extends ThemesLayoutBaseComponent implements OnInit {

    asideToggler;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document, _dateTimeService: DateTimeService) {
        super(injector, _dateTimeService);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
        this.defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-dark-2.svg';
        this.asideToggler = new KTOffcanvas(this.document.getElementById('kt_header_navs'), {
            overlay: true,
            baseClass: 'header-navs',
            toggleBy: 'kt_header_mobile_toggle',
        });
    }
}
