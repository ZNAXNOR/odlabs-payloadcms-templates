import type { Media } from '@/payload-types';
import type { RequiredDataFromCollectionSlug } from 'payload';
type HomeArgs = {
    heroImage: Media;
    metaImage: Media;
};
export declare const home: ({ heroImage, metaImage }: HomeArgs) => RequiredDataFromCollectionSlug<"pages">;
export {};
