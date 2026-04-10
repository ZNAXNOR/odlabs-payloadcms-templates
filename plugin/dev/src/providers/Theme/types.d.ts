export type Theme = 'dark' | 'light';
export interface ThemeContextType {
    setTheme: (theme: Theme | null) => void;
    theme?: Theme | null;
}
export declare function themeIsValid(string: null | string): string is Theme;
