"use client"

import { passwordRecovery } from "@/lib/actions/auth";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export default function PasswordRecovery() {
    const [state, formAction, pending] = useActionState(passwordRecovery, undefined);

    return (
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 rounded-md px-10 py-6 min-w-87.5 max-w-87.5 bg-white">
            <div className="mx-auto">
                <p className="flex items-center justify-between mb-4 px-4 py-1.5 gap-1 bg-gray-100 border-slate-300 rounded-sm">
                    <Settings width={16} height={16} /><span className="text-sm">Password Recovery</span>
                </p>
            </div>
            <div className="flex flex-col items-start gap-2 my-1 w-full">
                <label htmlFor="email" className="text-sm">Your email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="px-2 py-1.5 w-full border border-slate-400 rounded-sm text-sm"
                    placeholder="Enter your email address"
                />
            </div>
            {state?.error && <p className="text-sm text-red-600">{state?.error}</p>}
            {state?.success && <p className="text-sm">Check your email for a reset link</p>}
            <button
                type="submit"
                className="mt-2 px-6 py-2 border bg-black border-black rounded-md w-full text-white text-sm hover:bg-gray-100 hover:border-slate-300 hover:text-black cursor-pointer transition-all"
            >
                {pending ? "Pending..." : "Submit"}
            </button>
            <div className="flex gap-1 items-center justify-center my-2">
                <span className="text-[10px]">
                    You remembered your password?
                </span>
                <Link
                    href={'/login'}
                    className="text-[10px] text-shadow-slate-800 hover:text-black no-underline transition-all hover:underline"
                >
                    Click here to login
                </Link>
            </div>
        </form>
    )
}