'use client'
import Link from 'next/link';
import { PAGES } from '@/app/config/pages.config'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { MENU } from './Menu.data';
import { MenuItem } from './MenuItem';
export default function Menu() {

    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();

    console.log('Current Path:', pathname);
    console.log('segment:', segment);
    console.log("MENU RENDERED");


    return (
        <div className="w-full">
            <nav className="flex items-center w-full text-sm font-medium">
                {MENU.map(menuItem => (
                    <MenuItem
                        key={menuItem.name}
                        href={menuItem.href}
                        name={menuItem.name}
                        isActive={
                            menuItem.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(menuItem.href)
                        }
                    />
                ))}
               
            </nav>

       </div>
    )
}