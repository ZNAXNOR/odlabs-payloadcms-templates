import type { ButtonProps } from '@/components/ui/button';
import * as React from 'react';
declare const Pagination: ({ className, ...props }: React.ComponentProps<"nav">) => import("react/jsx-runtime").JSX.Element;
declare const PaginationContent: React.FC<{
    ref?: React.Ref<HTMLUListElement>;
} & React.HTMLAttributes<HTMLUListElement>>;
declare const PaginationItem: React.FC<{
    ref?: React.Ref<HTMLLIElement>;
} & React.HTMLAttributes<HTMLLIElement>>;
type PaginationLinkProps = {
    isActive?: boolean;
    size?: ButtonProps['size'];
} & React.ComponentProps<'button'>;
declare const PaginationLink: ({ className, isActive, size, ...props }: PaginationLinkProps) => import("react/jsx-runtime").JSX.Element;
declare const PaginationPrevious: ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => import("react/jsx-runtime").JSX.Element;
declare const PaginationNext: ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => import("react/jsx-runtime").JSX.Element;
declare const PaginationEllipsis: ({ className, ...props }: React.ComponentProps<"span">) => import("react/jsx-runtime").JSX.Element;
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, };
