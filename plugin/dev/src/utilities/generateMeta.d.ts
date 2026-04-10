import type { Metadata } from 'next';
import type { Page, Post } from '../payload-types';
export declare const generateMeta: (args: {
    doc: null | Partial<Page> | Partial<Post>;
}) => Promise<Metadata>;
