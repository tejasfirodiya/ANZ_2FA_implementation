import { UrlHelper } from "@shared/helpers/UrlHelper";

export class QueryStringTenantResolver {

    resolve(): string {
        var queryParams = UrlHelper.getQueryParameters();
        return queryParams['abp_tenancy_name'];
    }

}