export class ThemeHelper {
    public static getTheme(): string {
        if(!abp.session.userId){
            return 'default';
        }

        return abp.setting.get('App.UiManagement.Theme');
    }

    public static darkMode(): boolean {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.DarkMode')?.toLowerCase() === 'true';
    }

    public static getAsideSkin(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Left.AsideSkin')?.toLowerCase();
    }

    public static getAllowAsideMinimizing(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Left.AllowAsideMinimizing')?.toLowerCase();
    }

    public static getDefaultMinimizedAside(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Left.DefaultMinimizedAside')?.toLowerCase();
    }

    public static getHoverableAside(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Left.HoverableAside')?.toLowerCase();
    }

    public static getFixedAside(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Left.FixedAside')?.toLowerCase();
    }

    public static getDesktopFixedHeader(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Header.DesktopFixedHeader')?.toLowerCase();
    }

    public static getMobileFixedHeader(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Header.MobileFixedHeader')?.toLowerCase();
    }

    public static getDesktopFixedToolbar(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Toolbar.DesktopFixedToolbar')?.toLowerCase();
    }

    public static getMobileFixedToolbar(): string {
        return abp.setting.get(ThemeHelper.getTheme() + '.App.UiManagement.Toolbar.MobileFixedToolbar')?.toLowerCase();
    }
}
