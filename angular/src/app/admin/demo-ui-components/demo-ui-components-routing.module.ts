import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoUiComponentsComponent } from './demo-ui-components.component';

const routes: Routes = [
    {
        path: '',
        component: DemoUiComponentsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoUIComponentsRoutingModule {}
