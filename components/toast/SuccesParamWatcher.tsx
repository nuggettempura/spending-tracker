"use client"

import { ToastType } from "./ToastContext";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessParamWatcher({ showToast }: { showToast: (message: string, type: ToastType) => void }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const successStatus = params.get("success");
    useEffect(() => {
        if (successStatus) {
            showToast(successStatus, "success")
            router.replace(pathname)
        }
    }, [params, showToast, router, pathname, successStatus])

    return (
        null
    )
}