import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiCustomizationComponent } from './ui-customization.component';

const routes: Routes = [
    {
        path: '',
        component: UiCustomizationComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UICustomizationRoutingModule {}
