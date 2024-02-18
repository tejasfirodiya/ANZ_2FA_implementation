import { Injectable } from '@angular/core';
import { UiCustomizationSettingsDto } from '@shared/service-proxies/service-proxies';
import * as rtlDetect from 'rtl-detect';
import { ThemeAssetContributorFactory } from '@shared/helpers/ThemeAssetContributorFactory';

@Injectable()
export class AppUiCustomizationService {
    private _theme: UiCustomizationSettingsDto;

    init(theme: UiCustomizationSettingsDto): void {
        this._theme = theme;
    }

    getAppModuleBodyClass(): string {
        let assetContributor = ThemeAssetContributorFactory.getCurrent();
        return assetContributor.getAppModuleBodyClass();
    }

    getAppModuleBodyStyle(): string {
        return '--kt-toolbar-height:55px; --kt-toolbar-height-tablet-and-mobile:55px;';
    }

    getAccountModuleBodyClass() {
        return 'account header-fixed header-mobile-fixed subheader-fixed subheader-enabled subheader-solid aside-enabled aside-fixed page-loading';
    }

    getAccountModuleBodyStyle(): string {
        return '';
    }

    getSelectEditionBodyClass() {
        return 'skin-';
    }

    getLeftAsideClass(): string {
        let cssClass = 'aside aside-' + this._theme.baseSettings.menu.asideSkin;

        if (this._theme.baseSettings.menu.hoverableAside){
            cssClass += ' aside-hoverable';
        }

        if (this._theme.baseSettings.menu.submenuToggle === 'true') {
            cssClass += ' aside-menu-dropdown';
        }

        if (this._theme.baseSettings.menu.fixedAside && this._theme.baseSettings.menu.submenuToggle !== 'true') {
            cssClass += ' ps';
        }

        return cssClass;
    }

    getLeftAsideSubMenuStyles(): string {
        if (this._theme.baseSettings.menu.submenuToggle !== 'true') {
            return '';
        }
        return 'position: fixed; top:inherit';
    }

    isSubmenuToggleDropdown(): boolean {
        return this._theme.baseSettings.menu.submenuToggle === 'true';
    }

    getTopBarMenuContainerClass(): string {
        let menuCssClass =
            'header-bottom header-menu-skin-' +
            this._theme.baseSettings.menu.asideSkin +
            ' container container--full-height container-responsive';
        if (this._theme.baseSettings.layout.layoutType === 'boxed') {
            return menuCssClass + ' container-xxl';
        }

        return menuCssClass;
    }

    getIsMenuScrollable(): boolean {
        return this._theme.allowMenuScroll && this._theme.baseSettings.menu.fixedAside;
    }

    getSideBarMenuItemClass(item, isMenuActive) {
        let menuCssClass = 'menu-item';

        if (item.items.length) {
            menuCssClass += ' menu-item-submenu';
        }

        if (isMenuActive) {
            menuCssClass += ' menu-item-open menu-item-active';
        }

        return menuCssClass;
    }
}
