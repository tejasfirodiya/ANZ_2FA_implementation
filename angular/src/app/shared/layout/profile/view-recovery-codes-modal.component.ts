import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProfileServiceProxy, UpdateGoogleAuthenticatorKeyOutput, VerifyAuthenticatorCodeInput, VerifySmsCodeInputDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { RecoveryCodesComponent } from './recovery-codes.component';
import { VerifyCodeModalComponent } from './verify-code-modal.component';

@Component({
    selector: 'viewRecoveryCodesModal',
    templateUrl: './view-recovery-codes-modal.component.html',
})
export class ViewRecoveryCodesModalComponent extends AppComponentBase{
    @ViewChild('viewRecoveryCodesModal', { static: true }) modal: ModalDirective;
    @ViewChild('verifyCodeModal', { static: true }) verifyCodeModal: VerifyCodeModalComponent;
    @ViewChild('recoveryCodesComponent', { static: true }) recoveryCodesComponent: RecoveryCodesComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    public active = false;
    public saving = false;

    constructor(injector: Injector, private _profileService: ProfileServiceProxy) {
        super(injector);
    }

    show(): void {
        this.verifyCodeModal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    showRecoveryCodes(verifyCodeInput: VerifyAuthenticatorCodeInput): void {
        this.saving = true;
        this._profileService
            .viewRecoveryCodes(verifyCodeInput)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe((result: UpdateGoogleAuthenticatorKeyOutput) => {
                this.recoveryCodesComponent.model = result;
                this.modal.show();
                this.modalSave.emit();
            });
    }
}
