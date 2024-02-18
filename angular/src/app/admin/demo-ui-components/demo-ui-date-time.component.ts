import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DemoUiComponentsServiceProxy, SendAndGetDateWithTextInput } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';

@Component({
    selector: 'demo-ui-date-time',
    templateUrl: './demo-ui-date-time.component.html',
    animations: [appModuleAnimation()],
})
export class DemoUiDateTimeComponent extends AppComponentBase {
    @ViewChild('SampleDatePicker', { static: true }) sampleDatePicker: ElementRef;
    @ViewChild('SampleDateTimePicker', { static: true }) sampleDateTimePicker: ElementRef;

    sampleDate: DateTime;
    sampleDateTime: DateTime;
    sampleDateRange: DateTime[] = [
        this._dateTimeService.getStartOfDayMinusDays(7),
        this._dateTimeService.getStartOfDay(),
    ];
    sampleDateWithTextInput: SendAndGetDateWithTextInput = new SendAndGetDateWithTextInput();
    dateFormat = 'yyyy-LL-dd HH:mm:ss';

    constructor(
        injector: Injector,
        private demoUiComponentsService: DemoUiComponentsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    // default date picker - post
    submitDate(): void {
        this.demoUiComponentsService.sendAndGetDate(this.sampleDate).subscribe((data) => {
            var dateString = this.getDateString(data.date);
            this.message.info(dateString, this.l('PostedValue'));
        });
    }

    // default date time picker - post
    submitDateTime(): void {
        this.demoUiComponentsService.sendAndGetDate(this.sampleDateTime).subscribe((data) => {
            var dateString = this.getDateString(data.date);
            this.message.info(dateString, this.l('PostedValue'));
        });
    }

    // default date range picker - post
    submitDateRange(): void {
        this.demoUiComponentsService
            .sendAndGetDateRange(this.sampleDateRange[0], this.sampleDateRange[1])
            .subscribe((data) => {
                var startDateString = this.getDateString(data.startDate);
                var endDateString = this.getDateString(data.endDate);
                this.message.info(startDateString + '-' + endDateString, this.l('PostedValue'));
            });
    }

    // default date picker with text - post
    submitDateWithText(): void {
        this.demoUiComponentsService.sendAndGetDateWithText(this.sampleDateWithTextInput).subscribe((data) => {
            var dateString = this.getDateString(data.date);
            this.message.info(dateString + '-' + data.text, this.l('PostedValue'));
        });
    }

    getDateString(date: DateTime): string {
        var dateString = this._dateTimeService.formatDate(date, this.dateFormat);
        if (abp.clock.provider.supportsMultipleTimezone) {
            dateString += '(' + abp.timing.timeZoneInfo.iana.timeZoneId + ')';
        }

        return dateString;
    }
}
