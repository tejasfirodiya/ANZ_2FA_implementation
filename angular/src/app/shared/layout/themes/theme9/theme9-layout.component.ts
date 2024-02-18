import { Injector, ElementRef, Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@shared/AppConsts';
import { DOCUMENT } from '@angular/common';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './theme9-layout.component.html',
    selector: 'theme9-layout',
    animations: [appModuleAnimation()],
})
export class Theme9LayoutComponent extends ThemesLayoutBaseComponent implements OnInit, AfterViewInit {
    @ViewChild('kt_aside', { static: true }) kt_aside: ElementRef;
    @ViewChild('ktHeader', { static: false }) ktHeader: ElementRef;


    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;
    defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-dark-2.svg';

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
}
