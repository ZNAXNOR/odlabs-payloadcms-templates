import type { ArrayField, Field } from 'payload';
import type { LinkAppearances } from './link';
type LinkGroupType = (options?: {
    appearances?: false | LinkAppearances[];
    overrides?: Partial<ArrayField>;
}) => Field;
export declare const linkGroup: LinkGroupType;
export {};
