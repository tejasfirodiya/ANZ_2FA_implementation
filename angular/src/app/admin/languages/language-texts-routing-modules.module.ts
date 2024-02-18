import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageTextsComponent } from './language-texts.component';

const routes: Routes = [
    {
        path: '',
        component: LanguageTextsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LanguageTextsRoutingModules {}
