import type { MediaBlock as MediaBlockProps } from '@/payload-types';
import type { StaticImageData } from 'next/image';
import React from 'react';
type Props = {
    breakout?: boolean;
    captionClassName?: string;
    className?: string;
    disableInnerContainer?: boolean;
    enableGutter?: boolean;
    imgClassName?: string;
    staticImage?: StaticImageData;
} & MediaBlockProps;
export declare const MediaBlock: React.FC<Props>;
export {};
