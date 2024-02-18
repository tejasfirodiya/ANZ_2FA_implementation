import { Injector, ElementRef, Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@shared/AppConsts';
import { DOCUMENT } from '@angular/common';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './theme5-layout.component.html',
    selector: 'theme5-layout',
    animations: [appModuleAnimation()],
})
export class Theme5LayoutComponent extends ThemesLayoutBaseComponent implements OnInit, AfterViewInit {
    @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;
    asideToggler;

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
        this.asideToggler = new KTOffcanvas(this.document.getElementById('kt_aside'), {
            overlay: true,
            baseClass: 'aside',
            toggleBy: ['kt_aside_toggle', 'kt_aside_tablet_and_mobile_toggle'],
        });
    }

    getAsideClass(): string {
        let cssClass = 'aside aside-' + this.currentTheme.baseSettings.menu.asideSkin;

        if (this.currentTheme.baseSettings.menu.hoverableAside) {
            return cssClass + ' aside-hoverable';
        }

        return cssClass;
    }
}
