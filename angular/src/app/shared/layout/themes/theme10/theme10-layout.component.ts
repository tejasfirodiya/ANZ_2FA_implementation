import { Injector, ElementRef, Component, ViewChild, OnInit, AfterViewInit, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { AppConsts } from '@shared/AppConsts';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './theme10-layout.component.html',
    selector: 'theme10-layout',
    animations: [appModuleAnimation()],
})
export class Theme10LayoutComponent extends ThemesLayoutBaseComponent implements OnInit, AfterViewInit {
    @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, _dateTimeService: DateTimeService) {
        super(injector, _dateTimeService);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
    }

    ngAfterViewInit(): void {

    }
}
