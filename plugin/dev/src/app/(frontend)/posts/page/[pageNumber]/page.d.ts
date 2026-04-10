import type { Metadata } from 'next/types';
export declare const revalidate = 600;
type Args = {
    params: Promise<{
        pageNumber: string;
    }>;
};
export default function Page({ params: paramsPromise }: Args): Promise<import("react/jsx-runtime").JSX.Element>;
export declare function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata>;
export declare function generateStaticParams(): Promise<{
    pageNumber: string;
}[]>;
export {};
