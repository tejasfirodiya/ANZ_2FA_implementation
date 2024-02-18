import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    AccountServiceProxy,
    PasswordComplexitySetting,
    ProfileServiceProxy,
    ResetPasswordOutput,
    ResolveTenantIdInput,
} from '@shared/service-proxies/service-proxies';
import { LoginService } from '../login/login.service';
import { ResetPasswordModel } from './reset-password.model';
import { finalize } from 'rxjs/operators';
import { ReCaptchaV3WrapperService } from '@account/shared/recaptchav3-wrapper.service';

@Component({
    templateUrl: './reset-password.component.html',
    animations: [accountModuleAnimation()],
})
export class ResetPasswordComponent extends AppComponentBase implements OnInit, AfterViewInit {

    model: ResetPasswordModel = new ResetPasswordModel();
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    saving = false;

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _loginService: LoginService,
        private _profileService: ProfileServiceProxy,
        private _recaptchaWrapperService: ReCaptchaV3WrapperService
    ) {
        super(injector);
    }
    
    ngOnInit(): void {
        this._profileService.getPasswordComplexitySetting().subscribe((result) => {
            this.passwordComplexitySetting = result.setting;
        });

        if (this._activatedRoute.snapshot.queryParams['c']) {
            this.model.c = this._activatedRoute.snapshot.queryParams['c'];

            this._accountService
                .resolveTenantId(new ResolveTenantIdInput({ c: this.model.c }))
                .subscribe((tenantId) => {
                    this.appSession.changeTenantIfNeeded(tenantId);
                });
        } else {
            this.model.userId = this._activatedRoute.snapshot.queryParams['userId'];
            this.model.resetCode = this._activatedRoute.snapshot.queryParams['resetCode'];

            this.appSession.changeTenantIfNeeded(
                this.parseTenantId(this._activatedRoute.snapshot.queryParams['tenantId'])
            );
        }
    }

    ngAfterViewInit(): void {
        this._recaptchaWrapperService.setCaptchaVisibilityOnLogin();
    }

    save(): void {
        this.saving = true;
        this._accountService
            .resetPassword(this.model)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe((result: ResetPasswordOutput) => {
                if (!result.canLogin) {
                    this._router.navigate(['account/login']);
                    return;
                }

                let recaptchaCallback = (token: string) => {
                    // Autheticate
                    this.saving = true;
                    this._loginService.authenticateModel.userNameOrEmailAddress = result.userName;
                    this._loginService.authenticateModel.password = this.model.password;
                    this._loginService.authenticate(
                        () => {
                            this.saving = false;
                        },
                        null,
                        token
                    );
                };

                if (this._recaptchaWrapperService.useCaptchaOnLogin()) {
                    this._recaptchaWrapperService.getService().execute('login').subscribe((token) => recaptchaCallback(token));
                } else {
                    recaptchaCallback(null);
                }
            });
    }

    parseTenantId(tenantIdAsStr?: string): number {
        let tenantId = !tenantIdAsStr ? undefined : parseInt(tenantIdAsStr, 10);
        if (Number.isNaN(tenantId)) {
            tenantId = undefined;
        }

        return tenantId;
    }
}
