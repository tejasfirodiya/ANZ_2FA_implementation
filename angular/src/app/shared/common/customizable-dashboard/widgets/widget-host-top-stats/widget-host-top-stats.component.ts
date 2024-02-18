import { Component, Injector, OnInit } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { HostDashboardServiceProxy, TopStatsData } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { WidgetComponentBaseComponent } from '../widget-component-base';

@Component({
    selector: 'app-widget-host-top-stats',
    templateUrl: './widget-host-top-stats.component.html',
    styleUrls: ['./widget-host-top-stats.component.css'],
})
export class WidgetHostTopStatsComponent extends WidgetComponentBaseComponent implements OnInit {
    public countoNewSubscriptionAmount = 0;
    public countoNewTenantsCount = 0;
    public countoDashboardPlaceholder1 = 0;
    public countoDashboardPlaceholder2 = 0;

    selectedDateRange: DateTime[] = [
        this._dateTimeService.getStartOfDayMinusDays(7),
        this._dateTimeService.getEndOfDay(),
    ];
    loading = true;
    topStatsData: TopStatsData;
    constructor(
        injector: Injector,
        private _hostDashboardServiceProxy: HostDashboardServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.subDateRangeFilter();
        this.runDelayed(this.loadHostTopStatsData);
    }

    loadHostTopStatsData = () => {
        this._hostDashboardServiceProxy
            .getTopStatsData(this.selectedDateRange[0], this.selectedDateRange[1])
            .subscribe((data) => {
                this.topStatsData = data;
                this.loading = false;
            });
    };

    onDateRangeFilterChange = (dateRange) => {
        if (
            !dateRange ||
            dateRange.length !== 2 ||
            (this.selectedDateRange[0] === dateRange[0] && this.selectedDateRange[1] === dateRange[1])
        ) {
            return;
        }

        this.selectedDateRange[0] = dateRange[0];
        this.selectedDateRange[1] = dateRange[1];
        this.runDelayed(this.loadHostTopStatsData);
    };

    subDateRangeFilter() {
        this.subscribeToEvent('app.dashboardFilters.dateRangePicker.onDateChange', this.onDateRangeFilterChange);
    }
}
