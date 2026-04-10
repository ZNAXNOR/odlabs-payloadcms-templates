import '@payloadcms/next/css';
import React from 'react';
import './custom.scss';
type Args = {
    children: React.ReactNode;
};
declare const Layout: ({ children }: Args) => import("react/jsx-runtime").JSX.Element;
export default Layout;
