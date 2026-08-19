"use client"

import { Suspense, useCallback, useState } from "react"
import ToastContext, { ToastType } from "./ToastContext"
import SuccessParamWatcher from "./SuccesParamWatcher";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now();
        setToasts((current) => [...current, { id, message, type }]);

        setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 4000)
    }, [])
    return (
        <ToastContext.Provider value={{ showToast }}>
            <Suspense fallback={null}><SuccessParamWatcher showToast={showToast}></SuccessParamWatcher></Suspense>
            {children}
            <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={toast.type === "error" ? "bg-red-600 text-white px-4 py-2 rounded-md shadow-lg" : "bg-green-600 text-white px-4 py-2 rounded-md shadow-lg"}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}