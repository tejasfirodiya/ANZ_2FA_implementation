import { Component, Injector, OnInit, ViewEncapsulation, NgZone, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { NotificationServiceProxy, UserNotification } from '@shared/service-proxies/service-proxies';
import { IFormattedUserNotification, UserNotificationHelper } from './UserNotificationHelper';
import { forEach as _forEach } from 'lodash-es';
import { UrlHelper } from '@shared/helpers/UrlHelper';

@Component({
    templateUrl: './header-notifications.component.html',
    selector: 'header-notifications',
    styleUrls: ['./header-notifications.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNotificationsComponent extends AppComponentBase implements OnInit {
    @Input() customStyle = 'btn btn-active-color-primary btn-active-light btn-custom btn-icon btn-icon-muted h-35px h-md-40px position-relative w-35px w-md-40px';
    @Input() iconStyle = 'flaticon-alert-2 unread-notification fs-4';
    @Input() isRight = true;

    notifications: IFormattedUserNotification[] = [];
    unreadNotificationCount = 0;

    constructor(
        injector: Injector,
        private _notificationService: NotificationServiceProxy,
        private _userNotificationHelper: UserNotificationHelper,
        public _zone: NgZone
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.loadNotifications();
        this.registerToEvents();
    }

    loadNotifications(): void {
        if (UrlHelper.isInstallUrl(location.href)) {
            return;
        }

        this._notificationService.getUserNotifications(undefined, undefined, undefined, 3, 0).subscribe((result) => {
            this.unreadNotificationCount = result.unreadCount;
            this.notifications = [];
            _forEach(result.items, (item: UserNotification) => {
                this.notifications.push(this._userNotificationHelper.format(<any>item));
            });
        });

        this.shouldUserUpdateApp();
    }

    registerToEvents() {
        let self = this;

        function onNotificationReceived(userNotification) {
            self._userNotificationHelper.show(userNotification);
            self.loadNotifications();
        }

        this.subscribeToEvent('abp.notifications.received', (userNotification) => {
            self._zone.run(() => {
                onNotificationReceived(userNotification);
            });
        });

        function onNotificationsRefresh() {
            self.loadNotifications();
        }

        this.subscribeToEvent('app.notifications.refresh', () => {
            self._zone.run(() => {
                onNotificationsRefresh();
            });
        });

        function onNotificationsRead(userNotificationId, success) {
            for (let i = 0; i < self.notifications.length; i++) {
                if (self.notifications[i].userNotificationId === userNotificationId) {
                    self.notifications[i].state = 'READ';
                    self.notifications[i].isUnread = false;
                }
            }

            if (success){
                self.unreadNotificationCount -= 1;
            }
        }

        this.subscribeToEvent('app.notifications.read', (userNotificationId, success) => {
            self._zone.run(() => {
                onNotificationsRead(userNotificationId, success);
            });
        });
    }

    shouldUserUpdateApp(): void{
        this._userNotificationHelper.shouldUserUpdateApp();
    }

    setAllNotificationsAsRead(): void {
        this._userNotificationHelper.setAllAsRead();
    }

    openNotificationSettingsModal(): void {
        this._userNotificationHelper.openSettingsModal();
    }

    setNotificationAsRead(userNotification: IFormattedUserNotification): void {
        if (userNotification.state !== 'READ') {
            this._userNotificationHelper.setAsRead(userNotification.userNotificationId);
        }
    }

    gotoUrl(url): void {
        if (url) {
            location.href = url;
        }
    }
}
