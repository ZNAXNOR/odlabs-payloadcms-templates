import React from 'react';
export type CodeBlockProps = {
    blockType: 'code';
    code: string;
    language?: string;
};
type Props = {
    className?: string;
} & CodeBlockProps;
export declare const CodeBlock: React.FC<Props>;
export {};
