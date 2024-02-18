import { AppConsts } from '@shared/AppConsts';
import { NameValuePair } from '@shared/utils/name-value-pair';
import { IThemeAssetContributor } from '../ThemeAssetContributor';

export class Theme11ThemeAssetContributor implements IThemeAssetContributor {
    public getAssetUrls(): string[] {
        return [AppConsts.appBaseUrl + '/assets/fonts/fonts-poppins.min.css'];
    }

    public getMenuWrapperStyle(): string {
        return '';
    }

    public getSubheaderStyle(): string {
        return 'text-dark fw-bold my-1 me-5 ms-5';
    }

    public getFooterStyle(): string {
        return 'footer py-4 d-flex flex-lg-column ';
    }

    getBodyAttributes(): NameValuePair[] {
        return [];
    }

    getAppModuleBodyClass(): string {
        return 'header-fixed header-tablet-and-mobile-fixed toolbar-enabled';
    }
}
