import type { User } from '@/payload-types';
import type { Payload } from 'payload';
import React from 'react';
import './index.scss';
declare const BeforeDashboard: React.FC<{
    payload: Payload;
    user: User;
}>;
export default BeforeDashboard;
