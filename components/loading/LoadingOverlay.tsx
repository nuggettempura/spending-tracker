"use client"

import { Loader2 } from "lucide-react"

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10 text-white" />
        </div>
    )
}