import { NameValuePair } from '@shared/utils/name-value-pair';
import { IThemeAssetContributor } from '../ThemeAssetContributor';
import { ThemeHelper } from '../ThemeHelper';
import { AppConsts } from '@shared/AppConsts';

export class DefaultThemeAssetContributor implements IThemeAssetContributor {
    public getAssetUrls(): string[] {
        return [AppConsts.appBaseUrl + '/assets/fonts/fonts-poppins.min.css'];
    }

    public getMenuWrapperStyle(): string {
        return 'header-menu-wrapper header-menu-wrapper-left';
    }

    public getSubheaderStyle(): string {
        return 'text-dark fw-bold my-1 me-5';
    }

    public getFooterStyle(): string {
        return 'footer py-4 d-flex flex-lg-column';
    }

    getBodyAttributes(): NameValuePair[] {
        const skin = ThemeHelper.getAsideSkin();
        return [{
            name: 'data-kt-app-layout',
            value: skin + '-sidebar'
        }, {
            name: 'data-kt-app-header-fixed',
            value: ThemeHelper.getDesktopFixedHeader()
        },
        {
            name: 'data-kt-app-header-fixed-mobile',
            value: ThemeHelper.getMobileFixedHeader()
        },
        {
            name: 'data-kt-app-sidebar-enabled',
            value: 'true'
        },
        {
            name: 'data-kt-app-sidebar-fixed',
            value: ThemeHelper.getFixedAside()
        },
        {
            name: 'data-kt-app-sidebar-hoverable',
            value: ThemeHelper.getHoverableAside()
        },
        {
            name: 'data-kt-app-sidebar-push-header',
            value: 'true'
        },
        {
            name: 'data-kt-app-toolbar-enabled',
            value: 'true'
        },
        {
            name: 'data-kt-app-sidebar-push-toolbar',
            value: 'true'
        },
        {
            name: 'data-kt-app-sidebar-push-footer',
            value: 'true'
        },
        {
            name: 'data-kt-app-toolbar-enabled',
            value: 'true'
        },
        {
            name: 'data-kt-app-sidebar-minimize',
            value: ThemeHelper.getDefaultMinimizedAside() === 'true' ? 'on' : 'off'
        },{
            name: 'data-kt-app-toolbar-fixed',
            value: ThemeHelper.getDesktopFixedToolbar()
        },{
            name: 'data-kt-app-toolbar-fixed-mobile',
            value: ThemeHelper.getMobileFixedToolbar()
        }];
    }

    getAppModuleBodyClass(): string {
        return 'app-default';
    }
}
