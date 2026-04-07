'use client'
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { React19Menu } from './React19Menu';
//import { ShopMenu } from "./ShopMenu";

const DynamicReact19Menu = dynamic(() => import('./React19Menu').then(mod => mod.React19Menu),
    {  loading: () => <div>...loading</div> }
)

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="w-full">
           
            {/*<ShopMenu />*/}
            <DynamicReact19Menu />
            {children}
           
           {/* <React19Menu/>*/}
        </div>
    );
}
