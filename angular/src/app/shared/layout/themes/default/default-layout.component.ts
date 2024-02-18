import { Injector, Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@shared/AppConsts';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './default-layout.component.html',
    selector: 'default-layout',
    animations: [appModuleAnimation()],
})
export class DefaultLayoutComponent extends ThemesLayoutBaseComponent implements OnInit {

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(
        injector: Injector,
        _dateTimeService: DateTimeService,
        @Inject(DOCUMENT) private document: Document) {
        super(injector, _dateTimeService);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
        if (this.currentTheme.baseSettings.menu.defaultMinimizedAside) {
            this.document.body.setAttribute('data-kt-aside-minimize', 'on');
        }
    }

    getMobileMenuSkin(): string {
        return this.appSession.theme.baseSettings.layout.darkMode ? "dark" : "light";
    }
}
