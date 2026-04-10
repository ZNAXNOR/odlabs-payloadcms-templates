import { Post } from '@/payload-types';
/**
 * Formats an array of populatedAuthors from Posts into a prettified string.
 * @param authors - The populatedAuthors array from a Post.
 * @returns A prettified string of authors.
 * @example
 *
 * [Author1, Author2] becomes 'Author1 and Author2'
 * [Author1, Author2, Author3] becomes 'Author1, Author2, and Author3'
 *
 */
export declare const formatAuthors: (authors: NonNullable<NonNullable<Post["populatedAuthors"]>[number]>[]) => string | null | undefined;
