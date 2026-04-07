// Menu.data.ts
// Data for the Menu component
import { PAGES } from '@/app/config/pages.config'
export interface MenuItem {

    href: string;
    name: string;
}
 const username:string = '';


  export const MENU: MenuItem[] = [
  {
    href: PAGES.HOME,
    name: 'Home',
  },
  {
    href: PAGES.ML,
      name: 'ML.NET',
  },
  {
    href: PAGES.LLM,
    name: 'LLM',
  },
  
    //{
    //    href: username.length > 0 ? PAGES.PROFILE(username) : PAGES.HOME,
   //     name: 'Profile',
    //},
    {
        href: PAGES.SHOP,
        name: 'Rendering Modes (Strategies)',
    },
    
    {
    href: PAGES.WEBAPI,
    name: 'Web Api',
    },

    //{
    //href: PAGES.TEST,
    //name: 'Products Table Drawer ',
    //},
    {
        href: PAGES.REACT19,
        name: 'React 19',
    },
    //  {
    //      href: PAGES.REACT19HOME,
    //      name: 'React 19 Home',
    //  },


 ] 