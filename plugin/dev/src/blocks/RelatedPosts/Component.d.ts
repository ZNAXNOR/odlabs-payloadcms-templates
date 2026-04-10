import type { Post } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import React from 'react';
export type RelatedPostsProps = {
    className?: string;
    docs?: Post[];
    introContent?: DefaultTypedEditorState;
};
export declare const RelatedPosts: React.FC<RelatedPostsProps>;
