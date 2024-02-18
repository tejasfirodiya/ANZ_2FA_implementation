import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DynamicEntityPropertyServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateDynamicEntityPropertyModalComponent } from './create-dynamic-entity-property-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'manage-dynamic-entity-property-modal',
    templateUrl: './manage-dynamic-entity-property-modal.component.html',
})
export class ManageDynamicEntityPropertyModalComponent extends AppComponentBase {
    @Output() onPropertyChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('createDynamicEntityPropertyModal')
        createDynamicEntityPropertyModal: CreateDynamicEntityPropertyModalComponent;
    @ViewChild('createModal') modal: ModalDirective;

    entityFullName: string;

    constructor(
        injector: Injector,
        private _activatedRoute: ActivatedRoute,
        private _dynamicEntityPropertyService: DynamicEntityPropertyServiceProxy
    ) {
        super(injector);
    }

    show(entityFullName: string): void {
        this.entityFullName = entityFullName;
        this.getDynamicEntityProperties();
        this.modal.show();
    }

    handlePropertyChanges(): void {
        this.onPropertyChange.emit(null);
        this.getDynamicEntityProperties();
    }

    getDynamicEntityProperties(): void {
        this.showMainSpinner();
        this._dynamicEntityPropertyService.getAllPropertiesOfAnEntity(this.entityFullName).subscribe(
            (result) => {
                this.primengTableHelper.totalRecordsCount = result.items.length;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
                this.hideMainSpinner();
            },
            (err) => {
                this.hideMainSpinner();
            }
        );
    }

    addNewDynamicEntityProperty(): void {
        this.createDynamicEntityPropertyModal.show(this.entityFullName);
    }

    deleteDynamicEntityProperty(id: number): void {
        this.message.confirm(this.l('DeleteDynamicPropertyMessage'), this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._dynamicEntityPropertyService.delete(id).subscribe(() => {
                    abp.notify.success(this.l('SuccessfullyDeleted'));
                    this.handlePropertyChanges();
                });
            }
        });
    }

    close(): void {
        this.modal.hide();
    }
}
