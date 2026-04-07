'use client'
import { PAGES } from '@/app/config/pages.config';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { MenuItem } from '../../components/MenuItem';
export function WebapiMenu() {
    const pathname = usePathname();

    return (
        <nav className="flex item-center gap-4 mb-5">
            <MenuItem href={PAGES.WEBAPI} name="Products Table" isActive={!!match(PAGES.WEBAPI)(pathname)} />
            <MenuItem href={PAGES.PRODUCTSDRAWER} name="Products Table Drawer" isActive={!!match(PAGES.PRODUCTSDRAWER)(pathname)} />
        </nav>
    );
}