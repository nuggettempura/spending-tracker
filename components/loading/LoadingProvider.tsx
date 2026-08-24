"use client"

import { useCallback, useEffect, useState } from "react"
import LoadingContext from "./LoadingContext";
import LoadingOverlay from "./LoadingOverlay";
import { usePathname } from "next/navigation";

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);

    const startLoading = useCallback(() => {
        setCount((current) => current + 1);
    }, [])

    const stopLoading = useCallback(() => {
        setCount((current) => Math.max(0, current - 1));
    }, [])

    const pathname = usePathname();
    const isLoading = count > 0;

    useEffect(() => {
        stopLoading();
    }, [pathname, stopLoading]);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            if (!(e.target instanceof HTMLElement)) return

            const anchor = e.target.closest("a");
            if (!anchor) return;

            if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

            const url = new URL(anchor.href, window.location.href);

            if (url.origin !== window.location.origin) return;
            if (url.pathname + url.search === window.location.pathname + window.location.search) return;

            startLoading();
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [startLoading]);

    useEffect(() => {
        if (!isLoading) return;

        const timeoutId = setTimeout(() => {
            setCount(0);
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading }}>
            {children}{isLoading && <LoadingOverlay />}
        </LoadingContext.Provider>
    )
}