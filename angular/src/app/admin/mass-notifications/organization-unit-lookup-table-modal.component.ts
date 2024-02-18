import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { NameValueDto, OrganizationUnitServiceProxy, OrganizationUnitDto } from '@shared/service-proxies/service-proxies';
import { IOrganizationUnitsTreeComponentData, OrganizationUnitsTreeComponent } from '../shared/organization-unit-tree.component';

@Component({
  selector: 'organization-unit-lookup-table-modal',
  templateUrl: './organization-unit-lookup-table-modal.component.html'
})
export class OrganizationUnitLookupTableModalComponent extends AppComponentBase {
  @ViewChild('organizationUnitLookupTableModal', { static: true }) modal: ModalDirective;
  @ViewChild('organizationUnitTree') organizationUnitTree: OrganizationUnitsTreeComponent;

  filterText = '';

  @Output() modalSave: EventEmitter<NameValueDto[]> = new EventEmitter<NameValueDto[]>();
  active = false;
  saving = false;

  allOrganizationUnits: OrganizationUnitDto[];

  constructor(injector: Injector,
    private _organizationUnitServiceProxy: OrganizationUnitServiceProxy) {
    super(injector);
  }

  show(): void {
    this.active = true;
    this.modal.show();
    this.getOrganizationUnits();
  }

  getOrganizationUnits(): void {
    this._organizationUnitServiceProxy.getAll().subscribe((result) => {
      this.allOrganizationUnits = result;
    });
  }

  onShown(): void {
    this.organizationUnitTree.data = <IOrganizationUnitsTreeComponentData>{
      allOrganizationUnits: this.allOrganizationUnits,
      selectedOrganizationUnits: []
    };
  }

  save() {
    this.active = false;
    this.modal.hide();
    this.modalSave.emit(this.organizationUnitTree.getSelectedOrganizations());
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
