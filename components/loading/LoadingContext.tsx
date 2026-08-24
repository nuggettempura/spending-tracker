"use client"

import { createContext } from "react"

export interface LoadingContextValue {
    startLoading: () => void,
    stopLoading: () => void,
};

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export default LoadingContext;