import React from 'react';
import Link from 'next/link';
//import { PAGES } from '@/config/pages.config'
//import { usePathname } from 'next/navigation';
export interface MenuItemProps {
    href: string
    name: string
    isActive: boolean

}
//const pathname = usePathname();
export function MenuItem({ href, isActive, name }: MenuItemProps) {
    return (
        <Link
            href={href}
            className={`
        px-3 py-1 rounded-full transition
        ${isActive
                    ? "bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:text-black transition-colors "
                }
      `}
        >
            {name}
        </Link>
    )
}





