import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import React from 'react';
type Props = {
    data: DefaultTypedEditorState;
    enableGutter?: boolean;
    enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export default function RichText(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
