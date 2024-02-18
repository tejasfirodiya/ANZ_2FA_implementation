import { AfterViewInit, Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { DateTimeService } from './date-time.service';

@Directive({
    selector: '[dateRangePickerInitialValue]',
})
export class DateRangePickerInitialValueSetterDirective implements AfterViewInit {
    @Input() ngModel;
    hostElement: ElementRef;

    constructor(injector: Injector, private _element: ElementRef, private _dateTimeService: DateTimeService) {
        this.hostElement = _element;
    }

    ngAfterViewInit(): void {
        if (this.ngModel && this.ngModel[0] && this.ngModel[1]) {
            setTimeout(() => {
                let value =
                    this._dateTimeService.formatDate(this.ngModel[0], 'F') +
                    ' - ' +
                    this._dateTimeService.formatDate(this.ngModel[1], 'F');
                (this.hostElement.nativeElement as any).value = value;
            });
        }
    }
}
