'use client'
import { PAGES } from '@/app/config/pages.config';  
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { MenuItem } from '../../components/MenuItem';
export function ShopMenu() {
    const pathname = usePathname();
    console.log('SSG', PAGES.SSG);
    console.log('Current Path:', pathname);

    return (
        <nav className="flex item-center gap-4 mb-5">
            <MenuItem href={PAGES.SHOP} name="Server-side rendering (SSR)" isActive={!!match(PAGES.SHOP)(pathname)}/>
            <MenuItem href={PAGES.SSG} name="Static Site Generation (SSG)" isActive={!!match(PAGES.SSG)(pathname)} />
            <MenuItem href={PAGES.ISR} name="Incremental Static Regeneration (ISR)" isActive={!!match(PAGES.ISR)(pathname)} />
        </nav>
    
    )
}