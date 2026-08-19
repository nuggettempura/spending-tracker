"use client"

import { createContext } from "react";

export type ToastType = "success" | "error";

export interface ToastContextValue {
    showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export default ToastContext;