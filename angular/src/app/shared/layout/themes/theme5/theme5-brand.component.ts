import { Injector, Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './theme5-brand.component.html',
    selector: 'theme5-brand',
    encapsulation: ViewEncapsulation.None,
})
export class Theme5BrandComponent extends AppComponentBase implements OnInit {
    defaultLogo = '';
    skin = this.currentTheme.baseSettings.layout.darkMode ? 'dark' : 'light';
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }

    ngOnInit(): void {
        this.defaultLogo =
        AppConsts.appBaseUrl +
        '/assets/common/images/app-logo-on-' + this.skin + '.svg';
    }

}
