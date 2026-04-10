import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const labelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const Label: React.FC<{
    ref?: React.Ref<HTMLLabelElement>;
} & React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>>;
export { Label };
