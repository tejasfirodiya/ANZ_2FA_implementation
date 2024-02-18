import { Injector, Component, ViewEncapsulation, Inject, Input } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './theme12-brand.component.html',
    selector: 'theme12-brand',
    encapsulation: ViewEncapsulation.None,
})
export class Theme12BrandComponent extends AppComponentBase {
    skin = this.appSession.theme.baseSettings.layout.darkMode ? 'dark' : 'light';
    defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.skin + '.svg';
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }
}
