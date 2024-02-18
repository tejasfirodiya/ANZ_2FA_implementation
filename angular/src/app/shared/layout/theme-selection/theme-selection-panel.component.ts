import { Component, Injector, ViewEncapsulation, ElementRef, HostBinding, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UiCustomizationSettingsServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './theme-selection-panel.component.html',
    selector: 'theme-selection-panel',
    styleUrls: ['./theme-selection-panel.less'],
    encapsulation: ViewEncapsulation.None,
})
export class ThemeSelectionPanelComponent extends AppComponentBase implements OnInit {
    currentThemeName = '';

    constructor(injector: Injector, private _uiCustomizationService: UiCustomizationSettingsServiceProxy) {
        super(injector);
    }

    ngOnInit() {
        this.currentThemeName = this.currentTheme.baseSettings.theme;
    }

    getLocalizedThemeName(str: string): string {
        return this.l('Theme_' + abp.utils.toPascalCase(str));
    }

    changeTheme(themeName: string) {
        this._uiCustomizationService.changeThemeWithDefaultValues(themeName).subscribe(() => {
            window.location.reload();
        });
    }
}
