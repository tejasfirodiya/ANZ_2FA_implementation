import { Component, Injector } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-filter-date-range-picker',
    templateUrl: './filter-date-range-picker.component.html',
    styleUrls: ['./filter-date-range-picker.component.css'],
})
export class FilterDateRangePickerComponent extends AppComponentBase {
    date: Date;
    selectedDateRange: DateTime[] = [
        this._dateTimeService.getStartOfDayMinusDays(7),
        this._dateTimeService.getEndOfDay(),
    ];

    constructor(injector: Injector, private _dateTimeService: DateTimeService) {
        super(injector);
    }

    onChange() {
        abp.event.trigger('app.dashboardFilters.dateRangePicker.onDateChange', this.selectedDateRange);
    }
}
