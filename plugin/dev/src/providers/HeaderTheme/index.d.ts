import type { Theme } from '@/providers/Theme/types';
import React from 'react';
export interface ContextType {
    headerTheme?: Theme | null;
    setHeaderTheme: (theme: Theme | null) => void;
}
export declare const HeaderThemeProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useHeaderTheme: () => ContextType;
