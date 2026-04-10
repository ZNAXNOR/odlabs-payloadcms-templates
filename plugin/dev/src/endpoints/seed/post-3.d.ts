import type { Media, User } from '@/payload-types';
import type { RequiredDataFromCollectionSlug } from 'payload';
export type PostArgs = {
    author: User;
    blockImage: Media;
    heroImage: Media;
};
export declare const post3: ({ author, blockImage, heroImage }: PostArgs) => RequiredDataFromCollectionSlug<"posts">;
