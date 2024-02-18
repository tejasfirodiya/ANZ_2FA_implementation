import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { LoginService } from './login.service';
import { ReCaptchaV3WrapperService } from '@account/shared/recaptchav3-wrapper.service';

@Component({
    templateUrl: './validate-two-factor-code.component.html',
    styleUrls: ['./validate-two-factor-code.component.less'],
    animations: [accountModuleAnimation()],
})
export class ValidateTwoFactorCodeComponent extends AppComponentBase implements CanActivate, OnInit, OnDestroy, AfterViewInit {
    code: string;
    submitting = false;
    remainingSeconds = 90;
    timerSubscription: Subscription;

    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _recaptchaWrapperService: ReCaptchaV3WrapperService
    ) {
        super(injector);
    }

    canActivate(): boolean {
        if (this.loginService.authenticateModel && this.loginService.authenticateResult) {
            return true;
        }

        return false;
    }

    ngOnInit(): void {
        if (!this.canActivate()) {
            this._router.navigate(['account/login']);
            return;
        }

        this.remainingSeconds = this.appSession.application.twoFactorCodeExpireSeconds;

        const timerSource = timer(1000, 1000);
        this.timerSubscription = timerSource.subscribe(() => {
            this.remainingSeconds = this.remainingSeconds - 1;
            if (this.remainingSeconds === 0) {
                this.message.warn(this.l('TimeoutPleaseTryAgain')).then(() => {
                    this.loginService.authenticateModel.twoFactorVerificationCode = null;
                    this._router.navigate(['account/login']);
                });
            }
        });
    }

    ngAfterViewInit(): void {
        this._recaptchaWrapperService.setCaptchaVisibilityOnLogin();
    }

    ngOnDestroy(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
    }

    submit(): void {
        let recaptchaCallback = (token: string) => {
            this.loginService.authenticateModel.twoFactorVerificationCode = this.code;
            this.loginService.authenticate(() => { }, null, token);
        };

        if (this._recaptchaWrapperService.useCaptchaOnLogin()) {
            this._recaptchaWrapperService.getService().execute('login').subscribe((token) => recaptchaCallback(token));
        } else {
            recaptchaCallback(null);
        }
    }
}
