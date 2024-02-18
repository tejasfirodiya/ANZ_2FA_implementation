import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UpdateGoogleAuthenticatorKeyOutput } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'recoveryCodesComponent',
    templateUrl: './recovery-codes.component.html'
})

export class RecoveryCodesComponent extends AppComponentBase implements OnInit {
    @ViewChild('recoveryCodesComponent', { static: true }) recoveryCodesComponent: ModalDirective;

    public model: UpdateGoogleAuthenticatorKeyOutput;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.model = new UpdateGoogleAuthenticatorKeyOutput();
    }
}
