import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const buttonVariants: (props?: ({
    size?: "clear" | "icon" | "default" | "lg" | "sm" | null | undefined;
    variant?: "link" | "default" | "outline" | "destructive" | "ghost" | "secondary" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.FC<ButtonProps>;
export { Button, buttonVariants };
