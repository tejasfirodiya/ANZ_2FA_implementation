import { NameValuePair } from "@shared/utils/name-value-pair";

export interface IThemeAssetContributor {
    getAssetUrls(): string[];
    getMenuWrapperStyle(): string;
    getFooterStyle(): string;
    getBodyAttributes():NameValuePair[];
    getAppModuleBodyClass():string;
}
