"use client"

import { usePathname } from "next/navigation";
import { useBreadcrumbOverrides } from "./BreadcrumbContext";
import { buildTrail } from "@/lib/breadcrumb-config";
import Link from "next/link";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const overrides = useBreadcrumbOverrides();
    const trail = buildTrail(pathname, overrides);

    if (trail.length <= 1) return null;

    return (
        <nav aria-label="Breadcrumb" className="px-5 pt-16 md:px-8 md:pt-6">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
                {trail.map((crumb, index) => {
                    const isLast = index === trail.length - 1;
                    return (
                        <li key={crumb.href} className="flex items-center gap-2">
                            {index > 0 && <span aria-hidden="true">/</span>}
                            {isLast ? (
                                <span aria-current="page" className="font-medium text-slate-900">{crumb.label}</span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-blue-600"
                                >
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}