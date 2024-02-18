import { Component, Output, EventEmitter, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DashboardCustomizationServiceProxy, WidgetOutput } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardCustomizationConst } from '../DashboardCustomizationConsts';

@Component({
    selector: 'add-widget-modal',
    templateUrl: './add-widget-modal.component.html',
    styleUrls: ['./add-widget-modal.component.css'],
})
export class AddWidgetModalComponent extends AppComponentBase {
    @Output() onClose = new EventEmitter();
    @ViewChild('addWidgetModal', { static: true }) modal: ModalDirective;

    widgets: WidgetOutput[];
    saving = false;
    selectedWidgetId: string;

    constructor(injector: Injector,
        private _dashboardCustomizationServiceProxy: DashboardCustomizationServiceProxy) {
        super(injector);
    }

    close(): void {
        this.onClose.emit();
        this.hide();
    }

    save(): void {
        this.onClose.emit(this.selectedWidgetId);
        this.hide();
    }

    show(dashboardName: string, pageId: string): void {
        this._dashboardCustomizationServiceProxy.getAllAvailableWidgetDefinitionsForPage(dashboardName, DashboardCustomizationConst.Applications.Angular, pageId)
            .subscribe(availableWidgets => {
                this.widgets = availableWidgets;
                if (this.widgets && this.widgets.length) {
                    this.selectedWidgetId = this.widgets[0].id;
                } else {
                    this.selectedWidgetId = null;
                }
                this.modal.show();
            });
    }

    hide(): void {
        this.modal.hide();
    }
}
