import Link from "next/link";

const Header = () => {
    return ( 
        <header className="bg-primary py-7">
            <div className="max-w-285 mx-auto px-4 flex items-center justify-between">
                <div>
                    <h2 className="font-bold font-heading text-2xl">Budget Tracker App</h2>
                </div>
                <div>
                    <nav>
                        <ul className="flex items-center justify-end gap-x-2.5">
                            <li>
                                <Link href="/">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/budgets">Budgets</Link>
                            </li>
                            <li>
                                <Link href="/expenses">Expenses</Link>
                            </li>
                            <li>
                                <Link href="/profile">
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
 
export default Header;