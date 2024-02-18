import { Injector, Component, ViewEncapsulation, Inject, Input, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './theme6-brand.component.html',
    selector: 'theme6-brand',
    encapsulation: ViewEncapsulation.None,
})
export class Theme6BrandComponent extends AppComponentBase implements OnInit {
    @Input() anchorClass = 'd-flex align-items-center';
    @Input() skin = 'dark';
    @Input() imageClass = 'h-45px logo';

    defaultLogo = '';
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }

    ngOnInit(): void {
        this.defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.skin + '-sm.svg';
    }
}
