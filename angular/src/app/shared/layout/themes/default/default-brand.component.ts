import { Injector, Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './default-brand.component.html',
    selector: 'default-brand',
    encapsulation: ViewEncapsulation.None,
})
export class DefaultBrandComponent extends AppComponentBase {
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, @Inject(DOCUMENT) private document: Document) {
        super(injector);
    }

    getMenuSkin(): string {
        return this.appSession.theme.baseSettings.layout.darkMode || this.appSession.theme.baseSettings.menu.asideSkin == "dark" ? "dark" : "light";
    }
}
