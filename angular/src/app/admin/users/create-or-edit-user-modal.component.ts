import { Component, EventEmitter, Injector, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CreateOrUpdateUserInput,
    OrganizationUnitDto,
    PasswordComplexitySetting,
    ProfileServiceProxy,
    UserEditDto,
    UserRoleDto,
    UserServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
    IOrganizationUnitsTreeComponentData,
    OrganizationUnitsTreeComponent,
} from '../shared/organization-unit-tree.component';
import { map as _map, filter as _filter } from 'lodash-es';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'createOrEditUserModal',
    templateUrl: './create-or-edit-user-modal.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['create-or-edit-user-modal.component.less']
})
export class CreateOrEditUserModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('organizationUnitTree') organizationUnitTree: OrganizationUnitsTreeComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    canChangeUserName = true;
    isTwoFactorEnabled: boolean = this.setting.getBoolean('Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled');
    isLockoutEnabled: boolean = this.setting.getBoolean('Abp.Zero.UserManagement.UserLockOut.IsEnabled');
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

    user: UserEditDto = new UserEditDto();
    roles: UserRoleDto[];
    sendActivationEmail = true;
    setRandomPassword = true;
    passwordComplexityInfo = '';
    profilePicture: string;
    allowedUserNameCharacters = '';
    isSMTPSettingsProvided = false;

    allOrganizationUnits: OrganizationUnitDto[];
    memberedOrganizationUnits: string[];
    userPasswordRepeat = '';

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
    }

    show(userId?: number): void {
        if (!userId) {
            this.active = true;
            this.setRandomPassword = true;
            this.sendActivationEmail = true;
        }

        this._userService.getUserForEdit(userId).subscribe((userResult) => {
            this.user = userResult.user;
            this.roles = userResult.roles;
            this.canChangeUserName = this.user.userName !== AppConsts.userManagement.defaultAdminUserName;
            this.allowedUserNameCharacters = userResult.allowedUserNameCharacters;
            this.isSMTPSettingsProvided = userResult.isSMTPSettingsProvided;
            this.sendActivationEmail = userResult.isSMTPSettingsProvided;

            this.allOrganizationUnits = userResult.allOrganizationUnits;
            this.memberedOrganizationUnits = userResult.memberedOrganizationUnits;

            this.getProfilePicture(userId);

            if (userId) {
                this.active = true;

                setTimeout(() => {
                    this.setRandomPassword = false;
                }, 0);

                this.sendActivationEmail = false;
            }

            this._profileService.getPasswordComplexitySetting().subscribe((passwordComplexityResult) => {
                this.passwordComplexitySetting = passwordComplexityResult.setting;
                this.setPasswordComplexityInfo();
                this.modal.show();
            });
        });
    }

    setPasswordComplexityInfo(): void {
        this.passwordComplexityInfo = '<ul>';

        if (this.passwordComplexitySetting.requireDigit) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireDigit_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireLowercase) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireLowercase_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireUppercase) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireUppercase_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireNonAlphanumeric) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireNonAlphanumeric_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requiredLength) {
            this.passwordComplexityInfo +=
                '<li>' +
                this.l('PasswordComplexity_RequiredLength_Hint', this.passwordComplexitySetting.requiredLength) +
                '</li>';
        }

        this.passwordComplexityInfo += '</ul>';
    }

    getProfilePicture(userId: number): void {
        if (!userId) {
            this.profilePicture = this.appRootUrl() + 'assets/common/images/default-profile-picture.png';
            return;
        }

        this._profileService.getProfilePictureByUser(userId).subscribe((result) => {
            if (result && result.profilePicture) {
                this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
            } else {
                this.profilePicture = this.appRootUrl() + 'assets/common/images/default-profile-picture.png';
            }
        });
    }

    onShown(): void {
        this.organizationUnitTree.data = <IOrganizationUnitsTreeComponentData>{
            allOrganizationUnits: this.allOrganizationUnits,
            selectedOrganizationUnits: this.memberedOrganizationUnits,
        };

        document.getElementById('Name').focus();
    }

    save(): void {
        let input = new CreateOrUpdateUserInput();

        input.user = this.user;
        input.setRandomPassword = this.setRandomPassword;
        input.sendActivationEmail = this.sendActivationEmail;
        input.assignedRoleNames = _map(
            _filter(this.roles, { isAssigned: true, inheritedFromOrganizationUnit: false }),
            (role) => role.roleName
        );

        input.organizationUnits = this.organizationUnitTree.getSelectedOrganizationIds();

        this.saving = true;
        this._userService
            .createOrUpdateUser(input)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.userPasswordRepeat = '';
        this.modal.hide();
    }

    getAssignedRoleCount(): number {
        return _filter(this.roles, { isAssigned: true }).length;
    }
}
