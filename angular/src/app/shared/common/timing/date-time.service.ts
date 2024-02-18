import { Injectable } from '@angular/core';
import { AppLocalizationService } from '@app/shared/common/localization/app-localization.service';
import { DateTime } from 'luxon';

@Injectable()
export class DateTimeService {
    constructor(private _appLocalizationService: AppLocalizationService) { }

    createDateRangePickerOptions(): any {
        let options = {
            locale: {
                format: 'L',
                applyLabel: this._appLocalizationService.l('Apply'),
                cancelLabel: this._appLocalizationService.l('Cancel'),
                customRangeLabel: this._appLocalizationService.l('CustomRange'),
            },
            min: this.fromISODateString('1900-01-01'),
            minDate: this.fromISODateString('1900-01-01'),
            max: this.getDate(),
            maxDate: this.getDate(),
            opens: 'left',
            ranges: {},
        };

        options.ranges[this._appLocalizationService.l('Today')] = [this.getStartOfDay(), this.getEndOfDay()];
        options.ranges[this._appLocalizationService.l('Yesterday')] = [
            this.minusDays(this.getStartOfDay(), 1),
            this.minusDays(this.getEndOfDay(), 1),
        ];
        options.ranges[this._appLocalizationService.l('Last7Days')] = [
            this.minusDays(this.getStartOfDay(), 6),
            this.getEndOfDay(),
        ];
        options.ranges[this._appLocalizationService.l('Last30Days')] = [
            this.minusDays(this.getStartOfDay(), 29),
            this.getEndOfDay(),
        ];
        options.ranges[this._appLocalizationService.l('ThisMonth')] = [
            this.getDate().startOf('month'),
            this.getDate().endOf('month'),
        ];
        options.ranges[this._appLocalizationService.l('LastMonth')] = [
            this.getDate().startOf('month').minus({ months: 1 }),
            this.getDate().endOf('month').minus({ months: 1 }),
        ];

        return options;
    }

    getDate(): DateTime {
        if (abp.clock.provider.supportsMultipleTimezone) {
            return DateTime.local().setZone(abp.timing.timeZoneInfo.iana.timeZoneId);
        } else {
            return DateTime.local();
        }
    }

    getUTCDate(): DateTime {
        return DateTime.utc();
    }

    getYear(): number {
        return this.getDate().year;
    }

    getStartOfDay(): DateTime {
        return this.getDate().startOf('day');
    }

    getStartOfWeek(): DateTime {
        return this.getDate().startOf('week');
    }

    getStartOfDayForDate(date: DateTime | Date): DateTime {
        if (!date) {
            return date as DateTime;
        }

        if (date instanceof Date) {
            return this.getStartOfDayForDate(this.fromJSDate(date));
        }

        return date.startOf('day');
    }

    getStartOfDayMinusDays(daysFromNow: number): DateTime {
        let date = this.getDate();
        let newDate = this.minusDays(date, daysFromNow);
        return this.getStartOfDayForDate(newDate);
    }

    getEndOfDay(): DateTime {
        return this.getDate().endOf('day');
    }

    getEndOfDayForDate(date: DateTime | Date): DateTime {
        if (!date) {
            return date as DateTime;
        }

        if (date instanceof Date) {
            return this.getEndOfDayForDate(this.fromJSDate(date));
        }

        return date.endOf('day');
    }

    getEndOfDayPlusDays(daysFromNow: number): DateTime {
        let date = this.getDate();
        let newDate = this.plusDays(date, daysFromNow);
        return this.getEndOfDayForDate(newDate);
    }

    getEndOfDayMinusDays(daysFromNow: number): DateTime {
        let date = this.getDate();
        let newDate = this.minusDays(date, daysFromNow);
        return this.getEndOfDayForDate(newDate);
    }

    plusDays(date: DateTime | Date, dayCount: number): DateTime {
        if (date instanceof Date) {
            return this.plusDays(this.fromJSDate(date), dayCount);
        }

        return date.plus({ days: dayCount });
    }

