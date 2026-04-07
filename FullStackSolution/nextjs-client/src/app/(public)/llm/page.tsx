'use client'

import ProfileFake from '../../components/ProfileFake'
import metadata from '../../components/ProfileFake'
import HousingChatbot from './HousingChatbot'
//import { useRouter } from "next/navigation";
/**
 * ProfileFake Component
 * This is a placeholder profile component for demonstration purposes.
 */
//export const metadata: Metadata = {
//    title: 'Fake Profile',

//}
console.log("ProfileFakePage metadata", metadata);

export default function ProfileFakePage() {
    //const router = useRouter();
    //return (
    //<div className="profile-fake">
    //  <h2>Fake Profile</h2>
    //  <p>This is a fake profile component. Replace with real data as needed.</p>
    //  {/*<div>*/}
    //  {/*  <img*/}
    //  {/*    src="https://via.placeholder.com/150"*/}
    //  {/*    alt="Fake Avatar"*/}
    //  {/*    style={{ borderRadius: "50%" }}*/}
    //  {/*  />*/}
    //  {/*</div>*/}
    //  <ul>
    //    <li>Name: John Doe</li>
    //    <li>Email: johndoe@example.com</li>
    //    <li>Location: Unknown</li>
    //   </ul>
    //        <h1 className="text-3xl font-bold mb-6">
    //            <button onClick={() => router.push(PAGES.HOME)}>
    //                Go to Home</button></h1>

    //    </div>
    //    )
    return (
        <>
            {/*<ProfileFake />*/}
            <HousingChatbot />
        </>
       
    )
       
  
};

