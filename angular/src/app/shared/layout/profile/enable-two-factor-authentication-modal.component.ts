import { Component, EventEmitter, Injector, Output, ViewChild, OnInit } from '@angular/core';
import { StepperComponent } from '@metronic/app/kt/components';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GenerateGoogleAuthenticatorKeyOutput, ProfileServiceProxy, UpdateGoogleAuthenticatorKeyInput, UpdateGoogleAuthenticatorKeyOutput } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { RecoveryCodesComponent } from './recovery-codes.component';

@Component({
    selector: 'enableTwoFactorAuthenticationModal',
    templateUrl: './enable-two-factor-authentication-modal.component.html',
    styleUrls: ['enable-two-factor-authentication-modal.component.less']
})
export class EnableTwoFactorAuthenticationModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('enableTwoFactorAuthenticationModal', { static: true }) modal: ModalDirective;
    @ViewChild('recoveryCodesComponent', { static: true }) recoveryCodesComponent: RecoveryCodesComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    public active = false;
    public saving = false;
    public stepper: StepperComponent;
    public model: GenerateGoogleAuthenticatorKeyOutput;

    constructor(injector: Injector, private _profileService: ProfileServiceProxy) {
        super(injector);
    }

    ngOnInit(): void {
        this.stepper = StepperComponent.createInsance(document.getElementById('2fa_stepper'));
        this.model = new GenerateGoogleAuthenticatorKeyOutput();

        this.stepper.on('kt.stepper.next', () => {
            this.stepper.goNext();
        });
    }

    onAuthenticatorCodeInput(event: any): void {
        if (event.target.value.length !== 6) {
            return;
        }

        const btnContinue = document.getElementById('btnContinue');
        btnContinue.setAttribute('data-kt-indicator', 'on');

        let input = new UpdateGoogleAuthenticatorKeyInput();
        input.authenticatorCode = event.target.value;
        input.googleAuthenticatorKey = this.model.googleAuthenticatorKey;

        this.saving = true;
        this._profileService
            .updateGoogleAuthenticatorKey(input)
            .pipe(
                finalize(() => {
                    this.saving = false;
                    event.target.value = '';
                })
            )
            .subscribe((result: UpdateGoogleAuthenticatorKeyOutput) => {
                this.recoveryCodesComponent.model = result;
                this.saving = false;
                this.stepper.goNext();
            });

        btnContinue.removeAttribute('data-kt-indicator');
    }

    downloadRecoveryCodes(recoveryCodes: string[]): void {
        const recoveryCodesText = recoveryCodes.join('\r\n');

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(recoveryCodesText));
        element.setAttribute('download', 'recovery-codes.txt');
        element.click();

        URL.revokeObjectURL(element.href);

        const btnContinue = document.getElementById('btnContinue');

        // User can continue
        btnContinue.removeAttribute('disabled');
    }

    copyRecoveryCodes(recoveryCodes: string[]): void {
        const recoveryCodesText = recoveryCodes.join('\r\n');

        navigator.clipboard.writeText(recoveryCodesText);

        const btnContinue = document.getElementById('btnContinue');

        // User can continue
        btnContinue.removeAttribute('disabled');
    }

    show(): void {
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
        this.message.success(this.l('TwoFactorAuthenticationEnabled'));
        this.modalSave.emit();
    }
}
