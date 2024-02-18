import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppUrlService } from '@shared/common/nav/app-url.service';
import { RegisterTenantOutput } from '@shared/service-proxies/service-proxies';
import { TenantRegistrationHelperService } from './tenant-registration-helper.service';
import { SubdomainTenancyNameFinder } from '@shared/helpers/SubdomainTenancyNameFinder';
import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './register-tenant-result.component.html',
    animations: [accountModuleAnimation()],
})
export class RegisterTenantResultComponent extends AppComponentBase implements OnInit {
    model: RegisterTenantOutput = new RegisterTenantOutput();
    tenantUrl: string;

    saving = false;

    constructor(
        injector: Injector,
        private _router: Router,
        private _appUrlService: AppUrlService,
        private _tenantRegistrationHelper: TenantRegistrationHelperService
    ) {
        super(injector);
    }

    ngOnInit() {
        if (!this._tenantRegistrationHelper.registrationResult) {
            this._router.navigate(['account/login']);
            return;
        }

        this.model = this._tenantRegistrationHelper.registrationResult;
        if (!new SubdomainTenancyNameFinder().urlHasTenancyNamePlaceholder(AppConsts.remoteServiceBaseUrlFormat)) {
            abp.multiTenancy.setTenantIdCookie(this.model.tenantId);
        }

        this.tenantUrl = this._appUrlService.getAppRootUrlOfTenant(this.model.tenancyName);
    }
}
