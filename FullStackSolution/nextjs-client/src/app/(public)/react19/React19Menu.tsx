'use client'
import { PAGES } from '@/app/config/pages.config';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { MenuItem } from '../../components/MenuItem';
export function React19Menu() {
    const pathname = usePathname();
   
    return (
        <nav className="flex item-center gap-4 mb-5">
            <MenuItem href={PAGES.REACT19} name="Service Actions" isActive={!!match(PAGES.REACT19)(pathname)} />
            <MenuItem href={PAGES.USEACTIONSPAGE} name="Use Actions Page" isActive={!!match(PAGES.USEACTIONSPAGE)(pathname)} />
            <MenuItem href={PAGES.USEFORMSTATUS} name="Use Form Status" isActive={!!match(PAGES.USEFORMSTATUS)(pathname)} />
        </nav>

    )


}