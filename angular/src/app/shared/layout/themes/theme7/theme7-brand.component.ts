import { Injector, Component, ViewEncapsulation, Inject, Input } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './theme7-brand.component.html',
    selector: 'theme7-brand',
    encapsulation: ViewEncapsulation.None,
})
export class Theme7BrandComponent extends AppComponentBase {
    skin = this.appSession.theme.baseSettings.layout.darkMode ? 'dark' : 'light';
    defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.skin + '-sm.svg';
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    @Input() imageClass = 'h-35px';

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }
}
