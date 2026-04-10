import type { Post } from '@/payload-types';
import React from 'react';
export type CardPostData = Pick<Post, 'meta' | 'slug' | 'title'>;
export declare const Card: React.FC<{
    alignItems?: 'center';
    className?: string;
    doc?: CardPostData;
    relationTo?: 'posts';
    title?: string;
}>;
