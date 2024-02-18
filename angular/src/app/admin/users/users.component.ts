import { Component, Injector, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    EntityDtoOfInt64,
    GetRolesInput,
    GetUsersInput,
    UserListDto,
    UserServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditUserModalComponent } from './create-or-edit-user-modal.component';
import { EditUserPermissionsModalComponent } from './edit-user-permissions-modal.component';
import { ImpersonationService } from './impersonation.service';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { finalize } from 'rxjs/operators';
import { PermissionTreeModalComponent } from '../shared/permission-tree-modal.component';
import { LocalStorageService } from '@shared/utils/local-storage.service';
import { DynamicEntityPropertyManagerComponent } from '@app/shared/common/dynamic-entity-property-manager/dynamic-entity-property-manager.component';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './users.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./users.component.less'],
    animations: [appModuleAnimation()],
})
export class UsersComponent extends AppComponentBase implements AfterViewInit {
    @ViewChild('createOrEditUserModal', { static: true }) createOrEditUserModal: CreateOrEditUserModalComponent;
    @ViewChild('editUserPermissionsModal', { static: true })
    editUserPermissionsModal: EditUserPermissionsModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('ExcelFileUpload', { static: false }) excelFileUpload: FileUpload;
    @ViewChild('permissionFilterTreeModal', { static: true }) permissionFilterTreeModal: PermissionTreeModalComponent;
    @ViewChild('dynamicEntityPropertyManager', { static: true })
    dynamicEntityPropertyManager: DynamicEntityPropertyManagerComponent;

    uploadUrl: string;

    //Filters
    advancedFiltersAreShown = false;
    filterText = '';
    role = '';
    onlyLockedUsers = false;

    constructor(
        injector: Injector,
        public _impersonationService: ImpersonationService,
        private _userServiceProxy: UserServiceProxy,
        private _fileDownloadService: FileDownloadService,
        private _activatedRoute: ActivatedRoute,
        private _httpClient: HttpClient,
        private _localStorageService: LocalStorageService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/Users/ImportFromExcel';
    }

    ngAfterViewInit(): void {
        this.primengTableHelper.adjustScroll(this.dataTable);
    }

    getUsers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._userServiceProxy
            .getUsers(
                new GetUsersInput({
                    filter: this.filterText,
                    permissions: this.permissionFilterTreeModal.getSelectedPermissions(),
                    role: this.role !== '' ? parseInt(this.role) : undefined,
                    onlyLockedUsers: this.onlyLockedUsers,
                    sorting: this.primengTableHelper.getSorting(this.dataTable),
                    maxResultCount: this.primengTableHelper.getMaxResultCount(this.paginator, event),
                    skipCount: this.primengTableHelper.getSkipCount(this.paginator, event),
                })
            )
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.setUsersProfilePictureUrl(this.primengTableHelper.records);
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    unlockUser(record): void {
        this._userServiceProxy.unlockUser(new EntityDtoOfInt64({ id: record.id })).subscribe(() => {
            this.notify.success(this.l('UnlockedTheUser', record.userName));
            this.reloadPage();
        });
    }

    getRolesAsString(roles): string {
        let roleNames = '';

        for (let j = 0; j < roles.length; j++) {
            if (roleNames.length) {
                roleNames = roleNames + ', ';
            }

            roleNames = roleNames + roles[j].roleName;
        }

        return roleNames;
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    exportToExcel(): void {
        this._userServiceProxy
            .getUsersToExcel(
                this.filterText,
                this.permissionFilterTreeModal.getSelectedPermissions(),
                this.role !== '' ? parseInt(this.role) : undefined,
                this.onlyLockedUsers,
                this.primengTableHelper.getSorting(this.dataTable)
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createUser(): void {
        this.createOrEditUserModal.show();
    }

    uploadExcel(data: { files: File }): void {
        const formData: FormData = new FormData();
        const file = data.files[0];
        formData.append('file', file, file.name);

        this._httpClient
            .post<any>(this.uploadUrl, formData)
            .pipe(finalize(() => this.excelFileUpload.clear()))
            .subscribe((response) => {
                if (response.success) {
                    this.notify.success(this.l('ImportUsersProcessStart'));
                } else if (response.error != null) {
                    this.notify.error(this.l('ImportUsersUploadFailed'));
                }
            });
    }

    onUploadExcelError(): void {
        this.notify.error(this.l('ImportUsersUploadFailed'));
    }

    deleteUser(user: UserListDto): void {
        if (user.userName === AppConsts.userManagement.defaultAdminUserName) {
            this.message.warn(this.l('{0}UserCannotBeDeleted', AppConsts.userManagement.defaultAdminUserName));
            return;
        }

        this.message.confirm(this.l('UserDeleteWarningMessage', user.userName), this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._userServiceProxy.deleteUser(user.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    showDynamicProperties(user: UserListDto): void {
        this.dynamicEntityPropertyManager
            .getModal()
            .show('MyTrainingV1231AngularDemo.Authorization.Users.User', user.id.toString());
    }

    setUsersProfilePictureUrl(users: UserListDto[]): void {
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            this._localStorageService.getItem(AppConsts.authorization.encrptedAuthTokenName, function (err, value) {
                let profilePictureUrl =
                    AppConsts.remoteServiceBaseUrl +
                    '/Profile/GetProfilePictureByUser?userId=' +
                    user.id +
                    '&' +
                    AppConsts.authorization.encrptedAuthTokenName +
                    '=' +
                    encodeURIComponent(value.token);
                (user as any).profilePictureUrl = profilePictureUrl;
            });
        }
    }

    isUserLocked(user: UserListDto): boolean {
        if (!user.lockoutEndDateUtc) {
            return false;
        }

        var lockoutEndDateUtc = this._dateTimeService.changeDateTimeZone(user.lockoutEndDateUtc, 'UTC');
        return lockoutEndDateUtc > this._dateTimeService.getUTCDate();
    }
}