    plusSeconds(date: DateTime, seconds: number) {
        if (!date) {
            return date;
        }

        if (date instanceof Date) {
            return this.plusSeconds(this.fromJSDate(date), seconds);
        }

        return date.plus({ seconds: seconds });
    }

    minusDays(date: DateTime, dayCount: number): DateTime {
        return date.minus({ days: dayCount });
    }

    fromISODateString(date: string): DateTime {
        return DateTime.fromISO(date);
    }

    formatISODateString(dateText: string, format: string): string {
        let date = this.fromISODateString(dateText);
        return date.toFormat(format);
    }

    formatJSDate(jsDate: Date, format: string): string {
        let date = DateTime.fromJSDate(jsDate);
        return date.toFormat(format);
    }

    formatDate(date: DateTime | Date, format: string): string {
        if (date instanceof Date) {
            return this.formatDate(this.fromJSDate(date), format);
        }

        return date.toFormat(format);
    }

    getDiffInSeconds(maxDate: DateTime | Date, minDate: DateTime | Date) {
        if (maxDate instanceof Date && minDate instanceof Date) {
            return this.getDiffInSeconds(this.fromJSDate(maxDate), this.fromJSDate(minDate));
        }

        return (maxDate as DateTime).diff(minDate as DateTime, 'seconds');
    }

    createJSDate(year: number, month: number, day: number): Date {
        return this.createDate(year, month, day).toJSDate();
    }

    createDate(year: number, month: number, day: number): DateTime {
        if (abp.clock.provider.supportsMultipleTimezone) {
            return DateTime.utc(year, month + 1, day);
        } else {
            return DateTime.local(year, month + 1, day);
        }
    }

    createUtcDate(year: number, month: number, day: number): DateTime {
        return DateTime.utc(year, month + 1, day);
    }

    toUtcDate(date: DateTime | Date): DateTime {
        if (date instanceof Date) {
            return this.createUtcDate(date.getFullYear(), date.getMonth(), date.getDate());
        }

        return (date as DateTime).toUTC();
    }

    fromJSDate(date: Date): DateTime {
        return DateTime.fromJSDate(date);
    }

    fromNow(date: DateTime | Date): string {
        if (date instanceof Date) {
            return this.fromNow(this.fromJSDate(date));
        }

        return date.toRelative();
    }

    getTimezoneOffset(ianaTimezoneId: string): number {
        var hourAndMinuteOffset = DateTime.fromJSDate(new Date(), { zone: ianaTimezoneId }).toFormat('ZZ');
        var multiplier = hourAndMinuteOffset[0] == '-' ? -1 : +1;
        var hourParts = hourAndMinuteOffset.replace('-', '').replace('+', '').split(':');
        var hourOffset = hourParts[0];
        var minuteOffset = hourParts[1];
        return multiplier * (parseInt(hourOffset) * 60 + parseInt(minuteOffset));
    }

    // only changes timezone of given date without changing the date itself
    changeTimeZone(date: Date, ianaTimezoneId: string): Date {
        var utcDateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

        if (utcDateString.indexOf('T') < 0) {
            throw 'Invalid date format';
        }

        // construct a new DateTime from utcDateString
        var dateAndTimeParts = utcDateString.split('T');
        var dateParts = dateAndTimeParts[0].split('-');
        var timeParts = dateAndTimeParts[1].split('.')[0].split(':');

        var year = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]);
        var day = parseInt(dateParts[2]);

        var hour = parseInt(timeParts[0]);
        var minute = parseInt(timeParts[1]);
        var second = parseInt(timeParts[2]);

        return DateTime.fromObject({
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        }, { zone: ianaTimezoneId }).toJSDate();
    }

    changeDateTimeZone(date: DateTime, ianaTimezoneId: string): DateTime {
        var jsDate = date.toJSDate();
        var utcDate = this.changeTimeZone(jsDate, ianaTimezoneId);
        return DateTime.fromJSDate(utcDate);
    }
}
