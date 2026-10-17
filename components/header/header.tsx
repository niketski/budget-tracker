'use client';

import Link from "next/link";
import Image from "next/image";
import headerLogo from '@/public/images/bt-logo-main.png';
import { usePathname } from "next/navigation";

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
        <header className="bg-background py-7">
            <div className="container flex items-center justify-between">
                <div>
                    <Link href="/">
                        <Image
                            src={headerLogo}
                            alt="Budget Tracker App"
                            width={210}/>
                    </Link>
                </div>
                <div>
                    <nav className="px-12.5 py-5 bg-card rounded-[50px] drop-shadow-lg">
                        <ul className="flex items-center justify-end gap-x-7.25">
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
                </div>
            </div>
        </header>
    );
}
 
export default Header;