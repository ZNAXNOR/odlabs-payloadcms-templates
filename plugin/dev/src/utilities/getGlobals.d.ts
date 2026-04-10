import type { Config } from '@/payload-types';
type Global = Extract<keyof Config['globals'], string>;
/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export declare const getCachedGlobal: (slug: Global, depth?: number) => () => Promise<import("payload").DataFromGlobalSlug<"footer" | "header">>;
export {};
