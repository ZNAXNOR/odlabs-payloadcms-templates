import type { Page } from '@/payload-types';
import React from 'react';
type LowImpactHeroType = ({
    children?: never;
    richText?: Page['hero']['richText'];
} & Omit<Page['hero'], 'richText'>) | {
    children?: React.ReactNode;
    richText?: never;
};
export declare const LowImpactHero: React.FC<LowImpactHeroType>;
export {};
