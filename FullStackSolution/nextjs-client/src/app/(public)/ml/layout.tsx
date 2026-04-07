'use client'
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { MlMenu } from './MlMenu';
//import { ShopMenu } from "./ShopMenu";

const DynamicMlMenu = dynamic(() => import('./MlMenu').then(mod => mod.MlMenu),
    { loading: () => <div>...loading</div> }
)

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="w-full">

            {/*<ShopMenu />*/}
            <DynamicMlMenu />
            {children}

            {/* <React19Menu/>*/}
        </div>
    );
}

