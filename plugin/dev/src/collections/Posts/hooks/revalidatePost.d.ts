import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import type { Post } from '../../../payload-types.js';
export declare const revalidatePost: CollectionAfterChangeHook<Post>;
export declare const revalidateDelete: CollectionAfterDeleteHook<Post>;
