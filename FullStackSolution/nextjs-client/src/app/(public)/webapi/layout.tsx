'use client'
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
const DynamicWebapiMenu = dynamic(() => import('./WebapiMenu').then(mod => mod.WebapiMenu),
    { loading: () => <div>...loading</div> }
)

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="w-full">
           <DynamicWebapiMenu />
            {children}
        </div>
    );
}
