"use client";

import { logout } from "@/lib/actions/auth";
import { NAV_ITEMS } from "@/lib/nav-config";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Sidebar({ avatarUrl }: { avatarUrl: string | null }) {
    const pathname = usePathname();
    const navigations = NAV_ITEMS;

    return (
        <aside className="hidden md:flex md:w-60 md:flex-col bg-white  shrink-0 shadow-md">
            {/* TODO 1: logo/woodmark block */}
            <div className="p-4 flex justify-center items-center gap-4">
                <h1 className="font-bold">Spending Tracker</h1>
                <Image src="/icons/icon-32px.png" alt="Logo" width={25} height={25} />
            </div>
            <nav className="flex-1 px-3 space-y-4">
                {navigations.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    const isProfile = item.href === "/profile";
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all hover:bg-black hover:text-white ${active ? "bg-black text-white" : "text-black"
                                }`}
                        >
                            {isProfile && avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt=""
                                    className="mr-3 h-5 w-5 rounded-full object-cover shrink-0"
                                />
                            ) : (
                                <item.icon className="mr-3 h-5 w-5 shrink-0" aria-hidden="true" />
                            )}
                            {item.label}
                        </Link>

                    );
                })}
            </nav>
            <form
                className="flex flex-col justify-end items-center p-4"
                action={logout}
            >
                <button
                    type="submit"
                    className="px-4 py-2 bg-black rounded-sm w-full text-sm cursor-pointer text-white hover:text-black hover:bg-gray-100 hover:border-slate-300 transition-all"
                >
                    Logout
                </button>
            </form>
        </aside>
    )
}