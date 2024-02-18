import { Injectable } from "@angular/core";
import { SettingService } from "abp-ng2-module";
import { ReCaptchaV3Service } from "ng-recaptcha";

@Injectable()
export class ReCaptchaV3WrapperService {

    constructor(private setting: SettingService, private _reCaptchaV3Service: ReCaptchaV3Service) {

    }

    getService(): ReCaptchaV3Service {
        return this._reCaptchaV3Service;
    }

    useCaptchaOnLogin(): boolean {
        return this.setting.getBoolean('App.UserManagement.UseCaptchaOnLogin');
    }

    setCaptchaVisibilityOnLogin(): void {
        var recpatchaElements = document.getElementsByClassName('grecaptcha-badge');
        if (!recpatchaElements || recpatchaElements.length <= 0) {
            return;
        }

        if (this.useCaptchaOnLogin()) {
            recpatchaElements[0].classList.remove('d-none');
        } else {
            recpatchaElements[0].classList.add('d-none');
        }
    }

    useCaptchaOnRegister(): boolean {
        return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
    }

    setCaptchaVisibilityOnRegister(): void {
        var recpatchaElements = document.getElementsByClassName('grecaptcha-badge');
        if (!recpatchaElements || recpatchaElements.length <= 0) {
            return;
        }

        if (this.useCaptchaOnRegister()) {
            recpatchaElements[0].classList.remove('d-none');
        } else {
            recpatchaElements[0].classList.add('d-none');
        }
    }
}