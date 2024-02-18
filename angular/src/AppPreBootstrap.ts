import { CompilerOptions, NgModuleRef, Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { AppConsts } from '@shared/AppConsts';
import { UrlHelper } from './shared/helpers/UrlHelper';
import { XmlHttpRequestHelper } from '@shared/helpers/XmlHttpRequestHelper';
import { DynamicResourcesHelper } from '@shared/helpers/DynamicResourcesHelper';
import { environment } from './environments/environment';
import { LocaleMappingService } from '@shared/locale-mapping.service';
import { LocalStorageService } from '@shared/utils/local-storage.service';
import { merge as _merge } from 'lodash-es';
import { DateTime, Settings } from 'luxon';
import {
    AccountServiceProxy,
    IsTenantAvailableInput,
    IsTenantAvailableOutput,
    TenantAvailabilityState,
} from '@shared/service-proxies/service-proxies';
import { Injector } from '@angular/core';
import { SubdomainTenantResolver } from '@shared/multi-tenancy/tenant-resolvers/subdomain-tenant-resolver';
import { QueryStringTenantResolver } from '@shared/multi-tenancy/tenant-resolvers/query-string-tenant-resolver';
import { SubdomainTenancyNameFinder } from '@shared/helpers/SubdomainTenancyNameFinder';
import { CookieTenantResolver } from '@shared/multi-tenancy/tenant-resolvers/cookie-tenant-resolver';

export class AppPreBootstrap {
    static run(appRootUrl: string, injector: Injector, callback: () => void, resolve: any, reject: any): void {
        AppPreBootstrap.getApplicationConfig(appRootUrl, injector, () => {
            if (UrlHelper.isInstallUrl(location.href)) {
                AppPreBootstrap.loadAssetsForInstallPage(callback);
                return;
            }

            const queryStringObj = UrlHelper.getQueryParameters();

            if (queryStringObj.redirect && queryStringObj.redirect === 'TenantRegistration') {
                if (queryStringObj.forceNewRegistration) {
                    new AppAuthService().logout();
                }

                location.href = AppConsts.appBaseUrl + '/account/select-edition';
            } else if (queryStringObj.impersonationToken) {
                if (queryStringObj.userDelegationId) {
                    AppPreBootstrap.delegatedImpersonatedAuthenticate(
                        queryStringObj.userDelegationId,
                        queryStringObj.impersonationToken,
                        queryStringObj.tenantId,
                        () => {
                            AppPreBootstrap.getUserConfiguration(callback);
                        }
                    );
                } else {
                    AppPreBootstrap.impersonatedAuthenticate(
                        queryStringObj.impersonationToken,
                        queryStringObj.tenantId,
                        () => {
                            AppPreBootstrap.getUserConfiguration(callback);
                        }
                    );
                }
            } else if (queryStringObj.switchAccountToken) {
                AppPreBootstrap.linkedAccountAuthenticate(
                    queryStringObj.switchAccountToken,
                    queryStringObj.tenantId,
                    () => {
                        AppPreBootstrap.getUserConfiguration(callback);
                    }
                );
            } else {
                AppPreBootstrap.getUserConfiguration(callback);
            }
        });
    }

    static bootstrap<TM>(
        moduleType: Type<TM>,
        compilerOptions?: CompilerOptions | CompilerOptions[]
    ): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    private static getApplicationConfig(appRootUrl: string, injector: Injector, callback: () => void) {
        let type = 'GET';
        let url = appRootUrl + 'assets/' + environment.appConfig;
        let customHeaders = [
            {
                name: abp.multiTenancy.tenantIdCookieName,
                value: abp.multiTenancy.getTenantIdCookie() + '',
            },
        ];

        XmlHttpRequestHelper.ajax(type, url, customHeaders, null, (result) => {

            AppConsts.localeMappings = result.localeMappings;
            AppConsts.appBaseUrlFormat = result.appBaseUrl;
            AppConsts.remoteServiceBaseUrlFormat = result.remoteServiceBaseUrl;

            var tenancyName = AppPreBootstrap.resolveTenancyName(result.appBaseUrl);
            AppPreBootstrap.configureAppUrls(tenancyName, result.appBaseUrl, result.remoteServiceBaseUrl);

            if (AppConsts.PreventNotExistingTenantSubdomains) {
                var subdomainTenancyNameFinder = new SubdomainTenancyNameFinder();
                if (subdomainTenancyNameFinder.urlHasTenancyNamePlaceholder(result.remoteServiceBaseUrl)) {
                    const message = abp.localization.localize('ThereIsNoTenantDefinedWithName{0}', AppConsts.localization.defaultLocalizationSourceName);
                    abp.message.warn(abp.utils.formatString(message, tenancyName));
                    document.location.href = result.remoteServiceBaseUrl.replace(
                        AppConsts.tenancyNamePlaceHolderInUrl + '.',
                        ''
                    );
                    return;
                }
            }

            if (tenancyName == null) {
                callback();
            } else {
                AppPreBootstrap.ConfigureTenantIdCookie(injector, tenancyName, callback);
            }
        });
    }

    public static resolveTenancyName(appBaseUrl): string {
        var subdomainTenantResolver = new SubdomainTenantResolver();
        var tenancyName = subdomainTenantResolver.resolve(appBaseUrl);
        if (tenancyName) {
            return tenancyName;
        }

        var queryStringTenantResolver = new QueryStringTenantResolver();
        tenancyName = queryStringTenantResolver.resolve();
        if(tenancyName){
            abp.utils.setCookieValue('abp_tenancy_name', tenancyName);
            return tenancyName;
        }

        var cookieTenantResolver = new CookieTenantResolver();
        tenancyName = cookieTenantResolver.resolve();

        return tenancyName;
    }

    private static ConfigureTenantIdCookie(injector, tenancyName: string, callback: () => void) {

        let accountServiceProxy: AccountServiceProxy = injector.get(AccountServiceProxy);
        let input = new IsTenantAvailableInput();
        input.tenancyName = tenancyName;

        accountServiceProxy.isTenantAvailable(input).subscribe((result: IsTenantAvailableOutput) => {
            if (result.state === TenantAvailabilityState.Available) {
                abp.multiTenancy.setTenantIdCookie(result.tenantId);
            }

            callback();
        });
    }

    private static configureAppUrls(tenancyName: string, appBaseUrl: string, remoteServiceBaseUrl: string): void {
        if (tenancyName == null) {
            AppConsts.appBaseUrl = appBaseUrl.replace(AppConsts.tenancyNamePlaceHolderInUrl + '.', '');
            AppConsts.remoteServiceBaseUrl = remoteServiceBaseUrl.replace(
                AppConsts.tenancyNamePlaceHolderInUrl + '.',
                ''
            );
        } else {
            AppConsts.appBaseUrl = appBaseUrl.replace(AppConsts.tenancyNamePlaceHolderInUrl, tenancyName);
            AppConsts.remoteServiceBaseUrl = remoteServiceBaseUrl.replace(
                AppConsts.tenancyNamePlaceHolderInUrl,
                tenancyName
            );
        }
    }

    private static getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
        if (currentProviderName === 'unspecifiedClockProvider') {
            return abp.timing.unspecifiedClockProvider;
        }

        if (currentProviderName === 'utcClockProvider') {
            return abp.timing.utcClockProvider;
        }

        return abp.timing.localClockProvider;
    }

    private static getRequetHeadersWithDefaultValues() {
        const cookieLangValue = abp.utils.getCookieValue('Abp.Localization.CultureName');

        let requestHeaders = {
            '.AspNetCore.Culture': 'c=' + cookieLangValue + '|uic=' + cookieLangValue,
            [abp.multiTenancy.tenantIdCookieName]: abp.multiTenancy.getTenantIdCookie(),
        };

        if (!cookieLangValue) {
            delete requestHeaders['.AspNetCore.Culture'];
        }

        return requestHeaders;
    }

    private static impersonatedAuthenticate(impersonationToken: string, tenantId: number, callback: () => void): void {
        abp.multiTenancy.setTenantIdCookie(tenantId);
        let requestHeaders = AppPreBootstrap.getRequetHeadersWithDefaultValues();

        XmlHttpRequestHelper.ajax(
            'POST',
            AppConsts.remoteServiceBaseUrl +
            '/api/TokenAuth/ImpersonatedAuthenticate?impersonationToken=' +
            impersonationToken,
            requestHeaders,
            null,
            (response) => {
                let result = response.result;
                abp.auth.setToken(result.accessToken);
                AppPreBootstrap.setEncryptedTokenCookie(result.encryptedAccessToken, () => {
                    callback();
                    location.search = '';
                });
            }
        );
    }

    private static delegatedImpersonatedAuthenticate(
        userDelegationId: number,
        impersonationToken: string,
        tenantId: number,
        callback: () => void
    ): void {
        abp.multiTenancy.setTenantIdCookie(tenantId);
        let requestHeaders = AppPreBootstrap.getRequetHeadersWithDefaultValues();

        XmlHttpRequestHelper.ajax(
            'POST',
            AppConsts.remoteServiceBaseUrl +
            '/api/TokenAuth/DelegatedImpersonatedAuthenticate?userDelegationId=' +
            userDelegationId +
            '&impersonationToken=' +
            impersonationToken,
            requestHeaders,
            null,
            (response) => {
                let result = response.result;
                abp.auth.setToken(result.accessToken);
                AppPreBootstrap.setEncryptedTokenCookie(result.encryptedAccessToken, () => {
                    callback();
                    location.search = '';
                });
            }
        );
    }

    private static linkedAccountAuthenticate(switchAccountToken: string, tenantId: number, callback: () => void): void {
        abp.multiTenancy.setTenantIdCookie(tenantId);
        let requestHeaders = AppPreBootstrap.getRequetHeadersWithDefaultValues();

        XmlHttpRequestHelper.ajax(
            'POST',
            AppConsts.remoteServiceBaseUrl +
            '/api/TokenAuth/LinkedAccountAuthenticate?switchAccountToken=' +
            switchAccountToken,
            requestHeaders,
            null,
            (response) => {
                let result = response.result;
                abp.auth.setToken(result.accessToken);
                AppPreBootstrap.setEncryptedTokenCookie(result.encryptedAccessToken, () => {
                    callback();
                    location.search = '';
                });
            }
        );
    }

    private static getUserConfiguration(callback: () => void): any {
        const token = abp.auth.getToken();

        let requestHeaders = AppPreBootstrap.getRequetHeadersWithDefaultValues();

        if (token) {
            requestHeaders['Authorization'] = 'Bearer ' + token;
        }

        return XmlHttpRequestHelper.ajax(
            'GET',
            AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll',
            requestHeaders,
            null,
            (response) => {
                let result = response.result;

                _merge(abp, result);

                abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);

                AppPreBootstrap.configureLuxon();

                abp.event.trigger('abp.dynamicScriptsInitialized');

                AppConsts.recaptchaSiteKey = abp.setting.get('Recaptcha.SiteKey');
                AppConsts.subscriptionExpireNootifyDayCount = parseInt(
                    abp.setting.get('App.TenantManagement.SubscriptionExpireNotifyDayCount')
                );

                DynamicResourcesHelper.loadResources(callback);
            }
        );
    }

    private static configureLuxon() {
        let luxonLocale = new LocaleMappingService().map('luxon', abp.localization.currentLanguage.name);

        DateTime.local().setLocale(luxonLocale);
        DateTime.utc().setLocale(luxonLocale);
        Settings.defaultLocale = luxonLocale;

        if (abp.clock.provider.supportsMultipleTimezone) {
            Settings.defaultZone = abp.timing.timeZoneInfo.iana.timeZoneId;
        }

        DateTime.prototype.toJSON = function () {
            if (!abp.clock.provider.supportsMultipleTimezone) {
                let localDate = this.setLocale('en');
                return localDate.toString();
            }

            let date = this.setLocale('en').setZone(abp.timing.timeZoneInfo.iana.timeZoneId) as DateTime;
            return date.toISO();
        };
    }

    private static setEncryptedTokenCookie(encryptedToken: string, callback: () => void) {
        new LocalStorageService().setItem(
            AppConsts.authorization.encrptedAuthTokenName,
            {
                token: encryptedToken,
                expireDate: new Date(new Date().getTime() + 365 * 86400000), //1 year
            },
            callback
        );
    }

    private static loadAssetsForInstallPage(callback) {
        abp.setting.values['App.UiManagement.Theme'] = 'default';
        abp.setting.values['default.App.UiManagement.ThemeColor'] = 'default';

        DynamicResourcesHelper.loadResources(callback);
    }
}