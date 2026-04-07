'use client'
import { PAGES } from '@/app/config/pages.config';
import { usePathname } from 'next/navigation';

import { match } from 'path-to-regexp';
import { MenuItem } from '../../components/MenuItem';
export function LlmMenu() {
    const pathname = usePathname();
    console.log('Current Path:', pathname);

    return (
       
        <nav className="flex item-center gap-4 mb-5">
            <MenuItem href={PAGES.LLM} name="Housing Chat Bot (ollamo)" isActive={!!match(PAGES.LLM)(pathname)} />
            <MenuItem href={PAGES.STYLETRANSFORMER} name="Style Transformer (ollamo )" isActive={!!match(PAGES.STYLETRANSFORMER)(pathname)} />
            {/*<MenuItem href={PAGES.LEARNING} name="learning (ollamo)" isActive={!!match(PAGES.LEARNING)(pathname)} />*/}
            <MenuItem href={PAGES.SQLTRANSLATOR} name="AI Chat Assistant (Open AI)" isActive={!!match(PAGES.SQLTRANSLATOR)(pathname)} />
        </nav>
    )

}
