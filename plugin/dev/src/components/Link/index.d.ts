import type { Page, Post } from '@/payload-types';
import { type ButtonProps } from '@/components/ui/button';
import React from 'react';
type CMSLinkType = {
    appearance?: 'inline' | ButtonProps['variant'];
    children?: React.ReactNode;
    className?: string;
    label?: string | null;
    newTab?: boolean | null;
    reference?: {
        relationTo: 'pages' | 'posts';
        value: Page | Post | string | number;
    } | null;
    size?: ButtonProps['size'] | null;
    type?: 'custom' | 'reference' | null;
    url?: string | null;
};
export declare const CMSLink: React.FC<CMSLinkType>;
export {};
