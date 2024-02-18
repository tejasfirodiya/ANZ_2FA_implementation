import { Component, Injector, ViewChild } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AuditLogListDto } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'auditLogDetailModal',
    templateUrl: './audit-log-detail-modal.component.html',
})
export class AuditLogDetailModalComponent extends AppComponentBase {
    @ViewChild('auditLogDetailModal', { static: true }) modal: ModalDirective;

    active = false;
    auditLog: AuditLogListDto;

    constructor(injector: Injector, private _dateTimeService: DateTimeService) {
        super(injector);
    }

    getExecutionTime(): string {
        const self = this;
        return (
            this._dateTimeService.fromNow(self.auditLog.executionTime) +
            ' (' +
            this._dateTimeService.formatDate(self.auditLog.executionTime, 'yyyy-LL-dd HH:mm:ss') +
            ')'
        );
    }

    getDurationAsMs(): string {
        const self = this;
        return self.l('Xms', self.auditLog.executionDuration);
    }

    getFormattedParameters(): string {
        const self = this;
        try {
            const json = JSON.parse(self.auditLog.parameters);
            return JSON.stringify(json, null, 4);
        } catch (e) {
            return self.auditLog.parameters;
        }
    }

    show(record: AuditLogListDto): void {
        const self = this;
        self.active = true;
        self.auditLog = record;

        self.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
