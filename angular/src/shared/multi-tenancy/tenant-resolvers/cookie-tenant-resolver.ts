export class CookieTenantResolver {

    resolve(): string {
        return abp.utils.getCookieValue('abp_tenancy_name');
    }

}