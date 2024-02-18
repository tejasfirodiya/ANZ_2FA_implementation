import { TenantLoginInfoDto } from './service-proxies';

declare module './service-proxies' {
    interface TenantLoginInfoDto {
        HasLogo(): boolean;
        HasLogoMinimal(): boolean;
        HasDarkLogo(): boolean;
        HasLightLogo(): boolean;
    }
}

TenantLoginInfoDto.prototype.HasLogo = function (): boolean {
    return (this.darkLogoId != null && this.darkLogoFileType != null) || (this.lightLogoId != null && this.lightLogoFileType != null);
}

TenantLoginInfoDto.prototype.HasLogoMinimal = function (): boolean {
    return (this.darkLogoMinimalId != null && this.darkLogoMinimalFileType != null) || (this.lightLogoMinimalId != null && this.lightLogoMinimalFileType != null);
}

TenantLoginInfoDto.prototype.HasDarkLogo = function (): boolean {
    return this.darkLogoId != null && this.darkLogoFileType != null;
}

TenantLoginInfoDto.prototype.HasLightLogo = function (): boolean {
    return this.lightLogoId != null && this.lightLogoFileType != null;
}

