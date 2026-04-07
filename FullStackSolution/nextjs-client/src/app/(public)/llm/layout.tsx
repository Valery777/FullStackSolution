'use client'
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { LlmMenu } from './LlmMenu';
//import { ShopMenu } from "./ShopMenu";

const DynamicLlmMenu = dynamic(() => import('./LlmMenu').then(mod => mod.LlmMenu),
    { loading: () => <div>...loading</div> }
)

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="w-full">

            {/*<ShopMenu />*/}
            <DynamicLlmMenu />
            {children}

            {/* <React19Menu/>*/}
        </div>
    );
}
