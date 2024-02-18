import {
    PermissionCheckerService,
    FeatureCheckerService,
    LocalizationService,
    MessageService,
    AbpMultiTenancyService,
    NotifyService,
    SettingService,
} from 'abp-ng2-module';
import { Component, Injector, OnDestroy } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppUrlService } from '@shared/common/nav/app-url.service';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { AppUiCustomizationService } from '@shared/common/ui/app-ui-customization.service';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
import { UiCustomizationSettingsDto } from '@shared/service-proxies/service-proxies';
import '@shared/service-proxies/tenant-login-info-dto-extensions';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerTextService } from '@app/shared/ngx-spinner-text.service';

interface AbpEventSubscription {
    eventName: string;
    callback: (...args: any[]) => void;
}

@Component({
    template: '',
})
export abstract class AppComponentBase implements OnDestroy {
    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
    injector: Injector

    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    primengTableHelper: PrimengTableHelper;
    ui: AppUiCustomizationService;
    appUrlService: AppUrlService;
    spinnerService: NgxSpinnerService;
    eventSubscriptions: AbpEventSubscription[] = [];

    private ngxSpinnerTextService: NgxSpinnerTextService;

    constructor(injector: Injector) {
        this.injector = injector;
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.ui = injector.get(AppUiCustomizationService);
        this.appUrlService = injector.get(AppUrlService);
        this.primengTableHelper = new PrimengTableHelper();
        this.spinnerService = injector.get(NgxSpinnerService);
        this.ngxSpinnerTextService = injector.get(NgxSpinnerTextService);
    }

    get currentTheme(): UiCustomizationSettingsDto {
        return this.appSession.theme;
    }

    get appLogoSkin(): string{
        if (this.currentTheme.isTopMenuUsed || this.currentTheme.isTabMenuUsed)
        {
            return this.currentTheme.baseSettings.layout.darkMode ? "light" : "dark";
        }

        return this.currentTheme.baseSettings.menu.asideSkin;
    }

    get containerClass(): string {
        if (this.appSession.theme.baseSettings.layout.layoutType === 'fluid') {
            return 'app-container container-fluid';
        } else if (this.appSession.theme.baseSettings.layout.layoutType === 'fixed' || this.appSession.theme.baseSettings.layout.layoutType === 'fluid-xxl') {
            return 'app-container container-xxl';
        }

        return 'app-container container';
    }

    ngOnDestroy(): void {
        this.unSubscribeAllEvents();
    }

    flattenDeep(array) {
        return array.reduce(
            (acc, val) => (Array.isArray(val) ? acc.concat(this.flattenDeep(val)) : acc.concat(val)),
            []
        );
    }

    l(key: string, ...args: any[]): string {
        args.unshift(key);
        args.unshift(this.localizationSourceName);
        return this.ls.apply(this, args);
    }

    ls(sourcename: string, key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, sourcename);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, this.flattenDeep(args));
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    isGrantedAny(...permissions: string[]): boolean {
        if (!permissions) {
            return false;
        }

        for (const permission of permissions) {
            if (this.isGranted(permission)) {
                return true;
            }
        }

        return false;
    }

    s(key: string): string {
        return abp.setting.get(key);
    }

    appRootUrl(): string {
        return this.appUrlService.appRootUrl;
    }

    showMainSpinner(text?: string): void {
        this.ngxSpinnerTextService.setText(text);
        this.spinnerService.show();
    }

    hideMainSpinner(text?: string): void {
        this.spinnerService.hide();
    }

    protected subscribeToEvent(eventName: string, callback: (...args: any[]) => void): void {
        abp.event.on(eventName, callback);
        this.eventSubscriptions.push({
            eventName,
            callback,
        });
    }

    private unSubscribeAllEvents() {
        this.eventSubscriptions.forEach((s) => abp.event.off(s.eventName, s.callback));
        this.eventSubscriptions = [];
    }
}
