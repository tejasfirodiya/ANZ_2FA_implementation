import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    NotificationServiceProxy,
    UserNotification,
    UserNotificationState,
} from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { IFormattedUserNotification, UserNotificationHelper } from './UserNotificationHelper';
import { finalize } from 'rxjs/operators';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class NotificationsComponent extends AppComponentBase {
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    readStateFilter = 'ALL';
    dateRange: DateTime[] = [this._dateTimeService.getStartOfDay(), this._dateTimeService.getEndOfDay()];
    loading = false;

    constructor(
        injector: Injector,
        private _notificationService: NotificationServiceProxy,
        private _userNotificationHelper: UserNotificationHelper,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    setAsRead(record: any): void {
        this.setNotificationAsRead(record, () => {
            this.reloadPage();
        });
    }

    isRead(record: any): boolean {
        return record.formattedNotification.state === 'READ';
    }

    fromNow(date: DateTime): string {
        return this._dateTimeService.fromNow(date);
    }

    formatRecord(record: any): IFormattedUserNotification {
        return this._userNotificationHelper.format(record, false);
    }

    formatNotification(record: any): string {
        const formattedRecord = this.formatRecord(record);
        return abp.utils.truncateStringWithPostfix(formattedRecord.text, 120);
    }

    formatNotifications(records: any[]): any[] {
        const formattedRecords = [];
        for (const record of records) {
            record.formattedNotification = this.formatRecord(record);
            formattedRecords.push(record);
        }
        return formattedRecords;
    }

    truncateString(text: any, length: number): string {
        return abp.utils.truncateStringWithPostfix(text, length);
    }

    getNotifications(event?: LazyLoadEvent): void {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._notificationService
            .getUserNotifications(
                this.readStateFilter === 'ALL' ? undefined : UserNotificationState.Unread,
                this._dateTimeService.getStartOfDayForDate(this.dateRange[0]),
                this._dateTimeService.getEndOfDayForDate(this.dateRange[1]),
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                this.primengTableHelper.getSkipCount(this.paginator, event)
            )
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = this.formatNotifications(result.items);
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    setAllNotificationsAsRead(): void {
        this._userNotificationHelper.setAllAsRead(() => {
            this.getNotifications();
        });
    }

    openNotificationSettingsModal(): void {
        this._userNotificationHelper.openSettingsModal();
    }

    setNotificationAsRead(userNotification: UserNotification, callback: () => void): void {
        this._userNotificationHelper.setAsRead(userNotification.id, () => {
            if (callback) {
                callback();
            }
        });
    }

    deleteNotification(userNotification: UserNotification): void {
        this.message.confirm(this.l('NotificationDeleteWarningMessage'), this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._notificationService.deleteNotification(userNotification.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    deleteNotifications() {
        this.message.confirm(this.l('DeleteListedNotificationsWarningMessage'), this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._notificationService
                    .deleteAllUserNotifications(
                        this.readStateFilter === 'ALL' ? undefined : UserNotificationState.Unread,
                        this._dateTimeService.getStartOfDayForDate(this.dateRange[0]),
                        this._dateTimeService.getEndOfDayForDate(this.dateRange[1]).endOf('day')
                    )
                    .subscribe(() => {
                        this.reloadPage();
                        this.notify.success(this.l('SuccessfullyDeleted'));
                    });
            }
        });
    }

    public getRowClass(formattedRecord: IFormattedUserNotification): string {
        var readState = UserNotificationState.Read as any;
        return formattedRecord.state == readState ? 'notification-read text-muted' : '';
    }

    getNotificationTextBySeverity(severity: abp.notifications.severity): string {
        switch (severity) {
            case abp.notifications.severity.SUCCESS:
                return this.l('Success');
            case abp.notifications.severity.WARN:
                return this.l('Warning');
            case abp.notifications.severity.ERROR:
                return this.l('Error');
            case abp.notifications.severity.FATAL:
                return this.l('Fatal');
            case abp.notifications.severity.INFO:
            default:
                return this.l('Info');
        }
    }
}
