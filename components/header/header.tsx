'use client';

import Link from "next/link";
import Image from "next/image";
import headerLogo from '@/public/images/bt-logo-main.png';
import { usePathname } from "next/navigation";
import SideMenu from "./sidemenu";

const menuItems = [
    {
        name: 'Dashboard',
        slug: '/',
    },
    {
        name: 'Income',
        slug: '/income'
    },
    {
        name: 'Budgets',
        slug: '/budgets',
    },
    {
        name: 'Expenses',
        slug: '/expenses',
    },
    {
        name: 'Savings',
        slug: '/savings',
    }
];

const Header = () => {
    const pathname = usePathname();

    return ( 
        <header className="w-full mt-8">
            <div className="container">
                <div className="px-8 xl:px-12.5 py-5 bg-card rounded-[50px] drop-shadow-lg">

                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <Image
                                    src={headerLogo}
                                    alt="Budget Tracker App"
                                    width={210}
                                    className="max-w-[160px] xl:max-w-none"/>
                            </Link>
                        </div>
                        <div>

                            <nav className="hidden md:flex">
                                <ul className="flex items-center justify-end gap-x-8 xl:gap-x-7.25">
                                    {menuItems.map((item) => (
                                        <li key={item.name}>
                                            <Link 
                                                href={item.slug}
                                                className="text-primary font-semibold font-heading inline-block relative">
                                                {item.name}

                                                {pathname === item.slug &&
                                                    <span className="h-0.75 bg-primary w-full block rounded-lg absolute -bottom-1"></span>
                                                }
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="block md:hidden">
                                <SideMenu/>
                            </div>

                        </div>
                        
                    </div>

                </div>
            </div>
        </header>
    );
}
 
export default Header;