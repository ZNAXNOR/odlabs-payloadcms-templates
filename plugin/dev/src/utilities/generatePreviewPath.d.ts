import { PayloadRequest, CollectionSlug } from 'payload';
declare const collectionPrefixMap: Partial<Record<CollectionSlug, string>>;
type Props = {
    collection: keyof typeof collectionPrefixMap;
    slug: string;
    req: PayloadRequest;
};
export declare const generatePreviewPath: ({ collection, slug }: Props) => string | null;
export {};
