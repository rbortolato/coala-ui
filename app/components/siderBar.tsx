import { ReactNode } from "react";
import Link from "next/link"
import { IoLibraryOutline, IoSearchSharp } from "react-icons/io5"
import { LiaExchangeAltSolid } from "react-icons/lia"
import { usePathname } from 'next/navigation'

interface IItem {
    label: string;
    href: string;
    icon: ReactNode;
}

const Sidebar = () => {
    const items: IItem[] = [
        {
            label: "Meus Livros",
            href: "/books",
            icon: <IoLibraryOutline className={"h-5 w-5"}/>
        },
        {
            label: "Minhas Solicitações",
            href: "/requests",
            icon: <LiaExchangeAltSolid className={"h-5 w-5"}/>
        },
        {
            label: "Buscar Livros",
            href: "/search",
            icon: <IoSearchSharp className={"h-5 w-5"}/>
        }
    ];

    return (
        <div
            className={
                "flex flex-col justify-between bg-zinc-200 z-20 fixed h-full w-[230px]"
            }
        >
            <nav className="md:sticky top-0 md:top-16">
                <ul className="py-2 flex flex-col gap-2">
                    {items.map((item, index) => {
                        return (
                            <Link key={index} href={item.href}>
                                <li className={`hover:bg-indigo-900 hover:text-zinc-200 flex gap-4 items-center transition-colors duration-300 rounded-md p-2 mx-2 ${usePathname() == item.href ? 'bg-indigo-800 text-zinc-200' : 'text-zinc-600'} `}>
                                    {item.icon} {item.label}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
export default Sidebar;
