import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UserLookupTableModalComponent } from './user-lookup-table-modal.component';
import { OrganizationUnitLookupTableModalComponent } from './organization-unit-lookup-table-modal.component';
import { CreateMassNotificationInput, MassNotificationOrganizationUnitLookupTableDto, MassNotificationUserLookupTableDto, NotificationServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-mass-notification-modal',
  templateUrl: './create-mass-notification-modal.component.html'
})
export class CreateMassNotificationModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('userLookupTableModalComponent', { static: true }) userLookupTableModalComponent: UserLookupTableModalComponent;
  @ViewChild('organizationUnitLookupTableModalComponent', { static: true }) organizationUnitLookupTableModalComponent: OrganizationUnitLookupTableModalComponent;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  createMassNotificationInput: CreateMassNotificationInput = new CreateMassNotificationInput();

  userNames = '';
  organizationUnitDisplayNames = '';
  notifiers: string[];
  showSMSTargetNotifierMessage: boolean;

  constructor(
    injector: Injector,
    private _notificationServiceProxy: NotificationServiceProxy
  ) {
    super(injector);
  }

  show(): void {
    this.createMassNotificationInput = new CreateMassNotificationInput();
    this.active = true;

    this._notificationServiceProxy.getAllNotifiers().subscribe(result => {
      this.notifiers = result;
    });

    this.modal.show();
  }

  save(): void {
    if (!this.createMassNotificationInput.message || this.createMassNotificationInput.message === '') {
      abp.message.error(this.l('MassNotificationMessageFieldIsRequiredMessage'));
      return;
    }

    if (!this.createMassNotificationInput.targetNotifiers || this.createMassNotificationInput.targetNotifiers.length === 0) {
      abp.message.error(this.l('MassNotificationTargetNotifiersFieldIsRequiredMessage'));
      return;
    }

    if (
      (!this.createMassNotificationInput.userIds || this.createMassNotificationInput.userIds.length === 0) &&
      (!this.createMassNotificationInput.organizationUnitIds || this.createMassNotificationInput.organizationUnitIds.length === 0)
    ) {
      abp.message.error(this.l('MassNotificationUserOrOrganizationUnitFieldIsRequiredMessage'));
      return;
    }

    this.saving = true;

    this._notificationServiceProxy
      .createMassNotification(this.createMassNotificationInput)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }

  openSelectUserModal() {
    this.userLookupTableModalComponent.show();
  }

  openSelectOrganizationUnitModal() {
    this.organizationUnitLookupTableModalComponent.show();
  }

  setUserIdNull() {
    this.createMassNotificationInput.userIds = [];
    this.userNames = '';
  }

  setOrganizationUnitIdNull() {
    this.createMassNotificationInput.organizationUnitIds = [];
    this.organizationUnitDisplayNames = '';
  }

  onUsersSelected(selectedItems: MassNotificationUserLookupTableDto[]) {
    this.createMassNotificationInput.userIds = selectedItems.map(i => i.id);
    this.userNames = '[ ' + selectedItems.length + ' ' + this.l('ItemsSelected') + '] ' + selectedItems.map(i => i.displayName).join(', ');
  }

  onOrganizationUnitsSelected(selectedItems: MassNotificationOrganizationUnitLookupTableDto[]) {
    this.createMassNotificationInput.organizationUnitIds = selectedItems.map(i => i.id);
    this.organizationUnitDisplayNames = '[ ' + selectedItems.length + ' ' + this.l('ItemsSelected') + '] ' + selectedItems.map(i => i.displayName).join(', ');
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

  onTargetNotifiersChanged(): void {
    this.showSMSTargetNotifierMessage = this.createMassNotificationInput.targetNotifiers.includes('MyTrainingV1231AngularDemo.Notifications.SmsRealTimeNotifier');
  }
}
