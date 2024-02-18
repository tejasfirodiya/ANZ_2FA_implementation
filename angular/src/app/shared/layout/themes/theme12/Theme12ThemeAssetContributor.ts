import { AppConsts } from '@shared/AppConsts';
import { NameValuePair } from '@shared/utils/name-value-pair';
import { IThemeAssetContributor } from '../ThemeAssetContributor';

export class Theme12ThemeAssetContributor implements IThemeAssetContributor {
    public getAssetUrls(): string[] {
        return [AppConsts.appBaseUrl + '/assets/fonts/fonts-poppins.min.css'];
    }

    public getMenuWrapperStyle(): string {
        return 'header-menu-wrapper header-menu-wrapper-left';
    }

    public getSubheaderStyle(): string {
        return 'd-flex text-gray-900 fw-bolder my-1 fs-3';
    }

    public getFooterStyle(): string {
        return 'footer py-4 d-flex flex-lg-column';
    }

    getBodyAttributes(): NameValuePair[] {
        return [];
    }

    getAppModuleBodyClass(): string {
        return 'page-bg header-fixed header-tablet-and-mobile-fixed aside-enabled';
    }
}
