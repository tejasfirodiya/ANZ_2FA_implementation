import { Injector, ElementRef, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@shared/AppConsts';
import { DOCUMENT } from '@angular/common';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './theme3-layout.component.html',
    selector: 'theme3-layout',
    animations: [appModuleAnimation()],
})
export class Theme3LayoutComponent extends ThemesLayoutBaseComponent implements OnInit {
    @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document, _dateTimeService: DateTimeService) {
        super(injector, _dateTimeService);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
        this.defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-light-sm.svg';
    }

    triggerAsideToggleClickEvent(): void {
        abp.event.trigger('app.kt_aside_toggler.onClick');
    }
}
