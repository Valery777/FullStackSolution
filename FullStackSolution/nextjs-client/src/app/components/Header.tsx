'use client'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'
import { ProfileButton } from "./ProfileButton";
export function Header() {
    console.log("HEADER RENDERED");


    return (
        <header className="border-b border-black/10 px-6 py-4 flex items-center bg-yellow">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-3">
                   <Image src="/globe.svg" alt="X-Logo" width={28} height={28} priority />
                </Link>
                <Menu />
                  
            </div>
            
                 
            <div className="ml-auto">
                <ProfileButton />
                </div> 
        </header>



    )


} 
