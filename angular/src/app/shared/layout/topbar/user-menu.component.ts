import { Component, Injector, OnInit, Input } from '@angular/core';
import { ThemesLayoutBaseComponent } from '../themes/themes-layout-base.component';
import { LinkedUserDto, ProfileServiceProxy, UserLinkServiceProxy } from '@shared/service-proxies/service-proxies';
import { LinkedAccountService } from '@app/shared/layout/linked-account.service';
import { AbpMultiTenancyService, AbpSessionService } from 'abp-ng2-module';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { ImpersonationService } from '@app/admin/users/impersonation.service';
import { AppConsts } from '@shared/AppConsts';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { Router } from '@angular/router';

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
})
export class UserMenuComponent extends ThemesLayoutBaseComponent implements OnInit {
    @Input() iconOnly = false;

    @Input() togglerCssClass = 'cursor-pointer symbol symbol-35px symbol-md-40px';
    @Input() profileImageCssClass = '';
    //TODO@Metronic8 -> we may delete this.
    @Input() textCssClass = 'text-dark-50 fw-bolder fs-base d-none d-md-inline me-3';
    @Input() symbolCssClass = 'symbol symbol-lg-30px symbol-20px';
    @Input() symbolTextCssClass = 'symbol-label fs-2 fw-bold bg-success text-inverse-success';

    usernameFirstLetter = '';

    profilePicture = AppConsts.appBaseUrl + '/assets/common/images/default-profile-picture.png';
    shownLoginName = '';
    tenancyName = '';
    userName = '';
    emailAddress = '';

    recentlyLinkedUsers: LinkedUserDto[];
    isImpersonatedLogin = false;
    isMultiTenancyEnabled = false;

    mQuickUserOffcanvas: any;

    public constructor(
        injector: Injector,
        private _router: Router,
        private _linkedAccountService: LinkedAccountService,
        private _abpMultiTenancyService: AbpMultiTenancyService,
        private _profileServiceProxy: ProfileServiceProxy,
        private _userLinkServiceProxy: UserLinkServiceProxy,
        private _authService: AppAuthService,
        private _impersonationService: ImpersonationService,
        private _abpSessionService: AbpSessionService,
        _dateTimeService: DateTimeService
    ) {
        super(injector, _dateTimeService);
    }

    ngOnInit(): void {
        this.isImpersonatedLogin = this._abpSessionService.impersonatorUserId > 0;
        this.isMultiTenancyEnabled = this._abpMultiTenancyService.isEnabled;
        this.setCurrentLoginInformations();
        this.getProfilePicture();
        this.getRecentlyLinkedUsers();
        this.registerToEvents();
        this.usernameFirstLetter = this.appSession.user.userName.substring(0, 1).toUpperCase();
    }

    setCurrentLoginInformations(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
        this.tenancyName = this.appSession.tenancyName;
        this.userName = this.appSession.user.userName;
        this.emailAddress = this.appSession.user.emailAddress;
    }

    getShownUserName(linkedUser: LinkedUserDto): string {
        if (!this._abpMultiTenancyService.isEnabled) {
            return linkedUser.username;
        }

        return (linkedUser.tenantId ? linkedUser.tenancyName : '.') + '\\' + linkedUser.username;
    }

    getProfilePicture(): void {
        this._profileServiceProxy.getProfilePicture().subscribe((result) => {
            if (result && result.profilePicture) {
                this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
            }
        });
    }

    getRecentlyLinkedUsers(): void {
        this._userLinkServiceProxy.getRecentlyUsedLinkedUsers().subscribe((result) => {
            this.recentlyLinkedUsers = result.items;
        });
    }

    showLoginAttempts(): void {
        this._router.navigate(['/app/admin/login-attempts']);
    }

    showLinkedAccounts(): void {
        abp.event.trigger('app.show.linkedAccountsModal');
    }

    showUserDelegations(): void {
        abp.event.trigger('app.show.userDelegationsModal');
    }

    changePassword(): void {
        abp.event.trigger('app.show.changePasswordModal');
    }

    changeProfilePicture(): void {
        abp.event.trigger('app.show.changeProfilePictureModal');
    }

    changeMySettings(): void {
        abp.event.trigger('app.show.mySettingsModal');
    }

    registerToEvents() {
        this.subscribeToEvent('profilePictureChanged', () => {
            this.getProfilePicture();
        });

        this.subscribeToEvent('app.getRecentlyLinkedUsers', () => {
            this.getRecentlyLinkedUsers();
        });

        this.subscribeToEvent('app.onMySettingsModalSaved', () => {
            this.onMySettingsModalSaved();
        });
    }

    logout(): void {
        this._authService.logout();
    }

    onMySettingsModalSaved(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
    }

    backToMyAccount(): void {
        this._impersonationService.backToImpersonator();
    }

    switchToLinkedUser(linkedUser: LinkedUserDto): void {
        this._linkedAccountService.switchToAccount(linkedUser.id, linkedUser.tenantId);
    }

    downloadCollectedData(): void {
        this._profileServiceProxy.prepareCollectedData().subscribe(() => {
            this.message.success(this.l('GdprDataPrepareStartedNotification'));
        });
    }
}
