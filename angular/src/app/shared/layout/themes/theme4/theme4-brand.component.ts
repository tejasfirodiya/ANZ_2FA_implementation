import { Injector, Component, ViewEncapsulation, Inject, Input } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './theme4-brand.component.html',
    selector: 'theme4-brand',
    encapsulation: ViewEncapsulation.None,
})
export class Theme4BrandComponent extends AppComponentBase {
    @Input() skin = 'dark';
    @Input() customStyle = 'h-55px';

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }
}
