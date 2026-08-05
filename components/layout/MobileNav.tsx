"use client"

import { NAV_ITEMS } from "@/lib/nav-config";
import Link from "next/link";
import { usePathname } from "next/navigation"


export function MobileNav() {
    const pathname = usePathname();
    const navigations = NAV_ITEMS;

    return (
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-800 flex justify-around py-2 z-10">
            {navigations.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center px-3 py-1.5 text-xs font-medium hover:text-white ${pathname === item.href || pathname.startsWith(item.href + "/") ? "text-white" : "text-slate-300"}`}

                >
                    <item.icon className="h-5 w-5 mb-1" aria-hidden="true" />
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}