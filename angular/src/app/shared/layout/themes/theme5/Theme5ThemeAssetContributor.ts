import { IThemeAssetContributor } from '../ThemeAssetContributor';
import { AppConsts } from '@shared/AppConsts';
import { NameValuePair } from '@shared/utils/name-value-pair';

export class Theme5ThemeAssetContributor implements IThemeAssetContributor {
    public getAssetUrls(): string[] {
        return [AppConsts.appBaseUrl + '/assets/fonts/fonts-poppins.min.css'];
    }

    public getMenuWrapperStyle(): string {
        return '';
    }

    public getSubheaderStyle(): string {
        return 'subheader-title text-dark fw-bold my-1 me-3';
    }

    public getFooterStyle(): string {
        return 'footer pt-10 pb-5 d-flex flex-column flex-md-row flex-stack';
    }

    getBodyAttributes(): NameValuePair[] {
        return [];
    }

    getAppModuleBodyClass(): string {
        return 'header-fixed header-tablet-and-mobile-fixed aside-enabled sidebar-enabled';
    }
}
