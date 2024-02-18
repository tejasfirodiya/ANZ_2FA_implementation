import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CreateFriendshipWithDifferentTenantInput,
    FriendshipServiceProxy,
    ProfileServiceProxy,
    VerifyAuthenticatorCodeInput,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'addFromDifferentTenantModal',
    templateUrl: './add-from-different-tenant-modal.component.html',
})
export class AddFromDifferentTenantModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('addFromDifferentTenantModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    public active = false;
    public saving = false;
    public verifyCodeInput: VerifyAuthenticatorCodeInput = new VerifyAuthenticatorCodeInput();

    isHostUser = false;
    tenantToHostChatAllowed = false;
    tenantToTenantChatAllowed = false;
    tenancyName = '';
    userName = '';

    constructor(injector: Injector, private _friendshipService: FriendshipServiceProxy) {
        super(injector);
    }

    ngOnInit(): void {
        this.tenantToHostChatAllowed =
            this.feature.isEnabled('App.ChatFeature.TenantToHost') && this.appSession.tenantId != null;
        this.tenantToTenantChatAllowed =
            this.feature.isEnabled('App.ChatFeature.TenantToTenant') || this.appSession.tenantId == null;

        this.isHostUser = !this.tenantToTenantChatAllowed;
    }

    show(): void {
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        let input = new CreateFriendshipWithDifferentTenantInput();
        input.tenancyName = this.tenancyName;
        input.userName = this.userName;

        this.saving = true;
        this._friendshipService
            .createFriendshipWithDifferentTenant(input)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('FriendshipRequestAccepted'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    switchTenant(): void {
        this.tenancyName = '';
    }
}
