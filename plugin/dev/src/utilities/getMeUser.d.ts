import type { User } from '../payload-types';
export declare const getMeUser: (args?: {
    nullUserRedirect?: string;
    validUserRedirect?: string;
}) => Promise<{
    token: string;
    user: User;
}>;
