import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CachingServiceProxy, EntityDtoOfString, NotificationServiceProxy, WebLogServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { escape as _escape } from 'lodash-es';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.less'],
    animations: [appModuleAnimation()],
})
export class MaintenanceComponent extends AppComponentBase implements OnInit {
    loading = false;
    caches: any = null;
    canClearAllCaches = false;
    logs: any = '';

    constructor(
        injector: Injector,
        private _cacheService: CachingServiceProxy,
        private _webLogService: WebLogServiceProxy,
        private _fileDownloadService: FileDownloadService,
        private _notificationService: NotificationServiceProxy
    ) {
        super(injector);
    }

    sendNewVersionAvailableNotification(): void {
        abp.message.confirm(this.l('SendNewVersionNotificationWarningMessage'), null, (isConfirmed) => {
            if (isConfirmed){
                this._notificationService.createNewVersionReleasedNotification().subscribe(result => {
                    abp.notify.info(this.l('SuccessfullySentNewVersionNotification'));
                });
            }
        });
    }

    getCaches(): void {
        const self = this;
        self.loading = true;
        self._cacheService
            .getAllCaches()
            .pipe(
                finalize(() => {
                    self.loading = false;
                })
            )
            .subscribe((result) => {
                self.caches = result.items;
            });
    }

    clearCache(cacheName): void {
        const self = this;
        const input = new EntityDtoOfString();
        input.id = cacheName;

        self._cacheService.clearCache(input).subscribe(() => {
            self.notify.success(self.l('CacheSuccessfullyCleared'));
        });
    }

    clearAllCaches(): void {
        const self = this;
        self._cacheService.clearAllCaches().subscribe(() => {
            self.notify.success(self.l('AllCachesSuccessfullyCleared'));
        });
    }

    getWebLogs(): void {
        const self = this;
        self._webLogService.getLatestWebLogs().subscribe((result) => {
            self.logs = result.latestWebLogLines;
            self.fixWebLogsPanelHeight();
        });
    }

    setCanClearAllCaches(): void{
        this._cacheService.canClearAllCaches().subscribe((result) => {
            this.canClearAllCaches = result;
        });
    }

    downloadWebLogs = function () {
        const self = this;
        self._webLogService.downloadWebLogs().subscribe((result) => {
            self._fileDownloadService.downloadTempFile(result);
        });
    };

    getLogClass(log: string): string {
        if (log.startsWith('DEBUG')) {
            return 'badge badge-dark';
        }

        if (log.startsWith('INFO')) {
            return 'badge badge-info';
        }

        if (log.startsWith('WARN')) {
            return 'badge badge-warning';
        }

        if (log.startsWith('ERROR')) {
            return 'badge badge-danger';
        }

        if (log.startsWith('FATAL')) {
            return 'badge badge-danger';
        }

        return '';
    }

    getLogType(log: string): string {
        if (log.startsWith('DEBUG')) {
            return 'DEBUG';
        }

        if (log.startsWith('INFO')) {
            return 'INFO';
        }

        if (log.startsWith('WARN')) {
            return 'WARN';
        }

        if (log.startsWith('ERROR')) {
            return 'ERROR';
        }

        if (log.startsWith('FATAL')) {
            return 'FATAL';
        }

        return '';
    }

    getRawLogContent(log: string): string {
        return _escape(log)
            .replace('DEBUG', '')
            .replace('INFO', '')
            .replace('WARN', '')
            .replace('ERROR', '')
            .replace('FATAL', '');
    }

    fixWebLogsPanelHeight(): void {
        let panel = document.getElementsByClassName('full-height')[0];
        const windowHeight = document.body.clientHeight;
        const panelHeight = panel.clientHeight;
        const difference = windowHeight - panelHeight;
        const fixedHeight = panelHeight + difference;
        (panel as any).style.height = fixedHeight - 420 + 'px';
    }

    onResize(event): void {
        this.fixWebLogsPanelHeight();
    }

    ngOnInit(): void {
        const self = this;
        self.getCaches();
        self.getWebLogs();
        self.setCanClearAllCaches();
    }
}
