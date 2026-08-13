"use client";

import { NAV_ITEMS } from "@/lib/nav-config";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Sidebar() {
    const pathname = usePathname();
    const navigations = NAV_ITEMS;

    return (
        <aside className="hidden md:flex md:w-60 md:flex-col bg-slate-900 text-slate-300 shrink-0">
            {/* TODO 1: logo/woodmark block */}
            <div className="p-4">
                <h1 className="font-bold text-white">Spending Tracker</h1>
                <Image src="/icons/icon-32px.png" alt="Logo" width={40} height={40} />
            </div>
            <nav className="flex-1 px-3 space-y-1">
                {navigations.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white ${pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-slate-800 text-white" : "text-slate-300"}`}
                    >
                        <item.icon className="mr-3 h-5 w-5 shrink-0" aria-hidden="true" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}