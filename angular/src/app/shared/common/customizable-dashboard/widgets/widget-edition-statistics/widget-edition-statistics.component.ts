import { Component, OnInit, ElementRef, ViewChild, Injector, Inject } from '@angular/core';
import { HostDashboardServiceProxy, GetEditionTenantStatisticsOutput } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { filter as _filter } from 'lodash-es';
import { WidgetComponentBaseComponent } from '../widget-component-base';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { WidgetOnResizeEventHandler, WIDGETONRESIZEEVENTHANDLERTOKEN } from '../../customizable-dashboard.component';

@Component({
    selector: 'app-widget-edition-statistics',
    templateUrl: './widget-edition-statistics.component.html',
    styleUrls: ['./widget-edition-statistics.component.css'],
})
export class WidgetEditionStatisticsComponent extends WidgetComponentBaseComponent implements OnInit {
    @ViewChild('EditionStatisticsChart', { static: true }) editionStatisticsChart: ElementRef;

    selectedDateRange: DateTime[] = [
        this._dateTimeService.getStartOfDayMinusDays(7),
        this._dateTimeService.getEndOfDay(),
    ];

    editionStatisticsHasData = false;
    editionStatisticsData;

    constructor(
        injector: Injector,
        private _hostDashboardServiceProxy: HostDashboardServiceProxy,
        private _dateTimeService: DateTimeService,
        @Inject(WIDGETONRESIZEEVENTHANDLERTOKEN) private _widgetOnResizeEventHandler: WidgetOnResizeEventHandler
    ) {
        super(injector);
        _widgetOnResizeEventHandler.onResize.subscribe(()=>{
            this.runDelayed(this.showChart);
        });
    }

    ngOnInit(): void {
        this.subDateRangeFilter();
        this.runDelayed(this.showChart);
    }

    showChart = () => {
        this._hostDashboardServiceProxy
            .getEditionTenantStatistics(this.selectedDateRange[0], this.selectedDateRange[1])
            .subscribe((editionTenantStatistics) => {
                this.editionStatisticsData = this.normalizeEditionStatisticsData(editionTenantStatistics);
                this.editionStatisticsHasData =
                    _filter(this.editionStatisticsData, (data) => data.value > 0).length > 0;
            });
    };

    normalizeEditionStatisticsData(data: GetEditionTenantStatisticsOutput): Array<any> {
        if (!data || !data.editionStatistics || data.editionStatistics.length === 0) {
            return [];
        }

        const chartData = new Array(data.editionStatistics.length);

        for (let i = 0; i < data.editionStatistics.length; i++) {
            chartData[i] = {
                name: data.editionStatistics[i].label,
                value: data.editionStatistics[i].value,
            };
        }

        return chartData;
    }

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
        this.runDelayed(this.showChart);
    };

    subDateRangeFilter() {
        this.subscribeToEvent('app.dashboardFilters.dateRangePicker.onDateChange', this.onDateRangeFilterChange);
    }
}
