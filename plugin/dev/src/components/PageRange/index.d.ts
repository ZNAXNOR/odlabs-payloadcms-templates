import React from 'react';
declare const defaultCollectionLabels: {
    posts: {
        plural: string;
        singular: string;
    };
};
export declare const PageRange: React.FC<{
    className?: string;
    collection?: keyof typeof defaultCollectionLabels;
    collectionLabels?: {
        plural?: string;
        singular?: string;
    };
    currentPage?: number;
    limit?: number;
    totalDocs?: number;
}>;
export {};
