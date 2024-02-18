import { Injector, ElementRef, Component, OnInit, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@shared/AppConsts';
import { DOCUMENT } from '@angular/common';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './theme6-layout.component.html',
    selector: 'theme6-layout',
    animations: [appModuleAnimation()],
})
export class Theme6LayoutComponent extends ThemesLayoutBaseComponent implements OnInit {

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document, _dateTimeService: DateTimeService) {
        super(injector, _dateTimeService);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
    }
}
