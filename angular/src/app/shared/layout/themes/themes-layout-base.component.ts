import { Component, Injector, Inject } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    TenantLoginInfoDto,
    EditionPaymentType,
    SubscriptionStartType,
    SubscriptionPaymentType,
} from '@shared/service-proxies/service-proxies';

@Component({ template: '' })
export class ThemesLayoutBaseComponent extends AppComponentBase {
    tenant: TenantLoginInfoDto = new TenantLoginInfoDto();
    subscriptionStartType = SubscriptionStartType;
    editionPaymentType: typeof EditionPaymentType = EditionPaymentType;
    installationMode = true;

    defaultLogo =
        AppConsts.appBaseUrl +
        '/assets/common/images/app-logo-on-' +
        this.currentTheme.baseSettings.menu.asideSkin +
        '.svg';

    constructor(injector: Injector, private _dateTimeService: DateTimeService) {
        super(injector);
    }

    subscriptionStatusBarVisible(): boolean {
        return (
            this.appSession.tenantId > 0 &&
            this.appSession.tenant.subscriptionPaymentType !== SubscriptionPaymentType.RecurringAutomatic &&
            (this.appSession.tenant.isInTrialPeriod || this.subscriptionIsExpiringSoon())
        );
    }

    subscriptionIsExpiringSoon(): boolean {
        if (this.appSession.tenant?.subscriptionEndDateUtc) {
            let today = this._dateTimeService.getUTCDate();
            let daysFromNow = this._dateTimeService.plusDays(today, AppConsts.subscriptionExpireNootifyDayCount);
            return daysFromNow >= this.appSession.tenant.subscriptionEndDateUtc;
        }

        return false;
    }

    getSubscriptionExpiringDayCount(): number {
        if (!this.appSession.tenant.subscriptionEndDateUtc) {
            return 0;
        }

        let todayUTC = this._dateTimeService.getUTCDate();
        let duration = this.appSession.tenant.subscriptionEndDateUtc.diff(todayUTC, 'days');
        return Math.round(duration.days);
    }

    getTrialSubscriptionNotification(): string {
        return this.l(
            'TrialSubscriptionNotification',
            `<strong>${this.appSession.tenant.edition.displayName}</strong>`,
            `<a href="/account/buy?editionPaymentType=${this.editionPaymentType.BuyNow}&editionId=${
                this.appSession.tenant.edition.id
            }&tenantId=${this.appSession.tenant.id}">${this.l('ClickHere')}</a>`
        );
    }

    getExpireNotification(localizationKey: string): string {
        return this.l(localizationKey, this.getSubscriptionExpiringDayCount());
    }

    isMobileDevice(): boolean {
        return KTUtil.isMobileDevice();
    }

    isDarkModeActive(): boolean {
        return this.appSession.theme.baseSettings.layout.darkMode;
    }

    getSkin(): string{
        return this.isDarkModeActive() ? 'dark': 'light';
    }
}
