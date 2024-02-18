import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    AuditLogServiceProxy,
    EntityChangeListDto,
    EntityPropertyChangeDto,
} from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DateTimeService } from '../timing/date-time.service';

@Component({
    selector: 'entityChangeDetailModal',
    templateUrl: './entity-change-detail-modal.component.html',
})
export class EntityChangeDetailModalComponent extends AppComponentBase {
    @ViewChild('entityChangeDetailModal', { static: true }) modal: ModalDirective;

    active = false;
    entityPropertyChanges: EntityPropertyChangeDto[];
    entityChange: EntityChangeListDto;

    constructor(
        injector: Injector,
        private _auditLogService: AuditLogServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getPropertyChangeValue(propertyChangeValue, propertyTypeFullName) {
        if (!propertyChangeValue) {
            return propertyChangeValue;
        }
        propertyChangeValue = propertyChangeValue.replace(/^['"]+/g, '').replace(/['"]+$/g, '');
        if (this.isDate(propertyChangeValue, propertyTypeFullName)) {
            return this._dateTimeService.formatDate(
                this._dateTimeService.fromISODateString(propertyChangeValue),
                'yyyy-LL-dd HH:mm:ss'
            );
        }

        if (propertyChangeValue === 'null') {
            return '';
        }

        return propertyChangeValue;
    }

    isDate(date, propertyTypeFullName): boolean {
        return propertyTypeFullName.includes('DateTime') && !isNaN(Date.parse(date).valueOf());
    }

    show(record: EntityChangeListDto): void {
        const self = this;
        self.active = true;
        self.entityChange = record;

        this._auditLogService.getEntityPropertyChanges(record.id).subscribe((result) => {
            self.entityPropertyChanges = result;
        });

        self.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
