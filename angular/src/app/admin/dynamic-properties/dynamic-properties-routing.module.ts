import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPropertyComponent } from './dynamic-property.component';

const routes: Routes = [
    {
        path: '',
        component: DynamicPropertyComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DynamicPropertiesRoutingModule {}
