import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CommonLookupServiceProxy, FindUsersInput, NameValueDto, PagedResultDtoOfNameValueDto } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface ICommonLookupModalOptions {
    title?: string;
    isFilterEnabled?: boolean;
    dataSource: (
        skipCount: number,
        maxResultCount: number,
        filter: string,
        tenantId?: number,
        excludeCurrentUser?: boolean
    ) => Observable<PagedResultDtoOfNameValueDto>;
    canSelect?: (item: NameValueDto) => boolean | Observable<boolean>;
    loadOnStartup?: boolean;
    pageSize?: number;
}

//For more modal options http://valor-software.com/ngx-bootstrap/#/modals#modal-directive

@Component({
    selector: 'friendsLookupTable',
    templateUrl: './friends-lookup-table.component.html',
})
export class FriendsLookupTableComponent extends AppComponentBase implements OnInit{


    @Output() itemSelected: EventEmitter<NameValueDto> = new EventEmitter<NameValueDto>();

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    public saving = false;

    options: ICommonLookupModalOptions = {
        dataSource: (skipCount: number, maxResultCount: number, filter: string, tenantId?: number, excludeCurrentUser?: boolean) => {
            const input = new FindUsersInput();
            input.filter = filter;
            input.maxResultCount = maxResultCount;
            input.skipCount = skipCount;
            input.tenantId = tenantId;
            input.excludeCurrentUser = excludeCurrentUser;
            return this._commonLookupService.findUsers(input);
        },
        title: this.l('AddFriend'),
        canSelect: () => true,
        loadOnStartup: true,
        isFilterEnabled: true,
        pageSize: AppConsts.grid.defaultPageSize,
    };

    isInitialized = false;
    filterText = '';
    excludeCurrentUser = true;
    tenantId?: number;

    constructor(injector: Injector, private _commonLookupService: CommonLookupServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
    }

    refreshTable(): void {
        let page = this.paginator.getPage();

        this.paginator.changePage(page);
    }

    getRecordsIfNeeds(event?: LazyLoadEvent): void {
        if (!this.options.loadOnStartup && !this.isInitialized) {
            return;
        }

        this.getRecords(event);
        this.isInitialized = true;
    }

    getRecords(event?: LazyLoadEvent): void {
        const maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        const skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this.options
            .dataSource(skipCount, maxResultCount, this.filterText, this.tenantId, this.excludeCurrentUser)
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    selectItem(item: NameValueDto) {
        const boolOrPromise = this.options.canSelect(item);
        if (!boolOrPromise) {
            return;
        }

        if (boolOrPromise === true) {
            this.itemSelected.emit(item);
            return;
        }

        //assume as observable
        (boolOrPromise as Observable<boolean>).subscribe((result) => {
            if (result) {
                this.itemSelected.emit(item);
            }
        });
    }
}
