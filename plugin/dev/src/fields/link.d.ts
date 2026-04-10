import type { Field, GroupField } from 'payload';
export type LinkAppearances = 'default' | 'outline';
export declare const appearanceOptions: Record<LinkAppearances, {
    label: string;
    value: string;
}>;
type LinkType = (options?: {
    appearances?: false | LinkAppearances[];
    disableLabel?: boolean;
    overrides?: Partial<GroupField>;
}) => Field;
export declare const link: LinkType;
export {};
