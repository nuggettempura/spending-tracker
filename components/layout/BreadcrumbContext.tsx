"use client"

import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";

type BreadCrumbContextValue = {
    overrides: Record<string, string>;
    setOverride: (href: string, label: string) => void;
    clearOverride: (href: string) => void;
}

const BreadCrumbContext = createContext<BreadCrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const [overrides, setOverrides] = useState<Record<string, string>>({});

    const setOverride = useCallback((href: string, label: string) => {
        setOverrides((prev) => prev[href] === label ? prev : { ...prev, [href]: label });
    }, []);

    const clearOverride = useCallback((href: string) => {
        setOverrides((prev) => {
            if (!(href in prev)) return prev;
            const next = { ...prev };
            delete next[href];
            return next;
        });
    }, []);

    const value = useMemo(() => ({ overrides, setOverride, clearOverride }), [overrides, setOverride, clearOverride],);

    return <BreadCrumbContext value={value}>{children}</BreadCrumbContext>
}

export function useBreadcrumbOverrides() {
    const ctx = useContext(BreadCrumbContext);
    if (!ctx) throw new Error("useBreadcrumbOverrides must be used within BreadcrumbProvider");
    return ctx.overrides;
}

export function useBreadcrumbOverride(href: string, label: string | undefined) {
    const ctx = useContext(BreadCrumbContext);
    if (!ctx) throw new Error("useBreadcrumbOverride must be used within BreadcrumbProvider");
    const { setOverride, clearOverride } = ctx;

    useEffect(() => {
        if (!label) return;
        setOverride(href, label);
        return () => clearOverride(href);
    }, [href, label, setOverride, clearOverride]);
}