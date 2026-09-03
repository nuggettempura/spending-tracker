"use client"

import { logout } from "@/lib/actions/auth";
import { NAV_ITEMS } from "@/lib/nav-config";
import Link from "next/link";
import { usePathname } from "next/navigation"


export function MobileNav() {
    const pathname = usePathname();
    const navigations = NAV_ITEMS
    const withoutDashboardNav = navigations.filter((item) => item.href !== "/")

    return (
        <div>
            <h2 className="text-xl font-semibold my-4">Features</h2>
            <nav className="md:hidden grid grid-row-2 grid-cols-2 gap-2 min-h-20">
                {withoutDashboardNav.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center justify-center px-4 py-2 text-sm bg-white border-slate-300 font-medium rounded-sm hover:bg-black hover:text-white ${pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-black text-white" : "text-black"}`}
                    >
                        <item.icon className="h-5 w-5 mb-1" aria-hidden="true" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}