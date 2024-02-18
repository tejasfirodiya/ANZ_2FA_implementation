import { AbpSessionService } from 'abp-ng2-module';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SessionServiceProxy, UpdateUserSignInTokenOutput } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from 'shared/helpers/UrlHelper';
import { ExternalLoginProvider, LoginService } from './login.service';
import { ReCaptchaV3WrapperService } from '@account/shared/recaptchav3-wrapper.service';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ['./login.component.less'],
})
export class LoginComponent extends AppComponentBase implements OnInit, AfterViewInit {
    submitting = false;
    isMultiTenancyEnabled: boolean = this.multiTenancy.isEnabled;
    
    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _sessionService: AbpSessionService,
        private _sessionAppService: SessionServiceProxy,
        private _recaptchaWrapperService: ReCaptchaV3WrapperService
    ) {
        super(injector);
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isTenantSelfRegistrationAllowed(): boolean {
        return this.setting.getBoolean('App.TenantManagement.AllowSelfRegistration');
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }

    ngOnInit(): void {
        if (this._sessionService.userId > 0 && UrlHelper.getReturnUrl() && UrlHelper.getSingleSignIn()) {
            this._sessionAppService.updateUserSignInToken().subscribe((result: UpdateUserSignInTokenOutput) => {
                const initialReturnUrl = UrlHelper.getReturnUrl();
                const returnUrl =
                    initialReturnUrl +
                    (initialReturnUrl.indexOf('?') >= 0 ? '&' : '?') +
                    'accessToken=' +
                    result.signInToken +
                    '&userId=' +
                    result.encodedUserId +
                    '&tenantId=' +
                    result.encodedTenantId;

                location.href = returnUrl;
            });
        }

        this.handleExternalLoginCallbacks();
    }

    ngAfterViewInit(): void {
        this._recaptchaWrapperService.setCaptchaVisibilityOnLogin();
    }

    handleExternalLoginCallbacks(): void {
        let state = UrlHelper.getQueryParametersUsingHash().state;
        let queryParameters = UrlHelper.getQueryParameters();

        if (state && state.indexOf('openIdConnect') >= 0) {
            this.loginService.openIdConnectLoginCallback({});
        }

        if (queryParameters.state && queryParameters.state.indexOf('openIdConnect') >= 0) {
            this.loginService.openIdConnectLoginCallback({});
        }

        if (queryParameters.twitter && queryParameters.twitter === '1') {
            let parameters = UrlHelper.getQueryParameters();
            let token = parameters['oauth_token'];
            let verifier = parameters['oauth_verifier'];
            this.loginService.twitterLoginCallback(token, verifier);
        }
    }

    login(): void {
        let recaptchaCallback = (token: string) => {
            this.showMainSpinner();

            this.submitting = true;
            this.loginService.authenticate(
                () => {
                    this.submitting = false;
                    this.hideMainSpinner();
                },
                null,
                token
            );
        };

        if (this._recaptchaWrapperService.useCaptchaOnLogin()) {
            this._recaptchaWrapperService.getService().execute('login')
                .subscribe((token) => recaptchaCallback(token));
        } else {
            recaptchaCallback(null);
        }
    }

    externalLogin(provider: ExternalLoginProvider) {
        this.loginService.externalAuthenticate(provider);
    }

}
