import type { Payload, PayloadRequest } from 'payload';
type SeedArgs = {
    payload: Payload;
    req?: PayloadRequest;
};
export declare const bootstrapTemplateContent: ({ payload, req }: SeedArgs) => Promise<void>;
export declare const seedSampleContent: ({ payload, req }: SeedArgs) => Promise<void>;
export {};
