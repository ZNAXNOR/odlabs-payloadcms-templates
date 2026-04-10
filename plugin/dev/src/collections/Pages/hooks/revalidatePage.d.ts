import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import type { Page } from '../../../payload-types';
export declare const revalidatePage: CollectionAfterChangeHook<Page>;
export declare const revalidateDelete: CollectionAfterDeleteHook<Page>;
