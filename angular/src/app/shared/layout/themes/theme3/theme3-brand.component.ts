import { Injector, Component, ViewEncapsulation, Inject, Input, OnInit } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './theme3-brand.component.html',
    selector: 'theme3-brand',
    encapsulation: ViewEncapsulation.None,
})
export class Theme3BrandComponent extends AppComponentBase implements OnInit {
    @Input() logoSize = '';

    defaultLogo = '';
    skin = this.currentTheme.baseSettings.layout.darkMode ? 'dark' : 'light';
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }

    ngOnInit(): void {
        this.defaultLogo =
            AppConsts.appBaseUrl +
            '/assets/common/images/app-logo-on-' + this.skin +
            (this.logoSize ? '-' + this.logoSize : '') +
            '.svg';
    }

    clickTopbarToggle(): void {
        this.document.body.classList.toggle('topbar-mobile-on');
    }

    clickLeftAsideHideToggle(): void {
        this.document.body.classList.toggle('header-menu-wrapper-on');
    }
}
