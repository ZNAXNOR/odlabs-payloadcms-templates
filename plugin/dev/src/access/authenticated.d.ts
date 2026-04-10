import type { User } from '@/payload-types.js';
import type { AccessArgs } from 'payload';
type isAuthenticated = (args: AccessArgs<User>) => boolean;
export declare const authenticated: isAuthenticated;
export {};
