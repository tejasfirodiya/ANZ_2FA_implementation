import { PermissionCheckerService } from 'abp-ng2-module';
import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationCancel, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppMenu } from './app-menu';
import { AppNavigationService } from './app-navigation.service';
import * as objectPath from 'object-path';
import { filter } from 'rxjs/operators';
import { ThemeAssetContributorFactory } from '@shared/helpers/ThemeAssetContributorFactory';
import { MenuComponent, DrawerComponent, ToggleComponent, ScrollComponent } from '@metronic/app/kt/components';
import { FormattedStringValueExtracter } from '@shared/helpers/FormattedStringValueExtracter';

@Component({
    templateUrl: './top-bar-menu.component.html',
    selector: 'top-bar-menu',
    encapsulation: ViewEncapsulation.None,
})
export class TopBarMenuComponent extends AppComponentBase implements OnInit {
    menu: AppMenu = null;
    currentRouteUrl: any = '';
    menuDepth: 0;
    menuWrapperStyle = '';

    @Input() menuClass = 'menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch';

    constructor(
        injector: Injector,
        private router: Router,
        public permission: PermissionCheckerService,
        private _appNavigationService: AppNavigationService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.menu = this._appNavigationService.getMenu();
        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
        this.menuWrapperStyle = ThemeAssetContributorFactory.getCurrent().getMenuWrapperStyle();

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => (this.currentRouteUrl = this.router.url.split(/[?#]/)[0]));

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe((event) => {
                this.reinitializeMenu();
            });
    }

    reinitializeMenu(): void {
        this.menu = this._appNavigationService.getMenu();
        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];

        setTimeout(() => {
            MenuComponent.reinitialization();
            DrawerComponent.reinitialization();
            ToggleComponent.reinitialization();
            ScrollComponent.reinitialization();
        }, 50);
    }

    showMenuItem(menuItem): boolean {
        return this._appNavigationService.showMenuItem(menuItem);
    }

    getItemCssClasses(item, parentItem, depth) {
        let classes = 'menu-item';

        // custom class for menu item
        const customClass = objectPath.get(item, 'custom-class');
        if (customClass) {
            classes += ' ' + customClass;
        }

        if (this.isMenuItemIsActive(item)) {
            classes += ' show';
        }

        return classes;
    }

    getAnchorItemCssClasses(item, parentItem): string {
        let cssClasses = 'menu-link without-sub';

        return cssClasses;
    }

    getSubmenuCssClasses(item, parentItem, depth): string {
        return 'menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px';
    }

    isMenuItemIsActive(item): boolean {
        if (item.items.length) {
            return this.isMenuRootItemIsActive(item);
        }

        if (!item.route) {
            return false;
        }

        let urlTree = this.router.parseUrl(this.currentRouteUrl.replace(/\/$/, ''));
        let urlString = '/' + urlTree.root.children.primary.segments.map((segment) => segment.path).join('/');
        let exactMatch = urlString === item.route.replace(/\/$/, '');
        if (!exactMatch && item.routeTemplates) {
            for (let i = 0; i < item.routeTemplates.length; i++) {
                let result = new FormattedStringValueExtracter().Extract(urlString, item.routeTemplates[i]);
                if (result.IsMatch) {
                    return true;
                }
            }
        }
        return exactMatch;
    }

    isMenuRootItemIsActive(item): boolean {
        let result = false;

        for (const subItem of item.items) {
            result = this.isMenuItemIsActive(subItem);
            if (result) {
                return true;
            }
        }

        return false;
    }

    getItemAttrSubmenuToggle(menuItem, parentItem, depth) {
        if (depth && depth >= 1) {
            return 'hover';
        } else {
            return 'click';
        }
    }

    isMobileDevice(): any {
        return KTUtil.isMobileDevice();
    }
}
