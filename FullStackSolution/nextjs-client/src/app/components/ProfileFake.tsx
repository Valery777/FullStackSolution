//'use client'
//import { PAGES } from '@/config/pages.config'
//import { useRouter } from "next/navigation";
import type { Metadata } from "next"
import { ProfileButton } from "./ProfileButton";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
        title: 'Fake Profile',

}
const DynamicProfileButton = dynamic(() => import('./ProfileButton').then(mod => mod.ProfileButton))
      export default function ProfileFake() {
    
    //const router = useRouter();
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">LLM</h1>
                {/*<button onClick={() => router.push(PAGES.HOME)}>*/}
            {/*    Go to Home</button>
            <ProfileButton/>*/}
            <DynamicProfileButton />
        </div>


    )
}