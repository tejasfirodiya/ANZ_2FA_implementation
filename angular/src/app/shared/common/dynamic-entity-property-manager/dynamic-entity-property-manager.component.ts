import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicEntityPropertyServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { ManageValuesModalComponent } from '@app/admin/dynamic-properties/dynamic-entity-properties/value/manage-values-modal.component';

@Component({
    selector: 'dynamic-entity-property-manager',
    templateUrl: './dynamic-entity-property-manager.component.html',
})
export class DynamicEntityPropertyManagerComponent implements OnInit {
    @ViewChild('dynamicPropertiesModal', { static: true }) dynamicPropertiesModal: ManageValuesModalComponent;
    entityNamesHasDynamicProperty: string[];

    constructor(
        private _dynamicEntityProperty: DynamicEntityPropertyServiceProxy,
        private _permissionCheckerService: PermissionCheckerService
    ) {}

    ngOnInit(): void {
        if (!this.hasPermission()) {
            return;
        }

        this._dynamicEntityProperty.getAllEntitiesHasDynamicProperty().subscribe((result) => {
            if (result && result.items) {
                this.entityNamesHasDynamicProperty = result.items.map((i) => i.entityFullName);
            }
        });
    }

    hasPermission(): boolean {
        return (
            this._permissionCheckerService.isGranted('Pages.Administration.DynamicEntityProperties') &&
            this._permissionCheckerService.isGranted('Pages.Administration.DynamicEntityPropertyValue.Edit')
        );
    }

    hasEntity(entityName): boolean {
        return this.entityNamesHasDynamicProperty.indexOf(entityName) > -1;
    }

    canShow(entityName): boolean {
        return this.hasPermission() && this.hasEntity(entityName);
    }

    getModal(): ManageValuesModalComponent {
        return this.dynamicPropertiesModal;
    }
}
