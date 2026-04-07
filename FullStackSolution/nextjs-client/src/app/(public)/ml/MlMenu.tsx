'use client'
import { PAGES } from '@/app/config/pages.config';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { MenuItem } from '../../components/MenuItem';
export function MlMenu() {
    const pathname = usePathname();
        console.log('Current Path:', pathname);

    return (
        <nav className="flex item-center gap-4 mb-5">
            <MenuItem href={PAGES.ML} name="House predict price" isActive={!!match(PAGES.ML)(pathname)} />
            <MenuItem href={PAGES.SENTIMENTANALYZIER} name="Binary Classification" isActive={!!match(PAGES.SENTIMENTANALYZIER)(pathname)} />
            <MenuItem href={PAGES.LEARNINGASSISTANT} name="Multiclass Classification" isActive={!!match(PAGES.LEARNINGASSISTANT)(pathname)} />
           
        </nav>
    )
}
