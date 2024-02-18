import { Injector, Component, ViewEncapsulation, Inject, Input, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DOCUMENT } from '@angular/common';
import * as KTUtil from '@metronic/app/kt/_utils';

@Component({
    templateUrl: './default-logo.component.html',
    selector: 'default-logo',
    encapsulation: ViewEncapsulation.None,
})
export class DefaultLogoComponent extends AppComponentBase implements OnInit {
    @Input() customHrefClass = '';
    @Input() skin = null;

    defaultLogo = '';
    defaultSmallLogo = '';
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }

    ngOnInit(): void {
        this.setLogoUrl();
    }

    onResize() {
        this.setLogoUrl();
    }

    setLogoUrl(): void{
        this.defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.skin + '.svg';
        this.defaultSmallLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.skin + '-sm.svg';
    }
}
