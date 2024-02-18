import { IThemeAssetContributor } from '../ThemeAssetContributor';
import { AppConsts } from '@shared/AppConsts';
import { NameValuePair } from '@shared/utils/name-value-pair';

export class Theme3ThemeAssetContributor implements IThemeAssetContributor {
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
        return 'footer py-4 d-flex flex-lg-column';
    }

    getBodyAttributes(): NameValuePair[] {
        return [];
    }

    getAppModuleBodyClass(): string {
        return 'sidebar-enabled';
    }
}
