import { Directive, Self, Output, EventEmitter, Input, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { DateTime } from 'luxon';
import compare from 'just-compare';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

///this directive ensures that the date value will always be the luxon.
@Directive({
    selector: '[datePickerLuxonModifier]',
})
export class DatePickerLuxonModifierDirective implements OnDestroy, OnChanges {
    @Input() date = new EventEmitter();
    @Input() isUtc = false;
    @Input() withTimepicker = false;
    @Output() dateChange = new EventEmitter();

    subscribe: Subscription;
    lastDate: Date = null;

    constructor(@Self() private bsDatepicker: BsDatepickerDirective, private _dateTimeService: DateTimeService) {
        this.subscribe = bsDatepicker.bsValueChange.subscribe((date: Date) => {
            if (!date) {
                this.lastDate = null;
                this.dateChange.emit(null);
            } else if (date instanceof Date && !compare(this.lastDate, date) && date.toString() !== 'Invalid Date') {
                // clear hour, minute, seconds and milliseconds since this is a date
                if (!this.withTimepicker) {
                    date.setHours(0);
                    date.setMinutes(0);
                }

                date.setSeconds(0);
                date.setMilliseconds(0);

                if (this.isUtc) {
                    // using UTC date regardless of timing configuration
                    var utcDateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
                    date = this._dateTimeService.fromISODateString(utcDateString).toJSDate();
                } else if (abp.clock.provider.supportsMultipleTimezone) {
                    date = this._dateTimeService.changeTimeZone(date, abp.timing.timeZoneInfo.iana.timeZoneId);
                }

                this.lastDate = date;
                this.dateChange.emit(this._dateTimeService.fromJSDate(this.lastDate));
            }
        });
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    ngOnChanges({ date }: SimpleChanges) {
        if (date && date.currentValue) {
            if (!compare(date.currentValue, date.previousValue)) {
                setTimeout(() => {
                    if (date.currentValue instanceof DateTime) {
                        this.bsDatepicker.bsValue = date.currentValue.toJSDate();
                    } else {
                        this.bsDatepicker.bsValue = date.currentValue;
                    }
                }, 0);
            }
        } else {
            setTimeout(() => {
                this.bsDatepicker.bsValue = null;
            }, 0);
        }
    }
}
