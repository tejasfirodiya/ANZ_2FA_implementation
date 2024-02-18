import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'users',
                        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
                        data: { permission: 'Pages.Administration.Users' },
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import('./roles/roles.module').then((m) => m.RolesModule),
                        data: { permission: 'Pages.Administration.Roles' },
                    },
                    {
                        path: 'auditLogs',
                        loadChildren: () => import('./audit-logs/audit-logs.module').then((m) => m.AuditLogsModule),
                        data: { permission: 'Pages.Administration.AuditLogs' },
                    },
                    {
                        path: 'maintenance',
                        loadChildren: () => import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule),
                        data: { permission: 'Pages.Administration.Host.Maintenance' },
                    },
                    {
                        path: 'hostSettings',
                        loadChildren: () => import('./settings/host-settings.module').then((m) => m.HostSettingsModule),
                        data: { permission: 'Pages.Administration.Host.Settings' },
                    },
                    {
                        path: 'editions',
                        loadChildren: () => import('./editions/editions.module').then((m) => m.EditionsModule),
                        data: { permission: 'Pages.Editions' },
                    },
                    {
                        path: 'languages',
                        loadChildren: () => import('./languages/languages.module').then((m) => m.LanguagesModule),
                        data: { permission: 'Pages.Administration.Languages' },
                    },
                    {
                        path: 'languages/:name/texts',
                        loadChildren: () =>
                            import('./languages/language-texts.module').then((m) => m.LanguageTextsModule),
                        data: { permission: 'Pages.Administration.Languages.ChangeTexts' },
                    },
                    {
                        path: 'tenants',
                        loadChildren: () => import('./tenants/tenants.module').then((m) => m.TenantsModule),
                        data: { permission: 'Pages.Tenants' },
                    },
                    {
                        path: 'organization-units',
                        loadChildren: () =>
                            import('./organization-units/organization-units.module').then(
                                (m) => m.OrganizationUnitsModule
                            ),
                        data: { permission: 'Pages.Administration.OrganizationUnits' },
                    },
                    {
                        path: 'subscription-management',
                        loadChildren: () =>
                            import('./subscription-management/subscription-management.module').then(
                                (m) => m.SubscriptionManagementModule
                            ),
                        data: { permission: 'Pages.Administration.Tenant.SubscriptionManagement' },
                    },
                    {
                        path: 'invoice/:paymentId',
                        loadChildren: () =>
                            import('./subscription-management/invoice/invoice.module').then((m) => m.InvoiceModule),
                        data: { permission: 'Pages.Administration.Tenant.SubscriptionManagement' },
                    },
                    {
                        path: 'tenantSettings',
                        loadChildren: () =>
                            import('./settings/tenant-settings.module').then((m) => m.TenantSettingsModule),
                        data: { permission: 'Pages.Administration.Tenant.Settings' },
                    },
                    {
                        path: 'hostDashboard',
                        loadChildren: () =>
                            import('./dashboard/host-dashboard.module').then((m) => m.HostDashboardModule),
                        data: { permission: 'Pages.Administration.Host.Dashboard' },
                    },
                    {
                        path: 'demo-ui-components',
                        loadChildren: () =>
                            import('./demo-ui-components/demo-ui-components.module').then(
                                (m) => m.DemoUIComponentsModule
                            ),
                        data: { permission: 'Pages.DemoUiComponents' },
                    },
                    {
                        path: 'install',
                        loadChildren: () => import('./install/install.module').then((m) => m.InstallModule),
                    },
                    {
                        path: 'ui-customization',
                        loadChildren: () =>
                            import('./ui-customization/ui-customization.module').then((m) => m.UICustomizationModule),
                    },
                    {
                        path: 'webhook-subscriptions',
                        loadChildren: () =>
                            import('./webhook-subscription/webhook-subscription.module').then(
                                (m) => m.WebhookSubscriptionModule
                            ),
                        data: { permission: 'Pages.Administration.WebhookSubscription' },
                    },
                    {
                        path: 'webhook-subscriptions-detail',
                        loadChildren: () =>
                            import('./webhook-subscription/webhook-subscription-detail.module').then(
                                (m) => m.WebhookSubscriptionDetailModule
                            ),
                        data: { permission: 'Pages.Administration.WebhookSubscription.Detail' },
                    },
                    {
                        path: 'webhook-event-detail',
                        loadChildren: () =>
                            import('./webhook-subscription/webhook-event-detail.module').then(
                                (m) => m.WebhookEventDetailModule
                            ),
                        data: { permission: 'Pages.Administration.WebhookSubscription.Detail' },
                    },
                    {
                        path: 'dynamic-property',
                        loadChildren: () =>
                            import('./dynamic-properties/dynamic-properties.module').then(
                                (m) => m.DynamicPropertiesModule
                            ),
                        data: { permission: 'Pages.Administration.DynamicEntityProperties' },
                    },
                    {
                        path: 'dynamic-entity-property/:entityFullName',
                        loadChildren: () =>
                            import(
                                './dynamic-properties/dynamic-entity-properties/dynamic-entity-properties.module'
                            ).then((m) => m.DynamicEntityPropertiesModule),
                        data: { permission: 'Pages.Administration.DynamicEntityProperties' },
                    },
                    {
                        path: 'dynamic-entity-property-value/manage-all/:entityFullName/:rowId',
                        loadChildren: () =>
                            import(
                                './dynamic-properties/dynamic-entity-properties/value/dynamic-entity-property-value.module'
                            ).then((m) => m.DynamicEntityPropertyValueModule),
                        data: { permission: 'Pages.Administration.DynamicEntityProperties' },
                    },
                    {
                        path: 'login-attempts',
                        loadChildren: () =>
                            import('./login-attempts/login-attempts.module').then((m) => m.LoginAttemptsModule),
                        data: {},
                    },
                    {
                        path: 'mass-notifications',
                        loadChildren: () => import('./mass-notifications/mass-notifications.module').then((m) => m.MassNotificationsModule),
                        data: { permission: 'Pages.Administration.MassNotification' },
                    },
                    { path: '', redirectTo: 'hostDashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'hostDashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule {
    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
