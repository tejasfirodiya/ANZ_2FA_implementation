import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UICustomizationRoutingModule } from './ui-customization-routing.module';
import { UiCustomizationComponent } from './ui-customization.component';
import { DefaultThemeUiSettingsComponent } from './default-theme-ui-settings.component';
import { Theme2ThemeUiSettingsComponent } from './theme2-theme-ui-settings.component';
import { Theme3ThemeUiSettingsComponent } from './theme3-theme-ui-settings.component';
import { Theme4ThemeUiSettingsComponent } from './theme4-theme-ui-settings.component';
import { Theme5ThemeUiSettingsComponent } from './theme5-theme-ui-settings.component';
import { Theme6ThemeUiSettingsComponent } from './theme6-theme-ui-settings.component';
import { Theme7ThemeUiSettingsComponent } from './theme7-theme-ui-settings.component';
import { Theme8ThemeUiSettingsComponent } from './theme8-theme-ui-settings.component';
import { Theme9ThemeUiSettingsComponent } from './theme9-theme-ui-settings.component';
import { Theme10ThemeUiSettingsComponent } from './theme10-theme-ui-settings.component';
import { Theme11ThemeUiSettingsComponent } from './theme11-theme-ui-settings.component';
import { Theme12ThemeUiSettingsComponent } from './theme12-theme-ui-settings.component';
import { Theme13ThemeUiSettingsComponent } from './theme13-theme-ui-settings.component';

@NgModule({
    declarations: [
        UiCustomizationComponent,
        DefaultThemeUiSettingsComponent,
        Theme2ThemeUiSettingsComponent,
        Theme3ThemeUiSettingsComponent,
        Theme3ThemeUiSettingsComponent,
        Theme4ThemeUiSettingsComponent,
        Theme5ThemeUiSettingsComponent,
        Theme6ThemeUiSettingsComponent,
        Theme7ThemeUiSettingsComponent,
        Theme8ThemeUiSettingsComponent,
        Theme9ThemeUiSettingsComponent,
        Theme10ThemeUiSettingsComponent,
        Theme11ThemeUiSettingsComponent,
        Theme12ThemeUiSettingsComponent,
        Theme13ThemeUiSettingsComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule, UICustomizationRoutingModule],
})
export class UICustomizationModule {}
